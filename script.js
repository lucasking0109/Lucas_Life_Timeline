class TimelineApp {
    constructor() {
        this.events = [];
        this.currentEditingEvent = null;
        this.debugMode = false;
        this.apiBaseUrl = '/.netlify/functions';
        this.isNetlifyEnvironment = window.location.hostname !== 'localhost';
        
        this.initializeElements();
        this.bindEvents();
        this.init();
    }

    async init() {
        this.initializeElements();
        this.bindEvents();
        await this.loadEvents();
        this.renderTimeline();
        this.updateYearFilter();
    }

    initializeElements() {
        this.timelineContainer = document.querySelector('.timeline-container');
        this.addEventBtn = document.getElementById('addEventBtn');
        this.modal = document.querySelector('.modal');
        this.eventForm = document.querySelector('.event-form');
        this.yearFilter = document.getElementById('yearFilter');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.imageInput = document.querySelector('.image-input');
        this.imagePreview = document.querySelector('.image-preview');
        this.createWebsiteExportBtn();
    }

    bindEvents() {
        // 添加錯誤處理，確保元素存在才綁定事件
        if (this.addEventBtn) {
            this.addEventBtn.addEventListener('click', () => this.openModal());
        }
        if (this.eventForm) {
            this.eventForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        if (this.yearFilter) {
            this.yearFilter.addEventListener('change', () => this.renderTimeline());
        }
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.renderTimeline());
        }
        if (this.imageInput) {
            this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        // 關閉modal的事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-btn')) {
                this.closeModal();
            }
        });
    }

    createWebsiteExportBtn() {
        const exportBtn = document.createElement('button');
        exportBtn.textContent = '📋 複製數據';
        exportBtn.className = 'website-export-btn';
        exportBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #f39c12;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        exportBtn.addEventListener('click', () => this.exportDataForWebsite());
        document.body.appendChild(exportBtn);
    }

    async loadEvents() {
        if (this.isNetlifyEnvironment) {
            await this.loadDataFromAPI();
        } else {
            const stored = localStorage.getItem('timelineEvents');
            this.events = stored ? JSON.parse(stored) : this.getDefaultData();
        }
        
        // 在Netlify環境中也保存到localStorage以便後續使用
        if (this.isNetlifyEnvironment) {
            const stored = localStorage.getItem('timelineEvents');
            if (!stored) {
                localStorage.setItem('timelineEvents', JSON.stringify(this.events));
            }
        }
    }

    async loadDataFromAPI() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/get-timeline`);
            if (response.ok) {
                const data = await response.json();
                this.events = data.length > 0 ? data : this.getDefaultData();
            } else {
                console.log('API不可用，使用默認數據');
                this.events = this.getDefaultData();
            }
        } catch (error) {
            console.log('API連接失敗，使用默認數據:', error);
            this.events = this.getDefaultData();
        }
    }

    getDefaultData() {
        return [
            {
                id: 1752383058031,
                year: 2025,
                month: 7,
                title: "使用 Claude Artifact 創建個人網頁",
                description: "透過 Claude 的 Artifact 功能創建了一個個人時間軸網頁，展示人生的重要時刻和里程碑。這個專案讓我學習了 HTML、CSS 和 JavaScript 的應用，也體驗了 AI 輔助開發的強大潛力。",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.031Z"
            },
            {
                id: 1752382065035,
                year: 2025,
                month: 3,
                title: "Big Data Cleaning and Application",
                description: "1. 使用 Pyspark 處理來自 Polygon.io 的 400 多隻股票 2023/05-2025/05 的分鐘級別資料，改為 Parquet 格式方便快速處理\n\n2. 發現商品異常值並計算 VWAP，並比較 data 與其他資料來源的差異性\n\n3. 對資料進行回歸分析、證實報酬率不符合常態分佈、分析絕大部分股票交易量主要集中於每日收盤前半小時、使用 ACF 分析大部分報酬率不具有滯後性",
                category: "work",
                images: [],
                createdAt: "2025-07-13T04:47:45.035Z"
            },
            {
                id: 1752382116528,
                year: 2025,
                month: 3,
                title: "2015–2025 美國國債即期收益率曲線擬合",
                description: "1. 使用 Bloomberg 2015–2025 年期國債平價收益率，用 Bootstrap 推導出 Spot Yield Curve\n2. 分別套用 Ho–Lee、Hull–White、Vasicek、Nelson–Siegel 以及 LSTM、Random Forest、Gradient Boosting Regression 去擬和 model 與價\n3. Nelson–Siegel Model 有最佳的穩定度與並可能可以近一步使用進行價格預測以及交易、LSTM model 展現出非常高的 Accuracy，可以進一步進行許多Cross-Validation 確定是否有無過擬和的問題",
                category: "work",
                images: [],
                createdAt: "2025-07-13T04:48:36.528Z"
            },
            {
                id: 1752382000001,
                year: 2025,
                month: 2,
                title: "Rotman international trading competition",
                description: "波士頓大學校內競賽第一名，代表赴多倫多參加決賽。在30多隊伍中，在Sales and trader Case中獲得全球第二名的佳績",
                category: "personal",
                images: [],
                createdAt: "2025-07-13T02:22:45.654Z"
            },
            {
                id: 1752382489356,
                year: 2024,
                month: 9,
                title: "Boston University MS Mathematical Finance& Financial Technology",
                description: "",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:54:49.356Z"
            },
            {
                id: 1752382440804,
                year: 2023,
                month: 10,
                title: "CFA Level 1 Passed",
                description: "",
                category: "personal",
                images: [],
                createdAt: "2025-07-13T04:54:00.804Z"
            },
            {
                id: 1752382347468,
                year: 2023,
                month: 6,
                title: "Graduated from National Taiwan University",
                description: "",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:52:27.468Z"
            },
            {
                id: 1752382630409,
                year: 2022,
                month: 2,
                title: "Hanze UAS",
                description: "Exchange student with scholarship in Hanze University of Applied Sciences | Hanze UAS, study in Brand, Design& Psychology",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:57:10.409Z"
            },
            {
                id: 1752382210876,
                year: 2021,
                month: 7,
                title: "使用 MT5 建構交易策略",
                description: "1. 蒐集、匯入資料\n2. 交易策略概念發想，使用 MQL5 語言撰寫策略，主要以價格變動當作參考對象，使用技術指標，包括跨週期策略、趨勢跟蹤策略、均值回歸超跌反彈等策略。\n3. 回測挑選適合策略的標的，針對不同特型的商品做微調以及增加濾網\n4. 透過 in-of-sample, out-of-sample 資料或是 rolling window 方式去最佳化參數，其中以不同目標作為最佳化對象，例如 Sharpe ratio、Profits/Max Drawdown 等\n5. 比較策略之間進出場點位分析策略相關性，最終使用有 7 個策略，總共使用於 130 多種不同商品、週期的 CFD 商品，並且架設 VPS 虛擬主機 24 小時運行策略\n6. 建構投資組合，每三個月調整策略權重",
                category: "work",
                images: [],
                createdAt: "2025-07-13T02:22:45.654Z"
            }
        ];
    }

    async saveEvents() {
        if (this.isNetlifyEnvironment) {
            await this.saveDataToAPI();
        } else {
            localStorage.setItem('timelineEvents', JSON.stringify(this.events));
        }
    }

    async saveDataToAPI() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/save-timeline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events: this.events })
            });
            
            if (response.ok) {
                console.log('數據已保存到 API');
                localStorage.setItem('timelineEvents', JSON.stringify(this.events));
            } else {
                console.error('保存到 API 失敗');
            }
        } catch (error) {
            console.error('API 保存錯誤:', error);
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
        this.currentEditingEvent = null;
    }

    openModal(event = null) {
        if (!this.modal) return;
        
        this.modal.style.display = 'flex';
        this.currentEditingEvent = event;
        
        if (event) {
            // 編輯模式
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventYear').value = event.year;
            document.getElementById('eventMonth').value = event.month;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventCategory').value = event.category;
        } else {
            // 新增模式
            if (this.eventForm) {
                this.eventForm.reset();
            }
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('eventTitle').value;
        const year = parseInt(document.getElementById('eventYear').value);
        const month = parseInt(document.getElementById('eventMonth').value);
        const description = document.getElementById('eventDescription').value;
        const category = document.getElementById('eventCategory').value;
        
        if (this.currentEditingEvent) {
            // 編輯現有事件
            this.currentEditingEvent.title = title;
            this.currentEditingEvent.year = year;
            this.currentEditingEvent.month = month;
            this.currentEditingEvent.description = description;
            this.currentEditingEvent.category = category;
        } else {
            // 新增事件
            const newEvent = {
                id: Date.now(),
                title,
                year,
                month,
                description,
                category,
                images: [],
                createdAt: new Date().toISOString()
            };
            this.events.push(newEvent);
        }
        
        await this.saveEvents();
        this.renderTimeline();
        this.updateYearFilter();
        this.closeModal();
        this.showToast('事件已保存！');
    }

    async deleteEvent(eventId) {
        if (confirm('確定要刪除這個事件嗎？')) {
            this.events = this.events.filter(event => event.id !== eventId);
            await this.saveEvents();
            this.renderTimeline();
            this.updateYearFilter();
            this.showToast('事件已刪除！');
        }
    }

    renderTimeline() {
        if (!this.timelineContainer) return;
        
        const selectedYear = this.yearFilter ? this.yearFilter.value : 'all';
        const selectedCategory = this.categoryFilter ? this.categoryFilter.value : 'all';
        
        let filteredEvents = this.events;
        
        if (selectedYear !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.year.toString() === selectedYear);
        }
        
        if (selectedCategory !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
        }
        
        // 按年份和月份排序（新到舊）
        filteredEvents.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });
        
        if (filteredEvents.length === 0) {
            this.timelineContainer.innerHTML = '<div class="no-events">還沒有任何事件</div>';
            return;
        }
        
        this.timelineContainer.innerHTML = filteredEvents.map(event => this.createEventElement(event)).join('');
    }

    createEventElement(event) {
        const monthNames = ['', '一月', '二月', '三月', '四月', '五月', '六月', 
                           '七月', '八月', '九月', '十月', '十一月', '十二月'];
        
        return `
            <div class="timeline-item ${event.category}" data-id="${event.id}">
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${this.escapeHtml(event.title)}</h3>
                        <div class="timeline-date">${event.year}年${monthNames[event.month]}</div>
                        <div class="timeline-category">${this.getCategoryName(event.category)}</div>
                    </div>
                    <p class="timeline-description">${this.escapeHtml(event.description).replace(/\n/g, '<br>')}</p>
                    <div class="timeline-actions">
                        <button onclick="app.openModal(app.getEventById(${event.id}))" class="edit-btn">編輯</button>
                        <button onclick="app.deleteEvent(${event.id})" class="delete-btn">刪除</button>
                    </div>
                </div>
            </div>
        `;
    }

    getEventById(id) {
        return this.events.find(event => event.id === id);
    }

    getCategoryName(category) {
        const categoryNames = {
            work: '工作',
            education: '教育',
            personal: '個人',
            travel: '旅行',
            other: '其他'
        };
        return categoryNames[category] || category;
    }

    updateYearFilter() {
        if (!this.yearFilter) return;
        
        const years = [...new Set(this.events.map(event => event.year))].sort((a, b) => b - a);
        const currentValue = this.yearFilter.value;
        
        this.yearFilter.innerHTML = '<option value="all">所有年份</option>' +
            years.map(year => `<option value="${year}">${year}年</option>`).join('');
        
        if (years.includes(parseInt(currentValue))) {
            this.yearFilter.value = currentValue;
        }
    }

    showToast(message, type = 'info') {
        // 移除現有的 toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    escapeHtml(text) {
        if (!text) return '';
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    handleImageUpload(event) {
        // 圖片上傳功能預留
    }

    displayImagePreview() {
        // 圖片預覽功能預留
    }

    exportDataForWebsite() {
        const dataStr = JSON.stringify(this.events, null, 2);
        const textarea = document.createElement('textarea');
        textarea.value = `// 導出的真實數據，請替換到 script.js 中的 getDefaultData() 方法\nreturn ${dataStr};`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        this.showToast('數據已複製到剪貼板！請貼到 script.js 的 getDefaultData() 方法中');
    }
}

// 等待DOM加載完成後初始化
document.addEventListener('DOMContentLoaded', async function() {
    const app = new TimelineApp();
    await app.init();
    window.app = app;
});
