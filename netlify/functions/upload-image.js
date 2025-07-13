exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    
    // 驗證請求數據
    if (!body.image || !body.filename) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing image data or filename' })
      };
    }

    // 生成唯一的文件名
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}_${body.filename}`;
    
    // 在實際部署中，這裡需要實現真正的圖片存儲
    // 可以使用Netlify的Large Media或外部服務如Cloudinary
    console.log('Uploading image:', uniqueFilename);
    
    // 返回圖片URL (實際部署時需要真實的URL)
    const imageUrl = `/images/${uniqueFilename}`;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        imageUrl: imageUrl,
        message: 'Image uploaded successfully'
      })
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 