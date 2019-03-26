(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/form.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/form.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      data: {}
    };
  },
  computed: {
    baseUrl: function baseUrl() {
      return "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle;
    }
  },
  mounted: function mounted() {
    var app = this;
    console.log(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id);

    if (app.$route.params.id > 0) {
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id).then(function (response) {
        //console.log(response);
        app.data = response.data.data;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/form.vue?vue&type=template&id=03758643&":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/form.vue?vue&type=template&id=03758643& ***!
  \**************************************************************************************************************************************************************************************************/
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
                    "\n      " + _vm._s(_vm.$t("general.return")) + "\n      "
                  )
                ]
              ),
              _vm._v(" "),
              _c("h3", { staticClass: "upper-case" }, [
                _c("img", {
                  staticClass: "mr-10",
                  attrs: { src: _vm.$route.meta.img, alt: "", width: "32" }
                }),
                _vm._v("\n      " + _vm._s(_vm.$route.meta.title) + "\n    ")
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
                      ]),
                      _vm._v(
                        "\n        " +
                          _vm._s(_vm.$t("general.addRowDetail")) +
                          "\n      "
                      )
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
                          ]),
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.$t("general.save")) +
                              "\n        "
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
                            "\n          " +
                              _vm._s(_vm.$t("general.cancel")) +
                              "\n        "
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
      _vm._l(_vm.$route.meta.cards, function(card) {
        return _c(
          "div",
          { key: card.index },
          [
            _c(
              "b-card",
              _vm._l(card.rows, function(row) {
                return _c(
                  "b-row",
                  { key: row.index },
                  _vm._l(row.fields, function(col) {
                    return _c(
                      "b-col",
                      { key: col.index },
                      [
                        _c(
                          "b-form-group",
                          { attrs: { label: _vm.$t(col.label) } },
                          _vm._l(col.properties, function(property) {
                            return _c(
                              "span",
                              { key: property.index },
                              [
                                property.type === "customer" ||
                                col.type === "supplier"
                                  ? _c(
                                      "b-input-group",
                                      [
                                        _c("search-taxpayer", {
                                          attrs: {
                                            partner_name:
                                              _vm.data[
                                                property.data[0]["name"]
                                              ],
                                            partner_taxid:
                                              _vm.data[
                                                property.data[0]["taxid"]
                                              ]
                                          },
                                          on: {
                                            "update:partner_name": function(
                                              $event
                                            ) {
                                              return _vm.$set(
                                                _vm.data,
                                                property.data[0]["name"],
                                                $event
                                              )
                                            },
                                            "update:partner_taxid": function(
                                              $event
                                            ) {
                                              return _vm.$set(
                                                _vm.data,
                                                property.data[0]["taxid"],
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : property.type === "select"
                                  ? _c(
                                      "b-input-group",
                                      [
                                        _c("select-data", {
                                          attrs: {
                                            Id: _vm.data[property.data],
                                            api: property.api
                                          },
                                          on: {
                                            "update:Id": function($event) {
                                              return _vm.$set(
                                                _vm.data,
                                                property.data,
                                                $event
                                              )
                                            },
                                            "update:id": function($event) {
                                              return _vm.$set(
                                                _vm.data,
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
                                        property.location === ""
                                          ? _c("b-input", {
                                              attrs: {
                                                type: col.type,
                                                required: col.required,
                                                placeholder: "col.placeholder0"
                                              },
                                              model: {
                                                value: _vm.data[property.data],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.data,
                                                    property.data,
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "data[property.data]"
                                              }
                                            })
                                          : _vm._e(),
                                        _vm._v(" "),
                                        property.location === "append"
                                          ? _c(
                                              "b-input-group-append",
                                              [
                                                _c("b-input", {
                                                  attrs: {
                                                    type: col.type,
                                                    required: col.required,
                                                    placeholder:
                                                      "col.placeholder1"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.data[property.data],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.data,
                                                        property.data,
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "data[property.data]"
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : property.location === "prepend"
                                          ? _c(
                                              "b-input-group-prepend",
                                              [
                                                _c("b-input", {
                                                  attrs: {
                                                    type: col.type,
                                                    required: col.required,
                                                    placeholder:
                                                      "col.placeholder2"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.data[property.data],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.data,
                                                        property.data,
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "data[property.data]"
                                                  }
                                                })
                                              ],
                                              1
                                            )
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
                      ],
                      1
                    )
                  }),
                  1
                )
              }),
              1
            )
          ],
          1
        )
      }),
      _vm._v(" "),
      _vm._l(_vm.$route.meta.tables, function(table) {
        return _c(
          "div",
          { key: table.index },
          [
            _c(
              "b-card",
              { attrs: { "no-body": "" } },
              [
                _c(
                  "b-row",
                  _vm._l(table.fields, function(col) {
                    return _c("b-col", { key: col.index }, [
                      _vm._v(_vm._s(_vm.$t(col.label)))
                    ])
                  }),
                  1
                ),
                _vm._v(" "),
                _vm._l(_vm.data.details, function(detail) {
                  return _c(
                    "b-row",
                    { key: detail.index },
                    _vm._l(table.fields, function(col) {
                      return _c(
                        "div",
                        { key: col.index },
                        _vm._l(col.properties, function(property) {
                          return _c(
                            "span",
                            { key: property.index },
                            [
                              property.type === "customer" ||
                              col.type === "supplier"
                                ? _c(
                                    "b-input-group",
                                    [
                                      _c("search-taxpayer", {
                                        attrs: {
                                          partner_name:
                                            detail[property.data[0]["name"]],
                                          partner_taxid:
                                            _vm.data[property.data[0]["taxid"]]
                                        },
                                        on: {
                                          "update:partner_name": function(
                                            $event
                                          ) {
                                            return _vm.$set(
                                              detail,
                                              property.data[0]["name"],
                                              $event
                                            )
                                          },
                                          "update:partner_taxid": function(
                                            $event
                                          ) {
                                            return _vm.$set(
                                              _vm.data,
                                              property.data[0]["taxid"],
                                              $event
                                            )
                                          }
                                        }
                                      })
                                    ],
                                    1
                                  )
                                : property.type === "select"
                                ? _c(
                                    "b-input-group",
                                    [
                                      _c("select-data", {
                                        attrs: {
                                          Id: detail[property.data],
                                          api: property.api
                                        },
                                        on: {
                                          "update:Id": function($event) {
                                            return _vm.$set(
                                              detail,
                                              property.data,
                                              $event
                                            )
                                          },
                                          "update:id": function($event) {
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
                                      property.location === ""
                                        ? _c("b-input", {
                                            attrs: {
                                              type: col.type,
                                              required: col.required,
                                              placeholder: "col.placeholder0"
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
                                        : _vm._e(),
                                      _vm._v(" "),
                                      property.location === "append"
                                        ? _c(
                                            "b-input-group-append",
                                            [
                                              _c("b-input", {
                                                attrs: {
                                                  type: col.type,
                                                  required: col.required,
                                                  placeholder:
                                                    "col.placeholder1"
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
                                            ],
                                            1
                                          )
                                        : property.location === "prepend"
                                        ? _c(
                                            "b-input-group-prepend",
                                            [
                                              _c("b-input", {
                                                attrs: {
                                                  type: col.type,
                                                  required: col.required,
                                                  placeholder:
                                                    "col.placeholder2"
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
                                            ],
                                            1
                                          )
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
                    0
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

/***/ "./resources/js/views/form.vue":
/*!*************************************!*\
  !*** ./resources/js/views/form.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form.vue?vue&type=template&id=03758643& */ "./resources/js/views/form.vue?vue&type=template&id=03758643&");
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.vue?vue&type=script&lang=js& */ "./resources/js/views/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/form.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/views/form.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/form.vue?vue&type=template&id=03758643&":
/*!********************************************************************!*\
  !*** ./resources/js/views/form.vue?vue&type=template&id=03758643& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./form.vue?vue&type=template&id=03758643& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/form.vue?vue&type=template&id=03758643&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_template_id_03758643___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);