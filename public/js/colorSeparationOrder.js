document.addEventListener('DOMContentLoaded', function() {
  // Get the container where we'll inject the HTML
  const filesSection = document.getElementById('files-section');
  
  if (!filesSection) {
      console.error('Could not find element with ID "files-section"');
      return;
  }

  // Inject the HTML content
  filesSection.innerHTML = `
  
<!-- Full Data Section //////////////////////////////////////////////////////////-->
<div class="card">
  <div class="form-group">
      <!-- General Information Section -->
      <section class="form-section">
          <h3>Job Information</h3>
          <div class="form-grid">
              <div class="form-group">
                  <label for="job-number">Job Number</label>
                  <input type="text" id="job-number">
              </div>
              <div class="form-group">
                  <label for="entry-date">Entry Date</label>
                  <input type="date" id="entry-date">
              </div>
              <div class="form-group">
                  <label for="customer-name">Customer Name</label>
                  <input type="text" id="customer-name">
              </div>
              <div class="form-group">
                  <label for="customer-code">Customer Code</label>
                  <input type="text" id="customer-code">
              </div>
              <div class="form-group">
                  <label for="job-name">Job Name</label>
                  <input type="text" id="job-name">
              </div>
              <div class="form-group">
                  <label for="quantity">Quantity</label>
                  <input type="number" id="quantity">
              </div>
              <div class="form-group">
                  <label for="salesman">Salesman</label>
                  <input type="text" id="salesman">
              </div>
          </div>
      </section>

      <!-- Product Specifications Section -->
      <section class="form-section">
          <h3>Product Specifications</h3>
          <div class="form-grid">
              <div class="form-group">
                  <label for="product-type">Product Type</label>
                  <select id="product-type">
                      <option value="">Select product type</option>
                      <option value="Bag">Bag</option>
                      <option value="Pouch">Pouch</option>
                      <option value="Sheet">Sheet</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="widthInput">Width (cm)</label>
                  <input type="number" id="widthInput" step="0.1">
              </div>
              <div class="form-group">
                  <label for="heightInput">Height (cm)</label>
                  <input type="number" id="heightInput" step="0.1">
              </div>
              <div class="form-group">
                  <label for="gussetInput">Gusset (cm)</label>
                  <input type="number" id="gussetInput" step="0.1">
              </div>
              <div class="form-group">
                  <label for="flapInput">Flap (cm)</label>
                  <input type="number" id="flapInput" step="0.1">
              </div>
          </div>

          <div class="form-grid">
              <div class="form-group">
                  <h3>Bag Options</h3>
                  <div class="checkbox-group">
                      <input type="checkbox" id="twoFacesCheckbox">
                      <label for="twoFacesCheckbox">Two Faces</label>
                  </div>
                  <div class="checkbox-group">
                      <input type="checkbox" id="sideGussetCheckbox">
                      <label for="sideGussetCheckbox">Side Gusset</label>
                  </div>
                  <div class="checkbox-group">
                      <input type="checkbox" id="bottomGussetCheckbox">
                      <label for="bottomGussetCheckbox">Bottom Gusset</label>
                  </div>
                  <div class="checkbox-group">
                      <input type="checkbox" id="holeHandle">
                      <label for="holeHandle">Hole Handle</label>
                  </div>
                  <div class="checkbox-group">
                      <input type="checkbox" id="stripHandle">
                      <label for="stripHandle">Strip Handle</label>
                  </div>
                  <div class="checkbox-group">
                      <input type="checkbox" id="flipDirectionCheckbox">
                      <label for="flipDirectionCheckbox">Rotate 90°</label>
                  </div>
              </div>
          </div>
      </section>

      <!-- Press Information Section -->
      <section class="form-section">
          <h3>Press Information</h3>
          <div class="form-grid">
              <div class="form-group">
                  <label for="press-type">Press Type</label>
                  <select id="press-type">
                      <option value="">Select press type</option>
                      <option value="Flexo">Flexo</option>
                      <option value="Gravure">Gravure</option>
                      <option value="Offset">Offset</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="print-orientation">Print Orientation</label>
                  <select id="print-orientation">
                      <option value="">Select orientation</option>
                      <option value="Normal">Normal</option>
                      <option value="Reverse">Reverse</option>
                  </select>
              </div>
              <div class="form-group">
                  <label for="unwinding-direction">Unwinding Direction</label>
                  <select id="unwinding-direction">
                      <option value="">Select direction</option>
                      <option value="Left">Left</option>
                      <option value="Right">Right</option>
                  </select>
              </div>
          </div>
      </section>

      <!-- PLYs Section -->
      <section class="form-section" id="plys-section">
          <h3>PLYs</h3>
          <div class="form-grid" id="plys-container">
              <!-- Dynamic PLY fields will be added here by JavaScript -->
          </div>
          <button type="button" id="add-ply" class="btn-add">Add PLY</button>
      </section>

      <!-- Colors Section -->
      <section class="form-section" id="colors-section">
          <h3>Colors</h3>
          <div class="form-grid" id="colors-container">
              <!-- Dynamic Color fields will be added here by JavaScript -->
          </div>
          <button type="button" id="add-color">Add Color</button>
      </section>

      <!-- Planning Section -->
      <section class="form-section">
          <h3>Planning</h3>
          <div class="form-grid">
              <div class="form-group">
                  <label for="machine-select">Machine</label>
                  <select id="machine-select">
                      <option value="">Select machine</option>
                      <option value="Machine 1">Machine 1</option>
                      <option value="Machine 2">Machine 2</option>
                  </select>
              </div>
          </div>
          
          <div class="form-grid">
              <h3>Layout Options</h3>
              <div class="checkbox-group">
                  <input type="checkbox" id="planning-flip-direction">
                  <label for="planning-flip-direction">Rotate 90°</label>
              </div>
              <div class="checkbox-group">
                  <input type="checkbox" id="planning-add-lines">
                  <label for="planning-add-lines">Add Lines</label>
              </div>
              <div class="checkbox-group">
                  <input type="checkbox" id="planning-new-machine">
                  <label for="planning-new-machine">New Machine</label>
              </div>
              <div class="checkbox-group">
                  <input type="checkbox" id="planning-add-stagger">
                  <label for="planning-add-stagger">Add Stagger</label>
              </div>
          </div>
      </section>

      <!-- Images Section -->
      <section class="form-section">
          <h3>Images</h3>
          <div class="form-grid">
              <div class="form-group">
                  <label for="upload-image">Upload SC Approval</label>
                  <input type="file" id="upload-image" accept="image/*">
              </div>
          </div>
      </section>

      <!-- Notes Section -->
      <section class="form-section">
          <h3>Notes</h3>
          <div class="form-group">
              <label for="comments">Comments</label>
              <textarea id="comments" rows="4"></textarea>
          </div>
      </section>
<!-- Output Section (Visible only when printing) -->
<div id="a4-sheet">
  <div class="output-section" id="colorSeparationOutput">
      <h2>Color Separation Order</h2>
      
      <!-- General Information Output -->
      <section>
          <h3>General Information</h3>
          <div class="output-grid">
              <div><strong>Job Number:</strong> <span id="display-job-number" class="no-entry">-</span></div>
              <div><strong>Entry Date:</strong> <span id="display-entry-date" class="no-entry">-</span></div>
              <div><strong>Customer Name:</strong> <span id="display-customer-name" class="no-entry">-</span></div>
              <div><strong>Customer Code:</strong> <span id="display-customer-code" class="no-entry">-</span></div>
              <div><strong>Job Name:</strong> <span id="display-job-name" class="no-entry">-</span></div>
              <div><strong>Quantity:</strong> <span id="display-quantity" class="no-entry">-</span></div>
              <div><strong>Salesman:</strong> <span id="display-salesman" class="no-entry">-</span></div>
          </div>
      </section>

      <!-- Product Specifications Output -->
      <section>
          <h2>Product Specifications</h2>
          <div class="output-grid">
              <div><strong>Product Type:</strong> <span id="display-product-type" class="no-entry">-</span></div>
              <div><strong>Width:</strong> <span id="display-width" class="no-entry">-</span></div>
              <div><strong>Height:</strong> <span id="display-height" class="no-entry">-</span></div>
              <div><strong>Gusset:</strong> <span id="display-gusset" class="no-entry">-</span></div>
              <div><strong>Flap:</strong> <span id="display-flap" class="no-entry">-</span></div>
              <div><strong>Bag Options:</strong> <span id="display-bag-options" class="no-entry">-</span></div>
          </div>
      </section>

      <!-- Press Information Output -->
      <section>
          <h2>Press Information</h2>
          <div class="output-grid">
              <div><strong>Press Type:</strong> <span id="display-press-type" class="no-entry">-</span></div>
              <div><strong>Print Orientation:</strong> <span id="display-print-orientation" class="no-entry">-</span></div>
              <div><strong>Unwinding Direction:</strong> <span id="display-unwinding-direction" class="no-entry">-</span></div>
          </div>
      </section>

      <!-- PLYs Output -->
      <section>
          <h2>PLYs</h2>
          <div class="info-value" id="display-plys"><span class="no-entry">-</span></div>
      </section>

      <!-- Colors Output -->
      <section>
          <h2>Colors</h2>
          <div class="info-value" id="display-colors"><span class="no-entry">-</span></div>
      </section>

      <!-- Planning Output -->
      <section>
          <h2>Planning</h2>
          <div class="output-grid">
              <div><strong>Machine:</strong> <span id="display-machine" class="no-entry">-</span></div>
              <div><strong>Layout Options:</strong> <span id="display-layout-options" class="no-entry">-</span></div>
          </div>
      </section>

      <!-- Layout Preview -->
      <section id="layout-section">
          <h2>Design Approval & Layout Preview</h2>
          <div id="layout-placeholder" style="min-height: 200px; border: 1px dashed #ccc;">
              No layout available
          </div>
          <div id="sc-approval-placeholder" style="min-height: 200px; border: 1px dashed #ccc;">
              No image uploaded
          </div>
      </section>

      <!-- Notes Sections -->
      <section id="sales-notes-section" style="display: none;">
          <h2>Sales Notes</h2>
          <div id="display-sales-notes"></div>
      </section>

      <section id="planning-notes-section" style="display: none;">
          <h2>Planning Notes</h2>
          <div id="display-planning-notes"></div>
      </section>

      <section id="aw-notes-section" style="display: none;">
          <h2>Artwork Notes</h2>
          <div id="display-aw-notes"></div>
      </section>

      <section id="qc-notes-section" style="display: none;">
          <h2>QC Notes</h2>
          <div id="display-qc-notes"></div>
      </section>

      <section id="finance-notes-section" style="display: none;">
          <h2>Finance Notes</h2>
          <div id="display-finance-notes"></div>
      </section>
  </div>
</div>
      <!-- Form Actions -->
      <section class="form-section">
          <button type="button" id="generate-btn">Generate Color Separation Order</button>
          <button type="button" id="print-btn">Print</button>
      </section>
  </div>
</div>



<!-- Form Buttons -->
<button id="save-files-btn">Generate Color Separation Order</button>
<button id="refresh-files-btn">Refresh Data</button>
<!--End of Full Data Section ////////////////////////////////////////////////////-->
  `;

  // Initialize the ColorSeparationOrder after DOM is ready
  setTimeout(() => {
      window.colorSeparationOrder = new ColorSeparationOrder();
      window.printColorSeparationOrder = () => window.colorSeparationOrder.printForm();
  }, 0);
});

