import React, { useState, useRef } from 'react';
import FirefighterCharacter from '../components/FirefighterCharacter';
import DialogueBox from '../components/DialogueBox';
import { SCENES } from '../scenes';

const DIALOGUES = [
  'Goats are amazing helpers! They love to eat tall dry grass — the same grass that fuels wildfires!',
  'When goats graze on overgrown land, they clear away the dry fuel that fires need to spread.',
  'It is a totally natural way to keep the land safe — and the goats love it!',
  'Tap the tall grass patches to send a goat to eat them! Clear all 8 patches!',
];
const PATCHES = [
  {id:0,x:12,y:56},{id:1,x:22,y:61},{id:2,x:33,y:54},
  {id:3,x:44,y:59},{id:4,x:55,y:55},{id:5,x:65,y:61},
  {id:6,x:75,y:56},{id:7,x:85,y:58},
];

const GoatsScene = ({ navigateTo, completeLevel }) => {
  const [idx, setIdx] = useState(0);
  const [showDlg, setShowDlg] = useState(true);
  const [started, setStarted] = useState(false);
  const [eaten, setEaten] = useState([]);
  const [goats, setGoats] = useState([
    {id:0,x:8,y:70,eating:false,target:null},
    {id:1,x:50,y:72,eating:false,target:null},
    {id:2,x:90,y:70,eating:false,target:null},
  ]);
  const [success, setSuccess] = useState(false);
  const timers = useRef({});

  const next = () => {
    if (idx < DIALOGUES.length-1) setIdx(idx+1);
    else { setShowDlg(false); setStarted(true); }
  };

  const tapPatch = (patchId) => {
    if (!started||eaten.includes(patchId)) return;
    const patch = PATCHES[patchId];
    const free = goats.filter(g=>!g.eating);
    if (!free.length) return;
    const goat = free.reduce((a,b)=>Math.abs(a.x-patch.x)<Math.abs(b.x-patch.x)?a:b);
    setGoats(prev=>prev.map(g=>g.id===goat.id?{...g,x:patch.x,y:patch.y-8,eating:true,target:patchId}:g));
    if (timers.current[patchId]) clearTimeout(timers.current[patchId]);
    timers.current[patchId] = setTimeout(()=>{
      setEaten(prev=>{
        const next=[...prev,patchId];
        if (next.length===PATCHES.length) setTimeout(()=>{ setSuccess(true); completeLevel(SCENES.GOATS); },600);
        return next;
      });
      setGoats(prev=>prev.map(g=>g.target===patchId?{...g,eating:false,target:null}:g));
    },1800);
  };

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#87CEEB 0%,#B8E4F7 28%,#8BC34A 28%,#5a9e2f 55%,#3d7a1a 100%)'}}/>
      <div style={{position:'absolute',top:'3%',right:'7%',fontSize:56,animation:'sunRays 4s ease-in-out infinite'}}>☀️</div>
      <div style={{position:'absolute',top:'5%',left:'10%',fontSize:44,animation:'cloudDrift 9s ease-in-out infinite alternate'}}>☁️</div>
      {[4,13,82,93].map((x,i)=>(
        <div key={i} style={{position:'absolute',left:x+'%',top:'20%',fontSize:52+i*5,animation:'sway '+(3.5+i*0.4)+'s ease-in-out infinite',transformOrigin:'bottom center'}}>🌲</div>
      ))}
      {PATCHES.map(p=>{
        const isEaten=eaten.includes(p.id);
        const beingEaten=goats.some(g=>g.target===p.id);
        return (
          <div key={p.id} onClick={()=>tapPatch(p.id)} style={{position:'absolute',left:p.x+'%',top:p.y+'%',transform:'translate(-50%,-50%)',cursor:started&&!isEaten?'pointer':'default',zIndex:10,textAlign:'center'}}>
            {!isEaten?(
              <div style={{animation:beingEaten?'wiggle 0.2s ease infinite':'grassSway 2s ease-in-out infinite',transformOrigin:'bottom center'}}>
                <div style={{fontSize:28}}>🌾</div>
                <div style={{fontSize:16}}>🌾</div>
                {started&&!beingEaten&&<div style={{fontSize:10,fontFamily:"'Nunito',sans-serif",fontWeight:800,color:'#fff',textShadow:'1px 1px 2px rgba(0,0,0,0.8)',background:'rgba(0,0,0,0.4)',borderRadius:6,padding:'1px 5px'}}>TAP!</div>}
                {beingEaten&&<div style={{fontSize:14}}>😋</div>}
              </div>
            ):(
              <div style={{fontSize:18,opacity:0.6,animation:'popIn 0.3s ease'}}>🟫</div>
            )}
          </div>
        );
      })}
      {goats.map(g=>(
        <div key={g.id} style={{position:'absolute',left:g.x+'%',top:g.y+'%',transform:'translate(-50%,-50%)',fontSize:44,transition:'left 0.8s ease,top 0.8s ease',animation:g.eating?'wiggle 0.3s ease infinite':'bob 2s ease-in-out infinite',zIndex:12,filter:'drop-shadow(2px 4px 4px rgba(0,0,0,0.3))'}}>🐐</div>
      ))}
      {started&&!success&&(
        <div style={{position:'absolute',top:14,left:'50%',transform:'translateX(-50%)',background:'rgba(22,65,12,0.92)',border:'3px solid #F5C518',borderRadius:18,padding:'8px 22px',zIndex:30,display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontSize:22}}>🐐</span>
          <span style={{fontFamily:"'Fredoka One',cursive",fontSize:18,color:'#F5C518'}}>{eaten.length}/{PATCHES.length} cleared!</span>
        </div>
      )}
      {started&&eaten.length===0&&(
        <div style={{position:'absolute',top:68,left:'50%',transform:'translateX(-50%)',background:'rgba(0,0,0,0.7)',borderRadius:12,padding:'5px 16px',zIndex:30}}>
          <span style={{fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800,color:'white'}}>Tap the tall grass to send a goat!</span>
        </div>
      )}
      {success&&(
        <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}}>
          <div style={{background:'linear-gradient(135deg,#2d5a1b,#1a3a0a)',border:'5px solid #F5C518',borderRadius:28,padding:'36px 44px',textAlign:'center',animation:'popIn 0.5s ease',maxWidth:440}}>
            <div style={{fontSize:64,marginBottom:8,animation:'bounce 1s ease infinite'}}>🐐</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:30,color:'#F5C518',marginBottom:10}}>Meadow Cleared!</div>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15,color:'#a8e063',fontWeight:700,lineHeight:1.6,marginBottom:22}}>
              The goats did it! All the tall dry grass is gone. Now there is much less fuel for wildfires. Goats are nature's lawn mowers!
            </p>
            <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{background:'linear-gradient(135deg,#F5C518,#E8A000)',border:'3px solid #8B6914',borderBottom:'6px solid #8B6914',borderRadius:18,padding:'12px 26px',fontFamily:"'Fredoka One',cursive",fontSize:18,color:'#1a1a1a',cursor:'pointer'}}>Back to Map</button>
          </div>
        </div>
      )}
      <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{position:'absolute',top:14,left:14,zIndex:30,background:'rgba(22,65,12,0.9)',border:'3px solid #F5C518',borderRadius:14,padding:'7px 16px',fontFamily:"'Fredoka One',cursive",fontSize:15,color:'#F5C518',cursor:'pointer'}}>Map</button>
      <div style={{position:'absolute',top:14,right:14,zIndex:30,background:'rgba(22,65,12,0.9)',border:'3px solid #F5C518',borderRadius:14,padding:'7px 16px',fontFamily:"'Fredoka One',cursive",fontSize:16,color:'#F5C518'}}>🐐 Grazing Goats</div>
      <div style={{position:'absolute',bottom:14,left:14,display:'flex',alignItems:'flex-end',gap:12,zIndex:25}}>
        <FirefighterCharacter size={110} speaking={showDlg} expression="happy"/>
        {showDlg&&<DialogueBox text={DIALOGUES[idx]} onNext={next} style={{maxWidth:340,marginBottom:14}}/>}
      </div>
    </div>
  );
};
export default GoatsScene;
