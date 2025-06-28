// js/centerSealBag.js - Complete Implementation
// =============================================
// CONSTANTS
// =============================================
const CENTER_SEAL = {
    FLAP_WIDTH: 1.5, // cm
    DEFAULTS: { width: 20, height: 30, gusset: 0 },
    STYLES: {
        STROKE_COLOR: "#0000FF",
        GUSSET_COLOR: "#008000",
        STROKE_WIDTH: 0.1,
        FONT: {
            TITLE: 1.2, // cm
            PANEL_NAME: 0.8, // cm
            DIMENSIONS: 0.6, // cm
            TOTAL: 0.7 // cm
        },
        BG_COLOR: "#F8F8F8",
        PLANNING_PREVIEW: {
            SCALE: 0.5, // Scale down for planning view
            STROKE_COLOR: "#FF0000", // Red outline
            OUTLINE_WIDTH: 0.6, // Thicker outline
            INTERNAL_LINE_WIDTH: 0.05, // Thinner internal lines
            FILL_COLOR: "#E3F2FD",
            OPACITY: 1,
            GUSSET_COLOR: "#008000" // Keep gusset color consistent
        }
    }
};

// =============================================
// IMPLEMENTATION
// =============================================
const centerSealImplementation = (function() {
    // Calculate the bag layout
    function calculateLayout(width, height, gusset) {
        const frontPanelWidth = width / 2;
        const totalWidth = CENTER_SEAL.FLAP_WIDTH * 2 + frontPanelWidth * 2 + width + (gusset * 2);
        const parts = [
            { type: 'Left Seal', x: 0, width: CENTER_SEAL.FLAP_WIDTH },
            { type: 'Back Panel', x: CENTER_SEAL.FLAP_WIDTH, width: frontPanelWidth },
            ...(gusset > 0 ? [{ 
                type: 'Gusset', 
                x: CENTER_SEAL.FLAP_WIDTH + frontPanelWidth, 
                width: gusset,
                color: CENTER_SEAL.STYLES.GUSSET_COLOR 
            }] : []),
            { type: 'Front Panel', x: CENTER_SEAL.FLAP_WIDTH + frontPanelWidth + (gusset > 0 ? gusset : 0), width: width },
            ...(gusset > 0 ? [{ 
                type: 'Gusset', 
                x: CENTER_SEAL.FLAP_WIDTH + frontPanelWidth + (gusset > 0 ? gusset : 0) + width, 
                width: gusset,
                color: CENTER_SEAL.STYLES.GUSSET_COLOR 
            }] : []),
            { type: 'Back Panel', x: CENTER_SEAL.FLAP_WIDTH + frontPanelWidth + (gusset > 0 ? gusset * 2 : 0) + width, width: frontPanelWidth },
            { type: 'Right Seal', x: CENTER_SEAL.FLAP_WIDTH + frontPanelWidth * 2 + (gusset > 0 ? gusset * 2 : 0) + width, width: CENTER_SEAL.FLAP_WIDTH }
        ];
        
        return { totalWidth, parts };
    }

    function getSimpleSVG(width, height, gusset) {
        // Get complete dimensions including flaps and gussets
        const dims = this.getDimensions(width, height, gusset);
        const style = CENTER_SEAL.STYLES.PLANNING_PREVIEW;
        
        // Calculate panel widths
        const frontPanelWidth = width; // This is the input width (front panel only)
        const backPanelWidth = width / 2;
        
        return `
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 ${dims.width} ${dims.height}"
             width="${dims.width}"
             height="${dims.height}">
            
            <!-- Main Outline -->
            <rect x="0" y="0"
                  width="${dims.width}"
                  height="${dims.height}"
                  stroke="${style.STROKE_COLOR}"
                  stroke-width="${style.OUTLINE_WIDTH}"
                  fill="${style.FILL_COLOR}"
                  fill-opacity="${style.OPACITY}"/>
            
            <!-- Left Flap -->
            <rect x="0" y="0"
                  width="${CENTER_SEAL.FLAP_WIDTH}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Left Back Panel -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH}" y="0"
                  width="${backPanelWidth}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            ${gusset > 0 ? `
            <!-- Left Gusset -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth}" y="0"
                  width="${gusset}"
                  height="${dims.height}"
                  stroke="${style.GUSSET_COLOR}"
                  stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
                  fill="none"/>
            
            <!-- Front Panel -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth + gusset}" y="0"
                  width="${frontPanelWidth}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Right Gusset -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth + gusset + frontPanelWidth}" y="0"
                  width="${gusset}"
                  height="${dims.height}"
                  stroke="${style.GUSSET_COLOR}"
                  stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
                  fill="none"/>
            ` : `
            <!-- Front Panel (no gusset) -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth}" y="0"
                  width="${frontPanelWidth}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            `}
            
            <!-- Right Back Panel -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth + (gusset > 0 ? gusset * 2 : 0) + frontPanelWidth}" y="0"
                  width="${backPanelWidth}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Right Flap -->
            <rect x="${CENTER_SEAL.FLAP_WIDTH + backPanelWidth * 2 + (gusset > 0 ? gusset * 2 : 0) + frontPanelWidth}" y="0"
                  width="${CENTER_SEAL.FLAP_WIDTH}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Cross (X) Mark -->
            <line x1="0" y1="0"
                  x2="${dims.width}" y2="${dims.height}"
                  stroke="#FF0000"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  stroke-opacity="0.7"/>
                  
            <line x1="0" y1="${dims.height}"
                  x2="${dims.width}" y2="0"
                  stroke="#FF0000"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  stroke-opacity="0.7"/>
        </svg>`;
    }

    // Main drawing function
    function drawSVG(width = CENTER_SEAL.DEFAULTS.width, 
                   height = CENTER_SEAL.DEFAULTS.height, 
                   gusset = CENTER_SEAL.DEFAULTS.gusset) {
        const hasAllDimensions = width > 0 && height > 0;
        if (!hasAllDimensions) {
            const messages = [];
            if (width <= 0) messages.push('← Enter Width');
            if (height <= 0) messages.push('↑ Enter Height');
            if (gusset <= 0) messages.push('→ Enter Gusset');
            
            const messageText = messages.join(' ');
            const textLength = messageText.length * 0.6;
            const viewBoxWidth = Math.max(20, textLength);
            
            return `
              <svg xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 ${viewBoxWidth} 10"
                   style="background-color:${CENTER_SEAL.STYLES.BG_COLOR}; shape-rendering: crispEdges">
                <title>Dimensions Warning</title>
                <text x="50%" y="50%" 
                      font-size="0.5" 
                      text-anchor="middle"
                      dominant-baseline="middle"
                      fill="#B0B0B0">
                    ${messageText}
                </text>
              </svg>
            `;
        }

        const layout = calculateLayout(width, height, gusset);
        const verticalCenter = height / 2;
        
        return `
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 ${layout.totalWidth} ${height + 3}"
             style="background-color: ${CENTER_SEAL.STYLES.BG_COLOR}; shape-rendering: crispEdges;">
            
            <!-- Bag Title -->
            <text x="${layout.totalWidth/2}" y="1" 
                  font-size="${CENTER_SEAL.STYLES.FONT.TITLE}" 
                  text-anchor="middle" 
                  font-weight="bold">
                Center Seal Bag
            </text>
            
            <!-- Bag Parts -->
            <g transform="translate(0, 1.5)">
                ${layout.parts.map(part => `
                <rect x="${part.x}" y="0" width="${part.width}" height="${height}"
                      stroke="${part.color || CENTER_SEAL.STYLES.STROKE_COLOR}" 
                      fill="white" 
                      stroke-width="${CENTER_SEAL.STYLES.STROKE_WIDTH}"/>
                
                <text x="${part.x + part.width/2}" y="${verticalCenter - 0.3}" 
                      font-size="${CENTER_SEAL.STYLES.FONT.PANEL_NAME}" 
                      text-anchor="middle"
                      font-weight="bold"
                      fill="${part.color || CENTER_SEAL.STYLES.STROKE_COLOR}">
                    ${part.type}
                </text>
                <text x="${part.x + part.width/2}" y="${verticalCenter + 0.3}" 
                      font-size="${CENTER_SEAL.STYLES.FONT.DIMENSIONS}" 
                      text-anchor="middle"
                      fill="${part.color || CENTER_SEAL.STYLES.STROKE_COLOR}">
                    ${part.width.toFixed(1)}cm × ${height}cm
                </text>
                `).join('')}
            </g>
            
            <!-- Total Dimensions -->
            <text x="${layout.totalWidth/2}" y="${height + 2}" 
                  font-size="${CENTER_SEAL.STYLES.FONT.TOTAL}" 
                  text-anchor="middle"
                  font-weight="bold">
                Total: ${layout.totalWidth.toFixed(1)}cm (width) × ${height}cm (height)
            </text>
        </svg>`;
    }

    // PDF generation
    async function downloadPDF(width, height, gusset = CENTER_SEAL.DEFAULTS.gusset) {
        if (!window.jspdf) throw new Error("jsPDF library not loaded");
        const { jsPDF } = window.jspdf;
        
        const layout = calculateLayout(width, height, gusset);
        const margin = 2; // cm
        const pdfHeight = height + margin * 2 + 3; // Extra space for labels
        
        const pdf = new jsPDF({
            orientation: layout.totalWidth > pdfHeight ? 'landscape' : 'portrait',
            unit: 'cm',
            format: [layout.totalWidth + margin * 2, pdfHeight]
        });

        // Bag Title
        pdf.setFontSize(CENTER_SEAL.STYLES.FONT.TITLE * 10);
        pdf.setFont(undefined, 'bold');
        pdf.text('Center Seal Bag', 
                margin + layout.totalWidth/2, 
                margin - 0.5, 
                { align: 'center' });
        
        // Draw parts with labels
        layout.parts.forEach(part => {
            const color = part.color ? 
                hexToRgb(part.color) : 
                { r: 0, g: 0, b: 255 };
            
            pdf.setDrawColor(color.r, color.g, color.b);
            pdf.rect(margin + part.x, margin, part.width, height);
            
            // Panel name
            pdf.setTextColor(color.r, color.g, color.b);
            pdf.setFontSize(CENTER_SEAL.STYLES.FONT.PANEL_NAME * 10);
            pdf.setFont(undefined, 'bold');
            pdf.text(part.type, 
                    margin + part.x + part.width/2, 
                    margin + height/2 - 0.3, 
                    { align: 'center' });
            
            // Dimensions
            pdf.setFontSize(CENTER_SEAL.STYLES.FONT.DIMENSIONS * 10);
            pdf.setFont(undefined, 'normal');
            pdf.text(`${part.width.toFixed(1)}cm × ${height}cm`, 
                    margin + part.x + part.width/2, 
                    margin + height/2 + 0.3, 
                    { align: 'center' });
        });
        
        // Total dimensions
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(CENTER_SEAL.STYLES.FONT.TOTAL * 10);
        pdf.setFont(undefined, 'bold');
        pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${height}cm`, 
                margin + layout.totalWidth/2, 
                margin + height + 1.5, 
                { align: 'center' });
        
        pdf.save(`center-seal-${width}x${height}${gusset > 0 ? `-gusset-${gusset}` : ''}.pdf`);
        return pdf;
        
        function hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        }
    }

    // Public API
    return {
        drawSVG,
        downloadPDF,
        getSimpleSVG,
        calculateLayout,
        getDimensions: function(width, height, gusset = CENTER_SEAL.DEFAULTS.gusset) {
            const frontPanelWidth = width / 2;
            const totalWidth = CENTER_SEAL.FLAP_WIDTH * 2 + frontPanelWidth * 2 + width + (gusset * 2);
            
            return {
                width: totalWidth,  // Complete flat width including all elements
                height: height,     // Complete height (no changes needed)
                gusset: gusset,
                frontPanelWidth: width,  // For reference
                backPanelWidth: frontPanelWidth  // For reference
            };
        }
    };
})();