class ColorSeparationOrder {
  constructor() {
      this.trackedFields = [
          // General Info
          'job-number', 'entry-date', 'customer-name', 'customer-code', 
          'job-name', 'quantity', 'salesman',
          // Product Specs
          'product-type', 'widthInput', 'heightInput', 'gussetInput', 'flapInput',
          'twoFacesCheckbox', 'sideGussetCheckbox', 'bottomGussetCheckbox',
          'holeHandle', 'stripHandle', 'flipDirectionCheckbox',
          // Press Info
          'press-type', 'print-orientation', 'unwinding-direction'
      ];
      this.plyCounter = 0;
      this.colorCounter = 0;
      this.initialize();
  }

  initialize() {
      this.setupEventListeners();
      this.updateDisplay();
  }

  setupEventListeners() {
      // Event listeners for dynamic updates
      document.addEventListener('colorFieldsUpdated', (e) => {
          this.updateColorDisplays(e.detail.colors);
      });

      document.addEventListener('plyFieldsUpdated', (e) => {
          this.updatePlyDisplays(e.detail.plys);
      });

      // Tracked fields updates
      this.trackedFields.forEach(fieldId => {
          const element = document.getElementById(fieldId);
          if (!element) return;

          if (element.type === 'checkbox' || element.tagName === 'SELECT') {
              element.addEventListener('change', () => this.updateDisplay());
          } else {
              element.addEventListener('input', () => this.updateDisplay());
          }
      });

      // Image upload handling
      const scApprovalUpload = document.getElementById('upload-image');
      if (scApprovalUpload) {
          scApprovalUpload.addEventListener('change', () => {
              setTimeout(() => this.updateImages(), 300);
          });
      }

      document.addEventListener('layoutUpdated', () => {
          this.updateImages();
      });
  }

