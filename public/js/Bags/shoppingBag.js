// js/Bags/shoppingBag.js - Improved Checkbox Handling
(() => {
    const SHOPPING_BAG = {
        // Handle Configurations
        HOLE_HANDLE: {
            WIDTH: 8,
            HEIGHT: 2,
            RADIUS: 1,
            TOP_MARGIN: 5,
            COLOR: "#800080",
            STROKE_WIDTH: 0.1
        },
        
        STRIP_HANDLE: {
            DIAMETER: 10,
            RADIUS: 5,
            TOP_MARGIN: 5,
            THICKNESS: 2,
            COLOR: "#800080",
            STROKE_WIDTH: 1.5
        },
        
        // Layout
        GAP_BETWEEN_FACES: 2,
        MIN_VIEW_SIZE: 20,
        
        // Default Options
        DEFAULTS: {
            WIDTH: 0,
            HEIGHT: 0,
            GUSSET: 0,
            hasSideGusset: false,
            hasBottomGusset: false,
            hasTwoFaces: false,
            hasHoleHandle: false,
            hasStripHandle: false
        },
        
        // Styles
        STYLES: {
            PANEL_COLOR: "#FFFFFF",
            STROKE_COLOR: "#0000FF",
            STROKE_WIDTH: 0.05,
            BG_COLOR: "#F8F8F8",
            LABEL_COLOR: "#008000",
            DIMENSION_COLOR: "#FF0000",
            PLACEHOLDER_COLOR: "#B0B0B0",
            TITLE_FONT_SIZE: 1.5,
            PANEL_FONT_SIZE: 0.8,
            SUMMARY_FONT_SIZE: 1.0
        }
    };

    // Helper function to get checkbox values
    function getCheckboxValues() {
        return {
            hasSideGusset: document.getElementById('sideGussetCheckbox')?.checked || false,
            hasBottomGusset: document.getElementById('bottomGussetCheckbox')?.checked || false,
            hasTwoFaces: document.getElementById('twoFacesCheckbox')?.checked || false,
            hasHoleHandle: document.getElementById('holeHandle')?.checked || false,
            hasStripHandle: document.getElementById('stripHandle')?.checked || false
        };
    }

    function calculateShoppingBagLayout(width, height, gusset, options) {
        const parts = [];
        const hasSideGusset = options.hasSideGusset && gusset > 0;
        const hasBottomGusset = options.hasBottomGusset && gusset > 0;

        // Main Face
        parts.push({ 
            type: 'Main Face', 
            x: 0, y: 0,
            width: width, 
            height: height 
        });

        // Side Gussets
        if (hasSideGusset) {
            parts.push({ 
                type: 'L.Gusset', 
                x: -gusset, y: 0,
                width: gusset, height: height 
            });
            parts.push({ 
                type: 'R.Gusset', 
                x: width, y: 0,
                width: gusset, height: height 
            });
        }

        // Bottom Gusset
        if (hasBottomGusset) {
            parts.push({ 
                type: 'Bottom Gusset', 
                x: 0, y: height,
                width: width, height: gusset 
            });
        }

        // Back Face (if two faces)
        if (options.hasTwoFaces) {
            const backFaceX = width + (hasSideGusset ? gusset * 2 : 0) + SHOPPING_BAG.GAP_BETWEEN_FACES;
            parts.push({
                type: 'Back Face', 
                x: backFaceX, y: 0,
                width: width, height: height 
            });

            // Back Face Gussets
            if (hasSideGusset) {
                parts.push({
                    type: 'L.Gusset', 
                    x: backFaceX - gusset, y: 0,
                    width: gusset, height: height 
                });
                parts.push({
                    type: 'R.Gusset', 
                    x: backFaceX + width, y: 0,
                    width: gusset, height: height 
                });
            }

            if (hasBottomGusset) {
                parts.push({
                    type: 'Bottom Gusset', 
                    x: backFaceX, y: height,
                    width: width, height: gusset 
                });
            }
        }

        // Calculate total dimensions
        let totalWidth = width + (hasSideGusset ? gusset * 2 : 0);
        let totalHeight = height + (hasBottomGusset ? gusset : 0);
        
        if (options.hasTwoFaces) {
            totalWidth += (width + SHOPPING_BAG.GAP_BETWEEN_FACES);
        }

        return { 
            parts, 
            totalWidth, 
            totalHeight,
            hasSideGusset,
            hasBottomGusset,
            gussetWidth: gusset,
            hasHoleHandle: options.hasHoleHandle,
            hasStripHandle: options.hasStripHandle,
            bagWidth: width,
            bagHeight: height
        };
    }

    function generateMainPanelsSVG(layout) {
        return layout.parts
            .filter(part => part.type.includes('Face') || part.type.includes('Gusset'))
            .map(part => {
                const panelSVG = `<rect x="${part.x.toFixed(2)}" y="${part.y.toFixed(2)}" 
                          width="${part.width.toFixed(2)}" height="${part.height.toFixed(2)}" 
                          fill="${SHOPPING_BAG.STYLES.PANEL_COLOR}" 
                          stroke="${SHOPPING_BAG.STYLES.STROKE_COLOR}" 
                          stroke-width="${SHOPPING_BAG.STYLES.STROKE_WIDTH}" />`;
                
                // Center label for the panel
                const centerX = part.x + part.width / 2;
                const centerY = part.y + part.height / 2;
                const nameLabel = `
                    <text x="${centerX.toFixed(2)}" y="${centerY.toFixed(2)}" 
                          font-size="${SHOPPING_BAG.STYLES.PANEL_FONT_SIZE}" 
                          text-anchor="middle" dominant-baseline="middle"
                          fill="${SHOPPING_BAG.STYLES.LABEL_COLOR}">
                        ${part.type}
                    </text>
                `;
                
                // Dimension label
                const labelY = part.y + part.height + 0.8;
                const labelX = part.x + part.width / 2;
                const dimensionLabel = `
                    <text x="${labelX.toFixed(2)}" y="${labelY.toFixed(2)}" 
                          font-size="${SHOPPING_BAG.STYLES.PANEL_FONT_SIZE}" 
                          text-anchor="middle" 
                          fill="${SHOPPING_BAG.STYLES.DIMENSION_COLOR}">
                        ${part.width.toFixed(1)}cm × ${part.height.toFixed(1)}cm
                    </text>
                `;
                
                return panelSVG + nameLabel + dimensionLabel;
            }).join('');
    }

    function generateHoleHandlesSVG(faces) {
        const h = SHOPPING_BAG.HOLE_HANDLE;
        return faces.map(face => {
            const holeX = face.x + (face.width / 2) - (h.WIDTH / 2);
            const holeY = face.y + h.TOP_MARGIN;
            return `<rect x="${holeX.toFixed(2)}" y="${holeY.toFixed(2)}"
                      width="${h.WIDTH}" height="${h.HEIGHT}"
                      rx="${h.RADIUS}" ry="${h.RADIUS}"
                      fill="none" stroke="${h.COLOR}"
                      stroke-width="${h.STROKE_WIDTH}" />`;
        }).join('');
    }

    function generateStripHandlesSVG(faces) {
        const s = SHOPPING_BAG.STRIP_HANDLE;
        return faces.map(face => {
            const centerX = face.x + (face.width / 2);
            const topY = face.y;
            return `<path d="M${(centerX - s.RADIUS).toFixed(2)},${topY.toFixed(2)}
                           A${s.RADIUS},${s.RADIUS} 0 0 1 ${(centerX + s.RADIUS).toFixed(2)},${topY.toFixed(2)}"
                      fill="none" stroke="${s.COLOR}"
                      stroke-width="${s.STROKE_WIDTH}" />`;
        }).join('');
    }

    function generateHandlesSVG(layout) {
        const faces = layout.parts.filter(part => part.type.includes('Face'));
        let handleSVG = '';

        // Only show one type of handle at a time
        if (layout.hasHoleHandle) {
            handleSVG += generateHoleHandlesSVG(faces);
        } else if (layout.hasStripHandle) {
            handleSVG += generateStripHandlesSVG(faces);
        }

        return handleSVG;
    }

    function generateSummarySVG(layout, viewWidth, yPosition) {
        const summaryText = [
            `Total Width: ${layout.totalWidth.toFixed(1)}cm`,
            `Total Height: ${layout.totalHeight.toFixed(1)}cm`,
            `Bag Dimensions: ${layout.bagWidth.toFixed(1)}cm × ${layout.bagHeight.toFixed(1)}cm`,
            `Gusset: ${layout.gussetWidth.toFixed(1) * 2}cm`,
            `Handle Type: ${layout.hasHoleHandle ? 'Hole' : layout.hasStripHandle ? 'Strip' : 'None'}`
        ];
        
        return `
            <g transform="translate(0,${yPosition.toFixed(2)})">
                <rect x="1" y="0" width="${viewWidth - 2}" height="${summaryText.length * 1.2 + 0.5}" 
                      rx="0.5" ry="0.5" fill="#FFFFFF" opacity="0.8"
                      stroke="${SHOPPING_BAG.STYLES.STROKE_COLOR}" stroke-width="0.05"/>
                ${summaryText.map((text, i) => `
                    <text x="${viewWidth / 2}" y="${1.2 * (i + 1)}" 
                          font-size="${SHOPPING_BAG.STYLES.SUMMARY_FONT_SIZE}" 
                          text-anchor="middle" fill="${SHOPPING_BAG.STYLES.DIMENSION_COLOR}">
                        ${text}
                    </text>
                `).join('')}
            </g>
        `;
    }



    function showPlaceholderSVG() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 4"
                 style="background-color:${SHOPPING_BAG.STYLES.BG_COLOR}">
                <text x="30%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${SHOPPING_BAG.STYLES.PLACEHOLDER_COLOR}">
                    ← Enter Width
                </text>
                <text x="50%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${SHOPPING_BAG.STYLES.PLACEHOLDER_COLOR}">
                    ↑ Enter Height
                </text>
                <text x="70%" y="50%" font-size="0.4" text-anchor="middle" 
                      fill="${SHOPPING_BAG.STYLES.PLACEHOLDER_COLOR}">
                    → Enter Gusset
                </text>
            </svg>
        `;
    }

    function drawShoppingBagSVG(width = 0, height = 0, gusset = 0, options = {}) {
        if (!width || !height) return showPlaceholderSVG();
    
        // Get current checkbox states
        const checkboxOptions = getCheckboxValues();
        
        const config = {
            ...SHOPPING_BAG.DEFAULTS,
            ...options,
            ...checkboxOptions, // Override with current checkbox states
            width: parseFloat(width),
            height: parseFloat(height),
            gusset: parseFloat(gusset),
        };
    
        const layout = calculateShoppingBagLayout(config.width, config.height, config.gusset, config);
        
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
        const titleHeight = 2; // Space for title (in cm)
        const summaryHeight = 4; // Space for summary (in cm)
        const verticalPadding = 1; // Additional padding (in cm)
    
        // Set the minimum dimensions of the SVG
        const minDimension = 20;
        const margin = 1; // 1cm margin all around
    
        // Calculate view dimensions
        const viewWidth = Math.max(contentWidth + (margin * 2), minDimension);
        const viewHeight = Math.max(contentHeight + titleHeight + summaryHeight + verticalPadding + (margin * 2), minDimension);
    
        // Calculate scaling factor
        const availableWidth = viewWidth - (margin * 2);
        const availableHeight = viewHeight - (margin * 2) - titleHeight - summaryHeight - verticalPadding;
        const scaleX = availableWidth / contentWidth;
        const scaleY = availableHeight / contentHeight;
        const scale = Math.min(1, Math.min(scaleX, scaleY)); // Ensure we don't scale up
    
        // Calculate offsets
        const scaledContentWidth = contentWidth * scale;
        const scaledContentHeight = contentHeight * scale;
        
        const horizontalOffset = margin + (availableWidth - scaledContentWidth) / 2;
        const verticalOffset = margin + titleHeight + (availableHeight - scaledContentHeight) / 2;
    
        let sealType = '';
        if (layout.hasSideGusset) {
            sealType = ' (Bottom Seal)';
        } else if (layout.hasBottomGusset) {
            sealType = ' (Side Seal)';
        }
    
        // Position for the summary text (below the drawing)
        const summaryY = verticalOffset + scaledContentHeight + (verticalPadding / 2);
    
        return `<svg xmlns="http://www.w3.org/2000/svg" 
                   width="${viewWidth}cm" 
                   height="${viewHeight}cm"
                   viewBox="0 0 ${viewWidth} ${viewHeight}"
                   style="background-color:${SHOPPING_BAG.STYLES.BG_COLOR}; 
                          shape-rendering: crispEdges">
                  <!-- Title positioned at the top with proper spacing -->
                  <text x="${viewWidth / 2}" y="${margin + 1.5}" 
                        font-size="${SHOPPING_BAG.STYLES.TITLE_FONT_SIZE}" 
                        text-anchor="middle" font-weight="bold"
                        fill="${SHOPPING_BAG.STYLES.LABEL_COLOR}">
                    Shopping Bag ${config.hasHoleHandle ? '(Hole Handle)' : config.hasStripHandle ? '(Strip Handle)' : ''}
                    ${config.hasTwoFaces ? ' (Two Faces)' : ''}
                    ${sealType}
                  </text>
                  
                  <!-- Main drawing content -->
                  <g transform="translate(${horizontalOffset - (minX * scale)}, ${verticalOffset - (minY * scale)}) scale(${scale.toFixed(4)})">
                    ${generateMainPanelsSVG(layout)}
                    ${generateHandlesSVG(layout)}
                  </g>
                  
                  <!-- Summary positioned below the drawing -->
                  ${generateSummarySVG(layout, viewWidth, summaryY)}
                </svg>`;
    }

    // Registry Implementation
    const ShoppingBagRegistry = {
        implementations: {},
        
        registerVariant: function(variantName, implementation) {
            if (!this.implementations[variantName]) {
                this.implementations[variantName] = implementation;
                return true;
            }
            return false;
        },
        
        registerWithGlobalRegistry: function() {
            const variants = {
                'Shopping Bag': {
                    drawSVG: (w, h, g, f, o) => {
                        const options = {
                            ...getCheckboxValues(),
                            ...o
                        };
                        return drawShoppingBagSVG(w, h, g, options);
                    }
                },
                'Shopping Bag Hole': {
                    drawSVG: (w, h, g, f, o) => {
                        const options = {
                            ...getCheckboxValues(),
                            hasHoleHandle: true, // Force hole handle for this variant
                            ...o
                        };
                        return drawShoppingBagSVG(w, h, g, options);
                    }
                }
            };

            Object.entries(variants).forEach(([name, impl]) => {
                this.registerVariant(name, impl);
                if (window.BagRegistry) {
                    window.BagRegistry.register(name, impl);
                } else {
                    window._bagRegistrationQueue = window._bagRegistrationQueue || [];
                    window._bagRegistrationQueue.push({
                        typeName: name,
                        implementation: impl
                    });
                }
            });
        }
    };

    // Initialize
    ShoppingBagRegistry.registerWithGlobalRegistry();
    window.ShoppingBagRegistry = ShoppingBagRegistry;
})();