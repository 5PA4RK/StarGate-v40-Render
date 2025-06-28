// js/mainBags.js - Complete Implementation


const CM_TO_PIXELS = 37.7952755906; // 1cm = 37.7952755906 pixels (96dpi)
const DEFAULT_STROKE_WIDTH = 1; // 1px stroke for outlines
const SEAM_ALLOWANCE = 1 * CM_TO_PIXELS; // Standard 1cm seam allowance

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
    const threeSideOptions = document.getElementById('three-side-bag-options');

    // Reset visibility
    gussetControl.style.display = 'block';
    flapControl.style.display = 'block';
    commonOptions.style.display = 'none';
    shoppingSpecific.style.display = 'none';
    tshirtOptions.style.display = 'none';
    threeSideOptions.style.display = 'none';

    const normalizedType = productType.toLowerCase();
    
    if (normalizedType.includes('shopping bag')) {
        commonOptions.style.display = 'block';
        shoppingSpecific.style.display = 'block';
        flapControl.style.display = 'none';
    } 
    else if (normalizedType.includes('t-shirt bag')) {
        tshirtOptions.style.display = 'block';
        flapControl.style.display = 'none';
    }
    else if (normalizedType === '3 side') {  // Only show for regular 3 Side
        threeSideOptions.style.display = 'block';
        gussetControl.style.display = 'none';
        flapControl.style.display = 'none';
    }
    else {
        switch(true) {
            case normalizedType.includes('center seal'):
                flapControl.style.display = 'none';
                break;
            case normalizedType.includes('chicken bag'):
                gussetControl.style.display = 'none';
                break;
            case normalizedType.includes('2 side'):
            case normalizedType.includes('roll'):
                gussetControl.style.display = 'none';
                flapControl.style.display = 'none';
                break;
            case normalizedType.includes('3 side k'):
            case normalizedType.includes('3 side stand up'):
            case normalizedType.includes('4 side'):
            case normalizedType.includes('flat bottom'):
                // These should show gusset but no flap
                flapControl.style.display = 'none';
                break;
        }
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

// =============================================
// CORE APPLICATION FUNCTIONS (UPDATED)
// =============================================
function drawShapes() {
    const productType = document.getElementById('product-type').value;
    if (!productType) return;

    // Get values and convert to pixels
    const widthCm = parseFloat(document.getElementById('widthInput').value) || 0;
    const heightCm = parseFloat(document.getElementById('heightInput').value) || 0;
    const gussetCm = parseFloat(document.getElementById('gussetInput').value) || 0;
    const flapCm = parseFloat(document.getElementById('flapInput').value) || 0;

    const widthPx = widthCm * CM_TO_PIXELS;
    const heightPx = heightCm * CM_TO_PIXELS;
    const gussetPx = gussetCm * CM_TO_PIXELS;
    const flapPx = flapCm * CM_TO_PIXELS;

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
            hasStripHandle: document.getElementById('stripHandle')?.checked || false,
            flipDirection: productType === '3 Side' ? (document.getElementById('flipDirectionCheckbox')?.checked || false) : false,
            cmToPixels: CM_TO_PIXELS,
            seamAllowance: SEAM_ALLOWANCE
        };

        console.log('Drawing with dimensions (px):', { widthPx, heightPx, gussetPx, flapPx });

        // Update SVG container dimensions
        const previewSvg = document.getElementById('preview');
        previewSvg.setAttribute('width', widthPx + 20); // Add padding
        previewSvg.setAttribute('height', heightPx + 20);
        previewSvg.setAttribute('viewBox', `0 0 ${widthPx + 20} ${heightPx + 20}`);

        // Generate SVG content with real dimensions
        let svgContent = bagType.drawSVG(widthCm, heightCm, gussetCm, flapCm, options);
        previewSvg.innerHTML = svgContent;

        // Add measurement guides if needed
        addMeasurementGuides(previewSvg, widthPx, heightPx);

        // Dispatch event to update planning preview
        const bagUpdateEvent = new CustomEvent('bagUpdated', {
            detail: {
                type: productType,
                width: widthCm,
                height: heightCm,
                gusset: gussetCm,
                flap: flapCm,
                options: options
            }
        });
        document.dispatchEvent(bagUpdateEvent);

    } catch (error) {
        console.error('Drawing error:', error);
        document.getElementById('preview').innerHTML = `
            <div class="error" style="color: red; text-align: center; padding: 20px;">
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
}


// Helper function to add measurement guides
function addMeasurementGuides(svgElement, widthPx, heightPx) {
    // Only add guides if dimensions are valid
    if (widthPx <= 0 || heightPx <= 0) return;

    const ns = "http://www.w3.org/2000/svg";
    
    // Create a group for measurement guides
    const guideGroup = document.createElementNS(ns, 'g');
    guideGroup.setAttribute('class', 'measurement-guides');
    guideGroup.setAttribute('stroke', '#ccc');
    guideGroup.setAttribute('stroke-width', '0.5');
    guideGroup.setAttribute('stroke-dasharray', '2,2');
    guideGroup.setAttribute('fill', 'none');

    // Add horizontal measurement line
    const hLine = document.createElementNS(ns, 'path');
    hLine.setAttribute('d', `M10,10 L${widthPx + 10},10`);
    guideGroup.appendChild(hLine);

    // Add vertical measurement line
    const vLine = document.createElementNS(ns, 'path');
    vLine.setAttribute('d', `M10,10 L10,${heightPx + 10}`);
    guideGroup.appendChild(vLine);

    // Add measurement text
    const addText = (x, y, text) => {
        const textEl = document.createElementNS(ns, 'text');
        textEl.setAttribute('x', x);
        textEl.setAttribute('y', y);
        textEl.setAttribute('font-size', '8');
        textEl.setAttribute('fill', '#666');
        textEl.textContent = text;
        guideGroup.appendChild(textEl);
    };

    // Add measurement labels
    addText(widthPx/2 + 10, 5, `${(widthPx/CM_TO_PIXELS).toFixed(1)} cm`);
    addText(5, heightPx/2 + 10, `${(heightPx/CM_TO_PIXELS).toFixed(1)} cm`);

    svgElement.appendChild(guideGroup);
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
            hasStripHandle: document.getElementById('stripHandle')?.checked || false,
            flipDirection: document.getElementById('flipDirectionCheckbox')?.checked || false
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
            hasStripHandle: document.getElementById('stripHandle')?.checked || false,
            flipDirection: document.getElementById('flipDirectionCheckbox')?.checked || false
        };

        await bagType.downloadPDF(width, height, gusset, flap, options);
    } catch (error) {
        console.error("PDF generation error:", error);
        alert(`Error generating PDF: ${error.message}`);
    }
}

// =============================================
// PLANNING LAYOUT FUNCTIONS
// =============================================
function setupPlanningLayout() {
    const addBehindBtn = document.getElementById('add-behind');
    const addBesideBtn = document.getElementById('add-beside');
    const removeHorizontalBtn = document.getElementById('remove-horizontal');
    const removeVerticalBtn = document.getElementById('remove-vertical');
    const previewSvg = document.getElementById('autodraw-svg');

    if (!addBehindBtn || !addBesideBtn || !removeHorizontalBtn || !removeVerticalBtn || !previewSvg) {
        return;
    }

    // Initialize counters
    let horizontalCount = 1;
    let verticalCount = 1;

  
    function updateLayout() {
        while (previewSvg.children.length > 1) {
            previewSvg.removeChild(previewSvg.lastChild);
        }
    
        const bagTypeName = previewSvg.dataset.bagType;
        const bagWidthCm = parseFloat(previewSvg.dataset.bagWidth) || 0;
        const bagHeightCm = parseFloat(previewSvg.dataset.bagHeight) || 0;
        const bagGussetCm = parseFloat(previewSvg.dataset.bagGusset) || 0;
        const bagFlapCm = parseFloat(previewSvg.dataset.bagFlap) || 0;
    
        if (!bagTypeName || !bagWidthCm || !bagHeightCm) return;
    
        const bagType = BagRegistry.get(bagTypeName);
        if (!bagType) {
            console.error(`No implementation found for ${bagTypeName}`);
            return;
        }
    
        // Convert to millimeters (1cm = 10mm)
        const bagWidthMM = bagWidthCm * 10;
        const bagHeightMM = bagHeightCm * 10;
        const totalWidthMM = bagWidthMM * horizontalCount;
        const totalHeightMM = bagHeightMM * verticalCount;
    
        // Get container dimensions
        const container = previewSvg.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
    
        // Calculate scale to fit content
        const widthScale = containerWidth / totalWidthMM;
        const heightScale = containerHeight / totalHeightMM;
        const scale = Math.min(widthScale, heightScale) * 0.95; // 5% padding
    
        // Set viewBox to actual content dimensions (in mm)
        previewSvg.setAttribute('viewBox', `0 0 ${totalWidthMM} ${totalHeightMM}`);
        previewSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
        // Create main group with the calculated scale
        const mainGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        mainGroup.setAttribute("transform", `scale(${scale})`);
    
        // Add bags to the layout
        for (let v = 0; v < verticalCount; v++) {
            for (let h = 0; h < horizontalCount; h++) {
                const x = h * bagWidthMM;
                const y = v * bagHeightMM;
                
                const bagGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                bagGroup.setAttribute("transform", `translate(${x},${y})`);
    
                // Use getSimpleSVG if available
                let svgContent;
                if (bagType.getSimpleSVG) {
                    svgContent = bagType.getSimpleSVG(bagWidthCm, bagHeightCm, bagGussetCm, bagFlapCm);
                } else if (bagType.drawSVG) {
                    const options = {
                        cmToPixels: 10, // Using mm (1cm = 10mm)
                        seamAllowance: 10, // 1cm in mm
                        isPlanningView: true
                    };
                    svgContent = bagType.drawSVG(bagWidthCm, bagHeightCm, bagGussetCm, bagFlapCm, options);
                }
    
                if (svgContent) {
                    const parser = new DOMParser();
                    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
                    const svgElement = svgDoc.querySelector('svg');
                    
                    if (svgElement) {
                        Array.from(svgElement.children).forEach(child => {
                            bagGroup.appendChild(previewSvg.ownerDocument.importNode(child, true));
                        });
                        mainGroup.appendChild(bagGroup);
                    }
                }
            }
        }
    
        previewSvg.appendChild(mainGroup);
    }

    // Event listeners for layout buttons
    addBehindBtn.addEventListener('click', () => {
        verticalCount = Math.min(verticalCount + 1, 12);
        updateLayout();
    });

    addBesideBtn.addEventListener('click', () => {
        horizontalCount = Math.min(horizontalCount + 1, 12);
        updateLayout();
    });

    removeHorizontalBtn.addEventListener('click', () => {
        horizontalCount = Math.max(horizontalCount - 1, 1);
        updateLayout();
    });

    removeVerticalBtn.addEventListener('click', () => {
        verticalCount = Math.max(verticalCount - 1, 1);
        updateLayout();
    });

    // Listen for bag updates from the sales section
    document.addEventListener('bagUpdated', function(e) {
        const { type, width, height, gusset, flap } = e.detail; // Added flap
        
        previewSvg.dataset.bagType = type;
        previewSvg.dataset.bagWidth = width;
        previewSvg.dataset.bagHeight = height;
        previewSvg.dataset.bagGusset = gusset || 0;
        previewSvg.dataset.bagFlap = flap || 0; // Added flap
        
        // Reset counters when a new bag is selected
        horizontalCount = 1;
        verticalCount = 1;
        
        updateLayout();
    });
}
// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeUI();
    setupPlanningLayout();
    
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
    document.getElementById('twoFacesTShirtCheckbox')?.addEventListener('change', drawShapes);
    document.getElementById('flipDirectionCheckbox')?.addEventListener('change', drawShapes);
    
    // Download buttons
    document.getElementById('downloadSvg').addEventListener('click', downloadSVG);
    document.getElementById('downloadPdf').addEventListener('click', downloadPDF);
});