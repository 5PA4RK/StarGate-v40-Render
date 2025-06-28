// js/flatBottom.js - Flat Bottom Bag Implementation
// =============================================
// CONSTANTS
// =============================================
const FLAT_BOTTOM = {
  FLAP_WIDTH: 0.6, // 6mm
  EXTENSION: 1.4, // 14mm for front/back/bottom
  SIDE_EXTENSION: 1.2, // 12mm for sides
  DEFAULTS: {
    WIDTH: 10,
    HEIGHT: 15,
    GUSSET: 3
  },

  STYLES: {
    PANEL_COLOR: "#FFFFFF",
    STROKE_COLOR: "#0000FF",
    STROKE_WIDTH: 0.05,
    INNER_STROKE_COLOR: "#00FF00",
    
    FONT: {
      TITLE: 1.5,
      PANEL: 1.0,
      DIMENSIONS: 0.8,
      TOTAL: 1.2
    },
    BG_COLOR: "#F8F8F8",
    LABEL_COLOR: "#008000",
    DIMENSION_COLOR: "#FF0000"
  }
  
};

// =============================================
// CORE FUNCTIONS
// =============================================
function calculateFlatBottomLayout(height, width, gusset) {
  const innerBack = { width: width, height: height };
  const outerBack = { width: width + FLAT_BOTTOM.EXTENSION, height: height + FLAT_BOTTOM.FLAP_WIDTH };

  const innerFront = { width: width, height: height };
  const outerFront = { width: width + FLAT_BOTTOM.EXTENSION, height: height + FLAT_BOTTOM.FLAP_WIDTH };

  let parts = [];

  // Back panel
  parts.push({ 
    type: 'Back Outer', 
    x: 0, 
    width: outerBack.width, 
    height: outerBack.height,
    innerX: (FLAT_BOTTOM.EXTENSION / 2),
    innerWidth: innerBack.width,
    innerHeight: innerBack.height
  });
  
  // Front panel
  const frontX = outerBack.width;
  parts.push({ 
    type: 'Front Outer', 
    x: frontX, 
    width: outerFront.width, 
    height: outerFront.height,
    innerX: frontX + (FLAT_BOTTOM.EXTENSION / 2),
    innerWidth: innerFront.width,
    innerHeight: innerFront.height
  });

  if (gusset > 0) {
    const innerBottom = { width: gusset, height: height };
    const outerBottom = { width: gusset + FLAT_BOTTOM.EXTENSION, height: height + FLAT_BOTTOM.FLAP_WIDTH };
    const bottomX = frontX + outerFront.width;

    parts.push({ 
      type: 'Bottom Outer', 
      x: bottomX, 
      width: outerBottom.width, 
      height: outerBottom.height,
      innerX: bottomX + (FLAT_BOTTOM.EXTENSION / 2),
      innerWidth: innerBottom.width,
      innerHeight: innerBottom.height
    });
  }

  const totalWidth = parts[parts.length - 1].x + parts[parts.length - 1].width;
  return { parts, totalWidth };
}

