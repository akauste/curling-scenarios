import { createSlice } from "@reduxjs/toolkit";

const initStones = (direction, mode) => {
  const stones = [];
  const maxStone = mode === 4 ? 8 : 6;
  for(let i=1; i <= maxStone; i++) {
    stones.push({ x: -direction*(200-i*16), y: direction*(640+32), id:'r'+i, type: 'stone', visible: true, num: i, team: 1 });
  }
  for(let i=1; i <= maxStone; i++) {
    stones.push({ x:  direction*(200-i*16), y: direction*(640+32), id:'y'+i, type: 'stone', visible: true, num: i, team: 2 });
  };
  return stones;
}

const initialState = { 
  direction: 1, 
  hammer: 'red',
  gameMode: 4,
  powerPlay: null,
  rockPosition: null,
  stones: initStones(1, 4),
  historyBack: [],
  historyForward: []
};

const houseRockX = powerPlay => (122*powerPlay);
const guardRockX = (powerPlay,rockPosition) => {
  switch(rockPosition) {
      case 1: 
      case 2:
          return powerPlay * 109;
      case 3:
      case 4:
          return powerPlay * 107;
      case 5:
      case 6:
      default:
          return powerPlay * 104;
  }
};
const houseRockY = powerPlay => powerPlay ? 15 : +15-61;
const guardRockY = rockPosition => {
  const midpointY = 183+228.6;
  switch(rockPosition) {
    case 1: return midpointY-91.4-15;
    case 2: return midpointY-91.4+15;
    case 3: return midpointY-15;
    case 4: return midpointY+15;
    case 5: return midpointY+91.4-15;
    default: return midpointY+91.4+15;
  }
};

const move = (set, id, x, y) => {
  const stone = set.find(s => s.id === id);
  stone.x = x;
  stone.y = y;
};

const presetStones = (stones, hammer, direction, powerPlay, rockPosition) => {
  const [houseRock, guardRock] = hammer === 'red' ? ['r6', 'y6'] : ['y6', 'r6'];
  move(stones, houseRock, houseRockX(powerPlay), direction*houseRockY(powerPlay));
  move(stones, guardRock, guardRockX(powerPlay, rockPosition), direction*guardRockY(rockPosition));
};

const diameter = 28.8; // The default diameter

const isOverlap = (x1, y1, x2, y2) => {
  const dX = Math.abs(x1 - x2);
  const dY = Math.abs(y1-y2);
  if(dX > diameter || dY > diameter || Math.sqrt(dX*dX+dY*dY) > diameter)
    return false;
  return true;
};
export const getOverlaps = (stone, others) => {
  return others.filter(other => other.id !== stone.id && isOverlap(other.x, other.y, stone.x, stone.y));
};

// Very naive aproach, should be fixed with one that takes care more complex
// overlaps (multiple stones case), but this is ok for now
export const clearOverlaps = (x,y, other) => {
  console.log('Clearing overlaps', x, y, other, other.x, Math.abs(y-other.y));
  const diffX = Math.abs(x-other.x);
  const diffY = Math.abs(y-other.y);
  if(diffX > diffY) {
    const x1 = (x < other.x) ? other.x - Math.sqrt(diameter**2 - diffY**2)
                             : other.x + Math.sqrt(diameter**2 - diffY**2);
    return [x1, y];
  }
  const y1 = (y < other.y) ? other.y - Math.sqrt(diameter**2 - diffX**2)
                           : other.y + Math.sqrt(diameter**2 - diffX**2);
  return [x, y1];
};

