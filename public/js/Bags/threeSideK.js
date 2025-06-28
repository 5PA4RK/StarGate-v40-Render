// js/3SideK.js - Perfectly Centered Labels Implementation
// =============================================
// CONSTANTS
// =============================================
const THREE_SIDE_K = {
  FLAP_WIDTH: 0.2,
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
      TITLE: 1.5,
      PANEL: 1.0,
      DIMENSIONS: 0.8,
      TOTAL: 1.2
    },
    BG_COLOR: "#F8F8F8",
    LABEL_COLOR: "#008000",
    DIMENSION_COLOR: "#FF0000",


    PLANNING_PREVIEW: {
      SCALE: 0.5,
      STROKE_COLOR: "#FF0000",
      OUTLINE_WIDTH: 0.6,
      INTERNAL_LINE_WIDTH: 0.05,
      FILL_COLOR: "#E3F2FD",
      OPACITY: 1,
      GUSSET_COLOR: "#008000"
    }
  }
};

// =============================================
// CORE FUNCTIONS
// =============================================
function calculate3SideKLayout(height, width, gusset) {
  const parts = [
    { type: 'L. Trim', x: 0, width: THREE_SIDE_K.FLAP_WIDTH },
    { type: 'Front Panel', x: THREE_SIDE_K.FLAP_WIDTH, width: width },
    ...(gusset > 0 ? [{ type: 'Gusset', x: THREE_SIDE_K.FLAP_WIDTH + width, width: gusset }] : []),
    { type: 'Back Panel', x: THREE_SIDE_K.FLAP_WIDTH + width + (gusset > 0 ? gusset : 0), width: width },
    { type: 'R. Trim', x: THREE_SIDE_K.FLAP_WIDTH + (2 * width) + (gusset > 0 ? gusset : 0), width: THREE_SIDE_K.FLAP_WIDTH }
  ];

  const totalWidth = (2 * THREE_SIDE_K.FLAP_WIDTH) + (2 * width) + (gusset > 0 ? gusset : 0); 
  return { parts, totalWidth };
}

