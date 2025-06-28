// formHandlers.js

// Constants for reusable values
const EVENT_LISTENERS = {
    change: 'change',
    input: 'input',
    click: 'click'
};

const BAG_OPTION_IDS = [
    'twoFacesCheckbox',
    'twoFacesTShirtCheckbox',
    'sideGussetCheckbox',
    'bottomGussetCheckbox',
    'holeHandle',
    'stripHandle',
    'flipDirectionCheckbox'
];

const PLANNING_CHECKBOX_IDS = [
    'planning-flip-direction',
    'planning-add-lines',
    'planning-new-machine',
    'planning-add-stagger'
];

const COUNT_INPUT_IDS = ['horizontal-count', 'vertical-count', 'machine-select'];
// In formHandlers.js - around line 30 where other event listeners are set up
document.getElementById('upload-image')?.addEventListener('change', function() {
    const btn = this;
    btn.disabled = true; // Disable during upload
    
    updateImagePreview(this)
        .finally(() => {
            btn.disabled = false; // Re-enable when done
        });
});

document.getElementById('remove-image-btn')?.addEventListener('click', removeUploadedImage);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize preview system FIRST
    initializePreview();
    initializeFormHandlers();
});

function initializeFormHandlers() {
    setCurrentSalesman();
    setupSaveButtons();
    setupJobSelection();
    setupCustomerAutocomplete();
    setupCheckboxListeners(BAG_OPTION_IDS, handleBagOptionChange);
    setupCheckboxListeners(PLANNING_CHECKBOX_IDS, handlePlanningChange);
    setupCountInputListeners();
    setupSVGDownload();


    document.getElementById('upload-image')?.addEventListener('change', function() {
        updateImagePreview(this);
    });
    document.getElementById('remove-image-btn')?.addEventListener('click', removeUploadedImage);

    // Softcopy Approval Handler
    document.getElementById('softcopy-approval')?.addEventListener('change', async function() {
        const jobNumber = getValue('job-number');
        if (!jobNumber) {
            showNotification('Job number not found. Please select a job first.', 'error');
            this.checked = false;
            return;
        }
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const response = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus: this.checked ? 'SC Under QC Check' : 'Working on softcopy',
                    handler_id: currentUser.id,
                    notes: 'Status changed via softcopy approval checkbox'
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to update status');
            }
            if (typeof loadJobs === 'function') loadJobs();
            showNotification(`Status updated to "${this.checked ? 'SC Under QC Check' : 'Working on softcopy'}"`, 'success');
            await updatePrepressData(jobNumber, this.checked);
        } catch (error) {
            console.error('Status update error:', error);
            this.checked = !this.checked;
            showNotification(error.message || 'Failed to update status', 'error');
        }
    });

    // "Send SC to Sales" Handler (Need SC Approval)
    document.getElementById('aw-sc-approval')?.addEventListener('change', async function() {
        const jobNumber = getValue('job-number');
        if (!jobNumber) {
            showNotification('Job number not found. Please select a job first.', 'error');
            this.checked = false;
            return;
        }
        try {
            if (this.checked) {
                const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
                // First clear working_on_softcopy
                await fetch('/api/update-job-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jobNumber,
                        newStatus: 'Working on softcopy',  // This clears the flag
                        handler_id: currentUser.id,
                        notes: 'Clearing working_on_softcopy flag'
                    })
                });
                // Then set Need SC Approval
                await updateJobStatus(jobNumber, 'Need SC Approval');
                if (typeof loadJobs === 'function') loadJobs();
                showNotification('Status updated to "Need SC Approval"', 'success');
            }
        } catch (error) {
            console.error('aw-sc-approval status update error:', error);
            this.checked = !this.checked;
            showNotification(error.message || 'Failed to update status', 'error');
        }
    });
    // Working on cromalin status
    document.getElementById('aw-working-cromalin')?.addEventListener('change', async function() {
        try {
            console.log('Working on Cromalin checkbox changed - checked:', this.checked);
            
            const jobNumber = getValue('job-number');
            if (!jobNumber) {
                showNotification('Job number not found. Please select a job first.', 'error');
                this.checked = !this.checked; // Revert the change
                return;
            }
    
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const newStatus = this.checked ? 'Working on Cromalin' : 'SC Checked';
    
            console.log('Attempting to update status to:', newStatus);
            
            // Update status through API
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus,
                    handler_id: currentUser.id,
                    notes: 'Status changed via Working on Cromalin checkbox'
                })
            });
            
            const statusResult = await statusResponse.json();
            console.log('Status update response:', statusResult);
            
            if (!statusResponse.ok || !statusResult.success) {
                throw new Error(statusResult.message || 'Failed to update status');
            }
    
            // Update prepress data
            const prepressResponse = await fetch('/api/save-prepress-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    working_on_cromalin: this.checked,
                    handler_id: currentUser.id,
                    requestId: Date.now()
                })
            });
            
            const prepressResult = await prepressResponse.json();
            console.log('Prepress update response:', prepressResult);
            
            if (!prepressResponse.ok || !prepressResult.success) {
                throw new Error(prepressResult.message || 'Failed to update prepress data');
            }
    
            showNotification(`Status updated to "${newStatus}"`, 'success');
            
            // Refresh the UI
            if (typeof loadJobs === 'function') {
                loadJobs();
            }
            
        } catch (error) {
            console.error('Error in checkbox handler:', error);
            this.checked = !this.checked; // Revert the checkbox on error
            showNotification(error.message || 'Failed to update status', 'error');
        }
    });
