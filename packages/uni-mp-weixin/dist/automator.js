var n,t=Object.prototype.hasOwnProperty,e=Array.isArray,r=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;function o(n,o){if(e(n))return n;if(o&&(u=o,i=n,t.call(u,i)))return[n];var u,i,a=[];return n.replace(r,(function(n,t,e,r){return a.push(e?r.replace(/\\(\\)?/g,"$1"):t||n),r})),a}function u(n){return n.__wxWebviewId__?n.__wxWebviewId__:n.privateProperties?n.privateProperties.slaveId:n.$page?n.$page.id:void 0}function i(n){return n.route||n.uri}function a(n){return n.options||n.$page&&n.$page.options||{}}function c(n){return{id:u(n),path:i(n),query:a(n)}}function s(n){var t=function(n){return getCurrentPages().find((function(t){return u(t)===n}))}(n);return t&&t.$vm}function f(n,t){var e=s(n);return e&&function n(t,e){var r;return t&&(!function(n,t){return n.$scope&&((e=n.$scope).__wxExparserNodeId__||e.nodeId||e.id)===t;var e}(t,e)?t.$children.find((function(t){return r=n(t,e)})):r=t),r}(e,t)}function p(n,t){var e;return n&&(e=t?function(n,t){var e,r=o(t,n);for(e=r.shift();null!=e;){if(null==(n=n[e]))return;e=r.shift()}return n}(n.$data,t):Object.assign({},n.$data)),Promise.resolve({data:e})}function g(n,t){return n&&Object.keys(t).forEach((function(e){n[e]=t[e]})),Promise.resolve()}function l(t,e,r){return new Promise((function(o,u){if(!t)return u(n.VM_NOT_EXISTS);if(!t[e])return u(n.VM_NOT_EXISTS);var i,a=t[e].apply(t,r);!(i=a)||"object"!=typeof i&&"function"!=typeof i||"function"!=typeof i.then?o({result:a}):a.then((function(n){o({result:n})}))}))}!function(n){n.VM_NOT_EXISTS="VM_NOT_EXISTS",n.METHOD_NOT_EXISTS="METHOD_NOT_EXISTS"}(n||(n={}));var d=/Sync$/;var m={getPageStack:function(){return Promise.resolve({pageStack:getCurrentPages().map((function(n){return c(n)}))})},getCurrentPage:function(){var n=getCurrentPages(),t=n.length;return new Promise((function(e,r){t?e(c(n[t-1])):r(Error("getCurrentPages().length=0"))}))},callUniMethod:function(n){var t=n.method,e=n.args;return new Promise((function(n,r){if(!uni[t])return r(Error("uni."+t+" not exists"));if(function(n){return d.test(n)}(t))return n({result:uni[t].apply(uni,e)});var o=[Object.assign({},e[0]||{},{success:function(e){setTimeout((function(){n({result:e})}),"pageScrollTo"===t?350:0)},fail:function(n){r(Error(n.errMsg.replace(t+":fail ","")))}})];uni[t].apply(uni,o)}))}},_={getData:function(n){return p(s(n.pageId),n.path)},setData:function(n){return g(s(n.pageId),n.data)},callMethod:function(t){var e,r=((e={})[n.VM_NOT_EXISTS]="Page["+t.pageId+"] not exists",e[n.METHOD_NOT_EXISTS]="page."+t.method+" not exists",e);return new Promise((function(n,e){l(s(t.pageId),t.method,t.args).then((function(t){return n(t)})).catch((function(n){e(Error(r[n]))}))}))}};function h(n){return n.nodeId||n.elementId}var v={getData:function(n){return p(f(n.pageId,h(n)),n.path)},setData:function(n){return g(f(n.pageId,h(n)),n.data)},callMethod:function(t){var e,r=h(t),o=((e={})[n.VM_NOT_EXISTS]="Component["+t.pageId+":"+r+"] not exists",e[n.METHOD_NOT_EXISTS]="component."+t.method+" not exists",e);return new Promise((function(n,e){l(f(t.pageId,r),t.method,t.args).then((function(t){return n(t)})).catch((function(n){e(Error(o[n]))}))}))}},T={};Object.keys(m).forEach((function(n){T["App."+n]=m[n]})),Object.keys(_).forEach((function(n){T["Page."+n]=_[n]})),Object.keys(v).forEach((function(n){T["Element."+n]=v[n]}));var E=process.env.UNI_AUTOMATOR_WS_ENDPOINT;wx.$$initRuntimeAutomator=function(n){void 0===n&&(n={});var t=uni.connectSocket({url:E,complete:function(){}}),e=function(n){return t.send({data:JSON.stringify(n)})};t.onOpen((function(t){n.success&&n.success(),console.log("已开启自动化测试...")})),t.onMessage((function(n){var t=JSON.parse(n.data),r=t.id,o=t.method,u=t.params,i={id:r},a=T[o];if(!a)return i.error={message:o+" unimplemented"},e(i);try{a(u).then((function(n){n&&(i.result=n)})).catch((function(n){i.error={message:n.message}})).finally((function(){e(i)}))}catch(n){i.error={message:n.message},e(i)}})),t.onError((function(n){console.log("automator.onError",n)})),t.onClose((function(){n.fail&&n.fail({errMsg:"$$initRuntimeAutomator:fail"}),console.log("automator.onClose")}))},setTimeout((function(){wx.$$initRuntimeAutomator()}),500);
