/**
 *  实现功能
 *  1、默认情况下只禁止空格输入
 *  2、限制只能输入整数
 *  3、限制只能输入整数和小数（价格类）
 *  4、限制只能输入手机号
 *  5、限制最大值和最小值(抛出错误给回调函数)
 * https://blog.csdn.net/xiaofanguan/article/details/96308902
 */
import { Message } from 'element-ui'

const addListener = function (el, type, fn) {
  el.addEventListener(type, fn, false)
}
const spaceFilter = function (el) {
  // 空格无法输入
  addListener(el, 'input', () => {
    el.value = el.value.replace(/\s+/, '')
  })
}
const intFilter = function (el) {
  // 只能输入正整数
  addListener(el, 'input', () => {
    el.value = el.value.replace(/\D/g, '')
  })
}
const priceFilter = function (el) {
  // 只能输入价格、浮点数
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    el.value = el.value.replace(/^\./g, ""); //验证第一个字符是数字
    // if (isNaN(el.value)) {
      el.value = el.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //控制可输入的小数
    // }
  })
}
const specialFilter = function (el) {
  // 过滤特殊字符
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
  })
}

const phoneFilter = function (el) {
  addListener(el, 'blur', () => {
    if (!el.value) {
      return
    }
    const phoneReg = new RegExp('^(13|14|15|16|17|18|19)[0-9]{9}$')
    if (!phoneReg.test(el.value)) {
      Message.warning('手机号输入错误');
      el.value = ''
    }
  })
}

const urlFilter = function (el) {
  addListener(el, 'blur', () => {
    if (!el.value) {
      return
    }
    const urlReg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/
    if (!urlReg.test(el.value)) {
      Message.warning('url输入错误');
      el.value = ''
    }
  })
}
export default {
  bind(el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    spaceFilter(el)
    switch (binding.arg) {
      case 'int':
        intFilter(el)
        break
      case 'price':
        priceFilter(el)
        break
      case 'special':
        specialFilter(el)
        break
      case 'phone':
        phoneFilter(el)
        break
      case 'url':
        urlFilter(el)
        break
      default:
        break
    }
  }
}