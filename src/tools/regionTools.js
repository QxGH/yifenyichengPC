import chinaData from './chinaData'
import regionData from './region'


/***
 * 初始化生成每一项
 */
/*****
 * 生成数组的每一项
 * @param code      地区编码
 * @param text      地区名称
 * @param len       该地区下属自己的总和
 * @param checked   用于判断当前地区是否选中 0 表示选中 1 表示为选中
 * @param isShow    用于判断省市的子集是否展开显示的状态
 * @param count     子集选中的数量
 * @param children  子集的数组
 * @param hideArea	隐藏区县
 * @returns {{code: *, text: *, len: number, checked: number, count: number, children, isShow: boolean}}
 */


const createItem = ({ code, text, len = 0, disable = 0, isShow = false, count = 0, children = {}, disableCount = 0 }) => {
	return { code, text, len, disable, count, disableCount, children, isShow }
}

//生成数据
function codeToData(code, editObj) {
	let codeArr = {};
	// if(code == '460000') {
	// 	debugger;
	// }
	// 判断是不是省级
	let proviceText = chinaData['86'][code];
	let oneItem = createItem({
		code,
		text: proviceText
	});

	changeEditStatus(oneItem, editObj);


	let item = chinaData[code];

	const t = typeOf(item);

	if (t === 'object') {
		let areaItem = {};
		for (let key in item) {

			let text = item[key];
			//市级
			let cityItem = createItem({ code: key, text });
			changeEditStatus(cityItem, editObj);

			let country = chinaData[key];
			const countryType = typeOf(country);
			let countryData = {};
			if (countryType == 'object' && Object.keys(country).length > 0 && !editObj.hideArea) {

				for (let countryIndex in country) {
					//区县
					let countryItem = createItem({
						code: String(countryIndex),
						text: country[countryIndex],
						len: 1
					});
					
					changeEditStatus(countryItem, editObj);

					if (oneItem.disable !== 0 || cityItem.disable !== 0 || countryItem.disable !== 0) {
						countryItem.count = 1;
					} else {
						countryItem.count = 0;
					}

					cityItem.count += countryItem.count;

					if (countryItem.disable == 1) {
						countryItem.disableCount = 1;
					}
					cityItem.disableCount += countryItem.disableCount;

					if (countryItem.disableCount < countryItem.len)
						countryData[String(countryIndex)] = countryItem;
				}
			} else {
				if (oneItem.disable !== 0 || cityItem.disable != 0) {
					cityItem.count = 1;
				} else {
					cityItem.count = 0;
				}
			}
			
			cityItem.children = countryData;

			let keys = Object.keys(countryData);
			cityItem.len = (keys.length > 0) ? keys.length : 1;
			

			oneItem.len = oneItem.len + cityItem.len;
			oneItem.count += cityItem.count;

			if (cityItem.disable == 1) {
				cityItem.disableCount = cityItem.len;
			}

			oneItem.disableCount += cityItem.disableCount;

			if (cityItem.disableCount < cityItem.len)
				areaItem[String(cityItem.code)] = (cityItem);
		}

		oneItem.children = areaItem;
	} else {
		if (oneItem.disable != 0)
			oneItem.count = 1;
	}

	oneItem.len = (oneItem.len > 0) ? oneItem.len : 1;
	return oneItem
}

/***
 * 初始化弹窗中的显示出具
 * @returns {{code: *, text: *, len: number, checked: number, count: number, children, isShow: boolean}}
 */
