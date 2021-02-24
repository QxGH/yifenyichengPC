import Cookies from "js-cookie";
import { clearCookie } from "@/tools/Cookie";
import store from "@/store";


const logout = () => {
  clearCookie();
  // this.$router.push("/login");
  let domainURL = store.state.domainURL;
  // window.location.href = domainURL + "/#/login";
  let link;
  if(process.env.VUE_APP_MODE == 'test') {
    link = 'http://'+domainURL + '/login'
  } else {
    link = 'http://'+domainURL + '/#/login'
  };
  window.location.href = link;
}

const switchPlatform = () => {
  let domainURL = store.state.domainURL;
  Cookies.remove("storeInfo", { path: "/", domain: domainURL });
  Cookies.remove("storeToken", { path: "/", domain: domainURL });
  localStorage.removeItem('xc_user_info')
  localStorage.removeItem('xc_shop_info')
  localStorage.removeItem('noTipAppletsSetting')
  let link;
  if(process.env.VUE_APP_MODE == 'test') {
    link = 'http://'+domainURL + '/platform'
  } else {
    link = 'http://'+domainURL + '/#/platform'
  };
  window.location.href = link;
}

const accountManage = () => {
  let domainURL = store.state.domainURL;
  let link;
  if(process.env.VUE_APP_MODE == 'test') {
    link = 'http://'+domainURL + '/accountManage'
  } else {
    link = 'http://'+domainURL + '/#/accountManage'
  };
  window.location.href = link;
}

export {
  logout,
  switchPlatform,
  accountManage
}