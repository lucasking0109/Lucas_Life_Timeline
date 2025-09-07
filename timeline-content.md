# Lucas金的人生時間軸 - 內容總覽

## 2025年


---

### 2. Vici Holdings - AI Data Scientist Intern
- **時間**: 2025年7月
- **分類**: work
- **描述**: 在Vici Holdings FIC部門中的Strategy Research Lab 研究搭配AI的交易策略。 ● Applied LLMs to extract and quantify indicators of management quality from U.S. 10-K filings and assessed their
relationship with long-term stock performance using permutation tests.
● Developed a multi-agent LLM system that surfaces impactful news, maps scenario paths, and generates trading
suggestions based on M&A valuation and short interest/ margin activity.
● Analyzed trading opportunities in preferred stocks, specifically focusing on conversion terms and interest rate resets
in merger and acquisition scenarios between companies.

---

### 3. CFA Level 2 Passed
- **時間**: 2025年5月
- **分類**: personal

---

### 4. 利用 NLP 自動辨識 Mutual Fund Prospectus 的投資風格
- **時間**: 2025年5月
- **分類**: work
- **描述**: 
1. 資料預處理、分詞 
2. 用 Skip-gram Word2Vec 生成專屬詞向量 
3. 建立 Knowledge Base 計算文件向量與風格中心的餘弦距離作為額外特徵 
4. 基於特徵及向量進行分類，使用 Regression, Random Forest, XGBoost 
5. 在 test data 上進行評估，最終達成可以自動辨識基金風格的系統，最終在 test data 上 XGBoost 分類模型達到 66% 的 Accuracy

---

### 5. Kaggle Competition: Company Bankruptcy Prediction
- **時間**: 2025年4月
- **分類**: work
- **描述**: 
1. 資料預處理: 用 StandardScaler 對所有特徵標準化，針對「破產」與「未破產」兩類資料極度不均衡，於每個交叉驗證折內使用 SMOTE 進行過採樣 
2. 建立 Pipeline 串接 StandardScaler → SMOTE → 分類器，保證 resampling 僅發生在訓練階段，避免資料外洩互相污染 
3. 嘗試多種分類演算法:Random Forest、Support Vector Machine (SVM)、XGBoost，以 F1 score 作為主要優化指標進行最佳化 
4. 交叉驗證調校：在每個 CV 折內計算佳參數，Random Forest 與 XGBoost 於驗證集上均能取得約 0.50 左右的 F1 score 
5. XGBoost 模型在測試集達到 0.46 的 F1 score，展現 PR97 的 model 穩定度

---

### 6. Big Data Cleaning and Application
- **時間**: 2025年4月
- **分類**: work
- **描述**: 
1. 使用 Pyspark 處理來自 Polygon.io 的 400 多隻股票 2023/05-2025/05 的1 minute price data，改為 Parquet 格式方便快速處理

2. 透過計算 VWAP以及比較數據統計數值，比較 data 與其他資料來源的差異，發現來自polygon.io data中的股票價格異常值

3. 對資料進行回歸分析、證實報酬率不符合常態分佈、分析絕大部分股票交易量主要集中於每日收盤前半小時、使用 ACF 分析大部分報酬率不具有滯後性

---

### 7. IMC Prosperity 3
- **時間**: 2025年3月
- **分類**: personal
- **描述**: 獲得全球 top 1% 名次，台灣第一名 (第 133 名/總共 12621 隊伍)

---

### 8. 2015–2025 美國國債即期收益率曲線擬合
- **時間**: 2025年3月
- **分類**: work
- **描述**: 
1. 使用 Bloomberg 2015–2025 年期國債平價收益率，用 Bootstrap 推導出 Spot Yield Curve
2. 分別套用 Ho–Lee、Hull–White、Vasicek、Nelson–Siegel 以及 LSTM、Random Forest、Gradient Boosting Regression 去擬和 model 與價
3. Nelson–Siegel Model 有最佳的穩定度與並可能可以近一步使用進行價格預測以及交易、LSTM model 展現出非常高的 Accuracy，可以進一步進行許多Cross-Validation 確定是否有無過擬和的問題

---

### 9. Rotman international trading competition
- **時間**: 2025年2月
- **分類**: personal
- **描述**: Led team to 1st place in the MSMFT internal competition: advanced to global finals by coordinating strategies and
ensuring alignment across team members under real-time trading pressure.
● Focused on relative value and tender-offer-driven opportunities, systematically capturing arbitrage from structural and
team-driven market mechanisms instead of relying on directional bets.
● Achieved 2nd place globally in the Sales & Trader Case among 35 teams, showcasing strong teamwork, disciplined
execution, and effective risk management.

---

## 2024年

### 10. Boston University MS Mathematical Finance& Financial Technology
- **時間**: 2024年9月
- **分類**: education

---

## 2023年

### 11. CFA Level 1 Passed
- **時間**: 2023年10月
- **分類**: personal

---

## 2022年

### 12. Clear Island Co., Ltd. - Investment Analyst/Execution Trader
- **時間**: 2022年11月
- **分類**: work
- **描述**: 
● Built a business cycle timing model yielding an 81%-win rate in low-EPS tech during pre-expansions, with 33%
annualized returns and 24% max drawdown over five years.
● Developed a dynamic VaR system by integrating historical drawdowns with rolling 20-day volatility to enhance real-
time risk assessment.
● Managed a US$350,000 AUM portfolio in the U.S. market from December 2022 to July 2024, 

---

### 13. Graduated from Soochow University
- **時間**: 2022年6月
- **分類**: education
- **描述**: Business Administration 學士

---

### 14. Hanze UAS
- **時間**: 2022年2月 - 2022年6月
- **分類**: education
- **描述**: Exchange student with scholarship in Hanze University of Applied Sciences | Hanze UAS, study in Brand, Design& Psychology

---

## 2020年

### 15. 群益期貨槓桿交易部--交易員實習生--MT5建構交易策略及投資組合
- **時間**: 2020年9月 - 2021年5月
- **分類**: work
- **描述**: 
● Developed a z-score mean-reversion model with AR(1) reversion strength; ATR-based dynamic bands and vol-scaled
sizing that delivered +32% annual return vs. the prior model.
● Built trend-following strategies with volatility filters across Forex CFDs/time frames, forming diversified long/short
portfolios; reduced portfolio volatility by 39%, raised win rate by 26%, and deployed to live trading.

---

## 事件分類說明
- **work**: 工作經歷
- **education**: 教育背景
- **personal**: 個人成就
- **travel**: 旅行
- **other**: 其他