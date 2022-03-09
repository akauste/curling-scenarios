import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  width: 475,
  buttonRadius: 22.5,
  backgap: 120,
  frontgap: 0,
  ring12color: "blue",
  ring4color: "red",
  team1color: "red",
  team2color: "yellow",
};

const getInitialState = () => {
    const saved = localStorage.getItem('sheet-properties');
    console.log('loading...');
    if(saved) {
        console.log('Found');
        return { ...initialState, ...JSON.parse(saved) };
    }
    return initialState;
}

export const sheetSlice = createSlice({
  name: "sheet",
  initialState: getInitialState(),
  reducers: {
    reset: () => {},
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setButtonRadius: (state, action) => {
      state.buttonRadius = action.payload;
    },
    setBackgap: (state, action) => {
      state.backgap = action.payload;
    },
    setFrontgap: (state, action) => {
      state.frontgap = action.payload;
    },
    set12Color: (state, action) => {
      state.ring12color = action.payload;
    },
    set4Color: (state, action) => {
      state.ring4color = action.payload;
    },
    setTeam1Color: (state, action) => {
      state.team1color = action.payload;
    },
    setTeam2Color: (state, action) => {
      state.team2color = action.payload;
    },
    saveLocal: (state) => {
        localStorage.setItem('sheet-properties', JSON.stringify(state));
    }
  },
});

export const sheetActions = sheetSlice.actions;
