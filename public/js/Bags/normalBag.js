// js/normalBag.js - Complete Fixed Implementation
// =============================================
const NORMAL_BAG = {
  SEALING_AREA: 0.5, // cm
  DEFAULTS: {
    width: 20,
    height: 30,
    flap: 0,
    gusset: 0
  },
  STYLES: {
    PANEL_COLOR: "#FFFFFF",
    STROKE_COLOR: "#0000FF",
    STROKE_WIDTH: 0.05,
    FONT: {
      TITLE: 1.2,
      PANEL: 1.0,
      DIMENSIONS: 0.8,
      TOTAL: 1.0
    },
    BG_COLOR: "#F8F8F8",
    LABEL_COLOR: "#000000",
    DIMENSION_COLOR: "#FF0000",
    PLANNING_PREVIEW: {
      SCALE: 0.5,
      STROKE_COLOR: "#FF0000",
      OUTLINE_WIDTH: 0.6,
      INTERNAL_LINE_WIDTH: 0.05,
      FILL_COLOR: "#E3F2FD",
      OPACITY: 1,
      GUSSET_COLOR: "#008000",
      FLAP_COLOR: "#800080"
    }
  }
};

// =============================================
// CORE FUNCTIONS
// =============================================
function calculateLayout(width, height, flap = 0, gusset = 0) {
  let parts = [];
  let currentX = 0;

  if (gusset > 0) {
    parts.push({
      type: 'Flap',
      x: currentX,
      width: gusset,
      height: width,
      color: NORMAL_BAG.STYLES.PLANNING_PREVIEW.GUSSET_COLOR
    });
    currentX += gusset;
  }

  parts.push({
    type: 'Back Panel',
    x: currentX,
    width: height,
    height: width
  });
  currentX += height;

  if (flap > 0) {
    parts.push({
      type: 'Gusset',
      x: currentX,
      width: flap,
      height: width,
      color: NORMAL_BAG.STYLES.PLANNING_PREVIEW.FLAP_COLOR
    });
    currentX += flap;
  }

  parts.push({
    type: 'Front Panel',
    x: currentX,
    width: height,
    height: width
  });

  const totalWidth = currentX + height;
  
  return {
    totalWidth,
    parts,
    width,
    height,
    flap,
    gusset
  };
}