export const initData = (editObj) => {
	let newData = regionData;

	let arr = createItem({ code: '86', text: '中国' });
	let newDataKeys = Object.keys(newData);

	newDataKeys.forEach((item, index) => {
		let code = 'region_' + index,
			text = item, itemOne = createItem({ code, text });


		let currentCodeArr = newData[item];

		let bigDisable = 1;

		for (let [i, v] of currentCodeArr.entries()) {
			
			let proItem = codeToData(v, editObj)

			itemOne.len += proItem.len;
			itemOne.count += proItem.count;

			if (bigDisable == 1 && (itemOne.disable != 1)) {
				bigDisable = proItem.disable;
			}

			if (proItem.disable == 1) {
				proItem.disableCount = proItem.len;

			}
			itemOne.disableCount += proItem.disableCount;

			if (proItem.disableCount < proItem.len) {
				itemOne.children[String(proItem.code)] = (proItem);
			}

		}
		itemOne.len = (itemOne.len > 0) ? itemOne.len : 1;

		itemOne.disable = bigDisable;

		arr.len += itemOne.len;
		arr.count += itemOne.count;

		if (itemOne.disable == 1) {
			itemOne.disableCount = itemOne.len;
		} else {
			if (itemOne.disableCount < itemOne.len)
				arr.children[String(itemOne.code)] = itemOne;
		}
		arr.disableCount += itemOne.disableCount;

	})
	if (arr.count == arr.len) {
		arr.disable = 1;
	}

	return arr
}


/**
 * 判断数据类型的函数
 * @param obj
 * @returns {*}
 */
export function typeOf(obj) {
	const toString = Object.prototype.toString;
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	return map[toString.call(obj)];
}

/**
 * 深拷贝
 * @param data
 * @returns {*}
 */
export function deepCopy(data) {
	const t = typeOf(data);
	let o;

	if (t === 'array') {
		o = [];
	} else if (t === 'object') {
		o = {};
	} else {
		return data;
	}

	if (t === 'array') {
		for (let i = 0; i < data.length; i++) {
			o.push(deepCopy(data[i]));
		}
	} else if (t === 'object') {
		for (let i in data) {
			o[i] = deepCopy(data[i]);
		}
	}
	return o;
}

/**
 * 将地区码转化为文字
 * @param codes
 * @returns {string}
 */
export function codeToText(codes) {
	let str = ''
	for (let [index, item] of codes.entries()) {
		let code = item + '';
		let proviceCode = code.slice(0, 2) + '0000', cityCode = code.slice(0, 4) + '00', countryCode = code;
		str += index > 0 ? '，' : '';
		if (code === proviceCode) {
			str += chinaData['86'][code];
			continue;
		}
		if (code === cityCode) {
			str += chinaData[proviceCode][code];
			continue;
		}
		if (code === countryCode) {
			str += chinaData[cityCode] ? chinaData[cityCode][code] : chinaData[proviceCode][code];
			continue;
		}
	}
	return str
}

/**
 * 提交时将选中的城市的code提取
 * @param whole
 * @param codeArr
 * @returns {*} 返回为一维数组，每一项为地区码
 */
export function filterCheckCode(whole, codeArr) {

	if ((whole.count === whole.len) && whole.disableCount == 0) {
		//    全部选中
		if (whole.code !== '86' && whole.code.indexOf('region') == -1) {
			if (whole.disable != 1) {
				codeArr.push(whole.code)
			}

		} else {
			//全国或者大区的情况
			for (let item in whole.children) {
				filterCheckCode(whole.children[item], codeArr)
			}
		}
	} else {
		//    选中一半
		if (whole.len > 1) {
			for (let item in whole.children) {
				filterCheckCode(whole.children[item], codeArr)
			}
		}
	}

	return codeArr
}


/***
 * 用于判断当前项是不是禁用状态
 * @param code              当前地区码
 * @param editObj           编辑过的数据对象
 * @returns {number}        返回 0 表示 没有当前项
 *                          返回 1 表示 有当前项但当前不是编辑项
 *                          返回 2 表示 有当前项且当前项为编辑项
 */
function changeEditStatus(item, editObj) {


	let code = item.code;

	if (Object.keys(editObj).length == 0 || Object.keys(editObj.codeObj).length == 0) {
		return;
	}
	item.disable = 0; //未选择过
	const EDITINDEX = editObj.edit;
	let res = editObj.codeObj[code];

	if (res) {

		if (res == EDITINDEX) {
			item.disable = 2; //自己编辑，且之前已经设置过
		} else {
			item.disable = 1;//设置过，本次无法编辑
		}
	}
}