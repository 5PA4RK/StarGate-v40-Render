// Load environment variables FIRST
require('dotenv').config();


const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Configure multer for file uploads
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10
  });

// cleanup function
// Define cleanup function BEFORE using it
async function cleanOldUploads() {
    try {
      const connection = await pool.getConnection();
      // Your cleanup logic here
      connection.release();
    } catch (err) {
      console.error('Cleanup skipped - DB error:', err.message);
    }
  }

// Test route
app.get('/simple-test', (req, res) => {
    res.send('Simple test successful');
  });

  // Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    cleanOldUploads(); // Run cleanup after server starts
  });

  // Error handling
server.on('error', (err) => {
    console.error('Server error:', err);
  });
  
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
  });
// Modify the interval to run every 6 hours instead of daily
const CLEANUP_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours

// Run on startup with error handling
cleanOldUploads().catch(err => {
    console.error('Initial cleanup failed:', err.message);
});

// Set up periodic cleanup
const cleanupInterval = setInterval(() => {
    cleanOldUploads().catch(err => {
        console.error('Periodic cleanup failed:', err.message);
    });
}, CLEANUP_INTERVAL);

// Handle server shutdown
process.on('SIGINT', () => {
    clearInterval(cleanupInterval);
    process.exit();
});

// Utility functions
const withTransaction = async (callback) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const generateJobNumber = async (connection, entryDate, pressType) => {
    const year = entryDate.getFullYear();
    const baseYearCode = String.fromCharCode(65 + (year - 2024));
    const yearCode = pressType?.toLowerCase().includes('stack') 
        ? baseYearCode.toLowerCase() 
        : baseYearCode;
        
    
    const month = entryDate.getMonth() + 1;
    let monthCode;
    if (month <= 9) monthCode = month.toString();
    else if (month === 10) monthCode = 'O';
    else if (month === 11) monthCode = 'N';
    else monthCode = 'D';
    
    const day = entryDate.getDate().toString().padStart(2, '0');
    const dateStr = entryDate.toISOString().split('T')[0];
    
    const [existingJobs] = await connection.query(
        `SELECT job_number FROM jobs 
         WHERE DATE(created_at) = ? 
         AND LOWER(job_number) LIKE ? 
         ORDER BY job_number DESC LIMIT 1`,
        [dateStr, `${yearCode.toLowerCase()}${monthCode}${day}%`]
    );
    
    let sequence = '01';
    if (existingJobs.length > 0 && existingJobs[0].job_number) {
        const lastSeq = parseInt(existingJobs[0].job_number.slice(-2));
        sequence = (lastSeq + 1).toString().padStart(2, '0');
        if (sequence === '100') throw new Error("Maximum daily job limit (99) reached");
    }
    
    return yearCode + monthCode + day + sequence;
};

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'), {
    maxAge: '1d',
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=86400');
    }
})); // <-- Added missing closing parenthesis here

// Status update mapping
const STATUS_UPDATE_MAP = {
    'Financially Approved': `
        UPDATE jobs SET financial_approval = 1, working_on_job_study = 0 WHERE job_number = ?
    `,
    'Technically Approved': `
        UPDATE jobs SET technical_approval = 1, working_on_job_study = 0 WHERE job_number = ?
    `,
    'Working on Job-Study': `
        UPDATE jobs SET working_on_job_study = 1, financial_approval = 1, technical_approval = 1 WHERE job_number = ?
    `,
    'Working on softcopy': `
        UPDATE jobs SET working_on_softcopy = 1, working_on_job_study = 0 WHERE job_number = ?
    `,
    'Need SC Approval': `
        UPDATE prepress_data SET sc_sent_to_sales = 1 WHERE job_number = ?;
        UPDATE jobs SET working_on_softcopy = 0, sc_sent_to_sales = 1 WHERE job_number = ?
    `,
    'SC Under QC Check': `
        UPDATE prepress_data SET sc_sent_to_qc = 1 WHERE job_number = ?;
        UPDATE jobs SET sc_sent_to_qc = 1, sc_sent_to_sales = 0 WHERE job_number = ?
    `,
    'SC Checked': `
        UPDATE qc_data SET sc_checked = 1 WHERE job_number = ?;
        UPDATE jobs SET sc_checked = 1, sc_sent_to_qc = 0 WHERE job_number = ?;
        UPDATE prepress_data SET sc_sent_to_qc = 0 WHERE job_number = ?
    `,
    'Working on Cromalin': `
        UPDATE prepress_data SET working_on_cromalin = 1 WHERE job_number = ?;
        UPDATE jobs SET working_on_cromalin = 1 WHERE job_number = ?
    `,
    'Cromalin Checked': `
        UPDATE qc_data SET cromalin_checked = 1 WHERE job_number = ?;
        UPDATE jobs SET cromalin_checked = 1, cromalin_qc_check = 1 WHERE job_number = ?
    `,
    'Need Cromalin Approval': `
        UPDATE jobs SET cromalin_ready = 1, working_on_cromalin = 0 WHERE job_number = ?
    `,
    'Working on Repro': `
        UPDATE prepress_data SET working_on_repro = 1 WHERE job_number = ?;
        UPDATE jobs SET working_on_repro = 1, cromalin_ready = 0 WHERE job_number = ?
    `,
    'Prepress Received Plates': `
        UPDATE prepress_data SET plates_received = 1 WHERE job_number = ?;
        UPDATE jobs SET plates_received = 1, working_on_repro = 0 WHERE job_number = ?
    `,
    'QC Received Plates': `
        UPDATE qc_data SET plates_received = 1 WHERE job_number = ?;
        UPDATE jobs SET plates_received = 1 WHERE job_number = ?
    `,
    'Ready for Press': `
        UPDATE qc_data SET plates_checked = 1 WHERE job_number = ?;
        UPDATE jobs SET plates_checked = 1, plates_received = 0 WHERE job_number = ?
    `,
    'On Hold': `
        UPDATE jobs SET on_hold = 1 WHERE job_number = ?
    `
};