// Cromalin Approval Checkbox Handler
document.getElementById('qc-cromalin-checked')?.addEventListener('change', async function() {
    const originalCheckedState = this.checked;
    const jobNumber = getValue('job-number');
    
    if (!jobNumber) {
        showNotification('Job number not found. Please select a job first.', 'error');
        this.checked = !originalCheckedState;
        return;
    }

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // Update the QC data
        const qcResponse = await fetch('/api/save-qc-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobNumber,
                cromalinChecked: this.checked,
                handler_id: currentUser.id,
                notes: this.checked ? 'Cromalin approved by QC' : 'Cromalin approval reverted'
            })
        });
        
        if (!qcResponse.ok) {
            throw new Error('Failed to update QC data');
        }

        // Only update status if checked
        if (this.checked) {
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus: 'Need Cromalin Approval',
                    handler_id: currentUser.id,
                    notes: 'Cromalin QC completed'
                })
            });

            if (!statusResponse.ok) {
                throw new Error('Failed to update status');
            }
        } else {
            // When unchecking, revert to Working on Cromalin
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus: 'Working on Cromalin',
                    handler_id: currentUser.id,
                    notes: 'Cromalin needs rework'
                })
            });

            if (!statusResponse.ok) {
                throw new Error('Failed to revert status');
            }
        }

        showNotification(
            this.checked 
                ? 'Status updated to "Need Cromalin Approval"'
                : 'Status reverted to "Working on Cromalin"',
            'success'
        );

        if (typeof loadJobs === 'function') loadJobs();
        if (typeof loadDepartmentData === 'function') await loadDepartmentData(jobNumber);

    } catch (error) {
        console.error('Cromalin approval failed:', error);
        this.checked = !originalCheckedState;
        showNotification(error.message || 'Failed to update Cromalin status', 'error');
    }
});

    // working on repro

    document.getElementById('aw-cromalin-approval')?.addEventListener('change', async function() {
        try {
            console.log('Cromalin Approval checkbox changed - checked:', this.checked);
    
            const jobNumber = getValue('job-number');
            if (!jobNumber) {
                showNotification('Job number not found. Please select a job first.', 'error');
                this.checked = !this.checked; // Revert the change
                return;
            }
    
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    
            // Only update status when checked
            if (this.checked) {
                console.log('Attempting to update status to: Working on Repro');
    
                // Update status through API
                const statusResponse = await fetch('/api/update-job-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jobNumber,
                        newStatus: 'Working on Repro',
                        handler_id: currentUser.id,
                        notes: 'Status changed via Cromalin Approval checkbox'
                    })
                });
    
                const statusResult = await statusResponse.json();
                console.log('Status update response:', statusResult);
    
                if (!statusResponse.ok || !statusResult.success) {
                    throw new Error(statusResult.message || 'Failed to update status');
                }
    
                // Update prepress data (if needed)
                const prepressResponse = await fetch('/api/save-prepress-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jobNumber,
                        working_on_repro: true,
                        handler_id: currentUser.id,
                        requestId: Date.now()
                    })
                });
    
                const prepressResult = await prepressResponse.json();
                console.log('Prepress update response:', prepressResult);
    
                if (!prepressResponse.ok || !prepressResult.success) {
                    throw new Error(prepressResult.message || 'Failed to update prepress data');
                }
    
                showNotification('Status updated to "Working on Repro"', 'success');
    
                // Refresh the UI
                if (typeof loadJobs === 'function') {
                    loadJobs();
                }
            }
    
        } catch (error) {
            console.error('Error in checkbox handler:', error);
            this.checked = !this.checked; // Revert the checkbox on error
            showNotification(error.message || 'Failed to update status', 'error');
        }
    });

// Prepress received plates
document.getElementById('aw-plates-received')?.addEventListener('change', async function() {
    try {
        const jobNumber = getValue('job-number');
        if (!jobNumber) {
            showNotification('Please select a job first', 'error');
            this.checked = false;
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // 1. First update the prepress data
        const prepressResponse = await fetch('/api/save-prepress-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobNumber,
                plates_received: this.checked ? 1 : 0,
                handler_id: currentUser.id,
                requestId: Date.now()
            })
        });

        if (!prepressResponse.ok) {
            throw new Error('Failed to update prepress data');
        }

        // 2. Then update the status if checked
        if (this.checked) {
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus: 'Prepress Received Plates', // Must match exactly
                    handler_id: currentUser.id,
                    notes: 'Plates received from supplier'
                })
            });

            if (!statusResponse.ok) {
                throw new Error('Failed to update status');
            }
        }

        // Refresh the UI
        if (typeof loadJobs === 'function') loadJobs();
        showNotification(
            this.checked 
                ? 'Status updated to "Prepress Received Plates"' 
                : 'Plates receipt reverted',
            'success'
        );

    } catch (error) {
        console.error('Update failed:', error);
        this.checked = !this.checked;
        showNotification(error.message, 'error');
    }
});
// QC received plates
document.getElementById('qc-plates-received')?.addEventListener('change', async function() {
    const jobNumber = getValue('job-number');
    if (!jobNumber) {
        showNotification('Please select a job first', 'error');
        this.checked = !this.checked; // Revert the change
        return;
    }

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // Update both QC data and status in a single transaction
        const response = await fetch('/api/save-qc-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobNumber,
                platesReceived: this.checked,
                handler_id: currentUser.id,
                notes: this.checked ? 'Plates received by QC' : 'Plates receipt reverted',
                updateStatus: this.checked // Only update status when checked
            })
        });

        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to update QC data');
        }

        showNotification(
            this.checked 
                ? 'Status updated to "QC Received Plates"' 
                : 'Plates receipt reverted',
            'success'
        );

        if (typeof loadJobs === 'function') loadJobs();

    } catch (error) {
        console.error('Update failed:', error);
        this.checked = !this.checked; // Revert on error
        showNotification(error.message, 'error');
    }
});

