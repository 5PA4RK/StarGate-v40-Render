//liveStream.js
// Always register this event handler at the top level, NOT inside DOMContentLoaded!
document.addEventListener('liveStreamSectionShown', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        loadJobs();
        setupAutoRefresh();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const jobStream = document.getElementById('job-stream');
    const jobSearch = document.getElementById('job-search');
    const statusFilter = document.getElementById('status-filter');

    // Double-Click, Go Home
    jobStream.addEventListener('dblclick', function(event) {
        const jobCard = event.target.closest('.job-card');
        if (!jobCard) return;

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const groupId = currentUser.group_id;

        const homeMap = {
            1: {section: 'files-section', button: 'btn-files'},      // Admin
            2: {section: 'aw-section', button: 'btn-aw'},            // Prepress
            3: {section: 'qc-section', button: 'btn-qc'},            // QC
            4: {section: 'planning-section', button: 'btn-planning'},// Planning
            5: {section: 'sales-section', button: 'btn-sales'},      // Sales
            8: {section: 'files-section', button: 'btn-files'},      // Maintenance
        };

        if (homeMap[groupId]) {
            showSection(homeMap[groupId].section, homeMap[groupId].button);
            showAlert('Redirected to your home section.', 'info');
        } else {
            showSection('results-section', 'btn-results');
        }
    });

    // State Management
    let refreshInterval;
    let currentScrollPosition = 0;
    let firstVisibleJobId = null;
    let isLoading = false;
    let pendingRefresh = false;
    
    async function loadJobs() {
        if (isLoading) return;
        isLoading = true;
        try {
            saveScrollState();
            showLoadingIndicator();
            const apiUrl = buildApiUrl();
            const jobs = await fetchJobs(apiUrl);
            jobStream.innerHTML = ''; // This clears the selection - we'll handle it in renderJobs
            
            renderJobs(jobs);
            
            // Preserve the search filter after refresh
            const searchInput = document.getElementById('job-search');
            if (searchInput && currentFilters.search) {
                searchInput.value = currentFilters.search;
            }
            
            applyAllFilters();
            
        } catch (error) {
            handleLoadError(error);
        } finally {
            isLoading = false;
        }
    }

    let currentFilters = {
        search: '',
        status: '',
        printingType: '', 
        productType: '', 
        showMine: false, 
        notAssigned: false,
        needAction: false // new filter
    };

    function hideNoResultsMessage() {
        const existingMessage = document.querySelector('.no-jobs, #no-results-message');
        if (existingMessage) {
          existingMessage.remove();
        }
      }


// Unified filter application
function applyAllFilters() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const currentUserName = currentUser.fullName || '';
    const currentGroupId = currentUser.group_id || 0;
    let hasVisibleJobs = false;

    document.querySelectorAll('.job-card').forEach(card => {
        // Get all relevant data attributes
        const jobNumber = card.dataset.jobId || '';
        const jobName = card.dataset.jobName || '';
        const customerName = card.dataset.customerName || '';
        const salesman = card.dataset.salesman || '';
        const handlerName = card.dataset.handlerName || '';
        const status = card.dataset.status || '';
        const pressType = card.dataset.pressType || '';
        const productType = card.dataset.productType || '';

        // Start with assuming the card should be visible
        let shouldShow = true;

        // --- Unified SEARCH filter: search all possible text fields (job number, job name, customer, salesman, handler) ---
        if (currentFilters.search) {
            const searchText = `${jobNumber} ${jobName} ${customerName} ${salesman} ${handlerName}`.toLowerCase();
            shouldShow = shouldShow && searchText.includes(currentFilters.search.toLowerCase());
        }

        // --- "Need Action" filter ---
        if (currentFilters.needAction) {
            let showBasedOnStatus = false;

            // Sales group (5) "Or Admins"
            if (currentGroupId === 5 || currentGroupId === 1) {
                const isMyJob = salesman.includes(currentUserName);
                const statusMatch = [
                    'Under Review',
                    'Financially Approved',
                    'Technically Approved',
                    'Need SC Approval',
                    'Need Cromalin Approval',
                    'On Hold'
                ].includes(status);

                showBasedOnStatus = isMyJob && statusMatch;
            }
            // Prepress group (2)
            else if (currentGroupId === 2) {
                const isMyJob = handlerName.includes(currentUserName);
                const statusMatch = [
                    'Working on softcopy',
                    'SC Checked, Need Cromalin',
                    'SC Checked, Need Plates',
                    'Working on Cromalin',
                    'Working on Repro'
                ].includes(status);

                showBasedOnStatus = isMyJob && statusMatch;
            }
            // QC group (3)
            else if (currentGroupId === 3) {
                const statusMatch = [
                    'SC Under QC Check',
                    'Prepress Received Plates',
                    'QC Received Plates'
                ].includes(status);

                showBasedOnStatus = statusMatch;
            }
            // Planning group (4)
            else if (currentGroupId === 4) {
                const statusMatch = [
                    'Working on Job-Study',
                    'Ready for Press'
                ].includes(status);

                showBasedOnStatus = statusMatch;
            }
            // Production group (6)
            else if (currentGroupId === 6) {
                const statusMatch = [
                    'Ready for Press'
                ].includes(status);

                showBasedOnStatus = statusMatch;
            }

            shouldShow = shouldShow && showBasedOnStatus;
        }

        // --- Not Assigned filter ---
        if (currentFilters.notAssigned) {
            shouldShow = shouldShow && !handlerName.trim();
        }

        // --- Show Mine filter ---
        if (currentFilters.showMine) {
            shouldShow = shouldShow &&
                (salesman.includes(currentUserName) ||
                 handlerName.includes(currentUserName));
        }

        // --- Status filter ---
        if (currentFilters.status) {
            shouldShow = shouldShow && (status === currentFilters.status);
        }

        // --- Printing Type filter ---
        if (currentFilters.printingType) {
            const typeMap = {
                'stack': 'Stack Type',
                'central': 'Central Drum',
                'unprinted': 'Unprinted'
            };
            shouldShow = shouldShow &&
                (pressType.includes(typeMap[currentFilters.printingType]));
        }

        // --- Product Type filter ---
        if (currentFilters.productType) {
            const typeMap = {
                'center-seal': 'Center Seal',
                '2-side': '2 Side',
                '3-side': '3 Side',
                '3-side-k': '3 Side K',
                '3-side-stand-up': '3 Side Stand Up',
                '4-side': '4 Side',
                'normal-bag': 'Normal Bag',
                'chicken-bag': 'Chicken Bag',
                'flat-bottom': 'Flat Bottom',
                'shopping-bag': 'Shopping Bag',
                'tShirt-bag': 'T-Shirt Bag',
                'roll': 'Roll'
            };
            const expectedProductType = typeMap[currentFilters.productType];
            shouldShow = shouldShow && (productType === expectedProductType);
        }

        // --- Apply the final visibility ---
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) hasVisibleJobs = true;
    });

    if (!hasVisibleJobs) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

  //==============================================
    // Make these functions globally available
    window.loadJobs = loadJobs;
    window.setupAutoRefresh = setupAutoRefresh;

    // Check if results section is already visible AND user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (document.getElementById('results-section')?.style.display === 'block' && currentUser) {
        loadJobs();
        setupAutoRefresh();
    }

    // Loads jobs when results button is clicked
    document.getElementById('btn-results')?.addEventListener('click', function() {
        loadJobs();
        setupAutoRefresh();
    });
    document.getElementById('printing-type').addEventListener('change', function() {
        currentFilters.printingType = this.value;
        filterJobs();
    });

    // 2. Add event listener for product filter
    document.getElementById('product').addEventListener('change', function() {
        currentFilters.productType = this.value;
        filterJobs();
    });


