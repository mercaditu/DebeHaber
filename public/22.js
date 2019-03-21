(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{UtxP:function(t,a,e){"use strict";e.r(a);var n=e("gku4"),r={components:{crud:n.a},data:function(){return{data:{chart_id:0,comment:"",currency:"",date:"",id:0,rate:1,debit:0,credit:0},pageUrl:"/commercial/money-movements",currencies:[],accountCharts:[],lastDeletedRow:[]}},computed:{baseUrl:function(){return"/api/"+this.$route.params.taxPayer+"/"+this.$route.params.cycle}},methods:{onSave:function(){var t=this;n.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.data).then(function(a){t.$snack.success({text:t.$i18n.t("commercial.MovemetsSaved")}),t.$router.go(-1)}).catch(function(a){t.$snack.danger({text:"Error OMG!"})})},onSaveNew:function(){var t=this;console.log(t.data),n.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.data).then(function(a){t.$snack.success({text:t.$i18n.t("commercial.MovemetsSaved")}),t.$router.push({name:t.$route.name,params:{id:"0"}}),t.data.chart_id=0,t.data.comment="",t.data.currency="",t.data.date="",t.data.id=0,t.data.rate=1,t.data.debit=0,t.data.credit=0}).catch(function(a){t.$snack.danger({text:this.$i18n.t("general.errorMessage")})})},onCancel:function(){var t=this;this.$swal.fire({title:this.$i18n.t("general.cancel"),text:this.$i18n.t("general.cancelVerification"),type:"warning",showCancelButton:!0,confirmButtonText:this.$i18n.t("general.cancelConfirmation"),cancelButtonText:this.$i18n.t("general.cancelRejection")}).then(function(a){a.value&&t.$router.go(-1)})}},mounted:function(){var t=this;n.a.methods.onRead(t.baseUrl+"/config/currencies").then(function(a){t.currencies=a.data.data}),t.$route.params.id>0?n.a.methods.onRead(t.baseUrl+t.pageUrl+"/"+t.$route.params.id).then(function(a){t.data=a.data.data}):(t.data.date=new Date(Date.now()).toISOString().split("T")[0],t.data.chart_account_id=null!=t.accountCharts[0]?t.accountCharts[0].id:null,t.data.currency=t.spark.taxPayerData.currency,t.data.rate=1),n.a.methods.onRead(t.baseUrl+"/accounting/charts/for/money/").then(function(a){t.accountCharts=a.data.data})}},c=e("KHd+"),o=Object(c.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-row",{staticClass:"mb-5"},[e("b-col",[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],staticClass:"d-none d-md-block float-left",on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("keyboard_backspace")]),t._v("\n                "+t._s(t.$t("general.return"))+"\n                ")]),t._v(" "),e("h3",{staticClass:"upper-case"},[e("img",{staticClass:"mr-10",attrs:{src:t.$route.meta.img,alt:"",width:"32"}}),t._v("\n                "+t._s(t.$route.meta.title)+"\n            ")])],1),t._v(" "),e("b-col",[e("b-button-toolbar",{staticClass:"float-right d-none d-md-block"},[e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")]),t._v("\n                        "+t._s(t.$t("general.save"))+"\n                    ")]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")]),t._v("\n                        "+t._s(t.$t("general.cancel"))+"\n                    ")])],1)],1),t._v(" "),e("b-button-toolbar",{staticClass:"float-right d-md-none"},[e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")])]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")])])],1)],1)],1)],1),t._v(" "),e("b-row",[e("b-col",[e("b-card",{attrs:{"no-body":""}},[e("b-tabs",{attrs:{pills:"",card:""}},[e("b-tab",{attrs:{title:"Adjustment",active:""}},[e("b-container",[e("b-row",[e("b-col",[e("b-form-group",{attrs:{label:t.$t("commercial.date")}},[e("b-input",{attrs:{type:"date",required:"",placeholder:"Missing Information"},model:{value:t.data.date,callback:function(a){t.$set(t.data,"date",a)},expression:"data.date"}})],1)],1),t._v(" "),e("b-col",[e("b-form-group",{attrs:{label:t.$t("commercial.exchangeRate")}},[e("b-input-group",[e("b-input-group-prepend",[e("b-form-select",{model:{value:t.data.currency,callback:function(a){t.$set(t.data,"currency",a)},expression:"data.currency"}},t._l(t.currencies,function(a){return e("option",{key:a.key,domProps:{value:a.code}},[t._v(t._s(a.name))])}),0)],1),t._v(" "),e("b-input",{attrs:{type:"number",placeholder:t.$t("commercial.rate"),value:t.data.rate}})],1)],1)],1)],1),t._v(" "),e("b-row",[e("b-form-group",{attrs:{label:t.$t("commercial.chart")}},[e("b-form-select",{model:{value:t.data.chart_id,callback:function(a){t.$set(t.data,"chart_id",a)},expression:"data.chart_id"}},t._l(t.accountCharts,function(a){return e("option",{key:a.key,domProps:{value:a.id}},[t._v(t._s(a.name))])}),0)],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.debit")}},[e("b-input",{attrs:{type:"number",placeholder:"Value"},model:{value:t.data.debit,callback:function(a){t.$set(t.data,"debit",t._n(a))},expression:"data.debit"}})],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.debit")}},[e("b-input",{attrs:{type:"number",placeholder:"Value"},model:{value:t.data.credit,callback:function(a){t.$set(t.data,"credit",t._n(a))},expression:"data.credit"}})],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.comment")}},[e("b-input",{attrs:{type:"text",required:"",placeholder:"Missing Information"},model:{value:t.data.comment,callback:function(a){t.$set(t.data,"comment",a)},expression:"data.comment"}})],1)],1)],1)],1),t._v(" "),e("b-tab",{attrs:{title:"Transfer"}},[t._v("\n                        Tab Contents 2\n                    ")])],1)],1)],1)],1)],1)},[],!1,null,null,null);a.default=o.exports}}]);