import e from"crypto";var t=require("asn1.js"),i=require("bn.js"),r=t.define("ECPrivateKey",(function(){this.seq().obj(this.key("version").int(),this.key("privateKey").octstr(),this.key("parameters").explicit(0).objid().optional(),this.key("publicKey").explicit(1).bitstr().optional())})),n=function(e){return r.encode({version:new i(1),privateKey:e.getPrivateKey(),parameters:(t="1.2.840.10045.3.1.7",t.split(".").map((function(e){return parseInt(e,10)})))},"pem",{label:"EC PRIVATE KEY"});var t},a=function(t,i,r,a){void 0===a&&(a=null);var s=a||(new Date).getTime(),o=function(e,t,i){return e+"."+t+"."+i}(t,r,s),p=e.createSign("SHA256");p.update(o),p.end();var u=e.createECDH("prime256v1");return u.setPrivateKey(i,"base64"),{signature:p.sign(n(u),"hex"),timestamp:s}};export{a as sign};
