import React,{useState,useEffect,useRef} from 'react';
import {col,bgOf,fig,bar} from './art.js';
import {cloudOn,fetchAcc,pushAcc,watch} from './cloud.js';
const M=[{id:'oldi',n:"Qo'l oldi",e:'💪',h:340},{id:'orqa',n:"Qo'l orqasi",e:'🦾',h:200},{id:'oyoq',n:'Oyoq',e:'🦵',h:150},{id:'gurut',n:'Gurut',e:'🏋️',h:20},{id:'qanot',n:'Qanot',e:'🦅',h:265},{id:'yelka',n:'Yelka',e:'🎯',h:45},{id:'press',n:'Press',e:'🔥',h:175}];
const RW='CASL FIT BUXARA';
const Svg=({h})=><span style={{display:'contents'}} dangerouslySetInnerHTML={{__html:h}}/>;
async function hp(p,w){const t=new TextEncoder().encode('zal|'+p+'|'+w);if(window.crypto&&crypto.subtle){const h=await crypto.subtle.digest('SHA-256',t);return[...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('')}let x=5381;for(const c of t)x=(x*33^c)>>>0;return'f'+x}
function comp(f,max){return new Promise(r=>{const fr=new FileReader();fr.onload=()=>{const i=new Image();i.onload=()=>{const s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.72))};i.src=fr.result};fr.readAsDataURL(f)})}
const rd=k=>{try{return JSON.parse(localStorage.getItem(k))}catch{return null}};

function Pw({label,val,set,ac}){const[s,setS]=useState(false);return<><label>{label}</label><div className="pwr"><input type={s?'text':'password'} value={val} autoComplete={ac} onChange={e=>set(e.target.value)}/><button type="button" className="eye" onClick={()=>setS(!s)}>{s?'🙈':'👁'}</button></div></>}

function Auth({enter,pre}){
const[s,setSt]=useState(1),[n,setN]=useState(pre?.name||''),[p,setP]=useState(pre?.phone||''),[acc,setAcc]=useState(null),[p1,setP1]=useState(''),[p2,setP2]=useState(''),[rw,setRw]=useState(''),[er,setEr]=useState(''),[busy,setBusy]=useState(false);
const d=p.replace(/\D/g,'');
async function go(){setEr('');setBusy(true);try{
if(s===1){if(!cloudOn)return setEr("Bulut sozlanmagan, shuning uchun hisob ochib bo'lmaydi. README dagi Firebase qadamlarini bajaring.");if(!n.trim()||d.length<7)return setEr("Ism va to'g'ri telefon raqam kiriting");const loc=rd('zal:'+d);let rem;try{rem=await fetchAcc(d)}catch{return setEr("Bulutga ulanib bo'lmadi. Internetni va Firebase sozlamalarini tekshiring.")}const o=rem&&(!loc||rem.t>=loc.t)?rem:loc;setAcc(o);setP1('');setP2('');setSt(o&&o.u?.ph?'login':'reg')}
else if(s==='login'){if(await hp(d,p1)!==acc.u.ph)return setEr("Parol noto'g'ri");enter(acc,d)}
else if(s==='forgot'){if(rw.trim().toUpperCase().replace(/\s+/g,' ')!==RW)return setEr("So'z noto'g'ri");setP1('');setP2('');setSt('newpw')}
else{if(p1.length<4)return setEr("Parol kamida 4 belgi bo'lsin");if(p1!==p2)return setEr('Parollar mos emas');const b=acc||{m:{},x:[],t:0};enter({...b,t:Date.now(),u:{name:b.u?.name||n.trim(),phone:d,ph:await hp(d,p1)}},d)}
}finally{setBusy(false)}}
const key=e=>e.key==='Enter'&&go();
const lk={background:'none',border:0,color:'var(--mu)',width:'100%',marginTop:8,textDecoration:'underline',fontSize:14};
return<div className="login"><h1>Zal<br/>Daftari</h1><p>Vazn va takrorni tez yozib bor.</p><div className="card" onKeyDown={key}>
{s===1&&<><label>Ism</label><input type="text" value={n} autoComplete="name" onChange={e=>setN(e.target.value)}/><label>Telefon raqam</label><input type="tel" value={p} placeholder="+998 90 123 45 67" onChange={e=>setP(e.target.value)}/></>}
{s==='login'&&<><p style={{margin:'0 0 4px',fontSize:18}}>Salom, {acc?.u?.name||n}</p><Pw label="Parol" val={p1} set={setP1} ac="current-password"/></>}
{(s==='reg'||s==='newpw')&&<><p style={{margin:0,color:'var(--mu)',fontSize:14}}>{s==='reg'?`${n}, o'zingiz uchun parol o'ylab toping`:"Yangi parol o'rnating"}</p><Pw label="Parol (kamida 4 belgi)" val={p1} set={setP1} ac="new-password"/><Pw label="Parolni takrorlang" val={p2} set={setP2} ac="new-password"/></>}
{s==='forgot'&&<><p style={{margin:0,color:'var(--mu)',fontSize:14}}>Maxsus so'zni kiriting</p><label>Maxsus so'z</label><input type="text" value={rw} autoComplete="off" onChange={e=>setRw(e.target.value)}/></>}
{!cloudOn&&<p style={{color:'#fbbf24',fontSize:13,margin:'12px 0 0'}}>⚠️ Bulut ulanmagan. Firebase ulanmaguncha kirish ochilmaydi.</p>}<p style={{color:'#f87171',fontSize:13,minHeight:18,margin:'10px 0 0'}}>{er}</p>
<button className="pri" style={{width:'100%',fontSize:17}} disabled={busy} onClick={go}>{{1:'Boshlash',login:'Kirish',reg:"Ro'yxatdan o'tish",forgot:'Tasdiqlash',newpw:'Parolni almashtirish'}[s]}</button>
{s==='login'&&<button style={lk} onClick={()=>{setEr('');setSt('forgot')}}>Parol esdan chiqdi</button>}
{s!==1&&<button style={lk} onClick={()=>{setEr('');setSt(1)}}>← Ortga</button>}
</div></div>}

