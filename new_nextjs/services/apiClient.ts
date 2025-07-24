// services/api.ts
import axios from 'axios';

// 1. 创建 axios 实例
const apiClient = axios.create({
  // 从环境变量中读取后端的基地址
  // 这使得在不同环境（开发、生产）中使用不同 API 地址变得容易
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1' || 'http://localhost:8000/api/v1',
  // 设置一个默认的请求超时时间 (例如：10秒)
  timeout: 10000,
});

// 2. 添加请求拦截器 (Request Interceptor)
apiClient.interceptors.request.use(
  (config) => {
    // 在这里对请求配置做些什么，例如添加公共的请求头
    
    // a. 添加一个固定的 API Key (示例)
    config.headers['X-Api-Key'] = 'my-secret-api-key';

    // b. 如果有 token (例如从 localStorage 或状态管理中获取的用户认证 token)
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }

    // c. 设置通用的 Content-Type
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log('Starting Request', config);
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 3. 添加响应拦截器 (Response Interceptor)
apiClient.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 例如，如果你的后端总是返回 { data: ..., status: ... } 格式，
    // 你可以在这里直接返回 response.data.data，简化后续处理
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 在这里可以做统一的错误处理
    console.error('Response Error:', error.response || error.message);
    
    if (error.response) {
      // 服务器返回了响应，但状态码不是 2xx
      const { status, data } = error.response;
      switch (status) {
        case 401:
          // 例如：未授权，可以在这里处理重定向到登录页的逻辑
          console.error('Unauthorized, redirecting to login...');
          // window.location.href = '/login';
          break;
        case 403:
          // 禁止访问
          console.error('Forbidden access.');
          break;
        case 404:
          console.error('Resource not found.');
          break;
        case 500:
          console.error('Server error.');
          break;
        default:
          console.error(`Unhandled error status: ${status}`);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到任何响应 (例如网络问题)
      console.error('Network Error: No response received.');
    } else {
      // 在设置请求时触发了一个错误
      console.error('Axios Config Error:', error.message);
    }
    
    // 将错误继续抛出，以便调用方可以单独处理
    return Promise.reject(error);
  }
);

// 4. 导出配置好的 axios 实例
export default apiClient;