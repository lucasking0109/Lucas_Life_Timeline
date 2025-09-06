# Lucas金的人生時間軸 - 專案說明文件

## 專案概述
這是一個個人生涯時間軸展示網站，用於記錄和展示Lucas金的職業生涯、教育背景、成就和重要人生事件。

## 專案結構
- **前端**: 純靜態HTML/CSS/JavaScript
  - `index.html` - 主頁面
  - `styles.css` - 樣式檔案
  - `script.js` - 主要JavaScript邏輯
  - `images/` - 圖片資源目錄

- **後端**: Netlify Serverless Functions
  - `netlify/functions/get-timeline.js` - 獲取時間軸數據
  - `netlify/functions/save-timeline.js` - 保存時間軸數據
  - `netlify/functions/save-timeline-persistent.js` - 持久化保存
  - `netlify/functions/upload-image.js` - 圖片上傳
  - `netlify/functions/upload-image-cloudinary.js` - Cloudinary圖片上傳

## 部署平台
- **Netlify** - 靜態網站託管 + Serverless Functions
- 配置文件: `netlify.toml`

## 主要功能
1. 📅 時間軸展示 - 按年份展示人生重要事件
2. ➕ 新增事件 - 動態添加新的時間軸事件
3. 📤 匯出備份 - 將時間軸數據匯出為JSON
4. 📥 匯入備份 - 從JSON檔案恢復時間軸
5. 🔗 分享同步 - 分享時間軸連結
6. 🖼️ 網站匯出 - 將時間軸匯出為圖片或PDF
7. ☁️ 雲端同步 - 自動保存數據到雲端
8. 📊 篩選功能 - 按年份或類別篩選事件

## 開發指令
```bash
# 安裝依賴
npm install

# 本地開發（啟動 Netlify Dev Server）
npm run dev

# 部署到 Netlify（預覽）
npm run deploy

# 部署到生產環境
npm run deploy:prod
```

## 本地開發
1. 執行 `npm run dev` 啟動本地開發伺服器
2. 瀏覽器訪問 http://localhost:8888
3. 修改檔案會自動重新載入

## 注意事項
- Node.js 版本需求: >= 18.0.0
- 使用 Cloudinary 進行圖片上傳（需要配置 API 金鑰）
- 所有 API 端點都通過 `/api/*` 路徑訪問

## 環境變數
如需使用圖片上傳功能，需在 Netlify 後台設置以下環境變數：
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 技術棧
- 前端：原生 HTML/CSS/JavaScript
- 後端：Node.js + Netlify Functions
- 部署：Netlify
- 圖片存儲：Cloudinary（可選）