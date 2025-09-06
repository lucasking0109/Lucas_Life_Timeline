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
    
    // Wait for animations
    await page.waitForTimeout(3000);
    
    // Take a full page screenshot
    await page.screenshot({ 
        path: 'timeline-final-full.png',
        fullPage: true 
    });
    
    console.log('Full page screenshot saved as timeline-final-full.png');
    
    // Scroll to show different sections
    const sections = await page.$$('.year-section');
    console.log(`Found ${sections.length} year sections`);
    
    for (let i = 0; i < sections.length; i++) {
        await page.evaluate((index) => {
            const elements = document.querySelectorAll('.year-section');
            if (elements[index]) {
                elements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, i);
        await page.waitForTimeout(1500);
        
        await page.screenshot({ 
            path: `timeline-year-${i + 1}.png`,
            fullPage: false 
        });
        console.log(`Screenshot of year section ${i + 1} saved`);
    }
    
    // Check for overlaps
    const overlapInfo = await page.evaluate(() => {
        const yearMarkers = document.querySelectorAll('.year-marker');
        const timelineCards = document.querySelectorAll('.timeline-card');
        let overlaps = [];
        
        for (let marker of yearMarkers) {
            const markerRect = marker.getBoundingClientRect();
            const yearText = marker.querySelector('.year-number')?.textContent;
            
            for (let card of timelineCards) {
                const cardRect = card.getBoundingClientRect();
                const cardTitle = card.querySelector('.card-title')?.textContent;
                
                // Check if they overlap
                const hasOverlap = !(markerRect.right < cardRect.left || 
                                   markerRect.left > cardRect.right || 
                                   markerRect.bottom < cardRect.top || 
                                   markerRect.top > cardRect.bottom);
                
                if (hasOverlap) {
                    overlaps.push({
                        year: yearText,
                        card: cardTitle,
                        markerPos: { top: markerRect.top, bottom: markerRect.bottom },
                        cardPos: { top: cardRect.top, bottom: cardRect.bottom }
                    });
                }
            }
        }
        return overlaps;
    });
    
    if (overlapInfo.length === 0) {
        console.log('✓ SUCCESS: No overlapping elements detected');
    } else {
        console.log('⚠ Overlaps detected:');
        overlapInfo.forEach(info => {
            console.log(`  - Year ${info.year} overlaps with "${info.card}"`);
        });
    }
    
    console.log('Browser will remain open for 10 seconds...');
    await page.waitForTimeout(10000);
    
    await browser.close();
})();