// js/threeSide.js - Complete Implementation with Planning Preview
// =============================================
// CONSTANTS
// =============================================
const THREE_SIDE = {
    TRIM_WIDTH: 0.2,
    SPACING: 1,
    MARGIN: 1,
    DEFAULTS: {
        WIDTH: 10,
        HEIGHT: 15
    },
    STYLES: {
        PANEL_COLOR: "#0000FF",
        TRIM_COLOR: "#0000FF",
        STROKE_WIDTH: 0.02,
        FONT: {
            TITLE: 1.2,
            OPTION: 1.2,
            PANEL: 1,
            DIMENSIONS: 0.8,
            TOTAL: 1.2
        },
        BG_COLOR: "#F8F8F8",
        TEXT_COLOR: "#333333",
        DIMENSION_COLOR: "#FF0000",
        PLANNING_PREVIEW: {
            SCALE: 0.5,
            STROKE_COLOR: "#FF0000",
            OUTLINE_WIDTH: .3,
            INTERNAL_LINE_WIDTH: 0.05,
            FILL_COLOR: "#E3F2FD",
            OPACITY: 1,
            TRIM_COLOR: "#008000"
        }
    }
};

// =============================================
// CORE FUNCTIONS
// =============================================
function createBagConfig(width, height, isFlipped) {
    const panelWidth = isFlipped ? width : height;
    const bagHeight = isFlipped ? height : width;
    
    return {
        parts: [
            { 
                type: 'Trim', 
                width: THREE_SIDE.TRIM_WIDTH,
                color: THREE_SIDE.STYLES.TRIM_COLOR,
                actualWidth: THREE_SIDE.TRIM_WIDTH,
                actualHeight: bagHeight
            },
            { 
                type: 'Front', 
                width: panelWidth,
                color: THREE_SIDE.STYLES.PANEL_COLOR,
                actualWidth: isFlipped ? width : height,
                actualHeight: isFlipped ? height : width
            },
            { 
                type: 'Back', 
                width: panelWidth,
                color: THREE_SIDE.STYLES.PANEL_COLOR,
                actualWidth: isFlipped ? width : height,
                actualHeight: isFlipped ? height : width
            },
            { 
                type: 'Trim', 
                width: THREE_SIDE.TRIM_WIDTH,
                color: THREE_SIDE.STYLES.TRIM_COLOR,
                actualWidth: THREE_SIDE.TRIM_WIDTH,
                actualHeight: bagHeight
            }
        ],
        height: bagHeight,
        title: isFlipped ? 'Flipped Layout' : 'Standard Layout'
    };
}

function renderBag(bag, xOffset, showLabels, scale = 1) {
    let xPos = 0;
    let svgParts = '';
    
    bag.parts.forEach(part => {
        const scaledWidth = part.width * scale;
        const scaledHeight = bag.height * scale;
        const partColor = part.color || THREE_SIDE.STYLES.PANEL_COLOR;
        
        svgParts += `
            <rect x="${xOffset + xPos}" y="0" width="${scaledWidth}" height="${scaledHeight}"
                  stroke="${partColor}" 
                  fill="white" 
                  stroke-width="${THREE_SIDE.STYLES.STROKE_WIDTH}"/>`;
        
        if (showLabels) {
            const titleYAdjustment = part.type.includes('Trim') ? scaledHeight / 2 + 0.3 : scaledHeight / 2 - 0.25;
            const dimensionYAdjustment = titleYAdjustment + 0.5;

            svgParts += `
                <text x="${xOffset + xPos + scaledWidth/2}" y="${titleYAdjustment}" 
                      font-size="${THREE_SIDE.STYLES.FONT.PANEL * scale}" 
                      text-anchor="middle"
                      font-weight="bold"
                      fill="${partColor}">
                    ${part.type}
                </text>
                <text x="${xOffset + xPos + scaledWidth/2}" y="${dimensionYAdjustment}" 
                      font-size="${THREE_SIDE.STYLES.FONT.DIMENSIONS * scale}" 
                      text-anchor="middle"
                      fill="${THREE_SIDE.STYLES.DIMENSION_COLOR}">  
                    ${part.actualWidth.toFixed(1)}×${part.actualHeight.toFixed(1)}cm
                </text>`;
        }
        xPos += scaledWidth;
    });
    
    return {
        svg: svgParts,
        width: xPos,
        title: bag.title
    };
}