function draw3SideKSVG(height = THREE_SIDE_K.DEFAULTS.WIDTH,
                      width = THREE_SIDE_K.DEFAULTS.HEIGHT,
                      gusset = THREE_SIDE_K.DEFAULTS.GUSSET) {
  
  if (!height || !width) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:${THREE_SIDE_K.STYLES.BG_COLOR}">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Height ↑ Enter Width → Enter Gusset
        </text>
      </svg>
    `;
  }

  const layout = calculate3SideKLayout(height, width, gusset);
  const verticalCenter = height / 2;
  const padding = 1.5;
  const viewWidth = layout.totalWidth + (2 * padding);
  const viewHeight = height + 4;

  // Find panel indices
  const frontPanelIndex = layout.parts.findIndex(p => p.type === 'Front Panel');
  const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back Panel');
  const gussetIndex = gusset > 0 ? layout.parts.findIndex(p => p.type === 'Gusset') : -1;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${viewWidth} ${viewHeight}"
         style="background-color:${THREE_SIDE_K.STYLES.BG_COLOR}; shape-rendering: crispEdges">
      
      <text x="${viewWidth / 2}" y="1.2" 
            font-size="${THREE_SIDE_K.STYLES.FONT.TITLE}" 
            text-anchor="middle"
            font-weight="bold"
            fill="${THREE_SIDE_K.STYLES.LABEL_COLOR}">
        3 Side K Bag
      </text>
      
      <g transform="translate(${padding}, 2.5)">
        <!-- Main panels -->
        ${layout.parts.map(part => `
          <rect x="${part.x}" y="0" 
                width="${part.width}" height="${height}" 
                fill="${THREE_SIDE_K.STYLES.PANEL_COLOR}" 
                stroke="${THREE_SIDE_K.STYLES.STROKE_COLOR}" 
                stroke-width="${THREE_SIDE_K.STYLES.STROKE_WIDTH}"/>
        `).join('')}

        <!-- Gusset label (if exists) -->
        ${gussetIndex >= 0 ? `
        <text x="${layout.parts[gussetIndex].x + layout.parts[gussetIndex].width / 2}" 
              y="${verticalCenter - 0.4}" 
              font-size="${THREE_SIDE_K.STYLES.FONT.PANEL}" 
              text-anchor="middle"
              font-weight="bold"
              fill="${THREE_SIDE_K.STYLES.LABEL_COLOR}">
          ${layout.parts[gussetIndex].type}
        </text>
        <text x="${layout.parts[gussetIndex].x + layout.parts[gussetIndex].width / 2}" 
              y="${verticalCenter + 0.4}" 
              font-size="${THREE_SIDE_K.STYLES.FONT.DIMENSIONS}" 
              text-anchor="middle"
              fill="${THREE_SIDE_K.STYLES.DIMENSION_COLOR}">
          ${layout.parts[gussetIndex].width.toFixed(1)}cm × ${height}cm
        </text>` : ''}

        <!-- Rotated Back Panel Label (90° clockwise) - Perfectly centered -->
        <g transform="translate(${layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2}, ${verticalCenter}) rotate(90)">
          <text x="0" y="-0.7" 
                font-size="${THREE_SIDE_K.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${THREE_SIDE_K.STYLES.LABEL_COLOR}">
            ${layout.parts[backPanelIndex].type}
          </text>
          <text x="0" y="0.7" 
                font-size="${THREE_SIDE_K.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${THREE_SIDE_K.STYLES.DIMENSION_COLOR}">
            ${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${height}cm
          </text>
        </g>

        <!-- Rotated Front Panel Label (90° counter-clockwise) - Perfectly centered -->
        <g transform="translate(${layout.parts[frontPanelIndex].x + layout.parts[frontPanelIndex].width / 2}, ${verticalCenter}) rotate(-90)">
          <text x="0" y="-0.7" 
                font-size="${THREE_SIDE_K.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${THREE_SIDE_K.STYLES.LABEL_COLOR}">
            ${layout.parts[frontPanelIndex].type}
          </text>
          <text x="0" y="0.7" 
                font-size="${THREE_SIDE_K.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${THREE_SIDE_K.STYLES.DIMENSION_COLOR}">
            ${layout.parts[frontPanelIndex].width.toFixed(1)}cm × ${height}cm
          </text>
        </g>
      </g>
      
      <text x="${viewWidth / 2}" y="${height + 2}" 
            font-size="${THREE_SIDE_K.STYLES.FONT.TOTAL}" 
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
async function generate3SideKPDF(height = THREE_SIDE_K.DEFAULTS.WIDTH, 
                               width = THREE_SIDE_K.DEFAULTS.HEIGHT, 
                               gusset = THREE_SIDE_K.DEFAULTS.GUSSET) {
  try {
    if (!window.jspdf) throw new Error("jsPDF library not loaded");
    
    const { jsPDF } = window.jspdf;
    const layout = calculate3SideKLayout(height, width, gusset);
    const margin = 1.5;
    const docWidth = layout.totalWidth + (2 * margin);
    const docHeight = height + (2 * margin) + 3;

    const pdf = new jsPDF({
      orientation: docWidth > docHeight ? 'landscape' : 'portrait',
      unit: 'cm',
      format: [docWidth, docHeight]
    });

    // Set line width for all drawings
    pdf.setLineWidth(THREE_SIDE_K.STYLES.STROKE_WIDTH);

    // Add title
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.TITLE * 33);
    pdf.setFont(undefined, 'bold');
    pdf.text('3 Side K Bag', docWidth / 2, margin - 0.3, { align: 'center' });

    // Draw parts
    layout.parts.forEach(part => {
      pdf.setDrawColor(0, 0, 255); // Blue stroke
      pdf.setFillColor(255, 255, 255); // White fill
      pdf.rect(margin + part.x, margin, part.width, height, 'FD');
    });

    // Gusset label (if exists)
    if (gusset > 0) {
      const gussetIndex = layout.parts.findIndex(p => p.type === 'Gusset');
      pdf.setTextColor(0, 128, 0); // Green
      pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.PANEL * 22);
      pdf.text(layout.parts[gussetIndex].type, 
              margin + layout.parts[gussetIndex].x + layout.parts[gussetIndex].width / 2, 
              margin + height / 2 - 0.3,  
              { align: 'center' });
      
      pdf.setTextColor(255, 0, 0); // Red
      pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.DIMENSIONS * 15);
      pdf.text(`${layout.parts[gussetIndex].width.toFixed(1)}cm × ${height}cm`, 
              margin + layout.parts[gussetIndex].x + layout.parts[gussetIndex].width / 2, 
              margin + height / 2 + 0.3,  
              { align: 'center' });
    }

    // Back Panel (rotated 90° clockwise)
    const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back Panel');
    const backPanelCenterX = margin + layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2;
    const backPanelCenterY = margin + height / 2;

    pdf.setTextColor(0, 128, 0); // Green
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.PANEL * 22);
    pdf.text(layout.parts[backPanelIndex].type, 
              backPanelCenterX, 
              backPanelCenterY - 0.3, 
              { angle: 90, align: 'center' });
    
    pdf.setTextColor(255, 0, 0); // Red
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.DIMENSIONS * 15);
    pdf.text(`${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${height}cm`, 
              backPanelCenterX, 
              backPanelCenterY + 0.3, 
              { angle: 90, align: 'center' });

    // Front Panel (rotated 90° counter-clockwise)
    const frontPanelIndex = layout.parts.findIndex(p => p.type === 'Front Panel');
    const frontPanelCenterX = margin + layout.parts[frontPanelIndex].x + layout.parts[frontPanelIndex].width / 2;
    const frontPanelCenterY = margin + height / 2;

    pdf.setTextColor(0, 128, 0); // Green
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.PANEL * 22);
    pdf.text(layout.parts[frontPanelIndex].type, 
              frontPanelCenterX, 
              frontPanelCenterY - 0.3, 
              { angle: -90, align: 'center' });
    
    pdf.setTextColor(255, 0, 0); // Red
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.DIMENSIONS * 15);
    pdf.text(`${layout.parts[frontPanelIndex].width.toFixed(1)}cm × ${height}cm`, 
              frontPanelCenterX, 
              frontPanelCenterY + 0.3, 
              { angle: -90, align: 'center' });

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(THREE_SIDE_K.STYLES.FONT.TOTAL * 33);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${height}cm`,  
              docWidth / 2, 
              margin + height + 0.5,  
              { align: 'center' });

    pdf.save(`3side-k-bag-${height}x${width}-gusset${gusset}.pdf`);
    return pdf;
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}


