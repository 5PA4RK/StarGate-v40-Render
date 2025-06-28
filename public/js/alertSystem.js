/**
 * Enhanced Alert System - Notification System with Custom Timing
 * Usage:
 *   - alertSystem.showAlert("Message", "type", duration) 
 *   - Types: "success", "error", "warning", "info"
 *   - Duration: Optional milliseconds (defaults vary by type)
 */

class AlertSystem {
    constructor() {
        this.alertQueue = [];
        this.isShowingAlert = false;
        this.defaultDurations = {
            info: 3000,
            success: 3000,
            warning: 3000,
            error: 3000
        };
        this.initStyles();
        this.initContainer();
    }

    initStyles() {
        if (!document.getElementById('alertSystemStyles')) {
            const style = document.createElement('style');
            style.id = 'alertSystemStyles';
            style.textContent = `
                .alert-system-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 400px;
                }
                
                .alert-system-alert {
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    transform: translateX(150%);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    animation-duration: 0.4s;
                    animation-fill-mode: forwards;
                }
                
                .alert-system-alert.slide-in {
                    animation-name: alertSystemSlideIn;
                }
                
                .alert-system-alert.slide-out {
                    animation-name: alertSystemSlideOut;
                }
                
                @keyframes alertSystemSlideIn {
                    0% { transform: translateX(150%); opacity: 0; }
                    80% { transform: translateX(-10px); opacity: 1; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes alertSystemSlideOut {
                    0% { transform: translateX(0); opacity: 1; }
                    20% { transform: translateX(-10px); opacity: 1; }
                    100% { transform: translateX(150%); opacity: 0; }
                }
                
                .alert-system-icon {
                    font-size: 1.5em;
                    flex-shrink: 0;
                }
                
                .alert-system-content {
                    flex: 1;
                }
                
                .alert-system-close {
                    cursor: pointer;
                    margin-left: 10px;
                    font-weight: bold;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .alert-system-close:hover {
                    opacity: 1;
                }
                
                /* Alert Types */
                .alert-system-info {
                    background-color: #4a6fa5;
                    border-left: 4px solid #2a4a7a;
                }
                
                .alert-system-success {
                    background-color: #28a745;
                    border-left: 4px solid #1e7e34;
                }
                
                .alert-system-warning {
                    background-color: #ffc107;
                    border-left: 4px solid #e0a800;
                    color: #333;
                }
                
                .alert-system-error {
                    background-color: #dc3545;
                    border-left: 4px solid #c82333;
                }
            `;
            document.head.appendChild(style);
        }
    }

    initContainer() {
        if (!document.getElementById('alertSystemContainer')) {
            const container = document.createElement('div');
            container.id = 'alertSystemContainer';
            container.className = 'alert-system-container';
            document.body.appendChild(container);
        }
    }

    showAlert(message, type = 'info', duration = null) {
        // Use default duration if none provided
        if (duration === null) {
            duration = this.defaultDurations[type] || 4000;
        }

        const alertId = Date.now().toString();
        const alertTypes = {
            info: { class: 'alert-system-info', icon: 'ℹ️' },
            success: { class: 'alert-system-success', icon: '✅' },
            warning: { class: 'alert-system-warning', icon: '⚠️' },
            error: { class: 'alert-system-error', icon: '❌' }
        };

        const alert = document.createElement('div');
        alert.className = `alert-system-alert ${alertTypes[type].class}`;
        alert.id = `alert-${alertId}`;
        alert.innerHTML = `
            <div class="alert-system-icon">${alertTypes[type].icon}</div>
            <div class="alert-system-content">${message}</div>
            <div class="alert-system-close" onclick="alertSystem.removeAlert('${alertId}')">×</div>
        `;

        document.getElementById('alertSystemContainer').appendChild(alert);
        
        // Trigger slide-in animation
        setTimeout(() => {
            alert.classList.add('slide-in');
        }, 10);

        // Add to queue and process
        this.alertQueue.push({
            id: alertId,
            element: alert,
            duration: duration
        });

        this.processQueue();
    }

    removeAlert(alertId) {
        const alertElement = document.getElementById(`alert-${alertId}`);
        if (alertElement) {
            alertElement.classList.remove('slide-in');
            alertElement.classList.add('slide-out');
            
            setTimeout(() => {
                alertElement.remove();
                this.alertQueue = this.alertQueue.filter(alert => alert.id !== alertId);
                this.isShowingAlert = false;
                this.processQueue();
            }, 400);
        }
    }

    processQueue() {
        if (this.alertQueue.length > 0 && !this.isShowingAlert) {
            this.isShowingAlert = true;
            const currentAlert = this.alertQueue[0];
            
            setTimeout(() => {
                this.removeAlert(currentAlert.id);
            }, currentAlert.duration);
        }
    }
}

// Create global instance
const alertSystem = new AlertSystem();

// Make it available globally
window.alertSystem = alertSystem;
window.showAlert = (message, type, duration) => alertSystem.showAlert(message, type, duration);

/* 
HOW TO USE (call these in response to actual events):

// Basic usage with default timing
alertSystem.showAlert("File saved successfully", "success");

// Warning with longer duration
alertSystem.showAlert("Low disk space", "warning", 8000);

// Error that can't be dismissed quickly
alertSystem.showAlert("Connection lost!", "error", 10000);

// Info message with short duration
alertSystem.showAlert("New message received", "info", 2000);
*/