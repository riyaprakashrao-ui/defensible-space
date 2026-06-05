import React, { useState, useEffect } from 'react';

const DialogueBox = ({ text, onNext, showNext=true, style={}, characterName='Blaze' }) => {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => { setDisplayed(''); setCharIdx(0); setTyping(true); }, [text]);

  useEffect(() => {
    if (charIdx < text.length) {
      const t = setTimeout(() => { setDisplayed(p=>p+text[charIdx]); setCharIdx(p=>p+1); }, 28);
      return () => clearTimeout(t);
    } else { setTyping(false); }
  }, [charIdx, text]);

  const handleClick = () => {
    if (typing) { setDisplayed(text); setCharIdx(text.length); setTyping(false); }
    else if (onNext) onNext();
  };

  return (
    <div onClick={handleClick} style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.97),rgba(255,248,220,0.97))', border:'4px solid #F5C518', borderRadius:22, padding:'16px 22px', boxShadow:'0 8px 28px rgba(0,0,0,0.25)', cursor:'pointer', position:'relative', animation:'slideInUp 0.4s ease', ...style }}>
      <div style={{ position:'absolute', top:-17, left:18, background:'#F5C518', color:'#1a1a1a', fontFamily:"'Fredoka One',cursive", fontSize:13, padding:'3px 12px', borderRadius:10, boxShadow:'0 2px 6px rgba(0,0,0,0.2)' }}>
        🔥 {characterName}
      </div>
      <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:15, fontWeight:700, color:'#2d2d2d', lineHeight:1.6, minHeight:44, margin:0 }}>
        {displayed}
        {typing && <span style={{ display:'inline-block', width:2, height:15, background:'#F5C518', marginLeft:2, animation:'pulse 0.5s ease infinite', verticalAlign:'middle' }}/>}
      </p>
      {!typing && showNext && (
        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
          <div style={{ background:'#F5C518', color:'#1a1a1a', fontFamily:"'Fredoka One',cursive", fontSize:13, padding:'5px 14px', borderRadius:18, animation:'bounce 1s ease infinite', boxShadow:'0 2px 6px rgba(0,0,0,0.2)' }}>
            {onNext ? 'Next ▶' : 'Got it! ✓'}
          </div>
        </div>
      )}
    </div>
  );
};
export default DialogueBox;
