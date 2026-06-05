import React, { useState, useCallback } from 'react';
import './App.css';
import { SCENES } from './scenes';
import OpeningScreen from './scenes/OpeningScreen';
import WorldMapScreen from './scenes/WorldMapScreen';
import FirebreakScene from './scenes/FirebreakScene';
import NativePlantsScene from './scenes/NativePlantsScene';
import GoatsScene from './scenes/GoatsScene';
import ControlledBurnScene from './scenes/ControlledBurnScene';
import VictoryScreen from './scenes/VictoryScreen';
import SceneTransition from './components/SceneTransition';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width:'100vw', height:'100vh', background:'#1a1a1a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', fontFamily:'monospace', padding:40 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>Error</div>
          <pre style={{ background:'#333', padding:20, borderRadius:8, fontSize:13, maxWidth:'80vw', overflow:'auto', color:'#ff6b6b', whiteSpace:'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <button onClick={() => this.setState({ hasError:false, error:null })} style={{ marginTop:20, padding:'10px 24px', background:'#F5C518', border:'none', borderRadius:12, fontSize:16, cursor:'pointer' }}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [currentScene, setCurrentScene] = useState(SCENES.OPENING);
  const [transitioning, setTransitioning] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [transitionColor, setTransitionColor] = useState('#2d5a1b');

  const navigateTo = useCallback((scene, color) => {
    setTransitionColor(color || '#2d5a1b');
    setTransitioning(true);
    setTimeout(() => { setCurrentScene(scene); setTransitioning(false); }, 500);
  }, []);

  const completeLevel = useCallback((levelName) => {
    setCompletedLevels(prev => prev.includes(levelName) ? prev : [...prev, levelName]);
  }, []);

  const props = { navigateTo, completedLevels, completeLevel };

  const renderScene = () => {
    switch (currentScene) {
      case SCENES.OPENING: return <OpeningScreen {...props} />;
      case SCENES.WORLD_MAP: return <WorldMapScreen {...props} />;
      case SCENES.FIREBREAK: return <FirebreakScene {...props} />;
      case SCENES.NATIVE_PLANTS: return <NativePlantsScene {...props} />;
      case SCENES.GOATS: return <GoatsScene {...props} />;
      case SCENES.CONTROLLED_BURN: return <ControlledBurnScene {...props} />;
      case SCENES.VICTORY: return <VictoryScreen {...props} />;
      default: return <OpeningScreen {...props} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        {renderScene()}
        <SceneTransition active={transitioning} color={transitionColor} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
