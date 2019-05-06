(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      cycle: []
    };
  },
  computed: {
    formURL: function formURL() {
      return this.$route.name.replace("List", "Form");
    },
    columns: function columns() {
      return [{
        key: "date",
        sortable: true
      }, {
        key: "comment",
        label: this.$i18n.t("general.comment"),
        sortable: true
      }, {
        key: "debit",
        formatter: function formatter(value, key, item) {
          return new Number(item.details.reduce(function (sum, row) {
            return sum + new Number(row["debit"]);
          }, 0)).toLocaleString();
        },
        label: this.$i18n.t("commercial.value"),
        sortable: true
      }, {
        key: "hasDetails",
        label: "",
        sortable: false
      }, {
        key: "actions",
        label: "",
        sortable: false
      }];
    },
    baseUrl: function baseUrl() {
      return "/api/" + this.$route.params.taxPayer + "/" + this.$route.params.cycle;
    }
  },
  methods: {
    GenerateJournal: function GenerateJournal() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/generate-journals/" + app.cycle.start_date + "/" + app.cycle.end_date).then(function (response) {
        app.$snack.success({
          text: app.$i18n.t("accounting.generateJournal")
        });
      });
    }
  },
  mounted: function mounted() {
    var app = this;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/config/cycles/" + this.$route.params.cycle).then(function (response) {
      app.cycle = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b& ***!
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
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("invoices-this-month-kpi", {
                        staticClass: "d-none d-xl-block"
                      }),
                      _vm._v(" "),
                      _c(
                        "b-card",
                        { attrs: { "no-body": "" } },
                        [
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("i", { staticClass: "material-icons" }, [
                              _vm._v("help")
                            ]),
                            _vm._v(
                              "\n            " +
                                _vm._s(_vm.$t("general.manual")) +
                                "\n          "
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            {
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  return _vm.GenerateJournal()
                                }
                              }
                            },
                            [
                              _c("i", { staticClass: "material-icons" }, [
                                _vm._v("autorenew")
                              ]),
                              _vm._v(
                                "\n            " +
                                  _vm._s(_vm.$t("accounting.generateJournal")) +
                                  "\n          "
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
                                "\n            " +
                                  _vm._s(_vm.$t("general.createNewRecord")) +
                                  "\n          "
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
                              "div",
                              [
                                _c(
                                  "b-button-group",
                                  { staticClass: "mx-1" },
                                  [
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function($event) {
                                            return _vm.refresh(
                                              _vm.items.links.first
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("«")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function($event) {
                                            return _vm.refresh(
                                              _vm.items.links.prev
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("‹")]
                                    ),
                                    _vm._v(" "),
                                    _vm._l(_vm.$route.meta.actions, function(
                                      action
                                    ) {
                                      return _c(
                                        "b-button",
                                        {
                                          key: action.index,
                                          attrs: { href: action.url }
                                        },
                                        [_vm._v(_vm._s(_vm.$t(action.label)))]
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "b-input-group",
                                      [
                                        _c("b-form-input", {
                                          attrs: {
                                            placeholder: "Type to Search"
                                          },
                                          model: {
                                            value: _vm.$parent.filter,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.$parent,
                                                "filter",
                                                $$v
                                              )
                                            },
                                            expression: "$parent.filter"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "b-input-group-append",
                                          [
                                            _c(
                                              "b-button",
                                              {
                                                on: {
                                                  click: function($event) {
                                                    return _vm.refresh(
                                                      _vm.items.meta.path +
                                                        "?page=" +
                                                        _vm.items.meta
                                                          .current_page +
                                                        " & filter[partner_name]=" +
                                                        _vm.$parent.filter +
                                                        " & filter[partner_taxid]=" +
                                                        _vm.$parent.filter +
                                                        " & filter[number]=" +
                                                        _vm.$parent.filter
                                                    )
                                                  }
                                                }
                                              },
                                              [_vm._v("Filter")]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function($event) {
                                            return _vm.refresh(
                                              _vm.items.links.next
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("›")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "b-button",
                                      {
                                        on: {
                                          click: function($event) {
                                            return _vm.refresh(
                                              _vm.items.links.last
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("»")]
                                    )
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c(
                                  "b-card",
                                  { attrs: { "no-body": "" } },
                                  [
                                    _c(
                                      "b-table",
                                      {
                                        attrs: {
                                          hover: "",
                                          responsive: "",
                                          items: _vm.items.data,
                                          fields: _vm.columns,
                                          "current-page": _vm.current_page
                                        },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "date",
                                              fn: function(data) {
                                                return [
                                                  _vm._v(
                                                    _vm._s(
                                                      new Date(
                                                        data.item.date
                                                      ).toLocaleDateString()
                                                    )
                                                  )
                                                ]
                                              }
                                            },
                                            {
                                              key: "total",
                                              fn: function(data) {
                                                return [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "float-right"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                    " +
                                                          _vm._s(
                                                            new Number(
                                                              _vm.sum(
                                                                data.item
                                                                  .details,
                                                                "debit"
                                                              )
                                                            ).toLocaleString()
                                                          ) +
                                                          "\n                    "
                                                      ),
                                                      data.item.currency != null
                                                        ? _c(
                                                            "small",
                                                            {
                                                              staticClass:
                                                                "text-success text-uppercase"
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  data.item
                                                                    .currency
                                                                    .code
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        : _vm._e()
                                                    ]
                                                  )
                                                ]
                                              }
                                            },
                                            {
                                              key: "row-details",
                                              fn: function(row) {
                                                return [
                                                  _c(
                                                    "b-row",
                                                    [
                                                      _c(
                                                        "b-col",
                                                        {
                                                          attrs: {
                                                            cols: "8",
                                                            colspan: "2"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "text-muted"
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "accounting.chartOfAccounts"
                                                                  )
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "b-col",
                                                        {
                                                          staticClass:
                                                            "text-sm-right",
                                                          attrs: { cols: "2" }
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "text-muted"
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "general.credit"
                                                                  )
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "b-col",
                                                        {
                                                          staticClass:
                                                            "text-sm-right",
                                                          attrs: { cols: "2" }
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "text-muted"
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.$t(
                                                                    "general.debit"
                                                                  )
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      )
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _vm._l(
                                                    row.item.details,
                                                    function(detail) {
                                                      return _c(
                                                        "b-row",
                                                        { key: detail.key },
                                                        [
                                                          _c(
                                                            "b-col",
                                                            {
                                                              attrs: {
                                                                cols: "2"
                                                              }
                                                            },
                                                            [
                                                              _c("b", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    detail.chart
                                                                      .code
                                                                  )
                                                                )
                                                              ])
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "b-col",
                                                            {
                                                              attrs: {
                                                                cols: "6"
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "chart-types",
                                                                {
                                                                  attrs: {
                                                                    chart:
                                                                      detail
                                                                        .chart
                                                                        .name,
                                                                    type:
                                                                      detail
                                                                        .chart
                                                                        .type,
                                                                    sub_type:
                                                                      detail
                                                                        .chart
                                                                        .sub_type
                                                                  }
                                                                }
                                                              )
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "b-col",
                                                            {
                                                              staticClass:
                                                                "text-sm-right",
                                                              attrs: {
                                                                cols: "2"
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  new Number(
                                                                    detail.credit
                                                                  ).toLocaleString()
                                                                )
                                                              )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "b-col",
                                                            {
                                                              staticClass:
                                                                "text-sm-right",
                                                              attrs: {
                                                                cols: "2"
                                                              }
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  new Number(
                                                                    detail.debit
                                                                  ).toLocaleString()
                                                                )
                                                              )
                                                            ]
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    }
                                                  )
                                                ]
                                              }
                                            },
                                            {
                                              key: "hasDetails",
                                              fn: function(row) {
                                                return [
                                                  _c(
                                                    "b-button-group",
                                                    {
                                                      staticClass:
                                                        "show-when-hovered",
                                                      attrs: { size: "sm" }
                                                    },
                                                    [
                                                      _c(
                                                        "b-button",
                                                        {
                                                          on: {
                                                            click:
                                                              row.toggleDetails
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "i",
                                                            {
                                                              staticClass:
                                                                "material-icons md-19"
                                                            },
                                                            [
                                                              _vm._v(
                                                                "remove_red_eye"
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            },
                                            {
                                              key: "actions",
                                              fn: function(data) {
                                                return [
                                                  _c("table-actions", {
                                                    attrs: { row: data.item }
                                                  })
                                                ]
                                              }
                                            },
                                            {
                                              key: "empty",
                                              fn: function(scope) {
                                                return [_c("table-empty")]
                                              }
                                            }
                                          ],
                                          null,
                                          false,
                                          2441271036
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _vm._v(" "),
                                        _vm._v(" "),
                                        _vm._v(" "),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            attrs: { slot: "table-busy" },
                                            slot: "table-busy"
                                          },
                                          [_c("table-loading")],
                                          1
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
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

/***/ "./resources/js/views/accounts/journalList.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/accounts/journalList.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./journalList.vue?vue&type=template&id=2e26d74b& */ "./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b&");
/* harmony import */ var _journalList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./journalList.vue?vue&type=script&lang=js& */ "./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _journalList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/accounts/journalList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./journalList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/journalList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_journalList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./journalList.vue?vue&type=template&id=2e26d74b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/accounts/journalList.vue?vue&type=template&id=2e26d74b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_journalList_vue_vue_type_template_id_2e26d74b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);