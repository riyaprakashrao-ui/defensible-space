import React, { useState } from 'react';
import FirefighterCharacter from '../components/FirefighterCharacter';
import DialogueBox from '../components/DialogueBox';
import { SCENES } from '../scenes';

const DIALOGUES = [
  'See that dry land? Wildfires spread fast through dry grass and dead plants!',
  'A firebreak is a strip of land where we clear away plants. It stops fire from spreading!',
  'Think of it like a road that fire cannot cross! Tap each dry grass patch to clear it!',
];
const PATCHES = [
  {id:0,x:14,y:54},{id:1,x:26,y:59},{id:2,x:40,y:52},
  {id:3,x:54,y:56},{id:4,x:67,y:53},{id:5,x:80,y:58},
];

const FirebreakScene = ({ navigateTo, completeLevel }) => {
  const [idx, setIdx] = useState(0);
  const [showDlg, setShowDlg] = useState(true);
  const [started, setStarted] = useState(false);
  const [cleared, setCleared] = useState([]);
  const [success, setSuccess] = useState(false);

  const next = () => {
    if (idx < DIALOGUES.length-1) setIdx(idx+1);
    else { setShowDlg(false); setStarted(true); }
  };

  const clear = (id) => {
    if (!started || cleared.includes(id)) return;
    const n = [...cleared, id];
    setCleared(n);
    if (n.length === PATCHES.length) setTimeout(() => { setSuccess(true); completeLevel(SCENES.FIREBREAK); }, 500);
  };

  return (
    <div style={{ width:'100vw', height:'100vh', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#87CEEB 0%,#B8E4F7 30%,#6abf3a 30%,#4a9e2a 58%,#8B6914 58%,#7a5a20 100%)' }}/>
      <div style={{ position:'absolute', top:'4%', right:'8%', fontSize:56, animation:'sunRays 4s ease-in-out infinite' }}>☀️</div>
      <div style={{ position:'absolute', top:'5%', left:'8%', fontSize:44, animation:'cloudDrift 8s ease-in-out infinite alternate' }}>☁️</div>
      <div style={{ position:'absolute', top:'8%', right:'20%', fontSize:38, animation:'cloudDrift 11s ease-in-out infinite alternate-reverse' }}>☁️</div>
      {[6,15,80,90].map((x,i)=>(
        <div key={i} style={{ position:'absolute', left:x+'%', top:'22%', fontSize:52+i*6, animation:'sway '+(3.5+i*0.4)+'s ease-in-out infinite', transformOrigin:'bottom center' }}>🌲</div>
      ))}
      {started && (
        <div style={{ position:'absolute', left:'2%', top:'44%', display:'flex', gap:4, zIndex:8 }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} style={{ fontSize:28+i*3, animation:'fireFlicker '+(0.2+i*0.05)+'s ease-in-out infinite', opacity:cleared.length>=3?0.25:1, transition:'opacity 0.6s ease' }}>🔥</div>
          ))}
        </div>
      )}
      <div style={{ position:'absolute', left:'6%', right:'6%', top:'47%', height:'18%', background:'linear-gradient(180deg,#c8a84b,#a07830)', borderRadius:10, border:'3px solid #8B6914', display:'flex', alignItems:'flex-end', justifyContent:'space-around', padding:'0 10px 4px', overflow:'hidden' }}>
        {Array.from({length:18},(_,i)=>(
          <div key={i} style={{ fontSize:18, animation:'grassSway '+(1.5+i*0.1)+'s ease-in-out infinite', transformOrigin:'bottom center' }}>🌾</div>
        ))}
      </div>
      {PATCHES.map(p => {
        const done = cleared.includes(p.id);
        return (
          <div key={p.id} onClick={()=>clear(p.id)} style={{ position:'absolute', left:p.x+'%', top:p.y+'%', transform:'translate(-50%,-50%)', width:72, height:44, cursor:started&&!done?'pointer':'default', zIndex:12 }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:done?'radial-gradient(circle,#8B6914,#6B4A10)':'radial-gradient(circle,#c8a84b,#a07830)', border:'3px solid '+(done?'#5a3a08':'#8B6914'), display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:2, animation:started&&!done?'pulse 1.5s ease-in-out infinite':done?'popIn 0.3s ease':'none', boxShadow:started&&!done?'0 0 14px rgba(255,100,0,0.5)':'none' }}>
              <span style={{ fontSize:20 }}>{done?'🪨':'🌾'}</span>
              {started&&!done&&<span style={{ fontSize:10, fontFamily:"'Nunito',sans-serif", fontWeight:800, color:'#fff', textShadow:'1px 1px 2px rgba(0,0,0,0.8)' }}>TAP!</span>}
            </div>
          </div>
        );
      })}
      {started&&!success&&(
        <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', background:'rgba(22,65,12,0.92)', border:'3px solid #F5C518', borderRadius:18, padding:'8px 22px', zIndex:30, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:20 }}>🪨</span>
          <span style={{ fontFamily:"'Fredoka One',cursive", fontSize:18, color:'#F5C518' }}>{cleared.length}/{PATCHES.length} cleared!</span>
        </div>
      )}
      {success&&(
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50 }}>
          <div style={{ background:'linear-gradient(135deg,#2d5a1b,#1a3a0a)', border:'5px solid #F5C518', borderRadius:28, padding:'36px 44px', textAlign:'center', animation:'popIn 0.5s ease', maxWidth:440 }}>
            <div style={{ fontSize:64, marginBottom:8, animation:'bounce 1s ease infinite' }}>🎉</div>
            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:32, color:'#F5C518', marginBottom:10 }}>Firebreak Built!</div>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, color:'#a8e063', fontWeight:700, lineHeight:1.6, marginBottom:22 }}>
              Amazing! You cleared the dry grass and built a firebreak. Now fire cannot cross that strip of land!
            </p>
            <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{ background:'linear-gradient(135deg,#F5C518,#E8A000)', border:'3px solid #8B6914', borderBottom:'6px solid #8B6914', borderRadius:18, padding:'12px 26px', fontFamily:"'Fredoka One',cursive", fontSize:18, color:'#1a1a1a', cursor:'pointer' }}>
              Back to Map
            </button>
          </div>
        </div>
      )}
      <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{ position:'absolute', top:14, left:14, zIndex:30, background:'rgba(22,65,12,0.9)', border:'3px solid #F5C518', borderRadius:14, padding:'7px 16px', fontFamily:"'Fredoka One',cursive", fontSize:15, color:'#F5C518', cursor:'pointer' }}>Map</button>
      <div style={{ position:'absolute', top:14, right:14, zIndex:30, background:'rgba(22,65,12,0.9)', border:'3px solid #F5C518', borderRadius:14, padding:'7px 16px', fontFamily:"'Fredoka One',cursive", fontSize:16, color:'#F5C518' }}>🪨 Firebreaks</div>
      <div style={{ position:'absolute', bottom:14, left:14, display:'flex', alignItems:'flex-end', gap:12, zIndex:25 }}>
        <FirefighterCharacter size={110} speaking={showDlg} expression="happy"/>
        {showDlg&&<DialogueBox text={DIALOGUES[idx]} onNext={next} style={{ maxWidth:340, marginBottom:14 }}/>}
      </div>
    </div>
  );
};
export default FirebreakScene;
