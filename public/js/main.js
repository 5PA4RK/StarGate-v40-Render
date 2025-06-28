// js/main.js - activating saving btns
// Generic save function
async function saveSectionData(sectionName, data) {
  try {
    const response = await fetch(`/api/save-${sectionName}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Save failed');
    }
    return await response.json();
} catch (error) {
    console.error(`Error saving ${sectionName}:`, error);
    throw error;
}
}


// sellect one status on the time
  document.querySelectorAll('input[name="status"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        // Uncheck all other checkboxes
        document.querySelectorAll('input[name="status"]').forEach(function(otherCheckbox) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });

  // sellect one Supplier on the time
  document.querySelectorAll('input[name="supplier"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        // Uncheck all other checkboxes in the same group
        document.querySelectorAll('input[name="supplier"]').forEach(function(otherCheckbox) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });

  // sales satatus

  document.querySelectorAll('input[name="sales-status"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        // Uncheck all other checkboxes in the same group
        document.querySelectorAll('input[name="sales-status"]').forEach(function(otherCheckbox) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      }
    });
  });

      // ======================
    // Theme Management
    // ======================
    function setupThemeSwitcher() {
      const themeButton = document.getElementById('theme-btn');
      if (!themeButton) return;

      function setTheme(isDark) {
          document.body.className = isDark ? 'dark' : 'light';
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
          themeButton.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }

      themeButton.addEventListener('click', () => {
          const isDark = !document.body.classList.contains('dark');
          setTheme(isDark);
      });

      // Initialize theme
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme === 'dark');
  }

  function toggleCromalinFields(pressType) {
    const workingCromalinCheckbox = document.getElementById('aw-working-cromalin');
    const cromalinApprovalCheckbox = document.getElementById('aw-cromalin-approval');
    const workingReproCheckbox = document.getElementById('aw-working-repro');
    const qcCromalinChecked = document.getElementById('qc-cromalin-checked');
    
    // Get parent elements for visibility control
    const workingParent = workingCromalinCheckbox?.closest('.checkbox-line');
    const approvalParent = cromalinApprovalCheckbox?.closest('.checkbox-line');
    const qcCromalinParent = qcCromalinChecked?.closest('.checkbox-line');
    
    const isStack = pressType?.toLowerCase().includes('stack');
    
    // Toggle visibility
    if (workingParent) workingParent.style.display = isStack ? 'none' : 'flex';
    if (approvalParent) approvalParent.style.display = isStack ? 'none' : 'flex';
    if (qcCromalinParent) qcCromalinParent.style.display = isStack ? 'none' : 'flex';
    
    // Additionally disable the approval checkbox for Stack
    if (cromalinApprovalCheckbox) {
        cromalinApprovalCheckbox.disabled = isStack;
        if (isStack) {
            cromalinApprovalCheckbox.checked = false;
        }
    }

    // Also disable the QC cromalin checkbox for Stack
    if (qcCromalinChecked) {
        qcCromalinChecked.disabled = isStack;
        if (isStack) {
            qcCromalinChecked.checked = false;
        }
    }

    // Add event listener for Cromalin Approval checkbox
    if (cromalinApprovalCheckbox && !cromalinApprovalCheckbox.hasListener) {
        cromalinApprovalCheckbox.addEventListener('change', function() {
            if (this.checked && workingReproCheckbox) {
                workingReproCheckbox.checked = true;
                workingReproCheckbox.dispatchEvent(new Event('change'));
            }
        });
        cromalinApprovalCheckbox.hasListener = true; // Flag to prevent duplicate listeners
    }
}

// Call this when press type changes
document.getElementById('press-type')?.addEventListener('change', function() {
    toggleCromalinFields(this.value);
});

// Also call it when loading a job to set initial state
document.addEventListener('jobSelected', (e) => {
    if (e.detail.jobData?.press_type) {
        toggleCromalinFields(e.detail.jobData.press_type);
    }
});