import React, { useState, useEffect } from 'react';
import ForestBackground from '../components/ForestBackground';
import FirefighterCharacter from '../components/FirefighterCharacter';
import PlayButton from '../components/PlayButton';
import { SCENES } from '../scenes';

const OpeningScreen = ({ navigateTo }) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [charVisible, setCharVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 300);
    const t2 = setTimeout(() => setCharVisible(true), 700);
    const t3 = setTimeout(() => setBtnVisible(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ width:'100vw', height:'100vh', position:'relative', overflow:'hidden' }}>
      <ForestBackground showPath timeOfDay="day"/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 82% 8%,rgba(255,230,100,0.18) 0%,transparent 55%)', pointerEvents:'none', zIndex:2 }}/>

      {/* Title */}
      <div style={{ position:'absolute', top:'5%', left:'50%', transform:'translateX(-50%)', zIndex:20, opacity:titleVisible?1:0, transition:'opacity 0.7s ease', textAlign:'center', width:'90%', maxWidth:680 }}>
        <div style={{ background:'linear-gradient(135deg,rgba(22,65,12,0.95),rgba(14,45,6,0.97))', border:'5px solid #F5C518', borderRadius:32, padding:'20px 48px 16px', boxShadow:'0 12px 48px rgba(0,0,0,0.55)', position:'relative', display:'inline-block' }}>
          <span style={{ position:'absolute', top:-14, left:18, fontSize:28 }}>🌿</span>
          <span style={{ position:'absolute', top:-14, right:18, fontSize:28 }}>🌿</span>
          <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'clamp(34px,5.5vw,68px)', color:'#F5C518', textShadow:'3px 3px 0 #7a5200', lineHeight:1.1, letterSpacing:2 }}>Keep The</div>
          <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'clamp(40px,6.5vw,80px)', color:'#ffffff', textShadow:'3px 3px 0 #2d5a1b', lineHeight:1.1, letterSpacing:2 }}>Land Safe</div>
          <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:'clamp(12px,1.6vw,17px)', color:'#a8e063', fontWeight:800, marginTop:6, letterSpacing:3, textTransform:'uppercase' }}>
            A Wildfire Safety Adventure
          </div>
        </div>
      </div>

      {/* Character + speech */}
      <div style={{ position:'absolute', bottom:'18%', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'flex-end', gap:20, zIndex:20, opacity:charVisible?1:0, transition:'opacity 0.6s ease', width:'90%', maxWidth:600, justifyContent:'center' }}>
        <FirefighterCharacter size={160} waving expression="excited"/>
        <div style={{ background:'rgba(255,255,255,0.97)', border:'4px solid #F5C518', borderRadius:20, padding:'16px 20px', maxWidth:300, boxShadow:'0 8px 24px rgba(0,0,0,0.28)', position:'relative', marginBottom:20 }}>
          <div style={{ position:'absolute', left:-18, bottom:22, width:0, height:0, borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderRight:'18px solid #F5C518' }}/>
          <div style={{ position:'absolute', left:-11, bottom:24, width:0, height:0, borderTop:'8px solid transparent', borderBottom:'8px solid transparent', borderRight:'13px solid rgba(255,255,255,0.97)' }}/>
          <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:13, color:'#E8A000', marginBottom:5 }}>Blaze the Firefighter</div>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, fontWeight:700, color:'#2d2d2d', lineHeight:1.55, margin:0 }}>
            Hey there, explorer! I'm Blaze! Ready to learn how to keep our forests safe from wildfires?
          </p>
        </div>
      </div>

      {/* Play button */}
      <div style={{ position:'absolute', bottom:'6%', left:'50%', transform:'translateX(-50%)', zIndex:20, opacity:btnVisible?1:0, transition:'opacity 0.6s ease' }}>
        <PlayButton onClick={() => navigateTo(SCENES.WORLD_MAP)} label="LET'S GO!" size="large" icon="🌲"/>
      </div>

      {['🦋','🐝','🌸','🍃','🌺'].map((e,i) => (
        <div key={i} style={{ position:'absolute', bottom:'3%', left:`${15+i*17}%`, fontSize:26, animation:`float ${2.5+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.5}s`, zIndex:5, pointerEvents:'none' }}>{e}</div>
      ))}
    </div>
  );
};
export default OpeningScreen;
