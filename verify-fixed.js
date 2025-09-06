const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Set viewport for better visibility
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the modern timeline
    await page.goto('http://localhost:8888/modern-timeline.html');
    
    // Wait for timeline items to load
    await page.waitForSelector('.timeline-item', { timeout: 5000 });
    
    // Wait a bit for animations
    await page.waitForTimeout(2000);
    
    // Scroll to see the 2022 section where overlap was happening
    await page.evaluate(() => {
        const element = document.querySelector('.year-section:nth-of-type(3)');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    await page.waitForTimeout(2000);
    
    // Take a screenshot focusing on the overlap area
    await page.screenshot({ 
        path: 'timeline-fixed-overlap.png',
        fullPage: false
    });
    
    console.log('Screenshot saved as timeline-fixed-overlap.png');
    
    // Check for any overlapping elements
    const hasOverlap = await page.evaluate(() => {
        const yearMarkers = document.querySelectorAll('.year-marker');
        const timelineCards = document.querySelectorAll('.timeline-card');
        
        for (let marker of yearMarkers) {
            const markerRect = marker.getBoundingClientRect();
            for (let card of timelineCards) {
                const cardRect = card.getBoundingClientRect();
                
                // Check if they overlap
                const overlap = !(markerRect.right < cardRect.left || 
                                markerRect.left > cardRect.right || 
                                markerRect.bottom < cardRect.top || 
                                markerRect.top > cardRect.bottom);
                
                if (overlap) {
                    console.log('Overlap detected between year marker and card');
                    return true;
                }
            }
        }
        return false;
    });
    
    if (!hasOverlap) {
        console.log('✓ SUCCESS: No overlapping elements detected');
    } else {
        console.log('⚠ WARNING: Some elements may still be overlapping');
    }
    
    // Keep browser open for inspection
    console.log('Browser will remain open for 10 seconds...');
    await page.waitForTimeout(10000);
    
    await browser.close();
})();