const { chromium } = require('playwright');

async function testTimelines() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();
    
    console.log('Testing original timeline...');
    try {
        // Test original timeline
        await page.goto('http://localhost:8888/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000); // Wait for animations
        await page.screenshot({ 
            path: 'screenshot-original.png', 
            fullPage: true 
        });
        console.log('✅ Original timeline screenshot saved as screenshot-original.png');
    } catch (error) {
        console.error('❌ Error accessing original timeline:', error.message);
    }
    
    console.log('\nTesting modern timeline...');
    try {
        // Test modern timeline
        await page.goto('http://localhost:8888/modern-timeline.html', { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000); // Wait for animations
        
        // Check if the page loaded correctly
        const title = await page.textContent('.timeline-title');
        console.log('Page title found:', title);
        
        // Check for timeline items
        const timelineItems = await page.$$('.timeline-item');
        console.log(`Found ${timelineItems.length} timeline items`);
        
        // Take screenshot
        await page.screenshot({ 
            path: 'screenshot-modern.png', 
            fullPage: true 
        });
        console.log('✅ Modern timeline screenshot saved as screenshot-modern.png');
        
        // Test interaction - click add event button
        const addButton = await page.$('#addEventBtn');
        if (addButton) {
            await addButton.click();
            await page.waitForTimeout(500);
            
            // Check if modal opened
            const modal = await page.$('.modal.active');
            if (modal) {
                console.log('✅ Add event modal opens correctly');
                await page.screenshot({ 
                    path: 'screenshot-modern-modal.png'
                });
                console.log('✅ Modal screenshot saved as screenshot-modern-modal.png');
            }
        }
        
    } catch (error) {
        console.error('❌ Error accessing modern timeline:', error.message);
    }
    
    await browser.close();
    console.log('\n📸 Screenshots saved in project directory');
    console.log('Please check:');
    console.log('  - screenshot-original.png (your current view)');
    console.log('  - screenshot-modern.png (new modern design)');
    console.log('  - screenshot-modern-modal.png (add event modal)');
}

testTimelines().catch(console.error);