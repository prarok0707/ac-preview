((t,e)=>{"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.WEBPACK_GLOBAL=e():t.WEBPACK_GLOBAL=e()})(this,()=>{{let s="data-ac",t="data-ac-item",n="data-ac-multiple",l="is-open",r={alreadyInit:"Экземпляр уже инициализирован!",notFoundRoot:s+" - не найден!",emptyItems:`Массив: ${t} - пуст.`,notValidLayoutItems:"Неверная разметка во всех: "+t,moreMinBrekpoint:"Минимальный breakpoint, не может быть больше либо равен максимального!",notValidIndexArray:t=>t+" - не являться массивом!"},i={multipleOpen:!1,silentWhenSwitchingItem:!1,breakpoints:{min:null,max:null}};class a{_isInit=!1;_isSilentOpen=!1;_isSilentClose=!1;_itemsElements=[];_itemsElementsActive=new Map;_eventsStore={};constructor(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this._root=(t=t)&&(t="string"==typeof t?document.body.querySelector(t):t)instanceof Element?t:null,this._options=(t=>{t=JSON.stringify(t);return JSON.parse(t)})({...i,...e}),this._init()}onOpen=null;onClose=null;onUpdate=null;getRoot=()=>this._root;getItems=()=>this._itemsElements;getItemsActive=()=>this._itemsElementsActive.values().reduce((t,e)=>(t.push(e),t),[]);openAll=(()=>{var n=this;return function(){n._isSilentOpen=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];for(let t=0;t<n._itemsElements.length;t++){var e=n._itemsElements[t];if(n._open(e),!n._options.multipleOpen)break}n._isSilentOpen=!1}})();closeAll=(()=>{var e=this;return function(){let t=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];e._isSilentClose=t;for(let t of e._itemsElementsActive.values())e._close(t);e._isSilentClose=!1}})();open=(()=>{var e=this;return function(t){e._isSilentOpen=1<arguments.length&&void 0!==arguments[1]&&arguments[1],e._openOrCloseByIndexArray(t,"open"),e._isSilentOpen=!1}})();close=(()=>{var e=this;return function(t){e._isSilentClose=1<arguments.length&&void 0!==arguments[1]&&arguments[1],e._openOrCloseByIndexArray(t,"close"),e._isSilentClose=!1}})();update=()=>{this._isSilentOpen=this._isSilentClose=!0,this._removeEventsFromStore(),this._getItemsElements(),this._events(),this._isSilentOpen=this._isSilentClose=!1,this.onUpdate instanceof Function&&this.onUpdate(this)};_openOrCloseByIndexArray=(t,n)=>{if(!Array.isArray(t))throw new Error(r.notValidIndexArray(t));var e=t=>{var e=this._itemsElements[t];if(e)switch(n){case"open":this._open(e);break;case"close":this._close(e)}};this._options.multipleOpen?t.forEach(e):e(t[0])};_setOptionsFromRootElement=()=>{var i=t=>null===t||""===t||isNaN(t)?null:+t;this._root.hasAttribute(n)&&(this._options.multipleOpen=!0);let o=this._root.getAttribute("data-ac-breakpoints"),t=this._root.getAttribute("data-ac-min"),e=this._root.getAttribute("data-ac-max");if(t&&(this._options.breakpoints.min=i(t)),e&&(this._options.breakpoints.max=i(e)),o){let[t,e]=o.split("|"),{min:n,max:s}=this._options.breakpoints;this._options.breakpoints.min=i(t)||n,this._options.breakpoints.max=i(e)||s}};_notHasInBrekpointsRange=()=>{var{min:t,max:e}=this._options.breakpoints;if(!t&&!e)return!0;var n=document.documentElement.clientWidth;if((e=+e||1/0)<=(t=+t||0))throw new Error(r.moreMinBrekpoint);return t<n&&n<e};_breakpoints=()=>{var{min:t,max:e}=this._options.breakpoints;if(!t&&!e)return null;t=()=>{this._isSilentOpen=this._isSilentClose=!0,this._notHasInBrekpointsRange()?this._enabled():this._disable(),this._isSilentOpen=this._isSilentClose=!1},t(),e=((t,e)=>{let n=!1,s=null,i=null;return function(){n?(s=this,i=arguments):(n=!0,t.apply(this,arguments),setTimeout(()=>{n=!1,i&&(t.apply(s,i),s=i=null)},e))}})(t,200);window.addEventListener("resize",e)};_enabled=()=>{if(!this._isInit&&this._notHasInBrekpointsRange()){if(this._events(),this._itemsElementsActive.size){var t,e=[...this._itemsElementsActive.values()];this._itemsElementsActive.clear();for(t of e)this._open(t)}this._isInit=!0}};_disable=(()=>{var e=this;return function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0];e._isInit&&!e._notHasInBrekpointsRange()&&(e._removeEventsFromStore(),e._itemsElements.forEach(t=>{e._removeClsStateFromItemElement(t)}),t&&e._itemsElementsActive.clear(),e._isInit=!1)}})();_getChildNotNestedRoot=(t,e)=>{let n=[];return t.querySelectorAll(e).forEach(t=>{t.closest(`[${s}]`)===this._root&&n.push(t)}),n};_getItemsElements=()=>{var e=this._getChildNotNestedRoot(this._root,`[${t}]`);if(!e.length)throw new Error(r.emptyItems);var n=[];this._itemsElementsActive.clear();for(let t=0;t<e.length;t++){var s=e[t],i=this._getChildNotNestedRoot(s,"[data-ac-button]"),o=this._getChildNotNestedRoot(s,"[data-ac-body]");if(!i.length||!o.length)return;i={item:s,buttons:i,bodys:o};n.push(i),s.classList.contains(l)&&(this._notHasInBrekpointsRange()?this._open(i):this._close(i))}if(!n.length)throw new Error(r.notValidLayoutItems);this._itemsElements=n};_hasItemElementActive=t=>{t=t.item;return this._itemsElementsActive.has(t)};_setClsStateFromItemElement=t=>{var{item:t,buttons:e,bodys:n}=t;t.classList.add(l);for(let t=0;t<e.length;t++)e[t].classList.add(l);for(let t=0;t<n.length;t++)n[t].classList.add(l)};_removeClsStateFromItemElement=t=>{var{item:t,buttons:e,bodys:n}=t;t.classList.remove(l);for(let t=0;t<e.length;t++)e[t].classList.remove(l);for(let t=0;t<n.length;t++)n[t].classList.remove(l)};_open=t=>{var e=t.item;if(!this._hasItemElementActive(t)){if(this._setClsStateFromItemElement(t),!this._options.multipleOpen){this._isSilentClose=this._options.silentWhenSwitchingItem;for(var n of this._itemsElementsActive.values())this._close(n);this._isSilentClose=!1}this._itemsElementsActive.set(e,t),this.onOpen instanceof Function&&!this._isSilentOpen&&this.onOpen(t,this)}};_close=t=>{var e=t.item;this._hasItemElementActive(t)&&(this._removeClsStateFromItemElement(t),this._itemsElementsActive.delete(e),this.onClose instanceof Function)&&!this._isSilentClose&&this.onClose(t,this)};_setEventsStore=t=>{var{target:t,event:e,handle:n}=t;this._eventsStore[e]||(this._eventsStore[e]=[]),this._eventsStore[e].push({target:t,handle:n})};_removeEventsFromStore=()=>{for(var t in this._eventsStore){var e,n;for({target:e,handle:n}of this._eventsStore[t])e.removeEventListener(t,n);this._eventsStore[t]=[]}};_events=()=>{this._notHasInBrekpointsRange()&&this._itemsElements.forEach(e=>{let t=e.buttons,n=t=>{t.preventDefault(),this._hasItemElementActive(e)?this._close(e):this._open(e)};t.forEach(t=>{t.addEventListener("click",n),this._setEventsStore({target:t,event:"click",handle:n})})})};_init=()=>{try{if(this._isInit)throw new Error(r.alreadyInit);if(!this._root)throw new Error(r.notFoundRoot);this._setOptionsFromRootElement(),this._getItemsElements(),this._events(),this._isInit=!0,this._breakpoints()}catch(t){console.error(t)}}}return document.addEventListener("DOMContentLoaded",t=>{document.querySelectorAll("[data-ac-default]").forEach(t=>new a(t)),document.querySelectorAll("[data-ac-custom]").forEach(t=>{let e=new a(t,{});var n,s,i,o;t.hasAttribute("data-events")&&(e.onOpen=()=>{alert("Открыт")},e.onClose=()=>{alert("Закрыт")}),t.hasAttribute("data-control")&&(n=t.querySelector("[data-control-openAll]"),s=t.querySelector("[data-control-closeAll]"),i=t.querySelector("[data-control-open]"),o=t.querySelector("[data-control-close]"),n.onclick=()=>{e.openAll()},s.onclick=()=>{e.closeAll()},i.onclick=()=>{e.open([1])},o.onclick=()=>{e.close([1])}),t.hasAttribute("data-new-item")&&setTimeout(()=>{t.insertAdjacentHTML("beforeend",'\n<div class="accordion__item" data-ac-item>\n  <button class="accordion__button" type="button" data-ac-button>\n    Кнопка из JS\n  </button>\n\n  <div class="accordion__body" data-ac-body>\n    <div class="accordion__body-wrapper">\n      <div class="accortion__content">\n        <p class="accordion__text">\n          Далеко-далеко за словесными горами в стране гласных и согласных\n          живут рыбные тексты. Его великий по всей рукопись текстами силуэт\n          семь дал эта, снова буквоград всемогущая дорогу своего там последний\n          несколько власти? По всей, правилами!\n          Далеко-далеко за словесными горами в стране гласных и согласных\n          живут рыбные тексты. Его великий по всей рукопись текстами силуэт\n          семь дал эта, снова буквоград всемогущая дорогу своего там последний\n          несколько власти? По всей, правилами!\n          Далеко-далеко за словесными горами в стране гласных и согласных\n          живут рыбные тексты. Его великий по всей рукопись текстами силуэт\n          семь дал эта, снова буквоград всемогущая дорогу своего там последний\n          несколько власти? По всей, правилами!\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n'),e.update()},1e3)})}),{}}});