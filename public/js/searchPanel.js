//searchPanel.js

// search bar findigs

// Debounce function to limit how often the search executes
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to populate search results
function populateSearchResults(data) {
    const notFoundMessage = document.getElementById('not-found-message');
    const resultContainer = document.querySelector('.search-result-container');
    const resultItems = resultContainer.querySelectorAll('.search-result-item');
    
    if (data && data.found) {
        notFoundMessage.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Populate results
        resultItems[0].textContent = data.jobName || 'N/A';
        resultItems[1].textContent = data.jobId || 'N/A';
        resultItems[2].textContent = data.productType || 'N/A';
        resultItems[3].textContent = data.pressType || 'N/A';
        resultItems[4].textContent = data.printOrientation || 'N/A';
        resultItems[5].textContent = data.material || 'N/A';
        resultItems[6].textContent = data.quantity || 'N/A';
        resultItems[7].textContent = data.status || 'N/A';
        
        // Design preview
        const designPreview = resultContainer.querySelector('.design-preview');
        designPreview.innerHTML = '';
        if (data.designUrl) {
            const img = document.createElement('img');
            img.src = data.designUrl;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            designPreview.appendChild(img);
        } else {
            designPreview.textContent = 'No design';
        }
    } else {
        notFoundMessage.style.display = 'block';
        resultContainer.style.display = 'none';
    }
}

// Function to show loading state
function showLoadingState(show) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const notFoundMessage = document.getElementById('not-found-message');
    const resultContainer = document.querySelector('.search-result-container');
    
    if (show) {
        loadingSpinner.style.display = 'block';
        notFoundMessage.style.display = 'none';
        resultContainer.style.display = 'none';
    } else {
        loadingSpinner.style.display = 'none';
    }
}

// Function to toggle search results container
function toggleSearchResults(show) {
    const resultsSection = document.getElementById('search-results-section');
    const searchDivider = document.querySelector('.search-divider');
    const filterSection = document.querySelector('.filter-section');
    
    if (show) {
        resultsSection.classList.add('active');
        searchDivider.classList.add('pushed');
        filterSection.classList.add('pushed');
    } else {
        resultsSection.classList.remove('active');
        searchDivider.classList.remove('pushed');
        filterSection.classList.remove('pushed');
        
        // Wait for animation to complete before hiding completely
        setTimeout(() => {
            document.getElementById('not-found-message').style.display = 'none';
            document.querySelector('.search-result-container').style.display = 'none';
        }, 300);
    }
}

// Mock API function - replace with your actual API call
function fetchSearchResults(searchTerm) {
    return new Promise(resolve => {
        // Simulate API delay
        setTimeout(() => {
            // Simulate "not found" for empty search or specific terms
            if (!searchTerm || searchTerm.toLowerCase().includes('notfound')) {
                resolve({ found: false });
            } else {
                // Simulate found data
                resolve({
                    found: true,
                    jobName: "Example Job",
                    jobId: "12345",
                    productType: "Center Seal",
                    pressType: "Central",
                    printOrientation: "Surface",
                    material: "PE + HDPE",
                    quantity: "10,000",
                    status: "Under QC Check",
                    designUrl: "path/to/design.jpg"
                });
            }
        }, 800); // Simulate network delay
    });
}

// Main search handler with debouncing
const handleSearch = debounce(async (searchTerm) => {
    showLoadingState(false); // Hide loading spinner after we get results
    
    try {
        const data = await fetchSearchResults(searchTerm);
        populateSearchResults(data);
    } catch (error) {
        console.error("Search failed:", error);
        document.getElementById('not-found-message').textContent = "Search failed. Please try again.";
        document.getElementById('not-found-message').style.display = 'block';
        document.querySelector('.search-result-container').style.display = 'none';
    }
}, 500);

// Event listener for search input
document.getElementById('search-bar').addEventListener('input', function(e) {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm !== '') {
        // Show loading state and expand container
        showLoadingState(true);
        toggleSearchResults(true);
        
        // Execute the debounced search
        handleSearch(searchTerm);
    } else {
        // Hide everything
        toggleSearchResults(false);
        showLoadingState(false);
    }
});
