// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@lit/reactive-element/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCSS = exports.supportsAdoptingStyleSheets = exports.getCompatibleStyle = exports.css = exports.adoptStyles = exports.CSSResult = void 0;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      e = Symbol(),
      n = new WeakMap();
exports.supportsAdoptingStyleSheets = t;

class s {
  constructor(t, n, s) {
    if (this._$cssResult$ = !0, s !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }

  get styleSheet() {
    let e = this.o;
    const s = this.t;

    if (t && void 0 === e) {
      const t = void 0 !== s && 1 === s.length;
      t && (e = n.get(s)), void 0 === e && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && n.set(s, e));
    }

    return e;
  }

  toString() {
    return this.cssText;
  }

}

exports.CSSResult = s;

const o = t => new s("string" == typeof t ? t : t + "", void 0, e),
      r = (t, ...n) => {
  const o = 1 === t.length ? t[0] : n.reduce((e, n, s) => e + (t => {
    if (!0 === t._$cssResult$) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new s(o, t, e);
},
      i = (e, n) => {
  t ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
    const n = document.createElement("style"),
          s = window.litNonce;
    void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
  });
},
      S = t ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  let e = "";

  for (const n of t.cssRules) e += n.cssText;

  return o(e);
})(t) : t;

exports.getCompatibleStyle = S;
exports.adoptStyles = i;
exports.css = r;
exports.unsafeCSS = o;
},{}],"node_modules/@lit/reactive-element/reactive-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSResult", {
  enumerable: true,
  get: function () {
    return _cssTag.CSSResult;
  }
});
exports.ReactiveElement = void 0;
Object.defineProperty(exports, "adoptStyles", {
  enumerable: true,
  get: function () {
    return _cssTag.adoptStyles;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _cssTag.css;
  }
});
exports.defaultConverter = void 0;
Object.defineProperty(exports, "getCompatibleStyle", {
  enumerable: true,
  get: function () {
    return _cssTag.getCompatibleStyle;
  }
});
exports.notEqual = void 0;
Object.defineProperty(exports, "supportsAdoptingStyleSheets", {
  enumerable: true,
  get: function () {
    return _cssTag.supportsAdoptingStyleSheets;
  }
});
Object.defineProperty(exports, "unsafeCSS", {
  enumerable: true,
  get: function () {
    return _cssTag.unsafeCSS;
  }
});

var _cssTag = require("./css-tag.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s;

const e = window.trustedTypes,
      r = e ? e.emptyScript : "",
      h = window.reactiveElementPolyfillSupport,
      o = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? r : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    let s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
      n = (t, i) => i !== t && (i == i || t == t),
      l = {
  attribute: !0,
  type: String,
  converter: o,
  reflect: !1,
  hasChanged: n
};

exports.notEqual = n;
exports.defaultConverter = o;

class a extends HTMLElement {
  constructor() {
    super(), this._$Ei = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.h) && void 0 !== i || (this.h = []), this.h.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Ep(s, i);

      void 0 !== e && (this._$Ev.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t, i = l) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
            e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
            i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

      for (const s of i) this.createProperty(s, t[s]);
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    const s = [];

    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());

      for (const i of e) s.unshift((0, _cssTag.getCompatibleStyle)(i));
    } else void 0 !== i && s.push((0, _cssTag.getCompatibleStyle)(i));

    return s;
  }

  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  u() {
    var t;
    this._$E_ = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Eg(), this.requestUpdate(), null === (t = this.constructor.h) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }

  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, _cssTag.adoptStyles)(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this._$ES) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }

  _$EO(t, i, s = l) {
    var e, r;

    const h = this.constructor._$Ep(t, s);

    if (void 0 !== h && !0 === s.reflect) {
      const n = (null !== (r = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== r ? r : o.toAttribute)(i, s.type);
      this._$El = t, null == n ? this.removeAttribute(h) : this.setAttribute(h, n), this._$El = null;
    }
  }

  _$AK(t, i) {
    var s, e;

    const r = this.constructor,
          h = r._$Ev.get(t);

    if (void 0 !== h && this._$El !== h) {
      const t = r.getPropertyOptions(h),
            n = t.converter,
            l = null !== (e = null !== (s = null == n ? void 0 : n.fromAttribute) && void 0 !== s ? s : "function" == typeof n ? n : null) && void 0 !== e ? e : o.fromAttribute;
      this._$El = h, this[h] = l(i, t.type), this._$El = null;
    }
  }

  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }

  async _$Ej() {
    this.isUpdatePending = !0;

    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }

    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }

  scheduleUpdate() {
    return this.performUpdate();
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => this[i] = t), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$ES) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$Ek();
    } catch (t) {
      throw i = !1, this._$Ek(), t;
    }

    i && this._$AE(s);
  }

  willUpdate(t) {}

  _$AE(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  _$Ek() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this._$E_;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }

  updated(t) {}

  firstUpdated(t) {}

}

exports.ReactiveElement = a;
a.finalized = !0, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
  mode: "open"
}, null == h || h({
  ReactiveElement: a
}), (null !== (s = globalThis.reactiveElementVersions) && void 0 !== s ? s : globalThis.reactiveElementVersions = []).push("1.3.4");
},{"./css-tag.js":"node_modules/@lit/reactive-element/css-tag.js"}],"node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.render = exports.nothing = exports.noChange = exports.html = exports._$LH = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;

