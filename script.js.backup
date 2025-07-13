class TimelineApp {
    constructor() {
        this.events = [];
        this.currentEditingEvent = null;
        this.debugMode = false;
        this.apiBaseUrl = '/.netlify/functions';
        this.isNetlifyEnvironment = window.location.hostname !== 'localhost';
        
        this.initializeElements();
        this.bindEvents();
        this.loadEvents();
        this.renderTimeline();
        this.updateYearFilter();
    }

    initializeElements() {
        this.timelineContainer = document.querySelector('.timeline-container');
        this.addEventBtn = document.querySelector('.add-event-btn');
        this.modal = document.querySelector('.modal');
        this.eventForm = document.querySelector('.event-form');
        this.yearFilter = document.querySelector('.year-filter');
        this.categoryFilter = document.querySelector('.category-filter');
        this.imageInput = document.querySelector('.image-input');
        this.imagePreview = document.querySelector('.image-preview');
        this.createWebsiteExportBtn();
    }

    bindEvents() {
        this.addEventBtn.addEventListener('click', () => this.openModal());
        this.eventForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.yearFilter.addEventListener('change', () => this.renderTimeline());
        this.categoryFilter.addEventListener('change', () => this.renderTimeline());
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        
        // 關閉modal的事件
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });
    }

    createWebsiteExportBtn() {
        const exportBtn = document.createElement('button');
        exportBtn.textContent = 'Website Export';
        exportBtn.className = 'website-export-btn';
        exportBtn.style.cssText = `
            background: #f39c12;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
        `;
        exportBtn.addEventListener('click', () => this.exportDataForWebsite());
        
        const shareContainer = document.querySelector('.share-container');
        if (shareContainer) {
            shareContainer.appendChild(exportBtn);
        }
    }

    async loadEvents() {
        // 優先使用本地存儲，如果沒有則使用默認數據（包含您的真實數據）
        const stored = localStorage.getItem('timelineEvents');
        if (stored) {
            this.events = JSON.parse(stored);
        } else {
            this.events = this.getDefaultData();
        }
        
        // 在Netlify環境中也保存到localStorage以便後續使用
        if (this.isNetlifyEnvironment && !stored) {
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
                const result = await response.json();
                console.log('數據已保存到API:', result);
            } else {
                console.error('保存到API失敗');
            }
        } catch (error) {
            console.error('API保存錯誤:', error);
        }
    }

    openModal(event = null) {
        this.currentEditingEvent = event;
        this.modal.classList.add('active');
        
        const form = this.modal.querySelector('.event-form');
        if (event) {
            form.title.value = event.title || '';
            form.year.value = event.year || new Date().getFullYear();
            form.month.value = event.month || new Date().getMonth() + 1;
            form.description.value = event.description || '';
            form.category.value = event.category || 'other';
        } else {
            form.reset();
            form.year.value = new Date().getFullYear();
            form.month.value = new Date().getMonth() + 1;
        }
        
        this.displayImagePreview();
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.currentEditingEvent = null;
        this.imagePreview.innerHTML = '';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const eventData = {
            id: this.currentEditingEvent?.id || Date.now(),
            title: formData.get('title'),
            year: parseInt(formData.get('year')),
            month: parseInt(formData.get('month')),
            description: formData.get('description'),
            category: formData.get('category'),
            images: this.currentEditingEvent?.images || [],
            createdAt: this.currentEditingEvent?.createdAt || new Date().toISOString()
        };

        if (this.currentEditingEvent) {
            const index = this.events.findIndex(e => e.id === this.currentEditingEvent.id);
            if (index !== -1) {
                this.events[index] = eventData;
            }
        } else {
            this.events.push(eventData);
        }

        await this.saveEvents();
        this.renderTimeline();
        this.updateYearFilter();
        this.closeModal();
        this.showToast('事件已保存!');
    }

    async deleteEvent(eventId) {
        if (confirm('確定要刪除這個事件嗎？')) {
            this.events = this.events.filter(event => event.id !== eventId);
            await this.saveEvents();
            this.renderTimeline();
            this.updateYearFilter();
            this.showToast('事件已刪除!');
        }
    }

    renderTimeline() {
        const selectedYear = this.yearFilter.value;
        const selectedCategory = this.categoryFilter.value;
        
        let filteredEvents = this.events;
        
        if (selectedYear !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.year == selectedYear);
        }
        
        if (selectedCategory !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
        }
        
        filteredEvents.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
        });
        
        this.timelineContainer.innerHTML = '';
        
        filteredEvents.forEach(event => {
            const eventElement = this.createEventElement(event);
            this.timelineContainer.appendChild(eventElement);
        });
    }

    createEventElement(event) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'timeline-event';
        
        eventDiv.innerHTML = `
            <div class="event-header">
                <h3>${this.escapeHtml(event.title)}</h3>
                <span class="event-date">${event.year}年${event.month}月</span>
                <div class="event-actions">
                    <button onclick="app.openModal(app.getEventById(${event.id}))" class="edit-btn">編輯</button>
                    <button onclick="app.deleteEvent(${event.id})" class="delete-btn">刪除</button>
                </div>
            </div>
            <div class="event-content">
                <p class="event-description">${this.escapeHtml(event.description || '')}</p>
                <span class="event-category">${this.getCategoryName(event.category)}</span>
            </div>
        `;
        
        return eventDiv;
    }

    getEventById(id) {
        return this.events.find(event => event.id === id);
    }

    getCategoryName(category) {
        const categories = {
            'work': '工作',
            'education': '教育',
            'personal': '個人',
            'travel': '旅行',
            'other': '其他'
        };
        return categories[category] || '其他';
    }

    updateYearFilter() {
        const years = [...new Set(this.events.map(event => event.year))].sort((a, b) => b - a);
        const currentValue = this.yearFilter.value;
        
        this.yearFilter.innerHTML = '<option value="all">所有年份</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            this.yearFilter.appendChild(option);
        });
        
        this.yearFilter.value = currentValue;
    }

    showToast(message, type = 'info') {
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
            padding: 12px 24px;
            background: #4CAF50;
            color: white;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    handleImageUpload(event) {
        // 圖片上傳功能 - 未來可以擴展
        console.log('圖片上傳功能將在未來實現');
    }

    displayImagePreview() {
        // 圖片預覽功能 - 未來可以擴展
        this.imagePreview.innerHTML = '';
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

// 初始化應用
const app = new TimelineApp();

// 全局變量，方便調試
window.app = app;

// 添加CSS動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .website-export-btn:hover {
        background: #e67e22 !important;
    }
`;
document.head.appendChild(style);