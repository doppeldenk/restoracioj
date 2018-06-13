import axios from 'axios';

axios.interceptors.request.use((config) => {
  const customConfig = { ...config };
  customConfig.url = config.url.concat('?key=882a74a0');
  return customConfig;
});
