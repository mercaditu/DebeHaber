(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/journalForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/crud.vue */ "./resources/js/components/crud.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    crud: _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      template_id: "",
      template: "",
      value: "",
      pageUrl: "/accounting/journals",
      accountCharts: [],
      templates: []
    };
  },
  computed: {
    Value: {
      // getter
      get: function get() {
        return this.value;
      },
      // setter
      set: function set(newValue) {
        this.value = newValue;
        this.$emit("update:value", newValue);
      }
    },
    Balance: function Balance() {
      var debit = 0;
      var credit = 0;
      this.data.details.forEach(function (e) {
        debit += e.debit;
        credit += e.credit;
        console.log(e);
      });
      return debit - credit;
    },
    baseUrl: function baseUrl() {
      return "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle;
    }
  },
  methods: {
    onGenerateDetail: function onGenerateDetail() {
      var app = this;
      app.template_id = app.template.id;
      this.$emit("update:template_id", app.template.id);
      app.template.details.forEach(function (element) {
        app.data.details.push({
          id: 0,
          chart_id: element.chart_id,
          debit: app.data.value * element.debit_coef,
          credit: app.data.value * element.credit_coef
        });
      });
    }
  },
  mounted: function mounted() {
    var app = this;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/accountables/").then(function (response) {
      app.accountCharts = response.data.data;
    });
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/journal-templates").then(function (response) {
      app.templates = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _c(
                "b-form-group",
                { attrs: { label: _vm.$t("accounting.template") } },
                [
                  _c(
                    "b-form-select",
                    {
                      model: {
                        value: _vm.template,
                        callback: function($$v) {
                          _vm.template = $$v
                        },
                        expression: "template"
                      }
                    },
                    _vm._l(_vm.templates, function(item) {
                      return _c(
                        "option",
                        { key: item.key, domProps: { value: item } },
                        [_vm._v(_vm._s(item.name))]
                      )
                    }),
                    0
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-form-group",
                { attrs: { label: _vm.$t("commercial.value") } },
                [
                  _c(
                    "b-input-group-append",
                    [
                      _c("b-input", {
                        attrs: { type: "text", placeholder: "Value" },
                        model: {
                          value: _vm.Value,
                          callback: function($$v) {
                            _vm.Value = $$v
                          },
                          expression: "Value"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          attrs: { variant: "primary" },
                          on: {
                            click: function($event) {
                              return _vm.onGenerateDetail()
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("general.generate")))]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/journalForm.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/journalForm.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./journalForm.vue?vue&type=template&id=1fcf8bc0& */ "./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&");
/* harmony import */ var _journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journalForm.vue?vue&type=script&lang=js& */ "./resources/js/components/journalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/journalForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/journalForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/journalForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./journalForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./journalForm.vue?vue&type=template&id=1fcf8bc0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/journalForm.vue?vue&type=template&id=1fcf8bc0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalForm_vue_vue_type_template_id_1fcf8bc0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);