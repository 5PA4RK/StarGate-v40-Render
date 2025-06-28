// js/mainBags.js - Updated with mutually exclusive checkboxes
const BagRegistry = {
    types: {},
    
    register: function(typeName, implementation) {
        if (!typeName || !implementation) {
            console.error('Invalid registration - missing parameters');
            return false;
        }
        
        const existingKey = Object.keys(this.types).find(
            key => key.toLowerCase() === typeName.toLowerCase()
        );
        
        if (existingKey) {
            console.warn(`Replacing existing implementation for ${existingKey}`);
            delete this.types[existingKey];
        }
        
        this.types[typeName] = implementation;
        console.log(`Successfully registered ${typeName}`);
        return true;
    },
    
    get: function(typeName) {
        const key = Object.keys(this.types).find(
            k => k.toLowerCase() === typeName.toLowerCase()
        );
        
        if (!key) {
            console.error(`Implementation not found for "${typeName}"`);
            console.log('Available types:', Object.keys(this.types));
            return null;
        }
        
        return this.types[key];
    },
    
    listRegistered: function() {
        return Object.keys(this.types);
    }
};

// Process queued registrations
if (window._bagRegistrationQueue) {
    console.log('Processing registration queue with', window._bagRegistrationQueue.length, 'items');
    window._bagRegistrationQueue.forEach(item => {
        try {
            const success = BagRegistry.register(item.typeName, item.implementation);
            console.log(`Queue item ${item.typeName} registration:`, 
                        success ? 'SUCCESS' : 'FAILED');
        } catch (e) {
            console.error(`Failed to process queue item ${item.typeName}:`, e);
        }
    });
    delete window._bagRegistrationQueue;
}

// Make registry available globally
window.BagRegistry = BagRegistry;
console.log('BagRegistry initialized. Registered types:', BagRegistry.listRegistered());

// =============================================
// UI CONTROL FUNCTIONS
// =============================================
function initializeUI() {
    document.getElementById('app-controls').style.display = 'none';
    document.getElementById('preview-container').style.display = 'none';
    document.getElementById('download-buttons').style.display = 'none';
    




    
    document.getElementById('widthInput').min = '0.1';
    document.getElementById('widthInput').step = '0.1';
    document.getElementById('heightInput').min = '0.1';
    document.getElementById('heightInput').step = '0.1';
    document.getElementById('gussetInput').min = '0';
    document.getElementById('gussetInput').step = '0.1';
    document.getElementById('flapInput').min = '0';
    document.getElementById('flapInput').step = '0.1';
}

function updateInputVisibility(productType) {
    const gussetControl = document.getElementById('gusset-control');
    const flapControl = document.getElementById('flap-control');
    const commonOptions = document.getElementById('common-options');
    const shoppingSpecific = document.getElementById('shopping-bag-specific');
    const tshirtOptions = document.getElementById('t-shirt-bag-options');

    // Reset visibility
    gussetControl.style.display = 'block'; // Ensure gusset control is visible by default
    flapControl.style.display = 'block'; // Ensure flap control is visible by default
    commonOptions.style.display = 'none';
    shoppingSpecific.style.display = 'none';
    tshirtOptions.style.display = 'none';

    const normalizedType = productType.toLowerCase();
    
    if (normalizedType.includes('shopping bag')) {
        commonOptions.style.display = 'block';
        shoppingSpecific.style.display = 'block';
        flapControl.style.display = 'none'; // Hide flap for shopping bags
    } 
    else if (normalizedType.includes('t-shirt bag')) {
        tshirtOptions.style.display = 'block';
        flapControl.style.display = 'none'; // Hide flap for t-shirt bags
    }
    else {
        switch(true) {
            case normalizedType.includes('center seal'):
                flapControl.style.display = 'none'; // Hide flap for center seal
                break;
            case normalizedType.includes('chicken bag'):
                gussetControl.style.display = 'none'; // Hide gusset for chicken bags
                break;
            case normalizedType.includes('2 side'):
            case normalizedType.includes('roll'):
                gussetControl.style.display = 'none'; // Hide gusset for 2 side and roll
                flapControl.style.display = 'none'; // Hide flap for 2 side and roll
                break;
            case normalizedType.includes('3 side'):
            case normalizedType.includes('3 side k'):
            case normalizedType.includes('3 side stand up'):
            case normalizedType.includes('4 side'):
            case normalizedType.includes('flat bottom'):
                flapControl.style.display = 'none'; // Hide flap for these types
                // Keep gussetControl visible for these types
                break;
        }
    }
}

