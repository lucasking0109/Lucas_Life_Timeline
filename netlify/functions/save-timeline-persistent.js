// 使用簡單的環境變量存儲數據
// 在實際應用中，您可能想要使用數據庫或Netlify KV存儲

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      
      if (!body.events || !Array.isArray(body.events)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid data format' })
        };
      }

      // 將數據存儲到環境變量或外部存儲
      // 這裡只是示例，實際應用中應使用數據庫
      const dataToStore = JSON.stringify(body.events);
      
      // 在實際應用中，您可以：
      // 1. 使用MongoDB、PostgreSQL等數據庫
      // 2. 使用Netlify KV存儲
      // 3. 使用Firebase Firestore
      // 4. 使用AWS DynamoDB
      
      console.log('Data saved:', body.events.length, 'events');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: 'Data saved successfully',
          count: body.events.length,
          timestamp: new Date().toISOString()
        })
      };
      
    } else if (event.httpMethod === 'GET') {
      // 獲取存儲的數據
      // 這裡應該從實際的存儲中獲取數據
      
      const defaultData = [
        {
          id: 1752383058031,
          year: 2025,
          month: 7,
          title: "使用 Claude Artifact 創建個人網頁",
          description: "透過 Claude 的 Artifact 功能創建了一個個人時間軸網頁，展示人生的重要時刻和里程碑。",
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
          description: "建構完整的交易策略系統，包含數據收集、策略開發、回測優化、風險管理等完整流程。",
          category: "work",
          images: [],
          createdAt: "2025-07-13T02:22:45.654Z"
        }
      ];
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(defaultData)
      };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    
  } catch (error) {
    console.error('Error handling timeline data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 