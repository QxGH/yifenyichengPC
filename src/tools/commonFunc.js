import { clearCookie } from "@/tools/Cookie";
import Router from '@/router'

const logout = () => {
  clearCookie();
  Router.push('/login');
}

export {
  logout
}