// QC CHECKED PLATES / Ready for Press

document.getElementById('qc-plates-checked')?.addEventListener('change', async function() {
    const jobNumber = getValue('job-number');
    if (!jobNumber) {
        showNotification('Please select a job first', 'error');
        this.checked = false;
        return;
    }

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // Only proceed if checkbox is checked (not when unchecked)
        if (this.checked) {
            // First update the QC data
            const qcResponse = await fetch('/api/save-qc-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    platesChecked: true,
                    handler_id: currentUser.id
                })
            });

            if (!qcResponse.ok) throw new Error('Failed to update QC data');

            // Then update the status
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    newStatus: 'Ready for Press',
                    handler_id: currentUser.id,
                    notes: 'Plates QC completed'
                })
            });

            if (!statusResponse.ok) throw new Error('Failed to update status');

            showNotification('Status updated to "Ready for Press"', 'success');
        } else {
            // When unchecked, just update QC data without changing status
            const qcResponse = await fetch('/api/save-qc-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    platesChecked: false,
                    handler_id: currentUser.id
                })
            });

            if (!qcResponse.ok) throw new Error('Failed to update QC data');
            showNotification('Plates QC status reverted', 'info');
        }

        if (typeof loadJobs === 'function') loadJobs();
    } catch (error) {
        console.error('Update failed:', error);
        this.checked = !this.checked;
        showNotification(error.message, 'error');
    }
});

    async function updatePrepressData(jobNumber, isApproved) {
        try {
            const response = await fetch('/api/save-prepress-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    sc_sent_to_qc: isApproved,
                    working_on_softcopy: !isApproved
                })
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to update prepress data');
            }
        } catch (error) {
            console.error('Prepress data update error:', error);
        }
    }
}

function setupSaveButtons() {
    const saveButtons = {
        'save-Sales-btn': saveSalesData,
        'save-planning-btn': savePlanningData,
        'save-aw-btn': savePrepressData,
        'save-qc-btn': saveQCData
    };
    Object.entries(saveButtons).forEach(([id, handler]) => {
        document.getElementById(id)?.addEventListener(EVENT_LISTENERS.click, handler);
    });
}

function setupJobSelection() {
    document.addEventListener('jobSelected', async (e) => {
        if (e.detail.jobData) {
            populateSalesForm(e.detail.jobData);
            // Explicitly trigger preview update
            setTimeout(() => {
                if (typeof updatePreviewFromForm === 'function') {
                    updatePreviewFromForm();
                    console.log('Preview update triggered');
                }
            }, 100);
        }
        await loadDepartmentData(e.detail.jobNumber);
    });
}

function setupCustomerAutocomplete() {
    const customerNameInput = document.getElementById('customer-name');
    if (!customerNameInput) return;
    customerNameInput.addEventListener(EVENT_LISTENERS.input, debounce(async function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length < 2) return;
        try {
            const response = await fetch(`/api/customers?search=${encodeURIComponent(searchTerm)}`);
            const customers = await response.json();
            console.log('Matching customers:', customers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }, 300));
}

function setupCheckboxListeners(ids, handler) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener(EVENT_LISTENERS.change, handler);
        }
    });
}

function handleBagOptionChange() {
    if (typeof updateProductUI === 'function') updateProductUI();
    if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
}

function handlePlanningChange() {
    if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
}

function setupCountInputListeners() {
    COUNT_INPUT_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener(EVENT_LISTENERS.change, handleCountChange);
        if (id.includes('count')) {
            el.addEventListener(EVENT_LISTENERS.input, handleCountChange);
        }
    });
}

function handleCountChange() {
    if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
}

function setupSVGDownload() {
    document.getElementById('download-svg-btn')?.addEventListener(EVENT_LISTENERS.click, downloadSVG);
}

