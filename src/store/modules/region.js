import { initData } from '@/tools/regionTools'

const region = {
	state: {
		originalRegionData: []
	},
	mutations: {
		INITREGIONDATA(state, data) {
			state.originalRegionData = data
		}
	},
	actions: {
		setInitData({ commit }, data = {}) {
			commit('INITREGIONDATA', initData(data))
		}
	},
	getters: {
		getOriginalRegionData: state => state.originalRegionData
	}
}

export default region
