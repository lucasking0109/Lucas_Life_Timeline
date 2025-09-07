const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    console.log('📋 開始驗證時間軸更新...\n');
    
    // Navigate to the timeline
    await page.goto('http://localhost:8888/index.html');
    
    // Wait for timeline to load
    await page.waitForSelector('.timeline-item', { timeout: 5000 });
    await page.waitForTimeout(2000);
    
    // 驗證重要的更新內容
    const verifications = [];
    
    // 1. 檢查 Vici Holdings 是否存在
    const viciExists = await page.locator('text="Vici Holdings - AI Data Scientist Intern"').count();
    verifications.push({
        test: 'Vici Holdings 更新',
        result: viciExists > 0,
        found: viciExists > 0 ? '✅ 找到' : '❌ 未找到'
    });
    
    // 2. 檢查是否還有舊的威旭內容
    const oldContent = await page.locator('text="威旭旗下新公司--威鯨"').count();
    verifications.push({
        test: '移除舊的威旭內容',
        result: oldContent === 0,
        found: oldContent === 0 ? '✅ 已移除' : '❌ 仍存在'
    });
    
    // 3. 檢查 Rotman competition 英文描述
    const rotmanText = await page.locator('text="Led team to 1st place"').count();
    verifications.push({
        test: 'Rotman 英文描述',
        result: rotmanText > 0,
        found: rotmanText > 0 ? '✅ 已更新為英文' : '❌ 未更新'
    });
    
    // 4. 檢查 Clear Island 簡化描述
    const clearIslandText = await page.locator('text="Built a business cycle timing model"').count();
    verifications.push({
        test: 'Clear Island 簡化描述',
        result: clearIslandText > 0,
        found: clearIslandText > 0 ? '✅ 已簡化' : '❌ 未更新'
    });
    
    // 5. 檢查群益期貨英文描述
    const capitalFuturesText = await page.locator('text="z-score mean-reversion model"').count();
    verifications.push({
        test: '群益期貨英文描述',
        result: capitalFuturesText > 0,
        found: capitalFuturesText > 0 ? '✅ 已更新為英文' : '❌ 未更新'
    });
    
    // 6. 檢查是否有重複的 Boston University (2025年9月)
    const events = await page.$$eval('.timeline-item', items => 
        items.map(item => ({
            title: item.querySelector('h3')?.textContent || '',
            date: item.querySelector('.timeline-date')?.textContent || ''
        }))
    );
    
    const bostonCount = events.filter(e => 
        e.title.includes('Boston University') && e.date.includes('2025')
    ).length;
    
    verifications.push({
        test: '刪除重複的 Boston University (2025)',
        result: bostonCount === 0,
        found: bostonCount === 0 ? '✅ 已刪除' : `❌ 仍有 ${bostonCount} 個`
    });
    
    // 打印驗證結果
    console.log('========== 驗證結果 ==========\n');
    verifications.forEach(v => {
        console.log(`${v.test}: ${v.found}`);
    });
    
    // 統計成功率
    const passed = verifications.filter(v => v.result).length;
    const total = verifications.length;
    console.log(`\n總計: ${passed}/${total} 項通過`);
    
    // 顯示所有事件標題
    console.log('\n========== 當前時間軸事件 ==========\n');
    events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title}`);
        console.log(`   時間: ${event.date}\n`);
    });
    
    // 截圖
    await page.screenshot({ 
        path: 'timeline-verification.png',
        fullPage: true 
    });
    console.log('📸 截圖已保存: timeline-verification.png');
    
    // 滾動到特定年份檢查
    await page.evaluate(() => {
        const element = document.querySelector('.year-title');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    
    await page.waitForTimeout(2000);
    
    // 保持瀏覽器開啟以供檢查
    console.log('\n瀏覽器將保持開啟 15 秒供您檢查...');
    await page.waitForTimeout(15000);
    
    await browser.close();
})();