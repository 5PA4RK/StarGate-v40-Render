// plyFields.js
let plyCount = 0;

class PlyFields {
    constructor() {
        this.plyCount = 0;
        this.initialize();
    }

    initialize() {
        this.setupContainer();
        this.setupEventListeners();
    }

    setupContainer() {
        let container = document.getElementById('ply-fields');
        if (!container) {
            container = document.createElement('div');
            container.id = 'ply-fields';
            document.querySelector('#aw-section .card').appendChild(container);
        }
        container.innerHTML = '';
        this.plyCount = 0;
        this.updateCounter();
    }

    setupEventListeners() {
        document.getElementById('add-ply-btn').addEventListener('click', () => this.addPLYField());
        
        document.getElementById('ply-fields').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const plyField = e.target.closest('.ply-field');
                if (plyField) {
                    this.removePLYField(plyField);
                }
            }
        });
    }

    addPLYField() {
        if (this.plyCount >= 4) {
            showAlert("Maximum 4 PLY entries allowed", "error");
            return;
        }

        this.plyCount++;
        const id = this.plyCount;

        const plyField = document.createElement('div');
        plyField.className = 'ply-field';
        plyField.id = `ply-field-${id}`;
        plyField.style.opacity = '0';
        plyField.style.transform = 'translateY(20px)';
        plyField.innerHTML = this.getPLYFieldHTML(id);

        document.getElementById('ply-fields').appendChild(plyField);
        
        setTimeout(() => {
            plyField.style.transition = 'all 0.3s ease';
            plyField.style.opacity = '1';
            plyField.style.transform = 'translateY(0)';
        }, 50);

        this.setupFieldEventListeners(plyField);
        this.updateCounter();
        this.triggerUpdate();
    }

    getPLYFieldHTML(id) {
        return `
            <h5>${id === 1 ? "Printed PLY" : `PLY ${id}`}</h5>
            <div class="form-group">
                <select id="ply-material-${id}" class="ply-material enhanced-select" required>
                    <option value="" selected disabled>Select Material</option>
                    <option value="PE">PE</option>
                    <option value="HDPE">HDPE</option>
                    <option value="LDPE">LDPE</option>
                    <option value="PET">PET</option>
                    <option value="OPP">OPP</option>
                </select>
            </div>
            
            <div class="form-group">
                <select id="ply-finish-${id}" class="ply-finish enhanced-select" required>
                    <option value="" selected disabled>Select Finish</option>
                    <option value="White">White</option>
                    <option value="Transparent">Transparent</option>
                    <option value="Matt">Matt</option>
                    <option value="Colored">Colored</option>
                </select>
            </div>
            
            <div class="form-group">
                <select id="ply-thickness-${id}" class="ply-thickness enhanced-select" required>
                    <option value="" selected disabled>Select Thickness (µm)</option>
                    <option value="12">12 µm</option>
                    <option value="20">20 µm</option>
                    <option value="25">25 µm</option>
                    <option value="30">30 µm</option>
                    <option value="40">40 µm</option>
                    <option value="50">50 µm</option>
                    <option value="60">60 µm</option>
                    <option value="70">70 µm</option>
                    <option value="80">80 µm</option>
                    <option value="90">90 µm</option>
                    <option value="100">100 µm</option>
                </select>
            </div>
            
            <button type="button" class="remove-btn">
                Remove PLY
            </button>
        `;
    }

    setupFieldEventListeners(field) {
        const selects = field.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', () => this.triggerUpdate());
        });
    }

    removePLYField(field) {
        if (!field) return;
        
        field.style.transform = "translateX(-100%)";
        field.style.opacity = "0";

        setTimeout(() => {
            field.remove();
            this.plyCount--;
            this.updatePLYNumbers();
            this.updateCounter();
            this.triggerUpdate();
            showAlert("PLY removed", "success");
        }, 300);
    }

    updatePLYNumbers() {
        const plyFields = document.querySelectorAll('.ply-field');
        plyFields.forEach((field, index) => {
            const h5 = field.querySelector('h5');
            h5.textContent = index === 0 ? "Printed PLY" : `PLY ${index + 1}`;
            field.id = `ply-field-${index + 1}`;
        });
    }

    updateCounter() {
        const counter = document.getElementById('ply-count');
        if (!counter) return;
        
        counter.textContent = this.plyCount > 0 ? `${this.plyCount} ${this.plyCount === 1 ? "PLY" : "PLYs"}` : '';
        counter.style.display = this.plyCount > 0 ? 'inline' : 'none';
    }

    collectPLYs() {
        const plys = [];
        document.querySelectorAll('.ply-field').forEach(field => {
            const id = field.id.split('-')[2];
            const material = field.querySelector('.ply-material').value;
            const finish = field.querySelector('.ply-finish').value;
            const thickness = field.querySelector('.ply-thickness').value;

            if (material || finish || thickness) {
                plys.push({
                    id: id,
                    material: material,
                    finish: finish,
                    thickness: thickness
                });
            }
        });
        
        return plys;
    }

    populateFromData(plies) {
        // Clear existing fields
        this.setupContainer();
        
        if (!plies || plies.length === 0) return;
        
        // Add fields for each PLY
        plies.forEach(ply => {
            this.addPLYField();
            
            // Get the newly added field
            const field = document.getElementById(`ply-field-${this.plyCount}`);
            
            // Set values
            if (ply.material) {
                field.querySelector('.ply-material').value = ply.material;
            }
            if (ply.finish) {
                field.querySelector('.ply-finish').value = ply.finish;
            }
            if (ply.thickness) {
                field.querySelector('.ply-thickness').value = ply.thickness;
            }
        });
    }


    triggerUpdate() {
        const event = new CustomEvent('plyFieldsUpdated', {
            detail: { plys: this.collectPLYs() }
        });
        document.dispatchEvent(event);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.plyFields = new PlyFields();
});