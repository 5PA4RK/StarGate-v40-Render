// js/auth.js

// User credentials with full names
const validUsers = {
    'maintenance': { password: '1111', group_id: 8, fullName: 'Maintenance User' },
    'admin': { password: '1111', group_id: 1, fullName: 'Administrator' },
    'mahmoud_khadary': { password: '1111', group_id: 2, fullName: 'Mahmoud Khadary' },
    'raed_tanbouz': { password: '1111', group_id: 2, fullName: 'Raed Tanbouz' },
    'aref_wafaay': { password: '1111', group_id: 2, fullName: 'Aref Wafaay' },
    'hashem_a_shaker': { password: '1111', group_id: 1, fullName: 'Hashem Abou Shaker' },
    'faraj_taweel': { password: '1111', group_id: 1, fullName: 'Faraj Al-Taweel' },
    'kais_taweel': { password: '1111', group_id: 1, fullName: 'Kais Al-Taweel' },
    'hatem_taweel': { password: '1111', group_id: 1, fullName: 'Hatem Al-Taweel' },
    'jad_taweel': { password: '1111', group_id: 1, fullName: 'Jad Al-Taweel' },
    'saif_taweel': { password: '1111', group_id: 1, fullName: 'Saif Al-Taweel' },
    'ebtihal': { password: '1111', group_id: 3, fullName: 'Ebtihal' },
    'raghad': { password: '1111', group_id: 3, fullName: 'Raghad' },
    'zakaria': { password: '1111', group_id: 3, fullName: 'Zakaria' },
    'ahmed_syam': { password: '1111', group_id: 3, fullName: 'Ahmed-Syam' },
    'bahaa': { password: '1111', group_id: 4, fullName: 'Bahaa' },
    'qasem': { password: '1111', group_id: 4, fullName: 'Qasem' },
    'amjad_samara': { password: '1111', group_id: 5, fullName: 'Amjad' },
    'Alaa_khalil': { password: '1111', group_id: 5, fullName: 'Alaa Allary' },
    'Rami_qatani': { password: '1111', group_id: 5, fullName: 'Rami' },
    'Duha': { password: '1111', group_id: 5, fullName: 'Duha' },
    'mahmoud_aref': { password: '1111', group_id: 6, fullName: 'Mahmoud Aref' },
    'mohammed_samara': { password: '1111', group_id: 7, fullName: 'Mohammed Samara' }
  };
  
  // ===== Authentication Functions ===== //
  function checkLoginState() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const loginContainer = document.getElementById('login-container');
      const mainContainer = document.getElementById('container');
      
      if (!currentUser) {
          loginContainer.style.display = 'flex';
          mainContainer.style.display = 'none';
      } else {
          loginContainer.style.display = 'none';
          mainContainer.style.display = 'flex';
      }
  }
  
  function setCurrentSalesman() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const salesmanField = document.getElementById('salesman');
      
      if (currentUser?.fullName) {
          salesmanField.value = currentUser.fullName;
      } else {
          console.warn('No user logged in - salesman field not set');
          salesmanField.value = '';
      }
  }
  
  function logoutUser() {
      localStorage.removeItem('currentUser');
      window.location.reload();
  }
  
  function initializeAppForUser(groupId) {
    const tabs = {

        // Navigation BTN
        'btn-sales': [1, 5, 8, 2, 3],  // Admin, Sales , Maintenance, prepress, QC
        'btn-planning': [1, 4, 8, 2, 3],   // Admin, Planning, Maintenance, prepress, planning
        'btn-aw': [1, 2, 3, 8],         // Admin, Prepress, QC Maintenance
        'btn-qc': [1, 2, 3, 8],         // Admin, Prepress, QC, Maintenance
        'btn-finance': [1, 5, 8],        // Admin, sales, Maintenance
        'btn-files': [1, 2, 3, 4, 5, 6, 7, 8],  // All groups
        'btn-results': [1, 2, 3, 4, 5, 6, 7, 8], // All groups

        // Saving BTN
        'save-Sales-btn': [1, 5, 8],  // Admin, Sales , Maintenanc
        'save-planning-btn': [4, 8],  // Planning , Maintenanc
        'save-aw-btn': [2, 8],  // prepress , Maintenanc
        'save-qc-btn': [3, 8],  // QC , Maintenanc
        'save-qc-btn': [3, 8],  // QC , Maintenanc

        // Live stream - Job Card BTN
        // didnt work withdynamic btns- will be handeled through livestream/'edit-job-btn': [1, 8],  // Admin , Maintenanc
        // didnt work withdynamic btns- will be handeled through livestream/'clone-job-btn': [1, 5, 8],  // Admin , sales, Maintenanc
        // didnt work withdynamic btns- will be handeled through livestream/'delete-job-btn': [1, 8],  // Admin , Maintenanc
    };

    // Set tab visibility
    Object.keys(tabs).forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = tabs[tabId].includes(groupId) ? 'block' : 'none';
        }
    });

    // Show Sales section first only for Sales group (group_id 5)
    if (groupId === 5) {
        showSection('sales-section', 'btn-sales');
    } else {
        showSection('results-section', 'btn-results');
        // Trigger live stream loading: use event for modularity
        document.dispatchEvent(new Event('liveStreamSectionShown'));
    }
}

  
  // ===== Main Initialization ===== //
  document.addEventListener('DOMContentLoaded', function() {
      // Initialize UI state
      checkLoginState();
      
      // Set current salesman if logged in
      setCurrentSalesman();
      
          // --- FIX: Always run navigation logic for logged-in users ---
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        initializeAppForUser(currentUser.group_id);
    }
      
      // Login form handling
      const loginForm = document.getElementById('login-form');
      const messageDiv = document.getElementById('login-message');
    
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
    
        if (validUsers[username] && validUsers[username].password === password) {
            // Successful login
            messageDiv.textContent = 'Login successful! Redirecting...';
            messageDiv.className = 'message success';
    
            // Store user info from DB
            fetch(`/api/get-user-id?username=${encodeURIComponent(username)}`)
                .then(res => res.json())
                .then(({ userId, fullName }) => {
                    localStorage.setItem('currentUser', JSON.stringify({
                        id: userId,
                        username: username,
                        group_id: validUsers[username].group_id,
                        fullName: fullName
                    }));
    
                    setTimeout(() => {
                        checkLoginState();
                        setCurrentSalesman();
                        initializeAppForUser(validUsers[username].group_id);
    
                        if (document.getElementById('results-section')?.style.display === 'block') {
                            loadJobs();
                            setupAutoRefresh();
                        }
                    }, 1000);
                });
    
        } else {
            // Failed login
            messageDiv.textContent = 'Invalid username or password';
            messageDiv.className = 'message error';
        }
    });
      
      // Logout button handling
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
          logoutBtn.addEventListener('click', function() {
              if (confirm('Are you sure you want to logout?')) {
                  logoutUser();
              }
          });
      }
  });
  
  // Helper function to show sections
  function showSection(sectionId, buttonId) {
      document.querySelectorAll('.form-section').forEach(section => {
          section.style.display = 'none';
      });
      document.getElementById(sectionId).style.display = 'block';
      
      document.querySelectorAll('.button-container button').forEach(button => {
          button.classList.toggle('pressed', button.id === buttonId);
      });
  }