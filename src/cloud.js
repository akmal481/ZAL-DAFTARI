import {initializeApp} from 'firebase/app';
import {getFirestore,doc,getDoc,setDoc,onSnapshot} from 'firebase/firestore';
const e=import.meta.env;
const cfg={apiKey:e.VITE_FB_API_KEY,authDomain:e.VITE_FB_AUTH_DOMAIN,projectId:e.VITE_FB_PROJECT_ID,appId:e.VITE_FB_APP_ID};
export const cloudOn=!!cfg.projectId;
const db=cloudOn?getFirestore(initializeApp(cfg)):null;
const ref=p=>doc(db,'zal',p);
export async function fetchAcc(p){if(!cloudOn)return null;const s=await getDoc(ref(p));return s.exists()?JSON.parse(s.data().json):null}
export async function pushAcc(p,d){if(!cloudOn)return false;try{await setDoc(ref(p),{json:JSON.stringify(d)});return true}catch(e){console.warn('cloud',e);return false}}
export function watch(p,cb){return cloudOn?onSnapshot(ref(p),s=>{if(s.exists())try{cb(JSON.parse(s.data().json))}catch{}},()=>{}):()=>{}}
