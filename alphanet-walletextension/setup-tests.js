const util = require("node:util");
const { Crypto } = require("@peculiar/webcrypto");

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
require("isomorphic-fetch");
global.crypto.subtle = new Crypto().subtle;
