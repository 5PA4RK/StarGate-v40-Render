// js/twoSide.js - Enhanced Labeling Version
// =============================================
// CONSTANTS
// =============================================
const TWO_SIDE = {
    FLAP_WIDTH: 1.5, // cm
    SEAL_WIDTH: 1.0, // cm
    DEFAULTS: {
        WIDTH: 20,
        HEIGHT: 30
    },
    STYLES: {
        PANEL_COLOR: "#0000FF", // Blue
        SEAL_COLOR: "#FF0000",  // Red
        STROKE_WIDTH: 0.1,
        FONT: {
            TITLE: 1.2,    // cm
            PANEL: 0.8,    // cm (bold)
            DIMENSIONS: 0.6, // cm
            TOTAL: 0.7      // cm
        },
        BG_COLOR: "#F8F8F8",
        PLANNING_PREVIEW: {
            SCALE: 0.5, // Scale down for planning view
            STROKE_COLOR: "#FF0000", // Red outline
            OUTLINE_WIDTH: 0.6, // Thicker outline
            INTERNAL_LINE_WIDTH: 0.05, // Thinner internal lines
            FILL_COLOR: "#E3F2FD",
            OPACITY: 1,
            SEAL_COLOR: "#FF0000" // Keep seal color consistent
        }
    }
};

