/* sliding Search panal control */

document.addEventListener('DOMContentLoaded', function() {
    const panelHandle = document.getElementById('panel-handle');
    const collapseHandle = document.getElementById('collapse-handle');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const container = document.querySelector('.container');
    const minWidth = 200;
    const maxWidthPercent = 0.5;

    let isResizing = false;
    let isCollapsed = false;
    let startX, startWidth;
    let collapseStartX, isCollapsing = false;

    // Toggle panel collapse/expand
    function togglePanel() {
        isCollapsed = !isCollapsed;
        
        if (isCollapsed) {
            // Store current width before collapsing
            leftPanel.dataset.previousWidth = leftPanel.offsetWidth + 'px';
            leftPanel.classList.add('collapsed');
            rightPanel.style.flex = '1';
        } else {
            // Restore to previous width or default
            const widthToRestore = leftPanel.dataset.previousWidth || '300px';
            leftPanel.style.width = widthToRestore;
            leftPanel.classList.remove('collapsed');
            rightPanel.style.flex = '';
        }
    }

    // Start collapse drag
    function startCollapseDrag(e) {
        isCollapsing = true;
        collapseStartX = e.clientX || e.touches[0].clientX;
        document.addEventListener('mousemove', doCollapseDrag);
        document.addEventListener('mouseup', stopCollapseDrag);
        document.addEventListener('touchmove', doCollapseDrag, { passive: false });
        document.addEventListener('touchend', stopCollapseDrag);
        e.preventDefault();
    }

    // Handle collapse drag
    function doCollapseDrag(e) {
        if (!isCollapsing) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const dragDistance = clientX - collapseStartX;
        
        // If dragged more than 20px to the right, collapse
        if (dragDistance > 20 && !isCollapsed) {
            togglePanel();
            stopCollapseDrag();
        }
        // If dragged more than 20px to the left, expand
        else if (dragDistance < -20 && isCollapsed) {
            togglePanel();
            stopCollapseDrag();
        }
    }

    // Clean up after collapse drag
    function stopCollapseDrag() {
        isCollapsing = false;
        document.removeEventListener('mousemove', doCollapseDrag);
        document.removeEventListener('mouseup', stopCollapseDrag);
        document.removeEventListener('touchmove', doCollapseDrag);
        document.removeEventListener('touchend', stopCollapseDrag);
    }

    // Event listeners for the collapse handle
    collapseHandle.addEventListener('click', function(e) {
        if (!isCollapsing) {
            togglePanel();
            e.stopPropagation();
        }
    });

    collapseHandle.addEventListener('mousedown', startCollapseDrag);
    collapseHandle.addEventListener('touchstart', startCollapseDrag, { passive: false });

    // Initialize
    if (!leftPanel.style.width) {
        leftPanel.style.width = '300px';
    }






});