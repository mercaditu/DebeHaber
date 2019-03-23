(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    crud: _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      data: {
        currency_id: '',
        currency: '',
        buy_rate: 0,
        sell_rate: 0,
        date: ''
      },
      currencies: [],
      pageUrl: '/config/rates',
      lastDeletedRow: []
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
    }
  },
  methods: {
    onSave: function onSave() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t('accounting.DocumentSaved')
        });
        app.$router.go(-1);
      }).catch(function (error) {
        app.$snack.danger({
          text: 'Error OMG!'
        });
      });
    },
    onSaveNew: function onSaveNew() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t('accounting.DocumentSaved')
        });
        app.$router.push({
          name: app.$route.name,
          params: {
            id: '0'
          }
        });
        app.data.sell_rate = '';
        app.data.buy_rate = '';
        app.data.date = '';
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
      });
    } else {
      app.data.prefix = 1;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1& ***!
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
                    "\n        " +
                      _vm._s(_vm.$t("general.currency")) +
                      "\n        "
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
                  "\n        " + _vm._s(_vm.$route.meta.title) + "\n      "
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
                            "\n            " +
                              _vm._s(_vm.$t("general.save")) +
                              "\n          "
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
                            "\n            " +
                              _vm._s(_vm.$t("general.cancel")) +
                              "\n          "
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
                    "b-btn",
                    {
                      directives: [
                        {
                          name: "shortkey",
                          rawName: "v-shortkey",
                          value: ["ctrl", "d"],
                          expression: "['ctrl', 'd']"
                        }
                      ],
                      staticClass: "ml-15",
                      on: {
                        shortkey: function($event) {
                          return _vm.addDetailRow()
                        },
                        click: function($event) {
                          return _vm.addDetailRow()
                        }
                      }
                    },
                    [
                      _c("i", { staticClass: "material-icons" }, [
                        _vm._v("playlist_add")
                      ])
                    ]
                  ),
                  _vm._v(" "),
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
                                {
                                  attrs: {
                                    label: _vm.$t("commercial.currency")
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
                                                value: _vm.data.currency_id,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.data,
                                                    "currency_id",
                                                    $$v
                                                  )
                                                },
                                                expression: "data.currency_id"
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
                                                    value: currency.id
                                                  }
                                                },
                                                [_vm._v(_vm._s(currency.name))]
                                              )
                                            }),
                                            0
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
                                  attrs: {
                                    label: _vm.$t("commercial.sellRate")
                                  }
                                },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      required: "",
                                      placeholder: "Missing Information"
                                    },
                                    model: {
                                      value: _vm.data.sell_rate,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.data,
                                          "sell_rate",
                                          _vm._n($$v)
                                        )
                                      },
                                      expression: "data.sell_rate"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.buyRate") }
                                },
                                [
                                  _c("b-input", {
                                    attrs: {
                                      type: "text",
                                      required: "",
                                      placeholder: "Missing Information"
                                    },
                                    model: {
                                      value: _vm.data.buy_rate,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "buy_rate", $$v)
                                      },
                                      expression: "data.buy_rate"
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

/***/ "./resources/js/views/configs/rateForm.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/configs/rateForm.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rateForm.vue?vue&type=template&id=4d48a0a1& */ "./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1&");
/* harmony import */ var _rateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rateForm.vue?vue&type=script&lang=js& */ "./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _rateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/configs/rateForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_rateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./rateForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/rateForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_rateForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./rateForm.vue?vue&type=template&id=4d48a0a1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/configs/rateForm.vue?vue&type=template&id=4d48a0a1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_rateForm_vue_vue_type_template_id_4d48a0a1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);