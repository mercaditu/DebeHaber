(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{zFvK:function(t,a,e){"use strict";e.r(a);var n=e("gku4"),r={components:{crud:n.a},data:function(){return{data:{parent_id:[],chart_version_id:0,taxpayer_id:null,country:null,is_accountable:!1,parentCode:"",parentName:"",code:"",name:"",level:1,type:1,sub_type:1,partner_taxid:null,partner_name:null,coefficient:null,asset_years:null,created_at:"",updated_at:""},pageUrl:"/accounting/charts",parentCharts:[]}},computed:{baseUrl:function(){return"/api/"+this.$route.params.taxPayer+"/"+this.$route.params.cycle}},methods:{onSave:function(){var t=this;n.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.data).then(function(a){t.$snack.success({text:t.$i18n.t("commercial.CharttSaved")}),t.$router.go(-1)}).catch(function(a){t.$snack.danger({text:"Error OMG!"})})},onSaveNew:function(){var t=this;n.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.data).then(function(a){t.$snack.success({text:this.$i18n.t("general.saved",t.data.number)}),t.$router.push({name:t.$route.name,params:{id:"0"}})}).catch(function(a){t.$snack.danger({text:this.$i18n.t("general.errorMessage")})})},onCancel:function(){var t=this;this.$swal.fire({title:this.$i18n.t("general.cancel"),text:this.$i18n.t("general.cancelVerification"),type:"warning",showCancelButton:!0,confirmButtonText:this.$i18n.t("general.cancelConfirmation"),cancelButtonText:this.$i18n.t("general.cancelRejection")}).then(function(a){a.value&&t.$router.go(-1)})},deleteRow:function(t){if(t.id>0){n.a.methods.onDelete(this.baseUrl+this.pageUrl+"/details",t.id).then(function(t){})}this.lastDeletedRow=t,this.$snack.success({text:this.$i18n.t("general.rowDeleted"),button:this.$i18n.t("general.undo"),action:this.undoDeletedRow}),this.data.details.splice(this.data.details.indexOf(t),1)},undoDeletedRow:function(){this.lastDeletedRow.id>0&&n.a.methods.onUpdate(app.baseUrl+app.pageUrl+"/details",this.lastDeletedRow).then(function(t){}),this.data.details.push(this.lastDeletedRow)}},mounted:function(){var t=this;t.$route.params.id>0?n.a.methods.onRead(t.baseUrl+t.pageUrl+"/"+t.$route.params.id).then(function(a){t.data=a.data.data}):(t.data.code="",t.data.type=1,t.data.is_accountable=!1)}},s=e("KHd+"),o=Object(s.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-row",{staticClass:"mb-5"},[e("b-col",[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],staticClass:"d-none d-md-block float-left mr-10",on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("keyboard_backspace")]),t._v("\n                "+t._s(t.$t("general.return"))+"\n            ")]),t._v(" "),e("h3",{staticClass:"upper-case"},[e("img",{staticClass:"mr-10",attrs:{src:t.$route.meta.img,alt:"",width:"32"}}),t._v("\n                "+t._s(t.$route.meta.title)+"\n            ")])],1),t._v(" "),e("b-col",[e("b-button-toolbar",{staticClass:"float-right d-none d-md-block"},[e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")]),t._v("\n                        "+t._s(t.$t("general.save"))+"\n                    ")]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")]),t._v("\n                        "+t._s(t.$t("general.cancel"))+"\n                    ")])],1)],1),t._v(" "),e("b-button-toolbar",{staticClass:"float-right d-md-none"},[e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")])]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")])])],1)],1)],1)],1),t._v(" "),e("b-row",[e("b-col",[e("b-card",[e("b-container",[e("b-form-group",{attrs:{label:t.$t("accounting.parentChart")}},[e("b-input-group",[e("search-chart",{attrs:{code:t.data.code,parentCode:t.data.parentCode,parentName:t.data.parentName,parent_id:t.data.parent_id},on:{"update:code":function(a){return t.$set(t.data,"code",a)},"update:parentCode":function(a){return t.$set(t.data,"parentCode",a)},"update:parent-code":function(a){return t.$set(t.data,"parentCode",a)},"update:parentName":function(a){return t.$set(t.data,"parentName",a)},"update:parent-name":function(a){return t.$set(t.data,"parentName",a)},"update:parent_id":function(a){return t.$set(t.data,"parent_id",a)}}})],1)],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("accounting.chart")}},[e("b-input-group",[e("b-input",{attrs:{required:"",placeholder:t.$t("commercial.code")},model:{value:t.data.code,callback:function(a){t.$set(t.data,"code","string"==typeof a?a.trim():a)},expression:"data.code"}}),t._v(" "),e("b-input-group-append",[e("b-input",{attrs:{required:"",placeholder:t.$t("commercial.name")},model:{value:t.data.name,callback:function(a){t.$set(t.data,"name","string"==typeof a?a.trim():a)},expression:"data.name"}})],1)],1)],1),t._v(" "),e("b-alert",{attrs:{show:"",variant:"info"}},[e("h5",{staticClass:"alert-heading"},[e("i",{staticClass:"material-icons md-18"},[t._v("school")]),t._v("\n                            Chart Configuration\n                        ")]),t._v(" "),e("p",[t._v("\n                            Charts are the life blood of any accounting system. All journal entries have multiple charts, and configuring them correctly can speed up the accounting process.\n                            The first step is to\n                        ")]),t._v(" "),e("small",[e("a",{attrs:{href:"#"}},[t._v("More Info")])])]),t._v(" "),e("b-row",[e("b-col",[e("b-form-group",{attrs:{label:"Chart Type"}},[e("b-form-radio-group",{attrs:{buttons:"",options:t.spark.enumChartType,name:"enumChartType"},model:{value:t.data.type,callback:function(a){t.$set(t.data,"type",t._n(a))},expression:"data.type"}})],1)],1),t._v(" "),e("b-col",[e("b-form-group",{attrs:{label:"Is Accountable"}},[e("b-form-checkbox",{attrs:{switch:"",size:"lg",name:"check-button"},model:{value:t.data.is_accountable,callback:function(a){t.$set(t.data,"is_accountable",a)},expression:"data.is_accountable"}},[t._v("\n                                    "+t._s(t.$t("accounting.isAccountable"))+"\n                                ")])],1)],1)],1),t._v(" "),1==t.data.type?e("b-form-group",{attrs:{label:"Asset Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[e("b-form-radio-group",{attrs:{options:t.spark.enumAsset},model:{value:t.data.sub_type,callback:function(a){t.$set(t.data,"sub_type",t._n(a))},expression:"data.sub_type"}})],1):t._e(),t._v(" "),2==t.data.type?e("b-form-group",{attrs:{label:"Liability Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[e("b-form-radio-group",{attrs:{options:t.spark.enumLiability},model:{value:t.data.sub_type,callback:function(a){t.$set(t.data,"sub_type",t._n(a))},expression:"data.sub_type"}})],1):t._e(),t._v(" "),3==t.data.type?e("b-form-group",{attrs:{label:"Equity Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[e("b-form-radio-group",{attrs:{options:t.spark.enumEquity},model:{value:t.data.sub_type,callback:function(a){t.$set(t.data,"sub_type",t._n(a))},expression:"data.sub_type"}})],1):t._e(),t._v(" "),4==t.data.type?e("b-form-group",{attrs:{label:"Revenue Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[e("b-form-radio-group",{attrs:{options:t.spark.enumRevenue},model:{value:t.data.sub_type,callback:function(a){t.$set(t.data,"sub_type",t._n(a))},expression:"data.sub_type"}})],1):t._e(),t._v(" "),5==t.data.type?e("b-form-group",{attrs:{label:"Expense Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[e("b-form-radio-group",{attrs:{options:t.spark.enumExpense},model:{value:t.data.sub_type,callback:function(a){t.$set(t.data,"sub_type",t._n(a))},expression:"data.sub_type"}})],1):t._e()],1)],1)],1)],1),t._v(" "),1==t.data.type&&5==t.data.sub_type?e("b-row",[e("b-col",[e("b-card",{attrs:{title:t.$t("commercial.customer"),"sub-title":t.$t("commercial.accountsReceivable")}},[e("b-form-group",{attrs:{label:t.$t("commercial.customer")}},[e("search-taxpayer",{attrs:{partner_name:t.data.partner_name,partner_taxid:t.data.partner_taxid},on:{"update:partner_name":function(a){return t.$set(t.data,"partner_name",a)},"update:partner_taxid":function(a){return t.$set(t.data,"partner_taxid",a)}}})],1)],1)],1)],1):t._e(),t._v(" "),1==t.data.type&&1==t.data.sub_type?e("b-row",[e("b-col",[e("b-card",{attrs:{title:t.$t("commercial.supplier"),"sub-title":t.$t("commercial.accountsPayable")}},[e("b-form-group",{attrs:{label:t.$t("commercial.supplier")}},[e("search-taxpayer",{attrs:{partner_name:t.data.partner_name,partner_taxid:t.data.partner_taxid},on:{"update:partner_name":function(a){return t.$set(t.data,"partner_name",a)},"update:partner_taxid":function(a){return t.$set(t.data,"partner_taxid",a)}}})],1)],1)],1)],1):t._e(),t._v(" "),1==t.data.type&&9==t.data.sub_type?e("b-row",[e("b-col",[e("b-card",{attrs:{title:t.$t("commercial.fixedAssetGroup"),"sub-title":"State the life cycle the fixed assets related to this chart will have"}},[e("b-form-group",{attrs:{label:t.$t("commercial.assetYears")}},[e("b-input",{attrs:{required:"",type:"number",placeholder:"Active Years"},model:{value:t.data.asset_years,callback:function(a){t.$set(t.data,"asset_years","string"==typeof a?a.trim():a)},expression:"data.asset_years"}})],1)],1)],1)],1):t._e()],1)},[],!1,null,null,null);a.default=o.exports}}]);