const i = globalThis.trustedTypes,
      s = i ? i.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
      e = `lit$${(Math.random() + "").slice(9)}$`,
      o = "?" + e,
      n = `<${o}>`,
      l = document,
      h = (t = "") => l.createComment(t),
      r = t => null === t || "object" != typeof t && "function" != typeof t,
      d = Array.isArray,
      u = t => d(t) || "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
      c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      v = /-->/g,
      a = />/g,
      f = RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)", "g"),
      _ = /'/g,
      g = /"/g,
      m = /^(?:script|style|textarea|title)$/i,
      p = t => (i, ...s) => ({
  _$litType$: t,
  strings: i,
  values: s
}),
      $ = p(1),
      y = p(2),
      b = Symbol.for("lit-noChange"),
      w = Symbol.for("lit-nothing"),
      x = new WeakMap(),
      T = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;

  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new N(i.insertBefore(h(), t), t, void 0, null != s ? s : {});
  }

  return l._$AI(t), l;
},
      A = l.createTreeWalker(l, 129, null, !1),
      E = (t, i) => {
  const o = t.length - 1,
        l = [];
  let h,
      r = 2 === i ? "<svg>" : "",
      d = c;

  for (let i = 0; i < o; i++) {
    const s = t[i];
    let o,
        u,
        p = -1,
        $ = 0;

    for (; $ < s.length && (d.lastIndex = $, u = d.exec(s), null !== u);) $ = d.lastIndex, d === c ? "!--" === u[1] ? d = v : void 0 !== u[1] ? d = a : void 0 !== u[2] ? (m.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = f) : void 0 !== u[3] && (d = f) : d === f ? ">" === u[0] ? (d = null != h ? h : c, p = -1) : void 0 === u[1] ? p = -2 : (p = d.lastIndex - u[2].length, o = u[1], d = void 0 === u[3] ? f : '"' === u[3] ? g : _) : d === g || d === _ ? d = f : d === v || d === a ? d = c : (d = f, h = void 0);

    const y = d === f && t[i + 1].startsWith("/>") ? " " : "";
    r += d === c ? s + n : p >= 0 ? (l.push(o), s.slice(0, p) + "$lit$" + s.slice(p) + e + y) : s + e + (-2 === p ? (l.push(void 0), i) : y);
  }

  const u = r + (t[o] || "<?>") + (2 === i ? "</svg>" : "");
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return [void 0 !== s ? s.createHTML(u) : u, l];
};

exports.render = T;
exports.nothing = w;
exports.noChange = b;
exports.svg = y;
exports.html = $;

class C {
  constructor({
    strings: t,
    _$litType$: s
  }, n) {
    let l;
    this.parts = [];
    let r = 0,
        d = 0;
    const u = t.length - 1,
          c = this.parts,
          [v, a] = E(t, s);

    if (this.el = C.createElement(v, n), A.currentNode = this.el.content, 2 === s) {
      const t = this.el.content,
            i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }

    for (; null !== (l = A.nextNode()) && c.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];

          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(e)) {
            const s = a[d++];

            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(e),
                    i = /([.?@])?(.*)/.exec(s);
              c.push({
                type: 1,
                index: r,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? M : "?" === i[1] ? k : "@" === i[1] ? H : S
              });
            } else c.push({
              type: 6,
              index: r
            });
          }

          for (const i of t) l.removeAttribute(i);
        }

        if (m.test(l.tagName)) {
          const t = l.textContent.split(e),
                s = t.length - 1;

          if (s > 0) {
            l.textContent = i ? i.emptyScript : "";

            for (let i = 0; i < s; i++) l.append(t[i], h()), A.nextNode(), c.push({
              type: 2,
              index: ++r
            });

            l.append(t[s], h());
          }
        }
      } else if (8 === l.nodeType) if (l.data === o) c.push({
        type: 2,
        index: r
      });else {
        let t = -1;

        for (; -1 !== (t = l.data.indexOf(e, t + 1));) c.push({
          type: 7,
          index: r
        }), t += e.length - 1;
      }

      r++;
    }
  }

  static createElement(t, i) {
    const s = l.createElement("template");
    return s.innerHTML = t, s;
  }

}

function P(t, i, s = t, e) {
  var o, n, l, h;
  if (i === b) return i;
  let d = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
  const u = r(i) ? void 0 : i._$litDirective$;
  return (null == d ? void 0 : d.constructor) !== u && (null === (n = null == d ? void 0 : d._$AO) || void 0 === n || n.call(d, !1), void 0 === u ? d = void 0 : (d = new u(t), d._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = d : s._$Cu = d), void 0 !== d && (i = P(t, d._$AS(t, i.values), d, e)), i;
}

class V {
  constructor(t, i) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }

  get parentNode() {
    return this._$AM.parentNode;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  p(t) {
    var i;
    const {
      el: {
        content: s
      },
      parts: e
    } = this._$AD,
          o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : l).importNode(s, !0);
    A.currentNode = o;
    let n = A.nextNode(),
        h = 0,
        r = 0,
        d = e[0];

    for (; void 0 !== d;) {
      if (h === d.index) {
        let i;
        2 === d.type ? i = new N(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new I(n, this, t)), this.v.push(i), d = e[++r];
      }

      h !== (null == d ? void 0 : d.index) && (n = A.nextNode(), h++);
    }

    return o;
  }

  m(t) {
    let i = 0;

    for (const s of this.v) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }

}

class N {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$C_ = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }

  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$C_;
  }

  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }

  get startNode() {
    return this._$AA;
  }

  get endNode() {
    return this._$AB;
  }

  _$AI(t, i = this) {
    t = P(this, t, i), r(t) ? t === w || null == t || "" === t ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== b && this.T(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.k(t) : u(t) ? this.S(t) : this.T(t);
  }

  j(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }

  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.j(t));
  }

  T(t) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t : this.k(l.createTextNode(t)), this._$AH = t;
  }

  $(t) {
    var i;
    const {
      values: s,
      _$litType$: e
    } = t,
          o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = C.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
      const t = new V(o, this),
            i = t.p(this.options);
      t.m(s), this.k(i), this._$AH = t;
    }
  }

  _$AC(t) {
    let i = x.get(t.strings);
    return void 0 === i && x.set(t.strings, i = new C(t)), i;
  }

  S(t) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
        e = 0;

    for (const o of t) e === i.length ? i.push(s = new N(this.j(h()), this.j(h()), this, this.options)) : s = i[e], s._$AI(o), e++;

    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }

  _$AR(t = this._$AA.nextSibling, i) {
    var s;

    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }

  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$C_ = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }

}

class S {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = w;
  }

  get tagName() {
    return this.element.tagName;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = P(this, t, i, 0), n = !r(t) || t !== this._$AH && t !== b, n && (this._$AH = t);else {
      const e = t;
      let l, h;

      for (t = o[0], l = 0; l < o.length - 1; l++) h = P(this, e[s + l], i, l), h === b && (h = this._$AH[l]), n || (n = !r(h) || h !== this._$AH[l]), h === w ? t = w : t !== w && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.P(t);
  }

  P(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }

  P(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }

}

const R = i ? i.emptyScript : "";

class k extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }

  P(t) {
    t && t !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }

}

class H extends S {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }

  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = P(this, t, i, 0)) && void 0 !== s ? s : w) === b) return;
    const e = this._$AH,
          o = t === w && e !== w || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
          n = t !== w && (e === w || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }

}