  updateDisplay() {
      this.updateGeneralInfoDisplay();
      this.updateProductSpecsDisplay();
      this.updatePressInfoDisplay();
      this.updateImages();
      this.updateNotesSections();
  }

  updateGeneralInfoDisplay() {
      this.setDisplayValue('display-job-number', this.getFieldValue('job-number'));
      this.setDisplayValue('display-entry-date', this.formatDate(this.getFieldValue('entry-date')));
      this.setDisplayValue('display-customer-name', this.getFieldValue('customer-name'));
      this.setDisplayValue('display-customer-code', this.getFieldValue('customer-code'));
      this.setDisplayValue('display-job-name', this.getFieldValue('job-name'));
      this.setDisplayValue('display-quantity', this.getFieldValue('quantity'));
      this.setDisplayValue('display-salesman', this.getFieldValue('salesman'));
  }

  updateProductSpecsDisplay() {
      this.setDisplayValue('display-product-type', this.getFieldValue('product-type'));
      this.setDisplayValue('display-width', this.getFieldValue('widthInput') ? `${this.getFieldValue('widthInput')} cm` : '-');
      this.setDisplayValue('display-height', this.getFieldValue('heightInput') ? `${this.getFieldValue('heightInput')} cm` : '-');
      this.setDisplayValue('display-gusset', this.getFieldValue('gussetInput') ? `${this.getFieldValue('gussetInput')} cm` : '-');
      this.setDisplayValue('display-flap', this.getFieldValue('flapInput') ? `${this.getFieldValue('flapInput')} cm` : '-');

      const bagOptions = [];
      if (this.getCheckboxValue('twoFacesCheckbox')) bagOptions.push('Two Faces');
      if (this.getCheckboxValue('sideGussetCheckbox')) bagOptions.push('Side Gusset');
      if (this.getCheckboxValue('bottomGussetCheckbox')) bagOptions.push('Bottom Gusset');
      if (this.getCheckboxValue('holeHandle')) bagOptions.push('Hole Handle');
      if (this.getCheckboxValue('stripHandle')) bagOptions.push('Strip Handle');
      if (this.getCheckboxValue('flipDirectionCheckbox')) bagOptions.push('Rotate 90°');

      this.setDisplayValue('display-bag-options', bagOptions.length ? bagOptions.join(', ') : '-');
  }

