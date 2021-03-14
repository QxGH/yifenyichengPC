let url = {};

// 开发环境
if(process.env.VUE_APP_MODE == 'dev') {
  url = {
    baseUrl: 'http://yfyc.custom.test.engzh.com/',
    toolsUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

// 测试环境
if(process.env.VUE_APP_MODE == 'test') {
  url = {
    baseUrl: 'http://yfyc.custom.test.engzh.com/',
    toolsUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

// 生产环境
if(process.env.VUE_APP_MODE == 'prod') {
  url = {
    baseUrl: 'https://kernel.services.xingchen.cn/',
    toolsUrl: 'https://api.services.xingchen.cn/',
    staticUrl: 'https://cdn.xingchen.cn/'
  };
};

export default url;