class I {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t) {
    P(this, t);
  }

}

const L = {
  A: "$lit$",
  C: e,
  M: o,
  L: 1,
  R: E,
  V,
  D: u,
  I: P,
  H: N,
  N: S,
  U: k,
  B: H,
  F: M,
  W: I
},
      z = window.litHtmlPolyfillSupport;
exports._$LH = L;
null == z || z(C, N), (null !== (t = globalThis.litHtmlVersions) && void 0 !== t ? t : globalThis.litHtmlVersions = []).push("2.2.7");
},{}],"node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  UpdatingElement: true,
  _$LE: true
};
exports._$LE = exports.UpdatingElement = exports.LitElement = void 0;

var _reactiveElement = require("@lit/reactive-element");

Object.keys(_reactiveElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactiveElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactiveElement[key];
    }
  });
});

var _litHtml = require("lit-html");

Object.keys(_litHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _litHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litHtml[key];
    }
  });
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
const r = _reactiveElement.ReactiveElement;
exports.UpdatingElement = r;

class s extends _reactiveElement.ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }

  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }

  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return _litHtml.noChange;
  }

}

exports.LitElement = s;
s.finalized = !0, s._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: s
});
const n = globalThis.litElementPolyfillSupport;
null == n || n({
  LitElement: s
});
const h = {
  _$AK: (t, e, i) => {
    t._$AK(e, i);
  },
  _$AL: t => t._$AL
};
exports._$LE = h;
(null !== (o = globalThis.litElementVersions) && void 0 !== o ? o : globalThis.litElementVersions = []).push("3.2.2");
},{"@lit/reactive-element":"node_modules/@lit/reactive-element/reactive-element.js","lit-html":"node_modules/lit-html/lit-html.js"}],"node_modules/lit/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("@lit/reactive-element");

require("lit-html");

var _litElement = require("lit-element/lit-element.js");

Object.keys(_litElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _litElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litElement[key];
    }
  });
});
},{"@lit/reactive-element":"node_modules/@lit/reactive-element/reactive-element.js","lit-html":"node_modules/lit-html/lit-html.js","lit-element/lit-element.js":"node_modules/lit-element/lit-element.js"}],"node_modules/haunted/lib/interface.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.current = void 0;
exports.notify = notify;
exports.setCurrent = setCurrent;
let current;
exports.current = current;
let currentId = 0;

function setCurrent(state) {
  exports.current = current = state;
}

function clear() {
  exports.current = current = null;
  currentId = 0;
}

function notify() {
  return currentId++;
}
},{}],"node_modules/haunted/lib/symbols.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSymbol = exports.phaseSymbol = exports.layoutEffectsSymbol = exports.hookSymbol = exports.effectsSymbol = exports.contextEvent = exports.commitSymbol = void 0;
const phaseSymbol = Symbol('haunted.phase');
exports.phaseSymbol = phaseSymbol;
const hookSymbol = Symbol('haunted.hook');
exports.hookSymbol = hookSymbol;
const updateSymbol = Symbol('haunted.update');
exports.updateSymbol = updateSymbol;
const commitSymbol = Symbol('haunted.commit');
exports.commitSymbol = commitSymbol;
const effectsSymbol = Symbol('haunted.effects');
exports.effectsSymbol = effectsSymbol;
const layoutEffectsSymbol = Symbol('haunted.layoutEffects');
exports.layoutEffectsSymbol = layoutEffectsSymbol;
const contextEvent = 'haunted.context';
exports.contextEvent = contextEvent;
},{}],"node_modules/haunted/lib/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = void 0;

var _interface = require("./interface.js");

var _symbols = require("./symbols.js");

class State {
  update;
  host;
  virtual;
  [_symbols.hookSymbol];
  [_symbols.effectsSymbol];
  [_symbols.layoutEffectsSymbol];

  constructor(update, host) {
    this.update = update;
    this.host = host;
    this[_symbols.hookSymbol] = new Map();
    this[_symbols.effectsSymbol] = [];
    this[_symbols.layoutEffectsSymbol] = [];
  }

  run(cb) {
    (0, _interface.setCurrent)(this);
    let res = cb();
    (0, _interface.clear)();
    return res;
  }

  _runEffects(phase) {
    let effects = this[phase];
    (0, _interface.setCurrent)(this);

    for (let effect of effects) {
      effect.call(this);
    }

    (0, _interface.clear)();
  }

  runEffects() {
    this._runEffects(_symbols.effectsSymbol);
  }

  runLayoutEffects() {
    this._runEffects(_symbols.layoutEffectsSymbol);
  }

  teardown() {
    let hooks = this[_symbols.hookSymbol];
    hooks.forEach(hook => {
      if (typeof hook.teardown === 'function') {
        hook.teardown();
      }
    });
  }

}

exports.State = State;
},{"./interface.js":"node_modules/haunted/lib/interface.js","./symbols.js":"node_modules/haunted/lib/symbols.js"}],"node_modules/haunted/lib/scheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseScheduler = void 0;

var _state = require("./state.js");

var _symbols = require("./symbols.js");

const defer = Promise.resolve().then.bind(Promise.resolve());

function runner() {
  let tasks = [];
  let id;

  function runTasks() {
    id = null;
    let t = tasks;
    tasks = [];

    for (var i = 0, len = t.length; i < len; i++) {
      t[i]();
    }
  }

  return function (task) {
    tasks.push(task);

    if (id == null) {
      id = defer(runTasks);
    }
  };
}

const read = runner();
const write = runner();

class BaseScheduler {
  renderer;
  host;
  state;
  [_symbols.phaseSymbol];
  _updateQueued;

  constructor(renderer, host) {
    this.renderer = renderer;
    this.host = host;
    this.state = new _state.State(this.update.bind(this), host);
    this[_symbols.phaseSymbol] = null;
    this._updateQueued = false;
  }

  update() {
    if (this._updateQueued) return;
    read(() => {
      let result = this.handlePhase(_symbols.updateSymbol);
      write(() => {
        this.handlePhase(_symbols.commitSymbol, result);
        write(() => {
          this.handlePhase(_symbols.effectsSymbol);
        });
      });
      this._updateQueued = false;
    });
    this._updateQueued = true;
  }

