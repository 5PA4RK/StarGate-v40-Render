// js/Roll.js - Isolated Implementation
// =============================================
// PRIVATE CONSTANTS
// =============================================
const ROLL_CONFIG = {
  RADIUS: 2, // cm radius of the roll
  CURVE_ANGLE: 90, // degrees for curves
  OVERLAP: 0.3, // cm of circle overlap
  TEXT_SPACING: 1.2, // Space for text
  STYLES: {
      CIRCLE_COLOR: '#808080', // Grey
      BAG_COLOR: '#D3D3D3', // Light grey
      STROKE_COLOR: '#0000FF', // Blue
      STROKE_WIDTH: 0.05,
      FONT: {
          SIZE: 1,
          COLOR: '#000000', // Black
          WEIGHT: 'bold'
      }
  }
};

// =============================================
// CORE IMPLEMENTATION (Private)
// =============================================
function calculateDimensions(width, height) {
  return {
      totalWidth: width + ROLL_CONFIG.RADIUS * 2,
      totalHeight: height + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING,
      centerX: (width + ROLL_CONFIG.RADIUS * 2) / 2,
      centerY: height / 2 + ROLL_CONFIG.RADIUS
  };
}

function generateBagPath(width, height) {
  const r = ROLL_CONFIG.RADIUS;
  const angleRad = (ROLL_CONFIG.CURVE_ANGLE * Math.PI) / 180;
  
  return `
      M${r + ROLL_CONFIG.OVERLAP},${r}
      L${r + ROLL_CONFIG.OVERLAP},${height + r}
      L${width + r},${height + r}
      L${width + r},${r}
      A${r},${r} 0 0 0 ${width + r * Math.cos(angleRad)},${r * (1 - Math.sin(angleRad))}
      L${width + r},0
      L${r * (1 - Math.cos(angleRad))},0
      A${r},${r} 0 0 1 ${r + ROLL_CONFIG.OVERLAP},${r}
      Z
  `;
}

