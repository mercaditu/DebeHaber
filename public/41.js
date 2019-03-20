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

    if (app.$route.params.id > 0) {
      _components_crud_vue__WEBPACK_IMPORTED_MODULE_0__["default"].methods.onRead(app.baseUrl + app.$route.meta.pageurl + "/" + app.$route.params.id).then(function (response) {
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
                          [
                            col.type === "customer" || col.type === "supplier"
                              ? _c(
                                  "div",
                                  [
                                    _c("search-taxpayer", {
                                      attrs: {
                                        partner_name:
                                          _vm.data[col.property[0]["name"]],
                                        partner_taxid:
                                          _vm.data[col.property[0]["taxid"]]
                                      },
                                      on: {
                                        "update:partner_name": function(
                                          $event
                                        ) {
                                          return _vm.$set(
                                            _vm.data,
                                            col.property[0]["name"],
                                            $event
                                          )
                                        },
                                        "update:partner_taxid": function(
                                          $event
                                        ) {
                                          return _vm.$set(
                                            _vm.data,
                                            col.property[0]["taxid"],
                                            $event
                                          )
                                        }
                                      }
                                    })
                                  ],
                                  1
                                )
                              : col.type === "select"
                              ? _c(
                                  "div",
                                  [
                                    _c("select-data", {
                                      attrs: {
                                        Id: _vm.data[col.property],
                                        api: col.api
                                      },
                                      on: {
                                        "update:Id": function($event) {
                                          return _vm.$set(
                                            _vm.data,
                                            col.property,
                                            $event
                                          )
                                        },
                                        "update:id": function($event) {
                                          return _vm.$set(
                                            _vm.data,
                                            col.property,
                                            $event
                                          )
                                        }
                                      }
                                    })
                                  ],
                                  1
                                )
                              : _c(
                                  "div",
                                  [
                                    _c("b-form-input", {
                                      attrs: {
                                        type: col.type,
                                        required: col.required,
                                        placeholder: col.placeholder
                                      },
                                      model: {
                                        value: _vm.data[col.property],
                                        callback: function($$v) {
                                          _vm.$set(_vm.data, col.property, $$v)
                                        },
                                        expression: "data[col.property]"
                                      }
                                    })
                                  ],
                                  1
                                )
                          ]
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
      _c(
        "div",
        [
          _c(
            "b-card",
            { attrs: { "no-body": "" } },
            _vm._l(_vm.$route.meta.tables, function(table) {
              return _c(
                "div",
                { key: table.index },
                [
                  _c("b-table", {
                    attrs: {
                      hover: "",
                      items: _vm.data["details"],
                      fields: table.cols
                    },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: _vm.column.property,
                          fn: function(data) {
                            return _vm.column.type === "select"
                              ? [
                                  _c("select-data", {
                                    attrs: {
                                      Id: data[_vm.column.property],
                                      api: _vm.column.api
                                    },
                                    on: {
                                      "update:Id": function($event) {
                                        return _vm.$set(
                                          data,
                                          _vm.column.property,
                                          $event
                                        )
                                      },
                                      "update:id": function($event) {
                                        return _vm.$set(
                                          data,
                                          _vm.column.property,
                                          $event
                                        )
                                      }
                                    }
                                  })
                                ]
                              : undefined
                          }
                        }
                      ],
                      null,
                      true
                    )
                  })
                ],
                1
              )
            }),
            0
          )
        ],
        1
      )
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