function drawShapes() {
    const productType = document.getElementById('product-type').value;
    if (!productType) return;

    const width = parseFloat(document.getElementById('widthInput').value) || 0;
    const height = parseFloat(document.getElementById('heightInput').value) || 0;
    const gusset = parseFloat(document.getElementById('gussetInput').value) || 0;
    const flap = parseFloat(document.getElementById('flapInput').value) || 0;

    try {
        const bagType = BagRegistry.get(productType);
        if (!bagType) {
            throw new Error(`No implementation registered for "${productType}"`);
        }

        const options = {
            hasSideGusset: document.getElementById('sideGussetCheckbox')?.checked || false,
            hasBottomGusset: document.getElementById('bottomGussetCheckbox')?.checked || false,
            hasTwoFaces: document.getElementById('twoFacesCheckbox')?.checked || 
                         document.getElementById('twoFacesTShirtCheckbox')?.checked || false,
            hasHoleHandle: document.getElementById('holeHandle')?.checked || false,
            hasStripHandle: document.getElementById('stripHandle')?.checked || false
        };

        let svgContent = bagType.drawSVG(width, height, gusset, flap, options);
        document.getElementById('preview').innerHTML = svgContent;
    } catch (error) {
        console.error('Drawing error:', error);
        document.getElementById('preview').innerHTML = `
            <div class="error" style="color: red; text-align: center; padding: 20px;">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

function showUI(productType) {
    if (!productType) return;
    
    updateInputVisibility(productType);
    document.getElementById('app-controls').style.display = 'block';
    document.getElementById('preview-container').style.display = 'block';
    document.getElementById('download-buttons').style.display = 'flex';
}

// =============================================
// MUTUALLY EXCLUSIVE CHECKBOX HANDLING
// =============================================
function handleHandleCheckboxChange(event) {
    const holeHandle = document.getElementById('holeHandle');
    const stripHandle = document.getElementById('stripHandle');
    
    if (event.target === holeHandle && holeHandle.checked) {
        stripHandle.checked = false;
    } else if (event.target === stripHandle && stripHandle.checked) {
        holeHandle.checked = false;
    }
    drawShapes();
}

function handleGussetCheckboxChange(event) {
    const sideGusset = document.getElementById('sideGussetCheckbox');
    const bottomGusset = document.getElementById('bottomGussetCheckbox');
    
    if (event.target === sideGusset && sideGusset.checked) {
        bottomGusset.checked = false;
    } else if (event.target === bottomGusset && bottomGusset.checked) {
        sideGusset.checked = false;
    }
    drawShapes();
}

// =============================================
// CORE APPLICATION FUNCTIONS
// =============================================
function updateProductUI() {
    const productType = document.getElementById('product-type').value;
    
    if (!productType) {
        document.getElementById('app-controls').style.display = 'none';
        document.getElementById('preview-container').style.display = 'none';
        document.getElementById('download-buttons').style.display = 'none';
        return;
    }
    
    showUI(productType);
    drawShapes();
}

function drawShapes() {
    const productType = document.getElementById('product-type').value;
    if (!productType) return;

    const width = parseFloat(document.getElementById('widthInput').value) || 0;
    const height = parseFloat(document.getElementById('heightInput').value) || 0;
    const gusset = parseFloat(document.getElementById('gussetInput').value) || 0;
    const flap = parseFloat(document.getElementById('flapInput').value) || 0;

    try {
        const bagType = BagRegistry.get(productType);
        if (!bagType) {
            throw new Error(`No implementation registered for "${productType}"`);
        }

        // Get the correct Two Faces checkbox based on product type
        let twoFacesCheckbox;
        if (productType.includes('T-Shirt Bag')) {
            twoFacesCheckbox = document.getElementById('twoFacesTShirtCheckbox');
        } else {
            twoFacesCheckbox = document.getElementById('twoFacesCheckbox');
        }

        const options = {
            hasSideGusset: document.getElementById('sideGussetCheckbox')?.checked || false,
            hasBottomGusset: document.getElementById('bottomGussetCheckbox')?.checked || false,
            hasTwoFaces: twoFacesCheckbox?.checked || false,
            hasHoleHandle: document.getElementById('holeHandle')?.checked || false,
            hasStripHandle: document.getElementById('stripHandle')?.checked || false
        };

        console.log('Drawing with options:', options); // Debug log

        let svgContent = bagType.drawSVG(width, height, gusset, flap, options);
        document.getElementById('preview').innerHTML = svgContent;
    } catch (error) {
        console.error('Drawing error:', error);
        document.getElementById('preview').innerHTML = `
            <div class="error" style="color: red; text-align: center; padding: 20px;">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}

// =============================================
// DOWNLOAD FUNCTIONS
// =============================================
function downloadSVG() {
    const productType = document.getElementById('product-type').value;
    const width = parseFloat(document.getElementById('widthInput').value) || 0;
    const height = parseFloat(document.getElementById('heightInput').value) || 0;
    const gusset = parseFloat(document.getElementById('gussetInput').value) || 0;
    const flap = parseFloat(document.getElementById('flapInput').value) || 0;

    if (!productType || width <= 0 || height <= 0) {
        alert("Please select a bag type and enter valid dimensions");
        return;
    }

    try {
        const bagType = BagRegistry.get(productType);
        if (!bagType) {
            throw new Error(`No SVG generator for ${productType}`);
        }

        const options = {
            hasSideGusset: document.getElementById('sideGussetCheckbox')?.checked || false,
            hasBottomGusset: document.getElementById('bottomGussetCheckbox')?.checked || false,
            hasTwoFaces: productType.includes('T-Shirt Bag') ? (document.getElementById('twoFacesCheckbox')?.checked || false) : false,
            hasHoleHandle: document.getElementById('holeHandle')?.checked || false,
            hasStripHandle: document.getElementById('stripHandle')?.checked || false
        };

        let svgContent = bagType.drawSVG(width, height, gusset, flap, options);
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${productType.toLowerCase().replace(/\s+/g, '-')}-${width}x${height}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("SVG download error:", error);
        alert(`Error generating SVG: ${error.message}`);
    }
}

async function downloadPDF() {
    const productType = document.getElementById('product-type').value;
    const width = parseFloat(document.getElementById('widthInput').value) || 0;
    const height = parseFloat(document.getElementById('heightInput').value) || 0;
    const gusset = parseFloat(document.getElementById('gussetInput').value) || 0;
    const flap = parseFloat(document.getElementById('flapInput').value) || 0;

    if (!productType || width <= 0 || height <= 0) {
        alert("Please select a bag type and enter valid dimensions");
        return;
    }

    try {
        const bagType = BagRegistry.get(productType);
        if (!bagType || !bagType.downloadPDF) {
            throw new Error(`No PDF generator for ${productType}`);
        }

        const options = {
            hasSideGusset: document.getElementById('sideGussetCheckbox')?.checked || false,
            hasBottomGusset: document.getElementById('bottomGussetCheckbox')?.checked || false,
            hasTwoFaces: productType.includes('T-Shirt Bag') ? (document.getElementById('twoFacesCheckbox')?.checked || false) : false,
            hasHoleHandle: document.getElementById('holeHandle')?.checked || false,
            hasStripHandle: document.getElementById('stripHandle')?.checked || false
        };

        await bagType.downloadPDF(width, height, gusset, flap, options);
    } catch (error) {
        console.error("PDF generation error:", error);
        alert(`Error generating PDF: ${error.message}`);
    }
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    
    // Input listeners
    document.getElementById('product-type').addEventListener('change', updateProductUI);
    document.getElementById('widthInput').addEventListener('input', drawShapes);
    document.getElementById('heightInput').addEventListener('input', drawShapes);
    document.getElementById('gussetInput').addEventListener('input', drawShapes);
    document.getElementById('flapInput').addEventListener('input', drawShapes);
    
    // Checkbox listeners
    document.getElementById('holeHandle')?.addEventListener('change', handleHandleCheckboxChange);
    document.getElementById('stripHandle')?.addEventListener('change', handleHandleCheckboxChange);
    document.getElementById('sideGussetCheckbox')?.addEventListener('change', handleGussetCheckboxChange);
    document.getElementById('bottomGussetCheckbox')?.addEventListener('change', handleGussetCheckboxChange);
    document.getElementById('twoFacesCheckbox')?.addEventListener('change', drawShapes);
    document.getElementById('twoFacesTShirtCheckbox')?.addEventListener('change', drawShapes); // Add this line
    
    // Download buttons
    document.getElementById('downloadSvg').addEventListener('click', downloadSVG);
    document.getElementById('downloadPdf').addEventListener('click', downloadPDF);
});