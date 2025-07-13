# Lucas King's Life Timeline

一個動態的個人時間軸網站，用於展示人生重要時刻和里程碑。

## 🌟 功能特色

- **動態內容管理**：隨時添加、編輯或刪除時間軸事件
- **圖片上傳**：支持為事件添加圖片
- **分類篩選**：按類別（工作、教育、個人等）篩選事件
- **年份篩選**：按年份查看特定時期的事件
- **響應式設計**：適配各種設備尺寸
- **實時同步**：基於Netlify的無服務器架構

## 🚀 技術棧

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **後端**：Netlify Functions (Node.js)
- **部署**：Netlify
- **存儲**：Netlify KV Store (計劃中)

## 📦 部署說明

### 前置要求
- Node.js 18+
- npm 或 yarn
- Netlify CLI

### 本地開發

1. 克隆項目：
```bash
git clone [your-repo-url]
cd lucas-life-timeline
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動本地開發服務器：
```bash
npm run dev
```

### 部署到Netlify

1. 安裝Netlify CLI：
```bash
npm install -g netlify-cli
```

2. 登錄Netlify：
```bash
netlify login
```

3. 部署到Netlify：
```bash
npm run deploy:prod
```

## 🎯 如何使用

1. **添加事件**：點擊"添加事件"按鈕，填寫事件詳情
2. **編輯事件**：點擊事件上的"編輯"按鈕
3. **刪除事件**：點擊事件上的"刪除"按鈕
4. **篩選事件**：使用頂部的年份和類別篩選器
5. **導出數據**：點擊"Website Export"按鈕導出數據

## 📁 項目結構

```
lucas-life-timeline/
├── index.html          # 主頁面
├── styles.css          # 樣式文件
├── script.js           # 前端邏輯
├── netlify.toml        # Netlify配置
├── package.json        # 項目配置
└── netlify/
    └── functions/      # Netlify Functions
        ├── get-timeline.js
        ├── save-timeline.js
        └── upload-image.js
```

## 🔧 API 端點

- `GET /.netlify/functions/get-timeline` - 獲取時間軸數據
- `POST /.netlify/functions/save-timeline` - 保存時間軸數據
- `POST /.netlify/functions/upload-image` - 上傳圖片

## 🎨 自定義

您可以通過修改 `styles.css` 來自定義網站的外觀和感覺。

## 📝 許可證

MIT License

## 👤 作者

Lucas King

---

*這個項目使用 AI 輔助開發，展示了現代 Web 開發的無限可能性。* 