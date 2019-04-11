(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/reports.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/reports.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "",
  data: function data() {
    return {
      startDate: "",
      endDate: ""
    };
  },
  methods: {
    GenerateReport: function GenerateReport(path, mode) {
      console.log(mode);
      var app = this;
      window.location.href = app.$route.path + "/" + path + "/" + app.startDate + "/" + app.endDate;
    }
  },
  mounted: function mounted() {
    var app = this;
    app.startDate = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
    app.endDate = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6& ***!
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
                                  return _vm.GenerateReport("sub_ledger")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("accounting.subLedger")) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport("sub_ledger", 1)
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
                                  return _vm.GenerateReport("ledger")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("accounting.ledger")) +
                                  "\n               "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport("ledger", 1)
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
                                  return _vm.GenerateReport("ledger-byMonth")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("accounting.ledgerOfMonth")) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "ledger-byMonth",
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
                                  return _vm.GenerateReport(
                                    "ledger-byMoneyAccounts"
                                  )
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("accounting.ledgerOfCash")) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "ledger-byMoneyAccounts",
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
                                  return _vm.GenerateReport(
                                    "ledger-byReceivables"
                                  )
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t(
                                      "accounting.ledgerOfAccountsReceivable"
                                    )
                                  ) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "ledger-byReceivables",
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
                                  return _vm.GenerateReport("ledger-byPayables")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t("accounting.ledgerOfAccountsPayable")
                                  ) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "ledger-byPayables",
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
                                  return _vm.GenerateReport("ledger-byExpenses")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/journals.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t("accounting.ledgerOfExpenses")
                                  ) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "ledger-byExpenses",
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
                                  return _vm.GenerateReport("balance-sheet")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/balance.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.$t("commercial.Balance Sheet")) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "balance-sheet",
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
                                  return _vm.GenerateReport("balance-byMonth")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/balance.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t("commercial.BalanceSheetByMonth")
                                  ) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "balance-byMonth",
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
                                  return _vm.GenerateReport(
                                    "balance-bycomparative"
                                  )
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/balance.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t("commercial.BalanceComparative")
                                  ) +
                                  "\n              "
                              ),
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/excel.svg",
                                  width: "32"
                                },
                                on: {
                                  click: function($event) {
                                    return _vm.GenerateReport(
                                      "balance-bycomparative",
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
                                  return _vm.GenerateReport("chart-ofAccounts")
                                }
                              }
                            },
                            [
                              _c("b-img", {
                                attrs: {
                                  src: "/img/apps/chart-of-accounts.svg",
                                  width: "32"
                                }
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.$t("commercial.Chart of Accounts")
                                  ) +
                                  "\n            "
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

/***/ "./resources/js/views/accounts/reports.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/accounts/reports.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reports.vue?vue&type=template&id=93d7bad6& */ "./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6&");
/* harmony import */ var _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reports.vue?vue&type=script&lang=js& */ "./resources/js/views/accounts/reports.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/accounts/reports.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/accounts/reports.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/accounts/reports.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./reports.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/reports.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./reports.vue?vue&type=template&id=93d7bad6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/reports.vue?vue&type=template&id=93d7bad6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_reports_vue_vue_type_template_id_93d7bad6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);