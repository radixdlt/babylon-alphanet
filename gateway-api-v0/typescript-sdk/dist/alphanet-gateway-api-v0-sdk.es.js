var kt = Object.defineProperty, xt = Object.defineProperties, Et = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertySymbols, It = Object.prototype.hasOwnProperty, Dt = Object.prototype.propertyIsEnumerable, I = (t, e, n) => e in t ? kt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, J = (t, e) => {
  for (var n in e || (e = {}))
    It.call(e, n) && I(t, n, e[n]);
  if (D)
    for (var n of D(e))
      Dt.call(e, n) && I(t, n, e[n]);
  return t;
}, Z = (t, e) => xt(t, Et(e)), R = (t, e, n) => (I(t, typeof e != "symbol" ? e + "" : e, n), n), l = (t, e, n) => new Promise((i, r) => {
  var o = (s) => {
    try {
      a(n.next(s));
    } catch (c) {
      r(c);
    }
  }, u = (s) => {
    try {
      a(n.throw(s));
    } catch (c) {
      r(c);
    }
  }, a = (s) => s.done ? i(s.value) : Promise.resolve(s.value).then(o, u);
  a((n = n.apply(t, e)).next());
});
const Vt = "https://alphanet.radixdlt.com/v0".replace(/\/+$/, "");
class Ct {
  constructor(e = {}) {
    this.configuration = e;
  }
  set config(e) {
    this.configuration = e;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : Vt;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || tt;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const e = this.configuration.apiKey;
    if (e)
      return typeof e == "function" ? e : () => e;
  }
  get accessToken() {
    const e = this.configuration.accessToken;
    if (e)
      return typeof e == "function" ? e : () => l(this, null, function* () {
        return e;
      });
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
const qt = new Ct();
class j {
  constructor(e = qt) {
    this.configuration = e, R(this, "middleware"), R(this, "fetchApi", (n, i) => l(this, null, function* () {
      let r = { url: n, init: i };
      for (const u of this.middleware)
        u.pre && (r = (yield u.pre(J({
          fetch: this.fetchApi
        }, r))) || r);
      let o;
      try {
        o = yield (this.configuration.fetchApi || fetch)(r.url, r.init);
      } catch (u) {
        for (const a of this.middleware)
          a.onError && (o = (yield a.onError({
            fetch: this.fetchApi,
            url: r.url,
            init: r.init,
            error: u,
            response: o ? o.clone() : void 0
          })) || o);
        if (o !== void 0)
          throw new Kt(u, "The request failed and the interceptors did not return an alternative response");
      }
      for (const u of this.middleware)
        u.post && (o = (yield u.post({
          fetch: this.fetchApi,
          url: r.url,
          init: r.init,
          response: o.clone()
        })) || o);
      return o;
    })), this.middleware = e.middleware;
  }
  withMiddleware(...e) {
    const n = this.clone();
    return n.middleware = n.middleware.concat(...e), n;
  }
  withPreMiddleware(...e) {
    const n = e.map((i) => ({ pre: i }));
    return this.withMiddleware(...n);
  }
  withPostMiddleware(...e) {
    const n = e.map((i) => ({ post: i }));
    return this.withMiddleware(...n);
  }
  request(e, n) {
    return l(this, null, function* () {
      const { url: i, init: r } = yield this.createFetchParams(e, n), o = yield this.fetchApi(i, r);
      if (o.status >= 200 && o.status < 300)
        return o;
      throw new $t(o, "Response returned an error code");
    });
  }
  createFetchParams(e, n) {
    return l(this, null, function* () {
      let i = this.configuration.basePath + e.path;
      e.query !== void 0 && Object.keys(e.query).length !== 0 && (i += "?" + this.configuration.queryParamsStringify(e.query));
      const r = Object.assign({}, this.configuration.headers, e.headers);
      Object.keys(r).forEach((c) => r[c] === void 0 ? delete r[c] : {});
      const o = typeof n == "function" ? n : () => l(this, null, function* () {
        return n;
      }), u = {
        method: e.method,
        headers: r,
        body: e.body,
        credentials: this.configuration.credentials
      }, a = J(J({}, u), yield o({
        init: u,
        context: e
      })), s = Z(J({}, a), {
        body: vt(a.body) || a.body instanceof URLSearchParams || At(a.body) ? a.body : JSON.stringify(a.body)
      });
      return { url: i, init: s };
    });
  }
  clone() {
    const e = this.constructor, n = new e(this.configuration);
    return n.middleware = this.middleware.slice(), n;
  }
}
function At(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function vt(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
class $t extends Error {
  constructor(e, n) {
    super(n), this.response = e, R(this, "name", "ResponseError");
  }
}
class Kt extends Error {
  constructor(e, n) {
    super(n), this.cause = e, R(this, "name", "FetchError");
  }
}
class h extends Error {
  constructor(e, n) {
    super(n), this.field = e, R(this, "name", "RequiredError");
  }
}
const kr = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function _(t, e) {
  const n = t[e];
  return n != null;
}
function tt(t, e = "") {
  return Object.keys(t).map((n) => et(n, t[n], e)).filter((n) => n.length > 0).join("&");
}
function et(t, e, n = "") {
  const i = n + (n.length ? `[${t}]` : t);
  if (e instanceof Array) {
    const r = e.map((o) => encodeURIComponent(String(o))).join(`&${encodeURIComponent(i)}=`);
    return `${encodeURIComponent(i)}=${r}`;
  }
  if (e instanceof Set) {
    const r = Array.from(e);
    return et(t, r, n);
  }
  return e instanceof Date ? `${encodeURIComponent(i)}=${encodeURIComponent(e.toISOString())}` : e instanceof Object ? tt(e, i) : `${encodeURIComponent(i)}=${encodeURIComponent(String(e))}`;
}
function xr(t, e) {
  return Object.keys(t).reduce(
    (n, i) => Z(J({}, n), { [i]: e(t[i]) }),
    {}
  );
}
function Er(t) {
  for (const e of t)
    if (e.contentType === "multipart/form-data")
      return !0;
  return !1;
}
class S {
  constructor(e, n = (i) => i) {
    this.raw = e, this.transformer = n;
  }
  value() {
    return l(this, null, function* () {
      return this.transformer(yield this.raw.json());
    });
  }
}
class Ir {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return l(this, null, function* () {
    });
  }
}
class Dr {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return l(this, null, function* () {
      return yield this.raw.blob();
    });
  }
}
class Vr {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return l(this, null, function* () {
      return yield this.raw.text();
    });
  }
}
function Cr(t) {
  let e = !0;
  return e = e && "state_version" in t, e;
}
function qr(t) {
  return Mt(t);
}
function Mt(t, e) {
  return t == null ? t : {
    state_version: t.state_version
  };
}
function Ar(t) {
  if (t !== void 0)
    return t === null ? null : {
      state_version: t.state_version
    };
}
const vr = {
  EcdsaSecp256k1: "EcdsaSecp256k1",
  EddsaEd25519: "EddsaEd25519"
};
function F(t) {
  return Ut(t);
}
function Ut(t, e) {
  return t;
}
function $r(t) {
  return t;
}
function Kr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "signature_hex" in t, e;
}
function zt(t) {
  return nt(t);
}
function nt(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    signature_hex: t.signature_hex
  };
}
function rt(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      signature_hex: t.signature_hex
    };
}
function Mr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "signature_hex" in t, e;
}
function Bt(t) {
  return it(t);
}
function it(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    signature_hex: t.signature_hex
  };
}
function ot(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      signature_hex: t.signature_hex
    };
}
var Wt = Object.defineProperty, Ht = Object.defineProperties, Gt = Object.getOwnPropertyDescriptors, V = Object.getOwnPropertySymbols, Lt = Object.prototype.hasOwnProperty, Qt = Object.prototype.propertyIsEnumerable, C = (t, e, n) => e in t ? Wt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, q = (t, e) => {
  for (var n in e || (e = {}))
    Lt.call(e, n) && C(t, n, e[n]);
  if (V)
    for (var n of V(e))
      Qt.call(e, n) && C(t, n, e[n]);
  return t;
}, A = (t, e) => Ht(t, Gt(e));
function Xt(t) {
  return Yt(t);
}
function Yt(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return A(q({}, nt(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return A(q({}, it(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of Signature exists with 'key_type=${t.key_type}'`);
  }
}
function Zt(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return rt(t);
      case "EddsaEd25519":
        return ot(t);
      default:
        throw new Error(`No variant of Signature exists with 'key_type=${t.key_type}'`);
    }
  }
}
function Ur(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "recoverable_signature" in t, e;
}
function zr(t) {
  return ut(t);
}
function ut(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    recoverable_signature: zt(t.recoverable_signature)
  };
}
function jt(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      recoverable_signature: rt(t.recoverable_signature)
    };
}
function Br(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "key_hex" in t, e;
}
function te(t) {
  return st(t);
}
function st(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    key_hex: t.key_hex
  };
}
function at(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      key_hex: t.key_hex
    };
}
function Wr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "public_key" in t, e = e && "signature" in t, e;
}
function Hr(t) {
  return ct(t);
}
function ct(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    public_key: te(t.public_key),
    signature: Bt(t.signature)
  };
}
function ee(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      public_key: at(t.public_key),
      signature: ot(t.signature)
    };
}
var ne = Object.defineProperty, re = Object.defineProperties, ie = Object.getOwnPropertyDescriptors, v = Object.getOwnPropertySymbols, oe = Object.prototype.hasOwnProperty, ue = Object.prototype.propertyIsEnumerable, $ = (t, e, n) => e in t ? ne(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, K = (t, e) => {
  for (var n in e || (e = {}))
    oe.call(e, n) && $(t, n, e[n]);
  if (v)
    for (var n of v(e))
      ue.call(e, n) && $(t, n, e[n]);
  return t;
}, M = (t, e) => re(t, ie(e));
function se(t) {
  return ae(t);
}
function ae(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return M(K({}, ut(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return M(K({}, ct(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of SignatureWithPublicKey exists with 'key_type=${t.key_type}'`);
  }
}
function ce(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return jt(t);
      case "EddsaEd25519":
        return ee(t);
      default:
        throw new Error(`No variant of SignatureWithPublicKey exists with 'key_type=${t.key_type}'`);
    }
  }
}
function Gr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "key_hex" in t, e;
}
function Lr(t) {
  return dt(t);
}
function dt(t, e) {
  return t == null ? t : {
    key_type: F(t.key_type),
    key_hex: t.key_hex
  };
}
function de(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      key_hex: t.key_hex
    };
}
var _e = Object.defineProperty, fe = Object.defineProperties, pe = Object.getOwnPropertyDescriptors, U = Object.getOwnPropertySymbols, le = Object.prototype.hasOwnProperty, ye = Object.prototype.propertyIsEnumerable, z = (t, e, n) => e in t ? _e(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, B = (t, e) => {
  for (var n in e || (e = {}))
    le.call(e, n) && z(t, n, e[n]);
  if (U)
    for (var n of U(e))
      ye.call(e, n) && z(t, n, e[n]);
  return t;
}, W = (t, e) => fe(t, pe(e));
function me(t) {
  return Se(t);
}
function Se(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return W(B({}, dt(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return W(B({}, st(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of PublicKey exists with 'key_type=${t.key_type}'`);
  }
}
function he(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return de(t);
      case "EddsaEd25519":
        return at(t);
      default:
        throw new Error(`No variant of PublicKey exists with 'key_type=${t.key_type}'`);
    }
  }
}
function Qr(t) {
  let e = !0;
  return e = e && "version" in t, e = e && "network_id" in t, e = e && "start_epoch_inclusive" in t, e = e && "end_epoch_exclusive" in t, e = e && "nonce" in t, e = e && "notary_public_key" in t, e = e && "notary_as_signatory" in t, e = e && "cost_unit_limit" in t, e = e && "tip_percentage" in t, e;
}
function be(t) {
  return ge(t);
}
function ge(t, e) {
  return t == null ? t : {
    version: t.version,
    network_id: t.network_id,
    start_epoch_inclusive: t.start_epoch_inclusive,
    end_epoch_exclusive: t.end_epoch_exclusive,
    nonce: t.nonce,
    notary_public_key: me(t.notary_public_key),
    notary_as_signatory: t.notary_as_signatory,
    cost_unit_limit: t.cost_unit_limit,
    tip_percentage: t.tip_percentage
  };
}
function Oe(t) {
  if (t !== void 0)
    return t === null ? null : {
      version: t.version,
      network_id: t.network_id,
      start_epoch_inclusive: t.start_epoch_inclusive,
      end_epoch_exclusive: t.end_epoch_exclusive,
      nonce: t.nonce,
      notary_public_key: he(t.notary_public_key),
      notary_as_signatory: t.notary_as_signatory,
      cost_unit_limit: t.cost_unit_limit,
      tip_percentage: t.tip_percentage
    };
}
function Xr(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "header" in t, e = e && "manifest" in t, e = e && "blobs_hex" in t, e;
}
function Ne(t) {
  return Te(t);
}
function Te(t, e) {
  return t == null ? t : {
    hash: t.hash,
    header: be(t.header),
    manifest: t.manifest,
    blobs_hex: t.blobs_hex
  };
}
function Fe(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      header: Oe(t.header),
      manifest: t.manifest,
      blobs_hex: t.blobs_hex
    };
}
function Yr(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "intent" in t, e = e && "intent_signatures" in t, e;
}
function Je(t) {
  return Re(t);
}
function Re(t, e) {
  return t == null ? t : {
    hash: t.hash,
    intent: Ne(t.intent),
    intent_signatures: t.intent_signatures.map(se)
  };
}
function we(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      intent: Fe(t.intent),
      intent_signatures: t.intent_signatures.map(ce)
    };
}
function Zr(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "payload_hex" in t, e = e && "signed_intent" in t, e = e && "notary_signature" in t, e;
}
function Pe(t) {
  return ke(t);
}
function ke(t, e) {
  return t == null ? t : {
    hash: t.hash,
    payload_hex: t.payload_hex,
    signed_intent: Je(t.signed_intent),
    notary_signature: Xt(t.notary_signature)
  };
}
function xe(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      payload_hex: t.payload_hex,
      signed_intent: we(t.signed_intent),
      notary_signature: Zt(t.notary_signature)
    };
}
function jr(t) {
  let e = !0;
  return e = e && "loan_fully_repaid" in t, e = e && "cost_unit_limit" in t, e = e && "cost_unit_consumed" in t, e = e && "cost_unit_price_attos" in t, e = e && "tip_percentage" in t, e = e && "xrd_burned_attos" in t, e = e && "xrd_tipped_attos" in t, e;
}
function Ee(t) {
  return Ie(t);
}
function Ie(t, e) {
  return t == null ? t : {
    loan_fully_repaid: t.loan_fully_repaid,
    cost_unit_limit: t.cost_unit_limit,
    cost_unit_consumed: t.cost_unit_consumed,
    cost_unit_price_attos: t.cost_unit_price_attos,
    tip_percentage: t.tip_percentage,
    xrd_burned_attos: t.xrd_burned_attos,
    xrd_tipped_attos: t.xrd_tipped_attos
  };
}
function De(t) {
  if (t !== void 0)
    return t === null ? null : {
      loan_fully_repaid: t.loan_fully_repaid,
      cost_unit_limit: t.cost_unit_limit,
      cost_unit_consumed: t.cost_unit_consumed,
      cost_unit_price_attos: t.cost_unit_price_attos,
      tip_percentage: t.tip_percentage,
      xrd_burned_attos: t.xrd_burned_attos,
      xrd_tipped_attos: t.xrd_tipped_attos
    };
}
function ti(t) {
  let e = !0;
  return e = e && "data_hex" in t, e = e && "data_json" in t, e;
}
function _t(t) {
  return Ve(t);
}
function Ve(t, e) {
  return t == null ? t : {
    data_hex: t.data_hex,
    data_json: t.data_json
  };
}
function ft(t) {
  if (t !== void 0)
    return t === null ? null : {
      data_hex: t.data_hex,
      data_json: t.data_json
    };
}
const ei = {
  System: "System",
  ResourceManager: "ResourceManager",
  Component: "Component",
  Package: "Package",
  Vault: "Vault",
  KeyValueStore: "KeyValueStore"
};
function d(t) {
  return Ce(t);
}
function Ce(t, e) {
  return t;
}
function ni(t) {
  return t;
}
const ri = {
  System: "System",
  ResourceManager: "ResourceManager",
  ComponentInfo: "ComponentInfo",
  ComponentState: "ComponentState",
  Package: "Package",
  Vault: "Vault",
  NonFungible: "NonFungible",
  KeyValueStoreEntry: "KeyValueStoreEntry"
};
function p(t) {
  return qe(t);
}
function qe(t, e) {
  return t;
}
function ii(t) {
  return t;
}
function oi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e = e && "substate_type" in t, e = e && "substate_key_hex" in t, e;
}
function x(t) {
  return Ae(t);
}
function Ae(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    entity_address_hex: t.entity_address_hex,
    substate_type: p(t.substate_type),
    substate_key_hex: t.substate_key_hex
  };
}
function E(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      entity_address_hex: t.entity_address_hex,
      substate_type: t.substate_type,
      substate_key_hex: t.substate_key_hex
    };
}
function ui(t) {
  let e = !0;
  return e = e && "substate_id" in t, e = e && "substate_data_hash" in t, e = e && "version" in t, e;
}
function ve(t) {
  return $e(t);
}
function $e(t, e) {
  return t == null ? t : {
    substate_id: x(t.substate_id),
    substate_data_hash: t.substate_data_hash,
    version: t.version
  };
}
function Ke(t) {
  if (t !== void 0)
    return t === null ? null : {
      substate_id: E(t.substate_id),
      substate_data_hash: t.substate_data_hash,
      version: t.version
    };
}
function si(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e = e && "global_address_hex" in t, e = e && "global_address" in t, e;
}
function Me(t) {
  return Ue(t);
}
function Ue(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    entity_address_hex: t.entity_address_hex,
    global_address_hex: t.global_address_hex,
    global_address: t.global_address
  };
}
function ze(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      entity_address_hex: t.entity_address_hex,
      global_address_hex: t.global_address_hex,
      global_address: t.global_address
    };
}
function ai(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "package_address" in t, e = e && "blueprint_name" in t, e;
}
function ci(t) {
  return pt(t);
}
function pt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    package_address: t.package_address,
    blueprint_name: t.blueprint_name
  };
}
function Be(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      package_address: t.package_address,
      blueprint_name: t.blueprint_name
    };
}
function di(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e;
}
function P(t) {
  return We(t);
}
function We(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    entity_address_hex: t.entity_address_hex
  };
}
function k(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      entity_address_hex: t.entity_address_hex
    };
}
function _i(t) {
  let e = !0;
  return e = e && "struct_data" in t, e = e && "owned_entities" in t, e = e && "referenced_entities" in t, e;
}
function N(t) {
  return He(t);
}
function He(t, e) {
  return t == null ? t : {
    struct_data: _t(t.struct_data),
    owned_entities: t.owned_entities.map(P),
    referenced_entities: t.referenced_entities.map(P)
  };
}
function T(t) {
  if (t !== void 0)
    return t === null ? null : {
      struct_data: ft(t.struct_data),
      owned_entities: t.owned_entities.map(k),
      referenced_entities: t.referenced_entities.map(k)
    };
}
function fi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "data_struct" in t, e;
}
function pi(t) {
  return lt(t);
}
function lt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    data_struct: N(t.data_struct)
  };
}
function Ge(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      data_struct: T(t.data_struct)
    };
}
function li(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "key_hex" in t, e = e && "is_deleted" in t, e;
}
function yi(t) {
  return yt(t);
}
function yt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    key_hex: t.key_hex,
    is_deleted: t.is_deleted,
    data_struct: _(t, "data_struct") ? N(t.data_struct) : void 0
  };
}
function Le(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      key_hex: t.key_hex,
      is_deleted: t.is_deleted,
      data_struct: T(t.data_struct)
    };
}
function mi(t) {
  let e = !0;
  return e = e && "immutable_data" in t, e = e && "mutable_data" in t, e;
}
function mt(t) {
  return Qe(t);
}
function Qe(t, e) {
  return t == null ? t : {
    immutable_data: N(t.immutable_data),
    mutable_data: N(t.mutable_data)
  };
}
function St(t) {
  if (t !== void 0)
    return t === null ? null : {
      immutable_data: T(t.immutable_data),
      mutable_data: T(t.mutable_data)
    };
}
function Si(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "nf_id_hex" in t, e = e && "is_deleted" in t, e;
}
function hi(t) {
  return ht(t);
}
function ht(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    nf_id_hex: t.nf_id_hex,
    is_deleted: t.is_deleted,
    non_fungible_data: _(t, "non_fungible_data") ? mt(t.non_fungible_data) : void 0
  };
}
function Xe(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      nf_id_hex: t.nf_id_hex,
      is_deleted: t.is_deleted,
      non_fungible_data: St(t.non_fungible_data)
    };
}
function bi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "code_hex" in t, e;
}
function gi(t) {
  return bt(t);
}
function bt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    code_hex: t.code_hex
  };
}
function Ye(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      code_hex: t.code_hex
    };
}
function Oi(t) {
  let e = !0;
  return e = e && "key" in t, e = e && "value" in t, e;
}
function gt(t) {
  return Ze(t);
}
function Ze(t, e) {
  return t == null ? t : {
    key: t.key,
    value: t.value
  };
}
function Ot(t) {
  if (t !== void 0)
    return t === null ? null : {
      key: t.key,
      value: t.value
    };
}
const Ni = {
  Fungible: "Fungible",
  NonFungible: "NonFungible"
};
function w(t) {
  return je(t);
}
function je(t, e) {
  return t;
}
function Ti(t) {
  return t;
}
function Fi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "resource_type" in t, e = e && "metadata" in t, e = e && "total_supply_attos" in t, e;
}
function Ji(t) {
  return Nt(t);
}
function Nt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    resource_type: w(t.resource_type),
    fungible_divisibility: _(t, "fungible_divisibility") ? t.fungible_divisibility : void 0,
    metadata: t.metadata.map(gt),
    total_supply_attos: t.total_supply_attos
  };
}
function tn(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      resource_type: t.resource_type,
      fungible_divisibility: t.fungible_divisibility,
      metadata: t.metadata.map(Ot),
      total_supply_attos: t.total_supply_attos
    };
}
function Ri(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "epoch" in t, e;
}
function wi(t) {
  return Tt(t);
}
function Tt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    epoch: t.epoch
  };
}
function en(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      epoch: t.epoch
    };
}
function Pi(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e = e && "amount_attos" in t, e;
}
function ki(t) {
  return Ft(t);
}
function Ft(t, e) {
  return t == null ? t : {
    resource_type: w(t.resource_type),
    resource_address: t.resource_address,
    amount_attos: t.amount_attos
  };
}
function nn(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address,
      amount_attos: t.amount_attos
    };
}
function xi(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e = e && "nf_ids_hex" in t, e;
}
function Ei(t) {
  return Jt(t);
}
function Jt(t, e) {
  return t == null ? t : {
    resource_type: w(t.resource_type),
    resource_address: t.resource_address,
    nf_ids_hex: t.nf_ids_hex
  };
}
function rn(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address,
      nf_ids_hex: t.nf_ids_hex
    };
}
var on = Object.defineProperty, un = Object.defineProperties, sn = Object.getOwnPropertyDescriptors, H = Object.getOwnPropertySymbols, an = Object.prototype.hasOwnProperty, cn = Object.prototype.propertyIsEnumerable, G = (t, e, n) => e in t ? on(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, L = (t, e) => {
  for (var n in e || (e = {}))
    an.call(e, n) && G(t, n, e[n]);
  if (H)
    for (var n of H(e))
      cn.call(e, n) && G(t, n, e[n]);
  return t;
}, Q = (t, e) => un(t, sn(e));
function Rt(t) {
  return dn(t);
}
function dn(t, e) {
  if (t == null)
    return t;
  switch (t.resource_type) {
    case "Fungible":
      return Q(L({}, Ft(t)), { resource_type: "Fungible" });
    case "NonFungible":
      return Q(L({}, Jt(t)), { resource_type: "NonFungible" });
    default:
      throw new Error(`No variant of ResourceAmount exists with 'resource_type=${t.resource_type}'`);
  }
}
function wt(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.resource_type) {
      case "Fungible":
        return nn(t);
      case "NonFungible":
        return rn(t);
      default:
        throw new Error(`No variant of ResourceAmount exists with 'resource_type=${t.resource_type}'`);
    }
  }
}
function Ii(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "resource_amount" in t, e;
}
function Di(t) {
  return Pt(t);
}
function Pt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    resource_amount: Rt(t.resource_amount)
  };
}
function _n(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      resource_amount: wt(t.resource_amount)
    };
}
var fn = Object.defineProperty, pn = Object.defineProperties, ln = Object.getOwnPropertyDescriptors, X = Object.getOwnPropertySymbols, yn = Object.prototype.hasOwnProperty, mn = Object.prototype.propertyIsEnumerable, Y = (t, e, n) => e in t ? fn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, y = (t, e) => {
  for (var n in e || (e = {}))
    yn.call(e, n) && Y(t, n, e[n]);
  if (X)
    for (var n of X(e))
      mn.call(e, n) && Y(t, n, e[n]);
  return t;
}, m = (t, e) => pn(t, ln(e));
function b(t) {
  return Sn(t);
}
function Sn(t, e) {
  if (t == null)
    return t;
  switch (t.substate_type) {
    case "ComponentInfo":
      return m(y({}, pt(t)), { substate_type: "ComponentInfo" });
    case "ComponentState":
      return m(y({}, lt(t)), { substate_type: "ComponentState" });
    case "KeyValueStoreEntry":
      return m(y({}, yt(t)), { substate_type: "KeyValueStoreEntry" });
    case "NonFungible":
      return m(y({}, ht(t)), { substate_type: "NonFungible" });
    case "Package":
      return m(y({}, bt(t)), { substate_type: "Package" });
    case "ResourceManager":
      return m(y({}, Nt(t)), { substate_type: "ResourceManager" });
    case "System":
      return m(y({}, Tt(t)), { substate_type: "System" });
    case "Vault":
      return m(y({}, Pt(t)), { substate_type: "Vault" });
    default:
      throw new Error(`No variant of Substate exists with 'substate_type=${t.substate_type}'`);
  }
}
function g(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.substate_type) {
      case "ComponentInfo":
        return Be(t);
      case "ComponentState":
        return Ge(t);
      case "KeyValueStoreEntry":
        return Le(t);
      case "NonFungible":
        return Xe(t);
      case "Package":
        return Ye(t);
      case "ResourceManager":
        return tn(t);
      case "System":
        return en(t);
      case "Vault":
        return _n(t);
      default:
        throw new Error(`No variant of Substate exists with 'substate_type=${t.substate_type}'`);
    }
  }
}
function Vi(t) {
  let e = !0;
  return e = e && "substate_id" in t, e = e && "version" in t, e = e && "substate_hex" in t, e = e && "substate_data_hash" in t, e = e && "substate_data" in t, e;
}
function hn(t) {
  return bn(t);
}
function bn(t, e) {
  return t == null ? t : {
    substate_id: x(t.substate_id),
    version: t.version,
    substate_hex: t.substate_hex,
    substate_data_hash: t.substate_data_hash,
    substate_data: b(t.substate_data)
  };
}
function gn(t) {
  if (t !== void 0)
    return t === null ? null : {
      substate_id: E(t.substate_id),
      version: t.version,
      substate_hex: t.substate_hex,
      substate_data_hash: t.substate_data_hash,
      substate_data: g(t.substate_data)
    };
}
function Ci(t) {
  let e = !0;
  return e = e && "down_virtual_substates" in t, e = e && "up_substates" in t, e = e && "down_substates" in t, e = e && "new_global_entities" in t, e;
}
function On(t) {
  return Nn(t);
}
function Nn(t, e) {
  return t == null ? t : {
    down_virtual_substates: t.down_virtual_substates.map(x),
    up_substates: t.up_substates.map(hn),
    down_substates: t.down_substates.map(ve),
    new_global_entities: t.new_global_entities.map(Me)
  };
}
function Tn(t) {
  if (t !== void 0)
    return t === null ? null : {
      down_virtual_substates: t.down_virtual_substates.map(E),
      up_substates: t.up_substates.map(gn),
      down_substates: t.down_substates.map(Ke),
      new_global_entities: t.new_global_entities.map(ze)
    };
}
const qi = {
  Succeeded: "Succeeded",
  Failed: "Failed",
  Rejected: "Rejected"
};
function Fn(t) {
  return Jn(t);
}
function Jn(t, e) {
  return t;
}
function Ai(t) {
  return t;
}
function vi(t) {
  let e = !0;
  return e = e && "status" in t, e = e && "fee_summary" in t, e = e && "state_updates" in t, e;
}
function Rn(t) {
  return wn(t);
}
function wn(t, e) {
  return t == null ? t : {
    status: Fn(t.status),
    fee_summary: Ee(t.fee_summary),
    state_updates: On(t.state_updates),
    output: _(t, "output") ? t.output.map(_t) : void 0,
    error_message: _(t, "error_message") ? t.error_message : void 0
  };
}
function Pn(t) {
  if (t !== void 0)
    return t === null ? null : {
      status: t.status,
      fee_summary: De(t.fee_summary),
      state_updates: Tn(t.state_updates),
      output: t.output === void 0 ? void 0 : t.output.map(ft),
      error_message: t.error_message
    };
}
function $i(t) {
  let e = !0;
  return e = e && "state_version" in t, e = e && "receipt" in t, e;
}
function kn(t) {
  return xn(t);
}
function xn(t, e) {
  return t == null ? t : {
    state_version: t.state_version,
    notarized_transaction: _(t, "notarized_transaction") ? Pe(t.notarized_transaction) : void 0,
    receipt: Rn(t.receipt)
  };
}
function En(t) {
  if (t !== void 0)
    return t === null ? null : {
      state_version: t.state_version,
      notarized_transaction: xe(t.notarized_transaction),
      receipt: Pn(t.receipt)
    };
}
function Ki(t) {
  let e = !0;
  return e = e && "package_address" in t, e = e && "blueprint_name" in t, e;
}
function Mi(t) {
  return In(t);
}
function In(t, e) {
  return t == null ? t : {
    package_address: t.package_address,
    blueprint_name: t.blueprint_name
  };
}
function Ui(t) {
  if (t !== void 0)
    return t === null ? null : {
      package_address: t.package_address,
      blueprint_name: t.blueprint_name
    };
}
function zi(t) {
  let e = !0;
  return e = e && "data_struct" in t, e;
}
function Bi(t) {
  return Dn(t);
}
function Dn(t, e) {
  return t == null ? t : {
    data_struct: N(t.data_struct)
  };
}
function Wi(t) {
  if (t !== void 0)
    return t === null ? null : {
      data_struct: T(t.data_struct)
    };
}
function Hi(t) {
  let e = !0;
  return e = e && "code" in t, e = e && "message" in t, e;
}
function Gi(t) {
  return Vn(t);
}
function Vn(t, e) {
  return t == null ? t : {
    code: t.code,
    message: t.message,
    trace_id: _(t, "trace_id") ? t.trace_id : void 0
  };
}
function Li(t) {
  if (t !== void 0)
    return t === null ? null : {
      code: t.code,
      message: t.message,
      trace_id: t.trace_id
    };
}
function Qi(t) {
  let e = !0;
  return e = e && "amount_attos" in t, e;
}
function Xi(t) {
  return Cn(t);
}
function Cn(t, e) {
  return t == null ? t : {
    amount_attos: t.amount_attos
  };
}
function Yi(t) {
  if (t !== void 0)
    return t === null ? null : {
      amount_attos: t.amount_attos
    };
}
function Zi(t) {
  let e = !0;
  return e = e && "key_hex" in t, e = e && "is_deleted" in t, e;
}
function ji(t) {
  return qn(t);
}
function qn(t, e) {
  return t == null ? t : {
    key_hex: t.key_hex,
    is_deleted: t.is_deleted,
    data_struct: _(t, "data_struct") ? N(t.data_struct) : void 0
  };
}
function to(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_hex: t.key_hex,
      is_deleted: t.is_deleted,
      data_struct: T(t.data_struct)
    };
}
function eo(t) {
  let e = !0;
  return e = e && "nf_ids_hex" in t, e;
}
function no(t) {
  return An(t);
}
function An(t, e) {
  return t == null ? t : {
    nf_ids_hex: t.nf_ids_hex
  };
}
function ro(t) {
  if (t !== void 0)
    return t === null ? null : {
      nf_ids_hex: t.nf_ids_hex
    };
}
function io(t) {
  let e = !0;
  return e = e && "nf_id_hex" in t, e = e && "is_deleted" in t, e;
}
function oo(t) {
  return vn(t);
}
function vn(t, e) {
  return t == null ? t : {
    nf_id_hex: t.nf_id_hex,
    is_deleted: t.is_deleted,
    non_fungible_data: _(t, "non_fungible_data") ? mt(t.non_fungible_data) : void 0
  };
}
function uo(t) {
  if (t !== void 0)
    return t === null ? null : {
      nf_id_hex: t.nf_id_hex,
      is_deleted: t.is_deleted,
      non_fungible_data: St(t.non_fungible_data)
    };
}
function so(t) {
  let e = !0;
  return e = e && "code_hex" in t, e;
}
function ao(t) {
  return $n(t);
}
function $n(t, e) {
  return t == null ? t : {
    code_hex: t.code_hex
  };
}
function co(t) {
  if (t !== void 0)
    return t === null ? null : {
      code_hex: t.code_hex
    };
}
function _o(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e;
}
function fo(t) {
  return Kn(t);
}
function Kn(t, e) {
  return t == null ? t : {
    resource_type: w(t.resource_type),
    resource_address: t.resource_address
  };
}
function po(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address
    };
}
function lo(t) {
  let e = !0;
  return e = e && "resource_address" in t, e = e && "component_address" in t, e = e && "vault_entity_id" in t, e = e && "amount_attos" in t, e;
}
function yo(t) {
  return Mn(t);
}
function Mn(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address,
    component_address: t.component_address,
    vault_entity_id: P(t.vault_entity_id),
    amount_attos: t.amount_attos
  };
}
function mo(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address,
      component_address: t.component_address,
      vault_entity_id: k(t.vault_entity_id),
      amount_attos: t.amount_attos
    };
}
function So(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "metadata" in t, e = e && "total_supply_attos" in t, e;
}
function ho(t) {
  return Un(t);
}
function Un(t, e) {
  return t == null ? t : {
    resource_type: w(t.resource_type),
    fungible_divisibility: _(t, "fungible_divisibility") ? t.fungible_divisibility : void 0,
    metadata: t.metadata.map(gt),
    total_supply_attos: t.total_supply_attos
  };
}
function bo(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      fungible_divisibility: t.fungible_divisibility,
      metadata: t.metadata.map(Ot),
      total_supply_attos: t.total_supply_attos
    };
}
function go(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e;
}
function Oo(t) {
  return zn(t);
}
function zn(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type)
  };
}
function No(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type
    };
}
function To(t) {
  let e = !0;
  return e = e && "epoch" in t, e;
}
function Fo(t) {
  return Bn(t);
}
function Bn(t, e) {
  return t == null ? t : {
    epoch: t.epoch
  };
}
function Jo(t) {
  if (t !== void 0)
    return t === null ? null : {
      epoch: t.epoch
    };
}
function Ro(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e = e && "signatures_hash" in t, e = e && "payload_hash" in t, e;
}
function wo(t) {
  return Wn(t);
}
function Wn(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash,
    signatures_hash: t.signatures_hash,
    payload_hash: t.payload_hash
  };
}
function Po(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash,
      signatures_hash: t.signatures_hash,
      payload_hash: t.payload_hash
    };
}
function ko(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e;
}
function xo(t) {
  return Hn(t);
}
function Hn(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash
  };
}
function Gn(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash
    };
}
function Eo(t) {
  let e = !0;
  return e = e && "committed" in t, e;
}
function Ln(t) {
  return Qn(t);
}
function Qn(t, e) {
  return t == null ? t : {
    committed: kn(t.committed)
  };
}
function Io(t) {
  if (t !== void 0)
    return t === null ? null : {
      committed: En(t.committed)
    };
}
function Do(t) {
  let e = !0;
  return e = e && "parent" in t, e = e && "entity_id" in t, e = e && "depth" in t, e;
}
function Xn(t) {
  return Yn(t);
}
function Yn(t, e) {
  return t == null ? t : {
    parent: x(t.parent),
    entity_id: P(t.entity_id),
    depth: t.depth
  };
}
function Zn(t) {
  if (t !== void 0)
    return t === null ? null : {
      parent: E(t.parent),
      entity_id: k(t.entity_id),
      depth: t.depth
    };
}
function Vo(t) {
  let e = !0;
  return e = e && "component_address" in t, e;
}
function Co(t) {
  return jn(t);
}
function jn(t, e) {
  return t == null ? t : {
    component_address: t.component_address
  };
}
function tr(t) {
  if (t !== void 0)
    return t === null ? null : {
      component_address: t.component_address
    };
}
function qo(t) {
  let e = !0;
  return e = e && "info" in t, e = e && "state" in t, e = e && "owned_vaults" in t, e = e && "descendent_ids" in t, e;
}
function er(t) {
  return nr(t);
}
function nr(t, e) {
  return t == null ? t : {
    info: b(t.info),
    state: b(t.state),
    owned_vaults: t.owned_vaults.map(b),
    descendent_ids: t.descendent_ids.map(Xn)
  };
}
function Ao(t) {
  if (t !== void 0)
    return t === null ? null : {
      info: g(t.info),
      state: g(t.state),
      owned_vaults: t.owned_vaults.map(g),
      descendent_ids: t.descendent_ids.map(Zn)
    };
}
function vo(t) {
  let e = !0;
  return e = e && "epoch" in t, e;
}
function rr(t) {
  return ir(t);
}
function ir(t, e) {
  return t == null ? t : {
    epoch: t.epoch
  };
}
function $o(t) {
  if (t !== void 0)
    return t === null ? null : {
      epoch: t.epoch
    };
}
function Ko(t) {
  let e = !0;
  return e = e && "resource_address" in t, e = e && "non_fungible_id_hex" in t, e;
}
function Mo(t) {
  return or(t);
}
function or(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address,
    non_fungible_id_hex: t.non_fungible_id_hex
  };
}
function ur(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address,
      non_fungible_id_hex: t.non_fungible_id_hex
    };
}
function Uo(t) {
  let e = !0;
  return e = e && "non_fungible" in t, e;
}
function sr(t) {
  return ar(t);
}
function ar(t, e) {
  return t == null ? t : {
    non_fungible: b(t.non_fungible)
  };
}
function zo(t) {
  if (t !== void 0)
    return t === null ? null : {
      non_fungible: g(t.non_fungible)
    };
}
function Bo(t) {
  let e = !0;
  return e = e && "package_address" in t, e;
}
function Wo(t) {
  return cr(t);
}
function cr(t, e) {
  return t == null ? t : {
    package_address: t.package_address
  };
}
function dr(t) {
  if (t !== void 0)
    return t === null ? null : {
      package_address: t.package_address
    };
}
function Ho(t) {
  let e = !0;
  return e = e && "_package" in t, e;
}
function _r(t) {
  return fr(t);
}
function fr(t, e) {
  return t == null ? t : {
    _package: b(t.package)
  };
}
function Go(t) {
  if (t !== void 0)
    return t === null ? null : {
      package: g(t._package)
    };
}
function Lo(t) {
  let e = !0;
  return e = e && "resource_address" in t, e;
}
function Qo(t) {
  return pr(t);
}
function pr(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address
  };
}
function lr(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address
    };
}
function Xo(t) {
  let e = !0;
  return e = e && "manager" in t, e;
}
function yr(t) {
  return mr(t);
}
function mr(t, e) {
  return t == null ? t : {
    manager: b(t.manager)
  };
}
function Yo(t) {
  if (t !== void 0)
    return t === null ? null : {
      manager: g(t.manager)
    };
}
const Zo = {
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  InMempool: "InMempool",
  Rejected: "Rejected"
};
function jo(t) {
  let e = !0;
  return e = e && "payload_hash" in t, e = e && "status" in t, e;
}
function Sr(t) {
  return hr(t);
}
function hr(t, e) {
  return t == null ? t : {
    payload_hash: t.payload_hash,
    status: t.status,
    error_message: _(t, "error_message") ? t.error_message : void 0
  };
}
function br(t) {
  if (t !== void 0)
    return t === null ? null : {
      payload_hash: t.payload_hash,
      status: t.status,
      error_message: t.error_message
    };
}
function tu(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e;
}
function eu(t) {
  return gr(t);
}
function gr(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash
  };
}
function Or(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash
    };
}
const nu = {
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  InMempool: "InMempool",
  Rejected: "Rejected",
  Unknown: "Unknown"
};
function ru(t) {
  let e = !0;
  return e = e && "intent_status" in t, e = e && "known_payloads" in t, e;
}
function Nr(t) {
  return Tr(t);
}
function Tr(t, e) {
  return t == null ? t : {
    intent_status: t.intent_status,
    known_payloads: t.known_payloads.map(Sr)
  };
}
function iu(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_status: t.intent_status,
      known_payloads: t.known_payloads.map(br)
    };
}
function ou(t) {
  let e = !0;
  return e = e && "notarized_transaction_hex" in t, e;
}
function uu(t) {
  return Fr(t);
}
function Fr(t, e) {
  return t == null ? t : {
    notarized_transaction_hex: t.notarized_transaction_hex
  };
}
function Jr(t) {
  if (t !== void 0)
    return t === null ? null : {
      notarized_transaction_hex: t.notarized_transaction_hex
    };
}
function su(t) {
  let e = !0;
  return e = e && "duplicate" in t, e;
}
function Rr(t) {
  return wr(t);
}
function wr(t, e) {
  return t == null ? t : {
    duplicate: t.duplicate
  };
}
function au(t) {
  if (t !== void 0)
    return t === null ? null : {
      duplicate: t.duplicate
    };
}
function cu(t) {
  let e = !0;
  return e = e && "resource_amount" in t, e;
}
function du(t) {
  return Pr(t);
}
function Pr(t, e) {
  return t == null ? t : {
    resource_amount: Rt(t.resource_amount)
  };
}
function _u(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_amount: wt(t.resource_amount)
    };
}
var f = (t, e, n) => new Promise((i, r) => {
  var o = (s) => {
    try {
      a(n.next(s));
    } catch (c) {
      r(c);
    }
  }, u = (s) => {
    try {
      a(n.throw(s));
    } catch (c) {
      r(c);
    }
  }, a = (s) => s.done ? i(s.value) : Promise.resolve(s.value).then(o, u);
  a((n = n.apply(t, e)).next());
});
class fu extends j {
  stateComponentPostRaw(e, n) {
    return f(this, null, function* () {
      if (e.v0StateComponentRequest === null || e.v0StateComponentRequest === void 0)
        throw new h("v0StateComponentRequest", "Required parameter requestParameters.v0StateComponentRequest was null or undefined when calling stateComponentPost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/state/component",
        method: "POST",
        headers: r,
        query: i,
        body: tr(e.v0StateComponentRequest)
      }, n);
      return new S(o, (u) => er(u));
    });
  }
  stateComponentPost(e, n) {
    return f(this, null, function* () {
      return yield (yield this.stateComponentPostRaw(e, n)).value();
    });
  }
  stateEpochPostRaw(e) {
    return f(this, null, function* () {
      const n = {}, i = {}, r = yield this.request({
        path: "/state/epoch",
        method: "POST",
        headers: i,
        query: n
      }, e);
      return new S(r, (o) => rr(o));
    });
  }
  stateEpochPost(e) {
    return f(this, null, function* () {
      return yield (yield this.stateEpochPostRaw(e)).value();
    });
  }
  stateNonFungiblePostRaw(e, n) {
    return f(this, null, function* () {
      if (e.v0StateNonFungibleRequest === null || e.v0StateNonFungibleRequest === void 0)
        throw new h("v0StateNonFungibleRequest", "Required parameter requestParameters.v0StateNonFungibleRequest was null or undefined when calling stateNonFungiblePost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/state/non-fungible",
        method: "POST",
        headers: r,
        query: i,
        body: ur(e.v0StateNonFungibleRequest)
      }, n);
      return new S(o, (u) => sr(u));
    });
  }
  stateNonFungiblePost(e, n) {
    return f(this, null, function* () {
      return yield (yield this.stateNonFungiblePostRaw(e, n)).value();
    });
  }
  statePackagePostRaw(e, n) {
    return f(this, null, function* () {
      if (e.v0StatePackageRequest === null || e.v0StatePackageRequest === void 0)
        throw new h("v0StatePackageRequest", "Required parameter requestParameters.v0StatePackageRequest was null or undefined when calling statePackagePost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/state/package",
        method: "POST",
        headers: r,
        query: i,
        body: dr(e.v0StatePackageRequest)
      }, n);
      return new S(o, (u) => _r(u));
    });
  }
  statePackagePost(e, n) {
    return f(this, null, function* () {
      return yield (yield this.statePackagePostRaw(e, n)).value();
    });
  }
  stateResourcePostRaw(e, n) {
    return f(this, null, function* () {
      if (e.v0StateResourceRequest === null || e.v0StateResourceRequest === void 0)
        throw new h("v0StateResourceRequest", "Required parameter requestParameters.v0StateResourceRequest was null or undefined when calling stateResourcePost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/state/resource",
        method: "POST",
        headers: r,
        query: i,
        body: lr(e.v0StateResourceRequest)
      }, n);
      return new S(o, (u) => yr(u));
    });
  }
  stateResourcePost(e, n) {
    return f(this, null, function* () {
      return yield (yield this.stateResourcePostRaw(e, n)).value();
    });
  }
}
var O = (t, e, n) => new Promise((i, r) => {
  var o = (s) => {
    try {
      a(n.next(s));
    } catch (c) {
      r(c);
    }
  }, u = (s) => {
    try {
      a(n.throw(s));
    } catch (c) {
      r(c);
    }
  }, a = (s) => s.done ? i(s.value) : Promise.resolve(s.value).then(o, u);
  a((n = n.apply(t, e)).next());
});
class pu extends j {
  transactionReceiptPostRaw(e, n) {
    return O(this, null, function* () {
      if (e.v0CommittedTransactionRequest === null || e.v0CommittedTransactionRequest === void 0)
        throw new h("v0CommittedTransactionRequest", "Required parameter requestParameters.v0CommittedTransactionRequest was null or undefined when calling transactionReceiptPost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/transaction/receipt",
        method: "POST",
        headers: r,
        query: i,
        body: Gn(e.v0CommittedTransactionRequest)
      }, n);
      return new S(o, (u) => Ln(u));
    });
  }
  transactionReceiptPost(e, n) {
    return O(this, null, function* () {
      return yield (yield this.transactionReceiptPostRaw(e, n)).value();
    });
  }
  transactionStatusPostRaw(e, n) {
    return O(this, null, function* () {
      if (e.v0TransactionStatusRequest === null || e.v0TransactionStatusRequest === void 0)
        throw new h("v0TransactionStatusRequest", "Required parameter requestParameters.v0TransactionStatusRequest was null or undefined when calling transactionStatusPost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/transaction/status",
        method: "POST",
        headers: r,
        query: i,
        body: Or(e.v0TransactionStatusRequest)
      }, n);
      return new S(o, (u) => Nr(u));
    });
  }
  transactionStatusPost(e, n) {
    return O(this, null, function* () {
      return yield (yield this.transactionStatusPostRaw(e, n)).value();
    });
  }
  transactionSubmitPostRaw(e, n) {
    return O(this, null, function* () {
      if (e.v0TransactionSubmitRequest === null || e.v0TransactionSubmitRequest === void 0)
        throw new h("v0TransactionSubmitRequest", "Required parameter requestParameters.v0TransactionSubmitRequest was null or undefined when calling transactionSubmitPost.");
      const i = {}, r = {};
      r["Content-Type"] = "application/json";
      const o = yield this.request({
        path: "/transaction/submit",
        method: "POST",
        headers: r,
        query: i,
        body: Jr(e.v0TransactionSubmitRequest)
      }, n);
      return new S(o, (u) => Rr(u));
    });
  }
  transactionSubmitPost(e, n) {
    return O(this, null, function* () {
      return yield (yield this.transactionSubmitPostRaw(e, n)).value();
    });
  }
}
export {
  Vt as BASE_PATH,
  j as BaseAPI,
  Dr as BlobApiResponse,
  kr as COLLECTION_FORMATS,
  qr as CommittedStateIdentifierFromJSON,
  Mt as CommittedStateIdentifierFromJSONTyped,
  Ar as CommittedStateIdentifierToJSON,
  kn as CommittedTransactionFromJSON,
  xn as CommittedTransactionFromJSONTyped,
  En as CommittedTransactionToJSON,
  Mi as ComponentInfoSubstateAllOfFromJSON,
  In as ComponentInfoSubstateAllOfFromJSONTyped,
  Ui as ComponentInfoSubstateAllOfToJSON,
  ci as ComponentInfoSubstateFromJSON,
  pt as ComponentInfoSubstateFromJSONTyped,
  Be as ComponentInfoSubstateToJSON,
  Bi as ComponentStateSubstateAllOfFromJSON,
  Dn as ComponentStateSubstateAllOfFromJSONTyped,
  Wi as ComponentStateSubstateAllOfToJSON,
  pi as ComponentStateSubstateFromJSON,
  lt as ComponentStateSubstateFromJSONTyped,
  Ge as ComponentStateSubstateToJSON,
  Ct as Configuration,
  N as DataStructFromJSON,
  He as DataStructFromJSONTyped,
  T as DataStructToJSON,
  qt as DefaultConfig,
  ve as DownSubstateFromJSON,
  $e as DownSubstateFromJSONTyped,
  Ke as DownSubstateToJSON,
  Lr as EcdsaSecp256k1PublicKeyFromJSON,
  dt as EcdsaSecp256k1PublicKeyFromJSONTyped,
  de as EcdsaSecp256k1PublicKeyToJSON,
  zt as EcdsaSecp256k1SignatureFromJSON,
  nt as EcdsaSecp256k1SignatureFromJSONTyped,
  rt as EcdsaSecp256k1SignatureToJSON,
  zr as EcdsaSecp256k1SignatureWithPublicKeyFromJSON,
  ut as EcdsaSecp256k1SignatureWithPublicKeyFromJSONTyped,
  jt as EcdsaSecp256k1SignatureWithPublicKeyToJSON,
  te as EddsaEd25519PublicKeyFromJSON,
  st as EddsaEd25519PublicKeyFromJSONTyped,
  at as EddsaEd25519PublicKeyToJSON,
  Bt as EddsaEd25519SignatureFromJSON,
  it as EddsaEd25519SignatureFromJSONTyped,
  ot as EddsaEd25519SignatureToJSON,
  Hr as EddsaEd25519SignatureWithPublicKeyFromJSON,
  ct as EddsaEd25519SignatureWithPublicKeyFromJSONTyped,
  ee as EddsaEd25519SignatureWithPublicKeyToJSON,
  P as EntityIdFromJSON,
  We as EntityIdFromJSONTyped,
  k as EntityIdToJSON,
  ei as EntityType,
  d as EntityTypeFromJSON,
  Ce as EntityTypeFromJSONTyped,
  ni as EntityTypeToJSON,
  Gi as ErrorResponseFromJSON,
  Vn as ErrorResponseFromJSONTyped,
  Li as ErrorResponseToJSON,
  Ee as FeeSummaryFromJSON,
  Ie as FeeSummaryFromJSONTyped,
  De as FeeSummaryToJSON,
  Kt as FetchError,
  Xi as FungibleResourceAmountAllOfFromJSON,
  Cn as FungibleResourceAmountAllOfFromJSONTyped,
  Yi as FungibleResourceAmountAllOfToJSON,
  ki as FungibleResourceAmountFromJSON,
  Ft as FungibleResourceAmountFromJSONTyped,
  nn as FungibleResourceAmountToJSON,
  Me as GlobalEntityIdFromJSON,
  Ue as GlobalEntityIdFromJSONTyped,
  ze as GlobalEntityIdToJSON,
  S as JSONApiResponse,
  ji as KeyValueStoreEntrySubstateAllOfFromJSON,
  qn as KeyValueStoreEntrySubstateAllOfFromJSONTyped,
  to as KeyValueStoreEntrySubstateAllOfToJSON,
  yi as KeyValueStoreEntrySubstateFromJSON,
  yt as KeyValueStoreEntrySubstateFromJSONTyped,
  Le as KeyValueStoreEntrySubstateToJSON,
  mt as NonFungibleDataFromJSON,
  Qe as NonFungibleDataFromJSONTyped,
  St as NonFungibleDataToJSON,
  no as NonFungibleResourceAmountAllOfFromJSON,
  An as NonFungibleResourceAmountAllOfFromJSONTyped,
  ro as NonFungibleResourceAmountAllOfToJSON,
  Ei as NonFungibleResourceAmountFromJSON,
  Jt as NonFungibleResourceAmountFromJSONTyped,
  rn as NonFungibleResourceAmountToJSON,
  oo as NonFungibleSubstateAllOfFromJSON,
  vn as NonFungibleSubstateAllOfFromJSONTyped,
  uo as NonFungibleSubstateAllOfToJSON,
  hi as NonFungibleSubstateFromJSON,
  ht as NonFungibleSubstateFromJSONTyped,
  Xe as NonFungibleSubstateToJSON,
  Pe as NotarizedTransactionFromJSON,
  ke as NotarizedTransactionFromJSONTyped,
  xe as NotarizedTransactionToJSON,
  ao as PackageSubstateAllOfFromJSON,
  $n as PackageSubstateAllOfFromJSONTyped,
  co as PackageSubstateAllOfToJSON,
  gi as PackageSubstateFromJSON,
  bt as PackageSubstateFromJSONTyped,
  Ye as PackageSubstateToJSON,
  me as PublicKeyFromJSON,
  Se as PublicKeyFromJSONTyped,
  he as PublicKeyToJSON,
  vr as PublicKeyType,
  F as PublicKeyTypeFromJSON,
  Ut as PublicKeyTypeFromJSONTyped,
  $r as PublicKeyTypeToJSON,
  h as RequiredError,
  fo as ResourceAmountBaseFromJSON,
  Kn as ResourceAmountBaseFromJSONTyped,
  po as ResourceAmountBaseToJSON,
  Rt as ResourceAmountFromJSON,
  dn as ResourceAmountFromJSONTyped,
  wt as ResourceAmountToJSON,
  yo as ResourceChangeFromJSON,
  Mn as ResourceChangeFromJSONTyped,
  mo as ResourceChangeToJSON,
  ho as ResourceManagerSubstateAllOfFromJSON,
  Un as ResourceManagerSubstateAllOfFromJSONTyped,
  gt as ResourceManagerSubstateAllOfMetadataFromJSON,
  Ze as ResourceManagerSubstateAllOfMetadataFromJSONTyped,
  Ot as ResourceManagerSubstateAllOfMetadataToJSON,
  bo as ResourceManagerSubstateAllOfToJSON,
  Ji as ResourceManagerSubstateFromJSON,
  Nt as ResourceManagerSubstateFromJSONTyped,
  tn as ResourceManagerSubstateToJSON,
  Ni as ResourceType,
  w as ResourceTypeFromJSON,
  je as ResourceTypeFromJSONTyped,
  Ti as ResourceTypeToJSON,
  $t as ResponseError,
  _t as SborDataFromJSON,
  Ve as SborDataFromJSONTyped,
  ft as SborDataToJSON,
  Xt as SignatureFromJSON,
  Yt as SignatureFromJSONTyped,
  Zt as SignatureToJSON,
  se as SignatureWithPublicKeyFromJSON,
  ae as SignatureWithPublicKeyFromJSONTyped,
  ce as SignatureWithPublicKeyToJSON,
  Je as SignedTransactionIntentFromJSON,
  Re as SignedTransactionIntentFromJSONTyped,
  we as SignedTransactionIntentToJSON,
  fu as StateApi,
  On as StateUpdatesFromJSON,
  Nn as StateUpdatesFromJSONTyped,
  Tn as StateUpdatesToJSON,
  Oo as SubstateBaseFromJSON,
  zn as SubstateBaseFromJSONTyped,
  No as SubstateBaseToJSON,
  b as SubstateFromJSON,
  Sn as SubstateFromJSONTyped,
  x as SubstateIdFromJSON,
  Ae as SubstateIdFromJSONTyped,
  E as SubstateIdToJSON,
  g as SubstateToJSON,
  ri as SubstateType,
  p as SubstateTypeFromJSON,
  qe as SubstateTypeFromJSONTyped,
  ii as SubstateTypeToJSON,
  Fo as SystemSubstateAllOfFromJSON,
  Bn as SystemSubstateAllOfFromJSONTyped,
  Jo as SystemSubstateAllOfToJSON,
  wi as SystemSubstateFromJSON,
  Tt as SystemSubstateFromJSONTyped,
  en as SystemSubstateToJSON,
  Vr as TextApiResponse,
  pu as TransactionApi,
  be as TransactionHeaderFromJSON,
  ge as TransactionHeaderFromJSONTyped,
  Oe as TransactionHeaderToJSON,
  wo as TransactionIdentifiersFromJSON,
  Wn as TransactionIdentifiersFromJSONTyped,
  Po as TransactionIdentifiersToJSON,
  Ne as TransactionIntentFromJSON,
  Te as TransactionIntentFromJSONTyped,
  Fe as TransactionIntentToJSON,
  Rn as TransactionReceiptFromJSON,
  wn as TransactionReceiptFromJSONTyped,
  Pn as TransactionReceiptToJSON,
  qi as TransactionStatus,
  Fn as TransactionStatusFromJSON,
  Jn as TransactionStatusFromJSONTyped,
  Ai as TransactionStatusToJSON,
  hn as UpSubstateFromJSON,
  bn as UpSubstateFromJSONTyped,
  gn as UpSubstateToJSON,
  xo as V0CommittedTransactionRequestFromJSON,
  Hn as V0CommittedTransactionRequestFromJSONTyped,
  Gn as V0CommittedTransactionRequestToJSON,
  Ln as V0CommittedTransactionResponseFromJSON,
  Qn as V0CommittedTransactionResponseFromJSONTyped,
  Io as V0CommittedTransactionResponseToJSON,
  Xn as V0StateComponentDescendentIdFromJSON,
  Yn as V0StateComponentDescendentIdFromJSONTyped,
  Zn as V0StateComponentDescendentIdToJSON,
  Co as V0StateComponentRequestFromJSON,
  jn as V0StateComponentRequestFromJSONTyped,
  tr as V0StateComponentRequestToJSON,
  er as V0StateComponentResponseFromJSON,
  nr as V0StateComponentResponseFromJSONTyped,
  Ao as V0StateComponentResponseToJSON,
  rr as V0StateEpochResponseFromJSON,
  ir as V0StateEpochResponseFromJSONTyped,
  $o as V0StateEpochResponseToJSON,
  Mo as V0StateNonFungibleRequestFromJSON,
  or as V0StateNonFungibleRequestFromJSONTyped,
  ur as V0StateNonFungibleRequestToJSON,
  sr as V0StateNonFungibleResponseFromJSON,
  ar as V0StateNonFungibleResponseFromJSONTyped,
  zo as V0StateNonFungibleResponseToJSON,
  Wo as V0StatePackageRequestFromJSON,
  cr as V0StatePackageRequestFromJSONTyped,
  dr as V0StatePackageRequestToJSON,
  _r as V0StatePackageResponseFromJSON,
  fr as V0StatePackageResponseFromJSONTyped,
  Go as V0StatePackageResponseToJSON,
  Qo as V0StateResourceRequestFromJSON,
  pr as V0StateResourceRequestFromJSONTyped,
  lr as V0StateResourceRequestToJSON,
  yr as V0StateResourceResponseFromJSON,
  mr as V0StateResourceResponseFromJSONTyped,
  Yo as V0StateResourceResponseToJSON,
  Sr as V0TransactionPayloadStatusFromJSON,
  hr as V0TransactionPayloadStatusFromJSONTyped,
  Zo as V0TransactionPayloadStatusStatusEnum,
  br as V0TransactionPayloadStatusToJSON,
  eu as V0TransactionStatusRequestFromJSON,
  gr as V0TransactionStatusRequestFromJSONTyped,
  Or as V0TransactionStatusRequestToJSON,
  Nr as V0TransactionStatusResponseFromJSON,
  Tr as V0TransactionStatusResponseFromJSONTyped,
  nu as V0TransactionStatusResponseIntentStatusEnum,
  iu as V0TransactionStatusResponseToJSON,
  uu as V0TransactionSubmitRequestFromJSON,
  Fr as V0TransactionSubmitRequestFromJSONTyped,
  Jr as V0TransactionSubmitRequestToJSON,
  Rr as V0TransactionSubmitResponseFromJSON,
  wr as V0TransactionSubmitResponseFromJSONTyped,
  au as V0TransactionSubmitResponseToJSON,
  du as VaultSubstateAllOfFromJSON,
  Pr as VaultSubstateAllOfFromJSONTyped,
  _u as VaultSubstateAllOfToJSON,
  Di as VaultSubstateFromJSON,
  Pt as VaultSubstateFromJSONTyped,
  _n as VaultSubstateToJSON,
  Ir as VoidApiResponse,
  Er as canConsumeForm,
  _ as exists,
  Cr as instanceOfCommittedStateIdentifier,
  $i as instanceOfCommittedTransaction,
  ai as instanceOfComponentInfoSubstate,
  Ki as instanceOfComponentInfoSubstateAllOf,
  fi as instanceOfComponentStateSubstate,
  zi as instanceOfComponentStateSubstateAllOf,
  _i as instanceOfDataStruct,
  ui as instanceOfDownSubstate,
  Gr as instanceOfEcdsaSecp256k1PublicKey,
  Kr as instanceOfEcdsaSecp256k1Signature,
  Ur as instanceOfEcdsaSecp256k1SignatureWithPublicKey,
  Br as instanceOfEddsaEd25519PublicKey,
  Mr as instanceOfEddsaEd25519Signature,
  Wr as instanceOfEddsaEd25519SignatureWithPublicKey,
  di as instanceOfEntityId,
  Hi as instanceOfErrorResponse,
  jr as instanceOfFeeSummary,
  Pi as instanceOfFungibleResourceAmount,
  Qi as instanceOfFungibleResourceAmountAllOf,
  si as instanceOfGlobalEntityId,
  li as instanceOfKeyValueStoreEntrySubstate,
  Zi as instanceOfKeyValueStoreEntrySubstateAllOf,
  mi as instanceOfNonFungibleData,
  xi as instanceOfNonFungibleResourceAmount,
  eo as instanceOfNonFungibleResourceAmountAllOf,
  Si as instanceOfNonFungibleSubstate,
  io as instanceOfNonFungibleSubstateAllOf,
  Zr as instanceOfNotarizedTransaction,
  bi as instanceOfPackageSubstate,
  so as instanceOfPackageSubstateAllOf,
  _o as instanceOfResourceAmountBase,
  lo as instanceOfResourceChange,
  Fi as instanceOfResourceManagerSubstate,
  So as instanceOfResourceManagerSubstateAllOf,
  Oi as instanceOfResourceManagerSubstateAllOfMetadata,
  ti as instanceOfSborData,
  Yr as instanceOfSignedTransactionIntent,
  Ci as instanceOfStateUpdates,
  go as instanceOfSubstateBase,
  oi as instanceOfSubstateId,
  Ri as instanceOfSystemSubstate,
  To as instanceOfSystemSubstateAllOf,
  Qr as instanceOfTransactionHeader,
  Ro as instanceOfTransactionIdentifiers,
  Xr as instanceOfTransactionIntent,
  vi as instanceOfTransactionReceipt,
  Vi as instanceOfUpSubstate,
  ko as instanceOfV0CommittedTransactionRequest,
  Eo as instanceOfV0CommittedTransactionResponse,
  Do as instanceOfV0StateComponentDescendentId,
  Vo as instanceOfV0StateComponentRequest,
  qo as instanceOfV0StateComponentResponse,
  vo as instanceOfV0StateEpochResponse,
  Ko as instanceOfV0StateNonFungibleRequest,
  Uo as instanceOfV0StateNonFungibleResponse,
  Bo as instanceOfV0StatePackageRequest,
  Ho as instanceOfV0StatePackageResponse,
  Lo as instanceOfV0StateResourceRequest,
  Xo as instanceOfV0StateResourceResponse,
  jo as instanceOfV0TransactionPayloadStatus,
  tu as instanceOfV0TransactionStatusRequest,
  ru as instanceOfV0TransactionStatusResponse,
  ou as instanceOfV0TransactionSubmitRequest,
  su as instanceOfV0TransactionSubmitResponse,
  Ii as instanceOfVaultSubstate,
  cu as instanceOfVaultSubstateAllOf,
  xr as mapValues,
  tt as querystring
};
