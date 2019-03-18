(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
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
    'crud': _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      data: {
        chart_account_id: 0,
        comment: '',
        currency: '',
        date: '',
        id: 0,
        rate: 1,
        payment_value: 0
      },
      pageUrl: '/commercial/accounts-payable',
      currencies: [],
      accountCharts: [],
      lastDeletedRow: []
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
    }
  },
  methods: {
    onSaveNew: function onSaveNew() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t('commercial.accountPayableSaved')
        });
        app.$router.go(-1);
      }).catch(function (error) {
        app.$snack.danger({
          text: this.$i18n.t('general.errorMessage')
        });
      });
    },
    onCancel: function onCancel() {
      var _this = this;

      this.$swal.fire({
        title: this.$i18n.t('general.cancel'),
        text: this.$i18n.t('general.cancelVerification'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$i18n.t('general.cancelConfirmation'),
        cancelButtonText: this.$i18n.t('general.cancelRejection')
      }).then(function (result) {
        if (result.value) {
          _this.$router.go(-1);
        }
      });
    }
  },
  mounted: function mounted() {
    var app = this;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + '/config/currencies').then(function (response) {
      app.currencies = response.data.data;
    });

    if (app.$route.params.id > 0) {
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.pageUrl + '/' + app.$route.params.id).then(function (response) {
        app.data = response.data.data;
        var total = 0;

        if (app.data.details != null) {
          total = app.data.details.reduce(function (sum, row) {
            return sum + new Number(row['value']);
          }, 0);
        }

        var paid = 0;

        if (app.data.accountMovements != null) {
          paid = app.data.accountMovements.reduce(function (sum, row) {
            return sum + new Number(row['debit']);
          }, 0);
        }

        app.data.date = new Date(Date.now()).toISOString().split("T")[0];
        app.data.payment_value = new Number(total) - new Number(paid);
        app.data.currency = app.currencies[0].code;
        app.data.chart_id = app.accountCharts[0].id;
        app.data.rate = 1;
      });
    }

    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/money/").then(function (response) {
      app.accountCharts = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
        { staticClass: "mb-5" },
        [
          _c(
            "b-col",
            [
              _c(
                "b-btn",
                {
                  directives: [
                    {
                      name: "shortkey",
                      rawName: "v-shortkey",
                      value: ["esc"],
                      expression: "['esc']"
                    }
                  ],
                  staticClass: "d-none d-md-block float-left",
                  on: {
                    shortkey: function($event) {
                      return _vm.onCancel()
                    },
                    click: function($event) {
                      return _vm.onCancel()
                    }
                  }
                },
                [
                  _c("i", { staticClass: "material-icons" }, [
                    _vm._v("keyboard_backspace")
                  ]),
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.$t("general.return")) +
                      "\n                "
                  )
                ]
              ),
              _vm._v(" "),
              _c("h3", { staticClass: "upper-case" }, [
                _c("img", {
                  staticClass: "mr-10",
                  attrs: { src: _vm.$route.meta.img, alt: "", width: "32" }
                }),
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.$route.meta.title) +
                    "\n            "
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-col",
            [
              _c(
                "b-button-toolbar",
                { staticClass: "float-right d-none d-md-block" },
                [
                  _c(
                    "b-button-group",
                    { staticClass: "ml-15" },
                    [
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["ctrl", "n"],
                              expression: "['ctrl', 'n']"
                            }
                          ],
                          attrs: { variant: "primary" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onSaveNew()
                            },
                            click: function($event) {
                              return _vm.onSaveNew()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("save")
                          ]),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.$t("general.save")) +
                              "\n                    "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["esc"],
                              expression: "['esc']"
                            }
                          ],
                          attrs: { variant: "danger" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onCancel()
                            },
                            click: function($event) {
                              return _vm.onCancel()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("cancel")
                          ]),
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.$t("general.cancel")) +
                              "\n                    "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-button-toolbar",
                { staticClass: "float-right d-md-none" },
                [
                  _c(
                    "b-button-group",
                    { staticClass: "ml-15" },
                    [
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["ctrl", "n"],
                              expression: "['ctrl', 'n']"
                            }
                          ],
                          attrs: { variant: "primary" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onSaveNew()
                            },
                            click: function($event) {
                              return _vm.onSaveNew()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("save")
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-btn",
                        {
                          directives: [
                            {
                              name: "shortkey",
                              rawName: "v-shortkey",
                              value: ["esc"],
                              expression: "['esc']"
                            }
                          ],
                          attrs: { variant: "danger" },
                          on: {
                            shortkey: function($event) {
                              return _vm.onCancel()
                            },
                            click: function($event) {
                              return _vm.onCancel()
                            }
                          }
                        },
                        [
                          _c("i", { staticClass: "material-icons" }, [
                            _vm._v("cancel")
                          ])
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
      ),
      _vm._v(" "),
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
                    "b-container",
                    [
                      _c(
                        "b-row",
                        [
                          _c(
                            "b-col",
                            [
                              _c(
                                "b-form-group",
                                { attrs: { label: _vm.$t("commercial.date") } },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "date",
                                      required: "",
                                      placeholder: "Missing Information"
                                    },
                                    model: {
                                      value: _vm.data.date,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "date", $$v)
                                      },
                                      expression: "data.date"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.value") }
                                },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "number",
                                      placeholder: "Value"
                                    },
                                    model: {
                                      value: _vm.data.payment_value,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.data,
                                          "payment_value",
                                          _vm._n($$v)
                                        )
                                      },
                                      expression: "data.payment_value"
                                    }
                                  })
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
                                {
                                  attrs: { label: _vm.$t("commercial.chart") }
                                },
                                [
                                  _c(
                                    "b-form-select",
                                    {
                                      model: {
                                        value: _vm.data.chart_id,
                                        callback: function($$v) {
                                          _vm.$set(_vm.data, "chart_id", $$v)
                                        },
                                        expression: "data.chart_id"
                                      }
                                    },
                                    _vm._l(_vm.accountCharts, function(item) {
                                      return _c(
                                        "option",
                                        {
                                          key: item.key,
                                          domProps: { value: item.id }
                                        },
                                        [_vm._v(_vm._s(item.name))]
                                      )
                                    }),
                                    0
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: {
                                    label: _vm.$t("commercial.exchangeRate")
                                  }
                                },
                                [
                                  _c(
                                    "b-input-group",
                                    [
                                      _c(
                                        "b-input-group-prepend",
                                        [
                                          _c(
                                            "b-form-select",
                                            {
                                              model: {
                                                value: _vm.data.currency,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.data,
                                                    "currency",
                                                    $$v
                                                  )
                                                },
                                                expression: "data.currency"
                                              }
                                            },
                                            _vm._l(_vm.currencies, function(
                                              currency
                                            ) {
                                              return _c(
                                                "option",
                                                {
                                                  key: currency.key,
                                                  domProps: {
                                                    value: currency.code
                                                  }
                                                },
                                                [_vm._v(_vm._s(currency.name))]
                                              )
                                            }),
                                            0
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("b-input", {
                                        attrs: {
                                          type: "number",
                                          placeholder: _vm.$t(
                                            "commercial.rate"
                                          ),
                                          value: _vm.data.rate
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.comment") }
                                },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      required: "",
                                      placeholder: "Missing Information"
                                    },
                                    model: {
                                      value: _vm.data.comment,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "comment", $$v)
                                      },
                                      expression: "data.comment"
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
              _c("b-card", [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.data.accountMovements) +
                    "\n            "
                )
              ])
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

/***/ "./resources/js/views/commercials/payableForm.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/commercials/payableForm.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./payableForm.vue?vue&type=template&id=7771d191& */ "./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191&");
/* harmony import */ var _payableForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./payableForm.vue?vue&type=script&lang=js& */ "./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _payableForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__["render"],
  _payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/commercials/payableForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_payableForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./payableForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/payableForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_payableForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./payableForm.vue?vue&type=template&id=7771d191& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/payableForm.vue?vue&type=template&id=7771d191&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_payableForm_vue_vue_type_template_id_7771d191___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);