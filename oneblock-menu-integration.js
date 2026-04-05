(function() {
  'use strict';
  console.log('[OneBlockMenu] Starting...');
  
  function addOneBlockToMenu() {
    // Find all select elements
    const selects = document.querySelectorAll('select');
    console.log('[OneBlockMenu] Found', selects.length, 'select elements');
    
    selects.forEach((select, index) => {
      // Check if this select already has "Default" option (world type selector)
      const options = Array.from(select.options);
      const hasDefault = options.some(opt => opt.text.includes('Default'));
      
      if (hasDefault) {
        console.log('[OneBlockMenu] Found world type selector at index', index);
        
        // Check if OneBlock already exists
        const hasOneBlock = options.some(opt => opt.value === 'oneblock');
        
        if (!hasOneBlock) {
          // Add OneBlock option
          const oneBlockOption = document.createElement('option');
          oneBlockOption.value = 'oneblock';
          oneBlockOption.text = '📦 OneBlock';
          select.appendChild(oneBlockOption);
          console.log('[OneBlockMenu] ✅ OneBlock option added!');
        }
      }
    });
  }
  
  // Try adding option multiple times to ensure it works
  setTimeout(addOneBlockToMenu, 500);
  setTimeout(addOneBlockToMenu, 1000);
  setTimeout(addOneBlockToMenu, 2000);
  
  // Also watch for DOM changes
  const observer = new MutationObserver(() => {
    addOneBlockToMenu();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false
  });
  
  console.log('[OneBlockMenu] Ready!');
})();
