(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/import.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/import.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      data: {},
      name: ""
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle;
    }
  },
  methods: {
    onSaveNew: function onSaveNew() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.$route.meta.pageurl, app.data).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t("commercial.invoiceSaved")
        });
      })["catch"](function (error) {
        console.log(error);
        app.$snack.danger({
          text: this.$i18n.t("general.errorMessage") + error.message
        });
      });
    },
    onCancel: function onCancel() {
      var _this = this;

      this.$swal.fire({
        title: this.$i18n.t("general.cancel"),
        text: this.$i18n.t("general.cancelVerification"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.$i18n.t("general.cancelConfirmation"),
        cancelButtonText: this.$i18n.t("general.cancelRejection")
      }).then(function (result) {
        if (result.value) {
          _this.$router.go(-1);
        }
      });
    },
    addRow: function addRow(table) {
      var app = this;

      if (app.data[table] === undefined) {
        app.data[table] = [];
      }

      app.data[table].push({
        // index: this.data.details.length + 1,
        id: 0
      });
      this.$forceUpdate();
    }
  },
  beforeUpdate: function beforeUpdate() {
    //var app = this;
    var app = this;
    var url = "";
    url = app.baseUrl + app.$route.meta.pageurl;

    if (this.name != url) {
      app.name = url;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(url).then(function (response) {
        //console.log(response);
        app.data = response.data.data;
      });
    }
  },
  mounted: function mounted() {
    var app = this;
    var url = "";
    url = app.baseUrl + app.$route.meta.pageurl;
    app.name = url;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(url).then(function (response) {
      //console.log(response);
      app.data = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/import.vue?vue&type=template&id=83501238&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/import.vue?vue&type=template&id=83501238& ***!
  \****************************************************************************************************************************************************************************************************/
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
          _c("b-col", [
            _c("h3", { staticClass: "upper-case" }, [
              _c("img", {
                staticClass: "mr-10",
                attrs: { src: _vm.$route.meta.img, alt: "", width: "32" }
              }),
              _vm._v(
                "\n        " +
                  _vm._s(_vm.$t(_vm.$route.meta.title)) +
                  "\n      "
              )
            ])
          ]),
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
      _vm._l(_vm.$route.meta.tables, function(table) {
        return _c(
          "div",
          { key: table.index },
          [
            _c(
              "b-card",
              [
                _c(
                  "b-row",
                  _vm._l(table.fields, function(col) {
                    return _c(
                      "b-col",
                      { key: col.index, attrs: { cols: col.cols } },
                      [_c("b", [_vm._v(_vm._s(_vm.$t(col.label)))])]
                    )
                  }),
                  1
                ),
                _vm._v(" "),
                _vm._l(_vm.data, function(detail) {
                  return _c(
                    "div",
                    { key: detail.index },
                    [
                      _c(
                        "b-row",
                        _vm._l(table.fields, function(col) {
                          return _c(
                            "b-col",
                            { key: col.index, attrs: { cols: col.cols } },
                            _vm._l(col.properties, function(property) {
                              return _c(
                                "span",
                                { key: property.index },
                                [
                                  property.type === "label"
                                    ? _c("b-input-group", [
                                        detail["is_accountable"]
                                          ? _c(
                                              "span",
                                              [
                                                _vm._v(
                                                  "\n                  " +
                                                    _vm._s(
                                                      detail[property.data]
                                                    ) +
                                                    "\n                  "
                                                ),
                                                _c("chart-types", {
                                                  attrs: {
                                                    type:
                                                      detail[
                                                        property.data[0]["type"]
                                                      ],
                                                    sub_type:
                                                      detail[
                                                        property.data[0][
                                                          "subtype"
                                                        ]
                                                      ]
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : _c("b", [
                                              _vm._v(
                                                _vm._s(detail[property.data])
                                              )
                                            ])
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  property.type === "select"
                                    ? _c(
                                        "b-input-group",
                                        [
                                          _c("select-data", {
                                            attrs: {
                                              Item: detail[property.data],
                                              api: property.api,
                                              options: property.options
                                            },
                                            on: {
                                              "update:Item": function($event) {
                                                return _vm.$set(
                                                  detail,
                                                  property.data,
                                                  $event
                                                )
                                              },
                                              "update:item": function($event) {
                                                return _vm.$set(
                                                  detail,
                                                  property.data,
                                                  $event
                                                )
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _c(
                                        "b-input-group",
                                        [
                                          detail[property.location]
                                            ? _c("b-input", {
                                                attrs: {
                                                  type: property.type,
                                                  required: property.required,
                                                  placeholder: _vm.$t(
                                                    property.placeholder
                                                  )
                                                },
                                                model: {
                                                  value: detail[property.data],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      detail,
                                                      property.data,
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "detail[property.data]"
                                                }
                                              })
                                            : _vm._e()
                                        ],
                                        1
                                      )
                                ],
                                1
                              )
                            }),
                            0
                          )
                        }),
                        1
                      )
                    ],
                    1
                  )
                })
              ],
              2
            )
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/import.vue":
/*!***************************************!*\
  !*** ./resources/js/views/import.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import.vue?vue&type=template&id=83501238& */ "./resources/js/views/import.vue?vue&type=template&id=83501238&");
/* harmony import */ var _import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import.vue?vue&type=script&lang=js& */ "./resources/js/views/import.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__["render"],
  _import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/import.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/import.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./resources/js/views/import.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./import.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/import.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/import.vue?vue&type=template&id=83501238&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/import.vue?vue&type=template&id=83501238& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./import.vue?vue&type=template&id=83501238& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/import.vue?vue&type=template&id=83501238&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_import_vue_vue_type_template_id_83501238___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);