// =============================================
// Simpilfied unit
// =============================================

function getSimpleSVG(height, width, gusset) {
  const layout = calculate3SideKLayout(height, width, gusset);
  const style = THREE_SIDE_K.STYLES.PLANNING_PREVIEW;
  
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
          width="${THREE_SIDE_K.FLAP_WIDTH}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Front Panel -->
    <rect x="${THREE_SIDE_K.FLAP_WIDTH}" y="0"
          width="${width}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    ${gusset > 0 ? `
    <!-- Gusset -->
    <rect x="${THREE_SIDE_K.FLAP_WIDTH + width}" y="0"
          width="${gusset}"
          height="${height}"
          stroke="${style.GUSSET_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
          fill="none"/>
    ` : ''}
    
    <!-- Back Panel -->
    <rect x="${THREE_SIDE_K.FLAP_WIDTH + width + (gusset > 0 ? gusset : 0)}" y="0"
          width="${width}"
          height="${height}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Right Trim -->
    <rect x="${THREE_SIDE_K.FLAP_WIDTH + (2 * width) + (gusset > 0 ? gusset : 0)}" y="0"
          width="${THREE_SIDE_K.FLAP_WIDTH}"
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



// =============================================
// REGISTRATION
// =============================================
(function() {
  const typeName = '3 Side K';
  if (window.BagRegistry?.types?.[typeName]) return;
  
  const implementation = {
    drawSVG: draw3SideKSVG,
    downloadPDF: generate3SideKPDF,
    getSimpleSVG: getSimpleSVG,
    calculateLayout: calculate3SideKLayout,
    getDimensions: function(height, width, gusset = THREE_SIDE_K.DEFAULTS.GUSSET) {
      const layout = calculate3SideKLayout(height, width, gusset);
      return {
        width: layout.totalWidth,
        height: height,
        gusset: gusset,
        frontPanelWidth: width,
        backPanelWidth: width
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