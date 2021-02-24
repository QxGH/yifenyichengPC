<template>
  <el-dialog
    :title="title"
    :visible.sync="centerDialogVisible.visible"
    width="760px"
    center
		custom-class="region-select-dialog"
    id="region-container"
  >
    <div class="region-box">
      <template v-for="(item, bigKey, index) in regionData">
        <div class="region-item" :key="index" v-if="!(!showOverseas && item.code == 'region_8')">
          <div class="region">
            <span @click.prevent="updateCheckArea(item,-1)">
              <inputCheck
                :checked="(item.count-item.disableCount==0?1:(item.count==item.len?3:2))"
                :disable="item.disable"
              >
                {{item.text}}
                <span
                  class="area-count"
                  v-show="item.count-item.disableCount>0"
                >({{item.count-item.disableCount}})</span>
              </inputCheck>
            </span>
          </div>
          <div class="region-right">
            <div v-for="(v,key,i) in item.children" :key="i" class="region-right-item">
              <!--市-->
              <div
                class="city"
                @mouseenter="showChildren($event,v,i,bigKey) "
                @mouseleave="hiddenChilren($event,v)"
              >
                <span @click.prevent="updateCheckArea(v,0)">
                  <inputCheck
                    :checked="(v.count-v.disableCount==0?1:(v.count==v.len?3:2))"
                    :disable="v.disable"
                  >
                    <span class="city-text">
                      {{v.text}}
                      <span
                        class="area-count"
                        v-show="(v.count-v.disableCount)>0"
                      >({{v.count-v.disableCount}})</span>
                    </span>
                    <span class="to-bottom" v-if="v.len>1"></span>
                  </inputCheck>
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

			<transition name="el-fade-in-linear">
				<div
					id="cityBox"
					class="city-item"
					@mouseenter="showBox()"
					@mouseleave="hiddenBox($event)"
					v-if="provinceSelectedIndex!=-1 && regionData[bigIndex].children[provinceSelectedIndex].isShow
													&& regionData[bigIndex].children[provinceSelectedIndex].children
													&& Object.keys(regionData[bigIndex].children[provinceSelectedIndex].children).length>0"
				>
          <div class="city-item-main">
            <i class="arrow"></i>
            <div class="scroll-box scroll-item">
              <div
                class="city-item-input"
                v-for="(m,key,n) in regionData[bigIndex].children[provinceSelectedIndex].children"
                :key="m.text"
              >
                <!--市的名称-->
                <span
                  @mouseenter="showCountryChildren($event,m,n) "
                  @mouseleave="hiddenCountryChilren($event,m)"
                >
                  <span @click.prevent="updateCheckArea(m,1)">
                    <inputCheck
                      :checked="(m.count-m.disableCount==0?1:(m.count==m.len?3:2))"
                      :disable="m.disable"
                    >
                      <span>
                        {{m.text}}
                        <span
                          class="area-count"
                          v-show="m.count-m.disableCount>0"
                        >({{m.count-m.disableCount}})</span>
                        <span class="to-right" v-if="m.len>1"></span>
                      </span>
                    </inputCheck>
                  </span>
                </span>
              </div>
            </div>
          </div>
					
				</div>
			</transition>


			<transition name="el-fade-in-linear">
				<div
					id="countryBox"
					class="country-box"
					@mouseleave="hiddenBox($event)"
					v-if="provinceSelectedIndex!=-1 && citySelectedIndex!=-1 && regionData[bigIndex].children[provinceSelectedIndex].children[citySelectedIndex].isShow
													&& regionData[bigIndex].children[provinceSelectedIndex].children[citySelectedIndex].children
													&& Object.keys(regionData[bigIndex].children[provinceSelectedIndex].children[citySelectedIndex].children).length>0"
				>
          <div class="country-box-main">
            <i class="arrow"></i>
            <div class="scroll-box scroll-item">
              <div
                class="country-item-input"
                v-for="(s,key,c) in regionData[bigIndex].children[provinceSelectedIndex].children[citySelectedIndex].children"
                :key="s.text"
                :data-key="key"
                :data-c="c"
              >
                <span @click.prevent="updateCheckArea(s,2)">
                  <inputCheck
                    :checked="(s.count-s.disableCount == 0 ? 1 : (s.count == s.len ? 3 : 2))"
                    :disable="s.disable"
                  >
                    {{s.text}}
                  </inputCheck>
                </span>
              </div>
            </div>
          </div>
				</div>
			</transition>
    </div>

    <div class="footer-dialog">
      <span @click.prevent="updateCheckArea(totalData,-2)">
        <inputCheck
          :checked="(totalData.count-totalData.disableCount==0?1:(totalData.count==totalData.len?3:2))"
        > 全选 </inputCheck>
      </span>

      <div>
        <span class="check-info">已选择{{totalData.count-totalData.disableCount}}个区域 </span>
        <el-button type="primary" size="small" @click="saveCode">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { deepCopy, filterCheckCode } from "@/tools/regionTools";
