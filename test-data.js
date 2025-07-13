console.log("開始檢查資料載入...");
const testApp = new TimelineApp();
setTimeout(() => {
    console.log("Events loaded:", testApp.events.length);
    testApp.events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title} (${event.year}年${event.month}月)`);
    });
}, 1000);
