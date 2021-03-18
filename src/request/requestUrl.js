let url = {};

// 开发环境
if(process.env.VUE_APP_MODE == 'dev') {
  url = {
    baseUrl: 'http://yfyc.custom.test.engzh.com/',
  };
};

// 测试环境
if(process.env.VUE_APP_MODE == 'test') {
  url = {
    baseUrl: 'http://yfyc.custom.test.engzh.com/',
  };
};

// 生产环境
if(process.env.VUE_APP_MODE == 'prod') {
  url = {
    baseUrl: 'http://yfyc.custom.engzh.com/',
  };
};

export default url;