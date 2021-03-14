<template>
  <div class="create-shop" v-loading="loading">
    <div class="scroll-box">
      <el-form :model="form" :rules="formRules" ref="shopForm" size="small" label-width="100px">
        <el-form-item label="门店名称：" prop="name">
          <el-input
            v-model="form.name"
            class="max-width-640"
            placeholder="请输入门店名称"
            maxlength="20"
            show-word-limit
          ></el-input>
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
            <template v-if="form.atlas.length < 5">
              <el-upload
                class="image-uploader"
                multiple
                :limit="5"
                action
                :show-file-list="false"
                :before-upload="beforeUpload"
                accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp"
                :on-exceed="limitExceed"
                v-loading="upfileLoading"
              >
                <div class="item add-item" @click="checkGoodsPic">
                  <span>+添加图片</span>
                </div>
              </el-upload>
            </template>
          </div>
          <p class="form-tips">建议尺寸：750*400 像素，大小不超过500kb，最多上传5张，第一张将用于列表展示。</p>
        </el-form-item>
        <el-form-item label="门店地址：" prop="address">
          <el-input
            v-model="form.address"
            id="amapTipInput"
            class="max-width-640"
            clearable
            placeholder="请输入地址搜索"
          ></el-input>
          <div id="amap" class="map-container" style="width:800px; height:400px"></div>
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
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import qiniuUploadFile from "@/api/qiniu/uploadFile";

export default {
  name: "EditShop",
  data() {
    return {
      loading: false,
      submitLoading: false,
      form: {
        name: "",
        atlas: [],
        address: "",
        province: "",
        city: "",
        area: "",
        region_code: "",
        longitude: "",
        latitude: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入门店名称", trigger: "blur" }],
        atlas: [{ required: true, message: "请上传门店图", trigger: "blur" }],
        address: [ { required: true,  message: "请输入导航地址，并点击搜索", trigger: "blur"} ],
      },
      map: {
        searchService: null,
        geocoder: null, // 逆地址解析
        markers: [],
        nowAddrName: "",
        latLng: {},
        addressComponents: {} // 省市区
      },
      upfileLoading: false
    };
  },
  mounted() {
    this.searchService = null;
    if (this.$route.params.shopID != 0) {
      // this.getShopDetails();
    } else {
      this.loading = false
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
      this.loading = true;
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
            this.form.province = resData.province;
            this.form.city = resData.city;
            this.form.area = resData.area;
            this.form.region_code = resData.region_code;
            this.form.address = resData.address;
            this.form.longitude = resData.longitude;
            this.form.latitude = resData.latitude;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
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
          
          let formData = {
            name: this.form.name,
            atlas: this.form.atlas,
            province: this.form.province,
            city: this.form.city,
            area: this.form.area,
            region_code: this.form.region_code,
            address: this.form.address,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            telephone: '13312341234',
            show_address: this.form.address
          };
          if(this.$route.params.shopID) {
            formData.id = this.$route.params.shopID
          };

          this.submitLoading = true;
          this.$api.store
            .save(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("保存成功！");
                this.$router.push({
                  name: 'StoreManage'
                });
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
    },
    limitExceed(file) {
      this.$message.warning("最大支持同时上传5张图片！");
      return false;
    },
    beforeUpload(file) {
      // 上传
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
        return false;
      }
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/bmp" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        this.$message.warning("图片格式仅支持jpeg、png、bmp、gif！");
        return false;
      }
      this.upload(file);
      return false;
    },
    getFileType(filePath) {
      let startIndex = filePath.lastIndexOf(".");
      if (startIndex != -1) {
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      } else {
        return "";
      }
    },
    upload(file) {
      this.upfileLoading = true;
      let uuid = uuidV4();
      let suffix = `.${this.getFileType(file.name)}`;
      let key = `explorer/storePicture/${uuid}${suffix}`;
      // this.uploadList = [];

      qiniuUploadFile(
        file,
        key,
        next => {},
        res => {
          this.uploadSuccess(file, res);
        },
        err => {
          this.$message.error("上传失败！");
          this.upfileLoading = false;
        }
      );
    },
    uploadSuccess(file, uploadRes) {
      let src = uploadRes.domain + uploadRes.truekey;
      let uploadList = this.form.atlas;
      if(uploadList.length < 5) {
        uploadList.push(src);
      };
      this.form.atlas = uploadList;
      this.upfileLoading = false;
    },
  }
};
</script>

<style lang="scss">
@import './style/index.scss';
</style>