  updatePressInfoDisplay() {
      this.setDisplayValue('display-press-type', this.getFieldValue('press-type'));
      this.setDisplayValue('display-print-orientation', this.getFieldValue('print-orientation'));
      this.setDisplayValue('display-unwinding-direction', this.getFieldValue('unwinding-direction'));
  }

  updateColorDisplays(colors = []) {
      if (!Array.isArray(colors)) colors = [];

      const colorsDisplay = colors.map(color => {
          const colorValue = color.value || this.getColorHex(color.name || color.color);
          const colorName = color.name || color.color || 'Unnamed Color';
          const colorType = color.type || (color.isCustom ? 'Custom' : 'Process');
          const colorDisplayBox = `<span class="color-swatch" style="background:${colorValue}"></span>`;
          return `${colorDisplayBox} ${colorName} (${colorType})`;
      }).join('<br>');

      this.setDisplayValue('display-colors', colorsDisplay || '<span class="no-entry">No Colors</span>');
  }

  updatePlyDisplays(plys = null) {
      if (!plys) plys = this.collectPlys();
      
      const formattedPLYs = plys.map((ply, index) => {
          const plyName = index === 0 ? "Printed PLY" : `PLY ${index + 1}`;
          const parts = [];
          if (ply.material) parts.push(ply.material);
          if (ply.color) parts.push(`(${ply.color})`);
          if (ply.thickness) parts.push(`${ply.thickness} µm`);
          return `${plyName}: ${parts.join(' ')}`;
      });

      this.setDisplayValue('display-plys', formattedPLYs.length ? formattedPLYs.join('<br>') : '-');
  }

