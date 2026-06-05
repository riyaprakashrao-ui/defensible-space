# Keep The Land Safe 🌲🔥

An interactive educational game for 2nd–3rd grade students that teaches wildfire prevention and land safety through hands-on mini-games and an animated companion character.

---

## About the Game

Players explore a forest world guided by **Blaze**, a friendly firefighter companion who introduces each concept, reacts to player choices, and encourages exploration. The game covers four key land safety methods:

| Method | What Kids Learn |
|---|---|
| 🪨 Firebreaks | Clearing dry vegetation to create barriers that stop fire from spreading |
| 🌸 Native Plants | How California native plants (Cherry Tree, Fuchsia, Poppy) are fire-resistant |
| 🐐 Grazing Goats | How goats eating dry grass naturally removes wildfire fuel |
| 🔥 Controlled Burns | How professionals safely use fire to clear dead material — and why kids should never try this themselves |

---

## Learning Goals

By the end of the game, players will understand:

- How wildfires start and spread through dry, unkempt land
- What a firebreak is and how it works
- Which native California plants are fire-resistant and why
- How goats help reduce fire risk naturally
- How controlled burns work and that they must only be done by trained professionals
- That protecting land requires multiple strategies working together

---

## Game Structure

```
Opening Screen       → Animated forest intro with Blaze
    ↓
World Map            → 4 level cards, progress tracked with stars
    ↓
Mini-Games (×4)      → One per land safety method
    ↓
Victory Screen       → Achievement badges + wildfire fun facts
```

### Mini-Game Mechanics

- **Firebreaks** — Tap dry grass patches to clear them before fire spreads across the land
- **Native Plants** — Select a plant card, then tap the matching garden spot to plant it
- **Goats** — Tap tall grass patches to send goats to eat them
- **Controlled Burn** — Click the 6 safety steps in the correct order

---

## Tech Stack

- **React 18** (Create React App)
- **CSS animations** via `index.css` keyframes — no animation libraries
- **SVG** for the path/background elements
- **Custom assets** in `public/` and `public/assets/`
- No external game engines or dependencies beyond React

---

## Project Structure

```
src/
├── App.js                        # Scene router + state management
├── scenes.js                     # SCENES constants (avoids circular imports)
├── index.css                     # Global styles + all keyframe animations
│
├── components/
│   ├── FirefighterCharacter.js   # Blaze — animated image-based character
│   ├── ForestBackground.js       # Layered forest scene with animated clouds
│   ├── DialogueBox.js            # Typewriter-effect speech bubbles
│   ├── PlayButton.js             # Reusable animated button
│   └── SceneTransition.js        # Full-screen fade between scenes
│
└── scenes/
    ├── OpeningScreen.js          # Title screen
    ├── WorldMapScreen.js         # Level select with 4 image cards
    ├── FirebreakScene.js         # Mini-game 1
    ├── NativePlantsScene.js      # Mini-game 2
    ├── GoatsScene.js             # Mini-game 3
    ├── ControlledBurnScene.js    # Mini-game 4
    └── VictoryScreen.js          # Results + achievements

public/
├── firefighter.png               # Blaze character image
├── background.png                # Default scene background
├── Opening Screen.png            # (optional) opening scene background
└── assets/
    ├── Firebreak.png
    ├── Native Plant.png
    ├── Goat.png
    └── Fire.png
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:3000

# Build for production
npm run build
```

---

## Replacing Assets

| Asset | Location | Used In |
|---|---|---|
| Firefighter character | `public/firefighter.png` | All scenes |
| Default background | `public/background.png` | All game scenes |
| Opening background | `public/Opening Screen.png` | Opening screen only |
| Level card images | `public/assets/*.png` | World Map cards |

---

## Key Design Decisions

- **No circular imports** — `SCENES` constants live in `src/scenes.js` rather than `App.js` to avoid the circular dependency that would cause silent module failures
- **Error boundary** — `App.js` wraps everything in an `ErrorBoundary` so crashes show a readable error instead of a blank screen
- **CSS-only animations** — All motion uses keyframes defined in `index.css`, keeping the bundle small and avoiding runtime animation libraries
- **Scalable scene system** — Adding a new level requires: a new scene file, a new entry in `SCENES`, a new case in `App.js`'s `renderScene`, and a card in `WorldMapScreen.js`

---

## Content Notes

The **Controlled Burn** scene includes explicit safety messaging that this technique is professionals-only and should never be attempted by children. This is reinforced through:
- Blaze's dialogue before the mini-game
- A persistent warning badge during gameplay
- A safety reminder in the success overlay
