import React, { useState } from 'react';
import FirefighterCharacter from '../components/FirefighterCharacter';
import DialogueBox from '../components/DialogueBox';
import { SCENES } from '../scenes';

const DIALOGUES = [
  'Some plants are much safer in wildfires than others!',
  'California native plants are fire-resistant. They do not burn as easily as dry grass.',
  'Meet three special plants: California Cherry Tree, California Fuchsia, and California Poppy!',
  'Click a plant card to pick it up, then click the matching garden spot to plant it!',
];
const PLANTS = [
  { id:'cherry',  name:'Cherry Tree', emoji:'🍒', bg:'#8B0000', fact:'Thick bark resists fire! Deep roots help it survive and regrow.' },
  { id:'fuchsia', name:'CA Fuchsia',  emoji:'🌺', bg:'#CC0066', fact:'Waxy leaves hold moisture, making it much harder to burn!' },
  { id:'poppy',   name:'CA Poppy',    emoji:'🌼', bg:'#FF8C00', fact:"California's state flower! Goes dormant in dry seasons, reducing fire fuel." },
];
const SPOTS = [
  { id:'cherry', x:22, y:54 },
  { id:'fuchsia',x:50, y:57 },
  { id:'poppy',  x:76, y:54 },
];

const NativePlantsScene = ({ navigateTo, completeLevel }) => {
  const [idx, setIdx] = useState(0);
  const [showDlg, setShowDlg] = useState(true);
  const [started, setStarted] = useState(false);
  const [planted, setPlanted] = useState({});
  const [selected, setSelected] = useState(null);
  const [fact, setFact] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [success, setSuccess] = useState(false);

  const next = () => {
    if (idx < DIALOGUES.length-1) setIdx(idx+1);
    else { setShowDlg(false); setStarted(true); }
  };

  const clickSpot = (spotId) => {
    if (!started||!selected||planted[spotId]) return;
    if (selected===spotId) {
      const plant = PLANTS.find(p=>p.id===selected);
      const newPlanted = {...planted,[spotId]:selected};
      setPlanted(newPlanted); setSelected(null);
      setFact(plant); setTimeout(()=>setFact(null),2800);
      if (Object.keys(newPlanted).length===SPOTS.length)
        setTimeout(()=>{ setSuccess(true); completeLevel(SCENES.NATIVE_PLANTS); },1000);
    } else {
      setWrong(spotId); setTimeout(()=>setWrong(null),500);
    }
  };

  const available = PLANTS.filter(p=>!Object.values(planted).includes(p.id));

  return (
    <div style={{ width:'100vw', height:'100vh', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#87CEEB 0%,#B8E4F7 28%,#6abf3a 28%,#4a9e2a 55%,#3d7a1a 100%)' }}/>
      <div style={{ position:'absolute', top:'3%', right:'7%', fontSize:56, animation:'sunRays 4s ease-in-out infinite' }}>☀️</div>
      <div style={{ position:'absolute', top:'5%', left:'8%', fontSize:44, animation:'cloudDrift 9s ease-in-out infinite alternate' }}>☁️</div>
      {[5,14,82,92].map((x,i)=>(
        <div key={i} style={{ position:'absolute', left:x+'%', top:'20%', fontSize:52+i*5, animation:'sway '+(3.5+i*0.4)+'s ease-in-out infinite', transformOrigin:'bottom center' }}>🌲</div>
      ))}
      <div style={{ position:'absolute', left:'8%', right:'8%', top:'42%', height:'20%', background:'linear-gradient(180deg,#5a3a10,#3d2508)', borderRadius:14, border:'4px solid #8B6914', boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}/>
      {SPOTS.map(spot=>{
        const isPlanted=planted[spot.id];
        const plant=isPlanted?PLANTS.find(p=>p.id===isPlanted):null;
        const isWrong=wrong===spot.id;
        const isTarget=selected&&!isPlanted;
        return (
          <div key={spot.id} onClick={()=>clickSpot(spot.id)} style={{ position:'absolute', left:spot.x+'%', top:spot.y+'%', transform:'translate(-50%,-50%)', width:100, height:100, cursor:started&&!isPlanted&&selected?'pointer':'default', zIndex:15 }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', border:'4px dashed '+(isWrong?'#FF4444':isTarget?'#F5C518':'#8B6914'), background:isWrong?'rgba(255,68,68,0.2)':isTarget?'rgba(245,197,24,0.15)':'rgba(139,105,20,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', animation:isWrong?'shake 0.4s ease':isTarget?'pulse 1s ease infinite':isPlanted?'popIn 0.4s ease':'none', transition:'all 0.2s ease' }}>
              {isPlanted
                ? <><span style={{fontSize:34}}>{plant.emoji}</span><span style={{fontSize:10,fontFamily:"'Nunito',sans-serif",fontWeight:800,color:'#2E7D32'}}>Planted!</span></>
                : <><span style={{fontSize:26,opacity:0.5}}>🌱</span><span style={{fontSize:10,fontFamily:"'Nunito',sans-serif",fontWeight:800,color:isTarget?'#F5C518':'#8B6914',textAlign:'center',padding:'0 4px'}}>{isTarget?'Plant here?':spot.id}</span></>
              }
            </div>
          </div>
        );
      })}
      {started&&(
        <div style={{ position:'absolute', top:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:12, zIndex:30 }}>
          {available.map((plant,i)=>(
            <div key={plant.id} onClick={()=>setSelected(selected===plant.id?null:plant.id)} style={{ background:selected===plant.id?'linear-gradient(135deg,#F5C518,#E8A000)':plant.bg, border:'3px solid '+(selected===plant.id?'#8B6914':'rgba(255,255,255,0.3)'), borderBottom:'6px solid '+(selected===plant.id?'#8B6914':'rgba(0,0,0,0.3)'), borderRadius:16, padding:'10px 14px', cursor:'pointer', textAlign:'center', minWidth:90, transform:selected===plant.id?'translateY(-8px) scale(1.08)':'scale(1)', transition:'all 0.2s ease', boxShadow:selected===plant.id?'0 12px 28px rgba(0,0,0,0.4)':'0 6px 16px rgba(0,0,0,0.3)', animation:'popIn 0.4s ease both', animationDelay:(i*0.1)+'s' }}>
              <div style={{fontSize:30}}>{plant.emoji}</div>
              <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:800,color:selected===plant.id?'#1a1a1a':'white',marginTop:4}}>{plant.name}</div>
            </div>
          ))}
        </div>
      )}
      {fact&&(
        <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', background:'rgba(22,65,12,0.97)', border:'4px solid #F5C518', borderRadius:22, padding:'20px 28px', textAlign:'center', zIndex:40, animation:'popIn 0.4s ease', maxWidth:300, boxShadow:'0 16px 48px rgba(0,0,0,0.5)' }}>
          <div style={{fontSize:44,marginBottom:6}}>{fact.emoji}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,color:'#F5C518',marginBottom:6}}>{fact.name}</div>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:'#a8e063',fontWeight:700,lineHeight:1.5,margin:0}}>{fact.fact}</p>
        </div>
      )}
      {success&&(
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50 }}>
          <div style={{ background:'linear-gradient(135deg,#2d5a1b,#1a3a0a)', border:'5px solid #F5C518', borderRadius:28, padding:'36px 44px', textAlign:'center', animation:'popIn 0.5s ease', maxWidth:440 }}>
            <div style={{fontSize:64,marginBottom:8,animation:'bounce 1s ease infinite'}}>🌸</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:30,color:'#F5C518',marginBottom:10}}>Garden Complete!</div>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:15,color:'#a8e063',fontWeight:700,lineHeight:1.6,marginBottom:22}}>
              You planted all three California native plants! These fire-resistant plants help protect our land from wildfires!
            </p>
            <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{background:'linear-gradient(135deg,#F5C518,#E8A000)',border:'3px solid #8B6914',borderBottom:'6px solid #8B6914',borderRadius:18,padding:'12px 26px',fontFamily:"'Fredoka One',cursive",fontSize:18,color:'#1a1a1a',cursor:'pointer'}}>Back to Map</button>
          </div>
        </div>
      )}
      <button onClick={()=>navigateTo(SCENES.WORLD_MAP)} style={{position:'absolute',top:14,left:14,zIndex:30,background:'rgba(22,65,12,0.9)',border:'3px solid #F5C518',borderRadius:14,padding:'7px 16px',fontFamily:"'Fredoka One',cursive",fontSize:15,color:'#F5C518',cursor:'pointer'}}>Map</button>
      <div style={{position:'absolute',top:14,right:14,zIndex:30,background:'rgba(22,65,12,0.9)',border:'3px solid #F5C518',borderRadius:14,padding:'7px 16px',fontFamily:"'Fredoka One',cursive",fontSize:16,color:'#F5C518'}}>🌸 Native Plants</div>
      <div style={{position:'absolute',bottom:14,left:14,display:'flex',alignItems:'flex-end',gap:12,zIndex:25}}>
        <FirefighterCharacter size={110} speaking={showDlg} expression="happy"/>
        {showDlg&&<DialogueBox text={DIALOGUES[idx]} onNext={next} style={{maxWidth:340,marginBottom:14}}/>}
      </div>
    </div>
  );
};
export default NativePlantsScene;