// =============================================
// IMPLEMENTATION
// =============================================
const twoSideImplementation = (function() {
    function calculateLayout(width, height) {
        return {
            parts: [
                { type: 'Left Flap', x: 0, width: TWO_SIDE.FLAP_WIDTH, color: TWO_SIDE.STYLES.PANEL_COLOR },
                { type: 'Front Panel', x: TWO_SIDE.FLAP_WIDTH, width: width, color: TWO_SIDE.STYLES.PANEL_COLOR },
                { type: 'Center Seal', x: TWO_SIDE.FLAP_WIDTH + width, width: TWO_SIDE.SEAL_WIDTH, color: TWO_SIDE.STYLES.SEAL_COLOR },
                { type: 'Back Panel', x: TWO_SIDE.FLAP_WIDTH + width + TWO_SIDE.SEAL_WIDTH, width: width, color: TWO_SIDE.STYLES.PANEL_COLOR },
                { type: 'Right Flap', x: TWO_SIDE.FLAP_WIDTH + width + TWO_SIDE.SEAL_WIDTH + width, width: TWO_SIDE.FLAP_WIDTH, color: TWO_SIDE.STYLES.PANEL_COLOR }
            ],
            totalWidth: (2 * width) + (2 * TWO_SIDE.FLAP_WIDTH) + TWO_SIDE.SEAL_WIDTH
        };
    }

    function getSimpleSVG(width, height) {
        const dims = this.getDimensions(width, height);
        const style = TWO_SIDE.STYLES.PLANNING_PREVIEW;
        
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
                  width="${TWO_SIDE.FLAP_WIDTH}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Front Panel -->
            <rect x="${TWO_SIDE.FLAP_WIDTH}" y="0"
                  width="${width}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Center Seal -->
            <rect x="${TWO_SIDE.FLAP_WIDTH + width}" y="0"
                  width="${TWO_SIDE.SEAL_WIDTH}"
                  height="${dims.height}"
                  stroke="${style.SEAL_COLOR}"
                  stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
                  fill="none"/>
            
            <!-- Back Panel -->
            <rect x="${TWO_SIDE.FLAP_WIDTH + width + TWO_SIDE.SEAL_WIDTH}" y="0"
                  width="${width}"
                  height="${dims.height}"
                  stroke="#333"
                  stroke-width="${style.INTERNAL_LINE_WIDTH}"
                  fill="none"/>
            
            <!-- Right Flap -->
            <rect x="${TWO_SIDE.FLAP_WIDTH + width + TWO_SIDE.SEAL_WIDTH + width}" y="0"
                  width="${TWO_SIDE.FLAP_WIDTH}"
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

    return {
        drawSVG: function(width = TWO_SIDE.DEFAULTS.WIDTH, height = TWO_SIDE.DEFAULTS.HEIGHT) { 
            const hasAllDimensions = width > 0 && height > 0;
            const layout = calculateLayout(width, height);
            const verticalCenter = height / 2;
            const padding = 1;
            const labelSpace = 2;
            const totalHeight = height + padding + labelSpace;

            if (!hasAllDimensions) {
                const messages = [];
                if (width <= 0) messages.push('← Enter Width');
                if (height <= 0) messages.push('↑ Enter Height');

                const messageText = messages.join(' ');
                const textLength = messageText.length * 0.6;
                const viewBoxWidth = Math.max(20, textLength);
                
                return `
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       viewBox="0 0 ${viewBoxWidth} 10"
                       style="background-color:${TWO_SIDE.STYLES.BG_COLOR}; shape-rendering: crispEdges">
                    <title>Dimensions Warning</title>
                    <text x="50%" y="50%" 
                          font-size="0.4"
                          text-anchor="middle"
                          dominant-baseline="middle"
                          fill="#B0B0B0">
                      ${messageText}
                    </text>
                  </svg>
                `;
            }

            const totalHeightWithLabels = height + padding + labelSpace;
            
            return `
              <svg xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 ${layout.totalWidth} ${totalHeightWithLabels}"
                   style="background-color: ${TWO_SIDE.STYLES.BG_COLOR}; shape-rendering: crispEdges;">
                  
                  <!-- Bag Title -->
                  <text x="${layout.totalWidth/2}" y="1" 
                        font-size="${TWO_SIDE.STYLES.FONT.TITLE}" 
                        text-anchor="middle" 
                        font-weight="bold">
                      2 Side Bag
                  </text>
                  
                  <!-- Bag Parts -->
                  <g transform="translate(0, 1.5)">
                      ${layout.parts.map(part => `
                      <rect x="${part.x}" y="0" width="${part.width}" height="${height}"
                            stroke="${part.color}" 
                            fill="white" 
                            stroke-width="${TWO_SIDE.STYLES.STROKE_WIDTH}"/>
                      
                      <text x="${part.x + part.width/2}" y="${verticalCenter - 0.3}" 
                            font-size="${TWO_SIDE.STYLES.FONT.PANEL}" 
                            text-anchor="middle"
                            font-weight="bold"
                            fill="${part.color}">
                          ${part.type}
                      </text>
                      <text x="${part.x + part.width/2}" y="${verticalCenter + 0.3}" 
                            font-size="${TWO_SIDE.STYLES.FONT.DIMENSIONS}" 
                            text-anchor="middle"
                            fill="${part.color}">
                          ${part.width.toFixed(1)}cm × ${height}cm
                      </text>
                      `).join('')}
                  </g>
                  
                  <!-- Total Dimensions -->
                  <text x="${layout.totalWidth/2}" y="${totalHeightWithLabels - 1}" 
                        font-size="${TWO_SIDE.STYLES.FONT.TOTAL}" 
                        text-anchor="middle"
                        font-weight="bold">
                      Total: ${layout.totalWidth.toFixed(1)}cm (width) × ${height}cm (height)
                  </text>
              </svg>`;
        },
        
        downloadPDF: async function(width, height) {
            if (!window.jspdf) throw new Error("jsPDF library not loaded");
            const { jsPDF } = window.jspdf;
            
            const layout = calculateLayout(width, height);
            const margin = 2; // cm
            const pdfHeight = height + margin * 2 + 3; // Extra space for labels
            
            const pdf = new jsPDF({
                orientation: layout.totalWidth > pdfHeight ? 'landscape' : 'portrait',
                unit: 'cm',
                format: [layout.totalWidth + margin * 2, pdfHeight]
            });

            // Bag Title
            pdf.setFontSize(TWO_SIDE.STYLES.FONT.TITLE * 10);
            pdf.setFont(undefined, 'bold');
            pdf.text('2 Side Bag', 
                    margin + layout.totalWidth/2, 
                    margin - 0.5, 
                    { align: 'center' });
            
            // Draw parts with labels
            layout.parts.forEach(part => {
                const color = hexToRgb(part.color);
                
                pdf.setDrawColor(color.r, color.g, color.b);
                pdf.rect(margin + part.x, margin, part.width, height);
                
                // Panel name
                pdf.setTextColor(color.r, color.g, color.b);
                pdf.setFontSize(TWO_SIDE.STYLES.FONT.PANEL * 10);
                pdf.setFont(undefined, 'bold');
                pdf.text(part.type, 
                        margin + part.x + part.width/2, 
                        margin + height/2 - 0.3, 
                        { align: 'center' });
                
                // Dimensions
                pdf.setFontSize(TWO_SIDE.STYLES.FONT.DIMENSIONS * 10);
                pdf.setFont(undefined, 'normal');
                pdf.text(`${part.width.toFixed(1)}cm × ${height}cm`, 
                        margin + part.x + part.width/2, 
                        margin + height/2 + 0.3, 
                        { align: 'center' });
            });
            
            // Total dimensions
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(TWO_SIDE.STYLES.FONT.TOTAL * 10);
            pdf.setFont(undefined, 'bold');
            pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${height}cm`, 
                    margin + layout.totalWidth/2, 
                    margin + height + 1.5, 
                    { align: 'center' });
            
            pdf.save(`2side-bag-${width}x${height}.pdf`);
            return pdf;
            
            function hexToRgb(hex) {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return { r, g, b };
            }
        },
        
        getSimpleSVG,
        
        getDimensions: function(width, height) {
            return {
                width: (2 * width) + (2 * TWO_SIDE.FLAP_WIDTH) + TWO_SIDE.SEAL_WIDTH,
                height: height,
                frontPanelWidth: width,
                backPanelWidth: width,
                sealWidth: TWO_SIDE.SEAL_WIDTH
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
            if (e.detail.type !== '2 Side') return;
            
            const { width, height } = e.detail;
            
            // Reset counters when bag changes
            if (window.elements && window.elements.horizontalCount) {
                elements.horizontalCount.value = 1;
                elements.verticalCount.value = 1;
            }
            
            // Update current dimensions
            window.currentBagType = e.detail.type;
            window.currentBagWidth = width;
            window.currentBagHeight = height;
            
            if (window.updatePreview) updatePreview();
            if (window.updateButtonStates) updateButtonStates();
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
    const typeName = '2 Side';
    
    if (window.BagRegistry?.types?.[typeName]) return;
    
    if (typeof window.BagRegistry === 'undefined') {
        window._bagRegistrationQueue = window._bagRegistrationQueue || [];
        if (!window._bagRegistrationQueue.some(x => x.typeName === typeName)) {
            window._bagRegistrationQueue.push({
                typeName: typeName,
                implementation: twoSideImplementation
            });
        }
    } else {
        window.BagRegistry.register(typeName, twoSideImplementation);
    }

    window.debugTwoSideRegistration = function() {
        const success = !!window.BagRegistry?.types?.[typeName];
        console.log(success ? '✅ 2 Side registered' : '❌ Registration failed');
        return success;
    };
    setTimeout(window.debugTwoSideRegistration, 150);
})();