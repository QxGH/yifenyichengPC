import Router from '@/router'

// 获取 token
const getUserToken = () => {
  let token = localStorage.getItem('yfyc_token');
  if(token) {
    // 有 token 直接返回
    return token;
  } else {
    // 开发模式
    // if (process.env.VUE_APP_MODE == 'dev') {
    //   return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImlzcyI6IiIsImF1ZCI6ImxvY2FsaG9zdCIsImp0aSI6IiJ9.eyJpc3MiOiIiLCJhdWQiOiJsb2NhbGhvc3QiLCJqdGkiOiIiLCJpYXQiOjE1ODg2NTAyMDgsIm5iZiI6MTU4ODY1MDIwOCwiZXhwIjoxNTg5MjU1MDA4LCJyb2xlIjoiY29udHJvbCIsImlkIjoxLCJjdG9rZW4iOiJjM2U3MDg5OWQ0NjU2YjA2MGFmZThkYjY2MTViYzYxMSIsIm5hbWUiOiJtYXN0ZXIifQ.1be33j2Z7lIWB4f3GhYMsSOgftyKDZYYk2oNUhXthuY';
    // };
    return ''
  };
}


// 获取用户的信息
const getCtoken = () => {
  let ctoken = localStorage.getItem('yfyc_ctoken');
  if(!ctoken) {
    clearCookie();
    Router.push('/login');
  };
  return ctoken;
}

// 清除cookie信息
const clearCookie = () => {
  localStorage.removeItem('yfyc_token')
  localStorage.removeItem('yfyc_ctoken')
  localStorage.removeItem('yfyc_name')
  localStorage.removeItem('yfyc_truename')
}

export {
  getUserToken,
  getCtoken,
  clearCookie
}