// Routes
app.post('/api/update-job-status', async (req, res) => {
    try {
        const { jobNumber, newStatus, handler_id, notes } = req.body;
        
        if (!jobNumber || !newStatus) {
            return res.status(400).json({
                success: false,
                message: 'Job number and status are required'
            });
        }

        await withTransaction(async (connection) => {
            // Special handling for SC Under QC Check status
            if (newStatus === 'SC Under QC Check') {
                // Update both jobs and prepress_data tables
                await connection.query(`
                    UPDATE jobs 
                    SET sc_sent_to_qc = 1, sc_sent_to_sales = 0, working_on_softcopy = 0 
                    WHERE job_number = ?
                `, [jobNumber]);
                
                await connection.query(`
                    UPDATE prepress_data 
                    SET sc_sent_to_qc = 1 
                    WHERE job_number = ?
                `, [jobNumber]);
            } 
            // Handle other statuses normally
            else {
                const query = STATUS_UPDATE_MAP[newStatus];
                if (query) {
                    const statements = query.split(';');
                    for (const stmt of statements) {
                        if (stmt.trim()) {
                            const paramCount = (stmt.match(/\?/g) || []).length;
                            const params = Array(paramCount).fill(jobNumber);
                            await connection.query(stmt.trim(), params);
                        }
                    }
                }
            }

            // Ensure related records exist
            if (newStatus === 'Working on softcopy' || newStatus === 'Need SC Approval') {
                await ensurePrepressRecordExists(connection, jobNumber);
            }
            if (newStatus === 'SC Under QC Check' || newStatus === 'SC Checked') {
                await ensureQCRecordExists(connection, jobNumber);
            }

            // Log status change
            const [statusType] = await connection.query(
                'SELECT id FROM status_types WHERE display_name = ? OR status_name = ? LIMIT 1',
                [newStatus, newStatus]
            );
            
            if (statusType.length > 0) {
                await connection.query(
                    `INSERT INTO job_status_history 
                     (job_number, status_type_id, user_id, notes) 
                     VALUES (?, ?, ?, ?)`,
                    [jobNumber, statusType[0].id, handler_id || null, notes || null]
                );
            }
        });

        return res.json({
            success: true,
            message: 'Status updated successfully'
        });

    } catch (error) {
        console.error('Status update error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to update status'
        });
    }
});

// Helper function to ensure prepress record exists
async function ensurePrepressRecordExists(connection, jobNumber) {
    const [existing] = await connection.query(
        'SELECT id FROM prepress_data WHERE job_number = ?',
        [jobNumber]
    );
    
    if (existing.length === 0) {
        await connection.query(
            'INSERT INTO prepress_data (job_number) VALUES (?)',
            [jobNumber]
        );
    }
}

// Helper function to ensure QC record exists
async function ensureQCRecordExists(connection, jobNumber) {
    const [existing] = await connection.query(
        'SELECT id FROM qc_data WHERE job_number = ?',
        [jobNumber]
    );
    
    if (existing.length === 0) {
        await connection.query(
            'INSERT INTO qc_data (job_number) VALUES (?)',
            [jobNumber]
        );
    }
}

