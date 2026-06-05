import React, { useState } from 'react';
import FirefighterCharacter from '../components/FirefighterCharacter';
import DialogueBox from '../components/DialogueBox';
import { SCENES } from '../scenes';

const DIALOGUES = [
  'Now for the most powerful and most careful method: the Controlled Burn!',
  'A controlled burn is when trained professionals carefully set fire to dead plants and dry brush.',
  'This clears old dead material and makes room for new healthy plants to grow!',
  'IMPORTANT: Controlled burns are ONLY done by trained professionals. Never try this yourself!',
  'Click the safety steps in the correct order to complete the controlled burn!',
];
const STEPS = [
  {id:0,label:'Check the weather',emoji:'🌤️',color:'#2196F3',desc:'Make sure wind is calm and conditions are safe.'},
  {id:1,label:'Set safety perimeter',emoji:'🚧',color:'#FF9800',desc:'Block off the area so no one gets hurt.'},
  {id:2,label:'Have water ready',emoji:'💧',color:'#00BCD4',desc:'Always have water to control the fire.'},
  {id:3,label:'Light carefully',emoji:'🔥',color:'#FF5722',desc:'Professionals light only a small, controlled area.'},
  {id:4,label:'Monitor closely',emoji:'👀',color:'#9C27B0',desc:'Watch the fire and keep it contained.'},
  {id:5,label:'Extinguish fully',emoji:'🚒',color:'#4CAF50',desc:'Make sure every ember is out before leaving.'},
];

