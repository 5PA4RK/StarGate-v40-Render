// js/threeSideStandUp.js - Complete Implementation with Planning Preview
// =============================================
// CONSTANTS
// =============================================
const THREE_SIDE_STAND_UP = {
  FLAP_WIDTH: 0.2,
  GAP_WIDTH: 0.7,
  DEFAULTS: {
    WIDTH: 10,
    HEIGHT: 15,
    GUSSET: 3
  },
  STYLES: {
    PANEL_COLOR: "#FFFFFF",
    STROKE_COLOR: "#0000FF",
    STROKE_WIDTH: 0.05,
    FONT: {
      TITLE: 0.8,
      PANEL: 0.6,
      DIMENSIONS: 0.5,
      TOTAL: 0.6
    },
    BG_COLOR: "#F8F8F8",
    LABEL_COLOR: "#008000",
    DIMENSION_COLOR: "#FF0000",
    // Add planning preview styles
    PLANNING_PREVIEW: {
      SCALE: 0.5,
      STROKE_COLOR: "#FF0000",
      OUTLINE_WIDTH: 0.6,
      INTERNAL_LINE_WIDTH: 0.05,
      FILL_COLOR: "#E3F2FD",
      OPACITY: 1,
      GAP_COLOR: "#888888",
      BOTTOM_COLOR: "#008000"
    }
  }
};

// =============================================
// CORE FUNCTIONS
// =============================================
function calculateThreeSideStandUpLayout(height, width, gusset) {
  const parts = [
    { type: 'L. Trim', x: 0, width: THREE_SIDE_STAND_UP.FLAP_WIDTH },
    { type: 'Front Panel', x: THREE_SIDE_STAND_UP.FLAP_WIDTH, width: width },
    ...(gusset > 0 ? [
      { type: 'Gap', x: THREE_SIDE_STAND_UP.FLAP_WIDTH + width, width: THREE_SIDE_STAND_UP.GAP_WIDTH },
      { type: 'Bottom', x: THREE_SIDE_STAND_UP.FLAP_WIDTH + width + THREE_SIDE_STAND_UP.GAP_WIDTH, width: gusset },
      { type: 'Gap', x: THREE_SIDE_STAND_UP.FLAP_WIDTH + width + THREE_SIDE_STAND_UP.GAP_WIDTH + gusset, width: THREE_SIDE_STAND_UP.GAP_WIDTH }
    ] : []),
    { type: 'Back Panel', x: THREE_SIDE_STAND_UP.FLAP_WIDTH + width + (gusset > 0 ? (2 * THREE_SIDE_STAND_UP.GAP_WIDTH + gusset) : 0), width: width },
    { type: 'R. Trim', x: THREE_SIDE_STAND_UP.FLAP_WIDTH + (2 * width) + (gusset > 0 ? (2 * THREE_SIDE_STAND_UP.GAP_WIDTH + gusset) : 0), width: THREE_SIDE_STAND_UP.FLAP_WIDTH }
  ];

  const totalWidth = (2 * THREE_SIDE_STAND_UP.FLAP_WIDTH) + (2 * width) + 
                    (gusset > 0 ? (2 * THREE_SIDE_STAND_UP.GAP_WIDTH + gusset) : 0);
  
  return { parts, totalWidth };
}

