<template>
  <div class="create-shop" v-loading="pageLoading">
    <div class="scroll-box">
      <div class="page-title">门店信息</div>
      <el-form :model="form" :rules="formRules" ref="shopForm" label-width="100px">
        <el-form-item label="门店名称：" prop="name">
          <el-input
            v-model="form.name"
            class="max-width-640"
            placeholder="请输入门店名称"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" prop="telephone">
          <el-input v-model="form.telephone" class="max-width-640" maxlength="23" show-word-limit placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="营业时间：" prop="business_hours_type">
          <el-radio-group v-model="form.business_hours_type">
            <el-radio :label="1">24小时营业</el-radio>
            <el-radio :label="2">自定义</el-radio>
          </el-radio-group>
          <div v-if="form.business_hours_type === 2">
            <!-- <el-time-picker
              is-range
              v-model="form.business_hours"
              range-separator="至 "
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
              @blur="businessHoursChange"
            ></el-time-picker>-->
            <el-time-picker
              placeholder="起始时间"
              v-model="form.business_hours_start"
              value-format="HH:mm:ss"
              style="margin-right: 15px;"
            ></el-time-picker>
            <el-time-picker
              placeholder="结束时间"
              value-format="HH:mm:ss"
              v-model="form.business_hours_end"
            ></el-time-picker>
          </div>
        </el-form-item>
        <el-form-item label="门店照片：" prop="atlas">
          <div class="pic-list clearfix">
            <template v-for="(item, index) in form.atlas">
              <div class="item" :key="index">
                <el-image style="width: 90px; height: 90px" :src="item" fit="cover" draggable="false">
                  <img slot="error" class="image-error-icon" src="https://cdn.xingchen.cn/FssW3_T3DRshGt5I-TwCb3gWejyd" alt="">
                </el-image>
                <span class="del-btn" @click="delShopPic(index)">
                  <i class="el-icon-close icon"></i>
                </span>
              </div>
            </template>
            <div class="item add-item" v-if="form.atlas.length < 5 " @click="checkGoodsPic">
              <span>+添加图片</span>
            </div>
          </div>
          <p class="form-tips">建议尺寸：750*400 像素，大小不超过500kb，最多上传5张，第一张将用于列表展示。</p>
        </el-form-item>
        <el-form-item label="导航地址：" prop="address">
          <el-input
            v-model="form.address"
            id="amapTipInput"
            class="max-width-640"
            clearable
            placeholder="请输入地址搜索"
          ></el-input>
          <div id="amap" class="map-container" style="width:800px; height:400px"></div>
        </el-form-item>
        <el-form-item label="详细地址：" prop="show_address">
          <el-input v-model="form.show_address" class="max-width-640" placeholder="请输入门店详细地址，便于买家寻找"></el-input>
          <p class="form-tips">请填写门店详细地址，该地址用于在页面展示，地图导航以导航地址为准。</p>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-box">
      <el-button
        type="primary"
        class="normal-btn"
        :loading="submitLoading"
        @click="submitForm('shopForm')"
      >保存</el-button>
    </div>
    <ImageManage :limit="imageManageLimit" @checkedImage="checkedImageHandle" v-if="showImageManage" @close="closeImageManage"></ImageManage>
  </div>
</template>

<script>
import ImageManage from "@/components/image_manage";