// Helper function to validate status transitions
function isValidStatusTransition(currentStatus, newStatus) {
    const validTransitions = {
        'Under Review': ['Financially Approved', 'Technically Approved', 'On Hold'],
        'Financially Approved': ['Technically Approved', 'Working on Job-Study', 'On Hold'],
        'Technically Approved': ['Working on Job-Study', 'On Hold'],
        'Working on Job-Study': ['Working on softcopy', 'On Hold'],
        'Working on softcopy': ['Need SC Approval', 'On Hold'],
        'Need SC Approval': ['SC Under QC Check', 'On Hold'],
        'SC Under QC Check': ['SC Checked', 'On Hold'],
        'SC Checked': ['SC Checked, Need Cromalin', 'SC Checked, Need Plates', 'On Hold'],
        'SC Checked, Need Cromalin': ['Working on Cromalin', 'On Hold'],
        'Working on Cromalin': ['cromalin Checked', 'On Hold'],
        'Cromalin Checked': ['Need Cromalin Approval', 'On Hold'],
        'Need Cromalin Approval': ['Working on Repro', 'On Hold'],
        'SC Checked, Need Plates': ['Working on Repro', 'On Hold'],
        'Working on Repro': ['Prepress Received Plates', 'On Hold'],
        'Prepress Received Plates': ['QC Received Plates', 'On Hold'],
        'QC Received Plates': ['Ready for Press', 'On Hold'],
        'Ready for Press': [], // Final state
        'On Hold': ['Under Review', 'Financially Approved', 'Technically Approved', 
                   'Working on Job-Study', 'Working on softcopy', 'Need SC Approval',
                   'SC Under QC Check', 'SC Checked', 'Working on Cromalin',
                   'Need Cromalin Approval', 'Working on Repro', 'Prepress Received Plates',
                   'QC Received Plates']
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
}
app.post('/api/save-sales-data', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 1. Validate and parse numeric fields
        const parseNumericField = (value, fieldName) => {
            if (value === undefined || value === null || value === '') return null;
            const num = parseFloat(value);
            if (isNaN(num)) {
                throw new Error(`${fieldName} must be a valid number`);
            }
            return num;
        };

        const quantity = parseNumericField(req.body.quantity, 'Quantity');
        const width = parseNumericField(req.body.width, 'Width');
        const height = parseNumericField(req.body.height, 'Height');
        const gusset = parseNumericField(req.body.gusset, 'Gusset');
        const flap = parseNumericField(req.body.flap, 'Flap');

        // 2. Customer handling
        const [customerRows] = await connection.query(
            'SELECT id FROM customers WHERE customer_name = ? AND customer_code = ?',
            [req.body.customer_name, req.body.customer_code]
        );
        
        let customerId;
        if (customerRows.length > 0) {
            customerId = customerRows[0].id;
        } else {
            const [result] = await connection.query(
                'INSERT INTO customers (customer_name, customer_code) VALUES (?, ?)',
                [req.body.customer_name, req.body.customer_code]
            );
            customerId = result.insertId;
        }

        // 3. Determine if this is an update or insert
        const isUpdate = req.body.job_number && req.body.job_number.trim() !== '';
        let jobNumber = req.body.job_number;

        // 4. Prepare job data with proper types
        const jobData = {
            customer_id: customerId,
            salesman: req.body.salesman || null,
            entry_date: req.body.entry_date || null,
            job_name: req.body.job_name || null,
            quantity: quantity,
            quantity_unit: req.body.quantity_unit || null,
            product_type: req.body.product_type || null,
            width: width,
            height: height,
            gusset: gusset,
            flap: flap,
            press_type: req.body.press_type || null,
            print_orientation: req.body.print_orientation || null,
            unwinding_direction: req.body.unwinding_direction || null,
            financial_approval: req.body.financial_approval ? 1 : 0,
            technical_approval: req.body.technical_approval ? 1 : 0,
            on_hold: req.body.on_hold ? 1 : 0,
            comments: req.body.comments || null,
            two_faces: req.body.two_faces ? 1 : 0,
            side_gusset: req.body.side_gusset ? 1 : 0,
            bottom_gusset: req.body.bottom_gusset ? 1 : 0,
            hole_handle: req.body.hole_handle ? 1 : 0,
            strip_handle: req.body.strip_handle ? 1 : 0,
            flip_direction: req.body.flip_direction ? 1 : 0
        };

        if (isUpdate) {
            // Update existing job
            await connection.query(
                `UPDATE jobs SET
                    customer_id = ?,
                    salesman = ?,
                    job_name = ?,
                    quantity = ?,
                    quantity_unit = ?,
                    product_type = ?,
                    width = ?,
                    height = ?,
                    gusset = ?,
                    flap = ?,
                    press_type = ?,
                    print_orientation = ?,
                    unwinding_direction = ?,
                    financial_approval = ?,
                    technical_approval = ?,
                    on_hold = ?,
                    comments = ?,
                    two_faces = ?,
                    side_gusset = ?,
                    bottom_gusset = ?,
                    hole_handle = ?,
                    strip_handle = ?,
                    flip_direction = ?,
                    updated_at = NOW()
                WHERE job_number = ?`,
                [
                    jobData.customer_id,
                    jobData.salesman,
                    jobData.job_name,
                    jobData.quantity,
                    jobData.quantity_unit,
                    jobData.product_type,
                    jobData.width,
                    jobData.height,
                    jobData.gusset,
                    jobData.flap,
                    jobData.press_type,
                    jobData.print_orientation,
                    jobData.unwinding_direction,
                    jobData.financial_approval,
                    jobData.technical_approval,
                    jobData.on_hold,
                    jobData.comments,
                    jobData.two_faces,
                    jobData.side_gusset,
                    jobData.bottom_gusset,
                    jobData.hole_handle,
                    jobData.strip_handle,
                    jobData.flip_direction,
                    jobNumber
                ]
            );
        } else {
            // Insert new job
            jobNumber = await generateJobNumber(
                pool, 
                new Date(req.body.entry_date),
                req.body.press_type
            );

            await connection.query(
                `INSERT INTO jobs (
                    customer_id, salesman, entry_date, job_number, job_name,
                    quantity, quantity_unit, product_type, width, height,
                    gusset, flap, press_type, print_orientation,
                    unwinding_direction, financial_approval,
                    technical_approval, on_hold, comments,
                    two_faces, side_gusset, bottom_gusset,
                    hole_handle, strip_handle, flip_direction
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    jobData.customer_id,
                    jobData.salesman,
                    jobData.entry_date,
                    jobNumber,
                    jobData.job_name,
                    jobData.quantity,
                    jobData.quantity_unit,
                    jobData.product_type,
                    jobData.width,
                    jobData.height,
                    jobData.gusset,
                    jobData.flap,
                    jobData.press_type,
                    jobData.print_orientation,
                    jobData.unwinding_direction,
                    jobData.financial_approval,
                    jobData.technical_approval,
                    jobData.on_hold,
                    jobData.comments,
                    jobData.two_faces,
                    jobData.side_gusset,
                    jobData.bottom_gusset,
                    jobData.hole_handle,
                    jobData.strip_handle,
                    jobData.flip_direction
                ]
            );
        }

        // Handle PLY data if exists
        if (req.body.plies && Array.isArray(req.body.plies)) {
            await connection.query(
                'DELETE FROM job_plies WHERE job_number = ?',
                [jobNumber]
            );

            const plyValues = req.body.plies
                .filter(ply => ply.material) // Only include plies with material
                .map((ply, index) => [
                    jobNumber,
                    index + 1,
                    ply.material,
                    ply.finish || null,
                    ply.thickness ? parseFloat(ply.thickness) : null
                ]);

            if (plyValues.length > 0) {
                await connection.query(
                    `INSERT INTO job_plies 
                    (job_number, position, material, finish, thickness) 
                    VALUES ?`,
                    [plyValues]
                );
            }
        }

        await connection.commit();
        
        return res.json({
            success: true,
            message: isUpdate ? 'Job updated successfully' : 'Job created successfully',
            jobNumber: jobNumber
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Save error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to save job data'
        });
    } finally {
        if (connection) connection.release();
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, customer_name, customer_code FROM customers ORDER BY customer_name');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

app.get('/api/all-jobs', async (req, res) => {
    try {
        const searchTerm = req.query.search || '';
        const statusFilter = req.query.status || '';
        
        let query = `
SELECT 
    j.job_number, 
    j.job_name, 
    j.salesman,
    j.press_type,
    j.product_type,
    c.customer_name,
    DATE_FORMAT(j.created_at, '%e-%b-%Y %H:%i:%s') as created_date,
    j.financial_approval,
    j.technical_approval,
    j.on_hold,
    j.sc_sent_to_sales,
    j.sc_sent_to_qc,
    j.working_on_cromalin,
    j.cromalin_qc_check,
    j.cromalin_ready,
    j.working_on_repro,
    j.plates_ready,
    j.sc_checked,
    j.cromalin_checked,
    j.plates_received,
    j.plates_checked,
    u.full_name as handler_name,  -- Add handler name
    (
        SELECT MAX(status_date) 
        FROM job_status_history jsh 
        JOIN status_types st ON jsh.status_type_id = st.id
        WHERE jsh.job_number = j.job_number AND st.status_name = 'on_hold'
    ) as on_hold_date,
    CASE
    WHEN j.plates_checked = 1 THEN 'Ready for Press'
    WHEN q.plates_received = 1 THEN 'QC Received Plates'
    WHEN j.plates_received = 1 THEN 'Prepress Received Plates'
    WHEN j.working_on_repro = 1 THEN 'Working on Repro'
    WHEN j.cromalin_ready = 1 OR j.cromalin_checked = 1 THEN 'Need Cromalin Approval'
    WHEN j.cromalin_qc_check = 1 THEN 'Working on Cromalin'
    WHEN j.working_on_cromalin = 1 THEN 'Working on Cromalin'
    WHEN j.sc_checked = 1 THEN 
        CASE 
            WHEN j.press_type = 'Central Drum' THEN 'SC Checked, Need Cromalin'
            WHEN j.press_type = 'Stack Type' THEN 'SC Checked, Need Plates'
            ELSE 'SC Checked'
        END
    WHEN j.sc_sent_to_qc = 1 THEN 'SC Under QC Check'
    WHEN j.sc_sent_to_sales = 1 THEN 'Need SC Approval'
    WHEN j.working_on_softcopy = 1 THEN 'Working on softcopy'
    WHEN j.financial_approval = 1 AND j.technical_approval = 1 THEN 'Working on Job-Study'
    WHEN j.on_hold = 1 THEN 'On Hold'
    WHEN j.technical_approval = 1 THEN 'Technically Approved'
    WHEN j.financial_approval = 1 THEN 'Financially Approved'
    ELSE 'Under Review'
    END as status
FROM jobs j
JOIN customers c ON j.customer_id = c.id
LEFT JOIN qc_data q ON j.job_number = q.job_number
LEFT JOIN prepress_data pd ON j.job_number = pd.job_number
LEFT JOIN users u ON pd.handler_id = u.id
        `;
        
        const conditions = [];
        const params = [];
        
        if (searchTerm) {
            conditions.push(`(j.job_number LIKE ? OR j.job_name LIKE ? OR c.customer_name LIKE ? OR j.salesman LIKE ?)`);
            const searchParam = `%${searchTerm}%`;
            params.push(searchParam, searchParam, searchParam, searchParam);
        }
        
        if (statusFilter) {
            conditions.push(`CASE
    WHEN j.plates_checked = 1 THEN 'Ready for Press'
    WHEN q.plates_received = 1 THEN 'QC Received Plates'
    WHEN j.plates_received = 1 THEN 'Prepress Received Plates'
    WHEN j.working_on_repro = 1 THEN 'Working on Repro'
    WHEN j.cromalin_ready = 1 OR j.cromalin_checked = 1 THEN 'Need Cromalin Approval'  -- Combined these
    WHEN j.cromalin_qc_check = 1 THEN 'Working on Cromalin'
    WHEN j.working_on_cromalin = 1 THEN 'Working on Cromalin'
    WHEN j.sc_checked = 1 THEN 
        CASE 
            WHEN j.press_type = 'Central Drum' THEN 'SC Checked, Need Cromalin'
            WHEN j.press_type = 'Stack Type' THEN 'SC Checked, Need Plates'
            ELSE 'SC Checked'
        END
    WHEN j.sc_sent_to_qc = 1 THEN 'SC Under QC Check'
    WHEN j.sc_sent_to_sales = 1 THEN 'Need SC Approval'
    WHEN j.working_on_softcopy = 1 THEN 'Working on softcopy'
    WHEN j.financial_approval = 1 AND j.technical_approval = 1 THEN 'Working on Job-Study'
    WHEN j.on_hold = 1 THEN 'On Hold'
    WHEN j.technical_approval = 1 THEN 'Technically Approved'
    WHEN j.financial_approval = 1 THEN 'Financially Approved'
    ELSE 'Under Review'
            END = ?`);
            params.push(statusFilter);
        }
        
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        query += ' ORDER BY j.created_at DESC';
        
        const [jobs] = await pool.query(query, params);
        
        const processedJobs = jobs.map(job => {
            if (job.status === 'On Hold' && job.on_hold_date) {
                const formattedDate = new Date(job.on_hold_date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                job.status = `On Hold Since ${formattedDate}`;
            }
            return job;
        });
        
        res.json(processedJobs);
        
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.get('/api/job-status-history/:jobNumber', async (req, res) => {
    try {
        const [history] = await pool.query(`
            SELECT 
                st.display_name as status,
                jsh.status_date,
                u.username as updated_by,
                jsh.notes
            FROM job_status_history jsh
            JOIN status_types st ON jsh.status_type_id = st.id
            LEFT JOIN users u ON jsh.user_id = u.id
            WHERE jsh.job_number = ?
            ORDER BY jsh.status_date DESC
        `, [req.params.jobNumber]);
        
        res.json(history);
    } catch (error) {
        console.error('Error fetching status history:', error);
        res.status(500).json({ error: 'Failed to fetch status history' });
    }
});

app.delete('/api/jobs/:jobNumber', async (req, res) => {
    try {
        await withTransaction(async (connection) => {
            const tables = [
                'job_status_history',
                'job_plies',
                'planning_data',
                'prepress_data',
                'prepress_colors',
                'qc_data'
            ];

            for (const table of tables) {
                await connection.query(`DELETE FROM ${table} WHERE job_number = ?`, [req.params.jobNumber]);
            }

            const [result] = await connection.query('DELETE FROM jobs WHERE job_number = ?', [req.params.jobNumber]);
            
            if (result.affectedRows === 0) {
                throw new Error(`Job ${req.params.jobNumber} not found`);
            }
        });

        return res.json({
            success: true,
            message: `Job deleted successfully`,
            deletedJobNumber: req.params.jobNumber
        });

    } catch (error) {
        console.error('Delete error:', error);
        return res.status(error.message.includes('not found') ? 404 : 500).json({
            success: false,
            message: error.message || 'Failed to delete job',
            errorCode: error.code
        });
    }
});

app.get('/api/jobs/:jobNumber', async (req, res) => {
    try {
        const [jobRows] = await pool.query(`
            SELECT 
                j.*,
                c.customer_name,
                c.customer_code,
                DATE_FORMAT(j.entry_date, '%Y-%m-%d') as formatted_entry_date
            FROM jobs j
            JOIN customers c ON j.customer_id = c.id
            WHERE j.job_number = ?
        `, [req.params.jobNumber]);

        if (jobRows.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: 'Job not found'
            });
        }

        const job = jobRows[0];
        const [plies] = await pool.query(`
            SELECT 
                id,
                job_number,
                position,
                material,
                finish,
                CAST(thickness AS CHAR) as thickness
            FROM job_plies 
            WHERE job_number = ?
            ORDER BY position
        `, [req.params.jobNumber]);

        let bagOptions = {};
        try {
            bagOptions = job.bag_options ? JSON.parse(job.bag_options) : {};
        } catch (e) {
            console.error('Error parsing bag_options:', e);
        }
        
        const mergedOptions = {
            twoFaces: job.two_faces !== undefined ? job.two_faces : bagOptions.twoFaces,
            sideGusset: job.side_gusset !== undefined ? job.side_gusset : bagOptions.sideGusset,
            bottomGusset: job.bottom_gusset !== undefined ? job.bottom_gusset : bagOptions.bottomGusset,
            holeHandle: job.hole_handle !== undefined ? job.hole_handle : bagOptions.holeHandle,
            stripHandle: job.strip_handle !== undefined ? job.strip_handle : bagOptions.stripHandle,
            flipDirection: job.flip_direction !== undefined ? job.flip_direction : bagOptions.flipDirection
        };

        res.json({
            success: true,
            data: {
                ...job,
                bag_options: mergedOptions,
                plies: plies.map(ply => ({
                    ...ply,
                    thickness: ply.thickness ? parseFloat(ply.thickness) : null
                })) || [],
                comments: job.comments || job.job_comments || ''  // Ensure comments are included
            }
        });

    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job details'
        });
    }
});
  app.get('/api/planning-data/:jobNumber', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          p.*,
          j.product_type,
          j.width,
          j.height,
          j.gusset,
          j.flap,
          j.two_faces,
          j.side_gusset,
          j.bottom_gusset,
          j.hole_handle,
          j.strip_handle,
          j.flip_direction,
          p.flip_direction as planning_flip_direction,
          p.add_lines,
          p.new_machine,
          p.add_stagger,
          COALESCE(p.comments, '') AS planning_comments
        FROM planning_data p
        JOIN jobs j ON p.job_number = j.job_number
        WHERE p.job_number = ?
      `, [req.params.jobNumber]);
  
      if (!rows.length) {
        return res.status(404).json({ 
          success: false, 
          message: 'Planning data not found' 
        });
      }
  
      return res.json({
        success: true,
        data: rows[0]
      });
  
    } catch (error) {
      console.error('Planning data error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch planning data',
        error: error.message
      });
    }
  });

    app.get('/api/prepress-data/:jobNumber', async (req, res) => {
        try {
          const [rows] = await pool.query(`
            SELECT 
              pd.id,
              pd.job_number,
              pd.supplier,
              pd.sc_sent_to_sales,
              pd.sc_sent_to_qc,
              pd.working_on_cromalin,
              pd.cromalin_qc_check,
              pd.cromalin_ready,
              pd.working_on_repro,
              pd.plates_received,
              COALESCE(pd.comments, '') AS prepress_comments,  -- Explicit alias
              pd.sc_image_url,
              pd.handler_id,
              u.full_name AS handler_name
            FROM prepress_data pd
            LEFT JOIN users u ON pd.handler_id = u.id
            WHERE pd.job_number = ?
          `, [req.params.jobNumber]);
      
          const [colors] = await pool.query(`
            SELECT color_name AS name 
            FROM prepress_colors 
            WHERE job_number = ?
            ORDER BY position
        `, [req.params.jobNumber]);

        // Combine the data with proper fallbacks
        const prepressData = rows[0] || {};
        res.json({
            success: true,
            data: {
                ...prepressData,
                sc_sent_to_qc: prepressData.sc_sent_to_qc || prepressData.job_sc_sent_to_qc || 0,
                colors: colors || []
            }
        });
    } catch (error) {
        console.error('Error fetching prepress data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch prepress data'
        });
    }
});

