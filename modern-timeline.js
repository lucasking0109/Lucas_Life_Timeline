// Modern Timeline JavaScript - Enhanced Version
class ModernTimeline {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'all';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.loadEvents();
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initDynamicEffects();
    }

    loadEvents() {
        const savedEvents = localStorage.getItem('lucasTimelineEvents');
        if (savedEvents) {
            this.events = JSON.parse(savedEvents);
        } else {
            // Real events data from original timeline
            this.events = this.getDefaultData();
            this.saveEvents();
        }
        this.filteredEvents = [...this.events];
        this.sortEvents();
    }

    getDefaultData() {
        // Converting real data to modern timeline format
        const originalData = [
            {
                id: 1752383058032,
                year: 2025,
                month: 7,
                title: "威旭旗下新公司--威鯨 實習",
                description: "在參加完線上coding測驗+金融考試+主管面試+HR面試後，當場錄取在Strategy Research Lab當任AI Data Scientists Intern，專研應用LLM 以及訓練agent進行量化交易",
                category: "work",
                ongoing: true
            },
            {
                id: 1752383058033,
                year: 2025,
                month: 5,
                title: "CFA Level 2 Passed",
                description: "",
                category: "personal"
            },
            {
                id: 1752383058034,
                year: 2025,
                month: 5,
                title: "利用 NLP 自動辨識 Mutual Fund Prospectus 的投資風格",
                description: "1. 資料預處理、分詞 2. 用 Skip-gram Word2Vec 生成專屬詞向量 3. 建立 Knowledge Base 計算文件向量與風格中心的餘弦距離作為額外特徵 4. 基於特徵及向量進行分類，使用 Regression, Random Forest, XGBoost 5. 在 test data 上進行評估，最終達成可以自動辨識基金風格的系統，最終在 test data 上 XGBoost 分類模型達到 66% 的 Accuracy",
                category: "work"
            },
            {
                id: 1752383058035,
                year: 2025,
                month: 4,
                title: "Kaggle Competition: Company Bankruptcy Prediction",
                description: "1. 資料預處理: 用 StandardScaler 對所有特徵標準化，針對「破產」與「未破產」兩類資料極度不均衡，於每個交叉驗證折內使用 SMOTE 進行過採樣 2. 建立 Pipeline 串接 StandardScaler → SMOTE → 分類器，保證 resampling 僅發生在訓練階段，避免資料外洩互相污染 3. 嘗試多種分類演算法:Random Forest、Support Vector Machine (SVM)、XGBoost，以 F1 score 作為主要優化指標進行最佳化 4. 交叉驗證調校：在每個 CV 折內計算佳參數，Random Forest 與 XGBoost 於驗證集上均能取得約 0.50 左右的 F1 score 5. XGBoost 模型在測試集達到 0.46 的 F1 score，展現 PR97 的 model 穩定度",
                category: "work"
            },
            {
                id: 1752382065035,
                year: 2025,
                month: 4,
                title: "Big Data Cleaning and Application",
                description: "1. 使用 Pyspark 處理來自 Polygon.io 的 400 多隻股票 2023/05-2025/05 的分鐘級別資料，改為 Parquet 格式方便快速處理\n\n2. 發現商品異常值並計算 VWAP，並比較 data 與其他資料來源的差異性\n\n3. 對資料進行回歸分析、證實報酬率不符合常態分佈、分析絕大部分股票交易量主要集中於每日收盤前半小時、使用 ACF 分析大部分報酬率不具有滯後性",
                category: "work"
            },
            {
                id: 1752383058036,
                year: 2025,
                month: 3,
                title: "IMC Prosperity 3",
                description: "獲得全球 top 1% 名次，台灣第一名 (第 133 名/總共 12621 隊伍)",
                category: "personal"
            },
            {
                id: 1752382116528,
                year: 2025,
                month: 3,
                title: "2015–2025 美國國債即期收益率曲線擬合",
                description: "1. 使用 Bloomberg 2015–2025 年期國債平價收益率，用 Bootstrap 推導出 Spot Yield Curve\n2. 分別套用 Ho–Lee、Hull–White、Vasicek、Nelson–Siegel 以及 LSTM、Random Forest、Gradient Boosting Regression 去擬和 model 與價\n3. Nelson–Siegel Model 有最佳的穩定度與並可能可以近一步使用進行價格預測以及交易、LSTM model 展現出非常高的 Accuracy，可以進一步進行許多Cross-Validation 確定是否有無過擬和的問題",
                category: "work"
            },
            {
                id: 1752382000001,
                year: 2025,
                month: 2,
                title: "Rotman international trading competition",
                description: "波士頓大學校內競賽第一名，代表赴多倫多參加決賽。在30多隊伍中，在Sales and trader Case中獲得全球第二名的佳績",
                category: "personal"
            },
            {
                id: 1752382489356,
                year: 2024,
                month: 9,
                title: "Boston University MS Mathematical Finance& Financial Technology",
                description: "",
                category: "education"
            },
            {
                id: 1752382440804,
                year: 2023,
                month: 10,
                title: "CFA Level 1 Passed",
                description: "",
                category: "personal"
            },
            {
                id: 1752383058040,
                startYear: 2022,
                startMonth: 11,
                endYear: 2024,
                endMonth: 7,
                year: 2022,
                month: 11,
                title: "Clear Island Co., Ltd. - Investment Analyst/Execution Trader",
                description: "• Conducted rolling linear regression analysis on U.S. and Taiwanese markets, uncovering structural differences in trend consistency that informed cross-market asset allocation strategies.\n\n• Designed and implemented a Python-based business-cycle timing model to identify optimal entry points. Backtests demonstrated an 81%+ win rate in low-EPS technology sectors during pre-expansions, with maximum drawdowns of 24% and annualized returns exceeding 33% over a five-year period.\n\n• Developed a dynamic VaR estimation system by integrating historical performance analysis and 20-day rolling volatility metrics in Python. Leveraged Monte Carlo simulation results to conduct weekly portfolio reviews and tactical reallocations, ensuring adherence to predefined risk tolerance levels.\n\n• Managed a US$350,000 AUM portfolio in the U.S. market from December 2022 to July 2024, delivering a 164.12% (Annualized: 88.87%) cumulative time-weighted return with a maximum drawdown of 17%. (SPY: Annualized: 11.5% Max Drawdown: 12%, NASDAQ: Annualized: 20.3% Max Drawdown 25%)",
                category: "work"
            },
            {
                id: 1752382347468,
                year: 2022,
                month: 6,
                title: "Graduated from Soochow University",
                description: "Business Administration 學士",
                category: "education"
            },
            {
                id: 1752382630409,
                startYear: 2022,
                startMonth: 2,
                endYear: 2022,
                endMonth: 6,
                year: 2022,
                month: 2,
                title: "Hanze UAS",
                description: "Exchange student with scholarship in Hanze University of Applied Sciences | Hanze UAS, study in Brand, Design& Psychology",
                category: "education"
            },
            {
                id: 1752382210876,
                startYear: 2020,
                startMonth: 9,
                endYear: 2021,
                endMonth: 5,
                year: 2020,
                month: 9,
                title: "群益期貨槓桿交易部--交易員實習生--MT5建構交易策略及投資組合",
                description: "1. 蒐集、匯入資料\n2. 交易策略概念發想，使用 MQL5 語言撰寫策略，主要以價格變動當作參考對象，使用技術指標，包括跨週期策略、趨勢跟蹤策略、均值回歸超跌反彈等策略。\n3. 回測挑選適合策略的標的，針對不同特型的商品做微調以及增加濾網\n4. 透過 in-of-sample, out-of-sample 資料或是 rolling window 方式去最佳化參數，其中以不同目標作為最佳化對象，例如 Sharpe ratio、Profits/Max Drawdown 等\n5. 比較策略之間進出場點位分析策略相關性，最終使用有 7 個策略，總共使用於 130 多種不同商品、週期的 CFD 商品，並且架設 VPS 虛擬主機 24 小時運行策略\n6. 建構投資組合，每三個月調整策略權重",
                category: "work"
            }
        ];

        // Process and enhance the data for modern timeline
        return originalData.map(event => {
            const enhancedEvent = {
                ...event,
                icon: this.getIconForCategory(event.category),
                tags: this.getTagsForEvent(event),
                highlights: this.parseHighlights(event.description)
            };

            // Handle time ranges
            if (event.startYear && event.endYear) {
                enhancedEvent.endYear = event.endYear;
                enhancedEvent.endMonth = event.endMonth;
            }

            return enhancedEvent;
        });
    }

    getIconForCategory(category) {
        const iconMap = {
            'work': 'briefcase',
            'education': 'graduation-cap',
            'personal': 'award',
            'achievement': 'trophy',
            'internship': 'university'
        };
        return iconMap[category] || 'star';
    }

    getTagsForEvent(event) {
        const tags = [];
        
        // Category-based tags
        const categoryTags = {
            'work': '工作',
            'education': '教育',
            'personal': '個人成就',
            'achievement': '成就'
        };
        
        if (categoryTags[event.category]) {
            tags.push(categoryTags[event.category]);
        }

        // Content-based tags
        if (event.title.includes('CFA')) tags.push('專業證照');
        if (event.title.includes('實習') || event.title.includes('Intern')) tags.push('實習');
        if (event.title.includes('AI') || event.title.includes('ML') || event.description.includes('LLM')) tags.push('AI/ML');
        if (event.title.includes('Competition') || event.title.includes('Kaggle') || event.title.includes('IMC')) tags.push('競賽');
        if (event.title.includes('NLP') || event.title.includes('LSTM')) tags.push('資料科學');
        if (event.title.includes('Investment') || event.title.includes('Trading') || event.title.includes('期貨')) tags.push('金融交易');
        if (event.title.includes('University') || event.title.includes('學')) tags.push('學術');
        
        return tags.length > 0 ? tags : ['其他'];
    }

    parseHighlights(description) {
        if (!description) return [];
        
        // Split by bullet points or numbered items
        const lines = description.split(/\n|•|。/).filter(line => line.trim());
        
        // Process numbered items
        const highlights = [];
        lines.forEach(line => {
            const trimmed = line.trim();
            // Check if it starts with a number
            if (/^\d+\./.test(trimmed)) {
                highlights.push(trimmed.replace(/^\d+\.\s*/, ''));
            } else if (trimmed.length > 10 && trimmed.length < 200) {
                // Include meaningful lines
                highlights.push(trimmed);
            }
        });
        
        return highlights.slice(0, 5); // Limit to 5 highlights
    }

    sortEvents() {
        this.filteredEvents.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });
    }

    setupEventListeners() {
        // Add Event Modal
        const addEventBtn = document.getElementById('addEventBtn');
        const addModal = document.getElementById('addEventModal');
        const importModal = document.getElementById('importModal');
        
        addEventBtn?.addEventListener('click', () => this.openModal(addModal));
        
        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });

        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });

        // Form submission
        const form = document.getElementById('addEventForm');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEvent();
        });

        // Cancel button
        document.getElementById('cancelBtn')?.addEventListener('click', () => {
            this.closeModal(addModal);
        });

        // Control buttons
        document.getElementById('filterBtn')?.addEventListener('click', () => {
            this.showFilterMenu();
        });

        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportTimeline();
        });

        document.getElementById('importBtn')?.addEventListener('click', () => {
            this.openModal(importModal);
        });

        document.getElementById('shareBtn')?.addEventListener('click', () => {
            this.shareTimeline();
        });

        document.getElementById('cloudSyncBtn')?.addEventListener('click', () => {
            this.syncToCloud();
        });

        // Import file handling
        const importArea = document.querySelector('.import-area');
        const importFile = document.getElementById('importFile');
        
        importArea?.addEventListener('click', () => importFile?.click());
        
        importArea?.addEventListener('dragover', (e) => {
            e.preventDefault();
            importArea.style.background = 'rgba(52, 152, 219, 0.15)';
        });
        
        importArea?.addEventListener('dragleave', () => {
            importArea.style.background = 'rgba(52, 152, 219, 0.05)';
        });
        
        importArea?.addEventListener('drop', (e) => {
            e.preventDefault();
            importArea.style.background = 'rgba(52, 152, 219, 0.05)';
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/json') {
                this.importTimeline(file);
            }
        });
        
        importFile?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importTimeline(file);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    this.closeModal(modal);
                });
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.openModal(addModal);
            }
        });
    }

    openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    addEvent() {
        const form = document.getElementById('addEventForm');
        const formData = new FormData(form);
        
        const newEvent = {
            id: Date.now(),
            title: formData.get('eventTitle') || document.getElementById('eventTitle').value,
            year: parseInt(document.getElementById('eventYear').value),
            month: parseInt(document.getElementById('eventMonth').value),
            description: document.getElementById('eventDescription').value,
            category: document.getElementById('eventCategory').value,
            icon: document.getElementById('eventIcon').value,
            highlights: [],
            tags: [this.getCategoryName(document.getElementById('eventCategory').value)]
        };

        // Parse highlights from description if they contain bullet points
        const descLines = newEvent.description.split('\n');
        if (descLines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-'))) {
            newEvent.highlights = descLines
                .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
                .map(line => line.replace(/^[•\-]\s*/, '').trim());
            newEvent.description = descLines
                .filter(line => !line.trim().startsWith('•') && !line.trim().startsWith('-'))
                .join('\n').trim();
        }

        this.events.push(newEvent);
        this.sortEvents();
        this.saveEvents();
        this.renderTimeline();
        
        form.reset();
        this.closeModal(document.getElementById('addEventModal'));
        this.showNotification('✨ 事件已成功新增！', 'success');
    }

    getCategoryName(category) {
        const categoryMap = {
            'work': '工作',
            'education': '教育',
            'achievement': '成就',
            'certification': '專業證照',
            'project': '專案',
            'internship': '實習'
        };
        return categoryMap[category] || category;
    }

    renderTimeline() {
        const container = document.getElementById('timelineItems');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Group events by year
        const eventsByYear = {};
        this.filteredEvents.forEach(event => {
            if (!eventsByYear[event.year]) {
                eventsByYear[event.year] = [];
            }
            eventsByYear[event.year].push(event);
        });

        // Year labels for sections
        const yearLabels = {
            2025: '現在進行中',
            2024: '轉折點',
            2023: '快速成長',
            2022: '專業成長期',
            2021: '學習探索',
            2020: '起步階段'
        };

        let itemIndex = 0;
        
        // Render each year section
        Object.keys(eventsByYear)
            .sort((a, b) => b - a)
            .forEach(year => {
                const yearSection = document.createElement('div');
                yearSection.className = 'year-section';
                
                // Year marker
                yearSection.innerHTML = `
                    <div class="year-marker">
                        <span class="year-number">${year}</span>
                        <span class="year-label">${yearLabels[year] || `${year}年`}</span>
                    </div>
                `;
                
                // Render events for this year
                eventsByYear[year].forEach(event => {
                    const position = itemIndex % 2 === 0 ? 'left' : 'right';
                    const eventElement = this.createEventElement(event, position);
                    yearSection.appendChild(eventElement);
                    itemIndex++;
                });
                
                container.appendChild(yearSection);
            });

        // Add end marker
        container.innerHTML += `
            <div class="timeline-end">
                <div class="end-marker">
                    <i class="fas fa-flag-checkered"></i>
                </div>
            </div>
        `;

        // Reinitialize animations for new elements
        this.initScrollAnimations();
    }

    createEventElement(event, position) {
        const div = document.createElement('div');
        div.className = `timeline-item ${position}`;
        div.dataset.year = event.year;
        
        const iconMap = {
            'briefcase': 'fas fa-briefcase',
            'graduation-cap': 'fas fa-graduation-cap',
            'award': 'fas fa-award',
            'certificate': 'fas fa-certificate',
            'chart-line': 'fas fa-chart-line',
            'university': 'fas fa-university',
            'code': 'fas fa-code',
            'project-diagram': 'fas fa-project-diagram',
            'star': 'fas fa-star'
        };

        const iconClass = this.getIconClass(event.category);
        const dateStr = event.endYear 
            ? `${event.year}年${event.month}月 - ${event.endYear}年${event.endMonth}月`
            : event.ongoing 
                ? `${event.year}年${event.month}月 - 進行中`
                : `${event.year}年${this.getMonthName(event.month)}`;

        const highlightsHTML = event.highlights && event.highlights.length > 0
            ? `<ul class="card-highlights">${event.highlights.map(h => `<li>${h}</li>`).join('')}</ul>`
            : '';

        div.innerHTML = `
            <div class="timeline-dot">
                <div class="dot-core"></div>
            </div>
            <div class="timeline-content">
                <div class="timeline-card">
                    <div class="card-header">
                        <div class="card-icon ${iconClass}">
                            <i class="${iconMap[event.icon] || 'fas fa-calendar'}"></i>
                        </div>
                        <div class="card-meta">
                            <h3 class="card-title">${event.title}</h3>
                            <p class="card-date">
                                <i class="far fa-calendar${event.ongoing ? '' : '-check'}"></i> ${dateStr}
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        ${event.description ? `<p class="card-description">${event.description}</p>` : ''}
                        ${highlightsHTML}
                    </div>
                </div>
            </div>
        `;
        
        return div;
    }

    getIconClass(category) {
        const classMap = {
            'work': 'work',
            'education': 'education',
            'achievement': 'achievement',
            'certification': 'achievement',
            'project': 'work',
            'internship': 'internship'
        };
        return classMap[category] || '';
    }

    getMonthName(month) {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月',
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
        return months[month - 1];
    }

    showFilterMenu() {
        const categories = ['all', 'work', 'education', 'achievement', 'internship'];
        const categoryNames = {
            'all': '全部',
            'work': '工作經歷',
            'education': '教育學習',
            'achievement': '個人成就',
            'internship': '實習經驗'
        };

        const existingMenu = document.querySelector('.filter-popup');
        if (existingMenu) existingMenu.remove();

        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-popup';
        filterContainer.innerHTML = `
            <div class="filter-header">
                <h3>篩選時間軸事件</h3>
                <button class="filter-close">&times;</button>
            </div>
            <div class="filter-menu">
                ${categories.map(cat => `
                    <button class="filter-option ${this.currentFilter === cat ? 'active' : ''}" 
                            data-filter="${cat}">
                        <span class="filter-icon">${this.getFilterIcon(cat)}</span>
                        <span>${categoryNames[cat]}</span>
                    </button>
                `).join('')}
            </div>
        `;

        document.body.appendChild(filterContainer);

        // Add event listeners
        filterContainer.querySelector('.filter-close').addEventListener('click', () => {
            filterContainer.remove();
        });

        filterContainer.querySelectorAll('.filter-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.currentTarget.dataset.filter;
                this.filterEvents();
                filterContainer.remove();
                this.showNotification(`已篩選：${categoryNames[this.currentFilter]}`, 'info');
            });
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeFilter(e) {
                if (!filterContainer.contains(e.target) && !document.getElementById('filterBtn').contains(e.target)) {
                    filterContainer.remove();
                    document.removeEventListener('click', closeFilter);
                }
            });
        }, 100);
    }

    getFilterIcon(category) {
        const icons = {
            'all': '📋',
            'work': '💼',
            'education': '🎓',
            'achievement': '🏆',
            'internship': '📚'
        };
        return icons[category] || '📌';
    }

    filterEvents() {
        if (this.currentFilter === 'all') {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter(event => 
                event.category === this.currentFilter
            );
        }
        this.renderTimeline();
    }

    exportTimeline() {
        const exportData = {
            version: '2.0',
            exportDate: new Date().toISOString(),
            events: this.events
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `lucas_timeline_${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('📥 時間軸已成功匯出！', 'success');
    }

    importTimeline(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                const events = data.events || data;
                
                if (Array.isArray(events)) {
                    this.events = events;
                    this.filteredEvents = [...this.events];
                    this.sortEvents();
                    this.saveEvents();
                    this.renderTimeline();
                    this.closeModal(document.getElementById('importModal'));
                    this.showNotification('📤 時間軸已成功匯入！', 'success');
                } else {
                    throw new Error('Invalid format');
                }
            } catch (error) {
                this.showNotification('❌ 匯入失敗：檔案格式不正確', 'error');
            }
        };
        reader.readAsText(file);
    }

    shareTimeline() {
        const shareData = {
            title: 'Lucas金的人生時間軸',
            text: '查看我的職業生涯與成就歷程',
            url: window.location.href
        };

        if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
            navigator.share(shareData)
                .then(() => this.showNotification('🔗 分享成功！', 'success'))
                .catch((error) => {
                    if (error.name !== 'AbortError') {
                        this.copyToClipboard();
                    }
                });
        } else {
            this.copyToClipboard();
        }
    }

    copyToClipboard() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => this.showNotification('📋 連結已複製到剪貼簿！', 'success'))
            .catch(() => this.showNotification('❌ 無法複製連結', 'error'));
    }

    syncToCloud() {
        this.showNotification('☁️ 正在同步到雲端...', 'info');
        
        // Simulate cloud sync
        setTimeout(() => {
            localStorage.setItem('lucasTimelineLastSync', new Date().toISOString());
            this.showNotification('✅ 雲端同步完成！', 'success');
        }, 1500);
    }

    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const colors = {
            success: 'linear-gradient(135deg, #27AE60, #229954)',
            error: 'linear-gradient(135deg, #E74C3C, #C0392B)',
            info: 'linear-gradient(135deg, #3498DB, #2980B9)',
            warning: 'linear-gradient(135deg, #F39C12, #E67E22)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 10000;
            font-size: 1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        document.querySelectorAll('.year-marker').forEach(marker => {
            observer.observe(marker);
        });
    }

    initDynamicEffects() {
        // Parallax effect for header
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.timeline-header');
            if (header && scrolled < 500) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Dynamic timeline line height
        this.updateTimelineHeight();
        window.addEventListener('resize', () => this.updateTimelineHeight());
    }

    updateTimelineHeight() {
        const container = document.querySelector('.timeline-container');
        const line = document.querySelector('.timeline-line');
        if (container && line) {
            const height = container.scrollHeight;
            line.style.height = `${height}px`;
        }
    }

    saveEvents() {
        localStorage.setItem('lucasTimelineEvents', JSON.stringify(this.events));
        localStorage.setItem('lucasTimelineVersion', '2.0');
    }
}

// Add required CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .filter-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 10000;
        min-width: 400px;
        animation: modalSlideIn 0.3s ease;
    }
    
    .filter-header {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        padding: 20px 25px;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .filter-header h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
    }
    
    .filter-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    
    .filter-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: rotate(90deg);
    }
    
    .filter-menu {
        padding: 25px;
        display: grid;
        gap: 12px;
    }
    
    .filter-option {
        padding: 14px 20px;
        border: 2px solid #E8ECF0;
        background: white;
        color: #2C3E50;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
    }
    
    .filter-option:hover {
        background: #F8F9FA;
        border-color: #3498DB;
        transform: translateX(5px);
    }
    
    .filter-option.active {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        border-color: transparent;
    }
    
    .filter-icon {
        font-size: 1.3rem;
    }
    
    .timeline-item.visible {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .year-marker.visible {
        animation: zoomIn 0.5s ease forwards;
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
    }
    
    @media (max-width: 480px) {
        .filter-popup {
            min-width: 90%;
            margin: 0 5%;
        }
    }
`;
document.head.appendChild(style);

// Initialize Timeline when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const timeline = new ModernTimeline();
        timeline.renderTimeline();
    });
} else {
    const timeline = new ModernTimeline();
    timeline.renderTimeline();
}