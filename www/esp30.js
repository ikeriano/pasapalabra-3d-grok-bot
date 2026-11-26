// v0.30 · Las ediciones especiales (ESP6) que no cambian el tema también decoran plató, cabecera y grafismos.
(function(){if(typeof especial!='function')return;const o=especial;let prev=null;
const pick=E=>{const tm=(typeof TEMA6!='undefined')?TEMA6.find(t=>t.id==E.q||t.id==E.dr||t.dr==E.dr):null;return tm?tm.id:(E.dr&&typeof DR6!='undefined'&&DR6[E.dr]?E.dr:'');};
window.ESP30NAME={};
especial=window.especial=async function(id){const E=(L5.ESP||{})[id];if(E&&(!OPT.tema||OPT.tema=='normal')){const t=pick(E);if(t){prev=OPT.tema||'normal';OPT.tema=t;ESP30NAME[t]=E.name;}}return o.apply(this,arguments);};
const sm=showMenu;showMenu=window.showMenu=function(){if(prev!==null){OPT.tema=prev;prev=null;}return sm.apply(this,arguments);};})();