app.get('/api/qc-data/:jobNumber', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
              *,
              COALESCE(comments, '') AS qc_comments
            FROM qc_data 
            WHERE job_number = ?
        `, [req.params.jobNumber]);

        res.json({
            success: true,
            data: rows[0] || null
        });
    } catch (error) {
        console.error('Error fetching QC data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch QC data'
        });
    }
});

app.post('/api/save-planning-data', async (req, res) => {
    try {
        const { jobNumber, ...data } = req.body;
        
        if (!jobNumber) {
            return res.status(400).json({
                success: false,
                message: 'Job number is required'
            });
        }

        await withTransaction(async (connection) => {
            const [existing] = await connection.query(
                'SELECT id FROM planning_data WHERE job_number = ?',
                [jobNumber]
            );

            const planningData = [
                data.machine,
                data.horizontalCount,
                data.verticalCount,
                data.flipDirection || false,
                data.addLines || false,
                data.newMachine || false,
                data.addStagger || false,
                data.comments
            ];

            if (existing.length > 0) {
                await connection.query(
                    `UPDATE planning_data SET
                        machine = ?, horizontal_count = ?, vertical_count = ?,
                        flip_direction = ?, add_lines = ?, new_machine = ?,
                        add_stagger = ?, comments = ?, updated_at = NOW()
                    WHERE job_number = ?`,
                    [...planningData, jobNumber]
                );
            } else {
                await connection.query(
                    `INSERT INTO planning_data (
                        job_number, machine, horizontal_count, vertical_count,
                        flip_direction, add_lines, new_machine, add_stagger, comments
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [jobNumber, ...planningData]
                );
            }

            await connection.query(
                `UPDATE jobs SET 
                    working_on_softcopy = 1,
                    updated_at = NOW()
                 WHERE job_number = ?`,
                [jobNumber]
            );

            const [statusType] = await connection.query(
                'SELECT id FROM status_types WHERE display_name = ?',
                ['Working on softcopy']
            );
            
            if (statusType.length > 0) {
                await connection.query(
                    `INSERT INTO job_status_history 
                     (job_number, status_type_id, user_id, notes) 
                     VALUES (?, ?, ?, ?)`,
                    [jobNumber, statusType[0].id, req.body.handler_id || null, 'Planning data saved']
                );
            }
        });
        
        return res.json({
            success: true,
            message: 'Planning data saved successfully'
        });

    } catch (error) {
        console.error('Save planning error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to save planning data'
        });
    }
});