import { mapGetters, mapActions } from "vuex";
import inputCheck from "@/components/regionSelect/inputCheck";

export default {
  name: "regionSelectDialog",
  components: {
    inputCheck,
  },
  data() {
    return {
      totalData: {},
      regionData: null,
      bigIndex: -1,
      citySelectedIndex: -1,
      provinceSelectedIndex: -1,
      dialogElementInfo: {}, //弹窗距离屏幕的位置
    };
  },
  props: {
    title: {
      type: String,
      default: "选择配送区域",
    },
    centerDialogVisible: {
      type: Object,
      default: {
        visible: false,
      },
    },
    showOverseas: {
      // 是否显示海外
      type: Boolean,
      default: false
    },
  },
  watch: {
    centerDialogVisible: {
      handler(val) {
        if (val.visible) {
          setTimeout(() => {
            this.totalData = this.$store.getters.getOriginalRegionData;
            this.regionData = this.totalData.children;
          }, 0);
        } else {
          this.regionData = {};
          this.totalData = {};
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {},

  methods: {
    updateCheckArea(area, level) {
      // if (area.disable == 1) return
      let checkStatus = 0;
      let less = 0;
      if (area.count === area.len) {
        less = area.disableCount - area.len;
        area.count = area.disableCount;
      } else {
        less = area.len - area.count;
        area.count = area.len;
        checkStatus = 1;
      }

      //从最上到本级递归变更
      if (level >= -2) {
        this.totalData.count += less;
      }
      if (level >= 0) {
        //省
        // if(this.regionData[this.bigIndex].disable!=1)
        this.regionData[this.bigIndex].count += less;
      }
      if (level >= 1) {
        //市
        // if(this.regionData[this.bigIndex].children[this.provinceSelectedIndex].disable!=1)
        this.regionData[this.bigIndex].children[
          this.provinceSelectedIndex
        ].count += less;
      }
      if (level >= 2) {
        //区县
        // if(this.regionData[this.bigIndex]
        // .children[this.provinceSelectedIndex].children[this.citySelectedIndex].disable!=1)
        this.regionData[this.bigIndex].children[
          this.provinceSelectedIndex
        ].children[this.citySelectedIndex].count += less;
      }

      //向下递归全选或全取消
      this.childrenStatusCUpdate(area, checkStatus);
    },
    childrenStatusCUpdate(area, checkStatus = 1) {
      if (area) {
        if (area.children && Object.keys(area.children).length > 0) {
          for (let childArea in area.children) {
            this.childrenStatusCUpdate(area.children[childArea], checkStatus);
          }
        }
        // if(area.disable != 1)
        {
          if (checkStatus == 1) area.count = area.len;
          else area.count = area.disableCount;
        }
      }
      return;
    },
    saveCode() {
      let codeArr = [];
      filterCheckCode(this.totalData, codeArr);

      this.$emit("getCodeArr", codeArr);
      this.centerDialogVisible.visible = false;
    },

    getDialogInfo() {
      if (Object.keys(this.dialogElementInfo).length > 0) return;

      let dialogElement = document.getElementById("region-container")
        .children[0];
      let { left, top } = dialogElement.getBoundingClientRect();
      let { offsetWidth, offsetHeight } = dialogElement;

      let bottom = top + offsetHeight;
      let right = left + offsetWidth;

      this.dialogElementInfo = {
        left,
        top,
        offsetWidth,
        offsetHeight,
        bottom,
        right,
      };
    },
    ...mapActions(["setInitData"]),

    showBox() {
      if (this.provinceSelectedIndex != -1) {
        if (
          this.regionData[this.bigIndex].children && 
          !this.regionData[this.bigIndex].children[this.provinceSelectedIndex].isShow
        )
          this.regionData[this.bigIndex].children[
            this.provinceSelectedIndex
          ].isShow = true;
      }
    },
    hiddenBox(e) {
      let x = e.clientX;
      let y = e.clientY;

      let box = document.getElementById("countryBox");
      if (box) {
        let client = box.getBoundingClientRect();
        let box_lx = client.left - 6;
        let box_top = client.top;

        let box_rx = client.right;
        let box_bottom = client.bottom;

        if (x >= box_lx && x <= box_rx && y >= box_top && y <= box_bottom) {
          // 在弹出层，直接返回
          return;
        }
      }

      this.provinceSelectedIndex = -1;
      this.citySelectedIndex = -1;
    },
    showChildren(e, v, provinceIndex, bigIndex) {
      // if (v.disable == 1) return

      if (v) v.isShow = true;
      this.provinceSelectedIndex = v.code;
      this.bigIndex = bigIndex;

      if (!v.children || v.children.length <= 0) {
        return;
      }

      this.getDialogInfo();

      let { left, top } = e.target.getBoundingClientRect();

      let { offsetHeight } = e.target;

      this.$nextTick(() => {
        let cityBox = document.getElementById("cityBox");
        if (!cityBox) {
          return;
        }
        let cityBoxHeight = cityBox.offsetHeight;

        let getTop = top + offsetHeight;
        let getLeft = left - 4;

        //判断底部纵坐标是否超出弹框
        let windowBottomY = this.dialogElementInfo.bottom;
        let lessBottom = getTop + cityBoxHeight - windowBottomY;

        cityBox.classList.remove("top", "bottom");
        let location = [getLeft, getTop];
        // let location = [getLeft, getTop + 6];

        cityBox.classList.add("top");

        if (lessBottom > 0) {
          //底部超出
          //反向计算

          let windowTopY = this.dialogElementInfo.top;
          let less = top - cityBoxHeight - windowTopY;

          if (less < 0) {
            // 顶部溢出
            //判断底部溢出和顶部溢出的绝对值
            if (Math.abs(less) < Math.abs(lessBottom)) {
              //顶部溢出小于底部溢出，选择局上展示

              location = [getLeft, top - cityBoxHeight];
              // location = [getLeft, top - cityBoxHeight - 6];
              cityBox.classList.remove("top", "bottom");
              cityBox.classList.add("bottom");
            } else {
              cityBox.classList.remove("top", "bottom");
              cityBox.classList.add("top");
            }
          } else {
            // location = [getLeft, top - cityBoxHeight];
            location = [getLeft, top - cityBoxHeight - 6];
            cityBox.classList.remove("top", "bottom");
            cityBox.classList.add("bottom");
          }
        }

        cityBox.style.top = location[1] + "px";
        cityBox.style.left = location[0] + "px";
      });
    },
    hiddenChilren(e, v) {
      let x = e.clientX;
      let y = e.clientY;

      let cityBox = document.getElementById("cityBox");
      if (cityBox) {
        let client = cityBox.getBoundingClientRect();
        let box_lx = client.left;
        let box_top = client.top - 6;

        let box_rx = client.right;
        let box_bottom = client.bottom + 6;

        if (x >= box_lx && x <= box_rx && y >= box_top && y <= box_bottom) {
          // 在弹出层，直接返回
          return;
        }
      }

      v.isShow = false;
      this.provinceSelectedIndex = -1;
      this.citySelectedIndex = -1;
    },

    showCountryChildren(e, v, n) {
      // if (v.disable == 1) return
      if (v) v.isShow = true;
      this.citySelectedIndex = v.code;

      if (!v.children || v.children.length <= 0) {
        return;
      }

      let client = e.target.getBoundingClientRect();

      this.$nextTick(() => {
        let box = document.getElementById("countryBox");
        if (!box) return;

        let boxClient = box.getBoundingClientRect();

        let getTop = client.top + client.height / 2 - boxClient.height / 2;
        let getLeft = client.right + 8;

        box.style.top = getTop + "px";
        box.style.left = getLeft + "px";
      });
    },
    hiddenCountryChilren(e, v) {
      let x = e.clientX;
      let y = e.clientY;

      let cityBox = document.getElementById("cityBox");
      if (!cityBox) return;
      let client = cityBox.getBoundingClientRect();
      let box_lx = client.left;
      let box_top = client.top;

      let box_rx = client.right;
      let box_bottom = client.bottom;

      if (x >= box_lx && x <= box_rx && y >= box_top && y <= box_bottom) {
        // 在弹出层，直接返回
        return;
      }

      v.isShow = false;
      this.provinceSelectedIndex = -1;
      this.citySelectedIndex = -1;
    },
  },
};
</script>

<style >
	@import url('./style/index.min.css');
</style>