function downloadSVG() {
    const svg = document.getElementById('autodraw-svg');
    if (!svg) {
        alert('SVG preview not found!');
        return;
    }
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    svgString = '<?xml version="1.0" standalone="no"?>\n' + svgString;
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bag-preview-${new Date().toISOString().slice(0,10)}.svg`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

function initializePreview() {
    setTimeout(() => {
        if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
    }, 500);
}

async function loadDepartmentData(jobNumber) {
    if (!jobNumber) {
        console.warn('No job number provided to loadDepartmentData');
        return;
    }
    
    try {
        const salesResponse = await fetch(`/api/jobs/${jobNumber}`);
        if (!salesResponse.ok) throw new Error(`Failed to fetch sales data: ${salesResponse.status}`);
        const salesResult = await salesResponse.json();
        if (!salesResult.success) throw new Error(salesResult.message || 'Invalid sales data received');
        const salesData = processSalesData(salesResult.data);
        populateSalesForm(salesData);

        const planningResponse = await fetch(`/api/planning-data/${jobNumber}`);
        if (planningResponse.ok) {
            const planningResult = await planningResponse.json();
            if (planningResult.success) {
                const planningData = {
                    ...planningResult.data,
                    product_type: planningResult.data?.product_type || salesData.product_type,
                    horizontal_count: planningResult.data?.horizontal_count || 1,
                    vertical_count: planningResult.data?.vertical_count || 1,
                    flip_direction: planningResult.data?.flip_direction || false,
                    add_lines: planningResult.data?.add_lines || false,
                    new_machine: planningResult.data?.new_machine || false,
                    add_stagger: planningResult.data?.add_stagger || false
                };
                populatePlanningForm(planningData);
            }
        }
        const prepressResponse = await fetch(`/api/prepress-data/${jobNumber}`);
        if (prepressResponse.ok) {
            const prepressResult = await prepressResponse.json();
            if (prepressResult.success) {
                const prepressData = {
                    ...prepressResult.data,
                    colors: prepressResult.data?.colors || []
                };
                populatePrepressForm(prepressResult.data);
            }
        }
        const qcResponse = await fetch(`/api/qc-data/${jobNumber}`);
        if (qcResponse.ok) {
            const qcResult = await qcResponse.json();
            if (qcResult.success) {
                populateQCForm(qcResult.data);
            }
        }
    } catch (error) {
        console.error('Error loading department data:', error);
    }
}

function processSalesData(rawData) {
    if (!rawData) return null;
    
    // Ensure all checkbox fields have proper defaults
    const defaults = {
        two_faces: false,
        side_gusset: false,
        bottom_gusset: false,
        hole_handle: false,
        strip_handle: false,
        flip_direction: false,
        comments: ''
    };

    return {
        ...defaults,
        ...rawData,
        entry_date: rawData.entry_date || rawData.formatted_entry_date || new Date().toISOString().split('T')[0],
        customer_name: rawData.customer_name || '',
        customer_code: rawData.customer_code || ''
    };
}

// Generic function to populate any comment field
function populateComment(containerId, commentText) {
    const element = document.getElementById(containerId);
    if (element) {
      element.textContent = commentText || ''; // Always fallback to empty string
      console.log(`Populated ${containerId}:`, commentText);
    } else {
      console.error(`Element #${containerId} not found!`);
    }
  }

  function populateSalesForm(jobData) {
    if (!jobData) {
        console.error('No job data provided to populateSalesForm');
        return;
    }

    console.log('Populating form with:', jobData);

    // 1. Handle comments FIRST (special case for textContent)
    const commentsEl = document.getElementById('comments');
    const commentsText = jobData?.comments || jobData?.job_comments || '';
    if (commentsEl) {
        commentsEl.textContent = commentsText;
        console.log('Comments set:', commentsText);
    } else {
        console.warn('Comments element not found');
    }

    // 2. Set basic text/number fields
    const fieldsToSet = {
        // Customer Info
        'customer-name': jobData.customer_name || '',
        'customer-code': jobData.customer_code || '',
        'salesman': jobData.salesman || '',
        
        // Job Info
        'job-number': jobData.job_number || '',
        'job-name': jobData.job_name || '',
        'quantity': jobData.quantity || '',
        'quantity-unit': jobData.quantity_unit || 'select-unit',
        
        // Product Details
        'widthInput': jobData.width !== null && jobData.width !== undefined ? jobData.width : '',
        'heightInput': jobData.height !== null && jobData.height !== undefined ? jobData.height : '',
        'gussetInput': jobData.gusset !== null && jobData.gusset !== undefined ? jobData.gusset : '',
        'flapInput': jobData.flap !== null && jobData.flap !== undefined ? jobData.flap : '',
        
        // Technical Details
        'press-type': jobData.press_type || '',
        'print-orientation': jobData.print_orientation || '',
        'unwinding-direction': jobData.unwinding_direction || ''
    };

    // Set entry date separately to handle date formatting
    const entryDateInput = document.getElementById('entry-date');
    if (jobData.entry_date) {
        const dateObj = new Date(jobData.entry_date);
        entryDateInput.value = isNaN(dateObj) ? jobData.entry_date : dateObj.toISOString().split('T')[0];
    } else {
        entryDateInput.value = new Date().toISOString().split('T')[0];
    }

    // Set all basic fields
    Object.entries(fieldsToSet).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        } else {
            console.warn(`Element #${id} not found`);
        }
    });

    // 3. Set product type (triggers UI updates)
    const productTypeSelect = document.getElementById('product-type');
    if (productTypeSelect) {
        productTypeSelect.value = jobData.product_type || '';
        productTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('Set product type to:', productTypeSelect.value);
    }

    // 4. Set checkboxes with proper fallbacks
    const checkboxesToSet = {
        // Approval Status
        'financial-approval': Boolean(jobData.financial_approval),
        'technical-approval': Boolean(jobData.technical_approval),
        'on-hold': Boolean(jobData.on_hold),
        
        // Bag Options
        'twoFacesCheckbox': Boolean(jobData.two_faces),
        'twoFacesTShirtCheckbox': Boolean(jobData.two_faces),
        'sideGussetCheckbox': Boolean(jobData.side_gusset),
        'bottomGussetCheckbox': Boolean(jobData.bottom_gusset),
        'holeHandle': Boolean(jobData.hole_handle),
        'stripHandle': Boolean(jobData.strip_handle),
        'flipDirectionCheckbox': Boolean(jobData.flip_direction)
    };

    Object.entries(checkboxesToSet).forEach(([id, value]) => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = value;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`Set checkbox ${id} to:`, value);
        } else {
            console.warn(`Checkbox #${id} not found`);
        }
    });

    // 5. Set PLY data if exists
    if (jobData.plies && jobData.plies.length > 0) {
        if (window.plyFields && typeof window.plyFields.populateFromData === 'function') {
            window.plyFields.populateFromData(jobData.plies);
            console.log('Populated PLY fields');
        }
    } else if (window.plyFields && typeof window.plyFields.setupContainer === 'function') {
        window.plyFields.setupContainer();
    }

    // 6. Update UI based on product type
    const productType = (jobData.product_type || '').toLowerCase();
    const toggleVisibility = (elementId, shouldShow) => {
        const el = document.getElementById(elementId);
        if (el) {
            el.classList.toggle('hidden', !shouldShow);
        }
    };

    // Toggle product-specific options
    toggleVisibility('three-side-bag-options', productType.includes('3 side'));
    toggleVisibility('shopping-bag-specific', productType.includes('shopping'));
    toggleVisibility('t-shirt-bag-options', productType.includes('t-shirt'));
    toggleVisibility('common-options', !productType.includes('t-shirt') && !productType.includes('roll'));

    // 7. Force preview update after all fields are set
    setTimeout(() => {
        if (typeof updatePreviewFromForm === 'function') {
            console.log('Triggering preview update');
            updatePreviewFromForm();
            
            // Explicitly expand preview container
            const previewContainer = document.getElementById('preview-container');
            if (previewContainer) {
                previewContainer.style.display = 'block';
                previewContainer.style.height = 'auto';
                console.log('Preview container expanded');
            }
        }
    }, 150);
}

