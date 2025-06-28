// js/chickenBag.js - Final Corrected Version with Eyemark
// =============================================
// CONSTANTS
// =============================================
const CHICKEN_BAG = {
  DEFAULTS: {
    WIDTH: 10,    // Vertical height in cm (exact)
    HEIGHT: 15,   // Horizontal length in cm
    FLAP: 3       // Flap width in cm
  },
  STYLES: {
    PANEL_COLOR: "#FFFFFF",
    STROKE_COLOR: "#0000FF",
    STROKE_WIDTH: 0.05, // in cm
    INNER_STROKE_COLOR: "#D3D3D3",
    INNER_STROKE_OFFSET: 0.5, // 0.5cm from outer edge
    MIRROR_LINE_COLOR: "#FF0000",
    MIRROR_LINE_WIDTH: 0.05,
    MIRROR_LINE_HEIGHT: 7.7, // Fixed height in cm
    ANCHOR_COLOR: "#FF0000",
    ANCHOR_RADIUS: 0.1,
    MIN_OVERLAP: 0.5, // minimum overlap in cm
    FLAP_COLOR: "#FFFFFF",
    FLAP_STROKE_COLOR: "#0000FF",
    LABEL_COLOR: "#008000",
    DIMENSION_COLOR: "#FF0000",
    TITLE_COLOR: "#000080",
    EYEMARK_COLOR: "#0000FF",
    EYEMARK_WIDTH: 1.5,
    EYEMARK_HEIGHT: 0.5,
    PLANNING_PREVIEW: {
      SCALE: 0.5, // Scale down for planning view
      STROKE_COLOR: "#FF0000", // Red outline
      OUTLINE_WIDTH: 0.6, // Thicker outline
      INTERNAL_LINE_WIDTH: 0.05, // Thinner internal lines
      FILL_COLOR: "#E3F2FD",
      OPACITY: 1,
      MIRROR_LINE_COLOR: "#FF0000", // Keep mirror line color consistent
      EYEMARK_COLOR: "#0000FF" // Keep eyemark color consistent
    }
  }
};

