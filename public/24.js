(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        code: '',
        code_expiry: '',
        comment: '',
        currency_id: 0,
        customer_id: 0,
        customer: [],
        date: '',
        details: [{
          id: 0
        }],
        document_id: '',
        document_type: 1,
        id: 0,
        is_deductible: 0,
        journal_id: null,
        number: '',
        payment_condition: 0,
        rate: 1,
        type: 4
      },
      pageUrl: '/commercial/sales',
      documents: [],
      currencies: [],
      accountCharts: [],
      vatCharts: [],
      itemCharts: [],
      lastDeletedRow: []
    };
  },
  computed: {
    columns: function columns() {
      return [{
        key: 'chart_id',
        label: this.$i18n.t('commercial.item'),
        sortable: true
      }, {
        key: 'chart_vat_id',
        label: this.$i18n.t('commercial.vat'),
        sortable: true
      }, {
        key: 'value',
        label: this.$i18n.t('commercial.value'),
        sortable: true
      }, {
        key: 'actions',
        label: '',
        sortable: false
      }];
    },
    baseUrl: function baseUrl() {
      return '/api/' + this.$route.params.taxPayer + '/' + this.$route.params.cycle;
    }
  },
  methods: {
    onSave: function onSave() {
      var app = this;
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl, app.data).then(function (response) {
        app.$snack.success({
          text: this.$i18n.t('commercial.invoiceSaved', app.data.number)
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
          text: this.$i18n.t('commercial.invoiceSaved', app.data.number)
        });
        app.$router.push({
          name: app.$route.name,
          params: {
            id: '0'
          }
        });
        app.data.customer_id = 0;
        app.data.customer = [];
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
    },
    addDetailRow: function addDetailRow() {
      this.data.details.push({
        // index: this.data.details.length + 1,
        chart_id: this.itemCharts[0].id,
        chart_vat_id: this.vatCharts[0].id,
        value: '0'
      });
    },
    deleteRow: function deleteRow(item) {
      if (item.id > 0) {
        var app = this;
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onDelete(app.baseUrl + app.pageUrl + '/details', item.id).then(function (response) {});
      }

      this.lastDeletedRow = item;
      this.$snack.success({
        text: this.$i18n.t('general.rowDeleted'),
        button: this.$i18n.t('general.undo'),
        action: this.undoDeletedRow
      });
      this.data.details.splice(this.data.details.indexOf(item), 1);
    },
    undoDeletedRow: function undoDeletedRow() {
      if (this.lastDeletedRow.id > 0) {
        _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onUpdate(app.baseUrl + app.pageUrl + '/details', this.lastDeletedRow).then(function (response) {}); //axios code to insert detail again??? or let save do it.
      }

      this.data.details.push(this.lastDeletedRow);
    }
  },
  mounted: function mounted() {
    var app = this;
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead('/api/' + app.$route.params.taxPayer + '/currencies').then(function (response) {
      app.currencies = response.data.data;
    });

    if (app.$route.params.id > 0) {
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.pageUrl + '/' + app.$route.params.id).then(function (response) {
        app.data = response.data.data;
      });
    } else {
      app.data.date = new Date(Date.now()).toISOString().split("T")[0];
      app.data.chart_account_id = app.accountCharts[0] != null ? app.accountCharts[0].id : null;
      app.data.payment_condition = 0;
      app.data.currency_id = 1;
      app.data.rate = 1;
    }

    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/money/").then(function (response) {
      app.accountCharts = response.data.data;
    });
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/vats-debit").then(function (response) {
      app.vatCharts = response.data.data;
    });
    _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + "/accounting/charts/for/income").then(function (response) {
      app.itemCharts = response.data.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95& ***!
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
                        "\n                    " +
                          _vm._s(_vm.$t("general.addRowDetail")) +
                          "\n                "
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
                                  attrs: {
                                    label: _vm.$t("commercial.customer")
                                  }
                                },
                                [
                                  _c("search-taxpayer", {
                                    model: {
                                      value: _vm.data.customer,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "customer", $$v)
                                      },
                                      expression: "data.customer"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm.data.customer != null
                                ? _c(
                                    "b-container",
                                    [
                                      _vm._v(
                                        "\n                                Based on your past transactions, we can quickly recomend the same items again.\n                                "
                                      ),
                                      _c(
                                        "b-row",
                                        [
                                          _c(
                                            "b-col",
                                            [
                                              _c(
                                                "b-button",
                                                { attrs: { href: "" } },
                                                [
                                                  _vm._v(
                                                    "\n                                            Favorite Detail 1\n                                        "
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "b-button",
                                                { attrs: { href: "" } },
                                                [
                                                  _vm._v(
                                                    "\n                                            Favorite Detail 2\n                                        "
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
                                : _vm._e()
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "b-col",
                            [
                              _vm.documents.length > 0
                                ? _c(
                                    "b-form-group",
                                    {
                                      attrs: {
                                        label: _vm.$t("commercial.document")
                                      }
                                    },
                                    [
                                      _c(
                                        "b-form-select",
                                        {
                                          model: {
                                            value: _vm.data.document_id,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.data,
                                                "document_id",
                                                $$v
                                              )
                                            },
                                            expression: "data.document_id"
                                          }
                                        },
                                        _vm._l(_vm.documents, function(doc) {
                                          return _c(
                                            "option",
                                            {
                                              key: doc.key,
                                              domProps: { value: doc.id }
                                            },
                                            [_vm._v(_vm._s(doc.name))]
                                          )
                                        }),
                                        0
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.spark.taxPayerConfig.document_code != ""
                                ? _c(
                                    "b-form-group",
                                    {
                                      attrs: {
                                        label:
                                          _vm.spark.taxPayerConfig.document_code
                                      }
                                    },
                                    [
                                      _c(
                                        "b-input-group",
                                        [
                                          _c("b-input", {
                                            attrs: {
                                              type: "text",
                                              placeholder: _vm.$t(
                                                "commercial.code"
                                              )
                                            },
                                            model: {
                                              value: _vm.data.code,
                                              callback: function($$v) {
                                                _vm.$set(_vm.data, "code", $$v)
                                              },
                                              expression: "data.code"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "b-input-group-append",
                                            [
                                              _c("b-input", {
                                                attrs: {
                                                  type: "date",
                                                  placeholder: _vm.$t(
                                                    "commercial.expiryDate"
                                                  )
                                                },
                                                model: {
                                                  value: _vm.data.code_expiry,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.data,
                                                      "code_expiry",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "data.code_expiry"
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
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: { label: _vm.$t("commercial.number") }
                                },
                                [
                                  _c("b-input", {
                                    directives: [
                                      {
                                        name: "mask",
                                        rawName: "v-mask",
                                        value:
                                          _vm.spark.taxPayerConfig
                                            .document_mask,
                                        expression:
                                          "spark.taxPayerConfig.document_mask"
                                      }
                                    ],
                                    attrs: {
                                      type: "text",
                                      placeholder: "Invoice Number"
                                    },
                                    model: {
                                      value: _vm.data.number,
                                      callback: function($$v) {
                                        _vm.$set(_vm.data, "number", $$v)
                                      },
                                      expression: "data.number"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "b-form-group",
                                {
                                  attrs: {
                                    label: _vm.$t("commercial.paymentCondition")
                                  }
                                },
                                [
                                  _c(
                                    "b-input-group",
                                    [
                                      _c("b-input", {
                                        attrs: {
                                          type: "number",
                                          placeholder: _vm.$t(
                                            "commercial.paymentCondition"
                                          ),
                                          value: _vm.data.payment_condition.toString()
                                        }
                                      }),
                                      _vm._v(" "),
                                      _vm.data.payment_condition == 0
                                        ? _c(
                                            "b-input-group-append",
                                            [
                                              _c(
                                                "b-form-select",
                                                {
                                                  model: {
                                                    value:
                                                      _vm.data.chart_account_id,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.data,
                                                        "chart_account_id",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "data.chart_account_id"
                                                  }
                                                },
                                                _vm._l(
                                                  _vm.accountCharts,
                                                  function(account) {
                                                    return _c(
                                                      "option",
                                                      {
                                                        key: account.key,
                                                        domProps: {
                                                          value: account.id
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(account.name)
                                                        )
                                                      ]
                                                    )
                                                  }
                                                ),
                                                0
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("b-form-text", [
                                    _vm._v(
                                      "Specify days between invoice and payment dates. Ex: use 0 for cash, and 30 for thrity days payment terms."
                                    )
                                  ])
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
                                      ),
                                      _vm._v(" "),
                                      _c("b-input", {
                                        attrs: {
                                          type: "number",
                                          placeholder: _vm.$t(
                                            "commercial.payment"
                                          ),
                                          value: _vm.data.rate.toString()
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
                { attrs: { "no-body": "" } },
                [
                  _c("b-table", {
                    attrs: {
                      hover: "",
                      items: _vm.data.details,
                      fields: _vm.columns
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "chart_id",
                        fn: function(data) {
                          return [
                            _c(
                              "b-form-select",
                              {
                                model: {
                                  value: data.item.chart_id,
                                  callback: function($$v) {
                                    _vm.$set(data.item, "chart_id", $$v)
                                  },
                                  expression: "data.item.chart_id"
                                }
                              },
                              _vm._l(_vm.itemCharts, function(item) {
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
                          ]
                        }
                      },
                      {
                        key: "chart_vat_id",
                        fn: function(data) {
                          return [
                            _c(
                              "b-form-select",
                              {
                                model: {
                                  value: data.item.chart_vat_id,
                                  callback: function($$v) {
                                    _vm.$set(data.item, "chart_vat_id", $$v)
                                  },
                                  expression: "data.item.chart_vat_id"
                                }
                              },
                              _vm._l(_vm.vatCharts, function(vat) {
                                return _c(
                                  "option",
                                  { key: vat.key, domProps: { value: vat.id } },
                                  [_vm._v(_vm._s(vat.name))]
                                )
                              }),
                              0
                            )
                          ]
                        }
                      },
                      {
                        key: "value",
                        fn: function(data) {
                          return [
                            _c("b-form-input", {
                              attrs: {
                                value: new Number(
                                  data.item.value
                                ).toLocaleString(),
                                type: "text",
                                placeholder: "Value"
                              }
                            })
                          ]
                        }
                      },
                      {
                        key: "actions",
                        fn: function(data) {
                          return [
                            _c(
                              "b-button",
                              {
                                attrs: { variant: "link" },
                                on: {
                                  click: function($event) {
                                    return _vm.deleteRow(data.item)
                                  }
                                }
                              },
                              [
                                _c(
                                  "i",
                                  { staticClass: "material-icons text-danger" },
                                  [_vm._v("delete_outline")]
                                )
                              ]
                            )
                          ]
                        }
                      }
                    ])
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/commercials/paymentForm.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/commercials/paymentForm.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paymentForm.vue?vue&type=template&id=2b090d95& */ "./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95&");
/* harmony import */ var _paymentForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paymentForm.vue?vue&type=script&lang=js& */ "./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _paymentForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__["render"],
  _paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/commercials/paymentForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_paymentForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./paymentForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/paymentForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_paymentForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./paymentForm.vue?vue&type=template&id=2b090d95& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/paymentForm.vue?vue&type=template&id=2b090d95&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_paymentForm_vue_vue_type_template_id_2b090d95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);