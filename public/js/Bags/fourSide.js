// js/fourSide.js - Four-Side Seal Bag Implementation
// =============================================
// CONSTANTS
// =============================================
const FOUR_SIDE = {
  SEAL_WIDTH: 0.7, // 7mm in cm
  PERFORATION_OFFSET: 1.5, // 1.5cm from top
  DEFAULTS: {
    WIDTH: 10,  // Corrected default width (shorter dimension)
    HEIGHT: 15, // Corrected default height (longer dimension)
    GUSSET: 3
  },
  STYLES: {
    PANEL_COLOR: "#FFFFFF",
    STROKE_COLOR: "#0000FF",
    STROKE_WIDTH: 0.05,
    PERFORATION_COLOR: "#FF6B6B",
    PERFORATION_WIDTH: 0.05,
    FONT: {
      TITLE: 1.5,
      PANEL: 1.0,
      DIMENSIONS: 0.8,
      TOTAL: 1.2
    },
    BG_COLOR: "#F8F8F8",
    LABEL_COLOR: "#008000",
    DIMENSION_COLOR: "#FF0000",
    // Added planning preview styles
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
function calculateFourSideLayout(height, width, gusset) {
  const parts = [
    { type: 'Seal', x: 0, width: FOUR_SIDE.SEAL_WIDTH },
    { type: 'Side', x: FOUR_SIDE.SEAL_WIDTH, width: gusset },
    { type: 'Face', x: FOUR_SIDE.SEAL_WIDTH + gusset, width: height }, // Using height for face/back
    { type: 'Side', x: FOUR_SIDE.SEAL_WIDTH + gusset + height, width: gusset },
    { type: 'Back', x: FOUR_SIDE.SEAL_WIDTH + (2 * gusset) + height, width: height },
    { type: 'Seal', x: FOUR_SIDE.SEAL_WIDTH + (2 * gusset) + (2 * height), width: FOUR_SIDE.SEAL_WIDTH }
  ];

  const totalWidth = (2 * FOUR_SIDE.SEAL_WIDTH) + (2 * gusset) + (2 * height);
  return { parts, totalWidth };
}

function getSimpleSVG(height, width, gusset) {
  const layout = calculateFourSideLayout(height, width, gusset);
  const style = FOUR_SIDE.STYLES.PLANNING_PREVIEW;
  
  return `
  <svg xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 ${layout.totalWidth} ${width}"
       width="${layout.totalWidth}"
       height="${width}">
    
    <!-- Main Outline -->
    <rect x="0" y="0"
          width="${layout.totalWidth}"
          height="${width}"
          stroke="${style.STROKE_COLOR}"
          stroke-width="${style.OUTLINE_WIDTH}"
          fill="${style.FILL_COLOR}"
          fill-opacity="${style.OPACITY}"/>
    
    <!-- Left Seal -->
    <rect x="0" y="0"
          width="${FOUR_SIDE.SEAL_WIDTH}"
          height="${width}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    ${gusset > 0 ? `
    <!-- Left Side Panel -->
    <rect x="${FOUR_SIDE.SEAL_WIDTH}" y="0"
          width="${gusset}"
          height="${width}"
          stroke="${style.GUSSET_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
          fill="none"/>
    ` : ''}
    
    <!-- Face Panel -->
    <rect x="${FOUR_SIDE.SEAL_WIDTH + (gusset > 0 ? gusset : 0)}" y="0"
          width="${height}"
          height="${width}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    ${gusset > 0 ? `
    <!-- Right Side Panel -->
    <rect x="${FOUR_SIDE.SEAL_WIDTH + (gusset > 0 ? gusset : 0) + height}" y="0"
          width="${gusset}"
          height="${width}"
          stroke="${style.GUSSET_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"
          fill="none"/>
    ` : ''}
    
    <!-- Back Panel -->
    <rect x="${FOUR_SIDE.SEAL_WIDTH + (gusset > 0 ? gusset * 2 : 0) + height}" y="0"
          width="${height}"
          height="${width}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Right Seal -->
    <rect x="${FOUR_SIDE.SEAL_WIDTH + (gusset > 0 ? gusset * 2 : 0) + (height * 2)}" y="0"
          width="${FOUR_SIDE.SEAL_WIDTH}"
          height="${width}"
          stroke="#333"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          fill="none"/>
    
    <!-- Perforation line -->
    <line x1="0" y1="${FOUR_SIDE.PERFORATION_OFFSET}" 
          x2="${layout.totalWidth}" y2="${FOUR_SIDE.PERFORATION_OFFSET}" 
          stroke="${FOUR_SIDE.STYLES.PERFORATION_COLOR}" 
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-dasharray="0.2,0.1"/>
    
    <!-- Cross (X) Mark -->
    <line x1="0" y1="0"
          x2="${layout.totalWidth}" y2="${width}"
          stroke="#FF0000"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-opacity="0.7"/>
          
    <line x1="0" y1="${width}"
          x2="${layout.totalWidth}" y2="0"
          stroke="#FF0000"
          stroke-width="${style.INTERNAL_LINE_WIDTH}"
          stroke-opacity="0.7"/>
  </svg>`;
}

function drawFourSideSVG(height = FOUR_SIDE.DEFAULTS.HEIGHT,
                        width = FOUR_SIDE.DEFAULTS.WIDTH,
                        gusset = FOUR_SIDE.DEFAULTS.GUSSET) {
  
  if (!height || !width) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:${FOUR_SIDE.STYLES.BG_COLOR}">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Height ↑ Enter Width → Enter Gusset
        </text>
      </svg>
    `;
  }

  const layout = calculateFourSideLayout(height, width, gusset);
  const verticalCenter = width / 2; // Using width for vertical center since height is now the longer dimension
  const padding = 1.5;
  const viewWidth = layout.totalWidth + (2 * padding);
  const viewHeight = width + 5; // Using width for view height

  // Find panel indices
  const facePanelIndex = layout.parts.findIndex(p => p.type === 'Face');
  const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back');
  const sidePanelIndices = layout.parts.reduce((acc, part, index) => {
    if (part.type === 'Side') acc.push(index);
    return acc;
  }, []);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${viewWidth} ${viewHeight}"
         style="background-color:${FOUR_SIDE.STYLES.BG_COLOR}; shape-rendering: crispEdges">
      
      <text x="${viewWidth / 2}" y="1.2" 
            font-size="${FOUR_SIDE.STYLES.FONT.TITLE}" 
            text-anchor="middle"
            font-weight="bold"
            fill="${FOUR_SIDE.STYLES.LABEL_COLOR}">
        Four-Side Seal Bag
      </text>
      
      <g transform="translate(${padding}, 2.5)">
        <!-- Main panels -->
        ${layout.parts.map(part => `
          <rect x="${part.x}" y="0" 
                width="${part.width}" height="${width}" 
                fill="${FOUR_SIDE.STYLES.PANEL_COLOR}" 
                stroke="${FOUR_SIDE.STYLES.STROKE_COLOR}" 
                stroke-width="${FOUR_SIDE.STYLES.STROKE_WIDTH}"/>
        `).join('')}

        <!-- Perforation line -->
        <line x1="0" y1="${FOUR_SIDE.PERFORATION_OFFSET}" 
              x2="${layout.totalWidth}" y2="${FOUR_SIDE.PERFORATION_OFFSET}" 
              stroke="${FOUR_SIDE.STYLES.PERFORATION_COLOR}" 
              stroke-width="${FOUR_SIDE.STYLES.PERFORATION_WIDTH}"
              stroke-dasharray="0.2,0.1"/>

        <!-- Only show Side Panel labels if gusset has a value -->
        ${gusset > 0 ? sidePanelIndices.map(i => `
          <text x="${layout.parts[i].x + layout.parts[i].width / 2}" 
                y="${verticalCenter}" 
                font-size="${FOUR_SIDE.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${FOUR_SIDE.STYLES.LABEL_COLOR}">
            ${layout.parts[i].type}
          </text>
          <text x="${layout.parts[i].x + layout.parts[i].width / 2}" 
                y="${verticalCenter + 0.8}" 
                font-size="${FOUR_SIDE.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${FOUR_SIDE.STYLES.DIMENSION_COLOR}">
            ${layout.parts[i].width.toFixed(1)}cm × ${width}cm
          </text>
        `).join('') : ''}
        
        <!-- Back Panel Label -->
        <text x="${layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2}" 
              y="${verticalCenter}" 
              font-size="${FOUR_SIDE.STYLES.FONT.PANEL}" 
              text-anchor="middle"
              font-weight="bold"
              fill="${FOUR_SIDE.STYLES.LABEL_COLOR}">
          ${layout.parts[backPanelIndex].type}
        </text>
        <text x="${layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2}" 
              y="${verticalCenter + 0.8}" 
              font-size="${FOUR_SIDE.STYLES.FONT.DIMENSIONS}" 
              text-anchor="middle"
              fill="${FOUR_SIDE.STYLES.DIMENSION_COLOR}">
          ${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${width}cm
        </text>

        <!-- Face Panel Label -->
        <text x="${layout.parts[facePanelIndex].x + layout.parts[facePanelIndex].width / 2}" 
              y="${verticalCenter}" 
              font-size="${FOUR_SIDE.STYLES.FONT.PANEL}" 
              text-anchor="middle"
              font-weight="bold"
              fill="${FOUR_SIDE.STYLES.LABEL_COLOR}">
          ${layout.parts[facePanelIndex].type}
        </text>
        <text x="${layout.parts[facePanelIndex].x + layout.parts[facePanelIndex].width / 2}" 
              y="${verticalCenter + 0.8}" 
              font-size="${FOUR_SIDE.STYLES.FONT.DIMENSIONS}" 
              text-anchor="middle"
              fill="${FOUR_SIDE.STYLES.DIMENSION_COLOR}">
          ${layout.parts[facePanelIndex].width.toFixed(1)}cm × ${width}cm
        </text>

        <!-- Seal labels -->
        ${[0, layout.parts.length - 1].map(i => `
          <text x="${layout.parts[i].x + layout.parts[i].width / 2}" 
                y="${width + 1.2}" 
                font-size="${FOUR_SIDE.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${FOUR_SIDE.STYLES.LABEL_COLOR}">
            Seal
          </text>
          <text x="${layout.parts[i].x + layout.parts[i].width / 2}" 
                y="${width + 1.8}" 
                font-size="${FOUR_SIDE.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${FOUR_SIDE.STYLES.DIMENSION_COLOR}">
            ${FOUR_SIDE.SEAL_WIDTH.toFixed(1)}cm
          </text>
        `).join('')}
      </g>
      
      <text x="${viewWidth / 2}" y="${width + 3.5}" 
            font-size="${FOUR_SIDE.STYLES.FONT.TOTAL}" 
            text-anchor="middle"
            font-weight="bold">
        Total: ${layout.totalWidth.toFixed(1)}cm × ${width}cm
      </text>
    </svg>
  `;
}

// =============================================
// PDF GENERATION FUNCTION
// =============================================
async function generateFourSidePDF(height = FOUR_SIDE.DEFAULTS.HEIGHT, 
                                 width = FOUR_SIDE.DEFAULTS.WIDTH, 
                                 gusset = FOUR_SIDE.DEFAULTS.GUSSET) {
  try {
    if (!window.jspdf) throw new Error("jsPDF library not loaded");
    
    const { jsPDF } = window.jspdf;
    const layout = calculateFourSideLayout(height, width, gusset);
    const margin = 1.5;
    const docWidth = layout.totalWidth + (2 * margin);
    const docHeight = width + (2 * margin) + 4;

    const pdf = new jsPDF({
      orientation: docWidth > docHeight ? 'landscape' : 'portrait',
      unit: 'cm',
      format: [docWidth, docHeight]
    });

    // Set line width for all drawings
    pdf.setLineWidth(FOUR_SIDE.STYLES.STROKE_WIDTH);

    // Add title
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.TITLE * 10);
    pdf.setFont(undefined, 'bold');
    pdf.text('Four-Side Seal Bag', docWidth / 2, margin - 0.3, { align: 'center' });

    // Draw parts
    layout.parts.forEach(part => {
      pdf.setDrawColor(0, 0, 255); // Blue stroke
      pdf.setFillColor(255, 255, 255); // White fill
      pdf.rect(margin + part.x, margin, part.width, width, 'FD');
    });

    // Draw perforation line
    pdf.setDrawColor(255, 107, 107); // Reddish color
    pdf.setLineWidth(FOUR_SIDE.STYLES.PERFORATION_WIDTH);
    pdf.setLineDashPattern([0.2, 0.1], 0);
    pdf.line(
      margin,
      margin + FOUR_SIDE.PERFORATION_OFFSET,
      margin + layout.totalWidth,
      margin + FOUR_SIDE.PERFORATION_OFFSET
    );
    pdf.setLineDashPattern([], 0); // Reset dash pattern

    // Side Panel labels (only if gusset has value)
    if (gusset > 0) {
      const sidePanelIndices = layout.parts.reduce((acc, part, index) => {
        if (part.type === 'Side') acc.push(index);
        return acc;
      }, []);

      sidePanelIndices.forEach(i => {
        pdf.setTextColor(0, 128, 0); // Green
        pdf.setFontSize(FOUR_SIDE.STYLES.FONT.PANEL * 10);
        pdf.text(layout.parts[i].type,
                margin + layout.parts[i].x + layout.parts[i].width / 2,
                margin + width / 2,
                { align: 'center' });
        
        pdf.setTextColor(255, 0, 0); // Red
        pdf.setFontSize(FOUR_SIDE.STYLES.FONT.DIMENSIONS * 10);
        pdf.text(`${layout.parts[i].width.toFixed(1)}cm × ${width}cm`,
                margin + layout.parts[i].x + layout.parts[i].width / 2,
                margin + width / 2 + 0.8,
                { align: 'center' });
      });
    }

    // Back Panel label
    const backPanelIndex = layout.parts.findIndex(p => p.type === 'Back');
    pdf.setTextColor(0, 128, 0); // Green
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.PANEL * 10);
    pdf.text(layout.parts[backPanelIndex].type,
            margin + layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2,
            margin + width / 2,
            { align: 'center' });
    
    pdf.setTextColor(255, 0, 0); // Red
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.DIMENSIONS * 10);
    pdf.text(`${layout.parts[backPanelIndex].width.toFixed(1)}cm × ${width}cm`,
            margin + layout.parts[backPanelIndex].x + layout.parts[backPanelIndex].width / 2,
            margin + width / 2 + 0.8,
            { align: 'center' });

    // Face Panel label
    const facePanelIndex = layout.parts.findIndex(p => p.type === 'Face');
    pdf.setTextColor(0, 128, 0); // Green
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.PANEL * 10);
    pdf.text(layout.parts[facePanelIndex].type,
            margin + layout.parts[facePanelIndex].x + layout.parts[facePanelIndex].width / 2,
            margin + width / 2,
            { align: 'center' });
    
    pdf.setTextColor(255, 0, 0); // Red
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.DIMENSIONS * 10);
    pdf.text(`${layout.parts[facePanelIndex].width.toFixed(1)}cm × ${width}cm`,
            margin + layout.parts[facePanelIndex].x + layout.parts[facePanelIndex].width / 2,
            margin + width / 2 + 0.8,
            { align: 'center' });

    // Seal labels
    [0, layout.parts.length - 1].forEach(i => {
      pdf.setTextColor(0, 128, 0); // Green for Seal
      pdf.setFontSize(FOUR_SIDE.STYLES.FONT.PANEL * 10);
      pdf.text('Seal', 
              margin + layout.parts[i].x + layout.parts[i].width / 2,
              margin + width + 1,
              { align: 'center' });

      pdf.setTextColor(255, 0, 0); // Red for dimensions
      pdf.setFontSize(FOUR_SIDE.STYLES.FONT.DIMENSIONS * 10);
      pdf.text(`${FOUR_SIDE.SEAL_WIDTH.toFixed(1)}cm`, 
              margin + layout.parts[i].x + layout.parts[i].width / 2,
              margin + width + 1.6,
              { align: 'center' });
    });

    // Footer
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(FOUR_SIDE.STYLES.FONT.TOTAL * 10);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${width}cm`,
            docWidth / 2,
            margin + width + 2,
            { align: 'center' });

    pdf.save(`four-side-bag-${height}x${width}-gusset${gusset}.pdf`);
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
  const typeName = '4 Side';
  if (window.BagRegistry?.types?.[typeName]) return;

  const implementation = {
    drawSVG: drawFourSideSVG,
    downloadPDF: generateFourSidePDF,
    getSimpleSVG: getSimpleSVG,
    calculateLayout: calculateFourSideLayout,
    getDimensions: function(height, width, gusset = FOUR_SIDE.DEFAULTS.GUSSET) {
      const layout = calculateFourSideLayout(height, width, gusset);
      return {
        width: layout.totalWidth,
        height: width, // Note: width is the shorter dimension (bag height)
        gusset: gusset,
        facePanelWidth: height,
        backPanelWidth: height
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