// =============================================
// CORE FUNCTION - CORRECTED VERSION
// =============================================
function createPreciseHeightTubeSVG(width, height, flap) {
  const radius = width / 2;
  const padding = 1.5;
  const mirrorChordLength = CHICKEN_BAG.STYLES.MIRROR_LINE_HEIGHT;
  const innerOffset = CHICKEN_BAG.STYLES.INNER_STROKE_OFFSET;

  // Calculate overlap
  const chordOffset = Math.sqrt(radius * radius - Math.pow(mirrorChordLength / 2, 2));
  const calculatedOverlap = radius - chordOffset;
  const overlap = Math.max(calculatedOverlap, CHICKEN_BAG.STYLES.MIN_OVERLAP);

  // Correct dimensions
  const totalWidth = height + height + (flap || 0);
  const viewBoxWidth = totalWidth + (2 * padding);
  const viewBoxHeight = width + (2 * padding) + 2;

  // Positioning
  const centerX = padding + (height - overlap/2) + (flap || 0);
  const centerY = padding + 1;

  // Mirror line position
  const mirrorLineYStart = (width - mirrorChordLength) / 2;
  const mirrorLineYEnd = mirrorLineYStart + mirrorChordLength;

  // Calculate inner radius for proper 5mm offset on curves
  const innerRadius = radius - innerOffset;
  const frontCurveStartX = radius - (overlap+0.5);
  const backCurveStartX = -radius + (overlap+0.5);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         width="${viewBoxWidth}cm" 
         height="${viewBoxHeight}cm"
         viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}"
         style="background-color:#F8F8F8; max-width: 100%; overflow: hidden">
      
      <!-- Bag Title -->
      <text x="${viewBoxWidth/2}" y="1" 
            font-size="1" 
            text-anchor="middle"
            font-weight="bold"
            fill="${CHICKEN_BAG.STYLES.TITLE_COLOR}">
        Chicken Bag (${CHICKEN_BAG.STYLES.MIRROR_LINE_HEIGHT}cm Bottom)
      </text>
      
      <g transform="translate(${centerX}, ${centerY})">
        <!-- Front Panel -->
        <path d="
          M ${radius - overlap},0
          L ${height},0
          L ${height},${width}
          L ${radius - overlap},${width}
          A ${radius} ${radius} 0 0 1 ${radius - overlap},0
          Z" 
          fill="${CHICKEN_BAG.STYLES.PANEL_COLOR}" 
          stroke="${CHICKEN_BAG.STYLES.STROKE_COLOR}" 
          stroke-width="${CHICKEN_BAG.STYLES.STROKE_WIDTH}"/>
        
        <!-- Corrected Front Inner Stroke with perfect 5mm gap -->
        <path d="
          M ${frontCurveStartX + (radius - innerRadius)},${innerOffset}
          L ${height - innerOffset},${innerOffset}
          L ${height - innerOffset},${width - innerOffset}
          L ${frontCurveStartX + (radius - innerRadius)},${width - innerOffset}
          A ${innerRadius} ${innerRadius} 0 0 1 ${frontCurveStartX + (radius - innerRadius)},${innerOffset}
          Z" 
          fill="none" 
          stroke="${CHICKEN_BAG.STYLES.INNER_STROKE_COLOR}" 
          stroke-width="${CHICKEN_BAG.STYLES.STROKE_WIDTH}"/>
        
        <!-- Front Label -->
        <text x="${height/2}" y="${width/2}" 
              font-size="0.8" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.LABEL_COLOR}">
          Front
        </text>
        <text x="${height/2}" y="${width/2 + 0.7}" 
              font-size="0.7" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.DIMENSION_COLOR}">
          ${height.toFixed(1)}cm × ${width.toFixed(1)}cm
        </text>
        
        <!-- Back Panel -->
        <path d="
          M ${-radius + overlap},0
          L ${-height},0
          L ${-height},${width}
          L ${-radius + overlap},${width}
          A ${radius} ${radius} 0 0 0 ${-radius + overlap},0
          Z" 
          fill="${CHICKEN_BAG.STYLES.PANEL_COLOR}" 
          stroke="${CHICKEN_BAG.STYLES.STROKE_COLOR}" 
          stroke-width="${CHICKEN_BAG.STYLES.STROKE_WIDTH}"/>
        
        <!-- Corrected Back Inner Stroke -->
        <path d="
          M ${backCurveStartX - innerOffset},${innerOffset}
          L ${-height + innerOffset},${innerOffset}
          L ${-height + innerOffset},${width - innerOffset}
          L ${backCurveStartX - innerOffset},${width - innerOffset}
          A ${innerRadius} ${innerRadius} 0 0 0 ${backCurveStartX - innerOffset},${innerOffset}
          Z" 
          fill="none" 
          stroke="${CHICKEN_BAG.STYLES.INNER_STROKE_COLOR}" 
          stroke-width="${CHICKEN_BAG.STYLES.STROKE_WIDTH}"/>
        
        <!-- Back Label -->
        <text x="${-height/2}" y="${width/2}" 
              font-size="0.8" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.LABEL_COLOR}">
          Back
        </text>
        <text x="${-height/2}" y="${width/2 + 0.7}" 
              font-size="0.7" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.DIMENSION_COLOR}">
          ${height.toFixed(1)}cm × ${width.toFixed(1)}cm
        </text>
        
        ${flap ? `
        <!-- Flap -->
        <rect x="${-height - flap}" y="0" 
              width="${flap}" height="${width}"
              fill="${CHICKEN_BAG.STYLES.FLAP_COLOR}"
              stroke="${CHICKEN_BAG.STYLES.FLAP_STROKE_COLOR}"
              stroke-width="${CHICKEN_BAG.STYLES.STROKE_WIDTH}"/>
        
        <!-- Flap Label -->
        <text x="${-height - flap/2}" y="${width/2}" 
              font-size="0.8" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.LABEL_COLOR}">
          Flap
        </text>
        <text x="${-height - flap/2}" y="${width/2 + 0.7}" 
              font-size="0.7" text-anchor="middle"
              fill="${CHICKEN_BAG.STYLES.DIMENSION_COLOR}">
          ${flap.toFixed(1)}cm × ${width.toFixed(1)}cm
        </text>

        <!-- Eyemark on Flap (lower right corner) -->
        <rect x="${-height - 2}" 
              y="${width - CHICKEN_BAG.STYLES.EYEMARK_HEIGHT - 0.5}" 
              width="${CHICKEN_BAG.STYLES.EYEMARK_WIDTH}" 
              height="${CHICKEN_BAG.STYLES.EYEMARK_HEIGHT}"
              fill="${CHICKEN_BAG.STYLES.EYEMARK_COLOR}"/>
        ` : ''}
        
        <!-- Mirror Line -->
        <line x1="0" y1="${mirrorLineYStart}" 
              x2="0" y2="${mirrorLineYEnd}" 
              stroke="${CHICKEN_BAG.STYLES.MIRROR_LINE_COLOR}" 
              stroke-width="${CHICKEN_BAG.STYLES.MIRROR_LINE_WIDTH}"/>
        
        <!-- Anchor Dots -->
        <circle cx="0" cy="${mirrorLineYStart}" 
                r="${CHICKEN_BAG.STYLES.ANCHOR_RADIUS}" 
                fill="${CHICKEN_BAG.STYLES.ANCHOR_COLOR}"/>
        <circle cx="0" cy="${mirrorLineYEnd}" 
                r="${CHICKEN_BAG.STYLES.ANCHOR_RADIUS}" 
                fill="${CHICKEN_BAG.STYLES.ANCHOR_COLOR}"/>
      </g>
      
      <!-- Total Dimensions -->
      <text x="${viewBoxWidth/2}" y="${viewBoxHeight - 0.5}" 
            font-size="0.9" 
            text-anchor="middle"
            font-weight="bold">
        Total: ${totalWidth.toFixed(1)}cm × ${width.toFixed(1)}cm
      </text>
    </svg>
  `;
}

// =============================================
// SIMPLIFIED SVG FOR PLANNING PREVIEW
// =============================================
function getSimpleChickenBagSVG(width, height, flap) {
  const radius = width / 2;
  const mirrorChordLength = CHICKEN_BAG.STYLES.MIRROR_LINE_HEIGHT;
  
  // Calculate overlap
  const chordOffset = Math.sqrt(radius * radius - Math.pow(mirrorChordLength / 2, 2));
  const calculatedOverlap = radius - chordOffset;
  const overlap = Math.max(calculatedOverlap, CHICKEN_BAG.STYLES.MIN_OVERLAP);
  
  const totalWidth = height + height + (flap || 0);
  const style = CHICKEN_BAG.STYLES.PLANNING_PREVIEW;
  
  // Mirror line position
  const mirrorLineYStart = (width - mirrorChordLength) / 2;
  const mirrorLineYEnd = mirrorLineYStart + mirrorChordLength;

  return `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 ${totalWidth} ${width}"
         width="${totalWidth}"
         height="${width}">
      
      <!-- Main Outline -->
      <rect x="0" y="0"
            width="${totalWidth}"
            height="${width}"
            stroke="${style.STROKE_COLOR}"
            stroke-width="${style.OUTLINE_WIDTH}"
            fill="${style.FILL_COLOR}"
            fill-opacity="${style.OPACITY}"/>
      
      <!-- Front Panel -->
      <rect x="0" y="0"
            width="${height}"
            height="${width}"
            stroke="#333"
            stroke-width="${style.INTERNAL_LINE_WIDTH}"
            fill="none"/>
      
      <!-- Back Panel -->
      <rect x="${height}" y="0"
            width="${height}"
            height="${width}"
            stroke="#333"
            stroke-width="${style.INTERNAL_LINE_WIDTH}"
            fill="none"/>
      
      ${flap ? `
      <!-- Flap -->
      <rect x="${2 * height}" y="0"
            width="${flap}"
            height="${width}"
            stroke="#333"
            stroke-width="${style.INTERNAL_LINE_WIDTH}"
            fill="none"/>
      
      <!-- Eyemark on Flap -->
      <rect x="${2 * height + 0.5}" 
            y="${width - CHICKEN_BAG.STYLES.EYEMARK_HEIGHT - 0.5}" 
            width="${CHICKEN_BAG.STYLES.EYEMARK_WIDTH}" 
            height="${CHICKEN_BAG.STYLES.EYEMARK_HEIGHT}"
            fill="${style.EYEMARK_COLOR}"/>
      ` : ''}
      
      <!-- Mirror Line -->
      <line x1="${height}" y1="${mirrorLineYStart}" 
            x2="${height}" y2="${mirrorLineYEnd}" 
            stroke="${style.MIRROR_LINE_COLOR}" 
            stroke-width="${style.INTERNAL_LINE_WIDTH * 1.5}"/>
      
      <!-- Cross (X) Mark -->
      <line x1="0" y1="0"
            x2="${totalWidth}" y2="${width}"
            stroke="#FF0000"
            stroke-width="${style.INTERNAL_LINE_WIDTH}"
            stroke-opacity="0.7"/>
            
      <line x1="0" y1="${width}"
            x2="${totalWidth}" y2="0"
            stroke="#FF0000"
            stroke-width="${style.INTERNAL_LINE_WIDTH}"
            stroke-opacity="0.7"/>
    </svg>`;
}

// =============================================
// DRAW FUNCTION
// =============================================
function drawChickenBagSVG(width = CHICKEN_BAG.DEFAULTS.WIDTH,
                          height = CHICKEN_BAG.DEFAULTS.HEIGHT,
                          gusset = 0,
                          flap = CHICKEN_BAG.DEFAULTS.FLAP) {
  
  if (!width || !height) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10"
           style="background-color:#F8F8F8">
        <text x="50%" y="50%" font-size="0.4" text-anchor="middle" fill="#B0B0B0">
          ← Enter Width ↑ Enter Length → Enter Flap
        </text>
      </svg>
    `;
  }

  return createPreciseHeightTubeSVG(width, height, flap);
}

