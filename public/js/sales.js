// sales.js

// Event listener for product type change to update image
document.getElementById("product-type").addEventListener("change", function() {
    // Get the selected value
    var selectedValue = this.value;

    // Get the image element
    var img = document.getElementById("displayImage");

    // Change the image source based on the selected value
    switch (selectedValue) {
        case "Roll":
            img.src = "img/Roll.jpg"; // Use the appropriate path for the image
            break;
        case "Center Seal":
            img.src = "img/Center Seal.jpg";
            break;
        case "Normal Bag":
            img.src = "img/Normal Bag.jpg"; // Ensure the path is correct
            break;
        case "Flat Bottom":
            img.src = "img/Flat Bottom.jpg";
            break;
        case "2 Side":
            img.src = "img/2 Side.jpg"; // Ensure the path is correct
            break;
        case "3 Side":
            img.src = "img/3 Side Seal.jpg";
            break;
        case "3 Side_K":
            img.src = "img/3 Side Seal K.jpg";
            break;
        case "3 Side_Stand up":
            img.src = "img/3 Side Seal Stand-up.jpg";
            break;
        case "4 Side":
            img.src = "img/4 Side Seal.jpg";
            break;
        case "Shopping Bag-Handle":
            img.src = "img/Shopping Bag-Handle.jpg"; // Choose the correct image
            break;
        case "Shopping Bag-Hole":
            img.src = "img/Shopping Bag-Hole.jpg"; // Choose the correct image
            break;
        case "T Shirt Bag":
            img.src = "img/T-Shirt Bag.jpg"; // Ensure the path is correct
            break;
        default:
            img.src = ""; // Reset if no valid option is selected
            break;
    }

    // Show or hide the image based on selection
    img.style.display = selectedValue ? "inline" : "none";
});

// Add modal logic to display the image in a larger format
document.getElementById("displayImage").addEventListener("click", function() {
    var img = this;
    if (img.src) {
        var modal = document.getElementById("imageModal");
        var modalImg = document.getElementById("modalImage");
        var captionText = document.getElementById("caption");

        // Show the modal
        modal.style.display = "block";
        // Set the source of the modal image and the caption
        modalImg.src = img.src;
        captionText.innerHTML = img.alt ? img.alt : "Selected Image"; // Use alt text if available
    }
});

// Close modal when clicking on the close button
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("imageModal").style.display = "none"; // Hide the modal
});

// Close modal when clicking outside of the modal image
window.onclick = function(event) {
    var modal = document.getElementById("imageModal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
    }
};

// Load the sales entry form
function loadSalesData(jobNumber) {
    const dataFieldsContainer = document.getElementById('data-fields');

    // Clear existing fields
    dataFieldsContainer.innerHTML = '';

    // Create a sales entry form
    dataFieldsContainer.innerHTML = `
        <h3>Sales Entry</h3>
        ${createGeneralInfoSection()}
        ${createTechnicalSpecsSection()}
        ${createPressSection()}

        <label>General Notes: <textarea id="general-notes" style="width: 100%; height: 100px;"></textarea></label><br/>

        <div id="action-buttons">
            <button id="save-btn" class="sales-button">Save</button>
            <button id="edit-btn" class="sales-button">Edit</button>
        </div>
    `;

    // If a job number is provided, load its existing data
    if (jobNumber) {
        loadJobData(jobNumber);
    }

    // Set event listener for the save button
    const saveButton = document.getElementById('save-btn');
    saveButton.addEventListener('click', saveSalesData);
}

// Create General Info Section
function createGeneralInfoSection() {
    return `
        <div id="general-info">
            <label>Salesman: <input type="text" id="salesman" /></label><br/>
            <label>Entry Date: <input type="text" id="entry-date" value="${new Date().toLocaleDateString()}" readonly /></label><br/>
            <label>Customer Name: <input type="text" id="customer-name" /></label><br/>
            <label>Customer Code: <input type="text" id="customer-code" /></label><br/>
            <label>Job Number: <input type="text" id="job-number" /></label><br/>
            <label>Job Name: <input type="text" id="job-name" /></label><br/>
        </div>
    `;
}

// Create Technical Specs Section
function createTechnicalSpecsSection() {
    return `
        <div id="technical-specs">
            <h4>Technical Specs</h4>
            <label>Product Type: <select id="product-type">
                <option value="">Select Product Type</option>
                <option value="Roll">Roll</option>
                <option value="Center Seal">Center Seal</option>
                <option value="Normal Bag">Normal Bag</option>
                <option value="Flat Bottom">Flat Bottom</option>
                <option value="2 Side">2 Side</option>
                <option value="3 Side">3 Side</option>
                <option value="3 Side_K">3 Side_K</option>
                <option value="3 Side_Stand Up">3 Side_Stand Up</option>
                <option value="4 Side">4 Side</option>
                <option value="Shopping Bag">Shopping Bag</option>
                <option value="T Shirt Bag">T Shirt Bag</option>
            </select></label><br/>
            <label>Design Width (cm): <input type="number" id="design-width" /> cm</label><br/>
            <label>Design Height (cm): <input type="number" id="design-height" /> cm</label><br/>
            <label>Design Gusset (cm): <input type="number" id="design-gusset" /> cm</label><br/>
            <label>Design Flap (cm): <input type="number" id="design-flap" /> cm</label><br/>
        </div>
    `;
}

// Function to update Entry Date when Job Name is filled
function updateEntryDate() {
    const jobName = document.getElementById('job-name').value;
    const entryDateField = document.getElementById('entry-date');
    if (jobName && !entryDateField.value) {
        entryDateField.value = new Date().toLocaleDateString();
    }
}

