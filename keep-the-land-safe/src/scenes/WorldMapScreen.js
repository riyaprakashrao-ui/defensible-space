import React, { useState } from 'react';
import ForestBackground from '../components/ForestBackground';
import FirefighterCharacter from '../components/FirefighterCharacter';
import DialogueBox from '../components/DialogueBox';
import { SCENES } from '../scenes';

const LEVELS = [
  { id: SCENES.FIREBREAK,       title: 'Firebreaks',      image: '/assets/Firebreak.png',     scale: '65%' },
  { id: SCENES.NATIVE_PLANTS,   title: 'Native Plants',   image: '/assets/Native Plant.png',  scale: '90%' },
  { id: SCENES.GOATS,           title: 'Goats',           image: '/assets/Goat.png',           scale: '90%' },
  { id: SCENES.CONTROLLED_BURN, title: 'Controlled Burn', image: '/assets/Fire.png',           scale: '55%' },
];

const INTRO = [
  'Welcome to the Land Safety Map! Our forest needs your help!',
  'Wildfires spread fast through dry grass and dead plants. We need to protect our land!',
  'I will teach you 4 ways to keep the land safe. Click each area to learn and play!',
];

const WorldMapScreen = ({ navigateTo, completedLevels }) => {
  const [idx, setIdx] = useState(0);
  const [showDlg, setShowDlg] = useState(true);
  const [hovered, setHovered] = useState(null);

  const next = () => idx < INTRO.length - 1 ? setIdx(idx + 1) : setShowDlg(false);
  const allDone = LEVELS.every(l => completedLevels.includes(l.id));

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <ForestBackground showPath timeOfDay="day" />

      {/* Title */}
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 20, textAlign: 'center' }}>
        <div style={{ background: 'rgba(22,65,12,0.95)', border: '4px solid #F5C518', borderRadius: 22, padding: '10px 32px', boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: 28, color: '#F5C518' }}>Land Safety Map</div>
          <div style={{ fontFamily: "'Nunito',sans-serif", fontSize: 13, color: '#a8e063', fontWeight: 800 }}>
            {completedLevels.length}/{LEVELS.length} areas protected!
          </div>
        </div>
      </div>

      {/* Stars */}
      <div style={{ position: 'absolute', top: 88, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 20 }}>
        {LEVELS.map((l, i) => (
          <span key={i} style={{ fontSize: 26, filter: completedLevels.includes(l.id) ? 'none' : 'grayscale(1) opacity(0.35)' }}>⭐</span>
        ))}
      </div>

      {/* Level cards — 4 in a single row */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 16,
        zIndex: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {LEVELS.map((level, i) => {
          const done = completedLevels.includes(level.id);
          const isHovered = hovered === level.id;
          return (
            <div
              key={level.id}
              onClick={() => navigateTo(level.id)}
              onMouseEnter={() => setHovered(level.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: 265,
                height: 367,
                background: 'white',
                border: '3px solid #FFD23F',
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isHovered
                  ? '0 16px 40px rgba(0,0,0,0.35), 0 0 0 3px #FFD23F'
                  : '0 8px 24px rgba(0,0,0,0.25)',
                transform: isHovered ? 'translateY(-6px) scale(1.03)' : 'scale(1)',
                transition: 'all 0.2s ease',
                animation: `popIn 0.5s ease both`,
                animationDelay: `${i * 0.1}s`,
                flexShrink: 0,
              }}
            >
              {/* Image fills the card */}
              <img
                src={level.image}
                alt={level.title}
                style={{
                  width: level.scale,
                  height: level.scale,
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  margin: 'auto',
                }}
              />

              {/* Title bar at bottom */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                background: 'rgba(255,255,255,0.92)',
                borderTop: '2px solid #FFD23F',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: 18,
                  color: '#1a1a1a',
                }}>
                  {level.title}
                </div>
                {done
                  ? <span style={{ fontSize: 20 }}>✅</span>
                  : <span style={{ fontSize: 14, fontFamily: "'Nunito',sans-serif", fontWeight: 800, color: '#FFD23F', background: '#1a1a1a', padding: '3px 10px', borderRadius: 20 }}>PLAY →</span>
                }
              </div>

              {/* Completed overlay */}
              {done && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(76,175,80,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 56, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>⭐</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Victory button */}
      {allDone && (
        <div style={{ position: 'absolute', bottom: 28, right: 28, zIndex: 30 }}>
          <button
            onClick={() => navigateTo(SCENES.VICTORY, '#F5C518')}
            style={{ background: 'linear-gradient(135deg,#F5C518,#E8A000)', border: '4px solid #8B6914', borderBottom: '7px solid #8B6914', borderRadius: 22, padding: '14px 28px', fontFamily: "'Fredoka One',cursive", fontSize: 20, color: '#1a1a1a', cursor: 'pointer', animation: 'pulse 1.5s ease infinite' }}
          >
            See Your Results! 🏆
          </button>
        </div>
      )}

      {/* Firefighter + dialogue */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, display: 'flex', alignItems: 'flex-end', gap: 14, zIndex: 25 }}>
        <FirefighterCharacter size={120} speaking={showDlg} expression="happy" />
        {showDlg && (
          <DialogueBox text={INTRO[idx]} onNext={next} style={{ maxWidth: 340, marginBottom: 16 }} />
        )}
      </div>
    </div>
  );
};

export default WorldMapScreen;
