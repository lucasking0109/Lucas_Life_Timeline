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
                id: 1752383058040,
                startYear: 2022,
                startMonth: 11,
                endYear: 2024,
                endMonth: 7,
                year: 2022, // 用於排序
                month: 11,
                title: "Clear Island Co., Ltd. - Investment Analyst/Execution Trader",
                description: "• Built a business cycle timing model yielding an 81%-win rate in low-EPS tech during pre-expansions, with 33% annualized returns and 24% max drawdown over five years.\n• Developed a dynamic VaR system by integrating historical drawdowns with rolling 20-day volatility to enhance real-time risk assessment.\n• Managed a US$350,000 AUM portfolio in the U.S. market from December 2022 to July 2024",
                category: "work",
                images: [],
                createdAt: "2025-01-18T10:00:00.000Z"
            },
            {
                id: 1752383058032,
                year: 2025,
                month: 7,
                title: "Vici Holdings - AI Data Scientist Intern",
                description: "Conducted AI trading strategy research at Vici Holdings FIC Department's Strategy Research Lab.\n• Applied LLMs to extract and quantify indicators of management quality from U.S. 10-K filings and assessed their relationship with long-term stock performance using permutation tests.\n• Developed a multi-agent LLM system that surfaces impactful news, maps scenario paths, and generates trading suggestions based on M&A valuation and short interest/margin activity.\n• Analyzed trading opportunities in preferred stocks, specifically focusing on conversion terms and interest rate resets in merger and acquisition scenarios between companies.",
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
                title: "Automated Investment Style Classification for Mutual Fund Prospectuses Using NLP",
                description: "1. Data preprocessing and tokenization 2. Generated domain-specific word embeddings using Skip-gram Word2Vec 3. Built Knowledge Base to calculate cosine distance between document vectors and style centroids as additional features 4. Performed classification based on features and vectors using Regression, Random Forest, and XGBoost 5. Evaluated on test data, achieving an automated fund style classification system with 66% accuracy using XGBoost",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.034Z"
            },
            {
                id: 1752383058035,
                year: 2025,
                month: 4,
                title: "Kaggle Competition: Company Bankruptcy Prediction",
                description: "1. Data preprocessing: Applied StandardScaler for feature normalization; addressed extreme class imbalance between 'bankrupt' and 'non-bankrupt' using SMOTE oversampling within each cross-validation fold 2. Built Pipeline connecting StandardScaler → SMOTE → Classifier, ensuring resampling occurred only during training phase to prevent data leakage 3. Tested multiple classification algorithms: Random Forest, Support Vector Machine (SVM), XGBoost, optimizing for F1 score as primary metric 4. Cross-validation tuning: Calculated optimal parameters within each CV fold; both Random Forest and XGBoost achieved ~0.50 F1 score on validation set 5. XGBoost model achieved 0.46 F1 score on test set, demonstrating PR97 model stability",
                category: "work",
                images: [],
                createdAt: "2025-07-13T05:30:58.035Z"
            },
            {
                id: 1752383058036,
                year: 2025,
                month: 3,
                title: "IMC Prosperity 3",
                description: "Achieved global top 1% ranking, Taiwan #1 (133rd place out of 12,621 teams)",
                category: "personal",
                images: [],
                createdAt: "2025-07-13T05:30:58.036Z"
            },
            {
                id: 1752382065035,
                year: 2025,
                month: 4,
                title: "Big Data Cleaning and Application",
                description: "1. Processed 400+ stocks' 1-minute price data from Polygon.io (May 2023 - May 2025) using PySpark, converting to Parquet format for efficient processing\n\n2. Identified stock price anomalies in Polygon.io data by calculating VWAP and comparing statistical values across different data sources\n\n3. Conducted regression analysis proving returns don't follow normal distribution; analyzed that most stock trading volume concentrates in the last 30 minutes before market close; used ACF analysis to demonstrate most returns lack autocorrelation",
                category: "work",
                images: [],
                createdAt: "2025-07-13T04:47:45.035Z"
            },
            {
                id: 1752382116528,
                year: 2025,
                month: 3,
                title: "U.S. Treasury Spot Yield Curve Fitting (2015-2025)",
                description: "1. Used Bloomberg 2015-2025 Treasury par yield rates, deriving Spot Yield Curve through Bootstrap method\n2. Applied Ho-Lee, Hull-White, Vasicek, Nelson-Siegel models, as well as LSTM, Random Forest, and Gradient Boosting Regression for model fitting and pricing\n3. Nelson-Siegel Model showed optimal stability with potential for price prediction and trading; LSTM model demonstrated very high accuracy, requiring further cross-validation to verify absence of overfitting",
                category: "work",
                images: [],
                createdAt: "2025-07-13T04:48:36.528Z"
            },
            {
                id: 1752382000001,
                year: 2025,
                month: 2,
                title: "Rotman International Trading Competition",
                description: "Led team to 1st place in the MSMFT internal competition: advanced to global finals by coordinating strategies and ensuring alignment across team members under real-time trading pressure.\n• Focused on relative value and tender-offer-driven opportunities, systematically capturing arbitrage from structural and team-driven market mechanisms instead of relying on directional bets.\n• Achieved 2nd place globally in the Sales & Trader Case among 35 teams, showcasing strong teamwork, disciplined execution, and effective risk management.",
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
                description: "Bachelor of Business Administration",
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
                description: "Exchange student with scholarship at Hanze University of Applied Sciences | Hanze UAS, studying Brand, Design & Psychology",
                category: "education",
                images: [],
                createdAt: "2025-07-13T04:57:10.409Z"
            },
            {
                id: 1752382210876,
                startYear: 2020,
                startMonth: 9,
                endYear: 2021,
                endMonth: 5,
                year: 2020, // 用於排序
                month: 9,
                title: "Capital Futures Leverage Trading Department - Trading Intern - MT5 Strategy Development and Portfolio Construction",
                description: "• Developed a z-score mean-reversion model with AR(1) reversion strength; ATR-based dynamic bands and vol-scaled sizing that delivered +32% annual return vs. the prior model.\n• Built trend-following strategies with volatility filters across Forex CFDs/time frames, forming diversified long/short portfolios; reduced portfolio volatility by 39%, raised win rate by 26%, and deployed to live trading.",
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
                            <h2 class="year-title">${year}</h2>
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
        const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        // 支持時間段顯示
        let dateDisplay = '';
        if (event.startYear && event.endYear) {
            // 時間段格式
            if (event.startYear === event.endYear) {
                if (event.startMonth === event.endMonth) {
                    dateDisplay = `${monthNames[event.startMonth]} ${event.startYear}`;
                } else {
                    dateDisplay = `${monthNames[event.startMonth]} - ${monthNames[event.endMonth]} ${event.startYear}`;
                }
            } else {
                dateDisplay = `${monthNames[event.startMonth]} ${event.startYear} - ${monthNames[event.endMonth]} ${event.endYear}`;
            }
        } else {
            // 向後兼容舊格式
            dateDisplay = `${monthNames[event.month]} ${event.year}`;
        }
        
        return `
            <div class="timeline-item ${event.category}" data-id="${event.id}">
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div>
                            <h3>${this.escapeHtml(event.title)}</h3>
                            <div class="timeline-date">${dateDisplay}</div>
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
        
        this.yearFilter.innerHTML = '<option value="all">All Years</option>' +
            years.map(year => `<option value="${year}">${year}</option>`).join('');
        
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