function getSimpleSVG(height, width, gusset) {
  const layout = calculateThreeSideStandUpLayout(height, width, gusset);
  const style = THREE_SIDE_STAND_UP.STYLES.PLANNING_PREVIEW;
  
  return `
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 ${layout.totalWidth} ${height}"
       width="${layout.totalWidth}"
       height="${height}">
    
    <!-- Main Outline -->
    <rect x="0" y="0"
          width="${layout.totalWidth}"
          height="${height}"
          stroke="${style.STROKE_COLOR}"
          stroke-width="${style.OUTLINE_WIDTH}"
          fill="${style.FILL_COLOR}"
          fill-opacity="${style.OPACITY}"/>
    
    <!-- Left Trim -->
    <rect x="0" y="0"
          width="${THREE_SIDE_STAND_UP.FLAP_WIDTH}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Front Panel -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH}" y="0"
          width="${width}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    ${gusset > 0 ? `
    <!-- First Gap -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH + width}" y="0"
          width="${THREE_SIDE_STAND_UP.GAP_WIDTH}"
          height="${height}"
          stroke="${style.GAP_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-dasharray="0.2,0.1"
          fill="none"/>
    
    <!-- Bottom Panel -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH + width + THREE_SIDE_STAND_UP.GAP_WIDTH}" y="0"
          width="${gusset}"
          height="${height}"
          stroke="${style.BOTTOM_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
          fill="none"/>
    
    <!-- Second Gap -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH + width + THREE_SIDE_STAND_UP.GAP_WIDTH + gusset}" y="0"
          width="${THREE_SIDE_STAND_UP.GAP_WIDTH}"
          height="${height}"
          stroke="${style.GAP_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-dasharray="0.2,0.1"
          fill="none"/>
    ` : ''}
    
    <!-- Back Panel -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH + width + (gusset > 0 ? (2 * THREE_SIDE_STAND_UP.GAP_WIDTH + gusset) : 0)}" y="0"
          width="${width}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Right Trim -->
    <rect x="${THREE_SIDE_STAND_UP.FLAP_WIDTH + (2 * width) + (gusset > 0 ? (2 * THREE_SIDE_STAND_UP.GAP_WIDTH + gusset) : 0)}" y="0"
          width="${THREE_SIDE_STAND_UP.FLAP_WIDTH}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Cross (X) Mark -->
    <line x1="0" y1="0"
          x2="${layout.totalWidth}" y2="${height}"
          stroke="#FF0000"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-opacity="0.7"/>
          
    <line x1="0" y1="${height}"
          x2="${layout.totalWidth}" y2="0"
          stroke="#FF0000"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-opacity="0.7"/>
  </svg>`;
}