// =============================================
// PLANNING PREVIEW INTEGRATION
// =============================================
(function() {
    function setupPlanningPreview() {
        const planningSection = document.getElementById('planning-section');
        if (!planningSection) return;

        // Listen for bag updates from the sales section
        document.addEventListener('bagUpdated', function(e) {
            if (e.detail.type !== 'Center Seal') return;
            
            const { width, height, gusset } = e.detail;
            
            // Reset counters when bag changes
            elements.horizontalCount.value = 1;
            elements.verticalCount.value = 1;
            
            // Update current dimensions
            currentBagType = e.detail.type;
            currentBagWidth = width;  // This should be the front panel width
            currentBagHeight = height;
            currentBagGusset = gusset || 0;
            
            updatePreview();
            updateButtonStates();
        });
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
    const typeName = 'Center Seal';
    
    if (window.BagRegistry?.types?.[typeName]) return;
    
    if (typeof window.BagRegistry === 'undefined') {
        window._bagRegistrationQueue = window._bagRegistrationQueue || [];
        if (!window._bagRegistrationQueue.some(x => x.typeName === typeName)) {
            window._bagRegistrationQueue.push({
                typeName: typeName,
                implementation: centerSealImplementation
            });
        }
    } else {
        window.BagRegistry.register(typeName, centerSealImplementation);
    }

    window.debugCenterSealRegistration = function() {
        const success = !!window.BagRegistry?.types?.[typeName];
        console.log(success ? '✅ Center Seal registered' : '❌ Registration failed');
        return success;
    };
    setTimeout(window.debugCenterSealRegistration, 150);
})();