function Modal({children,close}){return<div className="mod" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="card">{children}</div></div>}
function Pick({img,setImg,max}){const f=useRef();return<><div className="pv" style={{backgroundImage:img?`url(${img})`:''}} onClick={()=>f.current.click()}>{img?'':'📷 Galereyadan rasm tanlash'}</div><input ref={f} type="file" accept="image/*" hidden onChange={async e=>{if(e.target.files[0])setImg(await comp(e.target.files[0],max))}}/></>}

function XModal({x,close,save}){const[img,setImg]=useState(x?.img||''),[nm,setNm]=useState(x?.name||''),[w,setW]=useState(20),[r,setR]=useState(10);
return<Modal close={close}><h2>{x?'Tahrirlash':"Trenajyor qo'shish"}</h2><Pick img={img} setImg={setImg} max={600}/><label>Nom</label><input type="text" value={nm} placeholder="Masalan: Shtanga bosish" onChange={e=>setNm(e.target.value)}/>
{!x&&<div className="two"><div><label>Boshlang'ich vazn (kg)</label><input type="number" step=".5" value={w} onChange={e=>setW(e.target.value)}/></div><div><label>Takror</label><input type="number" value={r} onChange={e=>setR(e.target.value)}/></div></div>}
<div className="acts"><button onClick={close}>Bekor</button><button className="pri" onClick={()=>nm.trim()&&save({name:nm.trim(),img,w:Math.round((parseFloat(w)||0)*2)/2,r:Math.round(parseFloat(r)||0)})}>Saqlash</button></div></Modal>}
function MModal({m,close,save}){const[img,setImg]=useState(m.img),[nm,setNm]=useState(m.n);
return<Modal close={close}><h2>Mushak</h2><Pick img={img} setImg={setImg} max={700}/><label>Nom</label><input type="text" value={nm} onChange={e=>setNm(e.target.value)}/><div className="acts"><button onClick={()=>setImg('')}>Rasmni olib tashlash</button><button className="pri" onClick={()=>save({n:nm.trim()||m.n0,img})}>Saqlash</button></div></Modal>}

let dragged=0;
export default function App(){
const[S,setS]=useState(()=>{const u=rd('zal:user');return u&&u.ph?(rd('zal:'+u.phone)||{u,m:{},x:[],t:0}):null});
const[pre,setPre]=useState(()=>{const u=rd('zal:user');return u&&!u.ph?u:null});
const[v,setV]=useState({p:'home'}),[modal,setModal]=useState(null),[sync,setSync]=useState(cloudOn?'ok':'off');const sy=ok=>setSync(!cloudOn?'off':ok?'ok':'err');
const lastT=useRef(S?S.t:0),cur=useRef(S);cur.current=S;
const mut=fn=>setS(p=>({...fn(p),t:Date.now()}));
const phone=S?.u.phone;
useEffect(()=>{if(!S)return;try{localStorage.setItem('zal:'+S.u.phone,JSON.stringify(S));localStorage.setItem('zal:user',JSON.stringify(S.u))}catch{alert("Xotira to'ldi, rasmlar hajmini kamaytiring")}
if(S.t>lastT.current){lastT.current=S.t;const id=setTimeout(()=>pushAcc(S.u.phone,S).then(sy),400);return()=>clearTimeout(id)}},[S]);
useEffect(()=>{if(!phone)return;const f=()=>cur.current&&cur.current.t&&pushAcc(phone,cur.current);addEventListener('pagehide',f);const un=watch(phone,r=>{if(r.t>cur.current.t){lastT.current=r.t;setS(r)}});return()=>{removeEventListener('pagehide',f);un()}},[phone]);
const mm=id=>{const b=M.find(m=>m.id===id),o=S.m[id]||{};return{...b,n0:b.n,n:o.n||b.n,img:o.img||''}};
const go=p=>{setV(p==='home'?{p:'home'}:{p:'m',id:p});scrollTo(0,0)};
const enter=(acc,d)=>{lastT.current=acc.t;pushAcc(d,acc).then(sy);setPre(null);setS({...acc,u:{...acc.u,phone:d}});setV({p:'home'})};
const out=()=>{localStorage.removeItem('zal:user');setS(null)};
useDrag(S&&v.p==='m'?v.id+':'+S.x.filter(q=>q.m===v.id).map(q=>q.id).join():'',(a,b)=>mut(p=>{const xs=[...p.x],i=xs.findIndex(q=>q.id===a),j=xs.findIndex(q=>q.id===b),[it]=xs.splice(i,1);xs.splice(j,0,it);return{...p,x:xs}}));
if(!S)return<div id="app"><Auth enter={enter} pre={pre}/></div>;
const X=S.x;
let page;
if(v.p==='home')page=<><div className="top"><div><h1>Mushaklar</h1><small>Salom, {S.u.name} · {sync==='ok'?'☁️ saqlandi':sync==='off'?'⚠️ faqat shu qurilmada':'⚠️ bulutga yozilmadi'}</small></div><button onClick={out}>Chiqish</button></div><div className="grid big">{M.map((b,i)=>{const m=mm(b.id),c=X.filter(x=>x.m===b.id).length;return<div key={b.id} className={`mc ${m.img?'img':''} ${i===6?'last':''}`} style={{'--bgc':bgOf(b.h,m.img)}} onClick={()=>go(b.id)}>{!m.img&&<Svg h={fig(b.id,b.h)}/>}<div className="glass"><h2>{m.e} {m.n}</h2><span>{c} ta trenajyor</span></div></div>})}</div></>;
else if(v.p==='m'){const m=mm(v.id),l=X.filter(x=>x.m===v.id);page=<><div className="top"><button className="back" onClick={()=>go('home')}>← Orqaga</button><button onClick={()=>setModal({t:'m'})}>📷</button></div><h1 style={{fontSize:44,fontWeight:800,marginBottom:12,color:col(m.h)}}>{m.e} {m.n}</h1><button className="pri" style={{width:'100%',marginBottom:14}} onClick={()=>setModal({t:'x'})}>+ Trenajyor qo'shish</button>{l.length>1&&<p className="hint">Tartibini o'zgartirish: kartani bosib ushlab turing, so'ng sudrang.</p>}<div className="grid sm">{l.map(x=><div key={x.id} className="tile" data-id={x.id} onClick={()=>!dragged&&setV({p:'d',id:x.id})}><div className="sq" style={{'--bgc':bgOf(m.h,x.img)}}>{x.img?null:<Svg h={bar(m.h)}/>}</div><div className="nm">{x.name}</div></div>)}{!l.length&&<p style={{color:'var(--mu)',gridColumn:'span 2'}}>Hali trenajyor yo'q.</p>}</div></>}
else{const x=X.find(q=>q.id===v.id);if(!x){queueMicrotask(()=>go('home'));return null}const m=mm(x.m);
const set=(k,val)=>{let n=parseFloat(String(val).replace(',','.'));if(isNaN(n)||n<0)n=0;n=k==='w'?Math.round(n*2)/2:Math.round(n);mut(p=>({...p,x:p.x.map(q=>q.id===x.id?{...q,[k]:n}:q)}))};
const Box=({k,l,st,u})=><div className="box"><label>{l}</label><div className="row"><button onClick={()=>set(k,x[k]-st)}>−</button><input key={x[k]} type="number" step={st} inputMode={k==='w'?'decimal':'numeric'} defaultValue={x[k]} onBlur={e=>set(k,e.target.value)} onKeyDown={e=>e.key==='Enter'&&e.target.blur()}/><button onClick={()=>set(k,x[k]+st)}>+</button></div><small>{u}</small></div>;
page=<><div className="top"><button className="back" onClick={()=>go(x.m)}>← Orqaga</button></div><div className="det"><div className="hero" style={{'--bgc':bgOf(m.h,x.img)}}>{x.img?null:<Svg h={bar(m.h)}/>}</div><h1>{x.name}</h1><div className="cnt"><Box k="w" l="VAZN" st={.5} u="kg"/><Box k="r" l="TAKROR" st={1} u="marta"/></div><div className="acts"><button onClick={()=>setModal({t:'x',x})}>✏️ Tahrirlash</button><button onClick={()=>setModal({t:'del',x})}>🗑 O'chirish</button></div></div></>}
const close=()=>setModal(null);
return<div id="app">{page}
{modal?.t==='x'&&<XModal x={modal.x} close={close} save={d=>{mut(p=>modal.x?{...p,x:p.x.map(q=>q.id===modal.x.id?{...q,name:d.name,img:d.img}:q)}:{...p,x:[...p.x,{id:'x'+Date.now(),m:v.id,...d}]});close()}}/>}
{modal?.t==='m'&&<MModal m={mm(v.id)} close={close} save={d=>{mut(p=>({...p,m:{...p.m,[v.id]:d}}));close()}}/>}
{modal?.t==='del'&&<Modal close={close}><h2>O'chirilsinmi?</h2><p style={{color:'var(--mu)'}}>Bu trenajyor butunlay o'chadi.</p><div className="acts"><button onClick={close}>Yo'q</button><button className="pri" style={{background:'#dc2626'}} onClick={()=>{const m=modal.x.m;mut(p=>({...p,x:p.x.filter(q=>q.id!==modal.x.id)}));close();go(m)}}>Ha, o'chir</button></div></Modal>}
</div>}

function useDrag(dep,reorder){const ro=useRef();ro.current=reorder;
useEffect(()=>{if(!dep)return;let dr=false;const tm=e=>{if(dr)e.preventDefault()};document.addEventListener('touchmove',tm,{passive:false});
const tiles=[...document.querySelectorAll('.tile')];const offs=[];
tiles.forEach(t=>{const cm=e=>e.preventDefault();t.addEventListener('contextmenu',cm);
const pd=e=>{if(e.button>0)return;const sx=e.clientX,sy=e.clientY;let ov=null;const tmr=setTimeout(()=>{dr=true;t.classList.add('drag');navigator.vibrate&&navigator.vibrate(18)},380);
const mv=ev=>{if(!dr){if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>8)clearTimeout(tmr);return}t.style.transform=`translate(${ev.clientX-sx}px,${ev.clientY-sy}px) scale(1.06)`;const el=document.elementFromPoint(ev.clientX,ev.clientY),o=el&&el.closest('.tile');if(ov&&ov!==o)ov.classList.remove('over');ov=o&&o!==t?o:null;ov&&ov.classList.add('over')};
const up=()=>{clearTimeout(tmr);document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',up);if(dr){dr=false;t.classList.remove('drag');t.style.transform='';ov&&ov.classList.remove('over');dragged=1;setTimeout(()=>dragged=0,60);if(ov)ro.current(t.dataset.id,ov.dataset.id)}};
document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up)};
t.addEventListener('pointerdown',pd);offs.push(()=>{t.removeEventListener('pointerdown',pd);t.removeEventListener('contextmenu',cm)})});
return()=>{document.removeEventListener('touchmove',tm);offs.forEach(f=>f())}},[dep])}