// Not Assigned filter - REMOVED mutual exclusion
document.getElementById('not-assigned').addEventListener('change', function() {
    currentFilters.notAssigned = this.checked;
    document.getElementById('job-stream').classList.toggle('not-assigned-filter-active', this.checked);
    
    if (currentFilters.notAssigned || currentFilters.showMine) {
      applyAllFilters();
    } else {
      loadJobs();
    }
  });

// Show Mine filter - REMOVED mutual exclusion
document.getElementById('show-mine').addEventListener('change', function() {
    currentFilters.showMine = this.checked;
    
    if (currentFilters.notAssigned || currentFilters.showMine) {
      applyAllFilters();
    } else {
      loadJobs();
    }
  });

  // Need Action filter
document.getElementById('need-action').addEventListener('change', function() {
    currentFilters.needAction = this.checked;
    if (this.checked || currentFilters.notAssigned || currentFilters.showMine) {
        applyAllFilters();
    } else {
        loadJobs();
    }
});

// NEW FUNCTION: Reset all filters visually
function resetAllFilters() {
    document.getElementById('job-stream').classList.remove('not-assigned-filter-active');
    document.getElementById('need-action').checked = false;
    currentFilters.needAction = false;
    
    document.querySelectorAll('.job-card').forEach(card => {
        card.style.display = 'block';
    });
    
    // Reapply any active filters
    if (currentFilters.showMine) {
        applyShowMineFilter();
    }
    if (currentFilters.search || currentFilters.status || 
        currentFilters.printingType || currentFilters.productType) {
        filterJobs();
    }
}

    // Search and filter functionality
    jobSearch.addEventListener('input', debounce(function() {
        currentFilters.search = this.value.trim().toLowerCase();
        filterJobs();
    }, 300));

    statusFilter.addEventListener('change', function() {
        currentFilters.status = this.value;
        filterJobs();
    });

    // Main job loading function
    async function loadJobs() {
        if (isLoading) return;
        isLoading = true;
        try {
            saveScrollState();
            showLoadingIndicator();
            const apiUrl = buildApiUrl();
            const jobs = await fetchJobs(apiUrl);
            jobStream.innerHTML = '';
            renderJobs(jobs);
    
            // Patch: Sync filter state from inputs (especially the search box)
            const searchBox = document.getElementById('job-search');
            if (searchBox) {
                currentFilters.search = searchBox.value.trim().toLowerCase();
            }
    
            applyAllFilters();
    
        } catch (error) {
            handleLoadError(error);
        } finally {
            isLoading = false;
        }
    }

// Updated applyShowMineFilter to work with Not Assigned
function applyShowMineFilter() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const currentUserName = currentUser.fullName || '';
    let hasVisibleJobs = false;

    document.querySelectorAll('.job-card').forEach(card => {
        const isVisible = card.style.display !== 'none';
        if (!isVisible) return;
        
        const salesman = card.dataset.salesman || '';
        const handlerName = card.dataset.handlerName || '';
        
        // Show if: (it's mine) AND (if Not Assigned is on, must be unassigned)
        const shouldShow = (salesman.includes(currentUserName) || 
                          handlerName.includes(currentUserName)) &&
                         (!currentFilters.notAssigned || !handlerName.trim());
        
        card.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) hasVisibleJobs = true;
    });

    if (!hasVisibleJobs) {
        showNoResultsMessage();
    }
}

