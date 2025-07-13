exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // 處理預檢請求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // 從環境變量或KV存儲中獲取數據
    // 這裡我們使用簡單的存儲方案，實際部署時需要配置KV存儲
    const timelineData = process.env.TIMELINE_DATA || JSON.stringify([]);
    
    return {
      statusCode: 200,
      headers,
      body: timelineData
    };
  } catch (error) {
    console.error('Error getting timeline data:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 