function calculateScaling(width, height, isFlipped = false) {
    const maxWidth = 20;
    const bag = createBagConfig(width, height, isFlipped);
    const rendered = renderBag(bag, 0, false);
    
    const scale = Math.min(1, (maxWidth - THREE_SIDE.MARGIN * 2) / rendered.width);
    
    return {
        scale,
        bag,
        rendered: renderBag(bag, 0, true, scale)
    };
}

// =============================================
// MAIN IMPLEMENTATION
// =============================================
const threeSideImplementation = (function() {
    function calculateLayout(width, height, options = {}) {
        const isFlipped = options.flipDirection || false;
        const bag = createBagConfig(width, height, isFlipped);
        
        return {
            totalWidth: isFlipped ? 
                (width * 2) + (THREE_SIDE.TRIM_WIDTH * 2) : 
                (height * 2) + (THREE_SIDE.TRIM_WIDTH * 2),
            totalHeight: isFlipped ? height : width,
            parts: bag.parts,
            isFlipped
        };
    }

/////////////////////////////////////////////////////////////

function getSimpleSVG(width, height, gusset = 0, flap = 0, options = {}) {
    const layout = calculateLayout(width, height, options);
    const style = THREE_SIDE.STYLES.PLANNING_PREVIEW;
    
    let xPos = 0;
    let svgParts = '';
    
    // 1. Draw parts using ACTUAL dimensions from layout.parts
    layout.parts.forEach(part => {
        const partColor = part.type.includes('Trim') ? style.TRIM_COLOR : style.STROKE_COLOR;
        const strokeWidth = part.type.includes('Trim') ? 
            style.INTERNAL_LINE_WIDTH * 1.5 : 
            style.INTERNAL_LINE_WIDTH;
        
        // Use actual dimensions from part configuration
        svgParts += `
            <rect x="${xPos}" y="0" 
                  width="${part.actualWidth}" 
                  height="${layout.totalHeight}"
                  stroke="${partColor}"
                  stroke-width="${strokeWidth}"
                  fill="${style.FILL_COLOR}"
                  fill-opacity="${style.OPACITY}"/>`;
        
        xPos += part.actualWidth; // Use actualWidth for positioning
    });
    
    // 2. Add cross mark and outer border (now as sibling elements, not nested SVG)
    return `
        <!-- Main Outline - Thick red stroke -->
        <rect x="0" y="0"
              width="${layout.totalWidth}"
              height="${layout.totalHeight}"
              stroke="red"
              fill="none"
              stroke-width="${style.OUTLINE_WIDTH}"/>
        
        <!-- Bag Parts -->
        ${svgParts}
        
        <!-- Cross (X) Mark -->
        <line x1="0" y1="0"
              x2="${layout.totalWidth}" y2="${layout.totalHeight}"
              stroke="#FF0000"
              stroke-width="${style.INTERNAL_LINE_WIDTH}"
              stroke-opacity="0.7"/>
              
        <line x1="0" y1="${layout.totalHeight}"
              x2="${layout.totalWidth}" y2="0"
              stroke="#FF0000"
              stroke-width="${style.INTERNAL_LINE_WIDTH}"
              stroke-opacity="0.7"/>`;
}

/////////////////////////////////////////////////////////////



    function drawSVG(width = THREE_SIDE.DEFAULTS.WIDTH, 
                   height = THREE_SIDE.DEFAULTS.HEIGHT,
                   gusset = 0,
                   flap = 0,
                   options = {}) {
        if (width <= 0 || height <= 0) {
            const messages = [];
            if (width <= 0) messages.push('← Enter Width');
            if (height <= 0) messages.push('↑ Enter Height');
            
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
                 style="background-color:${THREE_SIDE.STYLES.BG_COLOR}">
                <text x="50%" y="50%" font-size="0.4" text-anchor="middle"
                      fill="#B0B0B0">${messages.join(' ')}</text>
            </svg>`;
        }

        const flipDirection = options.flipDirection || false;
        const bag = createBagConfig(width, height, flipDirection);

        const totalRealWidth = flipDirection ? 
            (width * 2) + (THREE_SIDE.TRIM_WIDTH * 2) : 
            (height * 2) + (THREE_SIDE.TRIM_WIDTH * 2);
        const totalRealHeight = flipDirection ? height : width;

        const svgWidth = totalRealWidth + THREE_SIDE.MARGIN * 3;
        const svgHeight = totalRealHeight + THREE_SIDE.MARGIN * 3 + 2;

        const verticalOffset = THREE_SIDE.MARGIN + 1.5;
        const titleY = 1.0;

        const rendered = renderBag(bag, THREE_SIDE.MARGIN, true, 1);
        const centerX = THREE_SIDE.MARGIN + (svgWidth - THREE_SIDE.MARGIN * 3 - rendered.width) / 2;

        return `
        <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 ${svgWidth} ${svgHeight}"
          width="${svgWidth}cm" height="${svgHeight}cm"
          style="background-color:${THREE_SIDE.STYLES.BG_COLOR}; shape-rendering: crispEdges">
         
         <text x="50%" y="${titleY}" font-size="${THREE_SIDE.STYLES.FONT.TITLE}" 
               text-anchor="middle" font-weight="bold" fill="${THREE_SIDE.STYLES.TEXT_COLOR}">
             3 Side Bag - ${flipDirection ? 'Flipped Layout' : 'Standard Layout'}
         </text>
         
         <g transform="translate(${centerX}, ${verticalOffset})">
             ${rendered.svg}
         </g>
         
         <text x="50%" y="${svgHeight - 1.0}"  
               font-size="${THREE_SIDE.STYLES.FONT.TOTAL}" 
               text-anchor="middle" font-weight="bold" 
               fill="${THREE_SIDE.STYLES.TEXT_COLOR}">  
             Total Dim.: ${totalRealWidth.toFixed(1)}×${totalRealHeight.toFixed(1)}cm
             (Includes ${THREE_SIDE.TRIM_WIDTH}cm side trims)
         </text>
        </svg>`;
    }
    
    async function downloadPDF(width, height, gusset = 0, flap = 0, options = {}) {
        if (!window.jspdf) throw new Error("jsPDF library not loaded");
        const { jsPDF } = window.jspdf;
        
        const flipDirection = options.flipDirection || false;
        const bag = createBagConfig(width, height, flipDirection);
        
        const totalRealWidth = flipDirection ? 
            (width * 2) + (THREE_SIDE.TRIM_WIDTH * 2) : 
            (height * 2) + (THREE_SIDE.TRIM_WIDTH * 2);
        const totalRealHeight = flipDirection ? height : width;
        
        const pdf = new jsPDF({
            orientation: totalRealWidth > totalRealHeight ? 'landscape' : 'portrait',
            unit: 'cm',
            format: [totalRealWidth + THREE_SIDE.MARGIN * 2, totalRealHeight + THREE_SIDE.MARGIN * 2 + 2]
        });
    
        let x = THREE_SIDE.MARGIN;
        let y = THREE_SIDE.MARGIN + 1;
        
        bag.parts.forEach(part => {
            pdf.setDrawColor(0, 0, 255);
            pdf.rect(x, y, part.actualWidth, part.actualHeight, 'S');
            
            pdf.setTextColor(0, 128, 0);
            pdf.setFontSize(THREE_SIDE.STYLES.FONT.PANEL * 25);
            pdf.setFont(undefined, 'bold');
            pdf.text(part.type, x + part.actualWidth/2, y + part.actualHeight/2 - 0.2, { align: 'center' });
            
            pdf.setFont(undefined, 'normal');
            pdf.text(`${part.actualWidth.toFixed(1)}×${part.actualHeight.toFixed(1)}cm`, 
                     x + part.actualWidth/2, y + part.actualHeight/2 + 0.3, { align: 'center' });
            
            x += part.actualWidth;
        });
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(THREE_SIDE.STYLES.FONT.OPTION * 25);
        pdf.text(`${width.toFixed(1)}×${height.toFixed(1)}cm`, 
                THREE_SIDE.MARGIN + totalRealWidth/2, 
                y + bag.height + 0.8, 
                { align: 'center' });
        
        pdf.setFontSize(THREE_SIDE.STYLES.FONT.TOTAL * 25);
        pdf.setFont(undefined, 'bold');
        pdf.text(`Total Dim.: ${totalRealWidth.toFixed(1)}×${totalRealHeight.toFixed(1)}cm`, 
                totalRealWidth/2 + THREE_SIDE.MARGIN, 
                y + bag.height + 1.5, 
                { align: 'center' });
        
        pdf.save(`3side-bag-${width}x${height}${flipDirection ? '-flipped' : ''}.pdf`);
        return pdf;
    }

    function getDimensions(width, height, gusset = 0, flap = 0, options = {}) {
        const isFlipped = options.flipDirection || false;
        
        return {
            width: isFlipped ? 
                (width * 2) + (THREE_SIDE.TRIM_WIDTH * 2) : 
                (height * 2) + (THREE_SIDE.TRIM_WIDTH * 2),
            height: isFlipped ? height : width,
            gusset: gusset,
            flap: flap,
            isFlipped
        };
    }

    return {
        drawSVG,
        downloadPDF,
        getSimpleSVG,
        calculateLayout,
        getDimensions
    };
})();

// =============================================
// PLANNING PREVIEW INTEGRATION
// =============================================
// =============================================
// PLANNING PREVIEW INTEGRATION
// =============================================
(function() {
    function setupPlanningPreview() {
        const planningOptionsDiv = document.getElementById('planning-bag-options');
        const planningFlipCheckbox = document.getElementById('planning-flip-direction');
        const salesFlipCheckbox = document.getElementById('flipDirectionCheckbox');
        
        if (!planningOptionsDiv) return;

        // Initialize as hidden
        planningOptionsDiv.style.display = 'none';

        document.addEventListener('bagUpdated', function(e) {
            // Only show for 3 Side bags
            if (e.detail.type !== '3 Side') {
                planningOptionsDiv.style.display = 'none';
                return;
            }
            
            // Show the options for 3 Side bags
            planningOptionsDiv.style.display = 'block';
            
            const { options = {} } = e.detail;
            const isFlipped = options.flipDirection || false;
            
            // Sync the planning checkbox with sales checkbox
            if (planningFlipCheckbox) {
                planningFlipCheckbox.checked = isFlipped;
            }
            
            // Update current dimensions
            if (window.currentBagType) currentBagType = e.detail.type;
            if (window.currentBagWidth) currentBagWidth = e.detail.width;
            if (window.currentBagHeight) currentBagHeight = e.detail.height;
            if (window.currentBagOptions) currentBagOptions = options;
            
            if (window.updatePreview) updatePreview();
            if (window.updateButtonStates) updateButtonStates();
        });

        // Add event listener to planning checkbox
        if (planningFlipCheckbox && salesFlipCheckbox) {
            planningFlipCheckbox.addEventListener('change', function() {
                salesFlipCheckbox.checked = this.checked;
                const event = new Event('change');
                salesFlipCheckbox.dispatchEvent(event);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPlanningPreview);
    } else {
        setupPlanningPreview();
    }
})();

// =============================================
// SAFE REGISTRATION
// =============================================
(function() {
    const typeName = '3 Side';
    
    if (window.BagRegistry?.types?.[typeName]) return;
    
    if (typeof window.BagRegistry === 'undefined') {
        window._bagRegistrationQueue = window._bagRegistrationQueue || [];
        if (!window._bagRegistrationQueue.some(x => x.typeName === typeName)) {
            window._bagRegistrationQueue.push({
                typeName: typeName,
                implementation: threeSideImplementation
            });
        }
    } else {
        window.BagRegistry.register(typeName, threeSideImplementation);
    }

    window.debugThreeSideRegistration = function() {
        const success = !!window.BagRegistry?.types?.[typeName];
        console.log(success ? '✅ 3 Side registered' : '❌ Registration failed');
        return success;
    };
    setTimeout(window.debugThreeSideRegistration, 150);
})();