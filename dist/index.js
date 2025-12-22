"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // bin/live-reload.js
  var init_live_reload = __esm({
    "bin/live-reload.js"() {
      "use strict";
      new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());
    }
  });

  // node_modules/.pnpm/@barba+core@2.10.3/node_modules/@barba/core/dist/barba.umd.js
  var require_barba_umd = __commonJS({
    "node_modules/.pnpm/@barba+core@2.10.3/node_modules/@barba/core/dist/barba.umd.js"(exports, module) {
      init_live_reload();
      !function(t, n) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t || self).barba = n();
      }(exports, function() {
        function t(t2, n2) {
          for (var r2 = 0; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(t2, "symbol" == typeof (e2 = function(t3, n3) {
              if ("object" != typeof t3 || null === t3) return t3;
              var r3 = t3[Symbol.toPrimitive];
              if (void 0 !== r3) {
                var i3 = r3.call(t3, "string");
                if ("object" != typeof i3) return i3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return String(t3);
            }(i2.key)) ? e2 : String(e2), i2);
          }
          var e2;
        }
        function n(n2, r2, i2) {
          return r2 && t(n2.prototype, r2), i2 && t(n2, i2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
        }
        function r() {
          return r = Object.assign ? Object.assign.bind() : function(t2) {
            for (var n2 = 1; n2 < arguments.length; n2++) {
              var r2 = arguments[n2];
              for (var i2 in r2) Object.prototype.hasOwnProperty.call(r2, i2) && (t2[i2] = r2[i2]);
            }
            return t2;
          }, r.apply(this, arguments);
        }
        function i(t2, n2) {
          t2.prototype = Object.create(n2.prototype), t2.prototype.constructor = t2, o(t2, n2);
        }
        function e(t2) {
          return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          }, e(t2);
        }
        function o(t2, n2) {
          return o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, n3) {
            return t3.__proto__ = n3, t3;
          }, o(t2, n2);
        }
        function u() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" == typeof Proxy) return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            })), true;
          } catch (t2) {
            return false;
          }
        }
        function s(t2, n2, r2) {
          return s = u() ? Reflect.construct.bind() : function(t3, n3, r3) {
            var i2 = [null];
            i2.push.apply(i2, n3);
            var e2 = new (Function.bind.apply(t3, i2))();
            return r3 && o(e2, r3.prototype), e2;
          }, s.apply(null, arguments);
        }
        function f(t2) {
          var n2 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
          return f = function(t3) {
            if (null === t3 || -1 === Function.toString.call(t3).indexOf("[native code]")) return t3;
            if ("function" != typeof t3) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== n2) {
              if (n2.has(t3)) return n2.get(t3);
              n2.set(t3, r2);
            }
            function r2() {
              return s(t3, arguments, e(this).constructor);
            }
            return r2.prototype = Object.create(t3.prototype, { constructor: { value: r2, enumerable: false, writable: true, configurable: true } }), o(r2, t3);
          }, f(t2);
        }
        function c(t2) {
          if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        }
        var a, h = function() {
          this.before = void 0, this.beforeLeave = void 0, this.leave = void 0, this.afterLeave = void 0, this.beforeEnter = void 0, this.enter = void 0, this.afterEnter = void 0, this.after = void 0;
        };
        !function(t2) {
          t2[t2.off = 0] = "off", t2[t2.error = 1] = "error", t2[t2.warning = 2] = "warning", t2[t2.info = 3] = "info", t2[t2.debug = 4] = "debug";
        }(a || (a = {}));
        var v = a.off, d = /* @__PURE__ */ function() {
          function t2(t3) {
            this.t = void 0, this.t = t3;
          }
          t2.getLevel = function() {
            return v;
          }, t2.setLevel = function(t3) {
            return v = a[t3];
          };
          var n2 = t2.prototype;
          return n2.error = function() {
            this.i(console.error, a.error, [].slice.call(arguments));
          }, n2.warn = function() {
            this.i(console.warn, a.warning, [].slice.call(arguments));
          }, n2.info = function() {
            this.i(console.info, a.info, [].slice.call(arguments));
          }, n2.debug = function() {
            this.i(console.log, a.debug, [].slice.call(arguments));
          }, n2.i = function(n3, r2, i2) {
            r2 <= t2.getLevel() && n3.apply(console, ["[" + this.t + "] "].concat(i2));
          }, t2;
        }();
        function l(t2) {
          return t2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function p(t2) {
          return t2 && t2.sensitive ? "" : "i";
        }
        var m = { container: "container", history: "history", namespace: "namespace", prefix: "data-barba", prevent: "prevent", wrapper: "wrapper" }, w = /* @__PURE__ */ function() {
          function t2() {
            this.o = m, this.u = void 0, this.h = { after: null, before: null, parent: null };
          }
          var n2 = t2.prototype;
          return n2.toString = function(t3) {
            return t3.outerHTML;
          }, n2.toDocument = function(t3) {
            return this.u || (this.u = new DOMParser()), this.u.parseFromString(t3, "text/html");
          }, n2.toElement = function(t3) {
            var n3 = document.createElement("div");
            return n3.innerHTML = t3, n3;
          }, n2.getHtml = function(t3) {
            return void 0 === t3 && (t3 = document), this.toString(t3.documentElement);
          }, n2.getWrapper = function(t3) {
            return void 0 === t3 && (t3 = document), t3.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]');
          }, n2.getContainer = function(t3) {
            return void 0 === t3 && (t3 = document), t3.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]');
          }, n2.removeContainer = function(t3) {
            document.body.contains(t3) && (this.v(t3), t3.parentNode.removeChild(t3));
          }, n2.addContainer = function(t3, n3) {
            var r2 = this.getContainer() || this.h.before;
            r2 ? this.l(t3, r2) : this.h.after ? this.h.after.parentNode.insertBefore(t3, this.h.after) : this.h.parent ? this.h.parent.appendChild(t3) : n3.appendChild(t3);
          }, n2.getSibling = function() {
            return this.h;
          }, n2.getNamespace = function(t3) {
            void 0 === t3 && (t3 = document);
            var n3 = t3.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
            return n3 ? n3.getAttribute(this.o.prefix + "-" + this.o.namespace) : null;
          }, n2.getHref = function(t3) {
            if (t3.tagName && "a" === t3.tagName.toLowerCase()) {
              if ("string" == typeof t3.href) return t3.href;
              var n3 = t3.getAttribute("href") || t3.getAttribute("xlink:href");
              if (n3) return this.resolveUrl(n3.baseVal || n3);
            }
            return null;
          }, n2.resolveUrl = function() {
            var t3 = [].slice.call(arguments).length;
            if (0 === t3) throw new Error("resolveUrl requires at least one argument; got none.");
            var n3 = document.createElement("base");
            if (n3.href = arguments[0], 1 === t3) return n3.href;
            var r2 = document.getElementsByTagName("head")[0];
            r2.insertBefore(n3, r2.firstChild);
            for (var i2, e2 = document.createElement("a"), o2 = 1; o2 < t3; o2++) e2.href = arguments[o2], n3.href = i2 = e2.href;
            return r2.removeChild(n3), i2;
          }, n2.l = function(t3, n3) {
            n3.parentNode.insertBefore(t3, n3.nextSibling);
          }, n2.v = function(t3) {
            return this.h = { after: t3.nextElementSibling, before: t3.previousElementSibling, parent: t3.parentElement }, this.h;
          }, t2;
        }(), b = new w(), y = /* @__PURE__ */ function() {
          function t2() {
            this.p = void 0, this.m = [], this.P = -1;
          }
          var i2 = t2.prototype;
          return i2.init = function(t3, n2) {
            this.p = "barba";
            var r2 = { data: {}, ns: n2, scroll: { x: window.scrollX, y: window.scrollY }, url: t3 };
            this.P = 0, this.m.push(r2);
            var i3 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history && window.history.replaceState(i3, "", t3);
          }, i2.change = function(t3, n2, r2) {
            if (r2 && r2.state) {
              var i3 = r2.state, e2 = i3.index;
              n2 = this.g(this.P - e2), this.replace(i3.states), this.P = e2;
            } else this.add(t3, n2);
            return n2;
          }, i2.add = function(t3, n2, r2, i3) {
            var e2 = null != r2 ? r2 : this.R(n2), o2 = { data: null != i3 ? i3 : {}, ns: "tmp", scroll: { x: window.scrollX, y: window.scrollY }, url: t3 };
            switch (e2) {
              case "push":
                this.P = this.size, this.m.push(o2);
                break;
              case "replace":
                this.set(this.P, o2);
            }
            var u2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            switch (e2) {
              case "push":
                window.history && window.history.pushState(u2, "", t3);
                break;
              case "replace":
                window.history && window.history.replaceState(u2, "", t3);
            }
          }, i2.store = function(t3, n2) {
            var i3 = n2 || this.P, e2 = this.get(i3);
            e2.data = r({}, e2.data, t3), this.set(i3, e2);
            var o2 = { from: this.p, index: this.P, states: [].concat(this.m) };
            window.history.replaceState(o2, "");
          }, i2.update = function(t3, n2) {
            var i3 = n2 || this.P, e2 = r({}, this.get(i3), t3);
            this.set(i3, e2);
          }, i2.remove = function(t3) {
            t3 ? this.m.splice(t3, 1) : this.m.pop(), this.P--;
          }, i2.clear = function() {
            this.m = [], this.P = -1;
          }, i2.replace = function(t3) {
            this.m = t3;
          }, i2.get = function(t3) {
            return this.m[t3];
          }, i2.set = function(t3, n2) {
            return this.m[t3] = n2;
          }, i2.R = function(t3) {
            var n2 = "push", r2 = t3, i3 = m.prefix + "-" + m.history;
            return r2.hasAttribute && r2.hasAttribute(i3) && (n2 = r2.getAttribute(i3)), n2;
          }, i2.g = function(t3) {
            return Math.abs(t3) > 1 ? t3 > 0 ? "forward" : "back" : 0 === t3 ? "popstate" : t3 > 0 ? "back" : "forward";
          }, n(t2, [{ key: "current", get: function() {
            return this.m[this.P];
          } }, { key: "previous", get: function() {
            return this.P < 1 ? null : this.m[this.P - 1];
          } }, { key: "size", get: function() {
            return this.m.length;
          } }]), t2;
        }(), P = new y(), g = function(t2, n2) {
          try {
            var r2 = function() {
              if (!n2.next.html) return Promise.resolve(t2).then(function(t3) {
                var r3 = n2.next;
                if (t3) {
                  var i2 = b.toElement(t3.html);
                  r3.namespace = b.getNamespace(i2), r3.container = b.getContainer(i2), r3.url = t3.url, r3.html = t3.html, P.update({ ns: r3.namespace });
                  var e2 = b.toDocument(t3.html);
                  document.title = e2.title;
                }
              });
            }();
            return Promise.resolve(r2 && r2.then ? r2.then(function() {
            }) : void 0);
          } catch (t3) {
            return Promise.reject(t3);
          }
        }, E = function t2(n2, r2, i2) {
          return n2 instanceof RegExp ? function(t3, n3) {
            if (!n3) return t3;
            for (var r3 = /\((?:\?<(.*?)>)?(?!\?)/g, i3 = 0, e2 = r3.exec(t3.source); e2; ) n3.push({ name: e2[1] || i3++, prefix: "", suffix: "", modifier: "", pattern: "" }), e2 = r3.exec(t3.source);
            return t3;
          }(n2, r2) : Array.isArray(n2) ? function(n3, r3, i3) {
            var e2 = n3.map(function(n4) {
              return t2(n4, r3, i3).source;
            });
            return new RegExp("(?:".concat(e2.join("|"), ")"), p(i3));
          }(n2, r2, i2) : function(t3, n3, r3) {
            return function(t4, n4, r4) {
              void 0 === r4 && (r4 = {});
              for (var i3 = r4.strict, e2 = void 0 !== i3 && i3, o2 = r4.start, u2 = void 0 === o2 || o2, s2 = r4.end, f2 = void 0 === s2 || s2, c2 = r4.encode, a2 = void 0 === c2 ? function(t5) {
                return t5;
              } : c2, h2 = r4.delimiter, v2 = void 0 === h2 ? "/#?" : h2, d2 = r4.endsWith, m2 = "[".concat(l(void 0 === d2 ? "" : d2), "]|$"), w2 = "[".concat(l(v2), "]"), b2 = u2 ? "^" : "", y2 = 0, P2 = t4; y2 < P2.length; y2++) {
                var g2 = P2[y2];
                if ("string" == typeof g2) b2 += l(a2(g2));
                else {
                  var E2 = l(a2(g2.prefix)), x2 = l(a2(g2.suffix));
                  if (g2.pattern) if (n4 && n4.push(g2), E2 || x2) if ("+" === g2.modifier || "*" === g2.modifier) {
                    var R2 = "*" === g2.modifier ? "?" : "";
                    b2 += "(?:".concat(E2, "((?:").concat(g2.pattern, ")(?:").concat(x2).concat(E2, "(?:").concat(g2.pattern, "))*)").concat(x2, ")").concat(R2);
                  } else b2 += "(?:".concat(E2, "(").concat(g2.pattern, ")").concat(x2, ")").concat(g2.modifier);
                  else b2 += "+" === g2.modifier || "*" === g2.modifier ? "((?:".concat(g2.pattern, ")").concat(g2.modifier, ")") : "(".concat(g2.pattern, ")").concat(g2.modifier);
                  else b2 += "(?:".concat(E2).concat(x2, ")").concat(g2.modifier);
                }
              }
              if (f2) e2 || (b2 += "".concat(w2, "?")), b2 += r4.endsWith ? "(?=".concat(m2, ")") : "$";
              else {
                var k2 = t4[t4.length - 1], O2 = "string" == typeof k2 ? w2.indexOf(k2[k2.length - 1]) > -1 : void 0 === k2;
                e2 || (b2 += "(?:".concat(w2, "(?=").concat(m2, "))?")), O2 || (b2 += "(?=".concat(w2, "|").concat(m2, ")"));
              }
              return new RegExp(b2, p(r4));
            }(function(t4, n4) {
              void 0 === n4 && (n4 = {});
              for (var r4 = function(t5) {
                for (var n5 = [], r5 = 0; r5 < t5.length; ) {
                  var i4 = t5[r5];
                  if ("*" !== i4 && "+" !== i4 && "?" !== i4) if ("\\" !== i4) if ("{" !== i4) if ("}" !== i4) if (":" !== i4) if ("(" !== i4) n5.push({ type: "CHAR", index: r5, value: t5[r5++] });
                  else {
                    var e3 = 1, o3 = "";
                    if ("?" === t5[s3 = r5 + 1]) throw new TypeError('Pattern cannot start with "?" at '.concat(s3));
                    for (; s3 < t5.length; ) if ("\\" !== t5[s3]) {
                      if (")" === t5[s3]) {
                        if (0 == --e3) {
                          s3++;
                          break;
                        }
                      } else if ("(" === t5[s3] && (e3++, "?" !== t5[s3 + 1])) throw new TypeError("Capturing groups are not allowed at ".concat(s3));
                      o3 += t5[s3++];
                    } else o3 += t5[s3++] + t5[s3++];
                    if (e3) throw new TypeError("Unbalanced pattern at ".concat(r5));
                    if (!o3) throw new TypeError("Missing pattern at ".concat(r5));
                    n5.push({ type: "PATTERN", index: r5, value: o3 }), r5 = s3;
                  }
                  else {
                    for (var u3 = "", s3 = r5 + 1; s3 < t5.length; ) {
                      var f3 = t5.charCodeAt(s3);
                      if (!(f3 >= 48 && f3 <= 57 || f3 >= 65 && f3 <= 90 || f3 >= 97 && f3 <= 122 || 95 === f3)) break;
                      u3 += t5[s3++];
                    }
                    if (!u3) throw new TypeError("Missing parameter name at ".concat(r5));
                    n5.push({ type: "NAME", index: r5, value: u3 }), r5 = s3;
                  }
                  else n5.push({ type: "CLOSE", index: r5, value: t5[r5++] });
                  else n5.push({ type: "OPEN", index: r5, value: t5[r5++] });
                  else n5.push({ type: "ESCAPED_CHAR", index: r5++, value: t5[r5++] });
                  else n5.push({ type: "MODIFIER", index: r5, value: t5[r5++] });
                }
                return n5.push({ type: "END", index: r5, value: "" }), n5;
              }(t4), i3 = n4.prefixes, e2 = void 0 === i3 ? "./" : i3, o2 = "[^".concat(l(n4.delimiter || "/#?"), "]+?"), u2 = [], s2 = 0, f2 = 0, c2 = "", a2 = function(t5) {
                if (f2 < r4.length && r4[f2].type === t5) return r4[f2++].value;
              }, h2 = function(t5) {
                var n5 = a2(t5);
                if (void 0 !== n5) return n5;
                var i4 = r4[f2], e3 = i4.index;
                throw new TypeError("Unexpected ".concat(i4.type, " at ").concat(e3, ", expected ").concat(t5));
              }, v2 = function() {
                for (var t5, n5 = ""; t5 = a2("CHAR") || a2("ESCAPED_CHAR"); ) n5 += t5;
                return n5;
              }; f2 < r4.length; ) {
                var d2 = a2("CHAR"), p2 = a2("NAME"), m2 = a2("PATTERN");
                if (p2 || m2) -1 === e2.indexOf(b2 = d2 || "") && (c2 += b2, b2 = ""), c2 && (u2.push(c2), c2 = ""), u2.push({ name: p2 || s2++, prefix: b2, suffix: "", pattern: m2 || o2, modifier: a2("MODIFIER") || "" });
                else {
                  var w2 = d2 || a2("ESCAPED_CHAR");
                  if (w2) c2 += w2;
                  else if (c2 && (u2.push(c2), c2 = ""), a2("OPEN")) {
                    var b2 = v2(), y2 = a2("NAME") || "", P2 = a2("PATTERN") || "", g2 = v2();
                    h2("CLOSE"), u2.push({ name: y2 || (P2 ? s2++ : ""), pattern: y2 && !P2 ? o2 : P2, prefix: b2, suffix: g2, modifier: a2("MODIFIER") || "" });
                  } else h2("END");
                }
              }
              return u2;
            }(t3, r3), n3, r3);
          }(n2, r2, i2);
        }, x = { __proto__: null, update: g, nextTick: function() {
          return new Promise(function(t2) {
            window.requestAnimationFrame(t2);
          });
        }, pathToRegexp: E }, R = function() {
          return window.location.origin;
        }, k = function(t2) {
          return void 0 === t2 && (t2 = window.location.href), O(t2).port;
        }, O = function(t2) {
          var n2, r2 = t2.match(/:\d+/);
          if (null === r2) /^http/.test(t2) && (n2 = 80), /^https/.test(t2) && (n2 = 443);
          else {
            var i2 = r2[0].substring(1);
            n2 = parseInt(i2, 10);
          }
          var e2, o2 = t2.replace(R(), ""), u2 = {}, s2 = o2.indexOf("#");
          s2 >= 0 && (e2 = o2.slice(s2 + 1), o2 = o2.slice(0, s2));
          var f2 = o2.indexOf("?");
          return f2 >= 0 && (u2 = T(o2.slice(f2 + 1)), o2 = o2.slice(0, f2)), { hash: e2, path: o2, port: n2, query: u2 };
        }, T = function(t2) {
          return t2.split("&").reduce(function(t3, n2) {
            var r2 = n2.split("=");
            return t3[r2[0]] = r2[1], t3;
          }, {});
        }, A = function(t2) {
          return void 0 === t2 && (t2 = window.location.href), t2.replace(/(\/#.*|\/|#.*)$/, "");
        }, j = { __proto__: null, getHref: function() {
          return window.location.href;
        }, getAbsoluteHref: function(t2, n2) {
          return void 0 === n2 && (n2 = document.baseURI), new URL(t2, n2).href;
        }, getOrigin: R, getPort: k, getPath: function(t2) {
          return void 0 === t2 && (t2 = window.location.href), O(t2).path;
        }, getQuery: function(t2, n2) {
          return void 0 === n2 && (n2 = false), n2 ? JSON.stringify(O(t2).query) : O(t2).query;
        }, getHash: function(t2) {
          return O(t2).hash;
        }, parse: O, parseQuery: T, clean: A };
        function M(t2, n2, i2, e2, o2) {
          return void 0 === n2 && (n2 = 2e3), new Promise(function(u2, s2) {
            var f2 = new XMLHttpRequest();
            f2.onreadystatechange = function() {
              if (f2.readyState === XMLHttpRequest.DONE) {
                if (200 === f2.status) {
                  var n3 = "" !== f2.responseURL && f2.responseURL !== t2 ? f2.responseURL : t2;
                  u2({ html: f2.responseText, url: r({ href: n3 }, O(n3)) }), e2.update(t2, { status: "fulfilled", target: n3 });
                } else if (f2.status) {
                  var o3 = { status: f2.status, statusText: f2.statusText };
                  i2(t2, o3), s2(o3), e2.update(t2, { status: "rejected" });
                }
              }
            }, f2.ontimeout = function() {
              var r2 = new Error("Timeout error [" + n2 + "]");
              i2(t2, r2), s2(r2), e2.update(t2, { status: "rejected" });
            }, f2.onerror = function() {
              var n3 = new Error("Fetch error");
              i2(t2, n3), s2(n3), e2.update(t2, { status: "rejected" });
            }, f2.open("GET", t2), f2.timeout = n2, f2.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"), f2.setRequestHeader("x-barba", "yes"), o2.all().forEach(function(t3, n3) {
              f2.setRequestHeader(n3, t3);
            }), f2.send();
          });
        }
        function N(t2) {
          return !!t2 && ("object" == typeof t2 || "function" == typeof t2) && "function" == typeof t2.then;
        }
        function S(t2, n2) {
          return void 0 === n2 && (n2 = {}), function() {
            var r2 = arguments, i2 = false, e2 = new Promise(function(e3, o2) {
              n2.async = function() {
                return i2 = true, function(t3, n3) {
                  t3 ? o2(t3) : e3(n3);
                };
              };
              var u2 = t2.apply(n2, [].slice.call(r2));
              i2 || (N(u2) ? u2.then(e3, o2) : e3(u2));
            });
            return e2;
          };
        }
        var C = /* @__PURE__ */ function(t2) {
          function n2() {
            var n3;
            return (n3 = t2.call(this) || this).logger = new d("@barba/core"), n3.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"], n3.registered = /* @__PURE__ */ new Map(), n3.init(), n3;
          }
          i(n2, t2);
          var r2 = n2.prototype;
          return r2.init = function() {
            var t3 = this;
            this.registered.clear(), this.all.forEach(function(n3) {
              t3[n3] || (t3[n3] = function(r3, i2) {
                t3.registered.has(n3) || t3.registered.set(n3, /* @__PURE__ */ new Set()), t3.registered.get(n3).add({ ctx: i2 || {}, fn: r3 });
              });
            });
          }, r2.do = function(t3) {
            var n3 = arguments, r3 = this;
            if (this.registered.has(t3)) {
              var i2 = Promise.resolve();
              return this.registered.get(t3).forEach(function(t4) {
                i2 = i2.then(function() {
                  return S(t4.fn, t4.ctx).apply(void 0, [].slice.call(n3, 1));
                });
              }), i2.catch(function(n4) {
                r3.logger.debug("Hook error [" + t3 + "]"), r3.logger.error(n4);
              });
            }
            return Promise.resolve();
          }, r2.clear = function() {
            var t3 = this;
            this.all.forEach(function(n3) {
              delete t3[n3];
            }), this.init();
          }, r2.help = function() {
            this.logger.info("Available hooks: " + this.all.join(","));
            var t3 = [];
            this.registered.forEach(function(n3, r3) {
              return t3.push(r3);
            }), this.logger.info("Registered hooks: " + t3.join(","));
          }, n2;
        }(h), L = new C(), H = /* @__PURE__ */ function() {
          function t2(t3) {
            if (this.k = void 0, this.O = [], "boolean" == typeof t3) this.k = t3;
            else {
              var n2 = Array.isArray(t3) ? t3 : [t3];
              this.O = n2.map(function(t4) {
                return E(t4);
              });
            }
          }
          return t2.prototype.checkHref = function(t3) {
            if ("boolean" == typeof this.k) return this.k;
            var n2 = O(t3).path;
            return this.O.some(function(t4) {
              return null !== t4.exec(n2);
            });
          }, t2;
        }(), _ = /* @__PURE__ */ function(t2) {
          function n2(n3) {
            var r2;
            return (r2 = t2.call(this, n3) || this).T = /* @__PURE__ */ new Map(), r2;
          }
          i(n2, t2);
          var e2 = n2.prototype;
          return e2.set = function(t3, n3, r2, i2, e3) {
            return this.T.set(t3, { action: r2, request: n3, status: i2, target: null != e3 ? e3 : t3 }), { action: r2, request: n3, status: i2, target: e3 };
          }, e2.get = function(t3) {
            return this.T.get(t3);
          }, e2.getRequest = function(t3) {
            return this.T.get(t3).request;
          }, e2.getAction = function(t3) {
            return this.T.get(t3).action;
          }, e2.getStatus = function(t3) {
            return this.T.get(t3).status;
          }, e2.getTarget = function(t3) {
            return this.T.get(t3).target;
          }, e2.has = function(t3) {
            return !this.checkHref(t3) && this.T.has(t3);
          }, e2.delete = function(t3) {
            return this.T.delete(t3);
          }, e2.update = function(t3, n3) {
            var i2 = r({}, this.T.get(t3), n3);
            return this.T.set(t3, i2), i2;
          }, n2;
        }(H), D = /* @__PURE__ */ function() {
          function t2() {
            this.A = /* @__PURE__ */ new Map();
          }
          var n2 = t2.prototype;
          return n2.set = function(t3, n3) {
            return this.A.set(t3, n3), { name: n3 };
          }, n2.get = function(t3) {
            return this.A.get(t3);
          }, n2.all = function() {
            return this.A;
          }, n2.has = function(t3) {
            return this.A.has(t3);
          }, n2.delete = function(t3) {
            return this.A.delete(t3);
          }, n2.clear = function() {
            return this.A.clear();
          }, t2;
        }(), B = function() {
          return !window.history.pushState;
        }, q = function(t2) {
          return !t2.el || !t2.href;
        }, F = function(t2) {
          var n2 = t2.event;
          return n2.which > 1 || n2.metaKey || n2.ctrlKey || n2.shiftKey || n2.altKey;
        }, I = function(t2) {
          var n2 = t2.el;
          return n2.hasAttribute("target") && "_blank" === n2.target;
        }, U = function(t2) {
          var n2 = t2.el;
          return void 0 !== n2.protocol && window.location.protocol !== n2.protocol || void 0 !== n2.hostname && window.location.hostname !== n2.hostname;
        }, $ = function(t2) {
          var n2 = t2.el;
          return void 0 !== n2.port && k() !== k(n2.href);
        }, Q = function(t2) {
          var n2 = t2.el;
          return n2.getAttribute && "string" == typeof n2.getAttribute("download");
        }, X = function(t2) {
          return t2.el.hasAttribute(m.prefix + "-" + m.prevent);
        }, z = function(t2) {
          return Boolean(t2.el.closest("[" + m.prefix + "-" + m.prevent + '="all"]'));
        }, G = function(t2) {
          var n2 = t2.href;
          return A(n2) === A() && k(n2) === k();
        }, J = /* @__PURE__ */ function(t2) {
          function n2(n3) {
            var r3;
            return (r3 = t2.call(this, n3) || this).suite = [], r3.tests = /* @__PURE__ */ new Map(), r3.init(), r3;
          }
          i(n2, t2);
          var r2 = n2.prototype;
          return r2.init = function() {
            this.add("pushState", B), this.add("exists", q), this.add("newTab", F), this.add("blank", I), this.add("corsDomain", U), this.add("corsPort", $), this.add("download", Q), this.add("preventSelf", X), this.add("preventAll", z), this.add("sameUrl", G, false);
          }, r2.add = function(t3, n3, r3) {
            void 0 === r3 && (r3 = true), this.tests.set(t3, n3), r3 && this.suite.push(t3);
          }, r2.run = function(t3, n3, r3, i2) {
            return this.tests.get(t3)({ el: n3, event: r3, href: i2 });
          }, r2.checkLink = function(t3, n3, r3) {
            var i2 = this;
            return this.suite.some(function(e2) {
              return i2.run(e2, t3, n3, r3);
            });
          }, n2;
        }(H), W = /* @__PURE__ */ function(t2) {
          function n2(r2, i2) {
            var e2;
            return void 0 === i2 && (i2 = "Barba error"), (e2 = t2.call.apply(t2, [this].concat([].slice.call(arguments, 2))) || this).error = void 0, e2.label = void 0, e2.error = r2, e2.label = i2, Error.captureStackTrace && Error.captureStackTrace(c(e2), n2), e2.name = "BarbaError", e2;
          }
          return i(n2, t2), n2;
        }(/* @__PURE__ */ f(Error)), K = /* @__PURE__ */ function() {
          function t2(t3) {
            void 0 === t3 && (t3 = []), this.logger = new d("@barba/core"), this.all = [], this.page = [], this.once = [], this.j = [{ name: "namespace", type: "strings" }, { name: "custom", type: "function" }], t3 && (this.all = this.all.concat(t3)), this.update();
          }
          var n2 = t2.prototype;
          return n2.add = function(t3, n3) {
            "rule" === t3 ? this.j.splice(n3.position || 0, 0, n3.value) : this.all.push(n3), this.update();
          }, n2.resolve = function(t3, n3) {
            var r2 = this;
            void 0 === n3 && (n3 = {});
            var i2 = n3.once ? this.once : this.page;
            i2 = i2.filter(n3.self ? function(t4) {
              return t4.name && "self" === t4.name;
            } : function(t4) {
              return !t4.name || "self" !== t4.name;
            });
            var e2 = /* @__PURE__ */ new Map(), o2 = i2.find(function(i3) {
              var o3 = true, u3 = {};
              return n3.self && "self" === i3.name ? (e2.set(i3, u3), true) : (r2.j.reverse().forEach(function(n4) {
                o3 && (o3 = r2.M(i3, n4, t3, u3), i3.from && i3.to && (o3 = r2.M(i3, n4, t3, u3, "from") && r2.M(i3, n4, t3, u3, "to")), i3.from && !i3.to && (o3 = r2.M(i3, n4, t3, u3, "from")), !i3.from && i3.to && (o3 = r2.M(i3, n4, t3, u3, "to")));
              }), e2.set(i3, u3), o3);
            }), u2 = e2.get(o2), s2 = [];
            if (s2.push(n3.once ? "once" : "page"), n3.self && s2.push("self"), u2) {
              var f2, c2 = [o2];
              Object.keys(u2).length > 0 && c2.push(u2), (f2 = this.logger).info.apply(f2, ["Transition found [" + s2.join(",") + "]"].concat(c2));
            } else this.logger.info("No transition found [" + s2.join(",") + "]");
            return o2;
          }, n2.update = function() {
            var t3 = this;
            this.all = this.all.map(function(n3) {
              return t3.N(n3);
            }).sort(function(t4, n3) {
              return t4.priority - n3.priority;
            }).reverse().map(function(t4) {
              return delete t4.priority, t4;
            }), this.page = this.all.filter(function(t4) {
              return void 0 !== t4.leave || void 0 !== t4.enter;
            }), this.once = this.all.filter(function(t4) {
              return void 0 !== t4.once;
            });
          }, n2.M = function(t3, n3, r2, i2, e2) {
            var o2 = true, u2 = false, s2 = t3, f2 = n3.name, c2 = f2, a2 = f2, h2 = f2, v2 = e2 ? s2[e2] : s2, d2 = "to" === e2 ? r2.next : r2.current;
            if (e2 ? v2 && v2[f2] : v2[f2]) {
              switch (n3.type) {
                case "strings":
                default:
                  var l2 = Array.isArray(v2[c2]) ? v2[c2] : [v2[c2]];
                  d2[c2] && -1 !== l2.indexOf(d2[c2]) && (u2 = true), -1 === l2.indexOf(d2[c2]) && (o2 = false);
                  break;
                case "object":
                  var p2 = Array.isArray(v2[a2]) ? v2[a2] : [v2[a2]];
                  d2[a2] ? (d2[a2].name && -1 !== p2.indexOf(d2[a2].name) && (u2 = true), -1 === p2.indexOf(d2[a2].name) && (o2 = false)) : o2 = false;
                  break;
                case "function":
                  v2[h2](r2) ? u2 = true : o2 = false;
              }
              u2 && (e2 ? (i2[e2] = i2[e2] || {}, i2[e2][f2] = s2[e2][f2]) : i2[f2] = s2[f2]);
            }
            return o2;
          }, n2.S = function(t3, n3, r2) {
            var i2 = 0;
            return (t3[n3] || t3.from && t3.from[n3] || t3.to && t3.to[n3]) && (i2 += Math.pow(10, r2), t3.from && t3.from[n3] && (i2 += 1), t3.to && t3.to[n3] && (i2 += 2)), i2;
          }, n2.N = function(t3) {
            var n3 = this;
            t3.priority = 0;
            var r2 = 0;
            return this.j.forEach(function(i2, e2) {
              r2 += n3.S(t3, i2.name, e2 + 1);
            }), t3.priority = r2, t3;
          }, t2;
        }();
        function V(t2, n2) {
          try {
            var r2 = t2();
          } catch (t3) {
            return n2(t3);
          }
          return r2 && r2.then ? r2.then(void 0, n2) : r2;
        }
        var Y = /* @__PURE__ */ function() {
          function t2(t3) {
            void 0 === t3 && (t3 = []), this.logger = new d("@barba/core"), this.store = void 0, this.C = false, this.store = new K(t3);
          }
          var r2 = t2.prototype;
          return r2.get = function(t3, n2) {
            return this.store.resolve(t3, n2);
          }, r2.doOnce = function(t3) {
            var n2 = t3.data, r3 = t3.transition;
            try {
              var i2 = function() {
                e2.C = false;
              }, e2 = this, o2 = r3 || {};
              e2.C = true;
              var u2 = V(function() {
                return Promise.resolve(e2.L("beforeOnce", n2, o2)).then(function() {
                  return Promise.resolve(e2.once(n2, o2)).then(function() {
                    return Promise.resolve(e2.L("afterOnce", n2, o2)).then(function() {
                    });
                  });
                });
              }, function(t4) {
                e2.C = false, e2.logger.debug("Transition error [before/after/once]"), e2.logger.error(t4);
              });
              return Promise.resolve(u2 && u2.then ? u2.then(i2) : i2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.doPage = function(t3) {
            var n2 = t3.data, r3 = t3.transition, i2 = t3.page, e2 = t3.wrapper;
            try {
              var o2 = function(t4) {
                u2.C = false;
              }, u2 = this, s2 = r3 || {}, f2 = true === s2.sync || false;
              u2.C = true;
              var c2 = V(function() {
                function t4() {
                  return Promise.resolve(u2.L("before", n2, s2)).then(function() {
                    function t5(t6) {
                      return Promise.resolve(u2.remove(n2)).then(function() {
                        return Promise.resolve(u2.L("after", n2, s2)).then(function() {
                        });
                      });
                    }
                    var r5 = function() {
                      if (f2) return V(function() {
                        return Promise.resolve(u2.add(n2, e2)).then(function() {
                          return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                            return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                              return Promise.resolve(Promise.all([u2.leave(n2, s2), u2.enter(n2, s2)])).then(function() {
                                return Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                                  return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                  });
                                });
                              });
                            });
                          });
                        });
                      }, function(t7) {
                        if (u2.H(t7)) throw new W(t7, "Transition error [sync]");
                      });
                      var t6 = function(t7) {
                        return V(function() {
                          var t8 = function() {
                            if (false !== r6) return Promise.resolve(u2.add(n2, e2)).then(function() {
                              return Promise.resolve(u2.L("beforeEnter", n2, s2)).then(function() {
                                return Promise.resolve(u2.enter(n2, s2, r6)).then(function() {
                                  return Promise.resolve(u2.L("afterEnter", n2, s2)).then(function() {
                                  });
                                });
                              });
                            });
                          }();
                          if (t8 && t8.then) return t8.then(function() {
                          });
                        }, function(t8) {
                          if (u2.H(t8)) throw new W(t8, "Transition error [before/after/enter]");
                        });
                      }, r6 = false, o3 = V(function() {
                        return Promise.resolve(u2.L("beforeLeave", n2, s2)).then(function() {
                          return Promise.resolve(Promise.all([u2.leave(n2, s2), g(i2, n2)]).then(function(t7) {
                            return t7[0];
                          })).then(function(t7) {
                            return r6 = t7, Promise.resolve(u2.L("afterLeave", n2, s2)).then(function() {
                            });
                          });
                        });
                      }, function(t7) {
                        if (u2.H(t7)) throw new W(t7, "Transition error [before/after/leave]");
                      });
                      return o3 && o3.then ? o3.then(t6) : t6();
                    }();
                    return r5 && r5.then ? r5.then(t5) : t5();
                  });
                }
                var r4 = function() {
                  if (f2) return Promise.resolve(g(i2, n2)).then(function() {
                  });
                }();
                return r4 && r4.then ? r4.then(t4) : t4();
              }, function(t4) {
                if (u2.C = false, t4.name && "BarbaError" === t4.name) throw u2.logger.debug(t4.label), u2.logger.error(t4.error), t4;
                throw u2.logger.debug("Transition error [page]"), u2.logger.error(t4), t4;
              });
              return Promise.resolve(c2 && c2.then ? c2.then(o2) : o2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.once = function(t3, n2) {
            try {
              return Promise.resolve(L.do("once", t3, n2)).then(function() {
                return n2.once ? S(n2.once, n2)(t3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.leave = function(t3, n2) {
            try {
              return Promise.resolve(L.do("leave", t3, n2)).then(function() {
                return n2.leave ? S(n2.leave, n2)(t3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.enter = function(t3, n2, r3) {
            try {
              return Promise.resolve(L.do("enter", t3, n2)).then(function() {
                return n2.enter ? S(n2.enter, n2)(t3, r3) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.add = function(t3, n2) {
            try {
              return b.addContainer(t3.next.container, n2), L.do("nextAdded", t3), Promise.resolve();
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.remove = function(t3) {
            try {
              return b.removeContainer(t3.current.container), L.do("currentRemoved", t3), Promise.resolve();
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, r2.H = function(t3) {
            return t3.message ? !/Timeout error|Fetch error/.test(t3.message) : !t3.status;
          }, r2.L = function(t3, n2, r3) {
            try {
              return Promise.resolve(L.do(t3, n2, r3)).then(function() {
                return r3[t3] ? S(r3[t3], r3)(n2) : Promise.resolve();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, n(t2, [{ key: "isRunning", get: function() {
            return this.C;
          }, set: function(t3) {
            this.C = t3;
          } }, { key: "hasOnce", get: function() {
            return this.store.once.length > 0;
          } }, { key: "hasSelf", get: function() {
            return this.store.all.some(function(t3) {
              return "self" === t3.name;
            });
          } }, { key: "shouldWait", get: function() {
            return this.store.all.some(function(t3) {
              return t3.to && !t3.to.route || t3.sync;
            });
          } }]), t2;
        }(), Z = /* @__PURE__ */ function() {
          function t2(t3) {
            var n2 = this;
            this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"], this.byNamespace = /* @__PURE__ */ new Map(), 0 !== t3.length && (t3.forEach(function(t4) {
              n2.byNamespace.set(t4.namespace, t4);
            }), this.names.forEach(function(t4) {
              L[t4](n2._(t4));
            }));
          }
          return t2.prototype._ = function(t3) {
            var n2 = this;
            return function(r2) {
              var i2 = t3.match(/enter/i) ? r2.next : r2.current, e2 = n2.byNamespace.get(i2.namespace);
              return e2 && e2[t3] ? S(e2[t3], e2)(r2) : Promise.resolve();
            };
          }, t2;
        }();
        Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(t2) {
          var n2 = this;
          do {
            if (n2.matches(t2)) return n2;
            n2 = n2.parentElement || n2.parentNode;
          } while (null !== n2 && 1 === n2.nodeType);
          return null;
        });
        var tt = { container: null, html: "", namespace: "", url: { hash: "", href: "", path: "", port: null, query: {} } }, nt = /* @__PURE__ */ function() {
          function t2() {
            this.version = "2.10.3", this.schemaPage = tt, this.Logger = d, this.logger = new d("@barba/core"), this.plugins = [], this.timeout = void 0, this.cacheIgnore = void 0, this.cacheFirstPage = void 0, this.prefetchIgnore = void 0, this.preventRunning = void 0, this.hooks = L, this.cache = void 0, this.headers = void 0, this.prevent = void 0, this.transitions = void 0, this.views = void 0, this.dom = b, this.helpers = x, this.history = P, this.request = M, this.url = j, this.D = void 0, this.B = void 0, this.q = void 0, this.F = void 0;
          }
          var i2 = t2.prototype;
          return i2.use = function(t3, n2) {
            var r2 = this.plugins;
            r2.indexOf(t3) > -1 ? this.logger.warn("Plugin [" + t3.name + "] already installed.") : "function" == typeof t3.install ? (t3.install(this, n2), r2.push(t3)) : this.logger.warn("Plugin [" + t3.name + '] has no "install" method.');
          }, i2.init = function(t3) {
            var n2 = void 0 === t3 ? {} : t3, i3 = n2.transitions, e2 = void 0 === i3 ? [] : i3, o2 = n2.views, u2 = void 0 === o2 ? [] : o2, s2 = n2.schema, f2 = void 0 === s2 ? m : s2, c2 = n2.requestError, a2 = n2.timeout, h2 = void 0 === a2 ? 2e3 : a2, v2 = n2.cacheIgnore, l2 = void 0 !== v2 && v2, p2 = n2.cacheFirstPage, w2 = void 0 !== p2 && p2, b2 = n2.prefetchIgnore, y2 = void 0 !== b2 && b2, P2 = n2.preventRunning, g2 = void 0 !== P2 && P2, E2 = n2.prevent, x2 = void 0 === E2 ? null : E2, R2 = n2.debug, k2 = n2.logLevel;
            if (d.setLevel(true === (void 0 !== R2 && R2) ? "debug" : void 0 === k2 ? "off" : k2), this.logger.info(this.version), Object.keys(f2).forEach(function(t4) {
              m[t4] && (m[t4] = f2[t4]);
            }), this.B = c2, this.timeout = h2, this.cacheIgnore = l2, this.cacheFirstPage = w2, this.prefetchIgnore = y2, this.preventRunning = g2, this.q = this.dom.getWrapper(), !this.q) throw new Error("[@barba/core] No Barba wrapper found");
            this.I();
            var O2 = this.data.current;
            if (!O2.container) throw new Error("[@barba/core] No Barba container found");
            if (this.cache = new _(l2), this.headers = new D(), this.prevent = new J(y2), this.transitions = new Y(e2), this.views = new Z(u2), null !== x2) {
              if ("function" != typeof x2) throw new Error("[@barba/core] Prevent should be a function");
              this.prevent.add("preventCustom", x2);
            }
            this.history.init(O2.url.href, O2.namespace), w2 && this.cache.set(O2.url.href, Promise.resolve({ html: O2.html, url: O2.url }), "init", "fulfilled"), this.U = this.U.bind(this), this.$ = this.$.bind(this), this.X = this.X.bind(this), this.G(), this.plugins.forEach(function(t4) {
              return t4.init();
            });
            var T2 = this.data;
            T2.trigger = "barba", T2.next = T2.current, T2.current = r({}, this.schemaPage), this.hooks.do("ready", T2), this.once(T2), this.I();
          }, i2.destroy = function() {
            this.I(), this.J(), this.history.clear(), this.hooks.clear(), this.plugins = [];
          }, i2.force = function(t3) {
            window.location.assign(t3);
          }, i2.go = function(t3, n2, r2) {
            var i3;
            if (void 0 === n2 && (n2 = "barba"), this.F = null, this.transitions.isRunning) this.force(t3);
            else if (!(i3 = "popstate" === n2 ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t3) && this.url.getQuery(this.history.current.url, true) === this.url.getQuery(t3, true) : this.prevent.run("sameUrl", null, null, t3)) || this.transitions.hasSelf) return n2 = this.history.change(this.cache.has(t3) ? this.cache.get(t3).target : t3, n2, r2), r2 && (r2.stopPropagation(), r2.preventDefault()), this.page(t3, n2, null != r2 ? r2 : void 0, i3);
          }, i2.once = function(t3) {
            try {
              var n2 = this;
              return Promise.resolve(n2.hooks.do("beforeEnter", t3)).then(function() {
                function r2() {
                  return Promise.resolve(n2.hooks.do("afterEnter", t3)).then(function() {
                  });
                }
                var i3 = function() {
                  if (n2.transitions.hasOnce) {
                    var r3 = n2.transitions.get(t3, { once: true });
                    return Promise.resolve(n2.transitions.doOnce({ transition: r3, data: t3 })).then(function() {
                    });
                  }
                }();
                return i3 && i3.then ? i3.then(r2) : r2();
              });
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, i2.page = function(t3, n2, i3, e2) {
            try {
              var o2, u2 = function() {
                var t4 = s2.data;
                return Promise.resolve(s2.hooks.do("page", t4)).then(function() {
                  var n3 = function(n4, r2) {
                    try {
                      var i4 = (u3 = s2.transitions.get(t4, { once: false, self: e2 }), Promise.resolve(s2.transitions.doPage({ data: t4, page: o2, transition: u3, wrapper: s2.q })).then(function() {
                        s2.I();
                      }));
                    } catch (t5) {
                      return r2();
                    }
                    var u3;
                    return i4 && i4.then ? i4.then(void 0, r2) : i4;
                  }(0, function() {
                    0 === d.getLevel() && s2.force(t4.next.url.href);
                  });
                  if (n3 && n3.then) return n3.then(function() {
                  });
                });
              }, s2 = this;
              if (s2.data.next.url = r({ href: t3 }, s2.url.parse(t3)), s2.data.trigger = n2, s2.data.event = i3, s2.cache.has(t3)) o2 = s2.cache.update(t3, { action: "click" }).request;
              else {
                var f2 = s2.request(t3, s2.timeout, s2.onRequestError.bind(s2, n2), s2.cache, s2.headers);
                f2.then(function(r2) {
                  r2.url.href !== t3 && s2.history.add(r2.url.href, n2, "replace");
                }), o2 = s2.cache.set(t3, f2, "click", "pending").request;
              }
              var c2 = function() {
                if (s2.transitions.shouldWait) return Promise.resolve(g(o2, s2.data)).then(function() {
                });
              }();
              return Promise.resolve(c2 && c2.then ? c2.then(u2) : u2());
            } catch (t4) {
              return Promise.reject(t4);
            }
          }, i2.onRequestError = function(t3) {
            this.transitions.isRunning = false;
            var n2 = [].slice.call(arguments, 1), r2 = n2[0], i3 = n2[1], e2 = this.cache.getAction(r2);
            return this.cache.delete(r2), this.B && false === this.B(t3, e2, r2, i3) || "click" === e2 && this.force(r2), false;
          }, i2.prefetch = function(t3) {
            var n2 = this;
            t3 = this.url.getAbsoluteHref(t3), this.cache.has(t3) || this.cache.set(t3, this.request(t3, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(t4) {
              n2.logger.error(t4);
            }), "prefetch", "pending");
          }, i2.G = function() {
            true !== this.prefetchIgnore && (document.addEventListener("mouseover", this.U), document.addEventListener("touchstart", this.U)), document.addEventListener("click", this.$), window.addEventListener("popstate", this.X);
          }, i2.J = function() {
            true !== this.prefetchIgnore && (document.removeEventListener("mouseover", this.U), document.removeEventListener("touchstart", this.U)), document.removeEventListener("click", this.$), window.removeEventListener("popstate", this.X);
          }, i2.U = function(t3) {
            var n2 = this, r2 = this.W(t3);
            if (r2) {
              var i3 = this.url.getAbsoluteHref(this.dom.getHref(r2));
              this.prevent.checkHref(i3) || this.cache.has(i3) || this.cache.set(i3, this.request(i3, this.timeout, this.onRequestError.bind(this, r2), this.cache, this.headers).catch(function(t4) {
                n2.logger.error(t4);
              }), "enter", "pending");
            }
          }, i2.$ = function(t3) {
            var n2 = this.W(t3);
            if (n2) {
              if (this.transitions.isRunning && this.preventRunning) return t3.preventDefault(), void t3.stopPropagation();
              this.F = t3, this.go(this.dom.getHref(n2), n2, t3);
            }
          }, i2.X = function(t3) {
            this.go(this.url.getHref(), "popstate", t3);
          }, i2.W = function(t3) {
            for (var n2 = t3.target; n2 && !this.dom.getHref(n2); ) n2 = n2.parentNode;
            if (n2 && !this.prevent.checkLink(n2, t3, this.dom.getHref(n2))) return n2;
          }, i2.I = function() {
            var t3 = this.url.getHref(), n2 = { container: this.dom.getContainer(), html: this.dom.getHtml(), namespace: this.dom.getNamespace(), url: r({ href: t3 }, this.url.parse(t3)) };
            this.D = { current: n2, event: void 0, next: r({}, this.schemaPage), trigger: void 0 }, this.hooks.do("reset", this.data);
          }, n(t2, [{ key: "data", get: function() {
            return this.D;
          } }, { key: "wrapper", get: function() {
            return this.q;
          } }]), t2;
        }();
        return new nt();
      });
    }
  });

  // src/index.ts
  init_live_reload();

  // src/features/barba.ts
  init_live_reload();
  var import_core = __toESM(require_barba_umd(), 1);

  // src/features/nav.ts
  init_live_reload();
  var SELECTORS = {
    wrapper: '[data-nav="wrapper"]',
    drawer: ".drawer",
    toggle: '[data-nav="toggle"]',
    links: '[data-nav="links"] .nav-link',
    openIcon: '[data-nav-icon="open"]',
    closeIcon: '[data-nav-icon="close"]'
  };
  var getNavElements = () => {
    const wrapper = document.querySelector(SELECTORS.drawer) || document.querySelector(SELECTORS.wrapper);
    const toggle = document.querySelector(SELECTORS.toggle);
    const openIcon = document.querySelector(SELECTORS.openIcon);
    const closeIcon = document.querySelector(SELECTORS.closeIcon);
    const links = Array.from(document.querySelectorAll(SELECTORS.links));
    if (!wrapper || !toggle || !openIcon || !closeIcon) {
      return null;
    }
    return { wrapper, toggle, openIcon, closeIcon, links };
  };
  var NAV_OPEN_CLASS = "is-nav-open";
  var NAV_LINKS_VISIBLE_CLASS = "are-nav-links-visible";
  var LINKS_FADE_DURATION = 320;
  var forceCloseNav = () => {
    const elements = getNavElements();
    if (!elements) {
      return;
    }
    const { wrapper, toggle, openIcon, closeIcon } = elements;
    wrapper.classList.remove(NAV_OPEN_CLASS, NAV_LINKS_VISIBLE_CLASS);
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-pressed", "false");
    openIcon.toggleAttribute("aria-hidden", false);
    closeIcon.toggleAttribute("aria-hidden", true);
    openIcon.hidden = false;
    closeIcon.hidden = true;
  };
  var setNavVisible = (isVisible) => {
    const elements = getNavElements();
    if (!elements) return;
    const { wrapper } = elements;
    wrapper.style.opacity = isVisible ? "1" : "0";
    wrapper.style.pointerEvents = isVisible ? "" : "none";
    wrapper.style.visibility = isVisible ? "" : "hidden";
  };
  var initNavInteractions = () => {
    const elements = getNavElements();
    if (!elements) {
      return null;
    }
    const { wrapper, toggle, openIcon, closeIcon, links } = elements;
    const hoverMediaQuery = window.matchMedia("(hover: hover)");
    const state = {
      isOpen: false,
      isLockedOpen: false,
      hoverEnabled: hoverMediaQuery.matches
    };
    let hideLinksTimeout = null;
    const reflectIcons = () => {
      openIcon.toggleAttribute("aria-hidden", state.isOpen);
      closeIcon.toggleAttribute("aria-hidden", !state.isOpen);
      openIcon.hidden = state.isOpen;
      closeIcon.hidden = !state.isOpen;
    };
    const applyState = () => {
      wrapper.classList.toggle(NAV_OPEN_CLASS, state.isOpen);
      toggle.setAttribute("aria-expanded", String(state.isOpen));
      toggle.setAttribute("aria-pressed", String(state.isOpen));
      reflectIcons();
    };
    const resetNavState = () => {
      state.isOpen = false;
      state.isLockedOpen = false;
      wrapper.classList.remove(NAV_OPEN_CLASS, NAV_LINKS_VISIBLE_CLASS);
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-pressed", "false");
      reflectIcons();
    };
    const nextFrame = (callback) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(callback);
      });
    };
    const showLinks = () => {
      if (hideLinksTimeout !== null) {
        window.clearTimeout(hideLinksTimeout);
        hideLinksTimeout = null;
      }
      wrapper.classList.add(NAV_LINKS_VISIBLE_CLASS);
    };
    const scheduleHideLinks = () => {
      if (hideLinksTimeout !== null) {
        window.clearTimeout(hideLinksTimeout);
      }
      hideLinksTimeout = window.setTimeout(() => {
        if (state.isOpen) {
          return;
        }
        wrapper.classList.remove(NAV_LINKS_VISIBLE_CLASS);
      }, LINKS_FADE_DURATION);
    };
    const openNav = (lockOpen) => {
      showLinks();
      nextFrame(() => {
        state.isOpen = true;
        state.isLockedOpen = lockOpen ? true : state.isLockedOpen;
        applyState();
      });
    };
    const closeNav = () => {
      state.isOpen = false;
      state.isLockedOpen = false;
      applyState();
      scheduleHideLinks();
    };
    const toggleNav = () => {
      if (state.isOpen) {
        closeNav();
      } else {
        openNav(true);
      }
    };
    const handleHoverEnter = () => {
      if (!state.hoverEnabled || state.isLockedOpen) {
        return;
      }
      openNav(false);
    };
    const handleHoverLeave = () => {
      if (!state.hoverEnabled || state.isLockedOpen) {
        return;
      }
      closeNav();
    };
    const handleHoverChange = (event) => {
      state.hoverEnabled = event.matches;
      if (!state.hoverEnabled && state.isOpen && !state.isLockedOpen) {
        closeNav();
      }
    };
    const handleToggleClick = (event) => {
      event.preventDefault();
      toggleNav();
    };
    const handleToggleKeyDown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      toggleNav();
    };
    const handleLinkClick = () => {
      closeNav();
    };
    toggle.setAttribute("role", "button");
    toggle.tabIndex = toggle.tabIndex > -1 ? toggle.tabIndex : 0;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-pressed", "false");
    toggle.setAttribute("aria-label", "Toggle navigation");
    reflectIcons();
    wrapper.addEventListener("mouseenter", handleHoverEnter);
    wrapper.addEventListener("mouseleave", handleHoverLeave);
    hoverMediaQuery.addEventListener("change", handleHoverChange);
    toggle.addEventListener("click", handleToggleClick);
    toggle.addEventListener("keydown", handleToggleKeyDown);
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });
    return () => {
      if (hideLinksTimeout !== null) {
        window.clearTimeout(hideLinksTimeout);
        hideLinksTimeout = null;
      }
      wrapper.removeEventListener("mouseenter", handleHoverEnter);
      wrapper.removeEventListener("mouseleave", handleHoverLeave);
      hoverMediaQuery.removeEventListener("change", handleHoverChange);
      toggle.removeEventListener("click", handleToggleClick);
      toggle.removeEventListener("keydown", handleToggleKeyDown);
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      resetNavState();
    };
  };

  // src/features/barba.ts
  var BARBA_WRAPPER_SELECTOR = '[data-barba="wrapper"]';
  var DRAWER_SELECTOR = '.drawer, [data-nav="wrapper"]';
  var CLOSE_SELECTOR = '[data-nav="close-project"]';
  var DRAWER_OPEN_CLASS = "is-drawer-open";
  var PERIPHERAL_BODY_CLASS = "is-in-peripheral";
  var TRANSITION_DURATION = 700;
  var EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
  var DRAWER_GAP = "5rem";
  var OFFSCREEN_TRANSLATE = "calc(100vw - var(--drawer-gap, 5rem))";
  var BARBA_CONTAINER_SELECTOR = '[data-barba="container"]';
  var LOGO_PARENT_CANDIDATES = ["[data-logo-parent]", ".logo-2"];
  var LOGO_WRAPPER_SELECTOR = ".logo-wrapper";
  var LOGO_FULL_FALLBACK_SELECTOR = ".logo:not(.icon)";
  var LOGO_ICON_FALLBACK_SELECTOR = ".logo.icon";
  var setCssVars = () => {
    if (!document.documentElement.style.getPropertyValue("--drawer-gap")) {
      document.documentElement.style.setProperty("--drawer-gap", DRAWER_GAP);
    }
  };
  var getDrawer = () => document.querySelector(DRAWER_SELECTOR);
  var getCloseTrigger = () => document.querySelector(CLOSE_SELECTOR);
  var getLogoElements = () => {
    const parent = LOGO_PARENT_CANDIDATES.reduce((found, selector) => {
      if (found) return found;
      return document.querySelector(selector);
    }, null);
    if (!parent) {
      return { parent: null, full: void 0, icon: void 0 };
    }
    const wrappers = parent.querySelectorAll(LOGO_WRAPPER_SELECTOR);
    if (wrappers.length >= 2) {
      return {
        parent,
        full: wrappers[0],
        icon: wrappers[1]
      };
    }
    const fullEmbed = parent.querySelector(LOGO_FULL_FALLBACK_SELECTOR) ?? void 0;
    const iconEmbed = parent.querySelector(LOGO_ICON_FALLBACK_SELECTOR) ?? void 0;
    if (fullEmbed && iconEmbed) {
      return { parent, full: fullEmbed, icon: iconEmbed };
    }
    return { parent, full: void 0, icon: void 0 };
  };
  var getNamespace = (container) => container?.getAttribute("data-barba-namespace") ?? null;
  var isPeripheralNamespace = (ns) => Boolean(ns && ns !== "home");
  var updateBodyAttributes = (nextHtml) => {
    const parsed = new DOMParser().parseFromString(nextHtml, "text/html");
    const nextBody = parsed.body;
    if (!nextBody) {
      return;
    }
    document.body.className = nextBody.className;
    const wfPage = nextBody.getAttribute("data-wf-page");
    if (wfPage) {
      document.body.setAttribute("data-wf-page", wfPage);
    } else {
      document.body.removeAttribute("data-wf-page");
    }
  };
  var reinitializeWebflow = () => {
    const webflow = window.Webflow;
    if (!webflow) {
      return;
    }
    if (webflow.destroy) {
      webflow.destroy();
    }
    if (webflow.ready) {
      webflow.ready();
    }
    const ix2 = webflow.require?.("ix2");
    if (ix2?.init) {
      ix2.init();
    }
  };
  var shouldPrevent = (el, href) => {
    if (!href) {
      return true;
    }
    if (el?.closest("[data-barba-prevent]")) {
      return true;
    }
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      return true;
    }
    if (el?.getAttribute("target") === "_blank") {
      return true;
    }
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) {
      return true;
    }
    return false;
  };
  var waitForTransition = (element) => new Promise((resolve) => {
    const timeout = window.setTimeout(resolve, TRANSITION_DURATION + 50);
    const handler = (event) => {
      if (event.target !== element || event.propertyName !== "transform") {
        return;
      }
      element.removeEventListener("transitionend", handler);
      window.clearTimeout(timeout);
      resolve();
    };
    element.addEventListener("transitionend", handler);
  });
  var ensureDrawerBaseStyles = () => {
    const drawer = getDrawer();
    if (!drawer) {
      return;
    }
    drawer.style.willChange = drawer.style.willChange || "transform";
    drawer.style.transitionProperty = drawer.style.transitionProperty || "transform";
  };
  var setLogoState = (isPeripheral) => {
    const { parent, full, icon } = getLogoElements();
    if (!parent || !full || !icon) return;
    if (window.getComputedStyle(parent).position === "static") {
      parent.style.setProperty("position", "relative");
    }
    const commonStyles = {
      position: "absolute",
      left: "0",
      top: "0",
      transition: `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`
    };
    Object.assign(full.style, commonStyles, {
      opacity: isPeripheral ? "0" : "1",
      transform: isPeripheral ? "scale(0.8)" : "scale(1)",
      pointerEvents: isPeripheral ? "none" : "auto"
    });
    full.style.setProperty("opacity", isPeripheral ? "0" : "1", "important");
    full.style.setProperty("pointer-events", isPeripheral ? "none" : "auto", "important");
    full.style.setProperty("transform", isPeripheral ? "scale(0.8)" : "scale(1)", "important");
    full.style.setProperty("z-index", "100", "important");
    Object.assign(icon.style, commonStyles, {
      // base styles
    });
    icon.style.setProperty("opacity", isPeripheral ? "1" : "0", "important");
    icon.style.setProperty("pointer-events", isPeripheral ? "auto" : "none", "important");
    icon.style.setProperty("transform", isPeripheral ? "scale(1)" : "scale(1.2)", "important");
    icon.style.setProperty("z-index", "100", "important");
  };
  var animateLogo = async (toPeripheral) => {
    const { parent, full, icon } = getLogoElements();
    if (!parent || !full || !icon) return;
    const transition = `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`;
    full.style.transition = transition;
    icon.style.transition = transition;
    full.style.position = "absolute";
    full.style.left = "0";
    full.style.top = "0";
    icon.style.position = "absolute";
    icon.style.left = "0";
    icon.style.top = "0";
    void full.getBoundingClientRect();
    requestAnimationFrame(() => {
      setLogoState(toPeripheral);
    });
  };
  var applyDrawerLayout = (drawer, isPeripheral, skipWidth = false) => {
    if (isPeripheral) {
      drawer.style.position = "fixed";
      drawer.style.top = "0";
      drawer.style.right = "0";
      drawer.style.bottom = "0";
      drawer.style.left = "";
      if (!skipWidth) {
        drawer.style.setProperty(
          "width",
          `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
          "important"
        );
      }
      drawer.style.setProperty("max-width", "none", "important");
    } else {
      drawer.style.position = "absolute";
      drawer.style.top = "";
      drawer.style.right = "";
      drawer.style.bottom = "";
      drawer.style.left = "";
      drawer.style.removeProperty("width");
      drawer.style.removeProperty("max-width");
    }
  };
  var resetDrawerStylesForHome = () => {
    const drawer = getDrawer();
    if (!drawer) {
      return;
    }
    drawer.classList.remove(DRAWER_OPEN_CLASS);
    drawer.style.removeProperty("transform");
    drawer.style.removeProperty("transition-property");
    drawer.style.removeProperty("transition-duration");
    drawer.style.removeProperty("transition-timing-function");
    drawer.style.removeProperty("will-change");
  };
  var setDrawerState = (drawer, isOpen, animate = true, keepTransform = true, forceImportant = false) => {
    drawer.classList.toggle(DRAWER_OPEN_CLASS, isOpen);
    const priority = forceImportant ? "important" : "";
    drawer.style.setProperty("transition-property", "transform", priority);
    drawer.style.setProperty(
      "transition-duration",
      animate ? `${TRANSITION_DURATION}ms` : "0ms",
      priority
    );
    drawer.style.setProperty("transition-timing-function", EASING, priority);
    if (!keepTransform && !isOpen) {
      drawer.style.removeProperty("transform");
      if (!forceImportant) {
        drawer.style.removeProperty("transition-duration");
      }
      return;
    }
    drawer.style.setProperty(
      "transform",
      isOpen ? "translateX(0)" : `translateX(calc(100% - var(--drawer-gap, ${DRAWER_GAP})))`,
      priority
    );
  };
  var animateDrawer = async (isOpen, forceImportant = false) => {
    const drawer = getDrawer();
    if (!drawer) {
      return;
    }
    void drawer.getBoundingClientRect();
    await new Promise((resolve) => {
      window.requestAnimationFrame(() => {
        setDrawerState(drawer, isOpen, true, true, forceImportant);
        waitForTransition(drawer).then(resolve);
      });
    });
  };
  var setCloseTriggerVisible = (isVisible) => {
    const close = getCloseTrigger();
    if (!close) {
      return;
    }
    close.classList.toggle("is-visible", isVisible);
    close.style.pointerEvents = isVisible ? "auto" : "none";
    close.style.display = isVisible ? "" : "none";
    close.style.zIndex = "30";
    close.setAttribute("aria-hidden", String(!isVisible));
  };
  var prepareContainer = (container, isPeripheral) => {
    const { style } = container;
    style.position = isPeripheral ? "fixed" : "relative";
    style.top = isPeripheral ? "0" : "";
    style.right = isPeripheral ? "0" : "";
    style.bottom = isPeripheral ? "0" : "";
    style.left = isPeripheral ? `var(--drawer-gap, ${DRAWER_GAP})` : "";
    style.width = isPeripheral ? `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))` : "100%";
    style.maxWidth = isPeripheral ? "none" : "";
    style.minHeight = style.minHeight || "100vh";
    style.overflowY = isPeripheral ? "auto" : "";
    style.willChange = "transform, opacity";
    style.zIndex = isPeripheral ? "20" : "0";
  };
  var placeContainerOffscreen = (container) => {
    const { style } = container;
    style.setProperty("transition", "none", "important");
    style.setProperty("transform", `translateX(${OFFSCREEN_TRANSLATE})`, "important");
  };
  var animateContainerTo = async (container, translateX) => {
    const { style } = container;
    style.setProperty("will-change", "transform, opacity");
    void container.getBoundingClientRect();
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        style.setProperty("transition-property", "transform, opacity", "important");
        style.setProperty("transition-duration", `${TRANSITION_DURATION}ms`, "important");
        style.setProperty("transition-timing-function", EASING, "important");
        style.setProperty("transform", translateX, "important");
        waitForTransition(container).then(resolve);
      });
    });
  };
  var hideCurrentContainer = (container) => {
    if (!container) return;
    container.style.setProperty("opacity", "0", "important");
    container.style.pointerEvents = "none";
  };
  var syncInitialState = () => {
    const container = document.querySelector(BARBA_CONTAINER_SELECTOR);
    const drawer = getDrawer();
    const ns = getNamespace(container);
    const isPeripheral = isPeripheralNamespace(ns);
    document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheral);
    setCloseTriggerVisible(isPeripheral);
    setLogoState(isPeripheral);
    if (drawer) {
      if (isPeripheral) {
        ensureDrawerBaseStyles();
        applyDrawerLayout(drawer, true);
        setDrawerState(drawer, true, false, true);
      } else {
        resetDrawerStylesForHome();
        applyDrawerLayout(drawer, false);
      }
    }
    if (container) {
      prepareContainer(container, isPeripheral);
      container.style.transition = "none";
      container.style.transform = "translateX(0)";
    }
  };
  var initBarba = ({ onAfterEnter, onBeforeLeave }) => {
    if (!document.querySelector(BARBA_WRAPPER_SELECTOR)) {
      return;
    }
    setCssVars();
    ensureDrawerBaseStyles();
    syncInitialState();
    import_core.default.init({
      preventRunning: true,
      prevent: ({ el, href }) => shouldPrevent(el, href),
      transitions: [
        {
          name: "home-to-peripheral",
          from: { namespace: ["home"] },
          to: { namespace: ["verkada", "film", "about", "work"] },
          sync: true,
          beforeEnter: ({ next }) => {
            const nextContainer = next.container;
            if (!nextContainer) return;
            const drawers = document.querySelectorAll(DRAWER_SELECTOR);
            let startWidth = 0;
            let wasNavOpen = false;
            if (drawers.length > 0) {
              const sourceDrawer = drawers[0];
              wasNavOpen = document.body.classList.contains("is-nav-open") || sourceDrawer.classList.contains("is-nav-open");
              startWidth = sourceDrawer.getBoundingClientRect().width;
            }
            animateLogo(true);
            const nextNs = getNamespace(next.container);
            document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
            document.body.classList.remove("is-nav-open");
            setCloseTriggerVisible(true);
            ensureDrawerBaseStyles();
            if (drawers.length > 0) {
              drawers.forEach((drawer) => {
                drawer.classList.remove("is-nav-open");
                drawer.style.setProperty("position", "fixed", "important");
                drawer.style.setProperty("top", "0", "important");
                drawer.style.setProperty("bottom", "0", "important");
                drawer.style.setProperty("right", "0", "important");
                drawer.style.setProperty("left", "auto", "important");
                if (startWidth > 0) {
                  drawer.style.setProperty("width", `${startWidth}px`, "important");
                }
                drawer.style.setProperty("max-width", "none", "important");
                drawer.style.setProperty("transform", "none", "important");
                drawer.style.setProperty("transition", "none", "important");
                void drawer.offsetWidth;
              });
            }
            prepareContainer(nextContainer, true);
            placeContainerOffscreen(nextContainer);
            nextContainer.style.setProperty("opacity", "1", "important");
          },
          leave: async ({ current, next }) => {
            onBeforeLeave?.();
            hideCurrentContainer(current?.container);
            const nextContainer = next.container;
            if (nextContainer) {
              prepareContainer(nextContainer, true);
              placeContainerOffscreen(nextContainer);
              nextContainer.style.setProperty("opacity", "1", "important");
            }
          },
          enter: async ({ next }) => {
            const animations = [];
            const nextContainer = next.container;
            if (nextContainer) {
              animations.push(animateContainerTo(nextContainer, "translateX(0)"));
            }
            const drawers = document.querySelectorAll(DRAWER_SELECTOR);
            if (drawers.length > 0) {
              animations.push(
                new Promise((resolve) => {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      drawers.forEach((drawer) => {
                        drawer.style.setProperty(
                          "transition",
                          `width ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`,
                          "important"
                        );
                        drawer.style.setProperty(
                          "width",
                          `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
                          "important"
                        );
                      });
                      waitForTransition(drawers[0]).then(resolve);
                    });
                  });
                })
              );
            }
            await Promise.all(animations);
          }
        },
        {
          name: "peripheral-to-home",
          from: { namespace: ["verkada", "film", "about", "work"] },
          to: { namespace: ["home"] },
          sync: true,
          beforeEnter: ({ next }) => {
            const nextContainer = next.container;
            if (!nextContainer) return;
            prepareContainer(nextContainer, false);
            nextContainer.style.transition = "none";
            nextContainer.style.transform = "translateX(0)";
            nextContainer.style.opacity = "0";
            setCloseTriggerVisible(false);
          },
          leave: async ({ current }) => {
            onBeforeLeave?.();
            const animations = [];
            animateLogo(false);
            const currentContainer = current.container;
            if (currentContainer) {
              prepareContainer(currentContainer, true);
              animations.push(
                animateContainerTo(currentContainer, `translateX(${OFFSCREEN_TRANSLATE})`)
              );
            }
            const drawer = getDrawer();
            if (drawer) {
              applyDrawerLayout(drawer, true);
              animations.push(animateDrawer(false, true));
            }
            await Promise.all(animations);
          },
          enter: async ({ next }) => {
            const nextNs = getNamespace(next.container);
            document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
            setCloseTriggerVisible(false);
            setNavVisible(true);
            const drawer = getDrawer();
            if (drawer) {
              resetDrawerStylesForHome();
              applyDrawerLayout(drawer, false);
            }
            const nextContainer = next.container;
            if (nextContainer) {
              nextContainer.style.transitionProperty = "opacity";
              nextContainer.style.transitionDuration = `${TRANSITION_DURATION}ms`;
              nextContainer.style.transitionTimingFunction = EASING;
              nextContainer.style.opacity = "1";
            }
          },
          after: () => {
            const drawer = getDrawer();
            if (drawer) {
              resetDrawerStylesForHome();
              applyDrawerLayout(drawer, false);
            }
          }
        }
      ]
    });
    import_core.default.hooks.beforeEnter((data) => {
      updateBodyAttributes(data.next.html);
      window.scrollTo(0, 0);
    });
    import_core.default.hooks.afterEnter((data) => {
      const ns = getNamespace(data.next.container);
      document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(ns));
      setCloseTriggerVisible(isPeripheralNamespace(ns));
      reinitializeWebflow();
      onAfterEnter();
      if (ns === "home") {
        window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
          window.dispatchEvent(new Event("scroll"));
        });
      }
    });
  };

  // src/features/loopSlider.ts
  init_live_reload();

  // node_modules/.pnpm/lenis@1.3.16/node_modules/lenis/dist/lenis.mjs
  init_live_reload();
  var version = "1.3.16";
  function clamp(min, input, max) {
    return Math.max(min, Math.min(input, max));
  }
  function lerp(x, y, t) {
    return (1 - t) * x + t * y;
  }
  function damp(x, y, lambda, deltaTime) {
    return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
  }
  function modulo(n, d) {
    return (n % d + d) % d;
  }
  var Animate = class {
    isRunning = false;
    value = 0;
    from = 0;
    to = 0;
    currentTime = 0;
    // These are instanciated in the fromTo method
    lerp;
    duration;
    easing;
    onUpdate;
    /**
     * Advance the animation by the given delta time
     *
     * @param deltaTime - The time in seconds to advance the animation
     */
    advance(deltaTime) {
      if (!this.isRunning) return;
      let completed = false;
      if (this.duration && this.easing) {
        this.currentTime += deltaTime;
        const linearProgress = clamp(0, this.currentTime / this.duration, 1);
        completed = linearProgress >= 1;
        const easedProgress = completed ? 1 : this.easing(linearProgress);
        this.value = this.from + (this.to - this.from) * easedProgress;
      } else if (this.lerp) {
        this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
        if (Math.round(this.value) === this.to) {
          this.value = this.to;
          completed = true;
        }
      } else {
        this.value = this.to;
        completed = true;
      }
      if (completed) {
        this.stop();
      }
      this.onUpdate?.(this.value, completed);
    }
    /** Stop the animation */
    stop() {
      this.isRunning = false;
    }
    /**
     * Set up the animation from a starting value to an ending value
     * with optional parameters for lerping, duration, easing, and onUpdate callback
     *
     * @param from - The starting value
     * @param to - The ending value
     * @param options - Options for the animation
     */
    fromTo(from, to, { lerp: lerp2, duration, easing, onStart, onUpdate }) {
      this.from = this.value = from;
      this.to = to;
      this.lerp = lerp2;
      this.duration = duration;
      this.easing = easing;
      this.currentTime = 0;
      this.isRunning = true;
      onStart?.();
      this.onUpdate = onUpdate;
    }
  };
  function debounce(callback, delay) {
    let timer;
    return function(...args) {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = void 0;
        callback.apply(context, args);
      }, delay);
    };
  }
  var Dimensions = class {
    constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
      this.wrapper = wrapper;
      this.content = content;
      if (autoResize) {
        this.debouncedResize = debounce(this.resize, debounceValue);
        if (this.wrapper instanceof Window) {
          window.addEventListener("resize", this.debouncedResize, false);
        } else {
          this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
          this.wrapperResizeObserver.observe(this.wrapper);
        }
        this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
        this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    // These are instanciated in the constructor as they need information from the options
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    destroy() {
      this.wrapperResizeObserver?.disconnect();
      this.contentResizeObserver?.disconnect();
      if (this.wrapper === window && this.debouncedResize) {
        window.removeEventListener("resize", this.debouncedResize, false);
      }
    }
    resize = () => {
      this.onWrapperResize();
      this.onContentResize();
    };
    onWrapperResize = () => {
      if (this.wrapper instanceof Window) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      } else {
        this.width = this.wrapper.clientWidth;
        this.height = this.wrapper.clientHeight;
      }
    };
    onContentResize = () => {
      if (this.wrapper instanceof Window) {
        this.scrollHeight = this.content.scrollHeight;
        this.scrollWidth = this.content.scrollWidth;
      } else {
        this.scrollHeight = this.wrapper.scrollHeight;
        this.scrollWidth = this.wrapper.scrollWidth;
      }
    };
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height
      };
    }
  };
  var Emitter = class {
    events = {};
    /**
     * Emit an event with the given data
     * @param event Event name
     * @param args Data to pass to the event handlers
     */
    emit(event, ...args) {
      let callbacks = this.events[event] || [];
      for (let i = 0, length = callbacks.length; i < length; i++) {
        callbacks[i]?.(...args);
      }
    }
    /**
     * Add a callback to the event
     * @param event Event name
     * @param cb Callback function
     * @returns Unsubscribe function
     */
    on(event, cb) {
      this.events[event]?.push(cb) || (this.events[event] = [cb]);
      return () => {
        this.events[event] = this.events[event]?.filter((i) => cb !== i);
      };
    }
    /**
     * Remove a callback from the event
     * @param event Event name
     * @param callback Callback function
     */
    off(event, callback) {
      this.events[event] = this.events[event]?.filter((i) => callback !== i);
    }
    /**
     * Remove all event listeners and clean up
     */
    destroy() {
      this.events = {};
    }
  };
  var LINE_HEIGHT = 100 / 6;
  var listenerOptions = { passive: false };
  var VirtualScroll = class {
    constructor(element, options = { wheelMultiplier: 1, touchMultiplier: 1 }) {
      this.element = element;
      this.options = options;
      window.addEventListener("resize", this.onWindowResize, false);
      this.onWindowResize();
      this.element.addEventListener("wheel", this.onWheel, listenerOptions);
      this.element.addEventListener(
        "touchstart",
        this.onTouchStart,
        listenerOptions
      );
      this.element.addEventListener(
        "touchmove",
        this.onTouchMove,
        listenerOptions
      );
      this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
    }
    touchStart = {
      x: 0,
      y: 0
    };
    lastDelta = {
      x: 0,
      y: 0
    };
    window = {
      width: 0,
      height: 0
    };
    emitter = new Emitter();
    /**
     * Add an event listener for the given event and callback
     *
     * @param event Event name
     * @param callback Callback function
     */
    on(event, callback) {
      return this.emitter.on(event, callback);
    }
    /** Remove all event listeners and clean up */
    destroy() {
      this.emitter.destroy();
      window.removeEventListener("resize", this.onWindowResize, false);
      this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
      this.element.removeEventListener(
        "touchstart",
        this.onTouchStart,
        listenerOptions
      );
      this.element.removeEventListener(
        "touchmove",
        this.onTouchMove,
        listenerOptions
      );
      this.element.removeEventListener(
        "touchend",
        this.onTouchEnd,
        listenerOptions
      );
    }
    /**
     * Event handler for 'touchstart' event
     *
     * @param event Touch event
     */
    onTouchStart = (event) => {
      const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: 0,
        y: 0
      };
      this.emitter.emit("scroll", {
        deltaX: 0,
        deltaY: 0,
        event
      });
    };
    /** Event handler for 'touchmove' event */
    onTouchMove = (event) => {
      const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
      const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
      const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
      this.touchStart.x = clientX;
      this.touchStart.y = clientY;
      this.lastDelta = {
        x: deltaX,
        y: deltaY
      };
      this.emitter.emit("scroll", {
        deltaX,
        deltaY,
        event
      });
    };
    onTouchEnd = (event) => {
      this.emitter.emit("scroll", {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event
      });
    };
    /** Event handler for 'wheel' event */
    onWheel = (event) => {
      let { deltaX, deltaY, deltaMode } = event;
      const multiplierX = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.width : 1;
      const multiplierY = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.height : 1;
      deltaX *= multiplierX;
      deltaY *= multiplierY;
      deltaX *= this.options.wheelMultiplier;
      deltaY *= this.options.wheelMultiplier;
      this.emitter.emit("scroll", { deltaX, deltaY, event });
    };
    onWindowResize = () => {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };
  };
  var defaultEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
  var Lenis = class {
    _isScrolling = false;
    // true when scroll is animating
    _isStopped = false;
    // true if user should not be able to scroll - enable/disable programmatically
    _isLocked = false;
    // same as isStopped but enabled/disabled when scroll reaches target
    _preventNextNativeScrollEvent = false;
    _resetVelocityTimeout = null;
    __rafID = null;
    /**
     * Whether or not the user is touching the screen
     */
    isTouching;
    /**
     * The time in ms since the lenis instance was created
     */
    time = 0;
    /**
     * User data that will be forwarded through the scroll event
     *
     * @example
     * lenis.scrollTo(100, {
     *   userData: {
     *     foo: 'bar'
     *   }
     * })
     */
    userData = {};
    /**
     * The last velocity of the scroll
     */
    lastVelocity = 0;
    /**
     * The current velocity of the scroll
     */
    velocity = 0;
    /**
     * The direction of the scroll
     */
    direction = 0;
    /**
     * The options passed to the lenis instance
     */
    options;
    /**
     * The target scroll value
     */
    targetScroll;
    /**
     * The animated scroll value
     */
    animatedScroll;
    // These are instanciated here as they don't need information from the options
    animate = new Animate();
    emitter = new Emitter();
    // These are instanciated in the constructor as they need information from the options
    dimensions;
    // This is not private because it's used in the Snap class
    virtualScroll;
    constructor({
      wrapper = window,
      content = document.documentElement,
      eventsTarget = wrapper,
      smoothWheel = true,
      syncTouch = false,
      syncTouchLerp = 0.075,
      touchInertiaExponent = 1.7,
      duration,
      // in seconds
      easing,
      lerp: lerp2 = 0.1,
      infinite = false,
      orientation = "vertical",
      // vertical, horizontal
      gestureOrientation = orientation === "horizontal" ? "both" : "vertical",
      // vertical, horizontal, both
      touchMultiplier = 1,
      wheelMultiplier = 1,
      autoResize = true,
      prevent,
      virtualScroll,
      overscroll = true,
      autoRaf = false,
      anchors = false,
      autoToggle = false,
      // https://caniuse.com/?search=transition-behavior
      allowNestedScroll = false,
      __experimental__naiveDimensions = false
    } = {}) {
      window.lenisVersion = version;
      if (!wrapper || wrapper === document.documentElement) {
        wrapper = window;
      }
      if (typeof duration === "number" && typeof easing !== "function") {
        easing = defaultEasing;
      } else if (typeof easing === "function" && typeof duration !== "number") {
        duration = 1;
      }
      this.options = {
        wrapper,
        content,
        eventsTarget,
        smoothWheel,
        syncTouch,
        syncTouchLerp,
        touchInertiaExponent,
        duration,
        easing,
        lerp: lerp2,
        infinite,
        gestureOrientation,
        orientation,
        touchMultiplier,
        wheelMultiplier,
        autoResize,
        prevent,
        virtualScroll,
        overscroll,
        autoRaf,
        anchors,
        autoToggle,
        allowNestedScroll,
        __experimental__naiveDimensions
      };
      this.dimensions = new Dimensions(wrapper, content, { autoResize });
      this.updateClassName();
      this.targetScroll = this.animatedScroll = this.actualScroll;
      this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false);
      this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
        capture: true
      });
      if (this.options.anchors && this.options.wrapper === window) {
        this.options.wrapper.addEventListener(
          "click",
          this.onClick,
          false
        );
      }
      this.options.wrapper.addEventListener(
        "pointerdown",
        this.onPointerDown,
        false
      );
      this.virtualScroll = new VirtualScroll(eventsTarget, {
        touchMultiplier,
        wheelMultiplier
      });
      this.virtualScroll.on("scroll", this.onVirtualScroll);
      if (this.options.autoToggle) {
        this.checkOverflow();
        this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
          passive: true
        });
      }
      if (this.options.autoRaf) {
        this.__rafID = requestAnimationFrame(this.raf);
      }
    }
    /**
     * Destroy the lenis instance, remove all event listeners and clean up the class name
     */
    destroy() {
      this.emitter.destroy();
      this.options.wrapper.removeEventListener(
        "scroll",
        this.onNativeScroll,
        false
      );
      this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
        capture: true
      });
      this.options.wrapper.removeEventListener(
        "pointerdown",
        this.onPointerDown,
        false
      );
      if (this.options.anchors && this.options.wrapper === window) {
        this.options.wrapper.removeEventListener(
          "click",
          this.onClick,
          false
        );
      }
      this.virtualScroll.destroy();
      this.dimensions.destroy();
      this.cleanUpClassName();
      if (this.__rafID) {
        cancelAnimationFrame(this.__rafID);
      }
    }
    on(event, callback) {
      return this.emitter.on(event, callback);
    }
    off(event, callback) {
      return this.emitter.off(event, callback);
    }
    onScrollEnd = (e) => {
      if (!(e instanceof CustomEvent)) {
        if (this.isScrolling === "smooth" || this.isScrolling === false) {
          e.stopPropagation();
        }
      }
    };
    dispatchScrollendEvent = () => {
      this.options.wrapper.dispatchEvent(
        new CustomEvent("scrollend", {
          bubbles: this.options.wrapper === window,
          // cancelable: false,
          detail: {
            lenisScrollEnd: true
          }
        })
      );
    };
    get overflow() {
      const property = this.isHorizontal ? "overflow-x" : "overflow-y";
      return getComputedStyle(this.rootElement)[property];
    }
    checkOverflow() {
      if (["hidden", "clip"].includes(this.overflow)) {
        this.internalStop();
      } else {
        this.internalStart();
      }
    }
    onTransitionEnd = (event) => {
      if (event.propertyName.includes("overflow")) {
        this.checkOverflow();
      }
    };
    setScroll(scroll) {
      if (this.isHorizontal) {
        this.options.wrapper.scrollTo({ left: scroll, behavior: "instant" });
      } else {
        this.options.wrapper.scrollTo({ top: scroll, behavior: "instant" });
      }
    }
    onClick = (event) => {
      const path = event.composedPath();
      const anchor = path.find(
        (node) => node instanceof HTMLAnchorElement && node.getAttribute("href")?.includes("#")
      );
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href) {
          const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
          const target = `#${href.split("#")[1]}`;
          this.scrollTo(target, options);
        }
      }
    };
    onPointerDown = (event) => {
      if (event.button === 1) {
        this.reset();
      }
    };
    onVirtualScroll = (data) => {
      if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false)
        return;
      const { deltaX, deltaY, event } = data;
      this.emitter.emit("virtual-scroll", { deltaX, deltaY, event });
      if (event.ctrlKey) return;
      if (event.lenisStopPropagation) return;
      const isTouch = event.type.includes("touch");
      const isWheel = event.type.includes("wheel");
      this.isTouching = event.type === "touchstart" || event.type === "touchmove";
      const isClickOrTap = deltaX === 0 && deltaY === 0;
      const isTapToStop = this.options.syncTouch && isTouch && event.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked;
      if (isTapToStop) {
        this.reset();
        return;
      }
      const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
      if (isClickOrTap || isUnknownGesture) {
        return;
      }
      let composedPath = event.composedPath();
      composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
      const prevent = this.options.prevent;
      if (!!composedPath.find(
        (node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.checkNestedScroll(node, { deltaX, deltaY }))
      ))
        return;
      if (this.isStopped || this.isLocked) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      const isSmooth = this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel;
      if (!isSmooth) {
        this.isScrolling = "native";
        this.animate.stop();
        event.lenisStopPropagation = true;
        return;
      }
      let delta = deltaY;
      if (this.options.gestureOrientation === "both") {
        delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      } else if (this.options.gestureOrientation === "horizontal") {
        delta = deltaX;
      }
      if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) {
        event.lenisStopPropagation = true;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      const isSyncTouch = isTouch && this.options.syncTouch;
      const isTouchEnd = isTouch && event.type === "touchend";
      const hasTouchInertia = isTouchEnd;
      if (hasTouchInertia) {
        delta = Math.sign(this.velocity) * Math.pow(Math.abs(this.velocity), this.options.touchInertiaExponent);
      }
      this.scrollTo(this.targetScroll + delta, {
        programmatic: false,
        ...isSyncTouch ? {
          lerp: hasTouchInertia ? this.options.syncTouchLerp : 1
          // immediate: !hasTouchInertia,
        } : {
          lerp: this.options.lerp,
          duration: this.options.duration,
          easing: this.options.easing
        }
      });
    };
    /**
     * Force lenis to recalculate the dimensions
     */
    resize() {
      this.dimensions.resize();
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.emit();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    onNativeScroll = () => {
      if (this._resetVelocityTimeout !== null) {
        clearTimeout(this._resetVelocityTimeout);
        this._resetVelocityTimeout = null;
      }
      if (this._preventNextNativeScrollEvent) {
        this._preventNextNativeScrollEvent = false;
        return;
      }
      if (this.isScrolling === false || this.isScrolling === "native") {
        const lastScroll = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll;
        this.lastVelocity = this.velocity;
        this.velocity = this.animatedScroll - lastScroll;
        this.direction = Math.sign(
          this.animatedScroll - lastScroll
        );
        if (!this.isStopped) {
          this.isScrolling = "native";
        }
        this.emit();
        if (this.velocity !== 0) {
          this._resetVelocityTimeout = setTimeout(() => {
            this.lastVelocity = this.velocity;
            this.velocity = 0;
            this.isScrolling = false;
            this.emit();
          }, 400);
        }
      }
    };
    reset() {
      this.isLocked = false;
      this.isScrolling = false;
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.lastVelocity = this.velocity = 0;
      this.animate.stop();
    }
    /**
     * Start lenis scroll after it has been stopped
     */
    start() {
      if (!this.isStopped) return;
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
    internalStart() {
      if (!this.isStopped) return;
      this.reset();
      this.isStopped = false;
      this.emit();
    }
    /**
     * Stop lenis scroll
     */
    stop() {
      if (this.isStopped) return;
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
    internalStop() {
      if (this.isStopped) return;
      this.reset();
      this.isStopped = true;
      this.emit();
    }
    /**
     * RequestAnimationFrame for lenis
     *
     * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
     */
    raf = (time) => {
      const deltaTime = time - (this.time || time);
      this.time = time;
      this.animate.advance(deltaTime * 1e-3);
      if (this.options.autoRaf) {
        this.__rafID = requestAnimationFrame(this.raf);
      }
    };
    /**
     * Scroll to a target value
     *
     * @param target The target value to scroll to
     * @param options The options for the scroll
     *
     * @example
     * lenis.scrollTo(100, {
     *   offset: 100,
     *   duration: 1,
     *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
     *   lerp: 0.1,
     *   onStart: () => {
     *     console.log('onStart')
     *   },
     *   onComplete: () => {
     *     console.log('onComplete')
     *   },
     * })
     */
    scrollTo(target, {
      offset = 0,
      immediate = false,
      lock = false,
      duration = this.options.duration,
      easing = this.options.easing,
      lerp: lerp2 = this.options.lerp,
      onStart,
      onComplete,
      force = false,
      // scroll even if stopped
      programmatic = true,
      // called from outside of the class
      userData
    } = {}) {
      if ((this.isStopped || this.isLocked) && !force) return;
      if (typeof target === "string" && ["top", "left", "start", "#"].includes(target)) {
        target = 0;
      } else if (typeof target === "string" && ["bottom", "right", "end"].includes(target)) {
        target = this.limit;
      } else {
        let node;
        if (typeof target === "string") {
          node = document.querySelector(target);
          if (!node) {
            if (target === "#top") {
              target = 0;
            } else {
              console.warn("Lenis: Target not found", target);
            }
          }
        } else if (target instanceof HTMLElement && target?.nodeType) {
          node = target;
        }
        if (node) {
          if (this.options.wrapper !== window) {
            const wrapperRect = this.rootElement.getBoundingClientRect();
            offset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
          }
          const rect = node.getBoundingClientRect();
          target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll;
        }
      }
      if (typeof target !== "number") return;
      target += offset;
      target = Math.round(target);
      if (this.options.infinite) {
        if (programmatic) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const distance = target - this.animatedScroll;
          if (distance > this.limit / 2) {
            target = target - this.limit;
          } else if (distance < -this.limit / 2) {
            target = target + this.limit;
          }
        }
      } else {
        target = clamp(0, target, this.limit);
      }
      if (target === this.targetScroll) {
        onStart?.(this);
        onComplete?.(this);
        return;
      }
      this.userData = userData ?? {};
      if (immediate) {
        this.animatedScroll = this.targetScroll = target;
        this.setScroll(this.scroll);
        this.reset();
        this.preventNextNativeScrollEvent();
        this.emit();
        onComplete?.(this);
        this.userData = {};
        requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      if (!programmatic) {
        this.targetScroll = target;
      }
      if (typeof duration === "number" && typeof easing !== "function") {
        easing = defaultEasing;
      } else if (typeof easing === "function" && typeof duration !== "number") {
        duration = 1;
      }
      this.animate.fromTo(this.animatedScroll, target, {
        duration,
        easing,
        lerp: lerp2,
        onStart: () => {
          if (lock) this.isLocked = true;
          this.isScrolling = "smooth";
          onStart?.(this);
        },
        onUpdate: (value, completed) => {
          this.isScrolling = "smooth";
          this.lastVelocity = this.velocity;
          this.velocity = value - this.animatedScroll;
          this.direction = Math.sign(this.velocity);
          this.animatedScroll = value;
          this.setScroll(this.scroll);
          if (programmatic) {
            this.targetScroll = value;
          }
          if (!completed) this.emit();
          if (completed) {
            this.reset();
            this.emit();
            onComplete?.(this);
            this.userData = {};
            requestAnimationFrame(() => {
              this.dispatchScrollendEvent();
            });
            this.preventNextNativeScrollEvent();
          }
        }
      });
    }
    preventNextNativeScrollEvent() {
      this._preventNextNativeScrollEvent = true;
      requestAnimationFrame(() => {
        this._preventNextNativeScrollEvent = false;
      });
    }
    checkNestedScroll(node, { deltaX, deltaY }) {
      const time = Date.now();
      const cache = node._lenis ??= {};
      let hasOverflowX, hasOverflowY, isScrollableX, isScrollableY, scrollWidth, scrollHeight, clientWidth, clientHeight;
      const gestureOrientation = this.options.gestureOrientation;
      if (time - (cache.time ?? 0) > 2e3) {
        cache.time = Date.now();
        const computedStyle = window.getComputedStyle(node);
        cache.computedStyle = computedStyle;
        const overflowXString = computedStyle.overflowX;
        const overflowYString = computedStyle.overflowY;
        hasOverflowX = ["auto", "overlay", "scroll"].includes(overflowXString);
        hasOverflowY = ["auto", "overlay", "scroll"].includes(overflowYString);
        cache.hasOverflowX = hasOverflowX;
        cache.hasOverflowY = hasOverflowY;
        if (!hasOverflowX && !hasOverflowY) return false;
        if (gestureOrientation === "vertical" && !hasOverflowY) return false;
        if (gestureOrientation === "horizontal" && !hasOverflowX) return false;
        scrollWidth = node.scrollWidth;
        scrollHeight = node.scrollHeight;
        clientWidth = node.clientWidth;
        clientHeight = node.clientHeight;
        isScrollableX = scrollWidth > clientWidth;
        isScrollableY = scrollHeight > clientHeight;
        cache.isScrollableX = isScrollableX;
        cache.isScrollableY = isScrollableY;
        cache.scrollWidth = scrollWidth;
        cache.scrollHeight = scrollHeight;
        cache.clientWidth = clientWidth;
        cache.clientHeight = clientHeight;
      } else {
        isScrollableX = cache.isScrollableX;
        isScrollableY = cache.isScrollableY;
        hasOverflowX = cache.hasOverflowX;
        hasOverflowY = cache.hasOverflowY;
        scrollWidth = cache.scrollWidth;
        scrollHeight = cache.scrollHeight;
        clientWidth = cache.clientWidth;
        clientHeight = cache.clientHeight;
      }
      if (!hasOverflowX && !hasOverflowY || !isScrollableX && !isScrollableY) {
        return false;
      }
      if (gestureOrientation === "vertical" && (!hasOverflowY || !isScrollableY))
        return false;
      if (gestureOrientation === "horizontal" && (!hasOverflowX || !isScrollableX))
        return false;
      let orientation;
      if (gestureOrientation === "horizontal") {
        orientation = "x";
      } else if (gestureOrientation === "vertical") {
        orientation = "y";
      } else {
        const isScrollingX = deltaX !== 0;
        const isScrollingY = deltaY !== 0;
        if (isScrollingX && hasOverflowX && isScrollableX) {
          orientation = "x";
        }
        if (isScrollingY && hasOverflowY && isScrollableY) {
          orientation = "y";
        }
      }
      if (!orientation) return false;
      let scroll, maxScroll, delta, hasOverflow, isScrollable;
      if (orientation === "x") {
        scroll = node.scrollLeft;
        maxScroll = scrollWidth - clientWidth;
        delta = deltaX;
        hasOverflow = hasOverflowX;
        isScrollable = isScrollableX;
      } else if (orientation === "y") {
        scroll = node.scrollTop;
        maxScroll = scrollHeight - clientHeight;
        delta = deltaY;
        hasOverflow = hasOverflowY;
        isScrollable = isScrollableY;
      } else {
        return false;
      }
      const willScroll = delta > 0 ? scroll < maxScroll : scroll > 0;
      return willScroll && hasOverflow && isScrollable;
    }
    /**
     * The root element on which lenis is instanced
     */
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    /**
     * The limit which is the maximum scroll value
     */
    get limit() {
      if (this.options.__experimental__naiveDimensions) {
        if (this.isHorizontal) {
          return this.rootElement.scrollWidth - this.rootElement.clientWidth;
        } else {
          return this.rootElement.scrollHeight - this.rootElement.clientHeight;
        }
      } else {
        return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
      }
    }
    /**
     * Whether or not the scroll is horizontal
     */
    get isHorizontal() {
      return this.options.orientation === "horizontal";
    }
    /**
     * The actual scroll value
     */
    get actualScroll() {
      const wrapper = this.options.wrapper;
      return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
    }
    /**
     * The current scroll value
     */
    get scroll() {
      return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    /**
     * The progress of the scroll relative to the limit
     */
    get progress() {
      return this.limit === 0 ? 1 : this.scroll / this.limit;
    }
    /**
     * Current scroll state
     */
    get isScrolling() {
      return this._isScrolling;
    }
    set isScrolling(value) {
      if (this._isScrolling !== value) {
        this._isScrolling = value;
        this.updateClassName();
      }
    }
    /**
     * Check if lenis is stopped
     */
    get isStopped() {
      return this._isStopped;
    }
    set isStopped(value) {
      if (this._isStopped !== value) {
        this._isStopped = value;
        this.updateClassName();
      }
    }
    /**
     * Check if lenis is locked
     */
    get isLocked() {
      return this._isLocked;
    }
    set isLocked(value) {
      if (this._isLocked !== value) {
        this._isLocked = value;
        this.updateClassName();
      }
    }
    /**
     * Check if lenis is smooth scrolling
     */
    get isSmooth() {
      return this.isScrolling === "smooth";
    }
    /**
     * The class name applied to the wrapper element
     */
    get className() {
      let className = "lenis";
      if (this.options.autoToggle) className += " lenis-autoToggle";
      if (this.isStopped) className += " lenis-stopped";
      if (this.isLocked) className += " lenis-locked";
      if (this.isScrolling) className += " lenis-scrolling";
      if (this.isScrolling === "smooth") className += " lenis-smooth";
      return className;
    }
    updateClassName() {
      this.cleanUpClassName();
      this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
    }
    cleanUpClassName() {
      this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
    }
  };

  // src/features/loopSlider.ts
  var LOOP_SLIDER_SELECTORS = {
    root: ['[data-loop-slider="root"]', ".loop-slider-wrapper", ".slider-section"],
    track: ['[data-loop-slider="track"]', ".loop-slider-track"],
    list: ['[data-loop-slider="list"]', ".slider-wrapper"],
    loop: ['[data-loop-slider="loop"]', ".loop-slider.w-dyn-list", ".loop-slider"],
    item: ['[data-loop-slider="item"]', ".slide-w"],
    content: ['[data-loop-slider="content"]', ".slide"],
    blur: ['[data-loop-slider="blur"]', ".slide-blur"],
    media: ['[data-loop-slider="focus"]', ".work-list-img-wrap img", ".work-list-img-wrap"]
  };
  var LOOP_SLIDER_CONFIG = {
    baseScale: 0.8,
    focusScale: 1,
    blurMax: 80,
    translateMax: 0,
    lerp: 0.08,
    progressLerp: 0.12,
    minOpacity: 0.2
  };
  var LENIS_STYLE_ID = "loop-slider-lenis-styles";
  var LENIS_STYLES = "html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis [data-lenis-prevent],.lenis [data-lenis-prevent-wheel],.lenis [data-lenis-prevent-touch]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}";
  var sliderAnimationFrame = null;
  var sliderScrollListenerAttached = false;
  var sliderResizeListenerAttached = false;
  var loopSliderInstances = [];
  var clamp2 = (value, min, max) => Math.max(min, Math.min(max, value));
  var ensureLenisStyles = () => {
    if (document.getElementById(LENIS_STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = LENIS_STYLE_ID;
    style.textContent = LENIS_STYLES;
    document.head.appendChild(style);
  };
  var queryElementWithFallback = (root, selectors) => {
    for (const selector of selectors) {
      const element = root.querySelector(selector);
      if (element) {
        return element;
      }
    }
    return null;
  };
  var queryAllWithFallback = (root, selectors) => {
    for (const selector of selectors) {
      const elements = Array.from(root.querySelectorAll(selector));
      if (elements.length) {
        return elements;
      }
    }
    return [];
  };
  var getLoopSliderRoots = () => {
    const roots = queryAllWithFallback(document, LOOP_SLIDER_SELECTORS.root);
    return roots.filter((root) => queryElementWithFallback(root, LOOP_SLIDER_SELECTORS.list));
  };
  var LoopSliderInstance = class {
    root;
    prefersInfinite;
    config = LOOP_SLIDER_CONFIG;
    slides = [];
    viewportHeight = window.innerHeight || 0;
    primaryList = null;
    loopHeight = 0;
    loopOffset = 0;
    virtualScroll = 0;
    loopIndex = 0;
    previousScroll = null;
    trackElement = null;
    loopLists = [];
    localLenis = null;
    localLenisRaf = null;
    handleLenisScroll;
    constructor(root) {
      this.root = root;
      this.prefersInfinite = root.dataset.loopSliderInfinite !== "false";
      const track = queryElementWithFallback(root, LOOP_SLIDER_SELECTORS.track);
      const list = queryElementWithFallback(root, LOOP_SLIDER_SELECTORS.list);
      if (!list || !track) {
        throw new Error(
          'Loop slider list not found. Add data-loop-slider="list" to the slider wrapper.'
        );
      }
      this.primaryList = list;
      this.loopHeight = this.primaryList.scrollHeight;
      this.trackElement = track;
      this.prepareLoopLists(track);
      if (this.prefersInfinite) {
        this.initLocalLenis();
      }
      this.collectSlides();
    }
    destroy() {
      if (this.handleLenisScroll && this.localLenis) {
        this.localLenis.off("scroll", this.handleLenisScroll);
      }
      if (this.localLenisRaf !== null) {
        window.cancelAnimationFrame(this.localLenisRaf);
        this.localLenisRaf = null;
      }
      this.localLenis?.destroy();
      this.localLenis = null;
    }
    initLocalLenis() {
      if (this.localLenis || !this.trackElement) {
        return;
      }
      ensureLenisStyles();
      this.root.style.overflow = this.root.style.overflow || "hidden";
      this.root.style.position = this.root.style.position || "relative";
      this.trackElement.style.willChange = this.trackElement.style.willChange || "transform";
      this.localLenis = new Lenis({
        wrapper: this.root,
        content: this.trackElement,
        smoothWheel: true,
        infinite: true,
        syncTouch: true,
        touchMultiplier: 0.65
      });
      this.handleLenisScroll = () => {
        this.measure();
      };
      this.localLenis.on("scroll", this.handleLenisScroll);
      const raf = (time) => {
        this.localLenis?.raf(time);
        this.localLenisRaf = window.requestAnimationFrame(raf);
      };
      this.localLenisRaf = window.requestAnimationFrame(raf);
    }
    collectSlides() {
      const nodes = queryAllWithFallback(this.root, LOOP_SLIDER_SELECTORS.item);
      this.slides = nodes.map((node) => ({
        node,
        contentNode: queryElementWithFallback(node, LOOP_SLIDER_SELECTORS.content) ?? node,
        blurNode: queryElementWithFallback(node, LOOP_SLIDER_SELECTORS.blur),
        focusNodes: (() => {
          const focusTargets = [];
          const primaryFocus = queryElementWithFallback(node, LOOP_SLIDER_SELECTORS.media);
          const titleNode = node.querySelector(".work-title");
          if (primaryFocus) {
            focusTargets.push(primaryFocus);
          }
          if (titleNode) {
            focusTargets.push(titleNode);
          }
          if (!focusTargets.length) {
            focusTargets.push(
              queryElementWithFallback(node, LOOP_SLIDER_SELECTORS.content) ?? node
            );
          }
          return focusTargets;
        })(),
        progress: 0,
        targetProgress: 0,
        scale: this.config.baseScale,
        targetScale: this.config.baseScale
      }));
      this.slides.forEach((slide) => {
        const content = slide.contentNode;
        content.style.willChange = "transform, opacity, filter";
        content.style.transformOrigin = "center center";
        content.style.position = content.style.position || "relative";
      });
    }
    prepareLoopLists(track) {
      this.loopLists = queryAllWithFallback(track, LOOP_SLIDER_SELECTORS.loop);
      if (!this.loopLists.length) {
        this.loopLists = [];
        return;
      }
      if (this.loopLists.length < 2) {
        const clone = this.loopLists[0].cloneNode(true);
        track.appendChild(clone);
        this.loopLists.push(clone);
      }
    }
    rotateLists(direction) {
      if (!this.trackElement || !this.loopLists.length) {
        return;
      }
      if (direction === "forward") {
        const first = this.loopLists.shift();
        if (!first) {
          return;
        }
        this.trackElement.appendChild(first);
        this.loopLists.push(first);
      } else {
        const last = this.loopLists.pop();
        if (!last) {
          return;
        }
        const firstChild = this.trackElement.firstElementChild;
        if (firstChild) {
          this.trackElement.insertBefore(last, firstChild);
        } else {
          this.trackElement.appendChild(last);
        }
        this.loopLists.unshift(last);
      }
    }
    computeLoopHeight() {
      if (!this.primaryList) {
        return this.loopHeight;
      }
      const height = this.primaryList.scrollHeight || this.primaryList.offsetHeight;
      if (height) {
        this.loopHeight = height;
      }
      return this.loopHeight;
    }
    applyLoopOffset() {
      if (!this.prefersInfinite || !this.localLenis || !this.trackElement) {
        return;
      }
      const loopHeight = this.loopHeight || this.computeLoopHeight();
      if (!loopHeight) {
        return;
      }
      const { scroll } = this.localLenis;
      const limit = Math.max(this.localLenis.limit || loopHeight, loopHeight);
      if (this.previousScroll === null) {
        this.previousScroll = scroll;
        this.virtualScroll = 0;
        this.loopIndex = 0;
        this.loopOffset = 0;
        this.trackElement.style.transform = "";
        return;
      }
      let delta = scroll - this.previousScroll;
      if (Math.abs(delta) > limit * 0.5) {
        delta += delta > 0 ? -limit : limit;
      }
      this.virtualScroll += delta;
      this.previousScroll = scroll;
      const nextLoopIndex = Math.floor(this.virtualScroll / loopHeight);
      let diff = nextLoopIndex - this.loopIndex;
      while (diff > 0) {
        this.rotateLists("forward");
        this.loopIndex += 1;
        diff -= 1;
      }
      while (diff < 0) {
        this.rotateLists("backward");
        this.loopIndex -= 1;
        diff += 1;
      }
      const remainder = this.virtualScroll - this.loopIndex * loopHeight;
      this.loopOffset = scroll - remainder;
      this.trackElement.style.transform = `translate3d(0, ${this.loopOffset}px, 0)`;
    }
    measure() {
      if (!this.slides.length) {
        return;
      }
      const viewportHeight = Math.max(window.innerHeight, 1);
      this.viewportHeight = viewportHeight;
      this.computeLoopHeight();
      this.applyLoopOffset();
      const viewportTop = 0;
      const viewportBottom = viewportHeight;
      this.slides.forEach((slide) => {
        const rect = slide.node.getBoundingClientRect();
        const cardTop = rect.top;
        const cardBottom = rect.bottom;
        const cardHeight = Math.max(rect.height, 1);
        const visibleTop = Math.max(viewportTop, cardTop);
        const visibleBottom = Math.min(viewportBottom, cardBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibility = clamp2(visibleHeight / cardHeight, 0, 1);
        slide.targetProgress = visibility;
        slide.targetScale = this.config.baseScale + (this.config.focusScale - this.config.baseScale) * visibility;
      });
    }
    animate() {
      if (!this.slides.length) {
        return;
      }
      this.slides.forEach((slide) => {
        slide.scale += (slide.targetScale - slide.scale) * this.config.lerp;
        slide.progress += (slide.targetProgress - slide.progress) * this.config.progressLerp;
        const opacity = this.config.minOpacity + (1 - this.config.minOpacity) * slide.progress;
        const blurValue = (1 - slide.progress) * this.config.blurMax;
        slide.contentNode.style.transform = `scale(${slide.scale.toFixed(4)})`;
        slide.contentNode.style.opacity = opacity.toFixed(3);
        slide.focusNodes.forEach((target) => {
          target.style.filter = `blur(${blurValue.toFixed(2)}px)`;
        });
        if (slide.blurNode) {
          slide.blurNode.style.opacity = (1 - slide.progress).toFixed(3);
          slide.blurNode.style.filter = `blur(${Math.max(blurValue, this.config.blurMax * 0.6).toFixed(2)}px)`;
        }
      });
    }
  };
  var triggerSliderMeasurements = () => {
    loopSliderInstances.forEach((instance) => instance.measure());
  };
  var handleNativeScroll = () => {
    triggerSliderMeasurements();
  };
  var handleResize = () => {
    triggerSliderMeasurements();
  };
  var attachNativeScrollListener = () => {
    if (sliderScrollListenerAttached) {
      return;
    }
    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    sliderScrollListenerAttached = true;
  };
  var attachResizeListener = () => {
    if (sliderResizeListenerAttached) {
      return;
    }
    window.addEventListener("resize", handleResize);
    sliderResizeListenerAttached = true;
  };
  var startSliderAnimationLoop = () => {
    if (sliderAnimationFrame !== null) {
      return;
    }
    const loop = () => {
      loopSliderInstances.forEach((instance) => instance.animate());
      sliderAnimationFrame = window.requestAnimationFrame(loop);
    };
    sliderAnimationFrame = window.requestAnimationFrame(loop);
  };
  var destroyLoopSlider = () => {
    if (sliderAnimationFrame !== null) {
      window.cancelAnimationFrame(sliderAnimationFrame);
      sliderAnimationFrame = null;
    }
    if (sliderScrollListenerAttached) {
      window.removeEventListener("scroll", handleNativeScroll);
      sliderScrollListenerAttached = false;
    }
    if (sliderResizeListenerAttached) {
      window.removeEventListener("resize", handleResize);
      sliderResizeListenerAttached = false;
    }
    loopSliderInstances.forEach((instance) => instance.destroy());
    loopSliderInstances.length = 0;
  };
  var initLoopSlider = () => {
    const sliderRoots = getLoopSliderRoots();
    if (!sliderRoots.length) {
      return;
    }
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }
    const instances = sliderRoots.map((root) => {
      try {
        return new LoopSliderInstance(root);
      } catch (error) {
        console.warn(error);
        return null;
      }
    }).filter((instance) => Boolean(instance));
    if (!instances.length) {
      return;
    }
    loopSliderInstances.push(...instances);
    attachNativeScrollListener();
    attachResizeListener();
    triggerSliderMeasurements();
    startSliderAnimationLoop();
  };

  // src/index.ts
  var navCleanup = null;
  var cleanupFeatures = () => {
    navCleanup?.();
    navCleanup = null;
    destroyLoopSlider();
  };
  var initFeatures = () => {
    cleanupFeatures();
    const isPeripheral = document.body.classList.contains("is-in-peripheral");
    if (!isPeripheral) {
      setNavVisible(true);
      navCleanup = initNavInteractions();
    } else {
      forceCloseNav();
      setNavVisible(false);
      navCleanup = null;
    }
    initLoopSlider();
    window.requestAnimationFrame(() => {
      navCleanup?.();
      const isStillPeripheral = document.body.classList.contains("is-in-peripheral");
      if (!isStillPeripheral) {
        setNavVisible(true);
        navCleanup = initNavInteractions();
      } else {
        forceCloseNav();
        setNavVisible(false);
        navCleanup = null;
      }
    });
  };
  var init = () => {
    initFeatures();
    initBarba({
      onBeforeLeave: cleanupFeatures,
      onAfterEnter: initFeatures
    });
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
//# sourceMappingURL=index.js.map
