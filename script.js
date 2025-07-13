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
        
        // 時間段輸入相關元素
        this.isTimeRangeCheckbox = document.getElementById('isTimeRange');
        this.singleTimeInputs = document.getElementById('singleTimeInputs');
        this.timeRangeInputs = document.getElementById('timeRangeInputs');
        
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
        
        // 時間段切換事件
        if (this.isTimeRangeCheckbox) {
            this.isTimeRangeCheckbox.addEventListener('change', () => this.toggleTimeRangeInputs());
        }
        
        // 關閉modal的事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-btn')) {
                this.closeModal();
            }
        });
    }

    toggleTimeRangeInputs() {
        if (this.isTimeRangeCheckbox && this.singleTimeInputs && this.timeRangeInputs) {
            if (this.isTimeRangeCheckbox.checked) {
                this.singleTimeInputs.style.display = 'none';
                this.timeRangeInputs.style.display = 'block';
                
                // 更新required屬性
                document.getElementById('eventYear').required = false;
                document.getElementById('eventMonth').required = false;
                document.getElementById('startYear').required = true;
                document.getElementById('startMonth').required = true;
                document.getElementById('endYear').required = true;
                document.getElementById('endMonth').required = true;
            } else {
                this.singleTimeInputs.style.display = 'block';
                this.timeRangeInputs.style.display = 'none';
                
                // 更新required屬性
                document.getElementById('eventYear').required = true;
                document.getElementById('eventMonth').required = true;
                document.getElementById('startYear').required = false;
                document.getElementById('startMonth').required = false;
                document.getElementById('endYear').required = false;
                document.getElementById('endMonth').required = false;
            }
        }
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
        // 首先嘗試從localStorage載入
        const stored = localStorage.getItem('timelineEvents');
        
        if (stored) {
            // 如果localStorage有數據，使用它
            this.events = JSON.parse(stored);
        } else if (this.isNetlifyEnvironment) {
            // 如果在Netlify環境且沒有本地數據，嘗試從API載入
            await this.loadDataFromAPI();
        } else {
            // 如果都沒有，使用默認數據
            this.events = this.getDefaultData();
            // 立即保存到localStorage
            localStorage.setItem('timelineEvents', JSON.stringify(this.events));
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
        
        // 將載入的數據保存到localStorage
        localStorage.setItem('timelineEvents', JSON.stringify(this.events));
    }

    getDefaultData() {
        return [
     
            {
                id: 1752383058032,
                year: 2025,
                month: 7,
                title: "威旭旗下新公司--威鯨 實習",
                description: "在參加完線上coding測驗+金融考試+主管面試+HR面試後，當場錄取在Strategy Research Lab當任AI Data Scientists Intern，專研應用LLM 以及訓練agent進行量化交易",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.032Z"
            },
            {
                id: 1752383058033,
                year: 2025,
                month: 5,
                title: "CFA Level 2 Passed",
                description: "",
                category: "personal",
                images: [],
                createdAt: "2025-07-13T05:30:58.033Z"
            },
            {
                id: 1752383058034,
                year: 2025,
                month: 5,
                title: "利用 NLP 自動辨識 Mutual Fund Prospectus 的投資風格",
                description: "1. 資料預處理、分詞 2. 用 Skip-gram Word2Vec 生成專屬詞向量 3. 建立 Knowledge Base 計算文件向量與風格中心的餘弦距離作為額外特徵 4. 基於特徵及向量進行分類，使用 Regression, Random Forest, XGBoost 5. 在 test data 上進行評估，最終達成可以自動辨識基金風格的系統，最終在 test data 上 XGBoost 分類模型達到 66% 的 Accuracy",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.034Z"
            },
            {
                id: 1752383058035,
                year: 2025,
                month: 4,
                title: "Kaggle Competition: Company Bankruptcy Prediction",
                description: "1. 資料預處理: 用 StandardScaler 對所有特徵標準化，針對「破產」與「未破產」兩類資料極度不均衡，於每個交叉驗證折內使用 SMOTE 進行過採樣 2. 建立 Pipeline 串接 StandardScaler → SMOTE → 分類器，保證 resampling 僅發生在訓練階段，避免資料外洩互相污染 3. 嘗試多種分類演算法:Random Forest、Support Vector Machine (SVM)、XGBoost，以 F1 score 作為主要優化指標進行最佳化 4. 交叉驗證調校：在每個 CV 折內計算佳參數，Random Forest 與 XGBoost 於驗證集上均能取得約 0.50 左右的 F1 score 5. XGBoost 模型在測試集達到 0.46 的 F1 score，展現 PR97 的 model 穩定度",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.035Z"
            },
            {
                id: 1752383058036,
                year: 2025,
                month: 3,
                title: "IMC Prosperity 3",
                description: "獲得全球 top 1% 名次，台灣第一名 (第 133 名/總共 12621 隊伍)",
                category: "personal",
                images: [],
                createdAt: "2025-07-13T05:30:58.036Z"
            },
            {
                id: 1752382065035,
                year: 2025,
                month: 4,
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
                year: 2022,
                month: 6,
                title: "Graduated from Soochow University",
                description: "Business Administration 學士",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:52:27.468Z"
            },
            {
                id: 1752382630409,
                startYear: 2022,
                startMonth: 2,
                endYear: 2022,
                endMonth: 6,
                year: 2022, // 用於排序
                month: 2,
                title: "Hanze UAS",
                description: "Exchange student with scholarship in Hanze University of Applied Sciences | Hanze UAS, study in Brand, Design& Psychology",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:57:10.409Z"
            },
            {
                id: 1752382210876,
                startYear: 2021,
                startMonth: 7,
                endYear: 2023,
                endMonth: 12,
                year: 2021, // 用於排序
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
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventCategory').value = event.category;
            
            // 檢查是否為時間段事件
            const isTimeRange = event.startYear && event.endYear;
            this.isTimeRangeCheckbox.checked = isTimeRange;
            
            if (isTimeRange) {
                // 時間段事件
                document.getElementById('startYear').value = event.startYear;
                document.getElementById('startMonth').value = event.startMonth;
                document.getElementById('endYear').value = event.endYear;
                document.getElementById('endMonth').value = event.endMonth;
            } else {
                // 單一時間點事件
                document.getElementById('eventYear').value = event.year;
                document.getElementById('eventMonth').value = event.month;
            }
            
            // 切換顯示相應的輸入框
            this.toggleTimeRangeInputs();
        } else {
            // 新增模式
            if (this.eventForm) {
                this.eventForm.reset();
            }
            // 重置為單一時間點模式
            this.isTimeRangeCheckbox.checked = false;
            this.toggleTimeRangeInputs();
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('eventTitle').value;
        const description = document.getElementById('eventDescription').value;
        const category = document.getElementById('eventCategory').value;
        const isTimeRange = this.isTimeRangeCheckbox.checked;
        
        let eventData = {
            title,
            description,
            category
        };
        
        if (isTimeRange) {
            // 時間段模式
            eventData.startYear = parseInt(document.getElementById('startYear').value);
            eventData.startMonth = parseInt(document.getElementById('startMonth').value);
            eventData.endYear = parseInt(document.getElementById('endYear').value);
            eventData.endMonth = parseInt(document.getElementById('endMonth').value);
            
            // 為了排序，使用開始時間作為主要排序依據
            eventData.year = eventData.startYear;
            eventData.month = eventData.startMonth;
        } else {
            // 單一時間點模式
            eventData.year = parseInt(document.getElementById('eventYear').value);
            eventData.month = parseInt(document.getElementById('eventMonth').value);
        }
        
        if (this.currentEditingEvent) {
            // 編輯現有事件
            Object.assign(this.currentEditingEvent, eventData);
        } else {
            // 新增事件
            const newEvent = {
                id: Date.now(),
                ...eventData,
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
            this.timelineContainer.innerHTML = '<div class="empty-state show"><div class="empty-icon">📅</div><h3>還沒有任何事件</h3><p>點擊上方的「新增事件」按鈕開始記錄你的人生時間軸</p></div>';
            return;
        }
        
        // 按年份分組
        const eventsByYear = {};
        filteredEvents.forEach(event => {
            if (!eventsByYear[event.year]) {
                eventsByYear[event.year] = [];
            }
            eventsByYear[event.year].push(event);
        });
        
        let html = '<div class="timeline">';
        
        Object.keys(eventsByYear).sort((a, b) => b - a).forEach(year => {
            html += `<div class="year-group">
                        <div class="year-header">
                            <h2 class="year-title">${year}年</h2>
                        </div>`;
            
            eventsByYear[year].forEach(event => {
                html += this.createEventElement(event);
            });
            
            html += '</div>';
        });
        
        html += '</div>';
        this.timelineContainer.innerHTML = html;
    }
    

    
    createEventElement(event) {
        const monthNames = ['', '一月', '二月', '三月', '四月', '五月', '六月', 
                           '七月', '八月', '九月', '十月', '十一月', '十二月'];
        
        // 支持時間段顯示
        let dateDisplay = '';
        if (event.startYear && event.endYear) {
            // 時間段格式
            if (event.startYear === event.endYear) {
                if (event.startMonth === event.endMonth) {
                    dateDisplay = `${event.startYear}年${monthNames[event.startMonth]}`;
                } else {
                    dateDisplay = `${event.startYear}年${monthNames[event.startMonth]} - ${monthNames[event.endMonth]}`;
                }
            } else {
                dateDisplay = `${event.startYear}年${monthNames[event.startMonth]} - ${event.endYear}年${monthNames[event.endMonth]}`;
            }
        } else {
            // 向後兼容舊格式
            dateDisplay = `${event.year}年${monthNames[event.month]}`;
        }
        
        return `
            <div class="timeline-item ${event.category}" data-id="${event.id}">
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div>
                            <h3>${this.escapeHtml(event.title)}</h3>
                            <div class="timeline-date">${dateDisplay}</div>
                            <div class="timeline-category">${this.getCategoryName(event.category)}</div>
                        </div>
                        <div class="timeline-actions">
                            <button onclick="app.openModal(app.getEventById(${event.id}))" class="edit-btn">編輯</button>
                            <button onclick="app.deleteEvent(${event.id})" class="delete-btn">刪除</button>
                        </div>
                    </div>
                    <p class="timeline-description">${this.escapeHtml(event.description).replace(/\n/g, '<br>')}</p>
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
    
    // 重置數據到默認狀態
    resetToDefault() {
        if (confirm('確定要重置所有數據到默認狀態嗎？這將刪除所有編輯的內容。')) {
            localStorage.removeItem('timelineEvents');
            this.events = this.getDefaultData();
            localStorage.setItem('timelineEvents', JSON.stringify(this.events));
            this.renderTimeline();
            this.updateYearFilter();
            this.showToast('數據已重置到默認狀態！');
        }
    }
}

// 等待DOM加載完成後初始化
document.addEventListener('DOMContentLoaded', async function() {
    const app = new TimelineApp();
    await app.init();
    window.app = app;
});
