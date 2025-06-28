// planningLayout.js - Complete Fixed Implementation
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Layout Grid Management
    // ======================
    const layoutManager = (function() {


        let updateTimeout = null;

        function debounceUpdate() {
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
            updateTimeout = setTimeout(() => {
                updatePreview();
                updateTimeout = null;
            }, 100);
        }




        // DOM Elements
        const elements = {
            addBehindBtn: document.getElementById('add-behind'),
            addBesideBtn: document.getElementById('add-beside'),
            removeHorizontalBtn: document.getElementById('remove-horizontal'),
            removeVerticalBtn: document.getElementById('remove-vertical'),
            svgPreview: document.getElementById('autodraw-svg'),
            horizontalCount: document.getElementById('horizontal-count'),
            verticalCount: document.getElementById('vertical-count'),
            planningFlipCheckbox: document.getElementById('planning-flip-direction'),
            addLinesCheckbox: document.getElementById('planning-add-lines'),
            newMachineCheckbox: document.getElementById('planning-new-machine'),
            addStaggerCheckbox: document.getElementById('planning-add-stagger')
        };


        // State variables
        let currentBagType = null;
        let currentBagWidth = 0;
        let currentBagHeight = 0;
        let currentBagGusset = 0;
        let currentBagFlap = 0;
        let currentBagOptions = {};
  
        // Constants
        const MIN_UNITS = 1;
        const MAX_UNITS = 12;
  
        // Initialize
        function init() {
            if (!validateElements()) return;
            
            clearPreview();
            attachEventListeners();
            setupBagUpdateListener();
            updateButtonStates();
        }
  
        function clearPreview() {
            while (elements.svgPreview.firstChild) {
                elements.svgPreview.removeChild(elements.svgPreview.firstChild);
            }
        }
  
        function validateElements() {
            return Object.values(elements).every(el => el !== null);
        }
  
        function attachEventListeners() {
            elements.addBehindBtn.addEventListener('click', () => modifyUnits('vertical', 1));
            elements.addBesideBtn.addEventListener('click', () => modifyUnits('horizontal', 1));
            elements.removeHorizontalBtn.addEventListener('click', () => modifyUnits('horizontal', -1));
            elements.removeVerticalBtn.addEventListener('click', () => modifyUnits('vertical', -1));
                // Add listeners for count inputs
            elements.horizontalCount.addEventListener('input', debounceUpdate);
            elements.verticalCount.addEventListener('input', debounceUpdate);
            elements.horizontalCount.addEventListener('change', debounceUpdate);
            elements.verticalCount.addEventListener('change', debounceUpdate);
            
// Rotate direction checkbox
if (elements.planningFlipCheckbox) {
    elements.planningFlipCheckbox.addEventListener('change', function() {
        currentBagOptions.flipDirection = this.checked;
        updatePreview();
    });
}


// Add lines checkbox
if (elements.addLinesCheckbox) {
    elements.addLinesCheckbox.addEventListener('change', function() {
        currentBagOptions.addLines = this.checked;
        updatePreview();
    });
}
            
// New machine checkbox
if (elements.newMachineCheckbox) {
    elements.newMachineCheckbox.addEventListener('change', function() {
        currentBagOptions.newMachine = this.checked;
        updatePreview();
    });
}
            
 // Add stagger checkbox
if (elements.addStaggerCheckbox) {
    elements.addStaggerCheckbox.addEventListener('change', function() {
        currentBagOptions.addStagger = this.checked;
        updatePreview();
    });
}
        }
  
        function setupBagUpdateListener() {
            document.addEventListener('bagUpdated', function(e) {
                currentBagType = e.detail.type;
                currentBagWidth = e.detail.width;
                currentBagHeight = e.detail.height;
                currentBagGusset = e.detail.gusset || 0;
                currentBagFlap = e.detail.flap || 0;
                currentBagOptions = e.detail.options || {};

        // Initialize checkbox-related options if they don't exist
        currentBagOptions.flipDirection = currentBagOptions.flipDirection || false;
        currentBagOptions.addLines = currentBagOptions.addLines || false;
        currentBagOptions.newMachine = currentBagOptions.newMachine || false;
        currentBagOptions.addStagger = currentBagOptions.addStagger || false;


                
                elements.horizontalCount.value = 1;
                elements.verticalCount.value = 1;
                
                // Show/hide options container based on bag type
                const showOptions = [
                    'Center Seal', '2 Side', '3 Side', '3 Side K', '3 Side Stand Up', 
                    '4 Side', 'Normal Bag', 'Chicken Bag', 'Flat Bottom', 
                    'Shopping Bag', 'Roll'
                ].includes(currentBagType);
                
                // Show/hide the entire options container
                document.getElementById('planning-bag-options').style.display = showOptions ? 'block' : 'none';
                
                if (showOptions) {
                    // Flip direction (only for 3 Side variants)
                    document.getElementById('flip-direction-option').style.display = 
                    currentBagType.includes('3 Side') ? 'flex' : 'none';
                    
                    // Add lines (for all except T-shirt)
                    document.getElementById('add-lines-option').style.display = 'flex';
                    
                    // New machine (only for Flat Bottom)
                    document.getElementById('new-machine-option').style.display = 
                    currentBagType === 'Flat Bottom' ? 'flex' : 'none';
                    
                    // Add stagger (for all except T-shirt)
            document.getElementById('add-stagger-option').style.display = 'flex';
                    
                    // Update checkbox states
                    if (elements.planningFlipCheckbox) {
                        elements.planningFlipCheckbox.checked = currentBagOptions.flipDirection || false;
                    }
                    if (elements.addLinesCheckbox) {
                        elements.addLinesCheckbox.checked = currentBagOptions.addLines || false;
                    }
                    if (elements.newMachineCheckbox) {
                        elements.newMachineCheckbox.checked = currentBagOptions.newMachine || false;
                    }
                    if (elements.addStaggerCheckbox) {
                        elements.addStaggerCheckbox.checked = currentBagOptions.addStagger || false;
                    }
                }
                
                updatePreview();
                updateButtonStates();
            });
        }
  
        function modifyUnits(direction, change) {
            const counter = direction === 'horizontal' ? elements.horizontalCount : elements.verticalCount;
            let currentValue = parseInt(counter.value);
            const newValue = currentValue + change;
  
            if (newValue < MIN_UNITS || newValue > MAX_UNITS) {
                showAlert(`Cannot ${change > 0 ? 'add' : 'remove'} further - ${direction} units must be between ${MIN_UNITS} and ${MAX_UNITS}`);
                return;
            }
  
            counter.value = newValue;
            updatePreview();
            updateButtonStates();
        }


        ///////////////////////////////////////////////////////////////
function updatePreview() {


        // Early return if required elements aren't ready
        if (!elements.svgPreview || !elements.horizontalCount || !elements.verticalCount) {
            console.warn("Preview elements not ready");
            return;
        }

    // Get current unit counts
    const hCount = parseInt(elements.horizontalCount.value) || 1;
    const vCount = parseInt(elements.verticalCount.value) || 1;
    
    // Clear previous preview
    clearPreview();
    
    // Validate required parameters
    if (!currentBagType || !currentBagWidth || !currentBagHeight) {
        console.warn("Missing bag parameters - preview aborted");
        return;
    }

    // Get bag type implementation
    const bagType = BagRegistry.get(currentBagType);
    if (!bagType || !bagType.getSimpleSVG) {
        console.error("Bag type not found:", currentBagType);
        return;
    }

    // Get dimensions in centimeters
    const dims = bagType.getDimensions(currentBagWidth, currentBagHeight, 
                                     currentBagGusset, currentBagFlap, currentBagOptions);
    
    // Convert to millimeters (1cm = 10mm)
    const bagWidthMM = dims.width * 10;
    const bagHeightMM = dims.height * 10;
    const totalWidthMM = bagWidthMM * hCount;
    const totalHeightMM = bagHeightMM * vCount;

    // Guide lines configuration (in mm)
    const LINE_OFFSET = 3;
    const LINE_THICKNESS = 3;
    const contentWidthMM = totalWidthMM + (2 * (LINE_OFFSET + LINE_THICKNESS));
    const contentHeightMM = totalHeightMM;

    // Get container dimensions
    const container = elements.svgPreview.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate scale factors with padding
    const widthScale = (containerWidth - 20) / contentWidthMM;
    const heightScale = (containerHeight - 20) / contentHeightMM;
    const scale = Math.min(widthScale, heightScale);

    // Set up SVG container with dynamic scaling
    elements.svgPreview.style.width = (contentWidthMM * scale) + 'px';
    elements.svgPreview.style.height = (contentHeightMM * scale) + 'px';
    elements.svgPreview.setAttribute('viewBox', `0 0 ${contentWidthMM} ${contentHeightMM}`);
    elements.svgPreview.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    // Add guide lines if enabled
    if (currentBagOptions.addLines) {
        const leftLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        leftLine.setAttribute("x1", LINE_THICKNESS/2);
        leftLine.setAttribute("y1", "0");
        leftLine.setAttribute("x2", LINE_THICKNESS/2);
        leftLine.setAttribute("y2", totalHeightMM);
        leftLine.setAttribute("stroke", "#000");
        leftLine.setAttribute("stroke-width", LINE_THICKNESS);
        leftLine.setAttribute("vector-effect", "non-scaling-stroke");
        fragment.appendChild(leftLine);

        const rightLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        rightLine.setAttribute("x1", contentWidthMM - LINE_THICKNESS/2);
        rightLine.setAttribute("y1", "0");
        rightLine.setAttribute("x2", contentWidthMM - LINE_THICKNESS/2);
        rightLine.setAttribute("y2", totalHeightMM);
        rightLine.setAttribute("stroke", "#000");
        rightLine.setAttribute("stroke-width", LINE_THICKNESS);
        rightLine.setAttribute("vector-effect", "non-scaling-stroke");
        fragment.appendChild(rightLine);
    }

    // Create bags group with proper offset
    const bagsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    bagsGroup.setAttribute("transform", `translate(${LINE_OFFSET + LINE_THICKNESS},0)`);

    // Generate all bag units
    for (let v = 0; v < vCount; v++) {
        for (let h = 0; h < hCount; h++) {
            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.setAttribute("transform", `translate(${h * bagWidthMM},${v * bagHeightMM})`);
            
            // Create scaled bag content (convert cm to mm)
            const bagContent = document.createElementNS("http://www.w3.org/2000/svg", "g");
            bagContent.setAttribute("transform", "scale(10)"); // 1cm → 10mm
            
            try {
                bagContent.innerHTML = bagType.getSimpleSVG(
                    currentBagWidth, 
                    currentBagHeight, 
                    currentBagGusset, 
                    currentBagFlap, 
                    currentBagOptions
                );
                group.appendChild(bagContent);
                bagsGroup.appendChild(group);
            } catch (e) {
                console.error("Error generating bag SVG:", e);
            }
        }
    }
    
    fragment.appendChild(bagsGroup);
    elements.svgPreview.appendChild(fragment);

    // Update dimension display
    updateDimensionDisplay(dims.width * hCount, dims.height * vCount, dims, hCount, vCount);

        // After updating the preview, dispatch layoutUpdated event
        const layoutUpdateEvent = new CustomEvent('layoutUpdated', {
            detail: {
                horizontalCount: parseInt(elements.horizontalCount.value),
                verticalCount: parseInt(elements.verticalCount.value),
                flipDirection: currentBagOptions.flipDirection || false,
                addLines: currentBagOptions.addLines || false,
                addStagger: currentBagOptions.addStagger || false,
                newMachine: currentBagOptions.newMachine || false
            }
        });
        document.dispatchEvent(layoutUpdateEvent);
}
///////////////////////////////////////////////////////
        
        function configureSVGContainer(totalWidthMM, totalHeightMM) {
            // Fixed container dimensions (in pixels or viewport units)
            const CONTAINER_WIDTH = 600; // Fixed width in pixels
            const CONTAINER_HEIGHT = 400; // Fixed height in pixels
            
            // Set physical dimensions to fixed container size
            elements.svgPreview.style.width = CONTAINER_WIDTH + 'px';
            elements.svgPreview.style.height = CONTAINER_HEIGHT + 'px';
            
            // Set viewBox to match content dimensions (in mm)
            elements.svgPreview.setAttribute('viewBox', `0 0 ${totalWidthMM} ${totalHeightMM}`);
            elements.svgPreview.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // Container styling to maintain fixed size
            elements.svgPreview.style.display = 'block';
            elements.svgPreview.style.maxWidth = 'none'; // Remove any max-width constraints
            elements.svgPreview.style.overflow = 'visible'; // Allow content to scale within container
            elements.svgPreview.style.margin = '0 auto';
            elements.svgPreview.style.boxSizing = 'border-box';
            elements.svgPreview.style.backgroundColor = '#f5f5f5'; // Optional: add background for visibility
        }




function updateDimensionDisplay(totalWidth, totalHeight, dims, hCount, vCount) {
    const container = document.getElementById('dimension-display-container') || document.createElement('div');
    container.id = 'dimension-display-container';
    container.style.fontSize = '0.9rem';
    container.style.lineHeight = '1.4';
    container.style.whiteSpace = 'nowrap';
  
    const productTypeSelect = document.getElementById('product-type');
    const bagKind = productTypeSelect ? productTypeSelect.value : 'Standard';
  
    // Calculate adjusted width when lines are added (add 1 cm)
    const displayWidth = currentBagOptions.addLines ? (totalWidth + 1).toFixed(1) : totalWidth.toFixed(1);
  
    container.innerHTML = [
      `<div style="margin-bottom:4px"><strong>Bag Kind:</strong> ${bagKind}</div>`,
      `<div style="margin-bottom:4px"><strong>Single Bag Width:</strong> ${dims.width.toFixed(1)} cm</div>`,
      `<div style="margin-bottom:4px"><strong>Single Bag Height:</strong> ${dims.height.toFixed(1)} cm</div>`,
      `<div style="margin-bottom:4px"><strong>Layout Width:</strong> ${displayWidth} cm</div>`,
      `<div style="margin-bottom:4px"><strong>Sleeve:</strong> ${totalHeight.toFixed(1)} cm</div>`,
      `<div style="margin-bottom:4px"><strong>Horizontal Units:</strong> ${hCount}</div>`,
      `<div style="margin-bottom:4px"><strong>Vertical Units:</strong> ${vCount}</div>`,
      dims.isFlipped ? `<div style="margin-bottom:4px"><strong>Layout:</strong> Rotated 90°</div>` : '',
      currentBagOptions.addLines ? `<div style="margin-bottom:4px"><strong>Lines:</strong> Added (+1 cm)</div>` : '',
      currentBagOptions.newMachine ? `<div style="margin-bottom:4px"><strong>Machine:</strong> New</div>` : '',
      currentBagOptions.addStagger ? `<div style="margin-bottom:4px"><strong>Stagger:</strong> Added</div>` : ''
    ].join('');
  
    if (!document.getElementById('dimension-display-container')) {
      elements.svgPreview.parentNode.insertBefore(container, elements.svgPreview);
    }
}
  
        function updateButtonStates() {
            const hCount = parseInt(elements.horizontalCount.value);
            const vCount = parseInt(elements.verticalCount.value);
            
            elements.removeHorizontalBtn.disabled = hCount <= MIN_UNITS;
            elements.removeVerticalBtn.disabled = vCount <= MIN_UNITS;
            elements.addBesideBtn.disabled = hCount >= MAX_UNITS;
            elements.addBehindBtn.disabled = vCount >= MAX_UNITS;
        }
  
        function showAlert(message) {
            console.warn(message);
            alert(message);
        }
  
        return {
            init
        };
    })();
  
    // Initialize layout manager
    layoutManager.init();
  
    // ======================
    // Section Navigation
    // ======================
    function showSection(sectionId, buttonId) {
        const sections = document.querySelectorAll('.form-section');
        sections.forEach(section => {
            section.style.display = (section.id === sectionId) ? 'block' : 'none';
        });
  
        document.querySelectorAll('.button-container button').forEach(button => {
            button.classList.toggle('pressed', button.id === buttonId);
        });
    }
  
    // ======================
    // Machine Selection
    // ======================
    function setupMachineSelection() {
        const pressTypeSelect = document.getElementById('press-type');
        const machineSelect = document.getElementById('machine-select');
  
        if (!pressTypeSelect || !machineSelect) return;
  
        const machineOptions = {
            'Central Drum': [
                { value: 'Central 207', label: 'Central 207' },
                { value: 'Central 208', label: 'Central 208' },
                { value: 'Central 210', label: 'Central 210' }
            ],
            'Stack Type': [
                { value: 'Stack 204', label: 'Stack 204' },
                { value: 'Stack 206', label: 'Stack 206' }
            ]
        };
  
        pressTypeSelect.addEventListener('change', function() {
            const pressType = this.value;
            machineSelect.innerHTML = '<option value="">Select Machine</option>';
  
            if (pressType && machineOptions[pressType]) {
                machineOptions[pressType].forEach(option => {
                    const newOption = document.createElement('option');
                    newOption.value = option.value;
                    newOption.textContent = option.label;
                    machineSelect.appendChild(newOption);
                });
            }
        });
    }
  
    // ======================
    // Image Preview
    // ======================
    function setupImagePreview() {
        const imageInput = document.querySelector('input[type="file"]');
        const imagePreview = document.getElementById('uploadedImage');
  
        if (!imageInput || !imagePreview) return;
  
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                if (!file.type.match('image.*')) {
                    alert('Please select an image file');
                    this.value = '';
                    return;
                }
  
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.src = '';
                imagePreview.style.display = 'none';
            }
        });
    }
  


  // ======================
  // Initialization
  // ======================
  function initializeApp() {

    // Set current date (for sales-section, if ever shown)
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('entry-date');
    if (dateInput) dateInput.value = today;
    
    // Setup components
    setupMachineSelection();
    setupImagePreview();
    setupThemeSwitcher();
}

// Start the application
initializeApp();
});