function getSimpleSVG(width, height, flap = 0, gusset = 0) {
  const layout = calculateLayout(width, height, flap, gusset);
  const style = NORMAL_BAG.STYLES.PLANNING_PREVIEW;

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
    
    ${layout.parts.map(part => `
    <!-- ${part.type} -->
    <rect x="${part.x}" y="0"
          width="${part.width}"
          height="${part.height}"
          stroke="${part.color || style.STROKE_COLOR}"
          stroke-width="${style.INTERNAL_LINE_WIDTH * (part.color ? 1.5 : 1)}"
          fill="none"/>
    `).join('')}
    
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

function drawSVG(width = NORMAL_BAG.DEFAULTS.width, 
                height = NORMAL_BAG.DEFAULTS.height, 
                flap = NORMAL_BAG.DEFAULTS.flap, 
                gusset = NORMAL_BAG.DEFAULTS.gusset) {
  
  if (!width || !height) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:${NORMAL_BAG.STYLES.BG_COLOR}">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Width ↑ Enter Length → Enter Gusset/Flap
        </text>
      </svg>
    `;
  }

  const layout = calculateLayout(width, height, flap, gusset);
  const padding = 1.5;
  const titleSpace = 1.2;
  const contentStart = 2.5;
  const footerSpace = 1;
  
  const totalWidth = layout.totalWidth + (2 * padding);
  const viewHeight = width + titleSpace + contentStart + footerSpace;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         width="${totalWidth}cm" 
         height="${viewHeight}cm"
         viewBox="0 0 ${totalWidth} ${viewHeight}"
         style="background-color:${NORMAL_BAG.STYLES.BG_COLOR}; overflow: hidden">
      
      <!-- Background -->
      <rect x="0" y="0" width="${totalWidth}" height="${viewHeight}" 
            fill="${NORMAL_BAG.STYLES.BG_COLOR}" stroke="none"/>
      
      <!-- Title -->
      <text x="${totalWidth/2}" y="${titleSpace}" 
            font-size="${NORMAL_BAG.STYLES.FONT.TITLE}" 
            text-anchor="middle" 
            font-weight="bold" 
            fill="${NORMAL_BAG.STYLES.STROKE_COLOR}">
        Normal Bag
      </text>
      
      <!-- Main Content -->
      <g transform="translate(${padding}, ${contentStart})">
        ${layout.parts.map(part => `
          <rect x="${part.x}" y="0" 
                width="${part.width}" height="${part.height}" 
                fill="${NORMAL_BAG.STYLES.PANEL_COLOR}" 
                stroke="${part.color || NORMAL_BAG.STYLES.STROKE_COLOR}" 
                stroke-width="${NORMAL_BAG.STYLES.STROKE_WIDTH}"/>
          
          <text x="${part.x + part.width/2}" y="${part.height/2}" 
                font-size="${NORMAL_BAG.STYLES.FONT.PANEL}" 
                text-anchor="middle" 
                fill="${NORMAL_BAG.STYLES.LABEL_COLOR}">
            ${part.type}
          </text>
        `).join('')}
        
        <!-- Sealing lines -->
        <line x1="0" y1="${NORMAL_BAG.SEALING_AREA}" 
              x2="${layout.totalWidth}" y2="${NORMAL_BAG.SEALING_AREA}" 
              stroke="${NORMAL_BAG.STYLES.DIMENSION_COLOR}" 
              stroke-width="${NORMAL_BAG.STYLES.STROKE_WIDTH}" 
              stroke-dasharray="0.2,0.1"/>
              
        <line x1="0" y1="${width - NORMAL_BAG.SEALING_AREA}" 
              x2="${layout.totalWidth}" y2="${width - NORMAL_BAG.SEALING_AREA}" 
              stroke="${NORMAL_BAG.STYLES.DIMENSION_COLOR}" 
              stroke-width="${NORMAL_BAG.STYLES.STROKE_WIDTH}" 
              stroke-dasharray="0.2,0.1"/>
      </g>
      
      <!-- Footer -->
      <text x="${totalWidth/2}" y="${viewHeight - 0.5}" 
            font-size="${NORMAL_BAG.STYLES.FONT.TOTAL}" 
            text-anchor="middle" 
            font-weight="bold">
        Total: ${layout.totalWidth.toFixed(1)}cm × ${width.toFixed(1)}cm
        ${gusset > 0 ? ` | Flap: ${gusset.toFixed(1)}cm` : ''}
        ${flap > 0 ? ` | Gusset: ${flap.toFixed(1)}cm` : ''}
      </text>
    </svg>
  `;
}

// =============================================
// PDF GENERATION
// =============================================
async function downloadPDF(width = NORMAL_BAG.DEFAULTS.width, 
                         height = NORMAL_BAG.DEFAULTS.height, 
                         flap = NORMAL_BAG.DEFAULTS.flap, 
                         gusset = NORMAL_BAG.DEFAULTS.gusset) {
  if (!window.jspdf) throw new Error("jsPDF library not loaded");
  const { jsPDF } = window.jspdf;

  const layout = calculateLayout(width, height, flap, gusset);
  const margin = 1.5;
  const pdfWidth = layout.totalWidth + (2 * margin);
  const pdfHeight = width + (2 * margin) + 1;

  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    unit: 'cm',
    format: [pdfWidth, pdfHeight]
  });

  // Title
  pdf.setFontSize(NORMAL_BAG.STYLES.FONT.TITLE * 10);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0, 0, 128);
  pdf.text('Normal Bag', pdfWidth / 2, margin - 0.5, { align: 'center' });

  // Draw parts
  layout.parts.forEach(part => {
    pdf.setDrawColor(0, 0, 255);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(margin + part.x, margin, part.width, part.height, 'FD');
    
    // Label
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(NORMAL_BAG.STYLES.FONT.PANEL * 10);
    pdf.text(part.type, 
            margin + part.x + part.width/2, 
            margin + part.height/2, 
            { align: 'center' });
  });

  // Sealing lines
  pdf.setDrawColor(255, 0, 0);
  pdf.setLineWidth(NORMAL_BAG.STYLES.STROKE_WIDTH);
  pdf.line(margin, margin + NORMAL_BAG.SEALING_AREA, 
           margin + layout.totalWidth, margin + NORMAL_BAG.SEALING_AREA);
  pdf.line(margin, margin + width - NORMAL_BAG.SEALING_AREA, 
           margin + layout.totalWidth, margin + width - NORMAL_BAG.SEALING_AREA);

  // Footer
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(NORMAL_BAG.STYLES.FONT.TOTAL * 10);
  pdf.setFont(undefined, 'bold');
  pdf.text(`Total: ${layout.totalWidth.toFixed(1)}cm × ${width}cm`, 
          pdfWidth / 2, 
          margin + width + 0.8, 
          { align: 'center' });

  pdf.save(`normal-bag-${width}x${height}${gusset > 0 ? '-g'+gusset : ''}${flap > 0 ? '-f'+flap : ''}.pdf`);
  return pdf;
}

// =============================================
// REGISTRATION
// =============================================
(function() {
  const typeName = 'Normal Bag';
  if (window.BagRegistry?.types?.[typeName]) return;
  
  const implementation = {
    drawSVG,
    downloadPDF,
    getSimpleSVG,
    calculateLayout,
    getDimensions: function(width, height, flap = 0, gusset = 0) {
      const layout = calculateLayout(width, height, flap, gusset);
      return {
        width: layout.totalWidth,
        height: width,
        flap,
        gusset,
        frontPanelWidth: height,
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