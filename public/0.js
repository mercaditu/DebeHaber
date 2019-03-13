(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "",
  data: function data() {
    return {};
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  return _vm.$route.name == "commercialMenu"
    ? _c(
        "b-container",
        [
          _c("vue-topprogress", { ref: "topProgress" }),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                [
                  _c(
                    "b-card",
                    {
                      attrs: {
                        "no-body": "",
                        header: "Expenses",
                        "header-tag": "header"
                      }
                    },
                    [
                      _c(
                        "b-list-group",
                        { attrs: { flush: "" } },
                        [
                          _c(
                            "b-list-group-item",
                            { attrs: { href: "#" } },
                            [
                              _c(
                                "b-row",
                                [
                                  _c("b-col", [
                                    _c("img", {
                                      attrs: {
                                        src: "/img/icons/purchase.svg",
                                        width: "32",
                                        alt: ""
                                      }
                                    }),
                                    _vm._v(
                                      "\n                Purchase Book\n              "
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("b-col")
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("div")
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", {}, [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/credit-note.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v(
                                "\n              Debit Notes\n            "
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/account-payable.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v(
                                "\n              Accounts Payables\n            "
                              )
                            ])
                          ])
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
                "b-col",
                [
                  _c(
                    "b-card",
                    {
                      attrs: {
                        "no-body": "",
                        header: "Revenue",
                        "header-tag": "header"
                      }
                    },
                    [
                      _c(
                        "b-list-group",
                        { attrs: { flush: "" } },
                        [
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/sales.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v("\n              Sales Book\n            ")
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            { attrs: { href: "#" } },
                            [
                              _c(
                                "router-link",
                                { attrs: { to: { name: "creditList" } } },
                                [
                                  _c("img", {
                                    attrs: {
                                      src: "/img/icons/credit-note.svg",
                                      width: "32",
                                      alt: ""
                                    }
                                  }),
                                  _vm._v(
                                    "\n              Credit Notes\n            "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/account-receivable.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v(
                                "\n              Accounts Receivables\n            "
                              )
                            ])
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
                    {
                      attrs: {
                        title: "Configuration",
                        "sub-title": "Configuration"
                      }
                    },
                    [
                      _c(
                        "b-list-group",
                        [
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/sales.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v("\n              Sales Book\n            ")
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-list-group-item",
                            { attrs: { href: "#" } },
                            [
                              _c(
                                "router-link",
                                { attrs: { to: { name: "creditList" } } },
                                [
                                  _c("img", {
                                    attrs: {
                                      src: "/img/icons/credit-note.svg",
                                      width: "32",
                                      alt: ""
                                    }
                                  }),
                                  _vm._v(
                                    "\n              Credit Notes\n            "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("b-list-group-item", { attrs: { href: "#" } }, [
                            _c("div", [
                              _c("img", {
                                attrs: {
                                  src: "/img/icons/account-receivable.svg",
                                  width: "32",
                                  alt: ""
                                }
                              }),
                              _vm._v(
                                "\n              Accounts Receivables\n            "
                              )
                            ])
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
            ],
            1
          )
        ],
        1
      )
    : _c("router-view")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/commercials/index.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/commercials/index.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=3bfe8cbd& */ "./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/views/commercials/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/commercials/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/commercials/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/commercials/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=3bfe8cbd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/commercials/index.vue?vue&type=template&id=3bfe8cbd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_3bfe8cbd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);