function drawThreeSideStandUpSVG(height = THREE_SIDE_STAND_UP.DEFAULTS.WIDTH,
                               width = THREE_SIDE_STAND_UP.DEFAULTS.HEIGHT,
                               gusset = THREE_SIDE_STAND_UP.DEFAULTS.GUSSET) {
  
  if (!height || !width) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:${THREE_SIDE_STAND_UP.STYLES.BG_COLOR}">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Height ↑ Enter Width → Enter Gusset
        </text>
      </svg>
    `;
  }

  const layout = calculateThreeSideStandUpLayout(height, width, gusset);
  const verticalCenter = height / 2;
  const padding = 1;
  const viewWidth = layout.totalWidth + (2 * padding);
  const viewHeight = height + 3;
  const scale = Math.min(30 / viewWidth, 20 / viewHeight, 1);

  // Find front and back panel indices
  const frontPanelIndex = layout.parts.findIndex(p => p.type === 'Front Panel');
  const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back Panel');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${viewWidth} ${viewHeight}"
         width="${viewWidth * scale}cm"
         height="${viewHeight * scale}cm"
         style="background-color:${THREE_SIDE_STAND_UP.STYLES.BG_COLOR}">
      
      <text x="${viewWidth / 2}" y="0.8" 
            font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.TITLE}" 
            text-anchor="middle"
            font-weight="bold">
        3 Side Stand Up Bag
      </text>
      
      <g transform="translate(${padding}, 1.5)">
        <!-- Main panels -->
        ${layout.parts.map(part => `
          <rect x="${part.x}" y="0" 
                width="${part.width}" height="${height}" 
                fill="white" 
                stroke="${THREE_SIDE_STAND_UP.STYLES.STROKE_COLOR}" 
                stroke-width="${THREE_SIDE_STAND_UP.STYLES.STROKE_WIDTH}"/>
          
          ${part.type === 'Gap' ? `
          <text x="${part.x + part.width / 2}" y="${verticalCenter + 0.5}" 
                font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${THREE_SIDE_STAND_UP.STYLES.DIMENSION_COLOR}">
            ${part.width.toFixed(1)}cm
          </text>` : ''}
        `).join('')}

        <!-- Bottom Panel Label -->
        ${gusset > 0 ? `
        <text x="${layout.parts[frontPanelIndex + 2].x + layout.parts[frontPanelIndex + 2].width / 2}" 
              y="${verticalCenter - 0.5}" 
              font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.PANEL}" 
              text-anchor="middle"
              font-weight="bold"
              fill="${THREE_SIDE_STAND_UP.STYLES.LABEL_COLOR}">
          ${layout.parts[frontPanelIndex + 2].type}
        </text>
        <text x="${layout.parts[frontPanelIndex + 2].x + layout.parts[frontPanelIndex + 2].width / 2}" 
              y="${verticalCenter + 0.5}" 
              font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.DIMENSIONS}" 
              text-anchor="middle"
              fill="${THREE_SIDE_STAND_UP.STYLES.DIMENSION_COLOR}">
          ${layout.parts[frontPanelIndex + 2].width.toFixed(1)}cm × ${height}cm
        </text>` : ''}

        <!-- Rotated Back Panel Label (90° clockwise) -->
        <g transform="translate(${layout.parts[backPanelIndex].x}, 0) rotate(90)">
          <text x="${height / 2}" y="-${layout.parts[backPanelIndex].width / 2}" 
                font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${THREE_SIDE_STAND_UP.STYLES.LABEL_COLOR}">
            ${layout.parts[backPanelIndex].type}
          </text>
          <text x="${height / 2}" y="-${layout.parts[backPanelIndex].width / 2 + 0.5}" 
                font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${THREE_SIDE_STAND_UP.STYLES.DIMENSION_COLOR}">
            ${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${height}cm
          </text>
        </g>

        <!-- Rotated Front Panel Label (90° counter-clockwise) -->
        <g transform="translate(${layout.parts[frontPanelIndex].x + layout.parts[frontPanelIndex].width}, ${height}) rotate(-90)">
          <text x="${height / 2}" y="-${layout.parts[frontPanelIndex].width / 2}" 
                font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${THREE_SIDE_STAND_UP.STYLES.LABEL_COLOR}">
            ${layout.parts[frontPanelIndex].type}
          </text>
          <text x="${height / 2}" y="-${layout.parts[frontPanelIndex].width / 2 + 0.5}" 
                font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${THREE_SIDE_STAND_UP.STYLES.DIMENSION_COLOR}">
            ${layout.parts[frontPanelIndex].width.toFixed(1)}cm × ${height}cm
          </text>
        </g>
      </g>
      
      <text x="${viewWidth / 2}" y="${height + 2}" 
            font-size="${THREE_SIDE_STAND_UP.STYLES.FONT.TOTAL}" 
            text-anchor="middle"
            font-weight="bold">
        Total: ${layout.totalWidth.toFixed(1)}cm × ${height}cm
      </text>
    </svg>
  `;
}

