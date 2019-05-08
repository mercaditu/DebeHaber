(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/reports.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/reports.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  name: "",
  data: function data() {
    return {
      startDate: "",
      endDate: ""
    };
  },
  methods: {
    generateReport: function generateReport(path) {
      var app = this;
      window.open(app.$route.path + "/" + path + "/" + app.startDate + "/" + app.endDate, '_blank');
    }
  },
  mounted: function mounted() {
    var app = this;
    app.startDate = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
    app.endDate = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a& ***!
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
      _c(
        "b-row",
        [
          _c(
            "b-col",
            [
              _c(
                "b-card",
                [
                  _c(
                    "b-button-group",
                    [
                      _c("b-button", [_vm._v("Last Month")]),
                      _vm._v(" "),
                      _c("b-button", [_vm._v("This Year")]),
                      _vm._v(" "),
                      _c("b-button", [_vm._v("Last Year")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form",
                    { attrs: { inline: "", horizontal: "" } },
                    [
                      _c(
                        "b-form-group",
                        { attrs: { label: "Start Date" } },
                        [
                          _c("b-form-input", {
                            attrs: { type: "date" },
                            model: {
                              value: _vm.startDate,
                              callback: function($$v) {
                                _vm.startDate = $$v
                              },
                              expression: "startDate"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "b-form-group",
                        { attrs: { label: "End Date" } },
                        [
                          _c("b-form-input", {
                            attrs: { type: "date" },
                            model: {
                              value: _vm.endDate,
                              callback: function($$v) {
                                _vm.endDate = $$v
                              },
                              expression: "endDate"
                            }
                          })
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
      ),
      _vm._v(" "),
      _c(
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
                    { attrs: { "no-body": "" } },
                    [
                      _c(
                        "b-list-group",
                        { attrs: { flush: "" } },
                        [
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("sales")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/sales.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.$t("commercial.salesBook")) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport("sales", 1)
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("sales-byCustomers")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/sales.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.$t("commercial.salesBookByCustomers")
                                  ) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport(
                                      "sales-byCustomers",
                                      1
                                    )
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("sales-byChart")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/sales.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.$t("commercial.salesBookByItems")
                                  ) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport(
                                      "sales-byChart",
                                      1
                                    )
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("sales-byVATs")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/sales.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.$t("commercial.salesBookByVat")) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport("sales-byVATs", 1)
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
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
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("purchases")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/purchase-v1.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.$t("commercial.purchaseBook")) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport("purchases", 1)
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport(
                                    "purchases-bySupplier"
                                  )
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/purchase-v1.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.$t("commercial.purchaseBookBySuppliers")
                                  ) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport(
                                      "purchases-bySupplier",
                                      1
                                    )
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("purchases-byChart")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/purchase-v1.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.$t("commercial.purchaseBookByItems")
                                  ) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport(
                                      "purchases-byChart",
                                      1
                                    )
                                  }
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("purchases-byVAT")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/purchase-v1.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.$t("commercial.purchaseBookByVat")
                                  ) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport(
                                      "purchases-byVAT",
                                      1
                                    )
                                  }
                                }
                              })
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
        ],
        1
      ),
      _vm._v(" "),
      _c(
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
                    { attrs: { "no-body": "" } },
                    [
                      _c(
                        "b-list-group",
                        { attrs: { flush: "" } },
                        [
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("credit_notes")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/credit-note.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.$t("commercial.creditNote")) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport("credit_notes", 1)
                                  }
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
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
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("debit_notes")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/debit-note.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.$t("commercial.debitNote")) +
                                  "\n                            "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.generateReport("debit_notes", 1)
                                  }
                                }
                              })
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
        ],
        1
      ),
      _vm._v(" "),
      _c(
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
                    { attrs: { "no-body": "" } },
                    [
                      _c(
                        "b-list-group",
                        { attrs: { flush: "" } },
                        [
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.generateReport("PRY/hechauka")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/cloud.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n                                Hechauka\n                        "
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

/***/ "./resources/js/views/commercials/reports.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/commercials/reports.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reports.vue?vue&type=template&id=17c82e6a& */ "./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a&");
/* harmony import */ var _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports.vue?vue&type=script&lang=js& */ "./resources/js/views/commercials/reports.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/commercials/reports.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/commercials/reports.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/commercials/reports.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./reports.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/reports.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./reports.vue?vue&type=template&id=17c82e6a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/reports.vue?vue&type=template&id=17c82e6a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_17c82e6a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);