(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{iBLE:function(t,a,e){"use strict";e.r(a);var n=e("gku4"),r={components:{crud:n.a},data:function(){return{data:{chart_account_id:0,code:"",code_expiry:"",comment:"",currency:"",partner_name:"",partner_taxid:"",date:"",details:[{id:0}],document_id:"",document_type:1,id:0,is_deductible:0,journal_id:null,number:"",payment_condition:0,rate:1,type:3},pageUrl:"/commercial/sales",documents:[],currencies:[],accountCharts:[],vatCharts:[],itemCharts:[],lastDeletedRow:[]}},computed:{columns:function(){return[{key:"chart_id",label:this.$i18n.t("commercial.item"),sortable:!0},{key:"chart_vat_id",label:this.$i18n.t("commercial.vat"),sortable:!0},{key:"value",label:this.$i18n.t("commercial.value"),sortable:!0},{key:"actions",label:"",sortable:!1}]},baseUrl:function(){return"/api/"+this.$route.params.taxPayer+"/"+this.$route.params.cycle}},methods:{onSaveNew:function(){var t=this;n.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.data).then(function(a){t.$snack.success({text:t.$i18n.t("commercial.invoiceSaved")}),t.data.customer_id=0,t.data.customer=[],t.data.chart_account_id=0,t.data.code="",t.data.code_expiry="",t.data.comment="",t.data.currency="",t.data.partner_name="",t.data.partner_taxid="",t.data.customer=[],t.data.date="",t.data.details=[{id:0}],t.data.document_id="",t.data.document_type=1,t.data.id=0,t.data.is_deductible=0,t.data.journal_id=null,t.data.number="",t.data.payment_condition=0,t.data.rate=1,t.data.type=3,t.$router.push({name:t.$route.name,params:{id:"0"}})}).catch(function(a){console.log(a),t.$snack.danger({text:this.$i18n.t("general.errorMessage")+a.message})})},onCancel:function(){var t=this;this.$swal.fire({title:this.$i18n.t("general.cancel"),text:this.$i18n.t("general.cancelVerification"),type:"warning",showCancelButton:!0,confirmButtonText:this.$i18n.t("general.cancelConfirmation"),cancelButtonText:this.$i18n.t("general.cancelRejection")}).then(function(a){a.value&&t.$router.go(-1)})},addDetailRow:function(){this.data.details.push({id:0,chart_id:this.itemCharts[0].id,chart_vat_id:this.vatCharts[0].id,value:"0"})},deleteRow:function(t){if(t.id>0){n.a.methods.onDelete(this.baseUrl+this.pageUrl+"/details",t.id).then(function(t){})}this.lastDeletedRow=t,this.$snack.success({text:this.$i18n.t("general.rowDeleted"),button:this.$i18n.t("general.undo"),action:this.undoDeletedRow}),this.data.details.splice(this.data.details.indexOf(t),1)},undoDeletedRow:function(){this.lastDeletedRow.id>0&&n.a.methods.onUpdate(app.baseUrl+app.pageUrl+"/details",this.lastDeletedRow).then(function(t){}),this.data.details.push(this.lastDeletedRow)}},mounted:function(){var t=this;n.a.methods.onRead(t.baseUrl+"/config/currencies").then(function(a){t.currencies=a.data.data}),t.$route.params.id>0?n.a.methods.onRead(t.baseUrl+t.pageUrl+"/"+t.$route.params.id).then(function(a){t.data=a.data.data}):(t.data.date=new Date(Date.now()).toISOString().split("T")[0],t.data.chart_account_id=null!=t.accountCharts[0]?t.accountCharts[0].id:null,t.data.payment_condition=0,t.data.currency=t.spark.taxPayerData.currency,t.data.rate=1),n.a.methods.onRead(t.baseUrl+"/accounting/charts/for/money/").then(function(a){t.accountCharts=a.data.data}),n.a.methods.onRead(t.baseUrl+"/accounting/charts/for/vats-debit").then(function(a){t.vatCharts=a.data.data}),n.a.methods.onRead(t.baseUrl+"/accounting/charts/for/income").then(function(a){t.itemCharts=a.data.data})}},o=e("KHd+"),i=Object(o.a)(r,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("b-row",{staticClass:"mb-5"},[e("b-col",[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],staticClass:"d-none d-md-block float-left",on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("keyboard_backspace")]),t._v("\n                    "+t._s(t.$t("general.return"))+"\n                    ")]),t._v(" "),e("h3",{staticClass:"upper-case"},[e("img",{staticClass:"mr-10",attrs:{src:t.$route.meta.img,alt:"",width:"32"}}),t._v("\n                    "+t._s(t.$route.meta.title)+"\n                ")])],1),t._v(" "),e("b-col",[e("b-button-toolbar",{staticClass:"float-right d-none d-md-block"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","d"],expression:"['ctrl', 'd']"}],staticClass:"ml-15",on:{shortkey:function(a){return t.addDetailRow()},click:function(a){return t.addDetailRow()}}},[e("i",{staticClass:"material-icons"},[t._v("playlist_add")]),t._v("\n                    "+t._s(t.$t("general.addRowDetail"))+"\n                ")]),t._v(" "),e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")]),t._v("\n                    "+t._s(t.$t("general.save"))+"\n                ")]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")]),t._v("\n                    "+t._s(t.$t("general.cancel"))+"\n                ")])],1)],1),t._v(" "),e("b-button-toolbar",{staticClass:"float-right d-md-none"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","d"],expression:"['ctrl', 'd']"}],staticClass:"ml-15",on:{shortkey:function(a){return t.addDetailRow()},click:function(a){return t.addDetailRow()}}},[e("i",{staticClass:"material-icons"},[t._v("playlist_add")])]),t._v(" "),e("b-button-group",{staticClass:"ml-15"},[e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(a){return t.onSaveNew()},click:function(a){return t.onSaveNew()}}},[e("i",{staticClass:"material-icons"},[t._v("save")])]),t._v(" "),e("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{variant:"danger"},on:{shortkey:function(a){return t.onCancel()},click:function(a){return t.onCancel()}}},[e("i",{staticClass:"material-icons"},[t._v("cancel")])])],1)],1)],1)],1),t._v(" "),e("b-row",[e("b-col",[e("b-card",[e("b-container",[e("b-row",[e("b-col",[e("b-form-group",{attrs:{label:t.$t("commercial.date")}},[e("b-input",{attrs:{type:"date",required:"",placeholder:"Missing Information"},model:{value:t.data.date,callback:function(a){t.$set(t.data,"date",a)},expression:"data.date"}})],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.customer")}},[e("search-taxpayer",{attrs:{partner_name:t.data.partner_name,partner_taxid:t.data.partner_taxid},on:{"update:partner_name":function(a){return t.$set(t.data,"partner_name",a)},"update:partner_taxid":function(a){return t.$set(t.data,"partner_taxid",a)}}})],1),t._v(" "),null!=t.data.customer?e("b-container",[t._v("Based on your past transactions, we can quickly recomend the same items again.\n        "),e("b-row",[e("b-col",[e("b-button",{attrs:{href:""}},[t._v("Favorite Detail 1")]),t._v(" "),e("b-button",{attrs:{href:""}},[t._v("Favorite Detail 2")])],1)],1)],1):t._e()],1),t._v(" "),e("b-col",[t.documents.length>0?e("b-form-group",{attrs:{label:t.$t("commercial.document")}},[e("b-form-select",{model:{value:t.data.document_id,callback:function(a){t.$set(t.data,"document_id",a)},expression:"data.document_id"}},t._l(t.documents,function(a){return e("option",{key:a.key,domProps:{value:a.id}},[t._v(t._s(a.name))])}),0)],1):t._e(),t._v(" "),""!=t.spark.taxPayerConfig.document_code?e("b-form-group",{attrs:{label:t.spark.taxPayerConfig.document_code}},[e("b-input-group",[e("b-input",{attrs:{type:"text",placeholder:t.$t("commercial.code")},model:{value:t.data.code,callback:function(a){t.$set(t.data,"code",a)},expression:"data.code"}}),t._v(" "),e("b-input-group-append",[e("b-input",{attrs:{type:"date",placeholder:t.$t("commercial.expiryDate")},model:{value:t.data.code_expiry,callback:function(a){t.$set(t.data,"code_expiry",a)},expression:"data.code_expiry"}})],1)],1)],1):t._e(),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.number")}},[e("b-input",{directives:[{name:"mask",rawName:"v-mask",value:t.spark.taxPayerConfig.document_mask,expression:"spark.taxPayerConfig.document_mask"}],attrs:{type:"text",placeholder:"Invoice Number"},model:{value:t.data.number,callback:function(a){t.$set(t.data,"number",a)},expression:"data.number"}})],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.paymentCondition")}},[e("b-input-group",[e("b-input",{attrs:{type:"text",placeholder:t.$t("commercial.paymentCondition")},model:{value:t.data.payment_condition,callback:function(a){t.$set(t.data,"payment_condition",t._n(a))},expression:"data.payment_condition"}}),t._v(" "),0==t.data.payment_condition?e("b-input-group-append",[e("b-form-select",{model:{value:t.data.chart_account_id,callback:function(a){t.$set(t.data,"chart_account_id",a)},expression:"data.chart_account_id"}},t._l(t.accountCharts,function(a){return e("option",{key:a.key,domProps:{value:a.id}},[t._v(t._s(a.name))])}),0)],1):t._e()],1),t._v(" "),e("b-form-text",[t._v("Specify days between invoice and payment dates. Ex: use 0 for cash, and 30 for thrity days payment terms.")])],1),t._v(" "),e("b-form-group",{attrs:{label:t.$t("commercial.exchangeRate")}},[e("b-input-group",[e("b-input-group-prepend",[e("b-form-select",{model:{value:t.data.currency,callback:function(a){t.$set(t.data,"currency",a)},expression:"data.currency"}},t._l(t.currencies,function(a){return e("option",{key:a.key,domProps:{value:a.code}},[t._v(t._s(a.name))])}),0)],1),t._v(" "),e("b-input",{attrs:{type:"text",placeholder:t.$t("commercial.payment")},model:{value:t.data.rate,callback:function(a){t.$set(t.data,"rate",t._n(a))},expression:"data.rate"}})],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),e("b-row",[e("b-col",[e("b-card",{attrs:{"no-body":""}},[e("b-table",{attrs:{hover:"",items:t.data.details,fields:t.columns},scopedSlots:t._u([{key:"chart_id",fn:function(a){return[e("b-form-select",{model:{value:a.item.chart_id,callback:function(e){t.$set(a.item,"chart_id",e)},expression:"data.item.chart_id"}},t._l(t.itemCharts,function(a){return e("option",{key:a.key,domProps:{value:a.id}},[t._v(t._s(a.name))])}),0)]}},{key:"chart_vat_id",fn:function(a){return[e("b-form-select",{model:{value:a.item.chart_vat_id,callback:function(e){t.$set(a.item,"chart_vat_id",e)},expression:"data.item.chart_vat_id"}},t._l(t.vatCharts,function(a){return e("option",{key:a.key,domProps:{value:a.id}},[t._v(t._s(a.name))])}),0)]}},{key:"value",fn:function(a){return[e("b-input",{attrs:{type:"text",placeholder:"Value"},model:{value:a.item.value,callback:function(e){t.$set(a.item,"value",t._n(e))},expression:"data.item.value"}})]}},{key:"actions",fn:function(a){return[e("b-button",{attrs:{variant:"link"},on:{click:function(e){return t.deleteRow(a.item)}}},[e("i",{staticClass:"material-icons text-danger"},[t._v("delete_outline")])])]}}])})],1)],1)],1)],1)},[],!1,null,null,null);a.default=i.exports}}]);