  handlePhase(phase, arg) {
    this[_symbols.phaseSymbol] = phase;

    switch (phase) {
      case _symbols.commitSymbol:
        this.commit(arg);
        this.runEffects(_symbols.layoutEffectsSymbol);
        return;

      case _symbols.updateSymbol:
        return this.render();

      case _symbols.effectsSymbol:
        return this.runEffects(_symbols.effectsSymbol);
    }
  }

  render() {
    return this.state.run(() => this.renderer.call(this.host, this.host));
  }

  runEffects(phase) {
    this.state._runEffects(phase);
  }

  teardown() {
    this.state.teardown();
  }

}

exports.BaseScheduler = BaseScheduler;
},{"./state.js":"node_modules/haunted/lib/state.js","./symbols.js":"node_modules/haunted/lib/symbols.js"}],"node_modules/haunted/lib/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeComponent = makeComponent;

var _scheduler = require("./scheduler.js");

const toCamelCase = (val = '') => val.replace(/-+([a-z])?/g, (_, char) => char ? char.toUpperCase() : '');

function makeComponent(render) {
  class Scheduler extends _scheduler.BaseScheduler {
    frag;

    constructor(renderer, frag, host) {
      super(renderer, host || frag);
      this.frag = frag;
    }

    commit(result) {
      render(result, this.frag);
    }

  }

  function component(renderer, baseElementOrOptions, options) {
    const BaseElement = (options || baseElementOrOptions || {}).baseElement || HTMLElement;
    const {
      observedAttributes = [],
      useShadowDOM = true,
      shadowRootInit = {}
    } = options || baseElementOrOptions || {};

    class Element extends BaseElement {
      _scheduler;

      static get observedAttributes() {
        return renderer.observedAttributes || observedAttributes || [];
      }

      constructor() {
        super();

        if (useShadowDOM === false) {
          this._scheduler = new Scheduler(renderer, this);
        } else {
          this.attachShadow({
            mode: 'open',
            ...shadowRootInit
          });
          this._scheduler = new Scheduler(renderer, this.shadowRoot, this);
        }
      }

      connectedCallback() {
        this._scheduler.update();
      }

      disconnectedCallback() {
        this._scheduler.teardown();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        }

        let val = newValue === '' ? true : newValue;
        Reflect.set(this, toCamelCase(name), val);
      }

    }

    ;

    function reflectiveProp(initialValue) {
      let value = initialValue;
      let isSetup = false;
      return Object.freeze({
        enumerable: true,
        configurable: true,

        get() {
          return value;
        },

        set(newValue) {
          // Avoid scheduling update when prop value hasn't changed
          if (isSetup && value === newValue) return;
          isSetup = true;
          value = newValue;

          if (this._scheduler) {
            this._scheduler.update();
          }
        }

      });
    }

    const proto = new Proxy(BaseElement.prototype, {
      getPrototypeOf(target) {
        return target;
      },

      set(target, key, value, receiver) {
        let desc;

        if (key in target) {
          desc = Object.getOwnPropertyDescriptor(target, key);

          if (desc && desc.set) {
            desc.set.call(receiver, value);
            return true;
          }

          Reflect.set(target, key, value, receiver);
          return true;
        }

        if (typeof key === 'symbol' || key[0] === '_') {
          desc = {
            enumerable: true,
            configurable: true,
            writable: true,
            value
          };
        } else {
          desc = reflectiveProp(value);
        }

        Object.defineProperty(receiver, key, desc);

        if (desc.set) {
          desc.set.call(receiver, value);
        }

        return true;
      }

    });
    Object.setPrototypeOf(Element.prototype, proto);
    return Element;
  }

  return component;
}
},{"./scheduler.js":"node_modules/haunted/lib/scheduler.js"}],"node_modules/haunted/lib/hook.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hook = void 0;
exports.hook = hook;

var _interface = require("./interface.js");

var _symbols = require("./symbols.js");

class Hook {
  id;
  state;

  constructor(id, state) {
    this.id = id;
    this.state = state;
  }

}

exports.Hook = Hook;

function use(Hook, ...args) {
  let id = (0, _interface.notify)();
  let hooks = _interface.current[_symbols.hookSymbol];
  let hook = hooks.get(id);

  if (!hook) {
    hook = new Hook(id, _interface.current, ...args);
    hooks.set(id, hook);
  }

  return hook.update(...args);
}

function hook(Hook) {
  return use.bind(null, Hook);
}
},{"./interface.js":"node_modules/haunted/lib/interface.js","./symbols.js":"node_modules/haunted/lib/symbols.js"}],"node_modules/haunted/lib/create-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEffect = createEffect;

var _hook = require("./hook.js");

function createEffect(setEffects) {
  return (0, _hook.hook)(class extends _hook.Hook {
    callback;
    lastValues;
    values;
    _teardown;

    constructor(id, state, ignored1, ignored2) {
      super(id, state);
      setEffects(state, this);
    }

    update(callback, values) {
      this.callback = callback;
      this.values = values;
    }

    call() {
      if (!this.values || this.hasChanged()) {
        this.run();
      }

      this.lastValues = this.values;
    }

    run() {
      this.teardown();
      this._teardown = this.callback.call(this.state);
    }

    teardown() {
      if (typeof this._teardown === 'function') {
        this._teardown();
      }
    }

    hasChanged() {
      return !this.lastValues || this.values.some((value, i) => this.lastValues[i] !== value);
    }

  });
}
},{"./hook.js":"node_modules/haunted/lib/hook.js"}],"node_modules/haunted/lib/use-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEffects = setEffects;
exports.useEffect = void 0;

var _symbols = require("./symbols.js");

var _createEffect = require("./create-effect.js");

function setEffects(state, cb) {
  state[_symbols.effectsSymbol].push(cb);
}
/**
 * @function
 * @param {() => void} effect - callback function that runs each time dependencies change
 * @param {unknown[]} [dependencies] - list of dependencies to the effect
 * @return {void}
 */


const useEffect = (0, _createEffect.createEffect)(setEffects);
exports.useEffect = useEffect;
},{"./symbols.js":"node_modules/haunted/lib/symbols.js","./create-effect.js":"node_modules/haunted/lib/create-effect.js"}],"node_modules/haunted/lib/use-context.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContext = void 0;

var _hook = require("./hook.js");

var _symbols = require("./symbols.js");

var _useEffect = require("./use-effect.js");

/**
 * @function
 * @template T
 * @param    {Context<T>} context
 * @return   {T}
 */
