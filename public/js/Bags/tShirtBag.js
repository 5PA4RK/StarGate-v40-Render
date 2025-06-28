// js/Bags/tShirtBag.js - Authentic T-Shirt Bag Design with Duplication Feature
(() => {
    'use strict';

    const DEBUG = true;
    function log(...messages) {
        if (DEBUG) console.log('[TShirtBag]', ...messages);
    }

    // =============================================
    // CONSTANTS (ALL MEASUREMENTS IN CM)
    // =============================================
    const T_SHIRT_BAG = {
        // Handle Configuration
        HANDLE: {
            WIDTH: 5,           // Handle width
            HEIGHT: 2,          // Handle height
            RADIUS: 1,          // Corner radius
            TOP_MARGIN: 3,      // From top edge
            COLOR: "#FF5733",   // Orange-red
            STROKE_WIDTH: 0.15,
            SPACING: 1          // Space between handles and neck
        },

        // Neck Configuration
        NECK: {
            DEPTH: 5,           // Depth of neck cut
            WIDTH_RATIO: 0.4,   // Percentage of bag width
            RADIUS: 2,          // Corner radius
            COLOR: "#3498DB",   // Blue
            STROKE_WIDTH: 0.1
        },

        // Layout
        MIN_VIEW_SIZE: 20,      // Minimum 20cm viewbox
        DEFAULTS: {
            WIDTH: 30,          // Default width
            HEIGHT: 40,         // Default height
            GUSSET: 5,          // Default side gusset
            HAS_SIDE_GUSSET: true,
            DISTANCE: 2         // Distance between duplicated bags
        },

        // Styles
        STYLES: {
            PANEL_COLOR: "#FFFFFF",
            STROKE_COLOR: "#0000FF",
            STROKE_WIDTH: 0.05,
            BG_COLOR: "#F8F8F8",
            LABEL_COLOR: "#008000",
            DIMENSION_COLOR: "#FF0000",
            PLACEHOLDER_COLOR: "#B0B0B0"
        }
    };

    // =============================================
    // UTILITY FUNCTIONS
    // =============================================
    function showPlaceholderSVG() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 4"
                 style="background-color:${T_SHIRT_BAG.STYLES.BG_COLOR}">
                <text x="30%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${T_SHIRT_BAG.STYLES.PLACEHOLDER_COLOR}">
                    ← Enter Width
                </text>
                <text x="50%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${T_SHIRT_BAG.STYLES.PLACEHOLDER_COLOR}">
                    ↑ Enter Height
                </text>
                <text x="70%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${T_SHIRT_BAG.STYLES.PLACEHOLDER_COLOR}">
                    → Enter Gusset
                </text>
            </svg>
        `;
    }

    // =============================================
    // CORE FUNCTIONS - AUTHENTIC T-SHIRT BAG SHAPE
    // =============================================
    function calculateLayout(width, height, gusset, options) {
        const parts = [];
        // T-shirt bags always use side gussets when gusset value > 0
        const hasSideGusset = gusset > 0; // Removed the options.hasSideGusset check
    
        // Main Panel with neck cutout
        parts.push({ 
            type: 'Main Panel', 
            x: 0, y: 0,
            width: width, 
            height: height,
            neckWidth: width * T_SHIRT_BAG.NECK.WIDTH_RATIO
        });
    
        // Side Gussets (automatically added when gusset > 0)
        if (hasSideGusset) {
            parts.push({ 
                type: 'Side Gusset', 
                x: -gusset, y: 0,
                width: gusset, height: height 
            });
            parts.push({ 
                type: 'Side Gusset', 
                x: width, y: 0,
                width: gusset, height: height 
            });
        }
    
        return { 
            parts, 
            totalWidth: width + (hasSideGusset ? gusset * 2 : 0), 
            totalHeight: height,
            hasSideGusset,
            gussetWidth: gusset,
            bagWidth: width,
            bagHeight: height
        };
    }

    function generateMainPanelsSVG(layout) {
        return layout.parts.map(part => {
            if (part.type === 'Main Panel') {
                // Create the sleeveless shirt shape with neck cutout protruding downwards
                const neckWidth = part.neckWidth;
                const neckStartX = (part.width - neckWidth) / 2;
                const neckEndX = neckStartX + neckWidth;
                const neckDepth = T_SHIRT_BAG.NECK.DEPTH;
                const radius = T_SHIRT_BAG.NECK.RADIUS;

                return `
                    <path d="M${part.x},${part.y}
                             L${part.x + neckStartX},${part.y}
                             L${part.x + neckStartX},${part.y + neckDepth}
                             Q${part.x + neckStartX},${part.y + neckDepth + radius} ${part.x + neckStartX + radius},${part.y + neckDepth + radius}
                             L${part.x + neckEndX - radius},${part.y + neckDepth + radius}
                             Q${part.x + neckEndX},${part.y + neckDepth + radius} ${part.x + neckEndX},${part.y + neckDepth}
                             L${part.x + neckEndX},${part.y}
                             L${part.x + part.width},${part.y}
                             V${part.y + part.height}
                             H${part.x}
                             Z"
                          fill="${T_SHIRT_BAG.STYLES.PANEL_COLOR}"
                          stroke="${T_SHIRT_BAG.STYLES.STROKE_COLOR}"
                          stroke-width="${T_SHIRT_BAG.STYLES.STROKE_WIDTH}"/>
                `;
            } else {
                // Side gussets
                return `
                    <rect x="${part.x}" y="${part.y}"
                          width="${part.width}" height="${part.height}"
                          fill="${T_SHIRT_BAG.STYLES.PANEL_COLOR}"
                          stroke="${T_SHIRT_BAG.STYLES.STROKE_COLOR}"
                          stroke-width="${T_SHIRT_BAG.STYLES.STROKE_WIDTH}"/>
                `;
            }
        }).join('');
    }

    function generateHandlesSVG(panel) {
        const h = T_SHIRT_BAG.HANDLE;

        // Calculate handle positions - placed just outside the neck cutout
        const neckWidth = panel.neckWidth;
        const neckStartX = (panel.width - neckWidth) / 2;
        const neckEndX = neckStartX + neckWidth;

        const leftHandleX = neckStartX - h.WIDTH - h.SPACING;
        const rightHandleX = neckEndX + h.SPACING;
        const handleY = panel.y + h.TOP_MARGIN;


    }

    function drawTShirtBagSVG(width = 0, height = 0, gusset = 0, flap = 0, options = {}) {
        if (!width || !height) return showPlaceholderSVG();
    
        // Merge options with defaults
        const config = {
            ...T_SHIRT_BAG.DEFAULTS,
            ...options,
            width: parseFloat(width),
            height: parseFloat(height),
            gusset: parseFloat(gusset),
            hasTwoFaces: options.hasTwoFaces || false,
        };
    
        const layout = calculateLayout(config.width, config.height, config.gusset, config);
        const mainPanel = layout.parts.find(p => p.type === 'Main Panel');
    
        // Calculate the actual content bounds including all parts
        let minX = 0, minY = 0, maxX = 0, maxY = 0;
        
        layout.parts.forEach(part => {
            minX = Math.min(minX, part.x);
            minY = Math.min(minY, part.y);
            maxX = Math.max(maxX, part.x + part.width);
            maxY = Math.max(maxY, part.y + part.height);
        });
    
        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;
        const distanceBetweenBags = T_SHIRT_BAG.DEFAULTS.DISTANCE;
        
        // Space allocation
        const titleHeight = 2; // Space for title (in cm)
        const summaryHeight = 0; // No summary for T-Shirt bag
        const verticalPadding = 1; // Additional padding (in cm)
        const horizontalPadding = 1; // Side padding (in cm)
        
        // Calculate total content width (including both bags if needed)
        const totalContentWidth = contentWidth * (config.hasTwoFaces ? 2 : 1) + 
                                (config.hasTwoFaces ? distanceBetweenBags : 0);
        
        // Set the minimum dimensions of the SVG
        const minDimension = 20;
        
        // Calculate view dimensions
        const viewWidth = Math.max(totalContentWidth + (horizontalPadding * 2), minDimension);
        const viewHeight = Math.max(contentHeight + titleHeight + verticalPadding + (horizontalPadding * 2), minDimension);
    
        // Calculate scaling factor
        const availableWidth = viewWidth - (horizontalPadding * 2);
        const availableHeight = viewHeight - titleHeight - verticalPadding - (horizontalPadding * 2);
        
        const scaleX = availableWidth / totalContentWidth;
        const scaleY = availableHeight / contentHeight;
        const scale = Math.min(1, Math.min(scaleX, scaleY)); // Ensure we don't scale up
    
        // Calculate scaled dimensions
        const scaledContentWidth = totalContentWidth * scale;
        const scaledContentHeight = contentHeight * scale;
        
        // Calculate offsets
        const horizontalOffset = horizontalPadding + (availableWidth - scaledContentWidth) / 2;
        const verticalOffset = titleHeight + horizontalPadding + (availableHeight - scaledContentHeight) / 2;
    
        // Generate SVG content
        const mainBagSVG = `
            <g transform="translate(${-minX * scale},${-minY * scale}) scale(${scale})">
                ${generateMainPanelsSVG(layout)}
                ${generateHandlesSVG(mainPanel)}
            </g>
        `;
    
        const secondBagSVG = config.hasTwoFaces ? `
            <g transform="translate(${(contentWidth + distanceBetweenBags) * scale},0)">
                <g transform="translate(${-minX * scale},${-minY * scale}) scale(${scale})">
                    ${generateMainPanelsSVG(layout)}
                    ${generateHandlesSVG(mainPanel)}
                </g>
            </g>
        ` : '';
    
        return `
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="${viewWidth}cm" 
                 height="${viewHeight}cm"
                 viewBox="0 0 ${viewWidth} ${viewHeight}"
                 style="background-color:${T_SHIRT_BAG.STYLES.BG_COLOR}">
                
                <!-- Title positioned at the top with proper spacing -->
                <text x="${viewWidth/2}" y="${horizontalPadding + 1.5}" 
                      font-size="1.2" text-anchor="middle"
                      fill="${T_SHIRT_BAG.STYLES.LABEL_COLOR}">
                    T-Shirt Bag (${layout.bagWidth.toFixed(1)}cm × ${layout.bagHeight.toFixed(1)}cm)
                    ${config.hasTwoFaces ? ' (Two Faces)' : ''}
                </text>
                
                <!-- Main drawing content -->
                <g transform="translate(${horizontalOffset},${verticalOffset})">
                    ${mainBagSVG}
                    ${secondBagSVG}
                </g>
            </svg>
        `;
    }

    // =============================================
    // REGISTRY IMPLEMENTATION
    // =============================================
    function registerTShirtBag() {
        log('Starting registration...');

        const implementation = {
            drawSVG: (w, h, g, f, o) => drawTShirtBagSVG(w, h, g, f, o)
        };

        if (window.BagRegistry) {
            log('Registering with global registry');
            window.BagRegistry.register('T-Shirt Bag', implementation);
            log('Registration complete');
        } else {
            log('Global registry not available, adding to queue');
            window._bagRegistrationQueue = window._bagRegistrationQueue || [];
            window._bagRegistrationQueue.push({
                typeName: 'T-Shirt Bag',
                implementation: implementation
            });
        }
    }
    
    // Function to process the registration queue
    function processRegistrationQueue() {
        if (window.BagRegistry) {
            log('Processing registration queue');
            const queue = window._bagRegistrationQueue || [];
            queue.forEach(item => {
                window.BagRegistry.register(item.typeName, item.implementation);
                log(`Registered ${item.typeName}`);
            });
            window._bagRegistrationQueue = []; // Clear the queue
        }
    }

    // Check for BagRegistry and register if it exists
    const checkInterval = setInterval(() => {
        if (window.BagRegistry) {
            clearInterval(checkInterval); // Clear the interval once identified
            log('BagRegistry found, processing registration queue');
            processRegistrationQueue();
            registerTShirtBag(); // Register the T-Shirt Bag
        }
    }, 100); // Check every 100 ms

    // Immediately register when loaded
    registerTShirtBag();
})();