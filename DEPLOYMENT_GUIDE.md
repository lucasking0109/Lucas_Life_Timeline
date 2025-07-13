# 🚀 Netlify 部署指南

## 📋 完成清單

這個指南將幫助您將動態時間軸網站部署到Netlify。

### ✅ 已完成的設置

我已經為您準備了以下文件和配置：

1. **📁 項目結構**
   - `netlify.toml` - Netlify配置文件
   - `package.json` - 項目依賴管理
   - `netlify/functions/` - 無服務器函數

2. **🔧 API 端點**
   - `get-timeline.js` - 獲取時間軸數據
   - `save-timeline.js` - 保存時間軸數據
   - `upload-image.js` - 基本圖片上傳
   - `upload-image-cloudinary.js` - 進階圖片上傳(使用Cloudinary)

3. **💻 前端更新**
   - 重新設計的`script.js`，支持API調用
   - 自動檢測環境（本地vs生產）
   - 新增"Website Export"按鈕

## 🎯 您需要執行的步驟

### 步驟1：準備Git倉庫

1. 確保您的項目已經推送到GitHub：
```bash
git add .
git commit -m "Add Netlify configuration and API functions"
git push origin main
```

### 步驟2：註冊並登錄Netlify

1. 前往 [netlify.com](https://netlify.com) 註冊帳戶
2. 使用GitHub帳戶登錄

### 步驟3：部署網站

1. 在Netlify儀表板中，點擊"New site from Git"
2. 選擇GitHub並連接您的倉庫
3. 選擇您的時間軸項目倉庫
4. 配置部署設置：
   - **Build command**: `npm run build` （或留空）
   - **Publish directory**: `.` （當前目錄）
   - **Functions directory**: `netlify/functions`

### 步驟4：配置環境變量（如果使用Cloudinary）

如果您想要使用圖片上傳功能，需要設置以下環境變量：

1. 在Netlify儀表板中，進入您的網站設置
2. 點擊"Environment variables"
3. 添加以下變量：
   - `CLOUDINARY_CLOUD_NAME`: 您的Cloudinary雲名稱
   - `CLOUDINARY_API_KEY`: 您的Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: 您的Cloudinary API Secret

### 步驟5：測試網站

1. 部署完成後，Netlify會提供一個URL
2. 訪問您的網站並測試功能：
   - 查看現有的時間軸事件
   - 嘗試添加新事件
   - 測試編輯和刪除功能

## 🔧 進階配置

### 自定義域名

1. 在Netlify儀表板中，進入"Domain settings"
2. 點擊"Add custom domain"
3. 輸入您的域名並按照指示配置DNS

### 啟用表單處理

Netlify提供內建的表單處理功能，可以用於聯繫表單等。

### 設置重定向

已在`netlify.toml`中配置了API重定向規則。

## 🎨 自定義您的網站

### 修改內容

1. 更新`index.html`中的標題和描述
2. 修改`styles.css`來改變外觀
3. 在`script.js`中的`getDefaultData()`方法中更新您的真實數據

### 添加更多功能

您可以擴展現有功能：
- 添加搜索功能
- 實現用戶認證
- 添加評論系統
- 集成社交媒體分享

## 🛠️ 故障排除

### 常見問題

1. **函數無法正常工作**
   - 檢查`netlify.toml`配置是否正確
   - 確認函數代碼沒有語法錯誤
   - 查看Netlify的函數日誌

2. **圖片上傳失敗**
   - 確認Cloudinary環境變量設置正確
   - 檢查圖片大小是否超過限制

3. **數據不持久化**
   - 目前使用的是臨時存儲，可以考慮集成數據庫服務

### 獲取幫助

- 查看Netlify文檔：[docs.netlify.com](https://docs.netlify.com)
- 檢查函數日誌：Netlify儀表板 > Functions > View logs
- 聯繫支援：通過GitHub issues或其他方式

## 🎉 恭喜！

完成以上步驟後，您就擁有了一個功能完整的動態時間軸網站！

### 後續維護

- 定期備份您的數據
- 監控網站性能
- 根據需要更新功能
- 與朋友和家人分享您的時間軸

---

*如果您在部署過程中遇到任何問題，請隨時聯繫我！* 