function populatePlanningForm(data) {
    if (!data) return;
    populateComment('planning-comments', data.planning_comments || data.comments);
    const setCheckbox = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            el.checked = Boolean(value);
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };
    setCheckbox('planning-flip-direction', data.flip_direction);
    setCheckbox('planning-add-lines', data.add_lines);
    setCheckbox('planning-new-machine', data.new_machine);
    setCheckbox('planning-add-stagger', data.add_stagger);
    document.getElementById('machine-select').value = data.machine || '';
    const hCountInput = document.getElementById('horizontal-count');
    const vCountInput = document.getElementById('vertical-count');
    hCountInput.value = data.horizontal_count || 1;
    vCountInput.value = data.vertical_count || 1;
    hCountInput.dispatchEvent(new Event('input', { bubbles: true }));
    vCountInput.dispatchEvent(new Event('input', { bubbles: true }));
    const commentsElement = document.getElementById('planning-comments');
    if (commentsElement) commentsElement.textContent = data.comments || '';
    setTimeout(() => {
        if (typeof updatePreview === 'function') {
            currentBagOptions = {
                flipDirection: document.getElementById('planning-flip-direction').checked,
                addLines: document.getElementById('planning-add-lines').checked,
                newMachine: document.getElementById('planning-new-machine').checked,
                addStagger: document.getElementById('planning-add-stagger').checked,
                ...currentBagOptions
            };
            updatePreview();
        }
    }, 50);
}

function updatePlanningOptionsVisibility(productType) {
    if (!productType) return;
    const type = productType.toLowerCase();
    const flipOption = document.getElementById('flip-direction-option');
    const linesOption = document.getElementById('add-lines-option');
    const machineOption = document.getElementById('new-machine-option');
    const staggerOption = document.getElementById('add-stagger-option');
    if (flipOption) flipOption.style.display = type.includes('3 side') ? 'block' : 'none';
    if (linesOption) linesOption.style.display = !type.includes('t-shirt') ? 'block' : 'none';
    if (machineOption) machineOption.style.display = type.includes('flat bottom') ? 'block' : 'none';
    if (staggerOption) staggerOption.style.display = !type.includes('t-shirt') ? 'block' : 'none';
}

function populatePrepressForm(data) {
    if (!data) {
        console.log('No prepress data received');
        return;
    }

    // Debug: Log the entire prepress data
    console.log('Prepress data received:', data);

    // 1. Handle comments - SINGLE SOURCE OF TRUTH
    const prepressComments = data.prepress_comments || data.comments || '';
    const commentsEl = document.getElementById('prepress-comments');
    if (commentsEl) {
        commentsEl.textContent = prepressComments;
        console.log('Prepress comments set:', prepressComments);
    } else {
        console.error('Prepress comments element not found!');
    }

    
    // 2. Handle color fields
    if (window.colorFields) {
        window.colorFields.setupContainer();
        if (Array.isArray(data.colors) && data.colors.length > 0) {
            window.colorFields.colorCount = 0;
            window.colorFields.cmykIndex = 0;
            data.colors.forEach(color => {
                if (color && color.name) {
                    window.colorFields.addColorFieldWithValue(
                        color.name,
                        color.code || '#000000'
                    );
                }
            });
            window.colorFields.updateCounter();
        } else {
            window.colorFields.addColorField();
        }
    }
    
    // 3. Set press type visibility
    const pressType = document.getElementById('press-type')?.value;
    toggleCromalinFields(pressType);

    // 4. Set checkbox values
    document.getElementById('status-elite').checked = data.supplier === 'elite';
    document.getElementById('status-tarkhan').checked = data.supplier === 'tarkhan';
    document.getElementById('aw-sc-approval').checked = Boolean(data.sc_sent_to_sales);
    document.getElementById('aw-working-cromalin').checked = Boolean(data.working_on_cromalin);
    document.getElementById('aw-cromalin-approval').checked = Boolean(data.cromalin_qc_check);
    document.getElementById('aw-working-repro').checked = Boolean(data.working_on_repro);
    document.getElementById('aw-plates-received').checked = Boolean(data.plates_received);
    
    // 5. Handle softcopy approval
    const softcopyApprovalCheckbox = document.getElementById('softcopy-approval');
    if (softcopyApprovalCheckbox) {
        softcopyApprovalCheckbox.checked = Boolean(data.sc_sent_to_qc);
    }
    
    // 6. Handle image preview
    const uploadedImage = document.getElementById('uploadedImage');
    const removeImageBtn = document.getElementById('remove-image-btn');
    if (data.sc_image_url) {
        uploadedImage.src = data.sc_image_url;
        uploadedImage.style.display = 'block';
        removeImageBtn.style.display = 'inline-block';
    } else {
        uploadedImage.style.display = 'none';
        removeImageBtn.style.display = 'none';
    }
}
function populateQCForm(data) {
    if (!data) return;
    populateComment('qc-comments', data.qc_comments || data.comments);
    document.getElementById('qc-sc-checked').checked = Boolean(data.sc_checked);
    document.getElementById('qc-cromalin-checked').checked = Boolean(data.cromalin_checked);
    document.getElementById('qc-plates-received').checked = Boolean(data.plates_received);
    document.getElementById('qc-plates-checked').checked = Boolean(data.plates_checked);
    document.getElementById('qc-comments').textContent = data.comments || '';
}

