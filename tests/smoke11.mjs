import {open,check,sleep} from './lib.mjs';
const T=await open();const ev=(f)=>T.p.evaluate(f);
await sleep(1500);
check('NS11 existe y el rosco se parcheó sin anclas perdidas',await ev(()=>!!window.NS11&&NS11.patched&&NS11.warn.length==0),JSON.stringify(await ev(()=>NS11.warn)));
check('D11/PV11/CO11',await ev(()=>!!window.D11&&!!window.PV11&&!!window.CO11));
check('sin errores',T.errs.length==0,T.errs.join('|'));
await T.close();
