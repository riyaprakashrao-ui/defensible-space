import React, { useState, useEffect } from 'react';
import FirefighterCharacter from '../components/FirefighterCharacter';
import ForestBackground from '../components/ForestBackground';
import PlayButton from '../components/PlayButton';
import { SCENES } from '../scenes';

const ACHIEVEMENTS = [
  {id:SCENES.FIREBREAK,       emoji:'🪨',title:'Firebreak Builder',  desc:'Cleared dry grass to stop fire spreading!'},
  {id:SCENES.NATIVE_PLANTS,   emoji:'🌸',title:'Native Plant Expert',desc:'Planted fire-resistant California natives!'},
  {id:SCENES.GOATS,           emoji:'🐐',title:'Goat Wrangler',      desc:'Used goats to clear dangerous dry grass!'},
  {id:SCENES.CONTROLLED_BURN, emoji:'🔥',title:'Fire Safety Pro',    desc:'Learned how professionals do controlled burns!'},
];
const FACTS = [
  'Wildfires need fuel, heat, and oxygen to burn. Remove the fuel and you stop the fire!',
  'Firebreaks can be roads, rivers, or cleared strips of land — anything fire cannot cross!',
  'California native plants evolved with fire and are much more fire-resistant than non-native plants!',
  'One goat can eat up to 8 pounds of vegetation per day — that is a lot of fire fuel removed!',
  'Controlled burns have been used by Indigenous peoples for thousands of years to manage land!',
  'After a controlled burn, new plants grow back stronger and healthier than before!',
];

const VictoryScreen = ({ navigateTo, completedLevels }) => {
  const [factIdx, setFactIdx] = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [confetti] = useState(()=>Array.from({length:24},(_,i)=>({id:i,x:Math.random()*100,delay:Math.random()*3,dur:2.5+Math.random()*2.5,emoji:['🎉','⭐','🌟','✨','🎊','🌿','🌸','🍃'][i%8],size:16+Math.random()*18})));

  useEffect(()=>{
    const t=setInterval(()=>{ setFactVisible(false); setTimeout(()=>{ setFactIdx(p=>(p+1)%FACTS.length); setFactVisible(true); },350); },4000);
    return ()=>clearInterval(t);
  },[]);

  const allDone=ACHIEVEMENTS.every(a=>completedLevels.includes(a.id));

  return (
    <div style={{width:'100vw',height:'100vh',position:'relative',overflow:'hidden'}}>
      <ForestBackground showPath={false} timeOfDay="day"/>
      {confetti.map(c=>(
        <div key={c.id} style={{position:'absolute',left:c.x+'%',top:-30,fontSize:c.size,pointerEvents:'none',zIndex:5,animation:'leafFall '+c.dur+'s ease-in '+c.delay+'s infinite'}}>{c.emoji}</div>
      ))}
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',paddingTop:'3vh',zIndex:10,overflowY:'auto'}}>
        <div style={{animation:'popIn 0.6s ease',textAlign:'center',marginBottom:14}}>
          <div style={{background:'rgba(22,65,12,0.95)',border:'5px solid #F5C518',borderRadius:26,padding:'16px 44px',boxShadow:'0 12px 40px rgba(0,0,0,0.5)',position:'relative',display:'inline-block'}}>
            <span style={{position:'absolute',top:-13,left:18,fontSize:26}}>🏆</span>
            <span style={{position:'absolute',top:-13,right:18,fontSize:26}}>🏆</span>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'clamp(26px,5vw,52px)',color:'#F5C518',textShadow:'3px 3px 0 #8B6914'}}>{allDone?'Land Protector!':'Great Work!'}</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:14,color:'#a8e063',fontWeight:800,marginTop:4}}>{allDone?'You completed all 4 land safety missions!':completedLevels.length+'/4 missions complete!'}</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',gap:16,marginBottom:14,animation:'slideInLeft 0.6s ease 0.3s both'}}>
          <FirefighterCharacter size={120} waving expression="excited"/>
          <div style={{background:'rgba(255,255,255,0.97)',border:'4px solid #F5C518',borderRadius:18,padding:'14px 18px',maxWidth:260,boxShadow:'0 8px 24px rgba(0,0,0,0.25)',position:'relative',marginBottom:18}}>
            <div style={{position:'absolute',left:-17,bottom:20,width:0,height:0,borderTop:'9px solid transparent',borderBottom:'9px solid transparent',borderRight:'17px solid #F5C518'}}/>
            <div style={{position:'absolute',left:-10,bottom:22,width:0,height:0,borderTop:'7px solid transparent',borderBottom:'7px solid transparent',borderRight:'12px solid rgba(255,255,255,0.97)'}}/>
            <p style={{fontFamily:"'Nunito',sans-serif",fontSize:14,fontWeight:700,color:'#2d2d2d',lineHeight:1.5,margin:0}}>
              {allDone?"You're an amazing land protector! Our forests are safer because of you!":"Great job! Go back to the map and try the other missions to become a full land protector!"}
            </p>
          </div>
        </div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:14,padding:'0 14px',animation:'slideInUp 0.6s ease 0.5s both'}}>
          {ACHIEVEMENTS.map((a,i)=>{
            const earned=completedLevels.includes(a.id);
            return (
              <div key={a.id} style={{background:earned?'rgba(22,65,12,0.95)':'rgba(0,0,0,0.4)',border:'3px solid '+(earned?'#F5C518':'rgba(255,255,255,0.2)'),borderRadius:16,padding:'12px 14px',textAlign:'center',minWidth:105,filter:earned?'none':'grayscale(1) opacity(0.45)',animation:earned?'popIn 0.5s ease both':'none',animationDelay:(i*0.1)+'s',boxShadow:earned?'0 6px 20px rgba(0,0,0,0.3)':'none'}}>
                <div style={{fontSize:30,marginBottom:4}}>{earned?a.emoji:'🔒'}</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:12,color:earned?'#F5C518':'#888',lineHeight:1.2,marginBottom:4}}>{a.title}</div>
                {earned&&<div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:'#a8e063',fontWeight:700,lineHeight:1.2}}>{a.desc}</div>}
              </div>
            );
          })}
        </div>
        <div style={{background:'rgba(22,65,12,0.92)',border:'3px solid #F5C518',borderRadius:16,padding:'10px 22px',maxWidth:580,width:'90%',textAlign:'center',marginBottom:16,minHeight:58,display:'flex',alignItems:'center',justifyContent:'center',animation:'slideInUp 0.6s ease 0.7s both'}}>
          <p style={{fontFamily:"'Nunito',sans-serif",fontSize:14,fontWeight:700,color:'#a8e063',lineHeight:1.5,margin:0,opacity:factVisible?1:0,transition:'opacity 0.35s ease'}}>
            Did you know? {FACTS[factIdx]}
          </p>
        </div>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',animation:'slideInUp 0.6s ease 0.9s both'}}>
          <PlayButton onClick={()=>navigateTo(SCENES.WORLD_MAP)} label="Play Again" size="medium" color="#4CAF50" icon="🗺️"/>
          <PlayButton onClick={()=>navigateTo(SCENES.OPENING)} label="Main Menu" size="medium" color="#F5C518" icon="🏠"/>
        </div>
      </div>
    </div>
  );
};
export default VictoryScreen;