function addColorField(name = '', code = '') {
    const colorContainer = document.getElementById('color-fields-container');
    const colorField = document.createElement('div');
    colorField.className = 'color-field';
    colorField.innerHTML = `
        <input type="text" class="color-name-input" placeholder="Color Name" value="${name}">
        <input type="color" class="color-code-input" value="${code || '#ffffff'}">
        <button type="button" class="remove-color-btn">Remove from DB</button>
    `;
    colorContainer.appendChild(colorField);
    colorField.querySelector('.remove-color-btn').addEventListener('click', () => {
        colorField.remove();
        if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
    });
    const nameInput = colorField.querySelector('.color-name-input');
    const codeInput = colorField.querySelector('.color-code-input');
    nameInput.addEventListener('change', () => {
        if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
    });
    codeInput.addEventListener('change', () => {
        if (typeof updatePreviewFromForm === 'function') updatePreviewFromForm();
    });
}

function getValue(id, returnNullIfEmpty = false) {
    const element = document.getElementById(id);
    if (!element) return null;
    const value = element.value ? element.value.trim() : '';
    return returnNullIfEmpty && !value ? null : value;
}

function getNumberValue(id, defaultValue = null) {
    const value = parseFloat(document.getElementById(id)?.value || '');
    return isNaN(value) ? defaultValue : value;
}

function getCheckedValue(id) {
    return document.getElementById(id)?.checked || false;
}

function getTextContent(id) {
    const element = document.getElementById(id);
    return element ? element.textContent.trim() : '';
}

function setCurrentSalesman() {
    try {
        const salesmanField = document.getElementById('salesman');
        if (!salesmanField) return;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser?.fullName) {
            salesmanField.value = currentUser.fullName;
        }
    } catch (error) {
        console.error('Error setting salesman:', error);
    }
}

function showNotification(message, type = 'success') {
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(`${type.toUpperCase()}: ${message}`);
}

// In formHandlers.js, update the status change handlers:

async function updateJobStatus(jobNumber, newStatus) {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // First update the status through API
        const statusResponse = await fetch('/api/update-job-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobNumber,
                newStatus,
                handler_id: currentUser.id,
                notes: 'Status changed via dropdown'
            })
        });

        const result = await statusResponse.json();
        if (!statusResponse.ok || !result.success) {
            throw new Error(result.message || 'Failed to update status');
        }

        // Then update related department data if needed
        if (newStatus === 'SC Checked') {
            await fetch('/api/save-qc-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    sc_checked: true,
                    handler_id: currentUser.id
                })
            });
        }
        else if (newStatus === 'Ready for Press') {
            await fetch('/api/save-qc-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    plates_checked: true,
                    handler_id: currentUser.id
                })
            });
        }
        // Add other specific cases as needed

        return { success: true };
    } catch (error) {
        console.error('Status update error:', error);
        throw error;
    }
}

async function saveSalesData(e) {
    e.preventDefault();
    const saveButton = e.target;
    try {
        await ensureSalesmanField();
        if (!validateSalesForm()) return;
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        const formData = {
            customer_name: getValue('customer-name'),
            customer_code: getValue('customer-code'),
            salesman: getValue('salesman'),
            entry_date: getValue('entry-date'),
            job_number: getValue('job-number', true),
            job_name: getValue('job-name'),
            quantity: getNumberValue('quantity', 0),
            quantity_unit: getValue('quantity-unit'),
            product_type: getValue('product-type'),
            width: getNumberValue('widthInput'),
            height: getNumberValue('heightInput'),
            gusset: getNumberValue('gussetInput'),
            flap: getNumberValue('flapInput'),
            press_type: getValue('press-type'),
            print_orientation: getValue('print-orientation'),
            unwinding_direction: getValue('unwinding-direction'),
            financial_approval: getCheckedValue('financial-approval'),
            technical_approval: getCheckedValue('technical-approval'),
            on_hold: getCheckedValue('on-hold'),
            comments: getTextContent('comments'),
            two_faces: getCheckedValue('twoFacesCheckbox') || getCheckedValue('twoFacesTShirtCheckbox'),
            side_gusset: getCheckedValue('sideGussetCheckbox'),
            bottom_gusset: getCheckedValue('bottomGussetCheckbox'),
            hole_handle: getCheckedValue('holeHandle'),
            strip_handle: getCheckedValue('stripHandle'),
            flip_direction: getCheckedValue('flipDirectionCheckbox'),
            plies: window.plyFields.collectPLYs()
        };
        const response = await fetch('/api/save-sales-data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Failed to save data');
        const financialApproval = getCheckedValue('financial-approval');
        const technicalApproval = getCheckedValue('technical-approval');
        if (financialApproval && technicalApproval) {
            await updateJobStatus(result.jobNumber, 'Working on Job-Study');
        } else if (financialApproval) {
            await updateJobStatus(result.jobNumber, 'Financially Approved');
        } else if (technicalApproval) {
            await updateJobStatus(result.jobNumber, 'Technically Approved');
        }
        showNotification(`Sales Data saved successfully! Job Number: ${result.jobNumber}`, "success");
        document.getElementById('job-number').value = result.jobNumber;
    } catch (error) {
        console.error('Save error:', error);
        showNotification(error.message || 'Failed to save data. Please try again.', 'error');
    } finally {
        saveButton.disabled = false;
        saveButton.textContent = 'Save & Send Sales Data';
    }
}