const recentPrepressRequests = new Set();

app.post('/api/save-prepress-data', async (req, res) => {
    const { jobNumber, colors = [], requestId, handler_id, ...data } = req.body;
    
    if (requestId && recentPrepressRequests.has(requestId)) {
        return res.status(200).json({
            success: true,
            message: 'Duplicate request ignored',
            duplicate: true
        });
    }
    
    try {
        // Get existing image URL if any
        const [existing] = await pool.query(
            'SELECT sc_image_url FROM prepress_data WHERE job_number = ?',
            [jobNumber]
        );
        const currentImageUrl = existing.length > 0 ? existing[0].sc_image_url : null;

        const prepressData = [
            data.supplier || null,
            data.sc_sent_to_sales || 0,
            data.sc_sent_to_qc || 0,
            data.working_on_cromalin || 0,
            data.cromalin_qc_check || 0,
            data.cromalin_ready || 0,
            data.working_on_repro || 0,
            data.plates_received || 0,
            data.comments || null,  // Ensure comments are included
            currentImageUrl,
            handler_id  // This is now required
        ];

        // Use a transaction for atomic updates
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            if (existing.length > 0) {
                await connection.query(
                    `UPDATE prepress_data SET
                        supplier = ?, sc_sent_to_sales = ?,
                        sc_sent_to_qc = ?, working_on_cromalin = ?, cromalin_qc_check = ?,
                        cromalin_ready = ?, working_on_repro = ?, plates_received = ?, comments = ?,
                        sc_image_url = ?, handler_id = ?, updated_at = NOW()
                    WHERE job_number = ?`,
                    [...prepressData, jobNumber]
                );
            } else {
                await connection.query(
                    `INSERT INTO prepress_data (
                        job_number, supplier, sc_sent_to_sales,
                        sc_sent_to_qc, working_on_cromalin, cromalin_qc_check,
                        cromalin_ready, working_on_repro, plates_received, comments,
                        sc_image_url, handler_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [jobNumber, ...prepressData]
                );
            }

            // Handle colors update
            await connection.query(
                'DELETE FROM prepress_colors WHERE job_number = ?',
                [jobNumber]
            );

            if (colors.length > 0) {
                const colorValues = colors
                    .filter(color => color && color.name)
                    .map((color, index) => [
                        jobNumber,
                        color.name.substring(0, 50),
                        color.code || '#000000',
                        index
                    ]);

                if (colorValues.length > 0) {
                    await connection.query(
                        'INSERT INTO prepress_colors (job_number, color_name, color_code, position) VALUES ?',
                        [colorValues]
                    );
                }
            }

            await connection.commit();
            
            return res.json({
                success: true,
                message: 'Prepress data saved successfully',
                colorsSaved: colors.length
            });

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Save prepress error:', error);
        // Only send one error response
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to save prepress data'
        });
    }
});

// In server.js - Modify the upload endpoint
app.post('/api/upload-sc-image', upload.single('scImage'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const jobNumber = req.body.jobNumber;
    if (!jobNumber) {
        fs.unlinkSync(req.file.path); // Clean up temp file
        return res.status(400).json({ success: false, message: 'Job number is required' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // 1. Get existing image path
        const [existing] = await connection.query(
            'SELECT sc_image_url FROM prepress_data WHERE job_number = ? FOR UPDATE',
            [jobNumber]
        );

        // 2. Delete old file if exists
        if (existing.length > 0 && existing[0].sc_image_url) {
            const oldPath = path.join(__dirname, '../public', existing[0].sc_image_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        // 3. Process new upload
        const ext = path.extname(req.file.originalname);
        const filename = `sc_${jobNumber}_${Date.now()}${ext}`;
        const destPath = path.join(__dirname, '../public/uploads', filename);

        await fs.promises.rename(req.file.path, destPath);

        // 4. Update database
        await connection.query(
            'INSERT INTO prepress_data (job_number, sc_image_url) VALUES (?, ?) ' +
            'ON DUPLICATE KEY UPDATE sc_image_url = ?',
            [jobNumber, `/uploads/${filename}`, `/uploads/${filename}`]
        );

        await connection.commit();
        
        return res.json({ 
            success: true, 
            imageUrl: `/uploads/${filename}`,
            fullUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`
        });
    } catch (error) {
        await connection.rollback();
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error('Upload error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to upload image'
        });
    } finally {
        connection.release();
    }
});
app.get('/api/get-user-id', async (req, res) => {
    const username = req.query.username;
    if (!username) return res.json({ userId: null, fullName: null });
    
    try {
        const [rows] = await pool.query('SELECT id, full_name FROM users WHERE username = ?', [username]);
        res.json(rows.length > 0 ? { userId: rows[0].id, fullName: rows[0].full_name } : { userId: null, fullName: null });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ userId: null, fullName: null });
    }
});