const useContext = (0, _hook.hook)(class extends _hook.Hook {
  Context;
  value;
  _ranEffect;
  _unsubscribe;

  constructor(id, state, _) {
    super(id, state);
    this._updater = this._updater.bind(this);
    this._ranEffect = false;
    this._unsubscribe = null;
    (0, _useEffect.setEffects)(state, this);
  }

  update(Context) {
    if (this.state.virtual) {
      throw new Error('can\'t be used with virtual components');
    }

    if (this.Context !== Context) {
      this._subscribe(Context);

      this.Context = Context;
    }

    return this.value;
  }

  call() {
    if (!this._ranEffect) {
      this._ranEffect = true;
      if (this._unsubscribe) this._unsubscribe();

      this._subscribe(this.Context);

      this.state.update();
    }
  }

  _updater(value) {
    this.value = value;
    this.state.update();
  }

  _subscribe(Context) {
    const detail = {
      Context,
      callback: this._updater
    };
    this.state.host.dispatchEvent(new CustomEvent(_symbols.contextEvent, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true // to pass ShadowDOM boundaries

    }));
    const {
      unsubscribe = null,
      value
    } = detail;
    this.value = unsubscribe ? value : Context.defaultValue;
    this._unsubscribe = unsubscribe;
  }

  teardown() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

});
exports.useContext = useContext;
},{"./hook.js":"node_modules/haunted/lib/hook.js","./symbols.js":"node_modules/haunted/lib/symbols.js","./use-effect.js":"node_modules/haunted/lib/use-effect.js"}],"node_modules/haunted/lib/create-context.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeContext = makeContext;

var _symbols = require("./symbols.js");

var _useContext = require("./use-context.js");

function makeContext(component) {
  return defaultValue => {
    const Context = {
      Provider: class extends HTMLElement {
        listeners;
        _value;

        constructor() {
          super();
          this.listeners = new Set();
          this.addEventListener(_symbols.contextEvent, this);
        }

        disconnectedCallback() {
          this.removeEventListener(_symbols.contextEvent, this);
        }

        handleEvent(event) {
          const {
            detail
          } = event;

          if (detail.Context === Context) {
            detail.value = this.value;
            detail.unsubscribe = this.unsubscribe.bind(this, detail.callback);
            this.listeners.add(detail.callback);
            event.stopPropagation();
          }
        }

        unsubscribe(callback) {
          this.listeners.delete(callback);
        }

        set value(value) {
          this._value = value;

          for (let callback of this.listeners) {
            callback(value);
          }
        }

        get value() {
          return this._value;
        }

      },
      Consumer: component(function ({
        render
      }) {
        const context = (0, _useContext.useContext)(Context);
        return render(context);
      }),
      defaultValue
    };
    return Context;
  };
}
},{"./symbols.js":"node_modules/haunted/lib/symbols.js","./use-context.js":"node_modules/haunted/lib/use-context.js"}],"node_modules/haunted/lib/use-memo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMemo = void 0;

var _hook = require("./hook.js");

/**
 * @function
 * @template T
 * @param  {() => T} fn function to memoize
 * @param  {unknown[]} values dependencies to the memoized computation
 * @return {T} The next computed value
 */
const useMemo = (0, _hook.hook)(class extends _hook.Hook {
  value;
  values;

  constructor(id, state, fn, values) {
    super(id, state);
    this.value = fn();
    this.values = values;
  }

  update(fn, values) {
    if (this.hasChanged(values)) {
      this.values = values;
      this.value = fn();
    }

    return this.value;
  }

  hasChanged(values = []) {
    return values.some((value, i) => this.values[i] !== value);
  }

});
exports.useMemo = useMemo;
},{"./hook.js":"node_modules/haunted/lib/hook.js"}],"node_modules/haunted/lib/use-callback.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCallback = void 0;

var _useMemo = require("./use-memo.js");

/**
 * @function
 * @template {Function} T
 * @param    {T} fn - callback to memoize
 * @param    {unknown[]} inputs - dependencies to callback memoization
 * @return   {T}
 */
const useCallback = (fn, inputs) => (0, _useMemo.useMemo)(() => fn, inputs);

exports.useCallback = useCallback;
},{"./use-memo.js":"node_modules/haunted/lib/use-memo.js"}],"node_modules/haunted/lib/use-layout-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLayoutEffect = void 0;

var _symbols = require("./symbols.js");

var _createEffect = require("./create-effect.js");

function setLayoutEffects(state, cb) {
  state[_symbols.layoutEffectsSymbol].push(cb);
}
/**
 * @function
 * @param  {Effect} callback effecting callback
 * @param  {unknown[]} [values] dependencies to the effect
 * @return {void}
 */


const useLayoutEffect = (0, _createEffect.createEffect)(setLayoutEffects);
exports.useLayoutEffect = useLayoutEffect;
},{"./symbols.js":"node_modules/haunted/lib/symbols.js","./create-effect.js":"node_modules/haunted/lib/create-effect.js"}],"node_modules/haunted/lib/use-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useState = void 0;

var _hook = require("./hook.js");

/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
 */
const useState = (0, _hook.hook)(class extends _hook.Hook {
  args;

  constructor(id, state, initialValue) {
    super(id, state);
    this.updater = this.updater.bind(this);

    if (typeof initialValue === 'function') {
      initialValue = initialValue();
    }

    this.makeArgs(initialValue);
  }

  update() {
    return this.args;
  }

  updater(value) {
    if (typeof value === 'function') {
      const updaterFn = value;
      const [previousValue] = this.args;
      value = updaterFn(previousValue);
    }

    this.makeArgs(value);
    this.state.update();
  }

  makeArgs(value) {
    this.args = Object.freeze([value, this.updater]);
  }

});
exports.useState = useState;
;
},{"./hook.js":"node_modules/haunted/lib/hook.js"}],"node_modules/haunted/lib/use-controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useController = useController;

var _useLayoutEffect = require("./use-layout-effect.js");

var _useState = require("./use-state.js");

/**
 * @license
 * Portions Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const microtask = Promise.resolve();
/**
 * An implementation of ReactiveControllerHost that is driven by Haunted hooks
 * and `useController()`.
 */

class HauntedControllerHost {
  count;
  kick;
  _controllers = [];
  _updatePending = true;
  _updateCompletePromise;
  _resolveUpdate;

  constructor(count, kick) {
    this.count = count;
    this.kick = kick;
    this._updateCompletePromise = new Promise(res => {
      this._resolveUpdate = res;
    });
  }