function drawFlatBottomSVG(height = FLAT_BOTTOM.DEFAULTS.HEIGHT,
                         width = FLAT_BOTTOM.DEFAULTS.WIDTH,
                         gusset = FLAT_BOTTOM.DEFAULTS.GUSSET) {
  
  if (!height || !width) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:${FLAT_BOTTOM.STYLES.BG_COLOR}">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Height ↑ Enter Width → Enter Gusset
        </text>
      </svg>
    `;
  }

  const layout = calculateFlatBottomLayout(height, width, gusset);
  const padding = 1.5;
  const sidePanelsWidth = gusset > 0 ? (gusset * 2 + FLAT_BOTTOM.SIDE_EXTENSION * 2) : 0;
  const totalContentWidth = layout.totalWidth + sidePanelsWidth;
  const viewWidth = totalContentWidth + (2 * padding);
  const viewHeight = height + 4 + (gusset > 0 ? width + FLAT_BOTTOM.FLAP_WIDTH : 0);
  
  // Calculate center offset to center the entire bag
  const centerOffset = (viewWidth - totalContentWidth) / 2;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${viewWidth} ${viewHeight}"
         style="background-color:${FLAT_BOTTOM.STYLES.BG_COLOR}; shape-rendering: crispEdges">
      
      <text x="${viewWidth / 2}" y="1.2" 
            font-size="${FLAT_BOTTOM.STYLES.FONT.TITLE}" 
            text-anchor="middle"
            font-weight="bold"
            fill="${FLAT_BOTTOM.STYLES.LABEL_COLOR}">
        Flat Bottom Bag
      </text>
      
      <g transform="translate(${centerOffset}, 2.5)">
        <!-- Main Panels -->
        ${layout.parts.map(part => `
          <rect x="${part.x}" y="0" 
                width="${part.width}" height="${part.height}" 
                fill="${FLAT_BOTTOM.STYLES.PANEL_COLOR}" 
                stroke="${FLAT_BOTTOM.STYLES.STROKE_COLOR}" 
                stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
          
          <rect x="${part.innerX}" y="${FLAT_BOTTOM.FLAP_WIDTH / 2}" 
                width="${part.innerWidth}" height="${part.innerHeight}" 
                fill="${FLAT_BOTTOM.STYLES.PANEL_COLOR}" 
                stroke="${FLAT_BOTTOM.STYLES.INNER_STROKE_COLOR}" 
                stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
          
          <text x="${part.x + part.width / 2}" y="${part.height / 2 - 0.4}" 
                font-size="${FLAT_BOTTOM.STYLES.FONT.PANEL}" 
                text-anchor="middle"
                font-weight="bold"
                fill="${FLAT_BOTTOM.STYLES.LABEL_COLOR}">
            ${part.type.replace(' Outer', '')}
          </text>
          <text x="${part.x + part.width / 2}" y="${part.height / 2 + 0.4}" 
                font-size="${FLAT_BOTTOM.STYLES.FONT.DIMENSIONS}" 
                text-anchor="middle"
                fill="${FLAT_BOTTOM.STYLES.DIMENSION_COLOR}">
            ${part.innerWidth.toFixed(1)}cm × ${part.innerHeight.toFixed(1)}cm
          </text>
        `).join('')}
        
        ${gusset > 0 ? `
          <!-- Side Panels Group -->
          <g transform="translate(${layout.totalWidth}, 0)">
            <!-- Side 1 -->
            <rect x="0" y="0" 
                  width="${gusset + FLAT_BOTTOM.SIDE_EXTENSION}" 
                  height="${width + FLAT_BOTTOM.FLAP_WIDTH}" 
                  fill="${FLAT_BOTTOM.STYLES.PANEL_COLOR}" 
                  stroke="${FLAT_BOTTOM.STYLES.STROKE_COLOR}" 
                  stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
            
            <rect x="${FLAT_BOTTOM.SIDE_EXTENSION / 2}" y="${FLAT_BOTTOM.FLAP_WIDTH / 2}" 
                  width="${gusset}" height="${width}" 
                  fill="rgba(255, 255, 255, 0.5)" 
                  stroke="${FLAT_BOTTOM.STYLES.STROKE_COLOR}" 
                  stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
            
            <text x="${gusset / 2 + FLAT_BOTTOM.SIDE_EXTENSION / 2}" 
                  y="${width / 2 + FLAT_BOTTOM.FLAP_WIDTH / 2 - 0.4}" 
                  font-size="${FLAT_BOTTOM.STYLES.FONT.PANEL}" 
                  text-anchor="middle"
                  font-weight="bold"
                  fill="${FLAT_BOTTOM.STYLES.LABEL_COLOR}">
              Side 1
            </text>
            <text x="${gusset / 2 + FLAT_BOTTOM.SIDE_EXTENSION / 2}" 
                  y="${width / 2 + FLAT_BOTTOM.FLAP_WIDTH / 2 + 0.4}" 
                  font-size="${FLAT_BOTTOM.STYLES.FONT.DIMENSIONS}" 
                  text-anchor="middle"
                  fill="${FLAT_BOTTOM.STYLES.DIMENSION_COLOR}">
              ${gusset.toFixed(1)}cm × ${width.toFixed(1)}cm
            </text>
            
            <!-- Side 2 -->
            <rect x="${gusset + FLAT_BOTTOM.SIDE_EXTENSION}" y="0" 
                  width="${gusset + FLAT_BOTTOM.SIDE_EXTENSION}" 
                  height="${width + FLAT_BOTTOM.FLAP_WIDTH}" 
                  fill="${FLAT_BOTTOM.STYLES.PANEL_COLOR}" 
                  stroke="${FLAT_BOTTOM.STYLES.STROKE_COLOR}" 
                  stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
            
            <rect x="${gusset + FLAT_BOTTOM.SIDE_EXTENSION * 1.5}" y="${FLAT_BOTTOM.FLAP_WIDTH / 2}" 
                  width="${gusset}" height="${width}" 
                  fill="rgba(255, 255, 255, 0.5)" 
                  stroke="${FLAT_BOTTOM.STYLES.STROKE_COLOR}" 
                  stroke-width="${FLAT_BOTTOM.STYLES.STROKE_WIDTH}"/>
            
            <text x="${gusset * 1.5 + FLAT_BOTTOM.SIDE_EXTENSION * 1.5}" 
                  y="${width / 2 + FLAT_BOTTOM.FLAP_WIDTH / 2 - 0.4}" 
                  font-size="${FLAT_BOTTOM.STYLES.FONT.PANEL}" 
                  text-anchor="middle"
                  font-weight="bold"
                  fill="${FLAT_BOTTOM.STYLES.LABEL_COLOR}">
              Side 2
            </text>
            <text x="${gusset * 1.5 + FLAT_BOTTOM.SIDE_EXTENSION * 1.5}" 
                  y="${width / 2 + FLAT_BOTTOM.FLAP_WIDTH / 2 + 0.4}" 
                  font-size="${FLAT_BOTTOM.STYLES.FONT.DIMENSIONS}" 
                  text-anchor="middle"
                  fill="${FLAT_BOTTOM.STYLES.DIMENSION_COLOR}">
              ${gusset.toFixed(1)}cm × ${width.toFixed(1)}cm
            </text>
          </g>
        ` : ''}
      </g>
      
      <!-- Total Dimensions -->
      <text x="${viewWidth / 2}" y="${viewHeight - 2.5}" 
            font-size="${FLAT_BOTTOM.STYLES.FONT.TOTAL}" 
            text-anchor="middle"
            font-weight="bold">
        Front/Back/Bottom: ${layout.totalWidth.toFixed(1)}cm × ${(height + FLAT_BOTTOM.FLAP_WIDTH).toFixed(1)}cm
      </text>
      ${gusset > 0 ? `
        <text x="${viewWidth / 2}" y="${viewHeight - 1}" 
              font-size="${FLAT_BOTTOM.STYLES.FONT.TOTAL}" 
              text-anchor="middle"
              font-weight="bold">
          Sides: ${(gusset * 2 + FLAT_BOTTOM.SIDE_EXTENSION * 2).toFixed(1)}cm × ${(width + FLAT_BOTTOM.FLAP_WIDTH).toFixed(1)}cm
        </text>
      ` : ''}
    </svg>
  `;
}