// =============================================
// PLANNING PREVIEW INTEGRATION
// =============================================
(function() {
  function setupPlanningPreview() {
    const planningSection = document.getElementById('planning-section');
    if (!planningSection) return;

    // Listen for bag updates from the sales section
    document.addEventListener('bagUpdated', function(e) {
      if (e.detail.type !== 'Chicken Bag') return;
      
      const { width, height, flap } = e.detail;
      
      // Reset counters when bag changes
      if (window.elements && window.elements.horizontalCount) {
        elements.horizontalCount.value = 1;
        elements.verticalCount.value = 1;
      }
      
      // Update current dimensions
      window.currentBagType = e.detail.type;
      window.currentBagWidth = width;
      window.currentBagHeight = height;
      window.currentBagFlap = flap || 0;
      
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
// REGISTRATION
// =============================================
(function() {
  const typeName = 'Chicken Bag';
  
  const implementation = {
    drawSVG: function(width, height, gusset, flap) {
      return drawChickenBagSVG(width, height, gusset, flap);
    },
    downloadPDF: async function(width, height, gusset, flap) {
      return null;
    },
    getSimpleSVG: function(width, height, gusset, flap) {
      return getSimpleChickenBagSVG(width, height, flap);
    },
    getDimensions: function(width, height, gusset, flap) {
      const radius = width / 2;
      const mirrorChordLength = CHICKEN_BAG.STYLES.MIRROR_LINE_HEIGHT;
      const chordOffset = Math.sqrt(radius * radius - Math.pow(mirrorChordLength / 2, 2));
      const calculatedOverlap = radius - chordOffset;
      const overlap = Math.max(calculatedOverlap, CHICKEN_BAG.STYLES.MIN_OVERLAP);
      
      return {
        width: height + height + (flap || 0),
        height: width,
        frontPanelWidth: height,
        backPanelWidth: height,
        flapWidth: flap || 0,
        overlap: overlap
      };
    }
  };

  function register() {
    if (window.BagRegistry?.register) {
      window.BagRegistry.register(typeName, implementation);
      return true;
    }

    if (window._bagRegistrationQueue) {
      window._bagRegistrationQueue = window._bagRegistrationQueue || [];
      window._bagRegistrationQueue = window._bagRegistrationQueue.filter(
        item => item.typeName.toLowerCase() !== typeName.toLowerCase()
      );
      window._bagRegistrationQueue.push({
        typeName: typeName,
        implementation: implementation
      });
      return true;
    }

    window.BagRegistry = {
      types: {},
      register: function(type, impl) {
        this.types[type] = impl;
      },
      get: function(type) {
        return this.types[type];
      }
    };
    window.BagRegistry.register(typeName, implementation);
    return true;
  }

  let attempts = 3;
  function attemptRegistration() {
    if (attempts-- <= 0) {
      console.error('Failed to register Chicken Bag after 3 attempts');
      return;
    }
    
    if (!register()) {
      setTimeout(attemptRegistration, 100);
    }
  }
  
  attemptRegistration();
})();