async function savePlanningData(e) {
    e.preventDefault();
    const saveButton = e.target;
    try {
        const jobNumber = getValue('job-number');
        if (!jobNumber) throw new Error('Job number is required');
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const formData = {
            jobNumber,
            machine: getValue('machine-select'),
            horizontalCount: getNumberValue('horizontal-count', 1),
            verticalCount: getNumberValue('vertical-count', 1),
            flipDirection: getCheckedValue('planning-flip-direction'),
            addLines: getCheckedValue('planning-add-lines'),
            newMachine: getCheckedValue('planning-new-machine'),
            addStagger: getCheckedValue('planning-add-stagger'),
            comments: getTextContent('planning-comments'),
            handler_id: currentUser.id
        };
        const response = await fetch('/api/save-planning-data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Failed to save planning data');
        await updateJobStatus(jobNumber, 'Working on softcopy');
        showNotification(`Planning data saved successfully! Status updated to "Working on softcopy"`, "success");
        if (typeof loadJobs === 'function') loadJobs();
        document.dispatchEvent(new CustomEvent('jobStatusUpdated', {
            detail: {
                jobNumber,
                newStatus: 'Working on softcopy'
            }
        }));
        await loadDepartmentData(jobNumber);
    } catch (error) {
        console.error('Save error:', error);
        showNotification(error.message || 'Failed to save planning data', 'error');
    } finally {
        saveButton.disabled = false;
        saveButton.textContent = 'Save & Send Planning Data';
    }
}

async function uploadSCImage(jobNumber) {
    const fileInput = document.getElementById('upload-image');
    if (!fileInput.files || !fileInput.files[0]) return null;

    const progressBar = document.getElementById('upload-progress');
    if (progressBar) {
        progressBar.style.display = 'block';
        progressBar.value = 0;
    }

    try {
        const formData = new FormData();
        formData.append('scImage', fileInput.files[0]);
        formData.append('jobNumber', jobNumber);

        const xhr = new XMLHttpRequest();
        
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (e) => {
                if (progressBar) {
                    progressBar.value = (e.loaded / e.total) * 100;
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error('Upload failed'));
                }
            });

            xhr.addEventListener('error', () => reject(new Error('Upload failed')));
            xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

            xhr.open('POST', '/api/upload-sc-image', true);
            xhr.send(formData);
        });
    } finally {
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 1000);
        }
    }
}

// Global flag to track saving state
let isSavingPrepress = false;

async function savePrepressData(e) {
    e.preventDefault();
    
    // Prevent multiple simultaneous saves
    if (isSavingPrepress) {
        console.warn('Save already in progress');
        return;
    }
    
    const saveButton = e.target;
    const originalText = saveButton.textContent;
    
    try {
        // Set saving state
        isSavingPrepress = true;
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        
        const jobNumber = getValue('job-number');
        if (!jobNumber) throw new Error('Job number is required');

        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        if (!currentUser.id) throw new Error('User not authenticated');

        // Handle image upload first if exists
        const fileInput = document.getElementById('upload-image');
        let imageUrl = null;
        
        if (fileInput.files && fileInput.files[0]) {
            try {
                const uploadResponse = await uploadSCImage(jobNumber);
                if (uploadResponse && uploadResponse.success) {
                    imageUrl = uploadResponse.imageUrl;
                }
            } catch (uploadError) {
                console.error('Image upload failed:', uploadError);
                throw new Error('Failed to upload image');
            }
        }

        // Collect colors data
        const colors = window.colorFields?.collectColors() || [];
        
        // Determine supplier
        let supplier = '';
        if (document.getElementById('status-elite').checked) supplier = 'elite';
        else if (document.getElementById('status-tarkhan').checked) supplier = 'tarkhan';

        // Prepare form data
        const formData = {
            jobNumber,
            supplier,
            colors,
            sc_sent_to_sales: getCheckedValue('aw-sc-approval'),
            working_on_cromalin: getCheckedValue('aw-working-cromalin'),
            cromalin_qc_check: getCheckedValue('aw-cromalin-approval'),
            working_on_repro: getCheckedValue('aw-working-repro'),
            plates_received: getCheckedValue('aw-plates-received'),
            comments: getTextContent('prepress-comments'),
            handler_id: currentUser.id,
            requestId: Date.now() // Unique ID for this request
        };

        // Save to backend
        const response = await fetch('/api/save-prepress-data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to save prepress data');
        }

        showNotification('Prepress data saved successfully!', 'success');
        
        // Refresh department data
        if (typeof loadDepartmentData === 'function') {
            await loadDepartmentData(jobNumber);
        }

    } catch (error) {
        console.error('Save error:', error);
        showNotification(error.message || 'Failed to save prepress data', 'error');
        
        // Revert checkbox states if needed
        document.getElementById('aw-sc-approval').checked = !document.getElementById('aw-sc-approval').checked;
        document.getElementById('aw-working-cromalin').checked = !document.getElementById('aw-working-cromalin').checked;
        
    } finally {
        // Reset saving state
        isSavingPrepress = false;
        saveButton.disabled = false;
        saveButton.textContent = originalText;
    }
}