async function generateFlatBottomPDF(height = FLAT_BOTTOM.DEFAULTS.HEIGHT, 
                                  width = FLAT_BOTTOM.DEFAULTS.WIDTH, 
                                  gusset = FLAT_BOTTOM.DEFAULTS.GUSSET) {
  try {
    if (!window.jspdf) throw new Error("jsPDF library not loaded");
    
    const { jsPDF } = window.jspdf;
    const layout = calculateFlatBottomLayout(height, width, gusset);
    const sidePanelsWidth = gusset > 0 ? (gusset * 2 + FLAT_BOTTOM.SIDE_EXTENSION * 2) : 0;
    const totalContentWidth = layout.totalWidth + sidePanelsWidth;
    const margin = 1.5;
    const docWidth = totalContentWidth + (2 * margin);
    const docHeight = height + (2 * margin) + 3 + (gusset > 0 ? width + FLAT_BOTTOM.FLAP_WIDTH : 0);
    
    // Calculate center offset
    const centerOffset = (docWidth - totalContentWidth) / 2;

    const pdf = new jsPDF({
      orientation: docWidth > docHeight ? 'landscape' : 'portrait',
      unit: 'cm',
      format: [docWidth, docHeight]
    });

    pdf.setLineWidth(FLAT_BOTTOM.STYLES.STROKE_WIDTH);
    pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.TITLE * 33);
    pdf.setFont(undefined, 'bold');
    pdf.text('Flat Bottom Bag', docWidth / 2, margin - 0.3, { align: 'center' });

    // Draw main panels
    layout.parts.forEach(part => {
      pdf.setDrawColor(0, 0, 255);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(centerOffset + part.x, margin, part.width, part.height, 'FD');
      
      pdf.setDrawColor(0, 255, 0);
      pdf.rect(centerOffset + part.innerX, margin + FLAT_BOTTOM.FLAP_WIDTH / 2, part.innerWidth, part.innerHeight, 'FD');
      
      pdf.setTextColor(0, 128, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.PANEL * 22);
      pdf.text(part.type.replace(' Outer', ''), 
              centerOffset + part.x + part.width / 2, 
              margin + part.height / 2 - 0.3, 
              { align: 'center' });
      
      pdf.setTextColor(255, 0, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.DIMENSIONS * 15);
      pdf.text(`${part.innerWidth.toFixed(1)}cm × ${part.innerHeight.toFixed(1)}cm`, 
              centerOffset + part.x + part.width / 2, 
              margin + part.height / 2 + 0.3, 
              { align: 'center' });
    });

    if (gusset > 0) {
      const sideStartX = centerOffset + layout.totalWidth;
      
      // Side 1
      pdf.setDrawColor(0, 0, 0);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(sideStartX, margin, gusset + FLAT_BOTTOM.SIDE_EXTENSION, width + FLAT_BOTTOM.FLAP_WIDTH, 'FD');
      
      pdf.setDrawColor(0, 128, 0);
      pdf.setFillColor(0, 0, 0, 0.5);
      pdf.rect(sideStartX + FLAT_BOTTOM.SIDE_EXTENSION / 2, margin + FLAT_BOTTOM.FLAP_WIDTH / 2, gusset, width, 'FD');
      
      pdf.setTextColor(0, 128, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.PANEL * 22);
      pdf.text('Side 1', 
              sideStartX + (gusset + FLAT_BOTTOM.SIDE_EXTENSION) / 2, 
              margin + (width + FLAT_BOTTOM.FLAP_WIDTH) / 2 - 0.3, 
              { align: 'center' });
      
      pdf.setTextColor(255, 0, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.DIMENSIONS * 15);
      pdf.text(`${gusset.toFixed(1)}cm × ${width.toFixed(1)}cm`, 
              sideStartX + (gusset + FLAT_BOTTOM.SIDE_EXTENSION) / 2, 
              margin + (width + FLAT_BOTTOM.FLAP_WIDTH) / 2 + 0.3, 
              { align: 'center' });
      
      // Side 2
      const side2X = sideStartX + gusset + FLAT_BOTTOM.SIDE_EXTENSION;
      pdf.setDrawColor(0, 0, 0);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(side2X, margin, gusset + FLAT_BOTTOM.SIDE_EXTENSION, width + FLAT_BOTTOM.FLAP_WIDTH, 'FD');
      
      pdf.setDrawColor(0, 128, 0);
      pdf.setFillColor(0, 0, 0, 0.5);
      pdf.rect(side2X + FLAT_BOTTOM.SIDE_EXTENSION / 2, margin + FLAT_BOTTOM.FLAP_WIDTH / 2, gusset, width, 'FD');
      
      pdf.setTextColor(0, 128, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.PANEL * 22);
      pdf.text('Side 2', 
              side2X + (gusset + FLAT_BOTTOM.SIDE_EXTENSION) / 2, 
              margin + (width + FLAT_BOTTOM.FLAP_WIDTH) / 2 - 0.3, 
              { align: 'center' });
      
      pdf.setTextColor(255, 0, 0);
      pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.DIMENSIONS * 15);
      pdf.text(`${gusset.toFixed(1)}cm × ${width.toFixed(1)}cm`, 
              side2X + (gusset + FLAT_BOTTOM.SIDE_EXTENSION) / 2, 
              margin + (width + FLAT_BOTTOM.FLAP_WIDTH) / 2 + 0.3, 
              { align: 'center' });
    }

    // Total Dimensions
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(FLAT_BOTTOM.STYLES.FONT.TOTAL * 33);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Front/Back/Bottom: ${layout.totalWidth.toFixed(1)}cm × ${(height + FLAT_BOTTOM.FLAP_WIDTH).toFixed(1)}cm`,  
              docWidth / 2, 
              margin + height + 0.5 + (gusset > 0 ? width + FLAT_BOTTOM.FLAP_WIDTH : 0) - 1.5,  
              { align: 'center' });
    
    if (gusset > 0) {
      pdf.text(`Sides: ${(gusset * 2 + FLAT_BOTTOM.SIDE_EXTENSION * 2).toFixed(1)}cm × ${(width + FLAT_BOTTOM.FLAP_WIDTH).toFixed(1)}cm`,  
                docWidth / 2, 
                margin + height + 0.5 + (gusset > 0 ? width + FLAT_BOTTOM.FLAP_WIDTH : 0),  
                { align: 'center' });
    }

    pdf.save(`flat-bottom-bag-${height}x${width}-gusset${gusset}.pdf`);
    return pdf;
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}

(function() {
  const typeName = 'Flat Bottom';
  if (window.BagRegistry?.types?.[typeName]) return;
  
  const implementation = {
    drawSVG: drawFlatBottomSVG,
    downloadPDF: generateFlatBottomPDF
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