import { createSlice } from "@reduxjs/toolkit";

const initialState = { stones: {} };
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

export const stonesSlice = createSlice({
  name: 'stones',
  initialState,
  reducers: {
    moveStone: (state, action) => {
      const {id, x, y} = action.payload;
      state.stones = Object.values(state.stones).map(val => val.id === id ? { ...val, x, y} : { ...val });
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
    }
  }
});

export const stonesActions = stonesSlice.actions;