// Replace your image handling code with this
async function updateImagePreview(input) {
    if (!input.files || !input.files[0]) return;

    const jobNumber = getValue('job-number');
    if (!jobNumber) {
        showNotification('Please select a job first', 'error');
        input.value = '';
        return;
    }

    // Show temporary preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('uploadedImage');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('remove-image-btn').style.display = 'inline-block';
    };
    reader.readAsDataURL(input.files[0]);

    // Upload the file
    try {
        const formData = new FormData();
        formData.append('scImage', input.files[0]);
        formData.append('jobNumber', jobNumber);

        const response = await fetch('/api/upload-sc-image', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Upload failed');
        }

        // Update with final URL (force refresh)
        const img = document.getElementById('uploadedImage');
        img.src = result.fullUrl || result.imageUrl + '?t=' + Date.now();
        
    } catch (error) {
        console.error('Upload error:', error);
        showNotification(error.message || 'Failed to upload image', 'error');
        input.value = '';
        document.getElementById('uploadedImage').style.display = 'none';
        document.getElementById('remove-image-btn').style.display = 'none';
    }
}

function removeUploadedImage() {
    document.getElementById('upload-image').value = '';
    document.getElementById('uploadedImage').src = '';
    document.getElementById('uploadedImage').style.display = 'none';
    document.getElementById('remove-image-btn').style.display = 'none';
}

async function saveQCData(e) {
    e.preventDefault();
    const saveButton = e.target;
    const originalText = saveButton.textContent;
    
    try {
        const jobNumber = getValue('job-number');
        if (!jobNumber) {
            throw new Error('Job number is required');
        }

        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const scChecked = getCheckedValue('qc-sc-checked');
        const platesChecked = getCheckedValue('qc-plates-checked');
        
        // First save QC data
        const qcResponse = await fetch('/api/save-qc-data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                jobNumber,
                scChecked,
                cromalinChecked: getCheckedValue('qc-cromalin-checked'),
                platesReceived: getCheckedValue('qc-plates-received'),
                platesChecked,
                comments: getTextContent('qc-comments'),
                handler_id: currentUser.id
            })
        });

        const qcResult = await qcResponse.json();
        if (!qcResponse.ok || !qcResult.success) {
            throw new Error(qcResult.message || 'Failed to save QC data');
        }

        // Only update status if plates are checked
        if (platesChecked) {
            const statusResponse = await fetch('/api/update-job-status', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    jobNumber,
                    newStatus: 'Ready for Press',
                    handler_id: currentUser.id,
                    notes: 'Plates QC completed'
                })
            });
            
            const statusResult = await statusResponse.json();
            if (!statusResponse.ok || !statusResult.success) {
                // If status update fails, show a warning but don't throw error
                console.warn('QC data saved but status update failed:', statusResult.message);
                showNotification('QC data saved but status update failed: ' + (statusResult.message || 'Unknown error'), 'warning');
            } else {
                showNotification('QC data saved and status updated to "Ready for Press"', 'success');
            }
        } else {
            showNotification('QC data saved successfully', 'success');
        }

        if (typeof loadJobs === 'function') loadJobs();

    } catch (error) {
        console.error('QC save error:', error);
        showNotification(error.message || 'Failed to save QC data', 'error');
        
        // Revert checkboxes if save failed
        const scCheckbox = document.getElementById('qc-sc-checked');
        const platesCheckbox = document.getElementById('qc-plates-checked');
        if (scCheckbox) scCheckbox.checked = !scCheckbox.checked;
        if (platesCheckbox) platesCheckbox.checked = !platesCheckbox.checked;
    } finally {
        saveButton.disabled = false;
        saveButton.textContent = originalText;
    }
}

function validateSalesForm() {
    const requiredFields = [
        'customer-name', 'customer-code', 'entry-date',
        'job-name', 'quantity', 'product-type', 'press-type',
        'print-orientation', 'unwinding-direction'
    ];
    let isValid = true;
    let errorMessage = '';
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field?.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
            errorMessage = 'Please fill all required fields marked in red.';
        } else {
            field.style.borderColor = '';
        }
    });
    const quantityField = document.getElementById('quantity');
    const quantityValue = quantityField?.value.trim() || '';
    if (quantityValue === '') {
        quantityField.style.borderColor = 'red';
        isValid = false;
        errorMessage = 'Please fill all required fields marked in red.';
    } else {
        const numericValue = parseFloat(quantityValue);
        if (isNaN(numericValue) || numericValue <= 0) {
            quantityField.style.borderColor = 'red';
            isValid = false;
            errorMessage = 'Quantity must be a positive number.';
        } else {
            quantityField.style.borderColor = '';
        }
    }
    if (!isValid) showNotification(errorMessage, 'error');
    return isValid;
}

async function ensureSalesmanField() {
    const salesmanField = document.getElementById('salesman');
    if (!salesmanField?.value.trim()) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser?.fullName) {
            salesmanField.value = currentUser.fullName;
        } else {
            throw new Error('Salesman information is required');
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
