import axios from 'axios';
import { API_CONFIG } from './config.js';

// 创建 axios 实例
const request = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_CONFIG.apiKey}`
  },
  // 允许跨域请求
  withCredentials: false
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加请求日志（开发环境）
    if (import.meta.env.DEV) {
      console.log('发送请求:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        data: config.data
      });
    }
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    return response.data;
  },
  (error) => {
    // 统一处理错误
    let message = '请求失败';
    
    if (error.response) {
      // 服务器返回了错误状态码
      message = error.response.data?.message || error.response.statusText || `服务器错误 (${error.response.status})`;
      console.error('API Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      // 请求已发出但没有收到响应
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        message = '网络连接失败，请检查网络连接或服务器是否可访问';
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        message = '请求超时，请稍后重试';
      } else {
        message = '无法连接到服务器，请检查网络';
      }
      console.error('API Error Request:', error.request);
    } else {
      // 其他错误
      message = error.message || '请求失败';
      console.error('API Error:', error.message);
    }
    
    // 创建错误对象，包含更多信息
    const customError = new Error(message);
    customError.originalError = error;
    customError.isNetworkError = !error.response && error.request;
    customError.isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');
    
    return Promise.reject(customError);
  }
);

export default request;
