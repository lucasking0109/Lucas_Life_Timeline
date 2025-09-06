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
    
    // Scroll through the timeline to load all items
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Scroll back to top
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    
    // Take a screenshot
    await page.screenshot({ 
        path: 'timeline-no-tags.png',
        fullPage: true 
    });
    
    console.log('Screenshot saved as timeline-no-tags.png');
    
    // Check if any tag elements still exist
    const tagElements = await page.$$('.card-tags');
    const tagCount = tagElements.length;
    
    if (tagCount === 0) {
        console.log('✓ SUCCESS: No tag elements found on the page');
    } else {
        console.log(`⚠ WARNING: Found ${tagCount} tag elements still on the page`);
    }
    
    // Keep browser open for manual inspection
    console.log('Browser will remain open for 10 seconds for inspection...');
    await page.waitForTimeout(10000);
    
    await browser.close();
})();