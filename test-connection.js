// Test script to verify backend connection
const axios = require('axios');

const testBackend = async () => {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('https://codeduo.onrender.com/');
    console.log('✅ Health check:', healthResponse.data);
    
    // Test API endpoint
    const apiResponse = await axios.get('https://codeduo.onrender.com/api/test');
    console.log('✅ API test:', apiResponse.data);
    
    console.log('\n🎉 Backend is running and accessible!');
    console.log('Frontend can now connect to: https://codeduo.onrender.com/api');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

testBackend();