// =============================================
// PDF GENERATION FUNCTION
// =============================================
async function generateThreeSideStandUpPDF(height = THREE_SIDE_STAND_UP.DEFAULTS.WIDTH, 
                                        width = THREE_SIDE_STAND_UP.DEFAULTS.HEIGHT, 
                                        gusset = THREE_SIDE_STAND_UP.DEFAULTS.GUSSET) {
  try {
    if (!window.jspdf) throw new Error("jsPDF library not loaded");
    
    const { jsPDF } = window.jspdf;
    const layout = calculateThreeSideStandUpLayout(height, width, gusset);
    const margin = 1;
    const docWidth = layout.totalWidth + (2 * margin);
    const docHeight = height + (2 * margin) + 2;

    const pdf = new jsPDF({
      orientation: docWidth > docHeight ? 'landscape' : 'portrait',
      unit: 'cm',
      format: [docWidth, docHeight]
    });

    // Add title
    pdf.setFontSize(8);
    pdf.text('3 Side Stand Up Bag', docWidth / 2, margin - 0.5, { align: 'center' });

    // Draw parts
    layout.parts.forEach(part => {
      pdf.setDrawColor(0, 0, 255);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + part.x, margin, part.width, height, 'FD');
      
      if (part.type === 'Gap') {
        pdf.setTextColor(255, 0, 0);
        pdf.setFontSize(5);
        pdf.text(`${part.width.toFixed(1)}cm`, 
                margin + part.x + part.width / 2, 
                margin + height / 2 + 0.3,  
                { align: 'center' });
      }
    });

    // Find panel indices
    const frontPanelIndex = layout.parts.findIndex(p => p.type === 'Front Panel');
    const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back Panel');
    const bottomPanelIndex = gusset > 0 ? layout.parts.findIndex(p => p.type === 'Bottom') : -1;

    // Bottom Panel
    if (bottomPanelIndex >= 0) {
      pdf.setTextColor(0, 128, 0);
      pdf.setFontSize(6);
      pdf.text(layout.parts[bottomPanelIndex].type, 
              margin + layout.parts[bottomPanelIndex].x + layout.parts[bottomPanelIndex].width / 2, 
              margin + height / 2 - 0.5,  
              { align: 'center' });
      
      pdf.setTextColor(255, 0, 0);
      pdf.setFontSize(5);
      pdf.text(`${layout.parts[bottomPanelIndex].width.toFixed(1)}cm × ${height}cm`, 
              margin + layout.parts[bottomPanelIndex].x + layout.parts[bottomPanelIndex].width / 2, 
              margin + height / 2 + 0.5,  
              { align: 'center' });
    }

    // Rotated Back Panel (90° clockwise)
    pdf.saveGraphicsState();
    pdf.setTextColor(0, 128, 0);
    pdf.setFontSize(6);
    pdf.textWithRotation(layout.parts[backPanelIndex].type,
                       margin + layout.parts[backPanelIndex].x + height,
                       margin + layout.parts[backPanelIndex].width / 2,
                       90);
    
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(5);
    pdf.textWithRotation(`${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${height}cm`,
                       margin + layout.parts[backPanelIndex].x + height,
                       margin + layout.parts[backPanelIndex].width / 2 + 0.4,
                       90);
    pdf.restoreGraphicsState();

    // Rotated Front Panel (90° counter-clockwise)
    pdf.saveGraphicsState();
    pdf.setTextColor(0, 128, 0);
    pdf.setFontSize(6);
    pdf.textWithRotation(layout.parts[frontPanelIndex].type,
                       margin + layout.parts[frontPanelIndex].x,
                       margin + height - layout.parts[frontPanelIndex].width / 2,
                       -90);
    
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(5);
    pdf.textWithRotation(`${layout.parts[frontPanelIndex].width.toFixed(1)}cm × ${height}cm`,
                       margin + layout.parts[frontPanelIndex].x,
                       margin + height - layout.parts[frontPanelIndex].width / 2 - 0.4,
                       -90);
    pdf.restoreGraphicsState();

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(6);
    pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${height}cm`,  
            docWidth / 2, 
            margin + height + 1.5,  
            { align: 'center' });

    pdf.save(`three-side-seal-stand-up-${height}x${width}-gusset${gusset}.pdf`);
    return pdf;

  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}

// =============================================
// REGISTRATION
// =============================================
(function() {
  const typeName = '3 Side Stand Up';
  if (window.BagRegistry?.types?.[typeName]) return;
  
  const implementation = {
    drawSVG: drawThreeSideStandUpSVG,
    downloadPDF: generateThreeSideStandUpPDF,
    getSimpleSVG: getSimpleSVG,
    calculateLayout: calculateThreeSideStandUpLayout,
    getDimensions: function(height, width, gusset = THREE_SIDE_STAND_UP.DEFAULTS.GUSSET) {
      const layout = calculateThreeSideStandUpLayout(height, width, gusset);
      return {
        width: layout.totalWidth,
        height: height,
        gusset: gusset,
        frontPanelWidth: width,
        backPanelWidth: width,
        gapWidth: THREE_SIDE_STAND_UP.GAP_WIDTH
      };
    }
  };

  if (typeof window.BagRegistry === 'undefined') {
    window._bagRegistrationQueue = window._bagRegistrationQueue || [];
    if (!window._bagRegistrationQueue.some(x => x.typeName === typeName)) {
      window._bagRegistrationQueue.push({
        typeName: typeName,
        implementation: implementation
      });
    }
  } else {
    window.BagRegistry.register(typeName, implementation);
  }
})();