(self.webpackChunkshell=self.webpackChunkshell||[]).push([[556],{68811:(A,E,i)=>{i.d(E,{t:()=>f});var a=i(31385),d=i(37431);class f extends a.x{constructor(u=1/0,c=1/0,l=d.l){super(),this._bufferSize=u,this._windowTime=c,this._timestampProvider=l,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=c===1/0,this._bufferSize=Math.max(1,u),this._windowTime=Math.max(1,c)}next(u){const{isStopped:c,_buffer:l,_infiniteTimeWindow:g,_timestampProvider:_,_windowTime:p}=this;c||(l.push(u),!g&&l.push(_.now()+p)),this._trimBuffer(),super.next(u)}_subscribe(u){this._throwIfClosed(),this._trimBuffer();const c=this._innerSubscribe(u),{_infiniteTimeWindow:l,_buffer:g}=this,_=g.slice();for(let p=0;p<_.length&&!u.closed;p+=l?1:2)u.next(_[p]);return this._checkFinalizedStatuses(u),c}_trimBuffer(){const{_bufferSize:u,_timestampProvider:c,_buffer:l,_infiniteTimeWindow:g}=this,_=(g?1:2)*u;if(u<1/0&&_<l.length&&l.splice(0,l.length-_),!g){const p=c.now();let O=0;for(let D=1;D<l.length&&l[D]<=p;D+=2)O=D;O&&l.splice(0,O+1)}}}},85541:(A,E,i)=>{i.d(E,{z:()=>u});var a=i(92044),f=i(46717),h=i(33907);function u(...c){return function d(){return(0,a.J)(1)}()((0,h.D)(c,(0,f.yG)(c)))}},97997:(A,E,i)=>{i.d(E,{P:()=>f});var a=i(89407),d=i(30625);function f(h){return new a.y(u=>{(0,d.Xf)(h()).subscribe(u)})}},34324:(A,E,i)=>{i.d(E,{D:()=>g});var a=i(89407),d=i(41387),f=i(30625),h=i(46717),u=i(34460),c=i(46234),l=i(15757);function g(..._){const p=(0,h.jO)(_),{args:O,keys:D}=(0,d.D)(_),b=new a.y(v=>{const{length:m}=O;if(!m)return void v.complete();const T=new Array(m);let L=m,j=m;for(let I=0;I<m;I++){let M=!1;(0,f.Xf)(O[I]).subscribe((0,u.x)(v,K=>{M||(M=!0,j--),T[I]=K},()=>L--,void 0,()=>{(!L||!M)&&(j||v.next(D?(0,l.n)(D,T):T),v.complete())}))}});return p?b.pipe((0,c.Z)(p)):b}},54421:(A,E,i)=>{i.d(E,{b:()=>f});var a=i(3258),d=i(91618);function f(h,u){return(0,d.m)(u)?(0,a.z)(h,u,1):(0,a.z)(h,1)}},92044:(A,E,i)=>{i.d(E,{J:()=>f});var a=i(3258),d=i(36522);function f(h=1/0){return(0,a.z)(d.y,h)}},89751:(A,E,i)=>{i.d(E,{B:()=>u});var a=i(30625),d=i(31385),f=i(30294),h=i(29587);function u(l={}){const{connector:g=(()=>new d.x),resetOnError:_=!0,resetOnComplete:p=!0,resetOnRefCountZero:O=!0}=l;return D=>{let b,v,m,T=0,L=!1,j=!1;const I=()=>{v?.unsubscribe(),v=void 0},M=()=>{I(),b=m=void 0,L=j=!1},K=()=>{const U=b;M(),U?.unsubscribe()};return(0,h.e)((U,x)=>{T++,!j&&!L&&I();const S=m=m??g();x.add(()=>{T--,0===T&&!j&&!L&&(v=c(K,O))}),S.subscribe(x),!b&&T>0&&(b=new f.Hp({next:w=>S.next(w),error:w=>{j=!0,I(),v=c(M,_,w),S.error(w)},complete:()=>{L=!0,I(),v=c(M,p),S.complete()}}),(0,a.Xf)(U).subscribe(b))})(D)}}function c(l,g,..._){if(!0===g)return void l();if(!1===g)return;const p=new f.Hp({next:()=>{p.unsubscribe(),l()}});return(0,a.Xf)(g(..._)).subscribe(p)}},2520:(A,E,i)=>{i.d(E,{d:()=>f});var a=i(68811),d=i(89751);function f(h,u,c){let l,g=!1;return h&&"object"==typeof h?({bufferSize:l=1/0,windowTime:u=1/0,refCount:g=!1,scheduler:c}=h):l=h??1/0,(0,d.B)({connector:()=>new a.t(l,u,c),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:g})}},42930:(A,E,i)=>{i.d(E,{w:()=>h});var a=i(30625),d=i(29587),f=i(34460);function h(u,c){return(0,d.e)((l,g)=>{let _=null,p=0,O=!1;const D=()=>O&&!_&&g.complete();l.subscribe((0,f.x)(g,b=>{_?.unsubscribe();let v=0;const m=p++;(0,a.Xf)(u(b,m)).subscribe(_=(0,f.x)(g,T=>g.next(c?c(b,T,m,v++):T),()=>{_=null,D()}))},()=>{O=!0,D()}))})}},41387:(A,E,i)=>{i.d(E,{D:()=>u});const{isArray:a}=Array,{getPrototypeOf:d,prototype:f,keys:h}=Object;function u(l){if(1===l.length){const g=l[0];if(a(g))return{args:g,keys:null};if(function c(l){return l&&"object"==typeof l&&d(l)===f}(g)){const _=h(g);return{args:_.map(p=>g[p]),keys:_}}}return{args:l,keys:null}}},15757:(A,E,i)=>{function a(d,f){return d.reduce((h,u,c)=>(h[u]=f[c],h),{})}i.d(E,{n:()=>a})},74798:(A,E,i)=>{i.d(E,{b:()=>f});var a=i(89407),d=i(91618);function f(h){return!!h&&(h instanceof a.y||(0,d.m)(h.lift)&&(0,d.m)(h.subscribe))}},30556:(A,E,i)=>{i.r(E),i.d(E,{DEFAULT_LANGUAGE:()=>V,FakeMissingTranslationHandler:()=>m,MissingTranslationHandler:()=>v,TranslateCompiler:()=>U,TranslateDefaultParser:()=>K,TranslateDirective:()=>G,TranslateFakeCompiler:()=>x,TranslateFakeLoader:()=>b,TranslateLoader:()=>D,TranslateModule:()=>X,TranslateParser:()=>M,TranslatePipe:()=>H,TranslateService:()=>B,TranslateStore:()=>S,USE_DEFAULT_LANG:()=>F,USE_EXTEND:()=>N,USE_STORE:()=>w});var a=i(24676),d=i(52631),f=i(74798),h=i(34324),u=i(85541),c=i(97997),l=i(18291),g=i(2520),_=i(87776),p=i(54421),O=i(42930);class D{}let b=(()=>{class s extends D{getTranslation(t){return(0,d.of)({})}static \u0275fac=function(){let t;return function(n){return(t||(t=a.\u0275\u0275getInheritedFactory(s)))(n||s)}}();static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})();class v{}let m=(()=>{class s{handle(t){return t.key}static \u0275fac=function(e){return new(e||s)};static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})();function T(s,C){if(s===C)return!0;if(null===s||null===C)return!1;if(s!=s&&C!=C)return!0;let n,r,o,t=typeof s;if(t==typeof C&&"object"==t){if(!Array.isArray(s)){if(Array.isArray(C))return!1;for(r in o=Object.create(null),s){if(!T(s[r],C[r]))return!1;o[r]=!0}for(r in C)if(!(r in o)&&typeof C[r]<"u")return!1;return!0}if(!Array.isArray(C))return!1;if((n=s.length)==C.length){for(r=0;r<n;r++)if(!T(s[r],C[r]))return!1;return!0}}return!1}function L(s){return typeof s<"u"&&null!==s}function j(s){return s&&"object"==typeof s&&!Array.isArray(s)}function I(s,C){let t=Object.assign({},s);return j(s)&&j(C)&&Object.keys(C).forEach(e=>{j(C[e])?e in s?t[e]=I(s[e],C[e]):Object.assign(t,{[e]:C[e]}):Object.assign(t,{[e]:C[e]})}),t}class M{}let K=(()=>{class s extends M{templateMatcher=/{{\s?([^{}\s]*)\s?}}/g;interpolate(t,e){let n;return n="string"==typeof t?this.interpolateString(t,e):"function"==typeof t?this.interpolateFunction(t,e):t,n}getValue(t,e){let n="string"==typeof e?e.split("."):[e];e="";do{e+=n.shift(),!L(t)||!L(t[e])||"object"!=typeof t[e]&&n.length?n.length?e+=".":t=void 0:(t=t[e],e="")}while(n.length);return t}interpolateFunction(t,e){return t(e)}interpolateString(t,e){return e?t.replace(this.templateMatcher,(n,r)=>{let o=this.getValue(e,r);return L(o)?o:n}):t}static \u0275fac=function(){let t;return function(n){return(t||(t=a.\u0275\u0275getInheritedFactory(s)))(n||s)}}();static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})();class U{}let x=(()=>{class s extends U{compile(t,e){return t}compileTranslations(t,e){return t}static \u0275fac=function(){let t;return function(n){return(t||(t=a.\u0275\u0275getInheritedFactory(s)))(n||s)}}();static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})();class S{defaultLang;currentLang=this.defaultLang;translations={};langs=[];onTranslationChange=new a.EventEmitter;onLangChange=new a.EventEmitter;onDefaultLangChange=new a.EventEmitter}const w=new a.InjectionToken("USE_STORE"),F=new a.InjectionToken("USE_DEFAULT_LANG"),V=new a.InjectionToken("DEFAULT_LANGUAGE"),N=new a.InjectionToken("USE_EXTEND");let B=(()=>{class s{store;currentLoader;compiler;parser;missingTranslationHandler;useDefaultLang;isolate;extend;loadingTranslations;pending=!1;_onTranslationChange=new a.EventEmitter;_onLangChange=new a.EventEmitter;_onDefaultLangChange=new a.EventEmitter;_defaultLang;_currentLang;_langs=[];_translations={};_translationRequests={};get onTranslationChange(){return this.isolate?this._onTranslationChange:this.store.onTranslationChange}get onLangChange(){return this.isolate?this._onLangChange:this.store.onLangChange}get onDefaultLangChange(){return this.isolate?this._onDefaultLangChange:this.store.onDefaultLangChange}get defaultLang(){return this.isolate?this._defaultLang:this.store.defaultLang}set defaultLang(t){this.isolate?this._defaultLang=t:this.store.defaultLang=t}get currentLang(){return this.isolate?this._currentLang:this.store.currentLang}set currentLang(t){this.isolate?this._currentLang=t:this.store.currentLang=t}get langs(){return this.isolate?this._langs:this.store.langs}set langs(t){this.isolate?this._langs=t:this.store.langs=t}get translations(){return this.isolate?this._translations:this.store.translations}set translations(t){this.isolate?this._translations=t:this.store.translations=t}constructor(t,e,n,r,o,P=!0,y=!1,R=!1,W){this.store=t,this.currentLoader=e,this.compiler=n,this.parser=r,this.missingTranslationHandler=o,this.useDefaultLang=P,this.isolate=y,this.extend=R,W&&this.setDefaultLang(W)}setDefaultLang(t){if(t===this.defaultLang)return;let e=this.retrieveTranslations(t);typeof e<"u"?(null==this.defaultLang&&(this.defaultLang=t),e.pipe((0,l.q)(1)).subscribe(n=>{this.changeDefaultLang(t)})):this.changeDefaultLang(t)}getDefaultLang(){return this.defaultLang}use(t){if(t===this.currentLang)return(0,d.of)(this.translations[t]);let e=this.retrieveTranslations(t);return typeof e<"u"?(this.currentLang||(this.currentLang=t),e.pipe((0,l.q)(1)).subscribe(n=>{this.changeLang(t)}),e):(this.changeLang(t),(0,d.of)(this.translations[t]))}retrieveTranslations(t){let e;return(typeof this.translations[t]>"u"||this.extend)&&(this._translationRequests[t]=this._translationRequests[t]||this.getTranslation(t),e=this._translationRequests[t]),e}getTranslation(t){this.pending=!0;const e=this.currentLoader.getTranslation(t).pipe((0,g.d)(1),(0,l.q)(1));return this.loadingTranslations=e.pipe((0,_.U)(n=>this.compiler.compileTranslations(n,t)),(0,g.d)(1),(0,l.q)(1)),this.loadingTranslations.subscribe({next:n=>{this.translations[t]=this.extend&&this.translations[t]?{...n,...this.translations[t]}:n,this.updateLangs(),this.pending=!1},error:n=>{this.pending=!1}}),e}setTranslation(t,e,n=!1){e=this.compiler.compileTranslations(e,t),this.translations[t]=(n||this.extend)&&this.translations[t]?I(this.translations[t],e):e,this.updateLangs(),this.onTranslationChange.emit({lang:t,translations:this.translations[t]})}getLangs(){return this.langs}addLangs(t){t.forEach(e=>{-1===this.langs.indexOf(e)&&this.langs.push(e)})}updateLangs(){this.addLangs(Object.keys(this.translations))}getParsedResult(t,e,n){let r;if(e instanceof Array){let o={},P=!1;for(let y of e)o[y]=this.getParsedResult(t,y,n),(0,f.b)(o[y])&&(P=!0);if(P){const y=e.map(R=>(0,f.b)(o[R])?o[R]:(0,d.of)(o[R]));return(0,h.D)(y).pipe((0,_.U)(R=>{let W={};return R.forEach((z,J)=>{W[e[J]]=z}),W}))}return o}if(t&&(r=this.parser.interpolate(this.parser.getValue(t,e),n)),typeof r>"u"&&null!=this.defaultLang&&this.defaultLang!==this.currentLang&&this.useDefaultLang&&(r=this.parser.interpolate(this.parser.getValue(this.translations[this.defaultLang],e),n)),typeof r>"u"){let o={key:e,translateService:this};typeof n<"u"&&(o.interpolateParams=n),r=this.missingTranslationHandler.handle(o)}return typeof r<"u"?r:e}get(t,e){if(!L(t)||!t.length)throw new Error('Parameter "key" required');if(this.pending)return this.loadingTranslations.pipe((0,p.b)(n=>(n=this.getParsedResult(n,t,e),(0,f.b)(n)?n:(0,d.of)(n))));{let n=this.getParsedResult(this.translations[this.currentLang],t,e);return(0,f.b)(n)?n:(0,d.of)(n)}}getStreamOnTranslationChange(t,e){if(!L(t)||!t.length)throw new Error('Parameter "key" required');return(0,u.z)((0,c.P)(()=>this.get(t,e)),this.onTranslationChange.pipe((0,O.w)(n=>{const r=this.getParsedResult(n.translations,t,e);return"function"==typeof r.subscribe?r:(0,d.of)(r)})))}stream(t,e){if(!L(t)||!t.length)throw new Error('Parameter "key" required');return(0,u.z)((0,c.P)(()=>this.get(t,e)),this.onLangChange.pipe((0,O.w)(n=>{const r=this.getParsedResult(n.translations,t,e);return(0,f.b)(r)?r:(0,d.of)(r)})))}instant(t,e){if(!L(t)||!t.length)throw new Error('Parameter "key" required');let n=this.getParsedResult(this.translations[this.currentLang],t,e);if((0,f.b)(n)){if(t instanceof Array){let r={};return t.forEach((o,P)=>{r[t[P]]=t[P]}),r}return t}return n}set(t,e,n=this.currentLang){this.translations[n][t]=this.compiler.compile(e,n),this.updateLangs(),this.onTranslationChange.emit({lang:n,translations:this.translations[n]})}changeLang(t){this.currentLang=t,this.onLangChange.emit({lang:t,translations:this.translations[t]}),null==this.defaultLang&&this.changeDefaultLang(t)}changeDefaultLang(t){this.defaultLang=t,this.onDefaultLangChange.emit({lang:t,translations:this.translations[t]})}reloadLang(t){return this.resetLang(t),this.getTranslation(t)}resetLang(t){this._translationRequests[t]=void 0,this.translations[t]=void 0}getBrowserLang(){if(typeof window>"u"||typeof window.navigator>"u")return;let t=window.navigator.languages?window.navigator.languages[0]:null;return t=t||window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage,typeof t>"u"?void 0:(-1!==t.indexOf("-")&&(t=t.split("-")[0]),-1!==t.indexOf("_")&&(t=t.split("_")[0]),t)}getBrowserCultureLang(){if(typeof window>"u"||typeof window.navigator>"u")return;let t=window.navigator.languages?window.navigator.languages[0]:null;return t=t||window.navigator.language||window.navigator.browserLanguage||window.navigator.userLanguage,t}static \u0275fac=function(e){return new(e||s)(a.\u0275\u0275inject(S),a.\u0275\u0275inject(D),a.\u0275\u0275inject(U),a.\u0275\u0275inject(M),a.\u0275\u0275inject(v),a.\u0275\u0275inject(F),a.\u0275\u0275inject(w),a.\u0275\u0275inject(N),a.\u0275\u0275inject(V))};static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})(),G=(()=>{class s{translateService;element;_ref;key;lastParams;currentParams;onLangChangeSub;onDefaultLangChangeSub;onTranslationChangeSub;set translate(t){t&&(this.key=t,this.checkNodes())}set translateParams(t){T(this.currentParams,t)||(this.currentParams=t,this.checkNodes(!0))}constructor(t,e,n){this.translateService=t,this.element=e,this._ref=n,this.onTranslationChangeSub||(this.onTranslationChangeSub=this.translateService.onTranslationChange.subscribe(r=>{r.lang===this.translateService.currentLang&&this.checkNodes(!0,r.translations)})),this.onLangChangeSub||(this.onLangChangeSub=this.translateService.onLangChange.subscribe(r=>{this.checkNodes(!0,r.translations)})),this.onDefaultLangChangeSub||(this.onDefaultLangChangeSub=this.translateService.onDefaultLangChange.subscribe(r=>{this.checkNodes(!0)}))}ngAfterViewChecked(){this.checkNodes()}checkNodes(t=!1,e){let n=this.element.nativeElement.childNodes;n.length||(this.setContent(this.element.nativeElement,this.key),n=this.element.nativeElement.childNodes);for(let r=0;r<n.length;++r){let o=n[r];if(3===o.nodeType){let P;if(t&&(o.lastKey=null),L(o.lookupKey))P=o.lookupKey;else if(this.key)P=this.key;else{let y=this.getContent(o),R=y.trim();R.length&&(o.lookupKey=R,y!==o.currentValue?(P=R,o.originalContent=y||o.originalContent):o.originalContent?P=o.originalContent.trim():y!==o.currentValue&&(P=R,o.originalContent=y||o.originalContent))}this.updateValue(P,o,e)}}}updateValue(t,e,n){if(t){if(e.lastKey===t&&this.lastParams===this.currentParams)return;this.lastParams=this.currentParams;let r=o=>{o!==t&&(e.lastKey=t),e.originalContent||(e.originalContent=this.getContent(e)),e.currentValue=L(o)?o:e.originalContent||t,this.setContent(e,this.key?e.currentValue:e.originalContent.replace(t,e.currentValue)),this._ref.markForCheck()};if(L(n)){let o=this.translateService.getParsedResult(n,t,this.currentParams);(0,f.b)(o)?o.subscribe({next:r}):r(o)}else this.translateService.get(t,this.currentParams).subscribe(r)}}getContent(t){return L(t.textContent)?t.textContent:t.data}setContent(t,e){L(t.textContent)?t.textContent=e:t.data=e}ngOnDestroy(){this.onLangChangeSub&&this.onLangChangeSub.unsubscribe(),this.onDefaultLangChangeSub&&this.onDefaultLangChangeSub.unsubscribe(),this.onTranslationChangeSub&&this.onTranslationChangeSub.unsubscribe()}static \u0275fac=function(e){return new(e||s)(a.\u0275\u0275directiveInject(B),a.\u0275\u0275directiveInject(a.ElementRef),a.\u0275\u0275directiveInject(a.ChangeDetectorRef))};static \u0275dir=a.\u0275\u0275defineDirective({type:s,selectors:[["","translate",""],["","ngx-translate",""]],inputs:{translate:"translate",translateParams:"translateParams"}})}return s})(),H=(()=>{class s{translate;_ref;value="";lastKey=null;lastParams=[];onTranslationChange;onLangChange;onDefaultLangChange;constructor(t,e){this.translate=t,this._ref=e}updateValue(t,e,n){let r=o=>{this.value=void 0!==o?o:t,this.lastKey=t,this._ref.markForCheck()};if(n){let o=this.translate.getParsedResult(n,t,e);(0,f.b)(o.subscribe)?o.subscribe(r):r(o)}this.translate.get(t,e).subscribe(r)}transform(t,...e){if(!t||!t.length)return t;if(T(t,this.lastKey)&&T(e,this.lastParams))return this.value;let n;if(L(e[0])&&e.length)if("string"==typeof e[0]&&e[0].length){let r=e[0].replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g,'"$2":').replace(/:(\s)?(\')(.*?)(\')/g,':"$3"');try{n=JSON.parse(r)}catch{throw new SyntaxError(`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${e[0]}`)}}else"object"==typeof e[0]&&!Array.isArray(e[0])&&(n=e[0]);return this.lastKey=t,this.lastParams=e,this.updateValue(t,n),this._dispose(),this.onTranslationChange||(this.onTranslationChange=this.translate.onTranslationChange.subscribe(r=>{this.lastKey&&r.lang===this.translate.currentLang&&(this.lastKey=null,this.updateValue(t,n,r.translations))})),this.onLangChange||(this.onLangChange=this.translate.onLangChange.subscribe(r=>{this.lastKey&&(this.lastKey=null,this.updateValue(t,n,r.translations))})),this.onDefaultLangChange||(this.onDefaultLangChange=this.translate.onDefaultLangChange.subscribe(()=>{this.lastKey&&(this.lastKey=null,this.updateValue(t,n))})),this.value}_dispose(){typeof this.onTranslationChange<"u"&&(this.onTranslationChange.unsubscribe(),this.onTranslationChange=void 0),typeof this.onLangChange<"u"&&(this.onLangChange.unsubscribe(),this.onLangChange=void 0),typeof this.onDefaultLangChange<"u"&&(this.onDefaultLangChange.unsubscribe(),this.onDefaultLangChange=void 0)}ngOnDestroy(){this._dispose()}static \u0275fac=function(e){return new(e||s)(a.\u0275\u0275directiveInject(B,16),a.\u0275\u0275directiveInject(a.ChangeDetectorRef,16))};static \u0275pipe=a.\u0275\u0275definePipe({name:"translate",type:s,pure:!1});static \u0275prov=a.\u0275\u0275defineInjectable({token:s,factory:s.\u0275fac})}return s})(),X=(()=>{class s{static forRoot(t={}){return{ngModule:s,providers:[t.loader||{provide:D,useClass:b},t.compiler||{provide:U,useClass:x},t.parser||{provide:M,useClass:K},t.missingTranslationHandler||{provide:v,useClass:m},S,{provide:w,useValue:t.isolate},{provide:F,useValue:t.useDefaultLang},{provide:N,useValue:t.extend},{provide:V,useValue:t.defaultLanguage},B]}}static forChild(t={}){return{ngModule:s,providers:[t.loader||{provide:D,useClass:b},t.compiler||{provide:U,useClass:x},t.parser||{provide:M,useClass:K},t.missingTranslationHandler||{provide:v,useClass:m},{provide:w,useValue:t.isolate},{provide:F,useValue:t.useDefaultLang},{provide:N,useValue:t.extend},{provide:V,useValue:t.defaultLanguage},B]}}static \u0275fac=function(e){return new(e||s)};static \u0275mod=a.\u0275\u0275defineNgModule({type:s});static \u0275inj=a.\u0275\u0275defineInjector({})}return s})()}}]);