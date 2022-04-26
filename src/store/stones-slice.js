import { createSlice } from "@reduxjs/toolkit";

const initialState = { direction: 1, stones: {} };
let posX = 1;
let posY = 1;
for(let i=1; i < 9; i++) {
    //const sideDist = posX*30;
    const y = -15+30*posY;

    initialState.stones['r'+i] = { x: -200+i*16, y: 640+32, id:'r'+i, type: 'stone', visible: true, num: i, team: 1 };
    initialState.stones['y'+i] = { x:  200-i*16, y: 640+32, id:'y'+i, type: 'stone', visible: true, num: i, team: 2 };
    posX++;
    if(posX > 4) {
        posX = 1;
        posY++;
    }
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

      state.stones = Object.values(state.stones).map(val => ({ ...val }));
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
      }
    },
    addStonePrevPosition: (state, action) => {
      const {id} = action.payload;
      state.stones = Object.values(state.stones).map(val => val.id === id ? { ...val, prevPosition: { ...val }} : { ...val });
    },
    reset: (state) => {
      state.stones = initialState;
    },
    load: (state, action) => {
      state.stones = action.payload;
    },
    showOnlyMdStones: (state) => {
      state.stones = Object.values(state.stones).map(val => val.num > 6 ? { ...val, visible: false } : { ...val })
    },
    showAllStones: (state) => {
      state.stones = Object.values(state.stones).map(val => val.num > 6 ? { ...val, visible: true } : { ...val })
    },
    swapDirection: (state) => {
      state.direction = -state.direction;
      state.stones = Object.values(state.stones).map(val => ({...val, x: -val.x, y: -val.y}))
    }
  }
});

export const stonesActions = stonesSlice.actions;