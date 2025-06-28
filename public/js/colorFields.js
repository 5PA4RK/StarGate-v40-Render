// colorFields.js
class ColorFields {
    constructor() {
        this.cmykQueue = ['Cyan', 'Magenta', 'Yellow', 'Black'];
        this.maxColors = 10;
        this.colorHexMap = {
            'Cyan': '#00FFFF',
            'Magenta': '#FF00FF',
            'Yellow': '#FFFF00',
            'Black': '#000000',
            'Black FT': '#333333',
            'Gold': '#FFD700',
            'Silver': '#C0C0C0',
            'White': '#FFFFFF'
        };
        this.colorCount = 0;
        this.cmykIndex = 0;
        this.init();
    }

    init() {
        this.setupContainer();
        this.setupEventListeners();
    }

    setupContainer() {
        let container = document.getElementById('color-fields-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'color-fields-container';
            document.querySelector('#aw-section .card').appendChild(container);
        }
        container.innerHTML = '';
        this.colorCount = 0;
        this.cmykIndex = 0;
        this.updateCounter();
    }

    setupEventListeners() {
        // Add color
        const addBtn = document.getElementById('add-color-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addColorField());
        }
        // Remove color (event delegation)
        const container = document.getElementById('color-fields-container');
        if (container) {
            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-btn')) {
                    e.stopPropagation();
                    const colorField = e.target.closest('.color-field');
                    if (colorField) this.removeColorField(colorField);
                }
            });
        }
    }

    addColorField() {
        if (this.colorCount >= this.maxColors) {
            showAlert("Maximum 10 colors allowed", "error");
            return;
        }
        this.colorCount++;
        const id = this.colorCount;
        // For new fields, suggest next unused CMYK or blank
        let defaultColor = '';
        if (this.cmykIndex < 4) {
            defaultColor = this.cmykQueue[this.cmykIndex];
            this.cmykIndex++;
        }
        const isCMYK = this.cmykQueue.includes(defaultColor);
        const colorField = document.createElement('div');
        colorField.className = 'color-field';
        colorField.id = `color-field-${id}`;
        colorField.style.opacity = '0';
        colorField.style.transform = 'translateY(20px)';
        colorField.innerHTML = this.getColorFieldHTML(id, isCMYK, defaultColor, "#000000");
        document.getElementById('color-fields-container').appendChild(colorField);

        setTimeout(() => {
            colorField.style.transition = 'all 0.3s ease';
            colorField.style.opacity = '1';
            colorField.style.transform = 'translateY(0)';
        }, 50);

        this.setupFieldEventListeners(colorField);
        this.updateCounter();
        this.triggerUpdate();
        if (this.colorCount === 9) {
            showAlert("You will need special approval for this! Contact planet manager.", "warning");
        }
    }

    // Adds a color field with specified value (for populating from DB)
    addColorFieldWithValue(name = '', code = '#000000') {
        if (this.colorCount >= this.maxColors) return;

        // Always increment colorCount for each added field
        this.colorCount++;
        const id = this.colorCount;

        // Mark CMYK index if needed (for new adds)
        if (this.cmykQueue.includes(name)) {
            const idx = this.cmykQueue.indexOf(name);
            if (idx + 1 > this.cmykIndex) this.cmykIndex = idx + 1;
        }

        const isCMYK = this.cmykQueue.includes(name);
        const colorField = document.createElement('div');
        colorField.className = 'color-field';
        colorField.id = `color-field-${id}`;
        colorField.innerHTML = this.getColorFieldHTML(id, isCMYK, name, code);
        document.getElementById('color-fields-container').appendChild(colorField);

        this.setupFieldEventListeners(colorField);
        this.updateCounter();
        this.triggerUpdate();
    }
        // return colors from the server as:
        getColorFieldHTML(id, isCMYK, colorName, colorCode) {
            const isPantoneSelected = colorName && 
                                    !this.cmykQueue.includes(colorName) && 
                                    !['Black FT', 'Gold', 'Silver', 'White'].includes(colorName);
        
            return `
            <div class="color-field-container">
                <style>
                    .color-field-container {
                        display: flex;
                        align-items: flex-start;
                        gap: 10px;
                        margin-bottom: 15px;
                    }
                    .color-field-content {
                        flex-grow: 1;
                    }
                    .remove-btn {
                        margin-top: 25px;
                        white-space: nowrap;
                        height: fit-content;
                    }
                </style>
                
                <div class="color-field-content">
                    <h5>Color ${id}</h5>
                    ${!isPantoneSelected ? `
                        <div class="form-group">
                            <select class="color-select">
                                <option value="">Select Color</option>
                                ${this.cmykQueue.map(color => `
                                    <option value="${color}" ${colorName === color ? 'selected' : ''}>${color}</option>
                                `).join('')}
                                <option value="Black FT" ${colorName === 'Black FT' ? 'selected' : ''}>Black FT</option>
                                <option value="Gold" ${colorName === 'Gold' ? 'selected' : ''}>Gold</option>
                                <option value="Silver" ${colorName === 'Silver' ? 'selected' : ''}>Silver</option>
                                <option value="White" ${colorName === 'White' ? 'selected' : ''}>White</option>
                                <option value="custom" ${isPantoneSelected ? 'selected' : ''}>Pantone</option>
                            </select>
                        </div>
                    ` : ''}
                    <div class="form-group custom-color-group" style="display: ${isPantoneSelected ? 'block' : 'none'};">
                        <input type="text" class="custom-color-input" placeholder="Enter Pantone color" value="${
                            isPantoneSelected ? colorName : ''
                        }">
                    </div>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            </div>
            `;
        }

    setupFieldEventListeners(field) {
        const select = field.querySelector('.color-select');
        const customInput = field.querySelector('.custom-color-input');
        const colorInput = field.querySelector('.color-code-input');
        if (select) {
            select.addEventListener('change', () => {
                const showCustom = select.value === 'custom';
                field.querySelector('.custom-color-group').style.display = showCustom ? 'block' : 'none';
                // Update h5
                const h5 = field.querySelector('h5');
                if (h5) {
                    h5.textContent = showCustom
                        ? (customInput?.value || `Color ${field.id.split('-')[2]}`)
                        : select.value || `Color ${field.id.split('-')[2]}`;
                }
                this.triggerUpdate();
            });
        }
        if (customInput) {
            customInput.addEventListener('input', () => {
                const h5 = field.querySelector('h5');
                if (h5 && select?.value === 'custom') {
                    h5.textContent = customInput.value || `Color ${field.id.split('-')[2]}`;
                }
                this.triggerUpdate();
            });
        }
        if (colorInput) {
            colorInput.addEventListener('change', () => {
                this.triggerUpdate();
            });
        }
    }

    removeColorField(field) {
        if (!field) return;
        const select = field.querySelector('.color-select');
        const wasCMYK = select && this.cmykQueue.includes(select.value);
        field.style.transform = "translateX(-100%)";
        field.style.opacity = "0";
        setTimeout(() => {
            field.remove();
            this.colorCount = Math.max(0, this.colorCount - 1);
            if (wasCMYK && this.cmykIndex > 0) this.cmykIndex--;
            this.updateCounter();
            this.triggerUpdate();
            showAlert("Color removed", "success");
        }, 300);
    }

    updateCounter() {
        const counter = document.getElementById('color-count');
        if (!counter) return;
        if (this.colorCount > 0) {
            counter.textContent = `${this.colorCount} ${this.colorCount === 1 ? "Color" : "Colors"}`;
            counter.style.display = 'inline';
            counter.className = this.colorCount > 8 ? 'red' : this.colorCount > 4 ? 'yellow' : 'green';
        } else {
            counter.textContent = '';
            counter.style.display = 'none';
        }
    }

    collectColors() {
        const colors = [];
        document.querySelectorAll('.color-field').forEach(field => {
            const select = field.querySelector('.color-select');
            let colorValue = '';
            if (select) {
                if (select.value === 'custom') {
                    const customInput = field.querySelector('.custom-color-input');
                    colorValue = customInput?.value.trim() || '';
                } else {
                    colorValue = select.value;
                }
            }
            // Only push if not blank and not "custom" and not "Custom"
            if (
                colorValue &&
                colorValue.toLowerCase() !== 'custom'
            ) {
                colors.push({ name: colorValue });
            }
        });
        return colors;
    }

    getColorHex(colorName) {
        return this.colorHexMap[colorName] || '#000000';
    }

    getColorType(colorName) {
        return ['Cyan', 'Magenta', 'Yellow', 'Black'].includes(colorName)
            ? 'Process'
            : 'Spot';
    }

    triggerUpdate() {
        const event = new CustomEvent('colorFieldsUpdated', {
            detail: { colors: this.collectColors() }
        });
        document.dispatchEvent(event);
    }

    showAlert(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorFields = new ColorFields();
});