export default {
  name: "CreateShop",
  data() {
    return {
      pageLoading: true,
      submitLoading: false,
      form: {
        name: "",
        telephone: "",
        business_hours_type: 1,
        business_hours_start: "",
        business_hours_end: "",
        atlas: [],
        address: "",
        province: "",
        city: "",
        area: "",
        region_code: "",
        longitude: "",
        latitude: "",
        show_address: ""
      },
      formRules: {
        name: [{ required: true, message: "请输入门店名称", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        business_hours_type: [
          { required: true, message: "请选择营业时间", trigger: "change" }
        ],
        address: [
          {
            required: true,
            message: "请输入导航地址，并点击搜索",
            trigger: "blur"
          }
        ],
        show_address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      searchOldVal: "",
      searchServiceRes: [],
      map: {
        searchService: null,
        geocoder: null, // 逆地址解析
        markers: [],
        nowAddrName: "",
        latLng: {},
        addressComponents: {} // 省市区
      },
      imageManageLimit: 1,
      showImageManage: false
    };
  },
  components: {
    ImageManage
  },
  mounted() {
    this.searchService = null;
    if (this.$route.params.shopID != 0) {
      this.getShopDetails();
    } else {
      this.pageLoading = false
      this.amapInit();
    }
  },
  methods: {
    checkGoodsPic() {
      // 选择商品图
      let length = this.form.atlas.length;
      this.imageManageLimit = 5 - length;
      this.showImageManage = true;
    },
    checkedImageHandle(val) {
      this.showImageManage = false;
      if(val.length > 0) {
        let list = [];
        let atlas = this.form.atlas;
        for(let item of val) {
          list.push(item.src)
        };
        let atlasRes = [...atlas, ...list];
        this.form.atlas = atlasRes;
      };
    },
    closeImageManage(val) {
      this.showImageManage = false;
    },
    getShopDetails() {
      // 店铺详情
      this.pageLoading = true;
      let formData = {
        id: this.$route.params.shopID
      };
      this.$api.setting.shopManage
        .shopDetails(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.amapInit([resData.longitude, resData.latitude]);
            this.form = resData;
            this.form.name = resData.name;
            this.form.atlas = resData.atlas;
            this.form.telephone = resData.telephone;
            this.form.business_hours_type = resData.business_hours_type;
            this.form.business_hours_start = resData.business_hours_start;
            this.form.business_hours_end = resData.business_hours_end;
            this.form.province = resData.province;
            this.form.city = resData.city;
            this.form.area = resData.area;
            this.form.region_code = resData.region_code;
            this.form.address = resData.address;
            this.form.longitude = resData.longitude;
            this.form.latitude = resData.latitude;
            this.form.show_address = resData.show_address;
          } else {
            this.$message.error(res.data.message);
          }
          this.pageLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.pageLoading = false;
        });
    },
    amapInit(addr) {
      let map = new AMap.Map("amap", {
        resizeEnable: true,
        zoom: 10
      });
      let marker, geocoder;
      if(addr) {
        map.setCenter(addr); //设置地图中心点
        if (marker) {
          map.remove(marker);
        }
        marker = new AMap.Marker({
          position: new AMap.LngLat(addr[0], addr[1])
        });
        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
        map.setZoom(14); //设置地图层级
      };
      //输入提示
      let auto = new AMap.Autocomplete({
        input: "amapTipInput"
      });
      map.plugin(["AMap.ToolBar"], () => {
        //加载工具条
        let tool = new AMap.ToolBar();
        map.addControl(tool);
      });

      AMap.event.addListener(auto, "select", e => {
        // 移除已创建的 marker
        if (marker) {
          map.remove(marker);
        }
        marker = new AMap.Marker({
          position: new AMap.LngLat(e.poi.location.lng, e.poi.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: e.poi.name
        });
        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
        map.setCenter([e.poi.location.lng, e.poi.location.lat]); //设置地图中心点
        map.setZoom(14); //设置地图层级

        if (!geocoder) {
          geocoder = new AMap.Geocoder();
        }
        let lnglat = e.poi.location;
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.regeocode) {
            this.form.address = result.regeocode.formattedAddress;
            this.form.province = result.regeocode.addressComponent.province;
            this.form.city = result.regeocode.addressComponent.city ? result.regeocode.addressComponent.city : '市辖区';
            this.form.area = result.regeocode.addressComponent.district;
            this.form.region_code = result.regeocode.addressComponent.adcode;
            this.form.longitude = lnglat.lng;
            this.form.latitude = lnglat.lat;
          }
        });
      });

      map.plugin("AMap.Geolocation", () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: "RB"
        });
        map.center = geolocation;
        map.addControl(geolocation); //地图控件右下角显示当前位置
      });

      map.on("click", e => {
        let lnglat = e.lnglat;
        if (!geocoder) {
          geocoder = new AMap.Geocoder();
        }

        if (!marker) {
          marker = new AMap.Marker();
          map.add(marker);
        }
        marker.setPosition(lnglat); //设置标记的位置
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.regeocode) {
            this.form.address = result.regeocode.formattedAddress;
            this.form.province = result.regeocode.addressComponent.province;
            this.form.city = result.regeocode.addressComponent.city ? result.regeocode.addressComponent.city : '市辖区';
            this.form.area = result.regeocode.addressComponent.district;
            this.form.region_code = result.regeocode.addressComponent.adcode;
            this.form.longitude = lnglat.lng;
            this.form.latitude = lnglat.lat;
          }
        });
        map.setCenter(lnglat); //设置地图中心点
        marker.setMap(map); //在地图上显示一个标记
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          // if (!isTel(this.form.telephone)) {
          //   this.$message.warning("请输入正确的联系方式！");
          //   return false;
          // }
          if (
            (this.form.business_hours_start == '' ||
            this.form.business_hours_end == '')
            && this.form.business_hours_type == 2
          ) {
            this.$message.warning("请选择自定义时间！");
            return false;
          };
          // let hoursStartArr = this.form.business_hours_start.split(":");
          // let hoursEndArr = this.form.business_hours_end.split(":");
          // if(this.form.business_hours_type == 2) {
          //   if(hoursStartArr[0] > hoursEndArr[0] ||
          //     (hoursStartArr[0] == hoursEndArr[0] && hoursStartArr[1] > hoursEndArr[1]) ||
          //     (hoursStartArr[0] == hoursEndArr[0] && hoursStartArr[1] == hoursEndArr[1] && hoursStartArr[2] > hoursEndArr[2]) ||
          //     (hoursStartArr[0] == hoursEndArr[0] && hoursStartArr[1] == hoursEndArr[1] && hoursStartArr[2] == hoursEndArr[2])
          //   ) {
          //     this.$message.warning('营业结束时间必须小于开始时间')
          //     return;
          //   };
          // };
          
          let formData = {
            id: this.$route.params.shopID ? this.$route.params.shopID : "",
            name: this.form.name,
            atlas: this.form.atlas,
            telephone: this.form.telephone,
            business_hours_type: this.form.business_hours_type,
            business_hours_start: this.form.business_hours_start,
            business_hours_end: this.form.business_hours_end,
            province: this.form.province,
            city: this.form.city,
            area: this.form.area,
            region_code: this.form.region_code,
            address: this.form.address,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            show_address: this.form.show_address
          };
          this.submitLoading = true;
          this.$api.setting.shopManage
            .createShop(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("创建成功！");
                this.$router.push("/setting/shopManage");
              } else {
                this.$message.warning(res.data.message);
              }
              this.submitLoading = false;
            })
            .catch(err => {
              this.submitLoading = false;
            });
        } else {
          let key = Object.keys(obj)[0];
          let msg = obj[key][0].message;
          this.$message.warning(msg);
          return false;
        }
      });
    },

    clearOverlays(overlays) {
      let overlay;
      while ((overlay = overlays.pop())) {
        overlay.setMap(null);
      }
    },
    getCity(lat, lng) {
      let latLng = new qq.maps.LatLng(lat, lng);
      this.geocoder.getAddress(latLng);
    },
    delShopPic(index) {
      let list = this.form.atlas;
      list.splice(index, 1);
      this.form.atlas = list;
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>