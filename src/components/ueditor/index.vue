<template>
  <div>
    <div :id="randomId" type="text/plain"></div>
  </div>
</template>

<script>

export default {
  name: "UE",
  props: ["richText", "width", "height"],
  data() {
    return {
      showImageManage: false,
      randomId: "editor_" + Math.random() * 1000000,
      editor: null,
      config: {
        toolbars: [
          [
            "source", //源代码
            "undo", //撤销
            "redo", //重做
            "|",
            "bold", //加粗
            "italic", //斜体
            "underline", //下划线
            "strikethrough", //删除线
            "forecolor", //字体颜色
            "backcolor", //背景色
            "|",
            "indent", //首行缩进
            "justifyleft", //居左对齐
            "justifyright", //居右对齐
            "justifycenter", //居中对齐
            "justifyjustify", //两端对齐
            "insertorderedlist", //有序列表
            "insertunorderedlist", //无序列表
            "|",
            // "blockquote", //引用
            "pasteplain", //纯文本粘贴模式
            "horizontal", //分隔线
            "removeformat", //清除格式
            "time", //时间
            "date", //日期
            // "spechars", //特殊字符
            // "fontfamily", //字体
            "paragraph", //段落格式
            "fontsize", //字号
            "|",
            // 'link', //超链接
            // 'unlink', //取消链接
            // 'emotion', //表情
            "simpleupload", //单图上传
            "imagemanage",
            // 'insertvideo', //视频
            "rowspacingtop", //段前距
            "rowspacingbottom", //段后距
            "lineheight", //行间距
            "|",
            // "imagenone", //默认
            // "imageleft", //左浮动
            // "imageright", //右浮动
            // "imagecenter", //居中
            // "background", //背景
            "inserttable", //插入表格
            "insertrow", //前插入行
            "insertcol", //前插入列
            "mergeright", //右合并单元格
            "mergedown", //下合并单元格
            "deleterow", //删除行
            "deletecol", //删除列
            "splittorows", //拆分成行
            "splittocols", //拆分成列
            "splittocells", //完全拆分单元格
            "deletecaption", //删除表格标题
            "inserttitle", //插入标题
            "mergecells", //合并多个单元格
            "deletetable", //删除表格

            // 'wordimage', //图片转存
          ]
        ],

        initialContent: "",
        elementPathEnabled: false,
        initialFrameHeight: this.height,
        initialFrameWidth: this.width,
        enableContextMenu: true,
        autoFloatEnabled: false,
        wordCount: false,
        enableAutoSave: false,
        autoClearEmptyNode: true,
        // contextMenu:[] ,
        saveInterval: 5000
      }
    };
  },
  watch: {
    richText(newVal) {
      this.editor.setContent(newVal, false);
    }
  },
  created() {
    // UeBus.$on('ueImageManage', () => {
    //   this.checkGoodsPic()
    // })
  },
  mounted() {
    this.editor = UE.getEditor(this.randomId, this.config);
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.editor.addListener("ready", () => {
        this.editor.setContent(this.richText, false);
      });
      this.$nextTick(() => {
        //回写
        this.editor.addListener("contentchange", () => {
          this.content = this.editor.getContent();
          this.$emit("callback", this.content);
        });
      });
    },
    destroyedUEEdutor() {
      this.editor.destroy();
    },
    checkGoodsPic() {
      // 选择商品图
      this.showImageManage = true;
    },
    closeImageManage() {
      this.showImageManage = false;
    },
    checkedImageHandle(val) {
      this.showImageManage = false;
      if (val.length > 0) {
        let insertHtml = ``
        for(let item of val) {
          insertHtml += `<img src="${item.src}" title="${item.src}" _src="" width="100%" alt="">`
        };
        this.editor.execCommand('insertHtml', insertHtml);
      }
    },
  },
  beforeDestroy() {
    this.destroyedUEEdutor()
  }
};
</script>

<style scoped>
.edui-default {
  line-height: initial;
}
</style>