// Helper function to build API URL with all filters
function buildApiUrl() {
    const params = new URLSearchParams();
    
    if (currentFilters.search) {
        // Tell the server to search in job_number, job_name, customer_name, salesman, AND handler_name
        params.append('search', currentFilters.search);
        params.append('search_fields', 'job_number,job_name,customer_name,salesman,handler_name');
    }
    
    if (currentFilters.status) params.append('status', currentFilters.status);
    
    if (currentFilters.printingType) {
        params.append('press_type', 
            currentFilters.printingType === 'stack' ? 'Stack Type' :
            currentFilters.printingType === 'central' ? 'Central Drum' :
            'Unprinted'
        );
    }
    
    if (currentFilters.productType) {
        const productTypeMap = {
            'center-seal': 'Center Seal',
            '2-side': '2 Side',
            '3-side': '3 Side',
            '3-side-k': '3 Side K',
            '3-side-stand-up': '3 Side Stand Up',
            '4-side': '4 Side',
            'normal-bag': 'Normal Bag',
            'chicken-bag': 'Chicken Bag',
            'flat-bottom': 'Flat Bottom',
            'shopping-bag': 'Shopping Bag',
            'tShirt-bag': 'T-Shirt Bag',  // Make sure this matches your HTML value
            'roll': 'Roll'
        };
        params.append('product_type', productTypeMap[currentFilters.productType]);
    }
    
    if (currentFilters.notAssigned) {
        params.append('not_assigned', 'true');
    }
    
    if (currentFilters.needAction) {
        params.append('need_action', 'true');
    }
    
    return `/api/all-jobs?${params.toString()}`;
}

    async function fetchJobs(url) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    function applyNotAssignedFilter() {
        let hasVisibleCards = false;
        
        document.querySelectorAll('.job-card').forEach(card => {
            const handlerName = card.dataset.handlerName || '';
            const shouldShow = !handlerName.trim(); // Show only if no handler is assigned
            
            card.style.display = shouldShow ? 'block' : 'none';
            if (shouldShow) hasVisibleCards = true;
        });
        
        if (!hasVisibleCards) {
            showNoResultsMessage('No unassigned jobs found');
        }
    }
    function processJobResponse(jobs) {
        removeLoadingIndicator();
        
        if (!Array.isArray(jobs)) {
            showNoResultsMessage();
            return;
        }
    
        renderJobs(jobs);
        
        // Reapply selection after render if needed
        if (currentlySelectedJobId) {
            const selectedCard = document.querySelector(`.job-card[data-job-id="${currentlySelectedJobId}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            } else {
                currentlySelectedJobId = null; // Selection no longer exists
            }
        }
        
        setTimeout(restoreScrollState, 0);
    }

    function saveScrollState() {
        const firstVisibleJob = document.elementFromPoint(
            jobStream.getBoundingClientRect().left + 10,
            jobStream.getBoundingClientRect().top + 10
        )?.closest('.job-card');
        firstVisibleJobId = firstVisibleJob?.dataset.jobId || null;
        currentScrollPosition = jobStream.scrollTop;
    }

    function restoreScrollState() {
        if (firstVisibleJobId) {
            const targetJob = document.querySelector(`.job-card[data-job-id="${firstVisibleJobId}"]`);
            if (targetJob) {
                const containerTop = jobStream.getBoundingClientRect().top;
                const jobTop = targetJob.getBoundingClientRect().top;
                jobStream.scrollTop = currentScrollPosition + (jobTop - containerTop);
                return;
            }
        }
        jobStream.scrollTop = currentScrollPosition;
    }

    function renderJobs(jobs) {
        // Store the current selection before re-rendering
        const wasSelected = currentlySelectedJobId;
        
        // Create a Set of current job numbers in DOM
        const existingJobNumbers = new Set(
            Array.from(document.querySelectorAll('.job-card'))
                .map(card => card.dataset.jobId)
        );
        
        // Sort jobs by date (newest first)
        const sortedJobs = [...jobs].sort((a, b) => 
            new Date(b.created_date) - new Date(a.created_date)
        );
        
        // Process each job
        sortedJobs.forEach(job => {
            const existingCard = document.querySelector(`.job-card[data-job-id="${job.job_number}"]`);
            
            if (existingCard) {
                updateJobCard(existingCard, job);
            } else {
                const newCard = createJobCard(job);
                jobStream.appendChild(newCard);
            }
            
            // Restore selection if this was the selected job
            if (wasSelected === job.job_number) {
                const card = document.querySelector(`.job-card[data-job-id="${job.job_number}"]`);
                if (card) {
                    card.classList.add('selected');
                    currentlySelectedJobId = job.job_number; // Maintain selection
                }
            }
        });
        
        // Remove any cards that shouldn't exist anymore
        document.querySelectorAll('.job-card').forEach(card => {
            if (!jobs.some(job => job.job_number === card.dataset.jobId)) {
                // If we're removing the selected card, clear the selection
                if (currentlySelectedJobId === card.dataset.jobId) {
                    currentlySelectedJobId = null;
                }
                card.remove();
            }
        });
        
        const countElement = document.getElementById('job-count');
        if (countElement) {
            countElement.textContent = `Showing ${jobs.length} jobs`;
        }
    }

    function getInsertionPoint(job, sortedJobs) {
        const currentIndex = sortedJobs.indexOf(job);
        if (currentIndex === -1 || currentIndex === sortedJobs.length - 1) return null;
        const nextJobId = sortedJobs[currentIndex + 1].job_number;
        return document.querySelector(`.job-card[data-job-id="${nextJobId}"]`);
    }

    function createJobCard(job) {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        // Add 'unassigned' class if no handler
        if (!job.handler_name?.trim()) {
            jobCard.classList.add('unassigned');
        }
        jobCard.dataset.jobId = job.job_number;
        jobCard.dataset.jobNumber = job.job_number;
        jobCard.dataset.jobName = job.job_name;
        jobCard.dataset.customerName = job.customer_name;
        jobCard.dataset.salesman = job.salesman || 'Not specified';
        jobCard.dataset.handlerName = job.handler_name || ''; // Add handler name to dataset
        jobCard.dataset.createdDate = formatDateDisplay(job.created_date);
        jobCard.dataset.status = job.status;
        jobCard.dataset.pressType = job.press_type || '';
        jobCard.dataset.productType = job.product_type || '';
        jobCard.dataset.quantity = job.quantity || '';
        jobCard.dataset.quantityUnit = job.quantity_unit || '';
    
        let allowedEdit = false, allowedClone = false, allowedDelete = false;
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const groupId = currentUser.group_id;
            allowedEdit = [1, 2, 8].includes(groupId);
            allowedClone = [1, 5, 8].includes(groupId);
            allowedDelete = [1, 8].includes(groupId);
        } catch (e) { /* fallback to no permissions */ }
    
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const statusOptions = getAvailableStatusOptions(job.status, currentUser.group_id);
        const statusDate = job.status_date || job.created_date;
        const daysSinceStatus = statusDate ? calculateDaysSince(statusDate) : 'N/A';
    
        const statusDropdownHTML = statusOptions.length > 0 ? `
            <div class="status-dropdown-wrapper">
                <button class="status-dropdown-toggle" aria-label="Change status">
                    <span class="toggle-icon">▼</span>
                </button>
                <div class="status-dropdown-menu">
                    ${statusOptions.map(option => `
                        <button class="status-dropdown-option" data-value="${option.value}" type="button">
                            ${option.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        ` : '';
    
        jobCard.innerHTML = `
            <div class="job-card-wrapper">
                <div class="job-card-content">
                    <div class="job-card-header">
                        <h3>${job.job_number}: ${job.job_name}</h3>
                        <div class="status-controls-container">
                            <div class="status-controls">
                                <span class="status ${getStatusClass(job.status)}">${job.status}</span>
                                ${statusDropdownHTML}
                                <span class="status-days">${daysSinceStatus} Days</span>
                            </div>
                        </div>
                    </div>
                    <div class="job-meta">
                        <div><strong>Customer:</strong> ${job.customer_name}</div>
                        <div><strong>Salesman:</strong> ${job.salesman || 'Not specified'}</div>
                        <div><strong>Created:</strong> ${formatDateDisplay(job.created_date)}</div>
                    </div>
                </div>
                <div class="job-actions">
                    ${allowedEdit ? `<button class="edit-job-btn" data-job-number="${job.job_number}">
                        <i class="fas fa-edit"></i> Edit
                    </button>` : ''}
                    ${allowedClone ? `<button class="clone-job-btn" data-job-number="${job.job_number}">
                        <i class="fas fa-copy"></i> Clone
                    </button>` : ''}
                    ${allowedDelete ? `<button class="delete-job-btn" data-job-number="${job.job_number}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>` : ''}
                </div>
            </div>`;
    
        // Add method to refresh status dropdown
        jobCard.refreshStatusDropdown = function(newStatus) {
            const statusOptions = getAvailableStatusOptions(newStatus, currentUser.group_id);
            const dropdownMenu = jobCard.querySelector('.status-dropdown-menu');
            
            if (dropdownMenu) {
                dropdownMenu.innerHTML = statusOptions.map(option => `
                    <button class="status-dropdown-option" data-value="${option.value}" type="button">
                        ${option.label}
                    </button>
                `).join('');
    
                // Reattach event listeners to new options
                dropdownMenu.querySelectorAll('.status-dropdown-option').forEach(option => {
                    option.addEventListener('click', async (e) => {
                        e.stopPropagation();
                        const newStatus = option.dataset.value;
                        const dropdownWrapper = option.closest('.status-dropdown-wrapper');
                        const toggle = dropdownWrapper.querySelector('.status-dropdown-toggle');
                        const menu = dropdownWrapper.querySelector('.status-dropdown-menu');
                        
                        // Close dropdown
                        menu.classList.remove('show');
                        toggle.querySelector('.toggle-icon').style.transform = '';
                        
                        try {
                            const response = await fetch('/api/update-job-status', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    jobNumber: job.job_number,
                                    newStatus,
                                    handler_id: currentUser.id,
                                    notes: 'Status changed via dropdown'
                                })
                            });
    
                            const result = await response.json();
                            if (!response.ok || !result.success) {
                                throw new Error(result.message || 'Failed to update status');
                            }
    
                            // Update the status display
                            const statusSpan = jobCard.querySelector('.status');
                            if (statusSpan) {
                                statusSpan.textContent = newStatus;
                                statusSpan.className = `status ${getStatusClass(newStatus)}`;
                                jobCard.dataset.status = newStatus;
                            }
    
                            // Refresh the dropdown options for the new status
                            jobCard.refreshStatusDropdown(newStatus);
    
                            showNotification(`Status updated to ${newStatus}`, 'success');
                            loadJobs();
                        } catch (error) {
                            console.error('Status update error:', error);
                            showNotification(error.message || 'Failed to update status', 'error');
                        }
                    });
                });
            }
        };
    
        // Initialize dropdown functionality if options exist
        if (statusOptions.length > 0) {
            const dropdownWrapper = jobCard.querySelector('.status-dropdown-wrapper');
            const toggle = dropdownWrapper.querySelector('.status-dropdown-toggle');
            const menu = dropdownWrapper.querySelector('.status-dropdown-menu');
            let isOpen = false;
    
            const toggleMenu = (show) => {
                isOpen = show ?? !isOpen;
                menu.classList.toggle('show', isOpen);
                toggle.setAttribute('aria-expanded', isOpen);
                toggle.querySelector('.toggle-icon').style.transform = isOpen ? 'rotate(180deg)' : '';
            };
    
            // Toggle dropdown on button click
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close all other dropdowns first
                document.querySelectorAll('.status-dropdown-menu.show').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('show');
                        const parentToggle = openMenu.closest('.status-dropdown-wrapper').querySelector('.status-dropdown-toggle');
                        if (parentToggle) {
                            parentToggle.querySelector('.toggle-icon').style.transform = '';
                        }
                    }
                });
                
                // Toggle current dropdown
                toggleMenu();
            });
    
            // Set up option click handlers
            menu.querySelectorAll('.status-dropdown-option').forEach(option => {
                option.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const newStatus = option.dataset.value;
                    toggleMenu(false);
                    
                    try {
                        const response = await fetch('/api/update-job-status', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                jobNumber: job.job_number,
                                newStatus,
                                handler_id: currentUser.id,
                                notes: 'Status changed via dropdown'
                            })
                        });
    
                        const result = await response.json();
                        if (!response.ok || !result.success) {
                            throw new Error(result.message || 'Failed to update status');
                        }
    
                        // Update the status display
                        const statusSpan = jobCard.querySelector('.status');
                        if (statusSpan) {
                            statusSpan.textContent = newStatus;
                            statusSpan.className = `status ${getStatusClass(newStatus)}`;
                            jobCard.dataset.status = newStatus;
                        }
    
                        // Refresh the dropdown options for the new status
                        jobCard.refreshStatusDropdown(newStatus);
    
                        showNotification(`Status updated to ${newStatus}`, 'success');
                        loadJobs();
                    } catch (error) {
                        console.error('Status update error:', error);
                        showNotification(error.message || 'Failed to update status', 'error');
                    }
                });
            });
    
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdownWrapper.contains(e.target)) {
                    toggleMenu(false);
                }
            });
    
            // Close dropdown on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isOpen) {
                    toggleMenu(false);
                }
            });
        }
    
        return jobCard;
    }
// to refreshed after status changes, after successful status update:
async function handleStatusChange(jobNumber, newStatus) {
    try {
        const result = await updateJobStatus(jobNumber, newStatus);
        if (result.success) {
            // Refresh the job list
            if (typeof loadJobs === 'function') loadJobs();
            
            // If this job is currently being viewed, refresh its data
            const currentJobNumber = getValue('job-number');
            if (currentJobNumber === jobNumber) {
                await loadDepartmentData(jobNumber);
                
                // Special handling for SC Approval status
                if (newStatus === 'SC Under QC Check') {
                    document.getElementById('softcopy-approval').checked = true;
                }
            }
            
            showNotification(`Status updated to ${newStatus}`, 'success');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}
// Track currently selected job
let currentlySelectedJobId = null;
    // Status change handlers
    jobStream.addEventListener('click', function(event) {
        const jobCard = event.target.closest('.job-card');
        if (jobCard && jobCard.style.display !== 'none') {
            // Store selected job ID
            currentlySelectedJobId = jobCard.dataset.jobId;
            
            // Update UI
            document.querySelectorAll('.job-card').forEach(card => {
                card.classList.remove('selected');
            });
            jobCard.classList.add('selected');
        }
    });

// Updated status dropdown change handler
// Updated status dropdown change handler
jobStream.addEventListener('change', async function(event) {
    const statusDropdown = event.target.closest('.status-dropdown');
    if (!statusDropdown) return;

    const jobNumber = statusDropdown.dataset.jobNumber;
    const newStatus = statusDropdown.value;

    if (!newStatus) return;

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        
        // Special handling for statuses that need checkbox updates
        if (newStatus === 'SC Under QC Check') { // For SC Approval
            // Update prepress data to mark softcopy as approved
            const prepressResponse = await fetch('/api/save-prepress-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    sc_sent_to_qc: true,
                    handler_id: currentUser.id,
                    requestId: Date.now()
                })
            });
            
            const prepressResult = await prepressResponse.json();
            if (!prepressResponse.ok || !prepressResult.success) {
                throw new Error(prepressResult.message || 'Failed to update prepress data');
            }
        }
        else if (newStatus === 'Working on Repro') { // For Cromalin Approved, Preparing Repro
            // Update prepress data to mark both checkboxes
            const prepressResponse = await fetch('/api/save-prepress-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobNumber,
                    cromalin_qc_check: true,  // For Cromalin Approval checkbox
                    working_on_repro: true,   // For Ask Supplier for Repro checkbox
                    handler_id: currentUser.id,
                    requestId: Date.now()
                })
            });
            
            const prepressResult = await prepressResponse.json();
            if (!prepressResponse.ok || !prepressResult.success) {
                throw new Error(prepressResult.message || 'Failed to update prepress data');
            }
        }

        // Then update the status
        const response = await fetch('/api/update-job-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobNumber,
                newStatus,
                handler_id: currentUser.id,
                notes: 'Status changed via dropdown'
            })
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to update status');
        }

        // Update UI
        const statusSpan = statusDropdown.closest('.status-controls').querySelector('.status');
        if (statusSpan) {
            statusSpan.textContent = newStatus;
            statusSpan.className = `status ${getStatusClass(newStatus)}`;
        }

        const jobCard = statusDropdown.closest('.job-card');
        if (jobCard) {
            jobCard.dataset.status = newStatus;
        }

        // If we're on the prepress section and viewing this job, update the checkboxes
        const currentJobNumber = getValue('job-number');
        if (currentJobNumber === jobNumber) {
            if (newStatus === 'SC Under QC Check') {
                document.getElementById('softcopy-approval').checked = true;
            }
            else if (newStatus === 'Working on Repro') {
                document.getElementById('aw-cromalin-approval').checked = true;
                document.getElementById('aw-working-repro').checked = true;
            }
        }

        showNotification(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
        console.error('Status update error:', error);
        showNotification(error.message || 'Failed to update status', 'error');
    } finally {
        statusDropdown.value = '';
    }
});

    // Helper function to calculate days since a date
    function calculateDaysSince(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) return 'N/A';
        
        const today = new Date();
        const diffTime = today - date;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function getAvailableStatusOptions(currentStatus, userGroupId) {
        const statusWorkflow = {
            'Under Review': [
                { value: 'Financially Approved', display: 'Financially Approved', groups: [5, 8, 1] },
                { value: 'Technically Approved', display: 'Technically Approved', groups: [5, 8, 1] }
            ],
            'Financially Approved': [
                { value: 'Technically Approved', display: 'Technically Approved', groups: [5, 8, 1] },

            ],
            'Technically Approved': [
                { value: 'Working on Job-Study', display: 'Working on Job-Study', groups: [5, 8, 1 ] }
            ],
            'Working on Job-Study': [
                { value: 'Working on softcopy', display: 'Job Study Finalized', groups: [2, 4, 8] }
            ],
            'Working on softcopy': [
                { value: 'Need SC Approval', display: 'Send SC to Sales', groups: [2, 8] }
            ],
            'Need SC Approval': [
                { value: 'SC Under QC Check', display: 'SC Approval', groups: [5, 8, 1] }
            ],
            'SC Under QC Check': [
                { value: 'SC Checked', display: 'SC Checked', groups: [3, 8] }
            ],
            'SC Checked': [
                { value: 'SC Checked, Need Cromalin', display: 'SC Checked, Need Cromalin', groups: [3, 8] },
                { value: 'SC Checked, Need Plates', display: 'SC Checked, Need Plates', groups: [3, 8] }
            ],
            'SC Checked, Need Cromalin': [
                { value: 'Working on Cromalin', display: 'Ask Supplier for Cromalin', groups: [2, 8] }
            ],
            'Working on Cromalin': [
                { value: 'Cromalin Checked', display: 'Cromalin Checked', groups: [3, 8] }
            ],
            'Cromalin Checked': [
                { value: 'Need Cromalin Approval', display: 'Cromalin Ready', groups: [3, 8] }
            ],
            'Need Cromalin Approval': [
                { value: 'Working on Repro', display: 'Cromalin Approved, Preparing Repro', groups: [2, 8] }
            ],
            'SC Checked, Need Plates': [
                { value: 'Working on Repro', display: 'Ask Supplier for Repro', groups: [3, 8] }
            ],
            'Working on Repro': [
                { value: 'Prepress Received Plates', display: 'Prepress Received Plates', groups: [2, 8] }
            ],
            'Prepress Received Plates': [
                { value: 'QC Received Plates', display: 'QC Received Plates', groups: [3, 8] }
            ],
            'QC Received Plates': [
                { value: 'Ready for Press', display: 'Plates Checked', groups: [3, 8] }
            ],
            'Ready for Press': [], // Final state
            'On Hold': [
                { value: 'Under Review', display: 'Under Review', groups: [5, 8, 1] },
                { value: 'Financially Approved', display: 'Financially Approved', groups: [5, 8, 1] },
                { value: 'Technically Approved', display: 'Technically Approved', groups: [5, 8, 1] },
                { value: 'Working on Job-Study', display: 'Working on Job-Study', groups: [2, 4, 8] },
                { value: 'Working on softcopy', display: 'Job Study Finalized', groups: [2, 8] },
                { value: 'Need SC Approval', display: 'Send SC to Sales', groups: [2, 8] },
                { value: 'SC Under QC Check', display: 'SC Approval', groups: [5, 8] },
                { value: 'SC Checked', display: 'SC Checked', groups: [3, 8] },
                { value: 'SC Checked, Need Cromalin', display: 'SC Checked, Need Cromalin', groups: [3, 8] },
                { value: 'SC Checked, Need Plates', display: 'SC Checked, Need Plates', groups: [3, 8] },
                { value: 'Working on Cromalin', display: 'Ask Supplier for Cromalin', groups: [2, 8] },
                { value: 'Cromalin Checked', display: 'Cromalin Checked', groups: [3, 8] },
                { value: 'Need Cromalin Approval', display: 'Cromalin Ready', groups: [3, 8] },
                { value: 'Working on Repro', display: 'Ask Supplier for Repro', groups: [2, 8] },
                { value: 'Prepress Received Plates', display: 'Prepress Received Plates', groups: [2, 8] },
                { value: 'QC Received Plates', display: 'QC Received Plates', groups: [3, 8] },
                { value: 'Ready for Press', display: 'Plates Checked', groups: [3, 8] }
            ]
        };
    
        const availableOptions = statusWorkflow[currentStatus.trim()] || [];
        
        const filteredOptions = availableOptions
            .filter(option => {
                // Always include if user is admin (group 8)
                if (userGroupId === 8) return true;
                
                // Include if no groups specified or user's group is included
                return !option.groups || option.groups.includes(userGroupId);
            })
            .map(option => ({
                value: option.value,
                label: option.display || option.value
            }));
        
        return filteredOptions;
    }

    function updateJobCard(card, job) {
         // Update assignment status
        if (!job.handler_name?.trim()) {
            card.classList.add('unassigned');
        } else {
            card.classList.remove('unassigned');
        }
        const header = card.querySelector('.job-card-header h3');
        const status = card.querySelector('.status');
        const meta = card.querySelector('.job-meta');
        
        // Update handler information in dataset
        card.dataset.handlerName = job.handler_name || '';
        
        const newHeaderText = `${job.job_number}: ${job.job_name}`;
        if (header.textContent !== newHeaderText) header.textContent = newHeaderText;
        
        const newStatusText = job.status;
        if (status.textContent !== newStatusText) {
            status.textContent = newStatusText;
            status.className = `status ${getStatusClass(job.status)}`;
            status.title = 'Click to change status';
            card.dataset.status = job.status;
            
            if (card.refreshStatusDropdown) {
                card.refreshStatusDropdown(job.status);
            }
        }
        
        const newMetaHTML = `
            <div><strong>Customer:</strong> ${job.customer_name}</div>
            <div><strong>Salesman:</strong> ${job.salesman || 'Not specified'}</div>
            <div><strong>Created:</strong> ${formatDateDisplay(job.created_date)}</div>
        `;
        
        if (meta.innerHTML !== newMetaHTML) meta.innerHTML = newMetaHTML;
    }

    function formatDateDisplay(dateString) {
        if (/^\d{1,2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}:\d{2}$/.test(dateString)) return dateString;
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    function getStatusClass(status) {
        const statusMap = {
            'Financially Approved': 'status-finance',
            'Technically Approved': 'status-tech',
            'Working on Job-Study': 'status-ready',
            'Working on softcopy': 'status-ready',
            'Need SC Approval': 'status-prepress',
            'SC Under QC Check': 'status-qc',
            'Working on Cromalin': 'status-prepress',
            'Need Cromalin Approval': 'status-prepress',
            'Working on Repro': 'status-prepress',
            'Prepress Received Plates': 'status-prepress',
            'QC Received Plates': 'status-qc',
            'Ready for Press': 'status-ready',
            'On Hold Since': 'status-hold',
            'default': 'status-review'
            
        };
        for (const [key, value] of Object.entries(statusMap)) {
            if (status.includes(key)) return value;
        }
        return statusMap.default;
    }


    async function filterJobs() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<div class="spinner"></div> Filtering jobs...';
        jobStream.innerHTML = '';
        jobStream.appendChild(loadingIndicator);
    
        try {
            const apiUrl = buildApiUrl();
            const jobs = await fetchJobs(apiUrl);
            jobStream.innerHTML = '';
            
            if (!Array.isArray(jobs) || jobs.length === 0) {
                showNoResultsMessage();
                return;
            }
            
            renderJobs(jobs);
            
            // Apply the current search filter from the input box
            const searchInput = document.getElementById('job-search');
            if (searchInput) {
                currentFilters.search = searchInput.value.trim().toLowerCase();
            }
            
            applyAllFilters();
            
        } catch (error) {
            console.error('Filtering error:', error);
            jobStream.innerHTML = '';
            showNoResultsMessage('Error loading jobs. Please try again.');
        }
    }
    
    function applyCurrentFilters() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const currentUserName = currentUser.fullName || '';
        
        const searchTerm = currentFilters.search.toLowerCase();
        const statusValue = currentFilters.status;
        const printingTypeValue = currentFilters.printingType;
        const productTypeValue = currentFilters.productType;

        const showMine = currentFilters.showMine;
        const notAssigned = currentFilters.notAssigned;
        
        const searchActive = searchTerm !== '';
        const statusActive = statusValue !== '';
        const printingTypeActive = printingTypeValue !== '';
        const productTypeActive = productTypeValue !== '';
        
        let hasVisibleJobs = false;
        
        document.querySelectorAll('.job-card').forEach(card => {
                    // First remove any filter-related classes
        card.classList.remove('unassigned');
        card.style.display = 'block';
        
        // Then apply current filters
            let shouldShow = true;
            
            // Search filter
            if (shouldShow && searchActive) {
                const header = card.querySelector('.job-card-header h3');
                const metaDivs = card.querySelectorAll('.job-meta div');
                const jobNumberText = header.textContent.toLowerCase();
                const customerText = metaDivs[0].textContent.toLowerCase();
                const salesmanText = metaDivs[1].textContent.toLowerCase();
                
                shouldShow = jobNumberText.includes(searchTerm) || 
                            customerText.includes(searchTerm) || 
                            salesmanText.includes(searchTerm);
            }
            
            // Status filter
            if (shouldShow && statusActive) {
                const statusElement = card.querySelector('.status');
                const status = statusElement ? statusElement.textContent : '';
                shouldShow = status === statusValue;
            }
            
            // Printing Type filter
            if (shouldShow && printingTypeActive) {
                const pressType = card.dataset.pressType || '';
                shouldShow = (
                    (printingTypeValue === 'stack' && pressType.includes('Stack')) ||
                    (printingTypeValue === 'central' && pressType.includes('Central')) ||
                    (printingTypeValue === 'unprinted' && pressType.includes('Unprinted'))
                );
            }
            
            // Product Type filter
            if (shouldShow && productTypeActive) {
                const productType = card.dataset.productType || '';
                const mappedProductType = productTypeMap[productTypeValue];
                shouldShow = productType.includes(mappedProductType);
            }
            
            // Show Mine filter
            if (shouldShow && showMine) {
                const salesman = card.dataset.salesman || '';
                const handlerName = card.dataset.handlerName || '';
                shouldShow = salesman.includes(currentUserName) || 
                            handlerName.includes(currentUserName);
            }
            
            // Not Assigned filter
            if (shouldShow && notAssigned) {
                const handlerName = card.dataset.handlerName || '';
                shouldShow = !handlerName; // Show only if no handler is assigned
            }
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
        
        if (!hasVisibleJobs) {
            showNoResultsMessage();
        }
    }
    
    // Helper function to check if card matches filters
    function checkCardMatch(card, searchTerm, statusValue, searchActive, statusActive) {
        let matches = true;
        
        if (searchActive) {
            const header = card.querySelector('.job-card-header h3');
            const metaDivs = card.querySelectorAll('.job-meta div');
            const jobNumberText = header.textContent.toLowerCase();
            const customerText = metaDivs[0].textContent.toLowerCase();
            const salesmanText = metaDivs[1].textContent.toLowerCase();
            
            matches = jobNumberText.includes(searchTerm) || 
                     customerText.includes(searchTerm) || 
                     salesmanText.includes(searchTerm);
        }
        
        if (matches && statusActive) {
            const statusElement = card.querySelector('.status');
            const status = statusElement ? statusElement.textContent : '';
            matches = status === statusValue;
        }
        
        return matches;
    }
    
// Simple no results message
function showNoResultsMessage(message = 'No results found') {
    const msg = document.createElement('div');
    msg.className = 'no-jobs';
    msg.textContent = message;
    jobStream.appendChild(msg);
}

    const debouncedServerRefresh = debounce(() => {
        saveScrollState();
        loadJobs();
    }, 500);


    function setupAutoRefresh() {
        clearInterval(refreshInterval);
        
        refreshInterval = setInterval(() => {
            // Only refresh if:
            // 1. Results section is visible
            // 2. User is active (not hidden)
            // 3. No modal dialogs are open
            if (document.getElementById('results-section')?.style.display === 'block' && 
                !document.hidden &&
                !document.querySelector('.modal.open')) {
                
                // Save current filter state before refresh
                const searchInput = document.getElementById('job-search');
                if (searchInput) {
                    currentFilters.search = searchInput.value.trim().toLowerCase();
                }
                
                loadJobs();
            }
        }, 20000 + Math.random() * 5000); // 20-25 seconds with randomization
    }
    
    // Helper function to get index of first visible job
    function getFirstVisibleJobIndex() {
        const cards = Array.from(document.querySelectorAll('.job-card'));
        const containerRect = jobStream.getBoundingClientRect();
        const containerTop = containerRect.top + 10; // Small buffer
        
        for (let i = 0; i < cards.length; i++) {
            const cardRect = cards[i].getBoundingClientRect();
            if (cardRect.bottom > containerTop) {
                return {
                    index: i,
                    offset: cardRect.top - containerTop
                };
            }
        }
        return null;
    }
    
    // Smooth scroll restoration
    function restoreScrollPositionSmoothly(scrollTop, firstVisibleInfo) {
        if (firstVisibleInfo) {
            const cards = document.querySelectorAll('.job-card');
            if (cards.length > firstVisibleInfo.index) {
                const targetCard = cards[firstVisibleInfo.index];
                const targetPosition = targetCard.offsetTop + firstVisibleInfo.offset;
                
                // Smooth scroll to position
                jobStream.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                return;
            }
        }
        
        // Fallback to regular scroll position
        jobStream.scrollTop = scrollTop;
    }
    
    // Add this CSS to your styles:
    /*
    .job-stream.refreshing .job-card {
        transition: opacity 0.3s ease;
        opacity: 0.9;
    }
    */

    function showLoadingIndicator() {
        removeLoadingIndicator();
        const loader = document.createElement('div');
        loader.id = 'current-loading-indicator';
        loader.className = 'loading-indicator';
        loader.textContent = 'Loading updates...';
        jobStream.insertBefore(loader, jobStream.firstChild);
    }

    function removeLoadingIndicator() {
        const loader = document.getElementById('current-loading-indicator');
        if (loader) loader.remove();
    }

    function handleLoadError(error) {
        removeLoadingIndicator();
        if (error.name === 'AbortError') {
            showNotification('Request timed out. Please check your connection.', 'error');
        } else {
            showNotification(`Server Disconnected: ${error.message}`, 'error');
        }
    }

    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container') || createNotificationContainer();
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    function createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    async function loadDepartmentData(jobNumber) {
        if (!jobNumber) return;
        try {
            const salesResponse = await fetch(`/api/jobs/${jobNumber}`);
            const salesData = await salesResponse.json();
            if (salesResponse.ok && salesData.success) {
                populateSalesForm(salesData.data);
            }
            const planningResponse = await fetch(`/api/planning-data/${jobNumber}`);
            const planningData = await planningResponse.json();
            if (planningResponse.ok && planningData.success) {
                if (!planningData.data.product_type && salesData.data) {
                    planningData.data.product_type = salesData.data.product_type;
                }
                populatePlanningForm(planningData.data);
            }
            const prepressResponse = await fetch(`/api/prepress-data/${jobNumber}`);
            const prepressData = await prepressResponse.json();
            if (prepressResponse.ok && prepressData.success) {
                populatePrepressForm(prepressData.data);
            }
            const qcResponse = await fetch(`/api/qc-data/${jobNumber}`);
            const qcData = await qcResponse.json();
            if (qcResponse.ok && qcData.success) {
                populateQCForm(qcData.data);
            }
        } catch (error) {
            console.error('Error loading department data:', error);
        }
    }

    function updatePlanningOptionsVisibility(productType) {
        if (!productType) {
            document.getElementById('planning-bag-options').style.display = 'none';
            return;
        }
        const flipOption = document.getElementById('flip-direction-option');
        const linesOption = document.getElementById('add-lines-option');
        const machineOption = document.getElementById('new-machine-option');
        const staggerOption = document.getElementById('add-stagger-option');
        const bagOptionsContainer = document.getElementById('planning-bag-options');
        bagOptionsContainer.style.display = 'block';
        const productTypeLower = productType.toLowerCase();
        flipOption.style.display = productTypeLower.includes('3 side') ? 'block' : 'none';
        linesOption.style.display = productTypeLower.includes('t-shirt') ? 'none' : 'block';
        machineOption.style.display = productTypeLower.includes('flat bottom') ? 'block' : 'none';
        staggerOption.style.display = productTypeLower.includes('t-shirt') ? 'none' : 'block';
    }

    function populateQCForm(data) {
        if (!data) return;
        document.getElementById('qc-sc-checked').checked = Boolean(data.sc_checked);
        document.getElementById('qc-sc-checked').disabled = platesReady; // Disable if plates are ready
        document.getElementById('qc-cromalin-checked').checked = Boolean(data.cromalin_checked);
        document.getElementById('qc-plates-received').checked = Boolean(data.plates_received);
        document.getElementById('qc-plates-checked').checked = Boolean(data.plates_checked);
        document.getElementById('qc-comments').innerText = data.comments || '';
    }

    function addColorField(name = '', code = '') {
        const colorContainer = document.getElementById('color-fields-container');
        const colorField = document.createElement('div');
        colorField.className = 'color-field';
        colorField.innerHTML = `
            <input type="text" class="color-name-input" placeholder="Color Name" value="${name}">
            <input type="color" class="color-code-input" value="${code || '#ffffff'}">
            <button type="button" class="remove-color-btn">×</button>
        `;
        colorContainer.appendChild(colorField);
        colorField.querySelector('.remove-color-btn').addEventListener('click', () => colorField.remove());
    }


//========================
function showQuickPeek(jobData) {
    const quickPeekContainer = document.getElementById('quick-peek-container');
    const quickPeekContent = document.getElementById('quick-peek-content');
    const surroundingContainer = document.querySelector('.surrounding-elements');
    
    if (!quickPeekContainer || !quickPeekContent) return;

    // Store current data and create update function
    quickPeekContainer.currentData = {...jobData};
    quickPeekContainer.updateContent = function() {
        // Fetch handler name if we have handler_id but not handler_name
        if (this.currentData.handler_id && !this.currentData.handler_name) {
            fetch(`/api/get-user-id?id=${this.currentData.handler_id}`)
                .then(response => response.json())
                .then(userData => {
                    if (userData.fullName) {
                        this.currentData.handler_name = userData.fullName;
                        this.updateContent(); // Re-render with handler name
                    }
                })
                .catch(error => console.error('Error fetching handler:', error));
        }

        quickPeekContent.innerHTML = `
            <div class="quick-peek-inner">
                <h4>${this.currentData.job_number} - ${this.currentData.job_name}</h4>
                <div class="quick-peek-meta">
                    <p><strong>Created:</strong> ${formatDateDisplay(this.currentData.created_date)}</p>
                    <p><strong>Customer:</strong> ${this.currentData.customer_name}</p>
                    <p><strong>Salesman:</strong> ${this.currentData.salesman || 'Not specified'}</p>
                    <p><strong>Prepress:</strong> ${this.currentData.handler_name || this.currentData.handler || 'Not assigned'}</p>
                    <p><strong>Product Type:</strong> ${this.currentData.product_type}</p>
                    <p><strong>Press Type:</strong> ${this.currentData.press_type}</p>
                    <p class="quick-peek-status">
                        <span class="status ${getStatusClass(this.currentData.status)}">
                            ${this.currentData.status}
                        </span>
                    </p>
                </div>
                ${this.currentData.sc_image_url ? `
                <div class="quick-peek-image">
                    <p class="quick-peek-image-label">SC Approval Image:</p>
                    <img src="${this.currentData.sc_image_url}" alt="SC Approval">
                </div>
                ` : '<p class="quick-peek-no-image">No SC approval image available</p>'}
            </div>
        `;
    };

    // Initial render
    quickPeekContainer.updateContent();

    // Status update listener
    const statusListener = (e) => {
        if (e.detail.jobNumber === quickPeekContainer.currentData.job_number) {
            quickPeekContent.classList.add('quick-peek-updating');
            quickPeekContainer.currentData.status = e.detail.newStatus;
            quickPeekContainer.updateContent();
            setTimeout(() => {
                quickPeekContent.classList.remove('quick-peek-updating');
            }, 300);
        }
    };

    document.addEventListener('statusChanged', statusListener);

    // Close handler
    document.getElementById('close-quick-peek').addEventListener('click', () => {
        
        document.removeEventListener('statusChanged', statusListener);
        quickPeekContainer.classList.remove('quick-peek-visible');
        
        if (surroundingContainer) {
            surroundingContainer.classList.remove('push-down-container');
        }
        
        setTimeout(() => {
            quickPeekContainer.style.display = 'none';
        }, 300);
    });

    // Animation setup
    quickPeekContainer.style.display = 'block';
    
    requestAnimationFrame(() => {
        const height = quickPeekContainer.scrollHeight;
        quickPeekContainer.style.setProperty('--quick-peek-height', `${height}px`);
        
        quickPeekContainer.classList.add('quick-peek-visible');
        if (surroundingContainer) {
            surroundingContainer.classList.add('push-down-container');
        }
    });
}

// Helper function to format dates
function formatDateDisplay(dateString) {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
        if (/^\d{1,2}-[A-Za-z]{3}-\d{4}/.test(dateString)) return dateString;
        const date = new Date(dateString);
        return isNaN(date) ? dateString : date.toLocaleString();
    } catch (e) {
        return dateString;
    }
}
// Then update the job card click event handler to use quick peek instead of job details:
jobStream.addEventListener('click', async function(event) {
    // First check if it's an action button
    const editBtn = event.target.closest('.edit-job-btn');
    const cloneBtn = event.target.closest('.clone-job-btn');
    const deleteBtn = event.target.closest('.delete-job-btn');
    
    if (editBtn) {
        event.stopPropagation();
        return handleEditJob(editBtn.dataset.jobNumber);
    } else if (cloneBtn) {
        event.stopPropagation();
        return handleCloneJob(cloneBtn.dataset.jobNumber);
    } else if (deleteBtn) {
        event.stopPropagation();
        return handleDeleteJob(deleteBtn.dataset.jobNumber, deleteBtn);
    }
    
    // Handle job card click - ensure we respect filters
    const jobCard = event.target.closest('.job-card');
    if (jobCard && !event.target.closest('.job-actions')) {
        // Only proceed if the card is visible (matches current filters)
        if (jobCard.style.display === 'none') return;

                // Additional check for not-assigned filter
                //if (currentFilters.notAssigned) {
                 //   const handlerName = jobCard.dataset.handlerName || '';
               //     if (handlerName) return; // Don't allow clicks on assigned jobs when filter is active
               // }
        
        document.querySelectorAll('.job-card').forEach(card => card.classList.remove('selected'));
        jobCard.classList.add('selected');

        const jobNumber = jobCard.dataset.jobId;
        const jobSelectedEvent = new CustomEvent('jobSelected', { 
            detail: { 
                jobNumber,
                // Include filter state in the event
                filters: { ...currentFilters }
            } 
        });
        document.dispatchEvent(jobSelectedEvent);

        // Create complete job data object from card attributes
        const cardData = {
            job_number: jobCard.dataset.jobId,
            job_name: jobCard.dataset.jobName,
            customer_name: jobCard.dataset.customerName,
            salesman: jobCard.dataset.salesman,
            handler_name: jobCard.dataset.handlerName,
            product_type: jobCard.dataset.productType,
            press_type: jobCard.dataset.pressType,
            status: jobCard.dataset.status,
            created_date: jobCard.dataset.createdDate,
            _source: 'card'
        };

        // Show quick peek immediately with CARD data
        showQuickPeek(cardData);

        // Then try to fetch more detailed data
        try {
            const [jobResponse, prepressResponse] = await Promise.all([
                fetch(`/api/jobs/${jobNumber}`),
                fetch(`/api/prepress-data/${jobNumber}`)
            ]);

            if (!jobResponse.ok) throw new Error('Failed to fetch job details');
            if (!prepressResponse.ok) throw new Error('Failed to fetch prepress details');

            const jobResult = await jobResponse.json();
            const prepressResult = await prepressResponse.json();

            if (jobResult.success && jobResult.data && prepressResult.success) {
                // MERGE all data
                const mergedData = {
                    ...cardData,
                    ...jobResult.data,
                    ...prepressResult.data,
                    status: jobResult.data.status || cardData.status,
                    created_date: jobResult.data.created_date || cardData.created_date,
                    _source: 'api'
                };
                
                // Update quick peek with the MERGED data
                showQuickPeek(mergedData);
                populateSalesForm(mergedData);
            }
        } catch (error) {
            console.error('Error loading job details:', error);
        }
    }
});

// Also update the close button handler to hide quick peek
const closeButton = event.target.closest('#close-job-details');
if (closeButton) {
    hideQuickPeek();
    document.querySelectorAll('.job-card').forEach(card => card.classList.remove('selected'));
}

//=======================

async function handleEditJob(jobNumber) {
    try {
        const editBtn = document.querySelector(`.edit-job-btn[data-job-number="${jobNumber}"]`);
        if (editBtn) {
            editBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            editBtn.disabled = true;
        }
        const response = await fetch(`/api/jobs/${encodeURIComponent(jobNumber)}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const result = await response.json();
        if (!result.success || !result.data) throw new Error(result.message || 'Invalid job data received');

        // --------- NEW LOGIC HERE ---------
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const groupId = currentUser.group_id;

        if (groupId === 2) {
            // Prepress user: show prepress form
            showSection('aw-section', 'btn-aw');
            populatePrepressForm(result.data); // Make sure this function exists and does what you want
        } else {
            // Default: show sales form
            showSection('sales-section', 'btn-sales');
            populateSalesForm(result.data);
        }
        // --------- END NEW LOGIC ---------

        await loadDepartmentData(jobNumber);
        showAlert('Job loaded for editing', 'success');
    } catch (error) {
        console.error('Edit job failed:', error);
        showAlert(error.message || 'Failed to load job for editing', 'error');
    } finally {
        const editBtn = document.querySelector(`.edit-job-btn[data-job-number="${jobNumber}"]`);
        if (editBtn) {
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editBtn.disabled = false;
        }
    }
}

async function handleCloneJob(jobNumber) {
    try {
        const cloneBtn = document.querySelector(`.clone-job-btn[data-job-number="${jobNumber}"]`);
        if (cloneBtn) {
            cloneBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            cloneBtn.disabled = true;
        }
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const currentUserName = currentUser.fullName || 'Not specified';
        
        const response = await fetch(`/api/jobs/${encodeURIComponent(jobNumber)}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const result = await response.json();
        if (!result.success || !result.data) throw new Error(result.message || 'Invalid job data received');
        
        showSection('sales-section', 'btn-sales');
        const jobData = {
            ...result.data,
            job_number: '',  // Clear job number for new job
            entry_date: new Date().toISOString().split('T')[0],
            salesman: currentUserName  // Set salesman to current user
        };
        populateSalesForm(jobData);

        // Write "cloned from the job ..." in the comment box
        const commentsBox = document.getElementById('comments');
        if (commentsBox) {
            const oldJobId = result.data.job_number || jobNumber;
            const oldJobName = result.data.job_name || '';
            const oldSalesman = result.data.salesman || 'unknown salesman';
            commentsBox.innerText = `Cloned from job ${oldJobId} ${oldJobName} (originally created by ${oldSalesman})`;
        }

        showAlert('Job data loaded for cloning - remember to save as new job', 'success');
    } catch (error) {
        console.error('Clone job failed:', error);
        showAlert(error.message || 'Failed to load job for cloning', 'error');
    } finally {
        const cloneBtn = document.querySelector(`.clone-job-btn[data-job-number="${jobNumber}"]`);
        if (cloneBtn) {
            cloneBtn.innerHTML = '<i class="fas fa-copy"></i> Clone';
            cloneBtn.disabled = false;
        }
    }
}

    async function handleDeleteJob(jobNumber, btn) {
        if (!btn) return;
        if (!confirm(`Are you sure you want to delete job ${jobNumber}?`)) return;
        const jobCard = btn.closest('.job-card');
        if (!jobCard) return;
        try {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
            btn.disabled = true;
            jobCard.classList.add('deleting');
            await new Promise(resolve => setTimeout(resolve, 300));
            jobCard.remove();
            const response = await fetch(`/api/jobs/${encodeURIComponent(jobNumber)}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.message || 'Delete failed');
            showAlert(`Job ${jobNumber} deleted successfully`, 'success');
        } catch (error) {
            console.error('Delete failed:', error);
            if (jobStream && jobCard && !document.body.contains(jobCard)) {
                jobStream.insertBefore(jobCard, jobStream.firstChild);
                jobCard.classList.remove('deleting');
            }
            if (btn && document.body.contains(btn)) {
                btn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
                btn.disabled = false;
            }
            if (error.message !== "Job not found") {
                showAlert(error.message || 'Failed to delete job', 'error');
            }
        }
    }

    function populateSearchFiltersFromJob(jobCard) {
        const pressType = jobCard.dataset.pressType;
        const productType = jobCard.dataset.productType;
        const status = jobCard.dataset.status;
        if (pressType) {
            const printingTypeSelect = document.getElementById('printing-type');
            if (printingTypeSelect) {
                printingTypeSelect.value = pressType.toLowerCase().includes('stack') ? 'stack' : 'central';
            }
        }
        if (productType) {
            const productSelect = document.getElementById('product');
            if (productSelect) {
                const productValue = mapProductTypeToValue(productType);
                productSelect.value = productValue;
            }
        }
        if (status) {
            const statusSelect = document.getElementById('status-filter');
            if (statusSelect) statusSelect.value = status;
        }
    }

    function mapProductTypeToValue(productType) {
        const mapping = {
            'Center Seal': 'center-seal',
            '2 Side': '2-side',
            '3 Side': '3-side',
            '3 Side K': '3-side-k',
            '3 Side Stand Up': '3-side-stand-up',
            '4 Side': '4-side',
            'Normal Bag': 'normal-bag',
            'Chicken Bag': 'chicken-bag',
            'Flat Bottom': 'flat-bottom',
            'Shopping Bag': 'shopping-bag',
            'Roll': 'roll'
        };
        return mapping[productType] || '';
    }

    function showSection(sectionId, btnId) {
        document.querySelectorAll('.form-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
        
        document.querySelectorAll('.button-container button').forEach(button => {
            button.classList.toggle('pressed', button.id === btnId);
        });
        
        // If showing results section, ensure job stream is visible
        if (sectionId === 'results-section') {
            document.getElementById('job-stream-container').style.display = 'block';
        }
    }
    // Event delegation for job action buttons
    jobStream.addEventListener('click', function(event) {
        const editBtn = event.target.closest('.edit-job-btn');
        const cloneBtn = event.target.closest('.clone-job-btn');
        const deleteBtn = event.target.closest('.delete-job-btn');
        
        if (editBtn) {
            event.preventDefault();
            const jobNumber = editBtn.dataset.jobNumber;
            handleEditJob(jobNumber);
        } else if (cloneBtn) {
            event.preventDefault();
            const jobNumber = cloneBtn.dataset.jobNumber;
            handleCloneJob(jobNumber);
        } else if (deleteBtn) {
            event.preventDefault();
            const jobNumber = deleteBtn.dataset.jobNumber;
            handleDeleteJob(jobNumber, deleteBtn);
        }
    });
});