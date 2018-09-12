<template>
    <div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="totalNum" show-sizer style="position: absolute;right: 0;margin-top: 10px" @on-change="page"></Page>
    </div>
</template>
<script>
let baseurl = require("../libs/base").getBusinessURL;
export default {
  data() {
    return {
      totalNum: 0,
      pageNum: 0,
      columns7: [
        {
          title: "组名称",
          key: "groupName",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.groupName)
            ]);
          }
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data6: []
    };
  },
  methods: {
    queryAll() {
      var self = this;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"queryUserGroup",
          {
            params: {
              pageNum: this.pageNum,
              pageLimit: 8
            },credentials:true
          }
        )
        .then(
          response => {
            this.data6 = response.data.data;
            this.totalNum = response.data.total;
          },
          error => {
            console.log("error");
          }
        );
    },
    page: function(e) {
      this.pageNum = e - 1;
      this.queryAll();
    },

    show(index) {
      // 点击修改进行页面跳转
      //    this.$router.push({path:'/editGroup',params:{groupName:this.data6[index].groupName}});
      this.$router.push({
        path: "/editGroup",
        query: {
          groupName: this.data6[index].groupName,
          id: this.data6[index].id
        }
      });
      console.log(
        "传递参数" + this.$route.query.groupName + this.$route.query.id
      );
    },
    remove(index) {
      this.deleteGroup(index);
    },
    //删除组
    deleteGroup(index) {
      var self = this;
      var token = localStorage.getItem("token");
      this.$http
        .post(baseurl+"delGroup", JSON.stringify(self.data6[index]), {
          headers: { Authorization: token },credentials:true
          // emulateJSON: true
        })
        .then(
          res => {
            this.data6.splice(index, 1);
          },
          error => {
            // console.log(error);
          }
        );
    }
  },

  //生命周期，进界面就会走的方法
  mounted: function() {
    this.queryAll();
  }
};
</script>