// Load job data for editing, if jobNumber is provided
function loadJobData(jobNumber) {
    fetch(`/getJobData?jobNumber=${jobNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Populate fields with existing data
            document.getElementById('salesman').value = data.salesman || '';
            document.getElementById('customer-name').value = data.customerName || '';
            document.getElementById('customer-code').value = data.customerCode || '';
            document.getElementById('job-number').value = data.jobNumber || '';
            document.getElementById('job-name').value = data.jobName || '';

            // Populate technical specs
            document.getElementById('product-type').value = data.productType || '';
            document.getElementById('design-width').value = data.designWidth || '';
            document.getElementById('design-height').value = data.designHeight || '';
            document.getElementById('design-gusset').value = data.designGusset || '';
            document.getElementById('design-flap').value = data.designFlap || '';

            // Check and populate additional fields if they exist
            if (data.pressType) {
                document.getElementById('press-type').value = data.pressType;
            }
            if (data.printOrientation) {
                document.getElementById('print-orientation').value = data.printOrientation;
            }
            if (data.unwindingDirection) {
                document.getElementById('unwinding-direction').value = data.unwindingDirection;
            }

            // Load PLY fields (assuming you have a function for this)
            if (Array.isArray(data.ply)) {
                data.ply.forEach((ply, index) => {
                    addPLYField(); // Assuming this function exists to add PLY fields
                    document.getElementById(`ply-type-${index + 1}`).value = ply.type || '';
                    document.getElementById(`ply-color-${index + 1}`).value = ply.color || '';
                });
            }

            document.getElementById('general-notes').value = data.notes || '';
        })
        .catch(err => console.error("Error loading job data:", err));
}

// Save data to the Excel sheet
function saveSalesData() {
    const salesData = {
        salesman: document.getElementById('salesman').value,
        customerName: document.getElementById('customer-name').value,
        customerCode: document.getElementById('customer-code').value,
        jobNumber: document.getElementById('job-number').value,
        jobName: document.getElementById('job-name').value,
        entryDate: document.getElementById('entry-date').value,
        productType: document.getElementById('product-type').value,
        designWidth: document.getElementById('design-width').value,
        designHeight: document.getElementById('design-height').value,
        designGusset: document.getElementById('design-gusset').value,
        designFlap: document.getElementById('design-flap').value,
        pressType: document.getElementById('press-type')?.value || '',
        printOrientation: document.getElementById('print-orientation')?.value || '',
        unwindingDirection: document.getElementById('unwinding-direction')?.value || '',
        printedPly: document.getElementById('printed-ply')?.value || '',
        printedPlyColor: document.getElementById('printed-ply-color')?.value || '',
        notes: document.getElementById('general-notes').value,
        ply: []
    };

    // Collect PLY information
    for (let i = 1; i <= plyCount; i++) {
        const plyType = document.getElementById(`ply-type-${i}`)?.value || '';
        const plyColor = document.getElementById(`ply-color-${i}`)?.value || '';
        if (plyType || plyColor) { // Push only if there's a type/color
            salesData.ply.push({ type: plyType, color: plyColor });
        }
    }

    // Send data to back-end to save into Excel sheet
    fetch('/saveSalesData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(salesData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert("Data saved successfully!");
        console.log(data);
    })
    .catch(error => console.error("Error saving data:", error));
}

// Function to edit existing entries (if necessary)
function editSalesData(jobNumber) {
    loadSalesData(jobNumber); // Reload the form with existing data
}

// DOMContentLoaded Event Handler for Section Navigation
document.addEventListener("DOMContentLoaded", function() {
    const salesBtn = document.getElementById('btn-sales');
    const planningBtn = document.getElementById('btn-planning');
    const awBtn = document.getElementById('btn-aw');
    const qcBtn = document.getElementById('btn-qc');
    const financeBtn = document.getElementById('btn-finance');
    const filesBtn = document.getElementById('btn-files');
    const resultsBtn = document.getElementById('btn-results');

    const generalInfoSection = document.getElementById('general-info-section');
    const technicalSpecsSection = document.getElementById('technical-specs-section');
    const pressSection = document.getElementById('press-section');
    const planningSection = document.getElementById('planning-section');
    const awSection = document.getElementById('aw-section');
    const qcSection = document.getElementById('qc-section');
    const financeSection = document.getElementById('finance-section');
    const filesSection = document.getElementById('files-section');
    const resultsSection = document.getElementById('results-section');

    function hideAllSections() {
        generalInfoSection.style.display = 'none';
        technicalSpecsSection.style.display = 'none';
        pressSection.style.display = 'none';
        planningSection.style.display = 'none';
        awSection.style.display = 'none';
        qcSection.style.display = 'none';
        financeSection.style.display = 'none';
        filesSection.style.display = 'none';
        resultsSection.style.display = 'none';
    }

    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    salesBtn.addEventListener('click', () => {
        hideAllSections(); 
        generalInfoSection.style.display = 'block'; 
        technicalSpecsSection.style.display = 'block'; 
        pressSection.style.display = 'block'; 
    });
    planningBtn.addEventListener('click', () => showSection(planningSection));
    awBtn.addEventListener('click', () => showSection(awSection));
    qcBtn.addEventListener('click', () => showSection(qcSection));
    financeBtn.addEventListener('click', () => showSection(financeSection));
    filesBtn.addEventListener('click', () => showSection(filesSection));
    resultsBtn.addEventListener('click', () => showSection(resultsSection));

    // Initially show the sales section(s)
    generalInfoSection.style.display = 'block';
    technicalSpecsSection.style.display = 'block';
    pressSection.style.display = 'block';
});

function addPLYField() {
    // Your function to add PLY fields dynamically
}