  addController(controller) {
    this._controllers.push(controller);
  }

  removeController(controller) {
    // Note, if the indexOf is -1, the >>> will flip the sign which makes the
    // splice do nothing.
    this._controllers && this._controllers.splice(this._controllers.indexOf(controller) >>> 0, 1);
  }

  requestUpdate() {
    if (!this._updatePending) {
      this._updatePending = true;
      microtask.then(() => this.kick(this.count + 1));
    }
  }

  get updateComplete() {
    return this._updateCompletePromise;
  }

  connected() {
    this._controllers.forEach(c => c.hostConnected && c.hostConnected());
  }

  disconnected() {
    this._controllers.forEach(c => c.hostDisconnected && c.hostDisconnected());
  }

  update() {
    this._controllers.forEach(c => c.hostUpdate && c.hostUpdate());
  }

  updated() {
    this._updatePending = false;
    const resolve = this._resolveUpdate; // Create a new updateComplete Promise for the next update,
    // before resolving the current one.

    this._updateCompletePromise = new Promise(res => {
      this._resolveUpdate = res;
    });

    this._controllers.forEach(c => c.hostUpdated && c.hostUpdated());

    resolve(this._updatePending);
  }

}
/**
 * Creates and stores a stateful ReactiveController instance and provides it
 * with a ReactiveControllerHost that drives the controller lifecycle.
 *
 * Use this hook to convert a ReactiveController into a Haunted hook.
 *
 * @param {<C extends ReactiveController>(host: ReactiveControllerHost) => C} createController A function that creates a controller instance.
 * This function is given a HauntedControllerHost to pass to the controller. The
 * create function is only called once per component.
 * @return {ReactiveController} the controller instance
 */


function useController(createController) {
  const [count, kick] = (0, _useState.useState)(0);
  const [host] = (0, _useState.useState)(() => {
    const host = new HauntedControllerHost(count, kick);
    const controller = createController(host);
    host.primaryController = controller;
    host.connected();
    return host;
  }); // We use useLayoutEffect because we need updated() called synchronously
  // after rendering.

  (0, _useLayoutEffect.useLayoutEffect)(() => host.updated()); // Returning a cleanup function simulates hostDisconnected timing. An empty
  // deps array tells Haunted to only call this once: on mount with the cleanup
  // called on unmount.

  (0, _useLayoutEffect.useLayoutEffect)(() => () => host.disconnected(), []);
  host.update();
  return host.primaryController;
}
},{"./use-layout-effect.js":"node_modules/haunted/lib/use-layout-effect.js","./use-state.js":"node_modules/haunted/lib/use-state.js"}],"node_modules/haunted/lib/use-reducer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReducer = void 0;

var _hook = require("./hook.js");

/**
 * Given a reducer function, initial state, and optional state initializer function, returns a tuple of state and dispatch function.
 * @function
 * @template S State
 * @template I Initial State
 * @template A Action
 * @param {Reducer<S, A>} reducer - reducer function to compute the next state given the previous state and the action
 * @param {I} initialState - the initial state of the reducer
 * @param {(init: I) => S} [init=undefined] - Optional initializer function, called on initialState if provided
 * @return {readonly [S, (action: A) => void]}
 */
const useReducer = (0, _hook.hook)(class extends _hook.Hook {
  reducer;
  currentState;

  constructor(id, state, _, initialState, init) {
    super(id, state);
    this.dispatch = this.dispatch.bind(this);
    this.currentState = init !== undefined ? init(initialState) : initialState;
  }

  update(reducer) {
    this.reducer = reducer;
    return [this.currentState, this.dispatch];
  }

  dispatch(action) {
    this.currentState = this.reducer(this.currentState, action);
    this.state.update();
  }

});
exports.useReducer = useReducer;
},{"./hook.js":"node_modules/haunted/lib/hook.js"}],"node_modules/haunted/lib/use-ref.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRef = void 0;

var _useMemo = require("./use-memo.js");

/**
 * @function
 * @template T
 * @param   {T} initialValue
 * @return  {{ current: T }} Ref
 */
const useRef = initialValue => (0, _useMemo.useMemo)(() => ({
  current: initialValue
}), []);

exports.useRef = useRef;
},{"./use-memo.js":"node_modules/haunted/lib/use-memo.js"}],"node_modules/haunted/lib/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BaseScheduler", {
  enumerable: true,
  get: function () {
    return _scheduler.BaseScheduler;
  }
});
Object.defineProperty(exports, "Hook", {
  enumerable: true,
  get: function () {
    return _hook.Hook;
  }
});
Object.defineProperty(exports, "State", {
  enumerable: true,
  get: function () {
    return _state.State;
  }
});
exports.default = haunted;
Object.defineProperty(exports, "hook", {
  enumerable: true,
  get: function () {
    return _hook.hook;
  }
});
Object.defineProperty(exports, "useCallback", {
  enumerable: true,
  get: function () {
    return _useCallback.useCallback;
  }
});
Object.defineProperty(exports, "useContext", {
  enumerable: true,
  get: function () {
    return _useContext.useContext;
  }
});
Object.defineProperty(exports, "useController", {
  enumerable: true,
  get: function () {
    return _useController.useController;
  }
});
Object.defineProperty(exports, "useEffect", {
  enumerable: true,
  get: function () {
    return _useEffect.useEffect;
  }
});
Object.defineProperty(exports, "useLayoutEffect", {
  enumerable: true,
  get: function () {
    return _useLayoutEffect.useLayoutEffect;
  }
});
Object.defineProperty(exports, "useMemo", {
  enumerable: true,
  get: function () {
    return _useMemo.useMemo;
  }
});
Object.defineProperty(exports, "useReducer", {
  enumerable: true,
  get: function () {
    return _useReducer.useReducer;
  }
});
Object.defineProperty(exports, "useRef", {
  enumerable: true,
  get: function () {
    return _useRef.useRef;
  }
});
Object.defineProperty(exports, "useState", {
  enumerable: true,
  get: function () {
    return _useState.useState;
  }
});

var _component = require("./component.js");

var _createContext = require("./create-context.js");

var _useCallback = require("./use-callback.js");

var _useController = require("./use-controller.js");

var _useEffect = require("./use-effect.js");

var _useLayoutEffect = require("./use-layout-effect.js");

var _useState = require("./use-state.js");

