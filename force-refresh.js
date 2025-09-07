const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    console.log('🔄 強制清除快取並重新載入...\n');
    
    // 先訪問頁面
    await page.goto('http://localhost:8888/index.html');
    
    // 清除 localStorage
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
        console.log('已清除所有本地存儲');
    });
    
    // 強制重新載入，繞過快取
    await page.reload({ waitUntil: 'networkidle' });
    
    // 等待載入
    await page.waitForSelector('.timeline-item', { timeout: 5000 });
    await page.waitForTimeout(3000);
    
    // 檢查更新後的內容
    console.log('✅ 檢查更新內容:\n');
    
    // 抓取所有事件的描述
    const events = await page.$$eval('.timeline-item', items => 
        items.slice(0, 5).map(item => ({
            title: item.querySelector('h3')?.textContent || '',
            description: item.querySelector('.timeline-description')?.textContent?.substring(0, 100) || ''
        }))
    );
    
    events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   描述: ${event.description}...\n`);
    });
    
    // 截圖
    await page.screenshot({ 
        path: 'timeline-after-refresh.png',
        fullPage: true 
    });
    
    console.log('📸 新截圖已保存: timeline-after-refresh.png');
    console.log('\n瀏覽器將保持開啟，請檢查內容是否正確更新...');
    
    await page.waitForTimeout(20000);
    await browser.close();
})();