export const stonesSlice = createSlice({
  name: 'stones',
  initialState,
  reducers: {
    moveStone: (state, action) => {
      const {id, x, y} = action.payload;

      state.historyBack.push({ direction: state.direction, stones: state.stones});
      state.historyForward = [];

      //state.stones = state.stones.map(val => ({ ...val }));
      const stone = state.stones.find(s => s.id === id);
      stone.x = x;
      stone.y = y;
      
      // If stone is in corner, move it to outof play position, scaled to small
      if(state.direction === 1) {
        if(y < -(183+30)) {
          stone.x = stone.team === 1 ? -200+stone.num*16 : 200-stone.num*16;
          stone.y = -(183+38);
        }
        else if(y > 655) {
          stone.x = stone.team === 1 ? -200+stone.num*16 : 200-stone.num*16;
          stone.y = (640+32);
        }
        else {
          const overlaps = getOverlaps(stone, state.stones);
          if(overlaps.length) {
            for (const other of overlaps) {
              [stone.x, stone.y] = clearOverlaps(stone.x, stone.y, other);
            }
          }
        }
      }
      else {
        if(y > (183+30)) {
          stone.x = stone.team === 1 ? 200-stone.num*16 : -200+stone.num*16;
          stone.y = (183+38);
        }
        else if(y < -655) {
          stone.x = stone.team === 1 ? 200-stone.num*16 : -200+stone.num*16;
          stone.y = -(640+32);
        }
        else {
          const overlaps = getOverlaps(stone, state.stones);
          if(overlaps.length) {
            for (const other of overlaps) {
              [stone.x, stone.y] = clearOverlaps(stone.x, stone.y, other);
            }
          }
        }
      }
    },
    addStonePrevPosition: (state, action) => {
      const {id} = action.payload;
      state.stones = Object.values(state.stones).map(val => val.id === id ? { ...val, prevPosition: { ...val }} : { ...val });
    },
    removeStonePrevPosition: (state, action) => {
      const {id, x, y} = action.payload;
      const stone = Object.values(state.stones).find(s => s.id === id);
      let current = stone;
      while(current.prevPosition) {
        if(current.prevPosition.x === x && current.prevPosition.y === y) {
          current.prevPosition = current.prevPosition.prevPosition ? current.prevPosition.prevPosition : null;
          return;
        }
        current = current.prevPosition;
      }
    },
    initialize: (state, action) => {
      const payload = action.payload;
      state.direction = payload.direction;
      state.hammer = payload.hammer;
      state.gameMode = payload.gameMode;
      if(payload.stones) {
        state.stones = payload.stones; // Allows loading from db
      }
      else {
        state.stones = initStones(payload.direction, payload.gameMode);
      }
      if(state.gameMode === 2) {
        state.powerPlay = payload.powerPlay;
        state.rockPosition = payload.rockPosition;
        if(!payload.stones) {
          // Done only, when we didn't get the full set already setup
          presetStones(state.stones, payload.hammer, payload.direction, payload.powerPlay, payload.rockPosition);
        }
      }
      else {
        state.powerPlay = null;
        state.rockPosition = null;
      }
    },
    reset: (state) => {
      state.historyBack.push({ direction: state.direction, stones: state.stones});
      state.historyForward = [];

      state.direction = initialState.direction;
      state.stones = initialState.stones;
    },
    load: (state, action) => {
      state.historyBack.push({ direction: state.direction, stones: state.stones});
      state.historyForward = [];

      state.direction = action.payload.direction;
      state.stones = action.payload.stones;
    },
    showOnlyMdStones: (state) => {
      state.stones = Object.values(state.stones).map(val => val.num > 6 ? { ...val, visible: false } : { ...val })
    },
    showAllStones: (state) => {
      state.stones = Object.values(state.stones).map(val => val.num > 6 ? { ...val, visible: true } : { ...val })
    },
    swapDirection: (state) => {
      state.historyBack.push({ direction: state.direction, stones: state.stones});
      state.historyForward = [];

      state.direction = -state.direction;
      const swapStone = (stone) => {
        const prevPos = stone.prevPosition ? swapStone(stone.prevPosition) : null;
        return {...stone, x: -stone.x, y: -stone.y, prevPosition: prevPos};
      };
      state.stones = state.stones.map(val => swapStone(val));
    },
    back: (state) => {
      if(state.historyBack.length) {
        const prevState = state.historyBack.pop();
        state.historyForward.push({direction: state.direction, stones: state.stones});
        state.direction = prevState.direction;
        state.stones = prevState.stones;
      }
    },
    forward: (state) => {
      if(state.historyForward.length) {
        const nextState = state.historyForward.pop();
        state.historyBack.push({direction: state.direction, stones: state.stones});
        state.direction = nextState.direction;
        state.stones = nextState.stones;
      }
    },
  }
});

export const stonesActions = stonesSlice.actions;