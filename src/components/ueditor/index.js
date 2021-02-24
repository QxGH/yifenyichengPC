import ueditor from './index.vue'

const UE = {
	install(Vue){
		Vue.component('UE', ueditor)
	}
};

export default UE
