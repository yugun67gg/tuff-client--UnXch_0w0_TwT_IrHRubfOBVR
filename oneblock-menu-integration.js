function() {
  'use strict';
  console.log('[OneBlockMenu] v2.0 Starting...');

  // Hook into the world creation process
  function injectOneBlockMenu() {
    try {
      // Monitor for world type selection changes
      const originalCreateWorld = window.createWorld;
      
      if (originalCreateWorld && typeof originalCreateWorld === 'function') {
        window.createWorld = function(...args) {
          console.log('[OneBlockMenu] World creation called with args:', args);
          
          // Check if OneBlock is selected
          const worldTypeSelect = document.querySelector('select');
          if (worldTypeSelect && worldTypeSelect.value === 'oneblock') {
            console.log('[OneBlockMenu] OneBlock world type selected!');
            args[2] = 'oneblock'; // Ensure world type is set to oneblock
          }
          
          return originalCreateWorld.apply(this, args);
        };
        console.log('[OneBlockMenu] createWorld hooked');
      }
      
    } catch (error) {
      console.error('[OneBlockMenu] Hook error:', error);
    }
  }

  // Inject custom CSS for OneBlock option
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .oneblock-option { 
        background-color: #32CD32; 
        color: white; 
      }
    `;
    document.head.appendChild(style);
  }

  // Try to add OneBlock to select menus
  function addOneBlockOption() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach((select) => {
      // Only modify world type selectors
      const options = Array.from(select.options);
      const isWorldTypeSelect = options.some(opt => 
        opt.text.includes('Default') || 
        opt.text.includes('Large') ||
        opt.text.includes('Amplified')
      );

      if (isWorldTypeSelect) {
        // Check if OneBlock already added
        const hasOneBlock = options.some(opt => opt.value === 'oneblock');
        
        if (!hasOneBlock) {
          const option = document.createElement('option');
          option.value = 'oneblock';
          option.text = '📦 OneBlock';
          option.className = 'oneblock-option';
          select.appendChild(option);
          console.log('[OneBlockMenu] ✅ OneBlock option added to menu');
        }
      }
    });
  }

  // Initialize
  injectStyles();
  
  // Try multiple times
  const attempts = [500, 1000, 2000, 3000, 5000];
  attempts.forEach(delay => {
    setTimeout(() => {
      addOneBlockOption();
      injectOneBlockMenu();
    }, delay);
  });

  // Watch for DOM changes
  const observer = new MutationObserver(() => {
    addOneBlockOption();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Listen for OneBlock ready event
  document.addEventListener('oneblockReady', (e) => {
    console.log('[OneBlockMenu] OneBlock ready event received');
    addOneBlockOption();
  });

  console.log('[OneBlockMenu] Initialized!');
})();
