(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/versionList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/versionList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/crud.vue */ "./resources/js/components/crud.vue");
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
  data: function data() {
    return {};
  },
  computed: {
    columns: function columns() {
      return [{
        key: 'version.name',
        label: this.$i18n.t('accounting.version'),
        sortable: true
      }, {
        key: 'year',
        label: this.$i18n.t('general.year'),
        sortable: true
      }, {
        key: 'actions',
        label: '',
        sortable: false
      }];
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
      _vm.$route.name.includes("List")
        ? _c(
            "b-row",
            [
              _c(
                "b-col",
                [
                  _c(
                    "b-card-group",
                    { attrs: { deck: "" } },
                    [
                      _c(
                        "b-card",
                        {
                          attrs: {
                            "bg-variant": "dark",
                            "text-variant": "white"
                          }
                        },
                        [
                          _c("h4", { staticClass: "upper-case" }, [
                            _c("img", {
                              staticClass: "ml-5 mr-5",
                              attrs: {
                                src: _vm.$route.meta.img,
                                alt: "",
                                width: "26"
                              }
                            }),
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.$t(_vm.$route.meta.title)) +
                                "\n                    "
                            )
                          ]),
                          _vm._v(" "),
                          _vm.$route.name.includes("List")
                            ? _c(
                                "p",
                                { staticClass: "lead" },
                                [
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(
                                        _vm.$t(_vm.$route.meta.description)
                                      ) +
                                      ", "
                                  ),
                                  _c(
                                    "router-link",
                                    {
                                      attrs: {
                                        to:
                                          "{ name: $route.name, params: { id: 0}}"
                                      }
                                    },
                                    [_vm._v("Create")]
                                  )
                                ],
                                1
                              )
                            : _vm._e()
                        ]
                      ),
                      _vm._v(" "),
                      _c("invoices-this-month-kpi", {
                        staticClass: "d-none d-xl-block"
                      }),
                      _vm._v(" "),
                      _c("invoices-this-month-kpi", {
                        staticClass: "d-none d-xl-block"
                      }),
                      _vm._v(" "),
                      _c(
                        "b-card",
                        { attrs: { "no-body": "" } },
                        [
                          _c(
                            "b-list-group",
                            { attrs: { flush: "" } },
                            [
                              _c(
                                "b-list-group-item",
                                { attrs: { href: "#" } },
                                [
                                  _c("i", { staticClass: "material-icons" }, [
                                    _vm._v("insert_chart")
                                  ]),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("general.report", 2)) +
                                      " " +
                                      _vm._s(_vm.$route.meta.title) +
                                      "\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-list-group-item",
                                { attrs: { href: "#", disabled: "" } },
                                [
                                  _c("i", { staticClass: "material-icons" }, [
                                    _vm._v("cloud_upload")
                                  ]),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("general.upload")) +
                                      " " +
                                      _vm._s(_vm.$route.meta.title) +
                                      "\n                        "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "b-list-group-item",
                                {
                                  attrs: {
                                    to: { name: _vm.formURL, params: { id: 0 } }
                                  }
                                },
                                [
                                  _c(
                                    "i",
                                    { staticClass: "material-icons md-light" },
                                    [_vm._v("add_box")]
                                  ),
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.$t("general.create")) +
                                      " " +
                                      _vm._s(_vm.$route.meta.title) +
                                      "\n                        "
                                  )
                                ]
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
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _vm.$route.name.includes("List")
                ? _c(
                    "div",
                    [_c("table-template", { attrs: { columns: _vm.columns } })],
                    1
                  )
                : _c("router-view")
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

/***/ "./resources/js/views/configs/versionList.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/configs/versionList.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./versionList.vue?vue&type=template&id=336bce6e& */ "./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e&");
/* harmony import */ var _versionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./versionList.vue?vue&type=script&lang=js& */ "./resources/js/views/configs/versionList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _versionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/configs/versionList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/configs/versionList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/configs/versionList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_versionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./versionList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/versionList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_versionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./versionList.vue?vue&type=template&id=336bce6e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/versionList.vue?vue&type=template&id=336bce6e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_versionList_vue_vue_type_template_id_336bce6e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);