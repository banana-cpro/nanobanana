import { API_CONFIG } from './config.js';

/**
 * 生成图片（支持流式响应 SSE）
 * @param {Object} params - 请求参数
 * @param {string} params.prompt - 提示词
 * @param {string} [params.model='nano-banana-fast'] - 模型名称
 * @param {string} [params.aspectRatio='auto'] - 宽高比
 * @param {string} [params.imageSize='1K'] - 图片尺寸
 * @param {string[]} [params.urls=[]] - 参考图片URL数组
 * @param {string} [params.webHook=''] - 回调地址
 * @param {boolean} [params.shutProgress=false] - 是否关闭进度
 * @param {Function} [params.onProgress] - 进度回调函数 (progress, data) => {}
 * @returns {Promise} 返回Promise对象，resolve时包含最终结果
 */
export const generateImage = (params) => {
  const {
    prompt,
    model = 'nano-banana-pro',
    aspectRatio = 'auto',
    imageSize = '1K',
    urls = [],
    webHook = '',
    shutProgress = false,
    onProgress
  } = params;

  if (!prompt || prompt.trim() === '') {
    return Promise.reject(new Error('提示词不能为空'));
  }

  return new Promise((resolve, reject) => {
    const requestBody = {
      model,
      prompt: prompt.trim(),
      aspectRatio,
      imageSize,
      urls,
      webHook,
      shutProgress
    };

    // 使用 fetch 支持 SSE 流式响应
    fetch(`${API_CONFIG.baseURL}/v1/draw/nano-banana`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        let isResolved = false;
        
        // 处理单条消息的辅助函数
        const processMessage = (line) => {
          if (line.trim() === '' || isResolved) return false;
          
          let jsonStr = '';
          let data = null;
          
          // 处理多种可能的格式
          if (line.startsWith('data: ')) {
            jsonStr = line.substring(6).trim();
          } else if (line.startsWith('message\t')) {
            jsonStr = line.substring(8).trim();
          } else if (line.startsWith('message ')) {
            jsonStr = line.substring(8).trim();
          } else if (line.trim().startsWith('{')) {
            jsonStr = line.trim();
          }
          
          if (jsonStr) {
            try {
              data = JSON.parse(jsonStr);
              
              // 调用进度回调
              if (onProgress && typeof onProgress === 'function') {
                onProgress(data.progress || 0, data);
              }

              // 如果状态为成功，解析最终结果
              if (data.status === 'succeeded' && data.results) {
                isResolved = true;
                resolve({
                  id: data.id,
                  results: data.results,
                  progress: data.progress,
                  status: data.status
                });
                return true;
              }

              // 如果状态为失败
              if (data.status === 'failed' || data.error) {
                reject(new Error(data.error || data.failure_reason || '生成失败'));
                return true;
              }
            } catch (e) {
              // 尝试直接解析整行
              try {
                data = JSON.parse(line.trim());
                if (onProgress && typeof onProgress === 'function') {
                  onProgress(data.progress || 0, data);
                }
                if (data.status === 'succeeded' && data.results) {
                  isResolved = true;
                  resolve({
                    id: data.id,
                    results: data.results,
                    progress: data.progress,
                    status: data.status
                  });
                  return true;
                }
              } catch (e2) {
                console.warn('解析 SSE 消息失败:', e2, '原始行:', line);
              }
            }
          }
          return false;
        };
        
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              // 流结束时，处理缓冲区中剩余的内容
              if (buffer.trim() && !isResolved) {
                const remainingLines = buffer.split('\n').filter(l => l.trim());
                // 从后往前处理，优先处理最后的消息
                for (let i = remainingLines.length - 1; i >= 0; i--) {
                  if (processMessage(remainingLines[i])) {
                    return; // 如果找到成功结果，直接返回
                  }
                }
              }
              
              if (!isResolved) {
                // 如果流结束但还没有解析到成功结果
                reject(new Error('流式响应提前结束，未收到完成信号。图片可能仍在生成中，请稍后查看结果或重试'));
              }
              return;
            }

            // 解码数据
            buffer += decoder.decode(value, { stream: true });
            
            // 处理可能包含多条消息的缓冲区
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // 保留最后不完整的行

            lines.forEach(line => {
              processMessage(line);
            });

            // 继续读取（如果还没有解析到结果）
            if (!isResolved) {
              readStream();
            }
          }).catch(error => {
            if (!isResolved) {
              // 处理网络错误
              if (error.name === 'TypeError' && error.message.includes('network')) {
                reject(new Error('网络连接错误，请检查网络连接后重试'));
              } else if (error.message && error.message.includes('chunked')) {
                reject(new Error('网络连接中断，图片可能仍在生成中，请稍后查看结果或重试'));
              } else {
                reject(error);
              }
            }
          });
        };

        readStream();
      })
      .catch(error => {
        reject(error);
      });
  });
};