app.post('/api/save-qc-data', async (req, res) => {
    try {
        const { jobNumber, cromalinChecked, handler_id } = req.body;
        
        if (!jobNumber) {
            return res.status(400).json({
                success: false,
                message: 'Job number is required'
            });
        }

        await withTransaction(async (connection) => {
            const [existing] = await connection.query(
                'SELECT id FROM qc_data WHERE job_number = ?',
                [jobNumber]
            );

            if (existing.length > 0) {
                await connection.query(
                    `UPDATE qc_data SET
                        cromalin_checked = ?,
                        updated_at = NOW()
                    WHERE job_number = ?`,
                    [cromalinChecked ? 1 : 0, jobNumber]
                );
            } else {
                await connection.query(
                    `INSERT INTO qc_data (
                        job_number, cromalin_checked
                    ) VALUES (?, ?)`,
                    [jobNumber, cromalinChecked ? 1 : 0]
                );
            }

            await connection.query(
                `UPDATE jobs SET 
                    cromalin_checked = ?,
                    updated_at = NOW()
                 WHERE job_number = ?`,
                [cromalinChecked ? 1 : 0, jobNumber]
            );

            if (cromalinChecked) {
                const [statusType] = await connection.query(
                    'SELECT id FROM status_types WHERE status_name = ?',
                    ['cromalin_checked']
                );
                
                if (statusType.length > 0) {
                    await connection.query(
                        `INSERT INTO job_status_history 
                         (job_number, status_type_id, user_id, notes) 
                         VALUES (?, ?, ?, ?)`,
                        [jobNumber, statusType[0].id, handler_id || null, 'Cromalin checked by QC']
                    );
                }
            }
        });
        
        return res.json({
            success: true,
            message: 'QC data saved successfully'
        });

    } catch (error) {
        console.error('Save QC error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to save QC data'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Welcome back,`);
    console.log(`\x1b[1mMahmoud Khadary\x1b[0m`);
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;