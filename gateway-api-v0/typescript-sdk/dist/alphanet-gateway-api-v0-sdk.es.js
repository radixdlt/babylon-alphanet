var xt = Object.defineProperty, Et = Object.defineProperties, It = Object.getOwnPropertyDescriptors, C = Object.getOwnPropertySymbols, Vt = Object.prototype.hasOwnProperty, Ct = Object.prototype.propertyIsEnumerable, I = (t, e, n) => e in t ? xt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, F = (t, e) => {
  for (var n in e || (e = {}))
    Vt.call(e, n) && I(t, n, e[n]);
  if (C)
    for (var n of C(e))
      Ct.call(e, n) && I(t, n, e[n]);
  return t;
}, tt = (t, e) => Et(t, It(e)), J = (t, e, n) => (I(t, typeof e != "symbol" ? e + "" : e, n), n), y = (t, e, n) => new Promise((i, r) => {
  var o = (u) => {
    try {
      a(n.next(u));
    } catch (c) {
      r(c);
    }
  }, s = (u) => {
    try {
      a(n.throw(u));
    } catch (c) {
      r(c);
    }
  }, a = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(o, s);
  a((n = n.apply(t, e)).next());
});
const Dt = "https://alphanet.radixdlt.com/v0".replace(/\/+$/, "");
class qt {
  constructor(e = {}) {
    this.configuration = e;
  }
  set config(e) {
    this.configuration = e;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : Dt;
  }
  get fetchApi() {
    return this.configuration.fetchApi;
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || et;
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
      return typeof e == "function" ? e : () => y(this, null, function* () {
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
const At = new qt();
class V {
  constructor(e = At) {
    this.configuration = e, J(this, "middleware"), J(this, "fetchApi", (n, i) => y(this, null, function* () {
      let r = { url: n, init: i };
      for (const s of this.middleware)
        s.pre && (r = (yield s.pre(F({
          fetch: this.fetchApi
        }, r))) || r);
      let o;
      try {
        o = yield (this.configuration.fetchApi || fetch)(r.url, r.init);
      } catch (s) {
        for (const a of this.middleware)
          a.onError && (o = (yield a.onError({
            fetch: this.fetchApi,
            url: r.url,
            init: r.init,
            error: s,
            response: o ? o.clone() : void 0
          })) || o);
        if (o !== void 0)
          throw new Mt(s, "The request failed and the interceptors did not return an alternative response");
      }
      for (const s of this.middleware)
        s.post && (o = (yield s.post({
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
    return y(this, null, function* () {
      const { url: i, init: r } = yield this.createFetchParams(e, n), o = yield this.fetchApi(i, r);
      if (o.status >= 200 && o.status < 300)
        return o;
      throw new Kt(o, "Response returned an error code");
    });
  }
  createFetchParams(e, n) {
    return y(this, null, function* () {
      let i = this.configuration.basePath + e.path;
      e.query !== void 0 && Object.keys(e.query).length !== 0 && (i += "?" + this.configuration.queryParamsStringify(e.query));
      const r = Object.assign({}, this.configuration.headers, e.headers);
      Object.keys(r).forEach((c) => r[c] === void 0 ? delete r[c] : {});
      const o = typeof n == "function" ? n : () => y(this, null, function* () {
        return n;
      }), s = {
        method: e.method,
        headers: r,
        body: e.body,
        credentials: this.configuration.credentials
      }, a = F(F({}, s), yield o({
        init: s,
        context: e
      })), u = tt(F({}, a), {
        body: $t(a.body) || a.body instanceof URLSearchParams || vt(a.body) ? a.body : JSON.stringify(a.body)
      });
      return { url: i, init: u };
    });
  }
  clone() {
    const e = this.constructor, n = new e(this.configuration);
    return n.middleware = this.middleware.slice(), n;
  }
}
function vt(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function $t(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
class Kt extends Error {
  constructor(e, n) {
    super(n), this.response = e, J(this, "name", "ResponseError");
  }
}
class Mt extends Error {
  constructor(e, n) {
    super(n), this.cause = e, J(this, "name", "FetchError");
  }
}
class h extends Error {
  constructor(e, n) {
    super(n), this.field = e, J(this, "name", "RequiredError");
  }
}
const vr = {
  csv: ",",
  ssv: " ",
  tsv: "	",
  pipes: "|"
};
function _(t, e) {
  const n = t[e];
  return n != null;
}
function et(t, e = "") {
  return Object.keys(t).map((n) => nt(n, t[n], e)).filter((n) => n.length > 0).join("&");
}
function nt(t, e, n = "") {
  const i = n + (n.length ? `[${t}]` : t);
  if (e instanceof Array) {
    const r = e.map((o) => encodeURIComponent(String(o))).join(`&${encodeURIComponent(i)}=`);
    return `${encodeURIComponent(i)}=${r}`;
  }
  if (e instanceof Set) {
    const r = Array.from(e);
    return nt(t, r, n);
  }
  return e instanceof Date ? `${encodeURIComponent(i)}=${encodeURIComponent(e.toISOString())}` : e instanceof Object ? et(e, i) : `${encodeURIComponent(i)}=${encodeURIComponent(String(e))}`;
}
function $r(t, e) {
  return Object.keys(t).reduce(
    (n, i) => tt(F({}, n), { [i]: e(t[i]) }),
    {}
  );
}
function Kr(t) {
  for (const e of t)
    if (e.contentType === "multipart/form-data")
      return !0;
  return !1;
}
class l {
  constructor(e, n = (i) => i) {
    this.raw = e, this.transformer = n;
  }
  value() {
    return y(this, null, function* () {
      return this.transformer(yield this.raw.json());
    });
  }
}
class Mr {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return y(this, null, function* () {
    });
  }
}
class Ur {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return y(this, null, function* () {
      return yield this.raw.blob();
    });
  }
}
class Wr {
  constructor(e) {
    this.raw = e;
  }
  value() {
    return y(this, null, function* () {
      return yield this.raw.text();
    });
  }
}
function zr(t) {
  let e = !0;
  return e = e && "state_version" in t, e;
}
function Br(t) {
  return Ut(t);
}
function Ut(t, e) {
  return t == null ? t : {
    state_version: t.state_version
  };
}
function Hr(t) {
  if (t !== void 0)
    return t === null ? null : {
      state_version: t.state_version
    };
}
const Gr = {
  EcdsaSecp256k1: "EcdsaSecp256k1",
  EddsaEd25519: "EddsaEd25519"
};
function w(t) {
  return Wt(t);
}
function Wt(t, e) {
  return t;
}
function Lr(t) {
  return t;
}
function Qr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "signature_hex" in t, e;
}
function zt(t) {
  return rt(t);
}
function rt(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    signature_hex: t.signature_hex
  };
}
function it(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      signature_hex: t.signature_hex
    };
}
function Xr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "signature_hex" in t, e;
}
function Bt(t) {
  return ot(t);
}
function ot(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    signature_hex: t.signature_hex
  };
}
function st(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      signature_hex: t.signature_hex
    };
}
var Ht = Object.defineProperty, Gt = Object.defineProperties, Lt = Object.getOwnPropertyDescriptors, D = Object.getOwnPropertySymbols, Qt = Object.prototype.hasOwnProperty, Xt = Object.prototype.propertyIsEnumerable, q = (t, e, n) => e in t ? Ht(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, A = (t, e) => {
  for (var n in e || (e = {}))
    Qt.call(e, n) && q(t, n, e[n]);
  if (D)
    for (var n of D(e))
      Xt.call(e, n) && q(t, n, e[n]);
  return t;
}, v = (t, e) => Gt(t, Lt(e));
function Yt(t) {
  return Zt(t);
}
function Zt(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return v(A({}, rt(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return v(A({}, ot(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of Signature exists with 'key_type=${t.key_type}'`);
  }
}
function jt(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return it(t);
      case "EddsaEd25519":
        return st(t);
      default:
        throw new Error(`No variant of Signature exists with 'key_type=${t.key_type}'`);
    }
  }
}
function Yr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "recoverable_signature" in t, e;
}
function Zr(t) {
  return ut(t);
}
function ut(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    recoverable_signature: zt(t.recoverable_signature)
  };
}
function te(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      recoverable_signature: it(t.recoverable_signature)
    };
}
function jr(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "key_hex" in t, e;
}
function ee(t) {
  return at(t);
}
function at(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    key_hex: t.key_hex
  };
}
function ct(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      key_hex: t.key_hex
    };
}
function ti(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "public_key" in t, e = e && "signature" in t, e;
}
function ei(t) {
  return dt(t);
}
function dt(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    public_key: ee(t.public_key),
    signature: Bt(t.signature)
  };
}
function ne(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      public_key: ct(t.public_key),
      signature: st(t.signature)
    };
}
var re = Object.defineProperty, ie = Object.defineProperties, oe = Object.getOwnPropertyDescriptors, $ = Object.getOwnPropertySymbols, se = Object.prototype.hasOwnProperty, ue = Object.prototype.propertyIsEnumerable, K = (t, e, n) => e in t ? re(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, M = (t, e) => {
  for (var n in e || (e = {}))
    se.call(e, n) && K(t, n, e[n]);
  if ($)
    for (var n of $(e))
      ue.call(e, n) && K(t, n, e[n]);
  return t;
}, U = (t, e) => ie(t, oe(e));
function ae(t) {
  return ce(t);
}
function ce(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return U(M({}, ut(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return U(M({}, dt(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of SignatureWithPublicKey exists with 'key_type=${t.key_type}'`);
  }
}
function de(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return te(t);
      case "EddsaEd25519":
        return ne(t);
      default:
        throw new Error(`No variant of SignatureWithPublicKey exists with 'key_type=${t.key_type}'`);
    }
  }
}
function ni(t) {
  let e = !0;
  return e = e && "key_type" in t, e = e && "key_hex" in t, e;
}
function ri(t) {
  return _t(t);
}
function _t(t, e) {
  return t == null ? t : {
    key_type: w(t.key_type),
    key_hex: t.key_hex
  };
}
function _e(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_type: t.key_type,
      key_hex: t.key_hex
    };
}
var fe = Object.defineProperty, pe = Object.defineProperties, le = Object.getOwnPropertyDescriptors, W = Object.getOwnPropertySymbols, ye = Object.prototype.hasOwnProperty, me = Object.prototype.propertyIsEnumerable, z = (t, e, n) => e in t ? fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, B = (t, e) => {
  for (var n in e || (e = {}))
    ye.call(e, n) && z(t, n, e[n]);
  if (W)
    for (var n of W(e))
      me.call(e, n) && z(t, n, e[n]);
  return t;
}, H = (t, e) => pe(t, le(e));
function Se(t) {
  return he(t);
}
function he(t, e) {
  if (t == null)
    return t;
  switch (t.key_type) {
    case "EcdsaSecp256k1":
      return H(B({}, _t(t)), { key_type: "EcdsaSecp256k1" });
    case "EddsaEd25519":
      return H(B({}, at(t)), { key_type: "EddsaEd25519" });
    default:
      throw new Error(`No variant of PublicKey exists with 'key_type=${t.key_type}'`);
  }
}
function be(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.key_type) {
      case "EcdsaSecp256k1":
        return _e(t);
      case "EddsaEd25519":
        return ct(t);
      default:
        throw new Error(`No variant of PublicKey exists with 'key_type=${t.key_type}'`);
    }
  }
}
function ii(t) {
  let e = !0;
  return e = e && "version" in t, e = e && "network_id" in t, e = e && "start_epoch_inclusive" in t, e = e && "end_epoch_exclusive" in t, e = e && "nonce" in t, e = e && "notary_public_key" in t, e = e && "notary_as_signatory" in t, e = e && "cost_unit_limit" in t, e = e && "tip_percentage" in t, e;
}
function ge(t) {
  return Oe(t);
}
function Oe(t, e) {
  return t == null ? t : {
    version: t.version,
    network_id: t.network_id,
    start_epoch_inclusive: t.start_epoch_inclusive,
    end_epoch_exclusive: t.end_epoch_exclusive,
    nonce: t.nonce,
    notary_public_key: Se(t.notary_public_key),
    notary_as_signatory: t.notary_as_signatory,
    cost_unit_limit: t.cost_unit_limit,
    tip_percentage: t.tip_percentage
  };
}
function Ne(t) {
  if (t !== void 0)
    return t === null ? null : {
      version: t.version,
      network_id: t.network_id,
      start_epoch_inclusive: t.start_epoch_inclusive,
      end_epoch_exclusive: t.end_epoch_exclusive,
      nonce: t.nonce,
      notary_public_key: be(t.notary_public_key),
      notary_as_signatory: t.notary_as_signatory,
      cost_unit_limit: t.cost_unit_limit,
      tip_percentage: t.tip_percentage
    };
}
function oi(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "header" in t, e = e && "manifest" in t, e = e && "blobs_hex" in t, e;
}
function Te(t) {
  return we(t);
}
function we(t, e) {
  return t == null ? t : {
    hash: t.hash,
    header: ge(t.header),
    manifest: t.manifest,
    blobs_hex: t.blobs_hex
  };
}
function Fe(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      header: Ne(t.header),
      manifest: t.manifest,
      blobs_hex: t.blobs_hex
    };
}
function si(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "intent" in t, e = e && "intent_signatures" in t, e;
}
function Je(t) {
  return Re(t);
}
function Re(t, e) {
  return t == null ? t : {
    hash: t.hash,
    intent: Te(t.intent),
    intent_signatures: t.intent_signatures.map(ae)
  };
}
function Pe(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      intent: Fe(t.intent),
      intent_signatures: t.intent_signatures.map(de)
    };
}
function ui(t) {
  let e = !0;
  return e = e && "hash" in t, e = e && "payload_hex" in t, e = e && "signed_intent" in t, e = e && "notary_signature" in t, e;
}
function ke(t) {
  return xe(t);
}
function xe(t, e) {
  return t == null ? t : {
    hash: t.hash,
    payload_hex: t.payload_hex,
    signed_intent: Je(t.signed_intent),
    notary_signature: Yt(t.notary_signature)
  };
}
function Ee(t) {
  if (t !== void 0)
    return t === null ? null : {
      hash: t.hash,
      payload_hex: t.payload_hex,
      signed_intent: Pe(t.signed_intent),
      notary_signature: jt(t.notary_signature)
    };
}
function ai(t) {
  let e = !0;
  return e = e && "loan_fully_repaid" in t, e = e && "cost_unit_limit" in t, e = e && "cost_unit_consumed" in t, e = e && "cost_unit_price_attos" in t, e = e && "tip_percentage" in t, e = e && "xrd_burned_attos" in t, e = e && "xrd_tipped_attos" in t, e;
}
function Ie(t) {
  return Ve(t);
}
function Ve(t, e) {
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
function Ce(t) {
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
function ci(t) {
  let e = !0;
  return e = e && "data_hex" in t, e = e && "data_json" in t, e;
}
function ft(t) {
  return De(t);
}
function De(t, e) {
  return t == null ? t : {
    data_hex: t.data_hex,
    data_json: t.data_json
  };
}
function pt(t) {
  if (t !== void 0)
    return t === null ? null : {
      data_hex: t.data_hex,
      data_json: t.data_json
    };
}
const di = {
  System: "System",
  ResourceManager: "ResourceManager",
  Component: "Component",
  Package: "Package",
  Vault: "Vault",
  KeyValueStore: "KeyValueStore"
};
function d(t) {
  return qe(t);
}
function qe(t, e) {
  return t;
}
function _i(t) {
  return t;
}
const fi = {
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
  return Ae(t);
}
function Ae(t, e) {
  return t;
}
function pi(t) {
  return t;
}
function li(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e = e && "substate_type" in t, e = e && "substate_key_hex" in t, e;
}
function x(t) {
  return ve(t);
}
function ve(t, e) {
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
function yi(t) {
  let e = !0;
  return e = e && "substate_id" in t, e = e && "substate_data_hash" in t, e = e && "version" in t, e;
}
function $e(t) {
  return Ke(t);
}
function Ke(t, e) {
  return t == null ? t : {
    substate_id: x(t.substate_id),
    substate_data_hash: t.substate_data_hash,
    version: t.version
  };
}
function Me(t) {
  if (t !== void 0)
    return t === null ? null : {
      substate_id: E(t.substate_id),
      substate_data_hash: t.substate_data_hash,
      version: t.version
    };
}
function mi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e = e && "global_address_hex" in t, e = e && "global_address" in t, e;
}
function Ue(t) {
  return We(t);
}
function We(t, e) {
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
function Si(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "package_address" in t, e = e && "blueprint_name" in t, e;
}
function hi(t) {
  return lt(t);
}
function lt(t, e) {
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
function bi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "entity_address_hex" in t, e;
}
function P(t) {
  return He(t);
}
function He(t, e) {
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
function gi(t) {
  let e = !0;
  return e = e && "struct_data" in t, e = e && "owned_entities" in t, e = e && "referenced_entities" in t, e;
}
function N(t) {
  return Ge(t);
}
function Ge(t, e) {
  return t == null ? t : {
    struct_data: ft(t.struct_data),
    owned_entities: t.owned_entities.map(P),
    referenced_entities: t.referenced_entities.map(P)
  };
}
function T(t) {
  if (t !== void 0)
    return t === null ? null : {
      struct_data: pt(t.struct_data),
      owned_entities: t.owned_entities.map(k),
      referenced_entities: t.referenced_entities.map(k)
    };
}
function Oi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "data_struct" in t, e;
}
function Ni(t) {
  return yt(t);
}
function yt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    data_struct: N(t.data_struct)
  };
}
function Le(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      data_struct: T(t.data_struct)
    };
}
function Ti(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "key_hex" in t, e = e && "is_deleted" in t, e;
}
function wi(t) {
  return mt(t);
}
function mt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    key_hex: t.key_hex,
    is_deleted: t.is_deleted,
    data_struct: _(t, "data_struct") ? N(t.data_struct) : void 0
  };
}
function Qe(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      key_hex: t.key_hex,
      is_deleted: t.is_deleted,
      data_struct: T(t.data_struct)
    };
}
function Fi(t) {
  let e = !0;
  return e = e && "immutable_data" in t, e = e && "mutable_data" in t, e;
}
function St(t) {
  return Xe(t);
}
function Xe(t, e) {
  return t == null ? t : {
    immutable_data: N(t.immutable_data),
    mutable_data: N(t.mutable_data)
  };
}
function ht(t) {
  if (t !== void 0)
    return t === null ? null : {
      immutable_data: T(t.immutable_data),
      mutable_data: T(t.mutable_data)
    };
}
function Ji(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "nf_id_hex" in t, e = e && "is_deleted" in t, e;
}
function Ri(t) {
  return bt(t);
}
function bt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    nf_id_hex: t.nf_id_hex,
    is_deleted: t.is_deleted,
    non_fungible_data: _(t, "non_fungible_data") ? St(t.non_fungible_data) : void 0
  };
}
function Ye(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      nf_id_hex: t.nf_id_hex,
      is_deleted: t.is_deleted,
      non_fungible_data: ht(t.non_fungible_data)
    };
}
function Pi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "code_hex" in t, e;
}
function ki(t) {
  return gt(t);
}
function gt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    code_hex: t.code_hex
  };
}
function Ze(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      code_hex: t.code_hex
    };
}
function xi(t) {
  let e = !0;
  return e = e && "key" in t, e = e && "value" in t, e;
}
function Ot(t) {
  return je(t);
}
function je(t, e) {
  return t == null ? t : {
    key: t.key,
    value: t.value
  };
}
function Nt(t) {
  if (t !== void 0)
    return t === null ? null : {
      key: t.key,
      value: t.value
    };
}
const Ei = {
  Fungible: "Fungible",
  NonFungible: "NonFungible"
};
function R(t) {
  return tn(t);
}
function tn(t, e) {
  return t;
}
function Ii(t) {
  return t;
}
function Vi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "resource_type" in t, e = e && "metadata" in t, e = e && "total_supply_attos" in t, e;
}
function Ci(t) {
  return Tt(t);
}
function Tt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    resource_type: R(t.resource_type),
    fungible_divisibility: _(t, "fungible_divisibility") ? t.fungible_divisibility : void 0,
    metadata: t.metadata.map(Ot),
    total_supply_attos: t.total_supply_attos
  };
}
function en(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      resource_type: t.resource_type,
      fungible_divisibility: t.fungible_divisibility,
      metadata: t.metadata.map(Nt),
      total_supply_attos: t.total_supply_attos
    };
}
function Di(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "epoch" in t, e;
}
function qi(t) {
  return wt(t);
}
function wt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    epoch: t.epoch
  };
}
function nn(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      epoch: t.epoch
    };
}
function Ai(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e = e && "amount_attos" in t, e;
}
function vi(t) {
  return Ft(t);
}
function Ft(t, e) {
  return t == null ? t : {
    resource_type: R(t.resource_type),
    resource_address: t.resource_address,
    amount_attos: t.amount_attos
  };
}
function rn(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address,
      amount_attos: t.amount_attos
    };
}
function $i(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e = e && "nf_ids_hex" in t, e;
}
function Ki(t) {
  return Jt(t);
}
function Jt(t, e) {
  return t == null ? t : {
    resource_type: R(t.resource_type),
    resource_address: t.resource_address,
    nf_ids_hex: t.nf_ids_hex
  };
}
function on(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address,
      nf_ids_hex: t.nf_ids_hex
    };
}
var sn = Object.defineProperty, un = Object.defineProperties, an = Object.getOwnPropertyDescriptors, G = Object.getOwnPropertySymbols, cn = Object.prototype.hasOwnProperty, dn = Object.prototype.propertyIsEnumerable, L = (t, e, n) => e in t ? sn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Q = (t, e) => {
  for (var n in e || (e = {}))
    cn.call(e, n) && L(t, n, e[n]);
  if (G)
    for (var n of G(e))
      dn.call(e, n) && L(t, n, e[n]);
  return t;
}, X = (t, e) => un(t, an(e));
function Rt(t) {
  return _n(t);
}
function _n(t, e) {
  if (t == null)
    return t;
  switch (t.resource_type) {
    case "Fungible":
      return X(Q({}, Ft(t)), { resource_type: "Fungible" });
    case "NonFungible":
      return X(Q({}, Jt(t)), { resource_type: "NonFungible" });
    default:
      throw new Error(`No variant of ResourceAmount exists with 'resource_type=${t.resource_type}'`);
  }
}
function Pt(t) {
  if (t !== void 0) {
    if (t === null)
      return null;
    switch (t.resource_type) {
      case "Fungible":
        return rn(t);
      case "NonFungible":
        return on(t);
      default:
        throw new Error(`No variant of ResourceAmount exists with 'resource_type=${t.resource_type}'`);
    }
  }
}
function Mi(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e = e && "resource_amount" in t, e;
}
function Ui(t) {
  return kt(t);
}
function kt(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type),
    resource_amount: Rt(t.resource_amount)
  };
}
function fn(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type,
      resource_amount: Pt(t.resource_amount)
    };
}
var pn = Object.defineProperty, ln = Object.defineProperties, yn = Object.getOwnPropertyDescriptors, Y = Object.getOwnPropertySymbols, mn = Object.prototype.hasOwnProperty, Sn = Object.prototype.propertyIsEnumerable, Z = (t, e, n) => e in t ? pn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, m = (t, e) => {
  for (var n in e || (e = {}))
    mn.call(e, n) && Z(t, n, e[n]);
  if (Y)
    for (var n of Y(e))
      Sn.call(e, n) && Z(t, n, e[n]);
  return t;
}, S = (t, e) => ln(t, yn(e));
function b(t) {
  return hn(t);
}
function hn(t, e) {
  if (t == null)
    return t;
  switch (t.substate_type) {
    case "ComponentInfo":
      return S(m({}, lt(t)), { substate_type: "ComponentInfo" });
    case "ComponentState":
      return S(m({}, yt(t)), { substate_type: "ComponentState" });
    case "KeyValueStoreEntry":
      return S(m({}, mt(t)), { substate_type: "KeyValueStoreEntry" });
    case "NonFungible":
      return S(m({}, bt(t)), { substate_type: "NonFungible" });
    case "Package":
      return S(m({}, gt(t)), { substate_type: "Package" });
    case "ResourceManager":
      return S(m({}, Tt(t)), { substate_type: "ResourceManager" });
    case "System":
      return S(m({}, wt(t)), { substate_type: "System" });
    case "Vault":
      return S(m({}, kt(t)), { substate_type: "Vault" });
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
        return Le(t);
      case "KeyValueStoreEntry":
        return Qe(t);
      case "NonFungible":
        return Ye(t);
      case "Package":
        return Ze(t);
      case "ResourceManager":
        return en(t);
      case "System":
        return nn(t);
      case "Vault":
        return fn(t);
      default:
        throw new Error(`No variant of Substate exists with 'substate_type=${t.substate_type}'`);
    }
  }
}
function Wi(t) {
  let e = !0;
  return e = e && "substate_id" in t, e = e && "version" in t, e = e && "substate_hex" in t, e = e && "substate_data_hash" in t, e = e && "substate_data" in t, e;
}
function bn(t) {
  return gn(t);
}
function gn(t, e) {
  return t == null ? t : {
    substate_id: x(t.substate_id),
    version: t.version,
    substate_hex: t.substate_hex,
    substate_data_hash: t.substate_data_hash,
    substate_data: b(t.substate_data)
  };
}
function On(t) {
  if (t !== void 0)
    return t === null ? null : {
      substate_id: E(t.substate_id),
      version: t.version,
      substate_hex: t.substate_hex,
      substate_data_hash: t.substate_data_hash,
      substate_data: g(t.substate_data)
    };
}
function zi(t) {
  let e = !0;
  return e = e && "down_virtual_substates" in t, e = e && "up_substates" in t, e = e && "down_substates" in t, e = e && "new_global_entities" in t, e;
}
function Nn(t) {
  return Tn(t);
}
function Tn(t, e) {
  return t == null ? t : {
    down_virtual_substates: t.down_virtual_substates.map(x),
    up_substates: t.up_substates.map(bn),
    down_substates: t.down_substates.map($e),
    new_global_entities: t.new_global_entities.map(Ue)
  };
}
function wn(t) {
  if (t !== void 0)
    return t === null ? null : {
      down_virtual_substates: t.down_virtual_substates.map(E),
      up_substates: t.up_substates.map(On),
      down_substates: t.down_substates.map(Me),
      new_global_entities: t.new_global_entities.map(ze)
    };
}
const Bi = {
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
function Hi(t) {
  return t;
}
function Gi(t) {
  let e = !0;
  return e = e && "status" in t, e = e && "fee_summary" in t, e = e && "state_updates" in t, e;
}
function Rn(t) {
  return Pn(t);
}
function Pn(t, e) {
  return t == null ? t : {
    status: Fn(t.status),
    fee_summary: Ie(t.fee_summary),
    state_updates: Nn(t.state_updates),
    output: _(t, "output") ? t.output.map(ft) : void 0,
    error_message: _(t, "error_message") ? t.error_message : void 0
  };
}
function kn(t) {
  if (t !== void 0)
    return t === null ? null : {
      status: t.status,
      fee_summary: Ce(t.fee_summary),
      state_updates: wn(t.state_updates),
      output: t.output === void 0 ? void 0 : t.output.map(pt),
      error_message: t.error_message
    };
}
function Li(t) {
  let e = !0;
  return e = e && "state_version" in t, e = e && "receipt" in t, e;
}
function xn(t) {
  return En(t);
}
function En(t, e) {
  return t == null ? t : {
    state_version: t.state_version,
    notarized_transaction: _(t, "notarized_transaction") ? ke(t.notarized_transaction) : void 0,
    receipt: Rn(t.receipt)
  };
}
function In(t) {
  if (t !== void 0)
    return t === null ? null : {
      state_version: t.state_version,
      notarized_transaction: Ee(t.notarized_transaction),
      receipt: kn(t.receipt)
    };
}
function Qi(t) {
  let e = !0;
  return e = e && "package_address" in t, e = e && "blueprint_name" in t, e;
}
function Xi(t) {
  return Vn(t);
}
function Vn(t, e) {
  return t == null ? t : {
    package_address: t.package_address,
    blueprint_name: t.blueprint_name
  };
}
function Yi(t) {
  if (t !== void 0)
    return t === null ? null : {
      package_address: t.package_address,
      blueprint_name: t.blueprint_name
    };
}
function Zi(t) {
  let e = !0;
  return e = e && "data_struct" in t, e;
}
function ji(t) {
  return Cn(t);
}
function Cn(t, e) {
  return t == null ? t : {
    data_struct: N(t.data_struct)
  };
}
function to(t) {
  if (t !== void 0)
    return t === null ? null : {
      data_struct: T(t.data_struct)
    };
}
function eo(t) {
  let e = !0;
  return e = e && "code" in t, e = e && "message" in t, e;
}
function no(t) {
  return Dn(t);
}
function Dn(t, e) {
  return t == null ? t : {
    code: t.code,
    message: t.message,
    trace_id: _(t, "trace_id") ? t.trace_id : void 0
  };
}
function ro(t) {
  if (t !== void 0)
    return t === null ? null : {
      code: t.code,
      message: t.message,
      trace_id: t.trace_id
    };
}
function io(t) {
  let e = !0;
  return e = e && "amount_attos" in t, e;
}
function oo(t) {
  return qn(t);
}
function qn(t, e) {
  return t == null ? t : {
    amount_attos: t.amount_attos
  };
}
function so(t) {
  if (t !== void 0)
    return t === null ? null : {
      amount_attos: t.amount_attos
    };
}
function uo(t) {
  let e = !0;
  return e = e && "key_hex" in t, e = e && "is_deleted" in t, e;
}
function ao(t) {
  return An(t);
}
function An(t, e) {
  return t == null ? t : {
    key_hex: t.key_hex,
    is_deleted: t.is_deleted,
    data_struct: _(t, "data_struct") ? N(t.data_struct) : void 0
  };
}
function co(t) {
  if (t !== void 0)
    return t === null ? null : {
      key_hex: t.key_hex,
      is_deleted: t.is_deleted,
      data_struct: T(t.data_struct)
    };
}
function _o(t) {
  let e = !0;
  return e = e && "nf_ids_hex" in t, e;
}
function fo(t) {
  return vn(t);
}
function vn(t, e) {
  return t == null ? t : {
    nf_ids_hex: t.nf_ids_hex
  };
}
function po(t) {
  if (t !== void 0)
    return t === null ? null : {
      nf_ids_hex: t.nf_ids_hex
    };
}
function lo(t) {
  let e = !0;
  return e = e && "nf_id_hex" in t, e = e && "is_deleted" in t, e;
}
function yo(t) {
  return $n(t);
}
function $n(t, e) {
  return t == null ? t : {
    nf_id_hex: t.nf_id_hex,
    is_deleted: t.is_deleted,
    non_fungible_data: _(t, "non_fungible_data") ? St(t.non_fungible_data) : void 0
  };
}
function mo(t) {
  if (t !== void 0)
    return t === null ? null : {
      nf_id_hex: t.nf_id_hex,
      is_deleted: t.is_deleted,
      non_fungible_data: ht(t.non_fungible_data)
    };
}
function So(t) {
  let e = !0;
  return e = e && "code_hex" in t, e;
}
function ho(t) {
  return Kn(t);
}
function Kn(t, e) {
  return t == null ? t : {
    code_hex: t.code_hex
  };
}
function bo(t) {
  if (t !== void 0)
    return t === null ? null : {
      code_hex: t.code_hex
    };
}
function go(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "resource_address" in t, e;
}
function Oo(t) {
  return Mn(t);
}
function Mn(t, e) {
  return t == null ? t : {
    resource_type: R(t.resource_type),
    resource_address: t.resource_address
  };
}
function No(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      resource_address: t.resource_address
    };
}
function To(t) {
  let e = !0;
  return e = e && "resource_address" in t, e = e && "component_address" in t, e = e && "vault_entity_id" in t, e = e && "amount_attos" in t, e;
}
function wo(t) {
  return Un(t);
}
function Un(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address,
    component_address: t.component_address,
    vault_entity_id: P(t.vault_entity_id),
    amount_attos: t.amount_attos
  };
}
function Fo(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address,
      component_address: t.component_address,
      vault_entity_id: k(t.vault_entity_id),
      amount_attos: t.amount_attos
    };
}
function Jo(t) {
  let e = !0;
  return e = e && "resource_type" in t, e = e && "metadata" in t, e = e && "total_supply_attos" in t, e;
}
function Ro(t) {
  return Wn(t);
}
function Wn(t, e) {
  return t == null ? t : {
    resource_type: R(t.resource_type),
    fungible_divisibility: _(t, "fungible_divisibility") ? t.fungible_divisibility : void 0,
    metadata: t.metadata.map(Ot),
    total_supply_attos: t.total_supply_attos
  };
}
function Po(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_type: t.resource_type,
      fungible_divisibility: t.fungible_divisibility,
      metadata: t.metadata.map(Nt),
      total_supply_attos: t.total_supply_attos
    };
}
function ko(t) {
  let e = !0;
  return e = e && "entity_type" in t, e = e && "substate_type" in t, e;
}
function xo(t) {
  return zn(t);
}
function zn(t, e) {
  return t == null ? t : {
    entity_type: d(t.entity_type),
    substate_type: p(t.substate_type)
  };
}
function Eo(t) {
  if (t !== void 0)
    return t === null ? null : {
      entity_type: t.entity_type,
      substate_type: t.substate_type
    };
}
function Io(t) {
  let e = !0;
  return e = e && "epoch" in t, e;
}
function Vo(t) {
  return Bn(t);
}
function Bn(t, e) {
  return t == null ? t : {
    epoch: t.epoch
  };
}
function Co(t) {
  if (t !== void 0)
    return t === null ? null : {
      epoch: t.epoch
    };
}
function Do(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e = e && "signatures_hash" in t, e = e && "payload_hash" in t, e;
}
function qo(t) {
  return Hn(t);
}
function Hn(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash,
    signatures_hash: t.signatures_hash,
    payload_hash: t.payload_hash
  };
}
function Ao(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash,
      signatures_hash: t.signatures_hash,
      payload_hash: t.payload_hash
    };
}
function vo(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e;
}
function $o(t) {
  return Gn(t);
}
function Gn(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash
  };
}
function Ln(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash
    };
}
function Ko(t) {
  let e = !0;
  return e = e && "committed" in t, e;
}
function Qn(t) {
  return Xn(t);
}
function Xn(t, e) {
  return t == null ? t : {
    committed: xn(t.committed)
  };
}
function Mo(t) {
  if (t !== void 0)
    return t === null ? null : {
      committed: In(t.committed)
    };
}
function Uo(t) {
  let e = !0;
  return e = e && "core_version" in t, e = e && "api_version" in t, e;
}
function Yn(t) {
  return Zn(t);
}
function Zn(t, e) {
  return t == null ? t : {
    core_version: t.core_version,
    api_version: t.api_version
  };
}
function jn(t) {
  if (t !== void 0)
    return t === null ? null : {
      core_version: t.core_version,
      api_version: t.api_version
    };
}
function Wo(t) {
  let e = !0;
  return e = e && "account_package" in t, e = e && "faucet" in t, e = e && "ecdsa_secp256k1" in t, e = e && "eddsa_ed25519" in t, e = e && "xrd" in t, e;
}
function tr(t) {
  return er(t);
}
function er(t, e) {
  return t == null ? t : {
    account_package: t.account_package,
    faucet: t.faucet,
    ecdsa_secp256k1: t.ecdsa_secp256k1,
    eddsa_ed25519: t.eddsa_ed25519,
    xrd: t.xrd
  };
}
function nr(t) {
  if (t !== void 0)
    return t === null ? null : {
      account_package: t.account_package,
      faucet: t.faucet,
      ecdsa_secp256k1: t.ecdsa_secp256k1,
      eddsa_ed25519: t.eddsa_ed25519,
      xrd: t.xrd
    };
}
function zo(t) {
  let e = !0;
  return e = e && "version" in t, e = e && "network" in t, e = e && "network_hrp_suffix" in t, e = e && "well_known_addresses" in t, e;
}
function rr(t) {
  return ir(t);
}
function ir(t, e) {
  return t == null ? t : {
    version: Yn(t.version),
    network: t.network,
    network_hrp_suffix: t.network_hrp_suffix,
    well_known_addresses: tr(t.well_known_addresses)
  };
}
function Bo(t) {
  if (t !== void 0)
    return t === null ? null : {
      version: jn(t.version),
      network: t.network,
      network_hrp_suffix: t.network_hrp_suffix,
      well_known_addresses: nr(t.well_known_addresses)
    };
}
function Ho(t) {
  let e = !0;
  return e = e && "parent" in t, e = e && "entity_id" in t, e = e && "depth" in t, e;
}
function or(t) {
  return sr(t);
}
function sr(t, e) {
  return t == null ? t : {
    parent: x(t.parent),
    entity_id: P(t.entity_id),
    depth: t.depth
  };
}
function ur(t) {
  if (t !== void 0)
    return t === null ? null : {
      parent: E(t.parent),
      entity_id: k(t.entity_id),
      depth: t.depth
    };
}
function Go(t) {
  let e = !0;
  return e = e && "component_address" in t, e;
}
function Lo(t) {
  return ar(t);
}
function ar(t, e) {
  return t == null ? t : {
    component_address: t.component_address
  };
}
function cr(t) {
  if (t !== void 0)
    return t === null ? null : {
      component_address: t.component_address
    };
}
function Qo(t) {
  let e = !0;
  return e = e && "info" in t, e = e && "state" in t, e = e && "owned_vaults" in t, e = e && "descendent_ids" in t, e;
}
function dr(t) {
  return _r(t);
}
function _r(t, e) {
  return t == null ? t : {
    info: b(t.info),
    state: b(t.state),
    owned_vaults: t.owned_vaults.map(b),
    descendent_ids: t.descendent_ids.map(or)
  };
}
function Xo(t) {
  if (t !== void 0)
    return t === null ? null : {
      info: g(t.info),
      state: g(t.state),
      owned_vaults: t.owned_vaults.map(g),
      descendent_ids: t.descendent_ids.map(ur)
    };
}
function Yo(t) {
  let e = !0;
  return e = e && "epoch" in t, e;
}
function fr(t) {
  return pr(t);
}
function pr(t, e) {
  return t == null ? t : {
    epoch: t.epoch
  };
}
function Zo(t) {
  if (t !== void 0)
    return t === null ? null : {
      epoch: t.epoch
    };
}
function jo(t) {
  let e = !0;
  return e = e && "resource_address" in t, e = e && "non_fungible_id_hex" in t, e;
}
function ts(t) {
  return lr(t);
}
function lr(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address,
    non_fungible_id_hex: t.non_fungible_id_hex
  };
}
function yr(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address,
      non_fungible_id_hex: t.non_fungible_id_hex
    };
}
function es(t) {
  let e = !0;
  return e = e && "non_fungible" in t, e;
}
function mr(t) {
  return Sr(t);
}
function Sr(t, e) {
  return t == null ? t : {
    non_fungible: b(t.non_fungible)
  };
}
function ns(t) {
  if (t !== void 0)
    return t === null ? null : {
      non_fungible: g(t.non_fungible)
    };
}
function rs(t) {
  let e = !0;
  return e = e && "package_address" in t, e;
}
function is(t) {
  return hr(t);
}
function hr(t, e) {
  return t == null ? t : {
    package_address: t.package_address
  };
}
function br(t) {
  if (t !== void 0)
    return t === null ? null : {
      package_address: t.package_address
    };
}
function os(t) {
  let e = !0;
  return e = e && "_package" in t, e;
}
function gr(t) {
  return Or(t);
}
function Or(t, e) {
  return t == null ? t : {
    _package: b(t.package)
  };
}
function ss(t) {
  if (t !== void 0)
    return t === null ? null : {
      package: g(t._package)
    };
}
function us(t) {
  let e = !0;
  return e = e && "resource_address" in t, e;
}
function as(t) {
  return Nr(t);
}
function Nr(t, e) {
  return t == null ? t : {
    resource_address: t.resource_address
  };
}
function Tr(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_address: t.resource_address
    };
}
function cs(t) {
  let e = !0;
  return e = e && "manager" in t, e;
}
function wr(t) {
  return Fr(t);
}
function Fr(t, e) {
  return t == null ? t : {
    manager: b(t.manager)
  };
}
function ds(t) {
  if (t !== void 0)
    return t === null ? null : {
      manager: g(t.manager)
    };
}
const _s = {
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  InMempool: "InMempool",
  Rejected: "Rejected"
};
function fs(t) {
  let e = !0;
  return e = e && "payload_hash" in t, e = e && "status" in t, e;
}
function Jr(t) {
  return Rr(t);
}
function Rr(t, e) {
  return t == null ? t : {
    payload_hash: t.payload_hash,
    status: t.status,
    error_message: _(t, "error_message") ? t.error_message : void 0
  };
}
function Pr(t) {
  if (t !== void 0)
    return t === null ? null : {
      payload_hash: t.payload_hash,
      status: t.status,
      error_message: t.error_message
    };
}
function ps(t) {
  let e = !0;
  return e = e && "intent_hash" in t, e;
}
function ls(t) {
  return kr(t);
}
function kr(t, e) {
  return t == null ? t : {
    intent_hash: t.intent_hash
  };
}
function xr(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_hash: t.intent_hash
    };
}
const ys = {
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  InMempool: "InMempool",
  Rejected: "Rejected",
  Unknown: "Unknown"
};
function ms(t) {
  let e = !0;
  return e = e && "intent_status" in t, e = e && "known_payloads" in t, e;
}
function Er(t) {
  return Ir(t);
}
function Ir(t, e) {
  return t == null ? t : {
    intent_status: t.intent_status,
    known_payloads: t.known_payloads.map(Jr)
  };
}
function Ss(t) {
  if (t !== void 0)
    return t === null ? null : {
      intent_status: t.intent_status,
      known_payloads: t.known_payloads.map(Pr)
    };
}
function hs(t) {
  let e = !0;
  return e = e && "notarized_transaction_hex" in t, e;
}
function bs(t) {
  return Vr(t);
}
function Vr(t, e) {
  return t == null ? t : {
    notarized_transaction_hex: t.notarized_transaction_hex
  };
}
function Cr(t) {
  if (t !== void 0)
    return t === null ? null : {
      notarized_transaction_hex: t.notarized_transaction_hex
    };
}
function gs(t) {
  let e = !0;
  return e = e && "duplicate" in t, e;
}
function Dr(t) {
  return qr(t);
}
function qr(t, e) {
  return t == null ? t : {
    duplicate: t.duplicate
  };
}
function Os(t) {
  if (t !== void 0)
    return t === null ? null : {
      duplicate: t.duplicate
    };
}
function Ns(t) {
  let e = !0;
  return e = e && "resource_amount" in t, e;
}
function Ts(t) {
  return Ar(t);
}
function Ar(t, e) {
  return t == null ? t : {
    resource_amount: Rt(t.resource_amount)
  };
}
function ws(t) {
  if (t !== void 0)
    return t === null ? null : {
      resource_amount: Pt(t.resource_amount)
    };
}
var f = (t, e, n) => new Promise((i, r) => {
  var o = (u) => {
    try {
      a(n.next(u));
    } catch (c) {
      r(c);
    }
  }, s = (u) => {
    try {
      a(n.throw(u));
    } catch (c) {
      r(c);
    }
  }, a = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(o, s);
  a((n = n.apply(t, e)).next());
});
class Fs extends V {
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
        body: cr(e.v0StateComponentRequest)
      }, n);
      return new l(o, (s) => dr(s));
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
      return new l(r, (o) => fr(o));
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
        body: yr(e.v0StateNonFungibleRequest)
      }, n);
      return new l(o, (s) => mr(s));
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
        body: br(e.v0StatePackageRequest)
      }, n);
      return new l(o, (s) => gr(s));
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
        body: Tr(e.v0StateResourceRequest)
      }, n);
      return new l(o, (s) => wr(s));
    });
  }
  stateResourcePost(e, n) {
    return f(this, null, function* () {
      return yield (yield this.stateResourcePostRaw(e, n)).value();
    });
  }
}
var j = (t, e, n) => new Promise((i, r) => {
  var o = (u) => {
    try {
      a(n.next(u));
    } catch (c) {
      r(c);
    }
  }, s = (u) => {
    try {
      a(n.throw(u));
    } catch (c) {
      r(c);
    }
  }, a = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(o, s);
  a((n = n.apply(t, e)).next());
});
class Js extends V {
  statusNetworkConfigurationPostRaw(e) {
    return j(this, null, function* () {
      const n = {}, i = {}, r = yield this.request({
        path: "/status/network-configuration",
        method: "POST",
        headers: i,
        query: n
      }, e);
      return new l(r, (o) => rr(o));
    });
  }
  statusNetworkConfigurationPost(e) {
    return j(this, null, function* () {
      return yield (yield this.statusNetworkConfigurationPostRaw(e)).value();
    });
  }
}
var O = (t, e, n) => new Promise((i, r) => {
  var o = (u) => {
    try {
      a(n.next(u));
    } catch (c) {
      r(c);
    }
  }, s = (u) => {
    try {
      a(n.throw(u));
    } catch (c) {
      r(c);
    }
  }, a = (u) => u.done ? i(u.value) : Promise.resolve(u.value).then(o, s);
  a((n = n.apply(t, e)).next());
});
class Rs extends V {
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
        body: Ln(e.v0CommittedTransactionRequest)
      }, n);
      return new l(o, (s) => Qn(s));
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
        body: xr(e.v0TransactionStatusRequest)
      }, n);
      return new l(o, (s) => Er(s));
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
        body: Cr(e.v0TransactionSubmitRequest)
      }, n);
      return new l(o, (s) => Dr(s));
    });
  }
  transactionSubmitPost(e, n) {
    return O(this, null, function* () {
      return yield (yield this.transactionSubmitPostRaw(e, n)).value();
    });
  }
}
export {
  Dt as BASE_PATH,
  V as BaseAPI,
  Ur as BlobApiResponse,
  vr as COLLECTION_FORMATS,
  Br as CommittedStateIdentifierFromJSON,
  Ut as CommittedStateIdentifierFromJSONTyped,
  Hr as CommittedStateIdentifierToJSON,
  xn as CommittedTransactionFromJSON,
  En as CommittedTransactionFromJSONTyped,
  In as CommittedTransactionToJSON,
  Xi as ComponentInfoSubstateAllOfFromJSON,
  Vn as ComponentInfoSubstateAllOfFromJSONTyped,
  Yi as ComponentInfoSubstateAllOfToJSON,
  hi as ComponentInfoSubstateFromJSON,
  lt as ComponentInfoSubstateFromJSONTyped,
  Be as ComponentInfoSubstateToJSON,
  ji as ComponentStateSubstateAllOfFromJSON,
  Cn as ComponentStateSubstateAllOfFromJSONTyped,
  to as ComponentStateSubstateAllOfToJSON,
  Ni as ComponentStateSubstateFromJSON,
  yt as ComponentStateSubstateFromJSONTyped,
  Le as ComponentStateSubstateToJSON,
  qt as Configuration,
  N as DataStructFromJSON,
  Ge as DataStructFromJSONTyped,
  T as DataStructToJSON,
  At as DefaultConfig,
  $e as DownSubstateFromJSON,
  Ke as DownSubstateFromJSONTyped,
  Me as DownSubstateToJSON,
  ri as EcdsaSecp256k1PublicKeyFromJSON,
  _t as EcdsaSecp256k1PublicKeyFromJSONTyped,
  _e as EcdsaSecp256k1PublicKeyToJSON,
  zt as EcdsaSecp256k1SignatureFromJSON,
  rt as EcdsaSecp256k1SignatureFromJSONTyped,
  it as EcdsaSecp256k1SignatureToJSON,
  Zr as EcdsaSecp256k1SignatureWithPublicKeyFromJSON,
  ut as EcdsaSecp256k1SignatureWithPublicKeyFromJSONTyped,
  te as EcdsaSecp256k1SignatureWithPublicKeyToJSON,
  ee as EddsaEd25519PublicKeyFromJSON,
  at as EddsaEd25519PublicKeyFromJSONTyped,
  ct as EddsaEd25519PublicKeyToJSON,
  Bt as EddsaEd25519SignatureFromJSON,
  ot as EddsaEd25519SignatureFromJSONTyped,
  st as EddsaEd25519SignatureToJSON,
  ei as EddsaEd25519SignatureWithPublicKeyFromJSON,
  dt as EddsaEd25519SignatureWithPublicKeyFromJSONTyped,
  ne as EddsaEd25519SignatureWithPublicKeyToJSON,
  P as EntityIdFromJSON,
  He as EntityIdFromJSONTyped,
  k as EntityIdToJSON,
  di as EntityType,
  d as EntityTypeFromJSON,
  qe as EntityTypeFromJSONTyped,
  _i as EntityTypeToJSON,
  no as ErrorResponseFromJSON,
  Dn as ErrorResponseFromJSONTyped,
  ro as ErrorResponseToJSON,
  Ie as FeeSummaryFromJSON,
  Ve as FeeSummaryFromJSONTyped,
  Ce as FeeSummaryToJSON,
  Mt as FetchError,
  oo as FungibleResourceAmountAllOfFromJSON,
  qn as FungibleResourceAmountAllOfFromJSONTyped,
  so as FungibleResourceAmountAllOfToJSON,
  vi as FungibleResourceAmountFromJSON,
  Ft as FungibleResourceAmountFromJSONTyped,
  rn as FungibleResourceAmountToJSON,
  Ue as GlobalEntityIdFromJSON,
  We as GlobalEntityIdFromJSONTyped,
  ze as GlobalEntityIdToJSON,
  l as JSONApiResponse,
  ao as KeyValueStoreEntrySubstateAllOfFromJSON,
  An as KeyValueStoreEntrySubstateAllOfFromJSONTyped,
  co as KeyValueStoreEntrySubstateAllOfToJSON,
  wi as KeyValueStoreEntrySubstateFromJSON,
  mt as KeyValueStoreEntrySubstateFromJSONTyped,
  Qe as KeyValueStoreEntrySubstateToJSON,
  St as NonFungibleDataFromJSON,
  Xe as NonFungibleDataFromJSONTyped,
  ht as NonFungibleDataToJSON,
  fo as NonFungibleResourceAmountAllOfFromJSON,
  vn as NonFungibleResourceAmountAllOfFromJSONTyped,
  po as NonFungibleResourceAmountAllOfToJSON,
  Ki as NonFungibleResourceAmountFromJSON,
  Jt as NonFungibleResourceAmountFromJSONTyped,
  on as NonFungibleResourceAmountToJSON,
  yo as NonFungibleSubstateAllOfFromJSON,
  $n as NonFungibleSubstateAllOfFromJSONTyped,
  mo as NonFungibleSubstateAllOfToJSON,
  Ri as NonFungibleSubstateFromJSON,
  bt as NonFungibleSubstateFromJSONTyped,
  Ye as NonFungibleSubstateToJSON,
  ke as NotarizedTransactionFromJSON,
  xe as NotarizedTransactionFromJSONTyped,
  Ee as NotarizedTransactionToJSON,
  ho as PackageSubstateAllOfFromJSON,
  Kn as PackageSubstateAllOfFromJSONTyped,
  bo as PackageSubstateAllOfToJSON,
  ki as PackageSubstateFromJSON,
  gt as PackageSubstateFromJSONTyped,
  Ze as PackageSubstateToJSON,
  Se as PublicKeyFromJSON,
  he as PublicKeyFromJSONTyped,
  be as PublicKeyToJSON,
  Gr as PublicKeyType,
  w as PublicKeyTypeFromJSON,
  Wt as PublicKeyTypeFromJSONTyped,
  Lr as PublicKeyTypeToJSON,
  h as RequiredError,
  Oo as ResourceAmountBaseFromJSON,
  Mn as ResourceAmountBaseFromJSONTyped,
  No as ResourceAmountBaseToJSON,
  Rt as ResourceAmountFromJSON,
  _n as ResourceAmountFromJSONTyped,
  Pt as ResourceAmountToJSON,
  wo as ResourceChangeFromJSON,
  Un as ResourceChangeFromJSONTyped,
  Fo as ResourceChangeToJSON,
  Ro as ResourceManagerSubstateAllOfFromJSON,
  Wn as ResourceManagerSubstateAllOfFromJSONTyped,
  Ot as ResourceManagerSubstateAllOfMetadataFromJSON,
  je as ResourceManagerSubstateAllOfMetadataFromJSONTyped,
  Nt as ResourceManagerSubstateAllOfMetadataToJSON,
  Po as ResourceManagerSubstateAllOfToJSON,
  Ci as ResourceManagerSubstateFromJSON,
  Tt as ResourceManagerSubstateFromJSONTyped,
  en as ResourceManagerSubstateToJSON,
  Ei as ResourceType,
  R as ResourceTypeFromJSON,
  tn as ResourceTypeFromJSONTyped,
  Ii as ResourceTypeToJSON,
  Kt as ResponseError,
  ft as SborDataFromJSON,
  De as SborDataFromJSONTyped,
  pt as SborDataToJSON,
  Yt as SignatureFromJSON,
  Zt as SignatureFromJSONTyped,
  jt as SignatureToJSON,
  ae as SignatureWithPublicKeyFromJSON,
  ce as SignatureWithPublicKeyFromJSONTyped,
  de as SignatureWithPublicKeyToJSON,
  Je as SignedTransactionIntentFromJSON,
  Re as SignedTransactionIntentFromJSONTyped,
  Pe as SignedTransactionIntentToJSON,
  Fs as StateApi,
  Nn as StateUpdatesFromJSON,
  Tn as StateUpdatesFromJSONTyped,
  wn as StateUpdatesToJSON,
  Js as StatusApi,
  xo as SubstateBaseFromJSON,
  zn as SubstateBaseFromJSONTyped,
  Eo as SubstateBaseToJSON,
  b as SubstateFromJSON,
  hn as SubstateFromJSONTyped,
  x as SubstateIdFromJSON,
  ve as SubstateIdFromJSONTyped,
  E as SubstateIdToJSON,
  g as SubstateToJSON,
  fi as SubstateType,
  p as SubstateTypeFromJSON,
  Ae as SubstateTypeFromJSONTyped,
  pi as SubstateTypeToJSON,
  Vo as SystemSubstateAllOfFromJSON,
  Bn as SystemSubstateAllOfFromJSONTyped,
  Co as SystemSubstateAllOfToJSON,
  qi as SystemSubstateFromJSON,
  wt as SystemSubstateFromJSONTyped,
  nn as SystemSubstateToJSON,
  Wr as TextApiResponse,
  Rs as TransactionApi,
  ge as TransactionHeaderFromJSON,
  Oe as TransactionHeaderFromJSONTyped,
  Ne as TransactionHeaderToJSON,
  qo as TransactionIdentifiersFromJSON,
  Hn as TransactionIdentifiersFromJSONTyped,
  Ao as TransactionIdentifiersToJSON,
  Te as TransactionIntentFromJSON,
  we as TransactionIntentFromJSONTyped,
  Fe as TransactionIntentToJSON,
  Rn as TransactionReceiptFromJSON,
  Pn as TransactionReceiptFromJSONTyped,
  kn as TransactionReceiptToJSON,
  Bi as TransactionStatus,
  Fn as TransactionStatusFromJSON,
  Jn as TransactionStatusFromJSONTyped,
  Hi as TransactionStatusToJSON,
  bn as UpSubstateFromJSON,
  gn as UpSubstateFromJSONTyped,
  On as UpSubstateToJSON,
  $o as V0CommittedTransactionRequestFromJSON,
  Gn as V0CommittedTransactionRequestFromJSONTyped,
  Ln as V0CommittedTransactionRequestToJSON,
  Qn as V0CommittedTransactionResponseFromJSON,
  Xn as V0CommittedTransactionResponseFromJSONTyped,
  Mo as V0CommittedTransactionResponseToJSON,
  rr as V0NetworkConfigurationResponseFromJSON,
  ir as V0NetworkConfigurationResponseFromJSONTyped,
  Bo as V0NetworkConfigurationResponseToJSON,
  Yn as V0NetworkConfigurationResponseVersionFromJSON,
  Zn as V0NetworkConfigurationResponseVersionFromJSONTyped,
  jn as V0NetworkConfigurationResponseVersionToJSON,
  tr as V0NetworkConfigurationResponseWellKnownAddressesFromJSON,
  er as V0NetworkConfigurationResponseWellKnownAddressesFromJSONTyped,
  nr as V0NetworkConfigurationResponseWellKnownAddressesToJSON,
  or as V0StateComponentDescendentIdFromJSON,
  sr as V0StateComponentDescendentIdFromJSONTyped,
  ur as V0StateComponentDescendentIdToJSON,
  Lo as V0StateComponentRequestFromJSON,
  ar as V0StateComponentRequestFromJSONTyped,
  cr as V0StateComponentRequestToJSON,
  dr as V0StateComponentResponseFromJSON,
  _r as V0StateComponentResponseFromJSONTyped,
  Xo as V0StateComponentResponseToJSON,
  fr as V0StateEpochResponseFromJSON,
  pr as V0StateEpochResponseFromJSONTyped,
  Zo as V0StateEpochResponseToJSON,
  ts as V0StateNonFungibleRequestFromJSON,
  lr as V0StateNonFungibleRequestFromJSONTyped,
  yr as V0StateNonFungibleRequestToJSON,
  mr as V0StateNonFungibleResponseFromJSON,
  Sr as V0StateNonFungibleResponseFromJSONTyped,
  ns as V0StateNonFungibleResponseToJSON,
  is as V0StatePackageRequestFromJSON,
  hr as V0StatePackageRequestFromJSONTyped,
  br as V0StatePackageRequestToJSON,
  gr as V0StatePackageResponseFromJSON,
  Or as V0StatePackageResponseFromJSONTyped,
  ss as V0StatePackageResponseToJSON,
  as as V0StateResourceRequestFromJSON,
  Nr as V0StateResourceRequestFromJSONTyped,
  Tr as V0StateResourceRequestToJSON,
  wr as V0StateResourceResponseFromJSON,
  Fr as V0StateResourceResponseFromJSONTyped,
  ds as V0StateResourceResponseToJSON,
  Jr as V0TransactionPayloadStatusFromJSON,
  Rr as V0TransactionPayloadStatusFromJSONTyped,
  _s as V0TransactionPayloadStatusStatusEnum,
  Pr as V0TransactionPayloadStatusToJSON,
  ls as V0TransactionStatusRequestFromJSON,
  kr as V0TransactionStatusRequestFromJSONTyped,
  xr as V0TransactionStatusRequestToJSON,
  Er as V0TransactionStatusResponseFromJSON,
  Ir as V0TransactionStatusResponseFromJSONTyped,
  ys as V0TransactionStatusResponseIntentStatusEnum,
  Ss as V0TransactionStatusResponseToJSON,
  bs as V0TransactionSubmitRequestFromJSON,
  Vr as V0TransactionSubmitRequestFromJSONTyped,
  Cr as V0TransactionSubmitRequestToJSON,
  Dr as V0TransactionSubmitResponseFromJSON,
  qr as V0TransactionSubmitResponseFromJSONTyped,
  Os as V0TransactionSubmitResponseToJSON,
  Ts as VaultSubstateAllOfFromJSON,
  Ar as VaultSubstateAllOfFromJSONTyped,
  ws as VaultSubstateAllOfToJSON,
  Ui as VaultSubstateFromJSON,
  kt as VaultSubstateFromJSONTyped,
  fn as VaultSubstateToJSON,
  Mr as VoidApiResponse,
  Kr as canConsumeForm,
  _ as exists,
  zr as instanceOfCommittedStateIdentifier,
  Li as instanceOfCommittedTransaction,
  Si as instanceOfComponentInfoSubstate,
  Qi as instanceOfComponentInfoSubstateAllOf,
  Oi as instanceOfComponentStateSubstate,
  Zi as instanceOfComponentStateSubstateAllOf,
  gi as instanceOfDataStruct,
  yi as instanceOfDownSubstate,
  ni as instanceOfEcdsaSecp256k1PublicKey,
  Qr as instanceOfEcdsaSecp256k1Signature,
  Yr as instanceOfEcdsaSecp256k1SignatureWithPublicKey,
  jr as instanceOfEddsaEd25519PublicKey,
  Xr as instanceOfEddsaEd25519Signature,
  ti as instanceOfEddsaEd25519SignatureWithPublicKey,
  bi as instanceOfEntityId,
  eo as instanceOfErrorResponse,
  ai as instanceOfFeeSummary,
  Ai as instanceOfFungibleResourceAmount,
  io as instanceOfFungibleResourceAmountAllOf,
  mi as instanceOfGlobalEntityId,
  Ti as instanceOfKeyValueStoreEntrySubstate,
  uo as instanceOfKeyValueStoreEntrySubstateAllOf,
  Fi as instanceOfNonFungibleData,
  $i as instanceOfNonFungibleResourceAmount,
  _o as instanceOfNonFungibleResourceAmountAllOf,
  Ji as instanceOfNonFungibleSubstate,
  lo as instanceOfNonFungibleSubstateAllOf,
  ui as instanceOfNotarizedTransaction,
  Pi as instanceOfPackageSubstate,
  So as instanceOfPackageSubstateAllOf,
  go as instanceOfResourceAmountBase,
  To as instanceOfResourceChange,
  Vi as instanceOfResourceManagerSubstate,
  Jo as instanceOfResourceManagerSubstateAllOf,
  xi as instanceOfResourceManagerSubstateAllOfMetadata,
  ci as instanceOfSborData,
  si as instanceOfSignedTransactionIntent,
  zi as instanceOfStateUpdates,
  ko as instanceOfSubstateBase,
  li as instanceOfSubstateId,
  Di as instanceOfSystemSubstate,
  Io as instanceOfSystemSubstateAllOf,
  ii as instanceOfTransactionHeader,
  Do as instanceOfTransactionIdentifiers,
  oi as instanceOfTransactionIntent,
  Gi as instanceOfTransactionReceipt,
  Wi as instanceOfUpSubstate,
  vo as instanceOfV0CommittedTransactionRequest,
  Ko as instanceOfV0CommittedTransactionResponse,
  zo as instanceOfV0NetworkConfigurationResponse,
  Uo as instanceOfV0NetworkConfigurationResponseVersion,
  Wo as instanceOfV0NetworkConfigurationResponseWellKnownAddresses,
  Ho as instanceOfV0StateComponentDescendentId,
  Go as instanceOfV0StateComponentRequest,
  Qo as instanceOfV0StateComponentResponse,
  Yo as instanceOfV0StateEpochResponse,
  jo as instanceOfV0StateNonFungibleRequest,
  es as instanceOfV0StateNonFungibleResponse,
  rs as instanceOfV0StatePackageRequest,
  os as instanceOfV0StatePackageResponse,
  us as instanceOfV0StateResourceRequest,
  cs as instanceOfV0StateResourceResponse,
  fs as instanceOfV0TransactionPayloadStatus,
  ps as instanceOfV0TransactionStatusRequest,
  ms as instanceOfV0TransactionStatusResponse,
  hs as instanceOfV0TransactionSubmitRequest,
  gs as instanceOfV0TransactionSubmitResponse,
  Mi as instanceOfVaultSubstate,
  Ns as instanceOfVaultSubstateAllOf,
  $r as mapValues,
  et as querystring
};