var _useReducer = require("./use-reducer.js");

var _useMemo = require("./use-memo.js");

var _useContext = require("./use-context.js");

var _useRef = require("./use-ref.js");

var _hook = require("./hook.js");

var _scheduler = require("./scheduler.js");

var _state = require("./state.js");

function haunted({
  render
}) {
  const component = (0, _component.makeComponent)(render);
  const createContext = (0, _createContext.makeContext)(component);
  return {
    component,
    createContext
  };
}
},{"./component.js":"node_modules/haunted/lib/component.js","./create-context.js":"node_modules/haunted/lib/create-context.js","./use-callback.js":"node_modules/haunted/lib/use-callback.js","./use-controller.js":"node_modules/haunted/lib/use-controller.js","./use-effect.js":"node_modules/haunted/lib/use-effect.js","./use-layout-effect.js":"node_modules/haunted/lib/use-layout-effect.js","./use-state.js":"node_modules/haunted/lib/use-state.js","./use-reducer.js":"node_modules/haunted/lib/use-reducer.js","./use-memo.js":"node_modules/haunted/lib/use-memo.js","./use-context.js":"node_modules/haunted/lib/use-context.js","./use-ref.js":"node_modules/haunted/lib/use-ref.js","./hook.js":"node_modules/haunted/lib/hook.js","./scheduler.js":"node_modules/haunted/lib/scheduler.js","./state.js":"node_modules/haunted/lib/state.js"}],"node_modules/lit-html/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directive = exports.PartType = exports.Directive = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
},
      e = t => (...e) => ({
  _$litDirective$: t,
  values: e
});

exports.directive = e;
exports.PartType = t;

class i {
  constructor(t) {}

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }

  _$AS(t, e) {
    return this.update(t, e);
  }

  update(t, e) {
    return this.render(...e);
  }

}

exports.Directive = i;
},{}],"node_modules/lit/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _directive = require("lit-html/directive.js");

Object.keys(_directive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _directive[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _directive[key];
    }
  });
});
},{"lit-html/directive.js":"node_modules/lit-html/directive.js"}],"node_modules/lit-html/directive-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCommittedValue = exports.setChildPartValue = exports.removePart = exports.isTemplateResult = exports.isSingleExpression = exports.isPrimitive = exports.isDirectiveResult = exports.insertPart = exports.getDirectiveClass = exports.getCommittedValue = exports.clearPart = exports.TemplateResultType = void 0;

var _litHtml = require("./lit-html.js");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
  H: l
} = _litHtml._$LH,
      t = o => null === o || "object" != typeof o && "function" != typeof o,
      i = {
  HTML: 1,
  SVG: 2
},
      n = (o, l) => void 0 === l ? void 0 !== (null == o ? void 0 : o._$litType$) : (null == o ? void 0 : o._$litType$) === l,
      d = o => void 0 !== (null == o ? void 0 : o._$litDirective$),
      v = o => null == o ? void 0 : o._$litDirective$,
      e = o => void 0 === o.strings,
      c = () => document.createComment(""),
      r = (o, t, i) => {
  var n;
  const d = o._$AA.parentNode,
        v = void 0 === t ? o._$AB : t._$AA;

  if (void 0 === i) {
    const t = d.insertBefore(c(), v),
          n = d.insertBefore(c(), v);
    i = new l(t, n, o, o.options);
  } else {
    const l = i._$AB.nextSibling,
          t = i._$AM,
          e = t !== o;

    if (e) {
      let l;
      null === (n = i._$AQ) || void 0 === n || n.call(i, o), i._$AM = o, void 0 !== i._$AP && (l = o._$AU) !== t._$AU && i._$AP(l);
    }

    if (l !== v || e) {
      let o = i._$AA;

      for (; o !== l;) {
        const l = o.nextSibling;
        d.insertBefore(o, v), o = l;
      }
    }
  }

  return i;
},
      u = (o, l, t = o) => (o._$AI(l, t), o),
      f = {},
      s = (o, l = f) => o._$AH = l,
      m = o => o._$AH,
      p = o => {
  var l;
  null === (l = o._$AP) || void 0 === l || l.call(o, !1, !0);
  let t = o._$AA;
  const i = o._$AB.nextSibling;

  for (; t !== i;) {
    const o = t.nextSibling;
    t.remove(), t = o;
  }
},
      a = o => {
  o._$AR();
};

exports.clearPart = a;
exports.removePart = p;
exports.getCommittedValue = m;
exports.setCommittedValue = s;
exports.setChildPartValue = u;
exports.insertPart = r;
exports.isSingleExpression = e;
exports.getDirectiveClass = v;
exports.isDirectiveResult = d;
exports.isTemplateResult = n;
exports.TemplateResultType = i;
exports.isPrimitive = t;
},{"./lit-html.js":"node_modules/lit-html/lit-html.js"}],"node_modules/lit-html/async-directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncDirective = void 0;
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});

var _directiveHelpers = require("./directive-helpers.js");

var _directive = require("./directive.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (i, t) => {
  var s, o;
  const n = i._$AN;
  if (void 0 === n) return !1;

  for (const i of n) null === (o = (s = i)._$AO) || void 0 === o || o.call(s, t, !1), e(i, t);

  return !0;
},
      o = i => {
  let t, s;

  do {
    if (void 0 === (t = i._$AM)) break;
    s = t._$AN, s.delete(i), i = t;
  } while (0 === (null == s ? void 0 : s.size));
},
      n = i => {
  for (let t; t = i._$AM; i = t) {
    let s = t._$AN;
    if (void 0 === s) t._$AN = s = new Set();else if (s.has(i)) break;
    s.add(i), l(t);
  }
};

function r(i) {
  void 0 !== this._$AN ? (o(this), this._$AM = i, n(this)) : this._$AM = i;
}

function h(i, t = !1, s = 0) {
  const n = this._$AH,
        r = this._$AN;
  if (void 0 !== r && 0 !== r.size) if (t) {
    if (Array.isArray(n)) for (let i = s; i < n.length; i++) e(n[i], !1), o(n[i]);else null != n && (e(n, !1), o(n));
  } else e(this, i);
}

const l = i => {
  var t, e, o, n;
  i.type == _directive.PartType.CHILD && (null !== (t = (o = i)._$AP) && void 0 !== t || (o._$AP = h), null !== (e = (n = i)._$AQ) && void 0 !== e || (n._$AQ = r));
};