function drawSVG(width = 10, height = 15) {
  if (width <= 0 || height <= 0) {
      return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
               style="background-color:#f8f8f8">
              <text x="50%" y="50%" font-size="1.2" text-anchor="middle"
                    dominant-baseline="middle" fill="#333">
                  ${width <= 0 ? '← Enter Width' : ''}
                  ${height <= 0 ? '↑ Enter Height' : ''}
              </text>
          </svg>
      `;
  }

  const dims = calculateDimensions(width, height);
  const pathData = generateBagPath(width, height);

  return `
      <svg xmlns="http://www.w3.org/2000/svg" 
           viewBox="0 0 ${dims.totalWidth} ${dims.totalHeight}"
           style="background-color:#f8f8f8;shape-rendering:crispEdges">
          
          <!-- Main bag shape -->
          <path d="${pathData}"
                fill="${ROLL_CONFIG.STYLES.BAG_COLOR}"
                stroke="${ROLL_CONFIG.STYLES.STROKE_COLOR}"
                stroke-width="${ROLL_CONFIG.STYLES.STROKE_WIDTH}"/>
          
          <!-- Left roll circle -->
          <circle cx="${ROLL_CONFIG.RADIUS + ROLL_CONFIG.OVERLAP}" 
                  cy="${ROLL_CONFIG.RADIUS}" 
                  r="${ROLL_CONFIG.RADIUS}"
                  fill="${ROLL_CONFIG.STYLES.CIRCLE_COLOR}"
                  stroke="${ROLL_CONFIG.STYLES.STROKE_COLOR}"
                  stroke-width="${ROLL_CONFIG.STYLES.STROKE_WIDTH}"/>
          
          <!-- Width Text -->
          <text x="${dims.centerX}" 
                y="${height + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING * 0.7}"
                font-size="${ROLL_CONFIG.STYLES.FONT.SIZE}"
                text-anchor="middle"
                fill="${ROLL_CONFIG.STYLES.FONT.COLOR}"
                font-weight="${ROLL_CONFIG.STYLES.FONT.WEIGHT}">
              Width: ${width.toFixed(1)} cm
          </text>
          
          <!-- Height Text -->
          <text x="${width + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING * 0.3}"
                y="${ROLL_CONFIG.RADIUS + height/2}"
                font-size="${ROLL_CONFIG.STYLES.FONT.SIZE}"
                text-anchor="middle"
                fill="${ROLL_CONFIG.STYLES.FONT.COLOR}"
                font-weight="${ROLL_CONFIG.STYLES.FONT.WEIGHT}"
                transform="rotate(90, ${width + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING * 0.3}, ${ROLL_CONFIG.RADIUS + height/2})">
              Height: ${height.toFixed(1)} cm
          </text>
      </svg>
  `;
}

async function downloadPDF(width = 10, height = 15) {
  if (!window.jspdf) throw new Error("jsPDF library not loaded");
  const { jsPDF } = window.jspdf;

  const dims = calculateDimensions(width, height);
  const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'cm',
      format: [dims.totalWidth, dims.totalHeight]
  });

  // Convert colors to RGB
  function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
  }

  // Draw main bag shape
  pdf.setFillColor(...hexToRgb(ROLL_CONFIG.STYLES.BAG_COLOR));
  pdf.setDrawColor(...hexToRgb(ROLL_CONFIG.STYLES.STROKE_COLOR));
  pdf.setLineWidth(ROLL_CONFIG.STYLES.STROKE_WIDTH);
  
  // Draw left roll circle
  pdf.setFillColor(...hexToRgb(ROLL_CONFIG.STYLES.CIRCLE_COLOR));
  pdf.circle(
      ROLL_CONFIG.RADIUS + ROLL_CONFIG.OVERLAP,
      ROLL_CONFIG.RADIUS,
      ROLL_CONFIG.RADIUS,
      'FD'
  );

  // Add dimensions text
  pdf.setTextColor(...hexToRgb(ROLL_CONFIG.STYLES.FONT.COLOR));
  pdf.setFontSize(ROLL_CONFIG.STYLES.FONT.SIZE * 10);
  pdf.setFont(undefined, ROLL_CONFIG.STYLES.FONT.WEIGHT);
  
  // Width text
  pdf.text(
      `Width: ${width.toFixed(1)} cm`,
      dims.centerX,
      height + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING * 0.7,
      { align: 'center' }
  );
  
  // Height text
  pdf.textWithRotation(
      `Height: ${height.toFixed(1)} cm`,
      width + ROLL_CONFIG.RADIUS + ROLL_CONFIG.TEXT_SPACING * 0.3,
      ROLL_CONFIG.RADIUS + height/2,
      90,
      'center'
  );

  pdf.save(`roll-bag-${width.toFixed(1)}x${height.toFixed(1)}.pdf`);
}

// =============================================
// ISOLATED REGISTRATION
// =============================================
(function() {
  const typeName = 'Roll'; // Must match exactly
  
  // Skip if already registered
  if (window.BagRegistry?.types?.[typeName]) {
      console.log(`${typeName} already registered`);
      return;
  }
  
  // Create implementation object
  const implementation = {
      drawSVG: function(width, height) {
          return drawSVG(width, height);
      },
      downloadPDF: function(width, height) {
          return downloadPDF(width, height);
      }
  };

  // Register with queue system if needed
  if (typeof window.BagRegistry !== 'undefined') {
      window.BagRegistry.register(typeName, implementation);
      console.log(`Successfully registered ${typeName}`);
  } else {
      window._bagRegistrationQueue = window._bagRegistrationQueue || [];
      if (!window._bagRegistrationQueue.some(x => x.typeName === typeName)) {
          window._bagRegistrationQueue.push({
              typeName: typeName,
              implementation: implementation
          });
          console.log(`Queued ${typeName} for registration`);
      }
  }
})();