const ControlledBurnScene = ({ navigateTo, completeLevel }) => {
  const [idx, setIdx] = useState(0);
  const [showDlg, setShowDlg] = useState(true);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [stepFact, setStepFact] = useState(null);
  const [burnPhase, setBurnPhase] = useState(0);
  const [success, setSuccess] = useState(false);

  const next = () => {
    if (idx < DIALOGUES.length-1) setIdx(idx+1);
    else { setShowDlg(false); setStarted(true); }
  };

  const clickStep = (stepId) => {
    if (!started||done.includes(stepId)) return;
    if (stepId===done.length) {
      const newDone=[...done,stepId];
      setDone(newDone);
      setStepFact(STEPS[stepId]); setTimeout(()=>setStepFact(null),2500);
      if (stepId===3) setBurnPhase(1);
      if (stepId===5) { setBurnPhase(2); setTimeout(()=>{ setSuccess(true); completeLevel(SCENES.CONTROLLED_BURN); },800); }
    } else {
      setWrong(stepId); setTimeout(()=>setWrong(null),500);
    }
  };

  const skyBg = burnPhase===1
    ? 'linear-gradient(180deg,#FF8C42 0%,#FFB347 28%,#8BC34A 28%,#5a9e2f 55%,#3d7a1a 100%)'
    : burnPhase===2
    ? 'linear-gradient(180deg,#87CEEB 0%,#B8E4F7 28%,#6abf3a 28%,#4a9e2a 55%,#2d5a10 100%)'
    : 'linear-gradient(180deg,#87CEEB 0%,#B8E4F7 28%,#8BC34A 28%,#5a9e2f 55%,#3d7a1a 100%)';

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,background:skyBg,transition:'background 1.5s ease'}}/>
      <div style={{position:'absolute',top:'3%',right:'7%',fontSize:56,animation:'sunRays 4s ease-in-out infinite'}}>{burnPhase===1?'🌅':'☀️'}</div>
      {[4,13,82,93].map((x,i)=>(
        <div key={i} style={{position:'absolute',left:x+'%',top:'20%',fontSize:52+i*5,animation:'sway '+(3.5+i*0.4)+'s ease-in-out infinite',transformOrigin:'bottom center'}}>🌲</div>
      ))}
      <div style={{position:'absolute',left:'20%',right:'20%',top:'44%',height:'16%',background:burnPhase===0?'linear-gradient(180deg,#c8a84b,#a07830)':burnPhase===1?'linear-gradient(180deg,#FF4400,#CC2200)':'linear-gradient(180deg,#3d2508,#2a1a04)',borderRadius:12,border:'3px solid '+(burnPhase===1?'#FF6600':'#8B6914'),overflow:'hidden',transition:'all 1s ease',boxShadow:burnPhase===1?'0 0 40px rgba(255,100,0,0.6)':'none',display:'flex',alignItems:'flex-end',justifyContent:'space-around',padding:'0 10px 4px'}}>
        {burnPhase===0&&Array.from({length:12},(_,i)=><div key={i} style={{fontSize:18,animation:'grassSway '+(1.5+i*0.1)+'s ease-in-out infinite',transformOrigin:'bottom center'}}>🌾</div>)}
        {burnPhase===1&&Array.from({length:10},(_,i)=><div key={i} style={{fontSize:22+i*2,animation:'fireFlicker '+(0.2+i*0.05)+'s ease-in-out infinite'}}>🔥</div>)}
        {burnPhase===2&&Array.from({length:8},(_,i)=><div key={i} style={{fontSize:18,animation:'float '+(2+i*0.3)+'s ease-in-out infinite'}}>🌱</div>)}
      </div>
      {burnPhase===1&&[0,1,2].map(i=>(
        <div key={i} style={{position:'absolute',left:(35+i*8)+'%',top:'36%',fontSize:28+i*8,animation:'smokeDrift '+(1.5+i*0.4)+'s ease-in-out infinite',animationDelay:(i*0.3)+'s',opacity:0.65}}>💨</div>
      ))}
      {done.includes(1)&&burnPhase<2&&(
        <div style={{position:'absolute',left:'16%',right:'16%',top:'40%',height:'24%',border:'4px dashed #FF9800',borderRadius:14,pointerEvents:'none',zIndex:9}}>
          <div style={{position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',background:'#FF9800',color:'white',fontFamily:"'Fredoka One',cursive",fontSize:11,padding:'2px 10px',borderRadius:8}}>SAFETY ZONE</div>
        </div>
      )}
      {done.includes(2)&&(
        <div style={{position:'absolute',left:'14%',top:'56%',display:'flex',gap:8,zIndex:12}}>
          {[0,1,2].map(i=><div key={i} style={{fontSize:28,animation:'float '+(2+i*0.3)+'s ease-in-out infinite'}}>🪣</div>)}
        </div>
      )}
      {done.includes(5)&&<div style={{position:'absolute',right:'12%',top:'53%',fontSize:50,animation:'slideInRight 0.6s ease',zIndex:12}}>🚒</div>}
      {stepFact&&(
        <div style={{position:'absolute',top:'28%',left:'50%',transform:'translate(-50%,-50%)',background:'rgba(22,65,12,0.97)',border:'4px solid #F5C518',borderRadius:22,padding:'18px 26px',textAlign:'center',zIndex:40,animation:'popIn 0.4s ease',maxWidth:280}}>
          <div style={{fontSize:38,marginBottom:6}}>{stepFact.emoji}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:17,color:'#F5C518',marginBottom:6}}>Done! {stepFact.label}</div>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:'#a8e063',fontWeight:700,lineHeight:1.4,margin:0}}>{stepFact.desc}</p>
        </div>
      )}
      {started&&(
        <div style={{position:'absolute',top:12,left:'50%',transform:'translateX(-50%)',display:'flex',gap:8,zIndex:30,flexWrap:'wrap',justifyContent:'center',maxWidth:'90vw'}}>
          {STEPS.map((step,i)=>{
            const isDone=done.includes(step.id);
            const isCurrent=step.id===done.length;
            const isWrong=wrong===step.id;
            return (
              <div key={step.id} onClick={()=>clickStep(step.id)} style={{background:isDone?'linear-gradient(135deg,#4CAF50,#2E7D32)':isCurrent?step.color:'rgba(22,65,12,0.75)',border:'3px solid '+(isDone?'#1B5E20':isWrong?'#FF4444':isCurrent?step.color:'rgba(255,255,255,0.2)'),borderBottom:'5px solid '+(isDone?'#1B5E20':isWrong?'#FF4444':isCurrent?step.color:'rgba(0,0,0,0.3)'),borderRadius:13,padding:'8px 11px',cursor:'pointer',textAlign:'center',minWidth:86,transform:isWrong?'scale(0.95)':isCurrent?'scale(1.05)':'scale(1)',transition:'all 0.2s ease',animation:isWrong?'shake 0.4s ease':isCurrent?'pulse 1.5s ease infinite':'none',opacity:!isDone&&step.id>done.length?0.5:1}}>
                <div style={{fontSize:20}}>{isDone?'✅':step.emoji}</div>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:'white',lineHeight:1.2,marginTop:3}}>{i+1}. {step.label}</div>
                {isCurrent&&<div style={{fontFamily:"'Nunito',sans-serif",fontSize:9,fontWeight:800,color:'#FFE066',marginTop:2}}>DO THIS!</div>}
              </div>
            );
          })}
        </div>
      )}
      <div style={{position:'absolute',top:started?108:14,right:14,background:'linear-gradient(135deg,#FF5722,#BF360C)',border:'3px solid #7F2700',borderRadius:14,padding:'8px 12px',zIndex:30,textAlign:'center',animation:'pulse 2s ease infinite',maxWidth:150}}>
        <div style={{fontSize:18}}>⚠️</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:'white',lineHeight:1.3}}>PROFESSIONALS ONLY!</div>
      </div>
      {success&&(
        <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50}}>
          <div style={{background:'linear-gradient(135deg,#2d5a1b,#1a3a0a)',border:'5px solid #F5C518',borderRadius:28,padding:'36px 44px',textAlign:'center',animation:'popIn 0.5s ease',maxWidth:460}}>
            <div style={{fontSize:64,marginBottom:8,animation:'bounce 1s ease infinite'}}>🔥</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:28,color:'#F5C518',marginBottom:10}}>Controlled Burn Done!</div>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15,color:'#a8e063',fontWeight:700,lineHeight:1.6,marginBottom:12}}>The professionals safely cleared the old dead plants. New healthy plants can now grow!</p>
            <div style={{background:'rgba(255,87,34,0.2)',border:'2px solid #FF5722',borderRadius:10,padding:'8px 14px',marginBottom:20}}>
              <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:'#FF8A65',fontWeight:800,margin:0}}>Never try a controlled burn yourself. Always call trained professionals!</p>
            </div>
            <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{background:'linear-gradient(135deg,#F5C518,#E8A000)',border:'3px solid #8B6914',borderBottom:'6px solid #8B6914',borderRadius:18,padding:'12px 26px',fontFamily:"'Fredoka One',cursive",fontSize:18,color:'#1a1a1a',cursor:'pointer'}}>Back to Map</button>
          </div>
        </div>
      )}
      <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{position:'absolute',top:14,left:14,zIndex:30,background:'rgba(22,65,12,0.9)',border:'3px solid #F5C518',borderRadius:14,padding:'7px 16px',fontFamily:"'Fredoka One',cursive",fontSize:15,color:'#F5C518',cursor:'pointer'}}>Map</button>
      <div style={{position:'absolute',bottom:14,left:14,display:'flex',alignItems:'flex-end',gap:12,zIndex:25}}>
        <FirefighterCharacter size={110} speaking={showDlg} expression={idx===3?'surprised':'happy'}/>
        {showDlg&&<DialogueBox text={DIALOGUES[idx]} onNext={next} style={{maxWidth:340,marginBottom:14}}/>}
      </div>
    </div>
  );
};
export default ControlledBurnScene;