class d extends _directive.Directive {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }

  _$AT(i, t, s) {
    super._$AT(i, t, s), n(this), this.isConnected = i._$AU;
  }

  _$AO(i, t = !0) {
    var s, n;
    i !== this.isConnected && (this.isConnected = i, i ? null === (s = this.reconnected) || void 0 === s || s.call(this) : null === (n = this.disconnected) || void 0 === n || n.call(this)), t && (e(this, i), o(this));
  }

  setValue(t) {
    if ((0, _directiveHelpers.isSingleExpression)(this._$Ct)) this._$Ct._$AI(t, this);else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
    }
  }

  disconnected() {}

  reconnected() {}

}

exports.AsyncDirective = d;
},{"./directive-helpers.js":"node_modules/lit-html/directive-helpers.js","./directive.js":"node_modules/lit-html/directive.js"}],"node_modules/lit/async-directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncDirective = require("lit-html/async-directive.js");

Object.keys(_asyncDirective).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _asyncDirective[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _asyncDirective[key];
    }
  });
});
},{"lit-html/async-directive.js":"node_modules/lit-html/async-directive.js"}],"node_modules/haunted/lib/virtual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeVirtual = makeVirtual;

var _directive = require("lit/directive.js");

var _lit = require("lit");

var _asyncDirective = require("lit/async-directive.js");

var _scheduler = require("./scheduler.js");

const includes = Array.prototype.includes;
const partToScheduler = new WeakMap();
const schedulerToPart = new WeakMap();

class Scheduler extends _scheduler.BaseScheduler {
  args;
  setValue;

  constructor(renderer, part, setValue) {
    super(renderer, part);
    this.state.virtual = true;
    this.setValue = setValue;
  }

  render() {
    return this.state.run(() => this.renderer.apply(this.host, this.args));
  }

  commit(result) {
    this.setValue(result);
  }

  teardown() {
    super.teardown();
    let part = schedulerToPart.get(this);
    partToScheduler.delete(part);
  }

}

function makeVirtual() {
  function virtual(renderer) {
    class VirtualDirective extends _asyncDirective.AsyncDirective {
      cont;

      constructor(partInfo) {
        super(partInfo);
        this.cont = undefined;
      }

      update(part, args) {
        this.cont = partToScheduler.get(part);

        if (!this.cont || this.cont.renderer !== renderer) {
          this.cont = new Scheduler(renderer, part, r => {
            this.setValue(r);
          });
          partToScheduler.set(part, this.cont);
          schedulerToPart.set(this.cont, part);
          teardownOnRemove(this.cont, part);
        }

        this.cont.args = args;
        this.cont.update();
        return this.render(args);
      }

      render(args) {
        return _lit.noChange;
      }

    }

    return (0, _directive.directive)(VirtualDirective);
  }

  return virtual;
}

function teardownOnRemove(cont, part, node = part.startNode) {
  let frag = node.parentNode;
  let mo = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      if (includes.call(mutation.removedNodes, node)) {
        mo.disconnect();

        if (node.parentNode instanceof ShadowRoot) {
          teardownOnRemove(cont, part);
        } else {
          cont.teardown();
        }

        break;
      } else if (includes.call(mutation.addedNodes, node.nextSibling)) {
        mo.disconnect();
        teardownOnRemove(cont, part, node.nextSibling || undefined);
        break;
      }
    }
  });
  mo.observe(frag, {
    childList: true
  });
}
},{"lit/directive.js":"node_modules/lit/directive.js","lit":"node_modules/lit/index.js","lit/async-directive.js":"node_modules/lit/async-directive.js","./scheduler.js":"node_modules/haunted/lib/scheduler.js"}],"node_modules/haunted/lib/lit-haunted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = exports.component = void 0;
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _lit.html;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _lit.render;
  }
});
exports.virtual = void 0;

var _lit = require("lit");

var _core = _interopRequireDefault(require("./core.js"));

var _virtual = require("./virtual.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  component,
  createContext
} = (0, _core.default)({
  render: _lit.render
});
exports.createContext = createContext;
exports.component = component;
const virtual = (0, _virtual.makeVirtual)();
exports.virtual = virtual;
},{"lit":"node_modules/lit/index.js","./core.js":"node_modules/haunted/lib/core.js","./virtual.js":"node_modules/haunted/lib/virtual.js"}],"node_modules/haunted/lib/haunted.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  html: true,
  render: true,
  component: true,
  createContext: true,
  virtual: true
};
Object.defineProperty(exports, "component", {
  enumerable: true,
  get: function () {
    return _litHaunted.component;
  }
});
Object.defineProperty(exports, "createContext", {
  enumerable: true,
  get: function () {
    return _litHaunted.createContext;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _core.default;
  }
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _litHaunted.html;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _litHaunted.render;
  }
});
Object.defineProperty(exports, "virtual", {
  enumerable: true,
  get: function () {
    return _litHaunted.virtual;
  }
});

var _litHaunted = require("./lit-haunted.js");

var _core = _interopRequireWildcard(require("./core.js"));

Object.keys(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./lit-haunted.js":"node_modules/haunted/lib/lit-haunted.js","./core.js":"node_modules/haunted/lib/core.js"}],"src/components/searchInput.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchInput = void 0;

var _haunted = require("haunted");

var _lit = require("lit");

var _templateObject;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchInput = /*#__PURE__*/function (_LitElement) {
  _inherits(SearchInput, _LitElement);

  var _super = _createSuper(SearchInput);

  function SearchInput() {
    _classCallCheck(this, SearchInput);

    return _super.apply(this, arguments);
  }

  _createClass(SearchInput, [{
    key: "render",
    value: //   constructor() {
    //     super();
    //     this.name = 'Somebody';
    //   }
    function render() {
      return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Hello ", "!"])), this.name);
    }
  }]);

  return SearchInput;
}(_lit.LitElement);

exports.SearchInput = SearchInput;

_defineProperty(SearchInput, "properties", {
  name: {
    type: String
  }
});

;
customElements.define('search-input', SearchInput); // export const searchInput = ({ name }) => {
//     return html`Hello ${name}!`;
//   };
//   customElements.define('search-input', component(searchInput));
},{"haunted":"node_modules/haunted/lib/haunted.js","lit":"node_modules/lit/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53282" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/components/searchInput.js"], null)
//# sourceMappingURL=/searchInput.6ae1c6d1.js.map