  updateImages() {
      const planningPreview = document.getElementById('autodraw-preview');
      const layoutPlaceholder = document.getElementById('layout-placeholder');
      
      if (planningPreview && layoutPlaceholder) {
          layoutPlaceholder.innerHTML = '';
          const previewContainer = document.createElement('div');
          previewContainer.style.width = '100%';
          previewContainer.style.height = '300px';
          previewContainer.style.overflow = 'hidden';
          previewContainer.style.position = 'relative';

          const previewClone = planningPreview.cloneNode(true);
          previewClone.style.width = '100%';
          previewClone.style.height = '100%';
          previewClone.style.margin = '0';
          previewClone.style.padding = '0';
          previewClone.style.display = 'flex';
          previewClone.style.justifyContent = 'center';
          previewClone.style.alignItems = 'center';
          
          const svg = previewClone.querySelector('svg');
          if (svg) {
              svg.removeAttribute('width');
              svg.removeAttribute('height');
              if (!svg.hasAttribute('viewBox') && svg.getBBox) {
                  const bbox = svg.getBBox();
                  svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
              }
              svg.style.maxWidth = '100%';
              svg.style.maxHeight = '100%';
              svg.style.width = 'auto';
              svg.style.height = 'auto';
              svg.style.display = 'block';
          }
          
          previewContainer.appendChild(previewClone);
          layoutPlaceholder.appendChild(previewContainer);
      }

      const scApprovalImage = document.getElementById('uploadedImage');
      const scPlaceholder = document.getElementById('sc-approval-placeholder');
      if (scApprovalImage && scApprovalImage.src && scPlaceholder) {
          scPlaceholder.innerHTML = '';
          const imgClone = scApprovalImage.cloneNode(true);
          imgClone.style.width = '100%';
          imgClone.style.maxHeight = '300px';
          imgClone.style.objectFit = 'contain';
          scPlaceholder.appendChild(imgClone);
      }
  }

  updateNotesSections() {
      const notes = this.getFieldValue('comments');
      this.toggleNotesSection('sales-notes-section', 'display-sales-notes', notes);
      this.toggleNotesSection('planning-notes-section', 'display-planning-notes', notes);
      this.toggleNotesSection('aw-notes-section', 'display-aw-notes', notes);
      this.toggleNotesSection('qc-notes-section', 'display-qc-notes', notes);
      this.toggleNotesSection('finance-notes-section', 'display-finance-notes', notes);
  }

  collectPlys() {
      const plys = [];
      const plyFields = document.querySelectorAll('.ply-field');

      plyFields.forEach((field, index) => {
          const plyId = index + 1;
          const material = this.getFieldValue(`ply-material-${plyId}`);
          const color = this.getFieldValue(`ply-color-${plyId}`);
          const thickness = this.getFieldValue(`ply-thickness-${plyId}`);

          if (material || color || thickness) {
              plys.push({ material, color, thickness });
          }
      });

      return plys;
  }

  getColorHex(colorName) {
      if (!colorName) return '#000000';
      const colorMap = {
          'Cyan': '#00FFFF', 'Magenta': '#FF00FF', 'Yellow': '#FFFF00',
          'Black': '#000000', 'Black FT': '#333333', 'Gold': '#FFD700',
          'Silver': '#C0C0C0', 'White': '#FFFFFF'
      };
      return colorName.startsWith('#') ? colorName : (colorMap[colorName] || '#000000');
  }

  getFieldValue(id) {
      const element = document.getElementById(id);
      if (!element) return null;
      if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
          return element.value.trim();
      } else if (element.hasAttribute('contenteditable')) {
          return element.innerText.trim();
      }
      return null;
  }

  getCheckboxValue(id) {
      const checkbox = document.getElementById(id);
      return checkbox ? checkbox.checked : false;
  }

  setDisplayValue(elementId, value) {
      const element = document.getElementById(elementId);
      if (!element) return;
      element.innerHTML = (value === null || value === '' || value === undefined) 
          ? '<span class="no-entry">-</span>' 
          : value;
  }

  toggleNotesSection(sectionId, displayId, notes) {
      const section = document.getElementById(sectionId);
      const display = document.getElementById(displayId);
      if (section && display) {
          if (notes && notes !== '') {
              section.style.display = 'block';
              display.textContent = notes;
          } else {
              section.style.display = 'none';
          }
      }
  }

  formatDate(dateString) {
      if (!dateString) return null;
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
  }

  printForm() {
      window.print();
  }
}