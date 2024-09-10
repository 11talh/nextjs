import{C as V}from"./sanity-1014fcf1.js";const C=/_key\s*==\s*['"](.*)['"]/;function G(n){return typeof n=="string"?C.test(n.trim()):typeof n=="object"&&"_key"in n}function L(n){if(!Array.isArray(n))throw new Error("Path is not an array");return n.reduce((t,r,i)=>{const e=typeof r;if(e==="number")return`${t}[${r}]`;if(e==="string")return`${t}${i===0?"":"."}${r}`;if(G(r)&&r._key)return`${t}[_key=="${r._key}"]`;if(Array.isArray(r)){const[s,o]=r;return`${t}[${s}:${o}]`}throw new Error(`Unsupported path segment \`${JSON.stringify(r)}\``)},"")}const U={"\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","'":"\\'","\\":"\\\\"},A={"\\f":"\f","\\n":`
`,"\\r":"\r","\\t":"	","\\'":"'","\\\\":"\\"};function K(n){return`$${n.map(t=>typeof t=="string"?`['${t.replace(/[\f\n\r\t'\\]/g,r=>U[r])}']`:typeof t=="number"?`[${t}]`:t._key!==""?`[?(@._key=='${t._key.replace(/['\\]/g,r=>U[r])}')]`:`[${t._index}]`).join("")}`}function R(n){const t=[],r=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;let i;for(;(i=r.exec(n))!==null;){if(i[1]!==void 0){const e=i[1].replace(/\\(\\|f|n|r|t|')/g,s=>A[s]);t.push(e);continue}if(i[2]!==void 0){t.push(parseInt(i[2],10));continue}if(i[3]!==void 0){const e=i[3].replace(/\\(\\')/g,s=>A[s]);t.push({_key:e,_index:-1});continue}}return t}function O(n){return n.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._key!=="")return{_key:t._key};if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function z(n){return n.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function B(n,t){if(!(t!=null&&t.mappings))return;const r=K(z(n));if(t.mappings[r]!==void 0)return{mapping:t.mappings[r],matchedPath:r,pathSuffix:""};const i=Object.entries(t.mappings).filter(([c])=>r.startsWith(c)).sort(([c],[f])=>f.length-c.length);if(i.length==0)return;const[e,s]=i[0],o=r.substring(e.length);return{mapping:s,matchedPath:e,pathSuffix:o}}function H(n){return n!==null&&Array.isArray(n)}function x(n){return typeof n=="object"&&n!==null}function m(n,t,r=[]){return H(n)?n.map((i,e)=>{if(x(i)){const s=i._key;if(typeof s=="string")return m(i,t,r.concat({_key:s,_index:e}))}return m(i,t,r.concat(e))}):x(n)?Object.fromEntries(Object.entries(n).map(([i,e])=>[i,m(e,t,r.concat(i))])):t(n,r)}function X(n,t,r){return m(n,(i,e)=>{if(typeof i!="string")return i;const s=B(e,t);if(!s)return i;const{mapping:o,matchedPath:c}=s;if(o.type!=="value"||o.source.type!=="documentValue")return i;const f=t.documents[o.source.document],d=t.paths[o.source.path],u=R(c),y=R(d).concat(e.slice(u.length));return r({sourcePath:y,sourceDocument:f,resultPath:e,value:i})})}const S="drafts.";function F(n){return n.startsWith(S)?n.slice(S.length):n}function Q(n){const{baseUrl:t,workspace:r="default",tool:i="default",id:e,type:s,path:o,projectId:c,dataset:f}=n;if(!t)throw new Error("baseUrl is required");if(!o)throw new Error("path is required");if(!e)throw new Error("id is required");if(t!=="/"&&t.endsWith("/"))throw new Error("baseUrl must not end with a slash");const d=r==="default"?void 0:r,u=i==="default"?void 0:i,y=F(e),_=Array.isArray(o)?L(O(o)):o,h=new URLSearchParams({baseUrl:t,id:y,type:s,path:_});d&&h.set("workspace",d),u&&h.set("tool",u),c&&h.set("projectId",c),f&&h.set("dataset",f),e.startsWith(S)&&h.set("isDraft","");const k=[t==="/"?"":t];d&&k.push(d);const $=["mode=presentation",`id=${y}`,`type=${s}`,`path=${encodeURIComponent(_)}`];return u&&$.push(`tool=${u}`),k.push("intent","edit",`${$.join(";")}?${h}`),k.join("/")}function Y(n){let t=typeof n=="string"?n:n.baseUrl;return t!=="/"&&(t=t.replace(/\/$/,"")),typeof n=="string"?{baseUrl:t}:{...n,baseUrl:t}}const E=({sourcePath:n,resultPath:t,value:r})=>{if(v(r)||g(r))return!1;const i=n.at(-1);return!(n.at(-2)==="slug"&&i==="current"||typeof i=="string"&&i.startsWith("_")||typeof i=="number"&&n.at(-2)==="marks"||i==="href"&&typeof n.at(-2)=="number"&&n.at(-3)==="markDefs"||i==="style"||i==="listItem"||n.some(e=>e==="meta"||e==="metadata"||e==="openGraph"||e==="seo")||T(n)||T(t)||typeof i=="string"&&Z.has(i))},Z=new Set(["color","colour","currency","email","format","gid","hex","href","hsl","hsla","icon","id","index","key","language","layout","link","linkAction","locale","lqip","page","path","ref","rgb","rgba","route","secret","slug","status","tag","template","theme","type","unit","url","username","variant","website"]);function v(n){return/^\d{4}-\d{2}-\d{2}/.test(n)?!!Date.parse(n):!1}function g(n){try{new URL(n,n.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}function T(n){return n.some(t=>typeof t=="string"&&t.match(/type/i)!==null)}const b=20;function tt(n,t,r){var f,d,u,y,_,h,k,$,j;const{filter:i,logger:e,enabled:s}=r;if(!s){const a="config.enabled must be true, don't call this function otherwise";throw(f=e==null?void 0:e.error)==null||f.call(e,`[@sanity/client]: ${a}`,{result:n,resultSourceMap:t,config:r}),new TypeError(a)}if(!t)return(d=e==null?void 0:e.error)==null||d.call(e,"[@sanity/client]: Missing Content Source Map from response body",{result:n,resultSourceMap:t,config:r}),n;if(!r.studioUrl){const a="config.studioUrl must be defined";throw(u=e==null?void 0:e.error)==null||u.call(e,`[@sanity/client]: ${a}`,{result:n,resultSourceMap:t,config:r}),new TypeError(a)}const o={encoded:[],skipped:[]},c=X(n,t,({sourcePath:a,sourceDocument:l,resultPath:w,value:p})=>{if((typeof i=="function"?i({sourcePath:a,resultPath:w,filterDefault:E,sourceDocument:l,value:p}):E({sourcePath:a,resultPath:w,filterDefault:E,sourceDocument:l,value:p}))===!1)return e&&o.skipped.push({path:I(a),value:`${p.slice(0,b)}${p.length>b?"...":""}`,length:p.length}),p;e&&o.encoded.push({path:I(a),value:`${p.slice(0,b)}${p.length>b?"...":""}`,length:p.length});const{baseUrl:P,workspace:W,tool:D}=Y(typeof r.studioUrl=="function"?r.studioUrl(l):r.studioUrl);if(!P)return p;const{_id:N,_type:M,_projectId:q,_dataset:J}=l;return V(p,{origin:"sanity.io",href:Q({baseUrl:P,workspace:W,tool:D,id:N,type:M,path:a,...!r.omitCrossDatasetReferenceData&&{dataset:J,projectId:q}})},!1)});if(e){const a=o.skipped.length,l=o.encoded.length;if((a||l)&&((y=(e==null?void 0:e.groupCollapsed)||e.log)==null||y("[@sanity/client]: Encoding source map into result"),(_=e.log)==null||_.call(e,`[@sanity/client]: Paths encoded: ${o.encoded.length}, skipped: ${o.skipped.length}`)),o.encoded.length>0&&((h=e==null?void 0:e.log)==null||h.call(e,"[@sanity/client]: Table of encoded paths"),(k=(e==null?void 0:e.table)||e.log)==null||k(o.encoded)),o.skipped.length>0){const w=new Set;for(const{path:p}of o.skipped)w.add(p.replace(C,"0").replace(/\[\d+\]/g,"[]"));($=e==null?void 0:e.log)==null||$.call(e,"[@sanity/client]: List of skipped paths",[...w.values()])}(a||l)&&((j=e==null?void 0:e.groupEnd)==null||j.call(e))}return c}function I(n){return L(O(n))}var nt=Object.freeze({__proto__:null,stegaEncodeSourceMap:tt});export{X as encodeIntoResult,tt as stegaEncodeSourceMap,nt as stegaEncodeSourceMap$1};
