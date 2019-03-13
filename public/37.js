(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/documentList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/documentList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
    return {};
  },
  computed: {
    formURL: function formURL() {
      return this.$route.name.replace("List", "Form");
    },
    columns: function columns() {
      return [{
        key: "prefix",
        label: this.$i18n.t("commercial.prefix"),
        sortable: true
      }, {
        key: "mask",
        label: this.$i18n.t("commercial.mask"),
        sortable: true
      }, {
        key: "start_range",
        label: this.$i18n.t("commercial.start"),
        sortable: true
      }, {
        key: "current_range",
        label: this.$i18n.t("commercial.current"),
        sortable: true
      }, {
        key: "end_range",
        label: this.$i18n.t("commercial.end"),
        sortable: true
      }, {
        key: "actions",
        label: "",
        sortable: false
      }];
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394& ***!
  \******************************************************************************************************************************************************************************************************************/
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
                              "\n            " +
                                _vm._s(_vm.$t(_vm.$route.meta.title)) +
                                "\n          "
                            )
                          ]),
                          _vm._v(" "),
                          _vm.$route.name.includes("List")
                            ? _c(
                                "p",
                                { staticClass: "lead" },
                                [
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(
                                        _vm.$t(_vm.$route.meta.description)
                                      ) +
                                      ",\n            "
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
                                { attrs: { href: "#", disabled: "" } },
                                [
                                  _c("i", { staticClass: "material-icons" }, [
                                    _vm._v("cloud_upload")
                                  ]),
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.$t("general.upload")) +
                                      " " +
                                      _vm._s(_vm.$route.meta.title) +
                                      "\n            "
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
                                    "\n              " +
                                      _vm._s(_vm.$t("general.create")) +
                                      " " +
                                      _vm._s(_vm.$route.meta.title) +
                                      "\n            "
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
                    [
                      _c("crud", {
                        attrs: { columns: _vm.columns },
                        inlineTemplate: {
                          render: function() {
                            var _vm = this
                            var _h = _vm.$createElement
                            var _c = _vm._self._c || _h
                            return _c(
                              "b-card",
                              { attrs: { "no-body": "" } },
                              [
                                _c(
                                  "b-table",
                                  {
                                    attrs: {
                                      hover: "",
                                      responsive: "",
                                      items: _vm.items,
                                      fields: _vm.columns,
                                      "current-page": _vm.current_page,
                                      "show-empty": ""
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "actions",
                                          fn: function(data) {
                                            return [
                                              _c("table-actions", {
                                                attrs: { row: data.item }
                                              })
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      false,
                                      1612661290
                                    )
                                  },
                                  [
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        attrs: { slot: "table-busy" },
                                        slot: "table-busy"
                                      },
                                      [_c("table-loading")],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "template",
                                      { slot: "empty" },
                                      [_c("table-empty")],
                                      1
                                    )
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("b-pagination", {
                                  attrs: {
                                    align: "center",
                                    "total-rows": _vm.meta.total,
                                    "per-page": _vm.meta.per_page
                                  },
                                  on: {
                                    change: function($event) {
                                      return _vm.onList()
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          },
                          staticRenderFns: []
                        }
                      })
                    ],
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

/***/ "./resources/js/views/configs/documentList.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/configs/documentList.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./documentList.vue?vue&type=template&id=61439394& */ "./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394&");
/* harmony import */ var _documentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./documentList.vue?vue&type=script&lang=js& */ "./resources/js/views/configs/documentList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _documentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__["render"],
  _documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/configs/documentList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/configs/documentList.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/configs/documentList.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_documentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./documentList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/documentList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_documentList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./documentList.vue?vue&type=template&id=61439394& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/documentList.vue?vue&type=template&id=61439394&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_documentList_vue_vue_type_template_id_61439394___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);