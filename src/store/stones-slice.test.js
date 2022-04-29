import { stonesSlice, stonesActions } from "./stones-slice";

const reducer = stonesSlice.reducer;

describe('stones-slice initial state', () => {
  const initState = reducer(undefined, {});

  test('should return initial state', () => {
    expect(initState.direction).toBe(1);
  });

  test('initial state should have 16 stones', () => {
    expect(initState.stones.length).toBe(16);
  });
  test('initially there should not be historyBack', () => {
    expect(initState.historyBack.length).toBe(0);
  });

  test('initially there should not be historyForward', () => {
    expect(initState.historyForward.length).toBe(0);
  });

  test('next state should have 16 stones', () => {
    //const initState = reducer(undefined, {});
    const nextState = reducer(initState, stonesActions.moveStone({id: 'r1', x: 0, y: 0}));
    expect(nextState.stones.length).toBe(16);
  });
});

describe('after first move', () => {
  const initState = reducer(undefined, {});
  const nextState = reducer(initState, stonesActions.moveStone({id: 'r1', x: 0, y: 0}));

  test('next state should still have 16 stones', () => {
    //const initState = reducer(undefined, {});
    expect(nextState.stones.length).toBe(16);
  });

  test('after move we should have history', () => {
    expect(nextState.historyBack.length).toBe(1);
  });
});

describe('stone should not overlap', () => {
  const initState = reducer(undefined, {});

  const s1 = reducer(initState, stonesActions.moveStone({id: 'r1', x: 0, y: 0}));
  const r2orig = s1.stones.find(s => s.id === 'r2');
  test('r2 original position should be behind hogline', () => {
    expect(r2orig.y).toBeGreaterThan(640);
  })
  
  const s2 = reducer(s1, stonesActions.moveStone({id: 'r2', x: 0, y: 0}));
  const r2moved = s2.stones.find(s => s.id === 'r2');
  
  test('r2 should move from the original posision', () => {
    expect(r2moved.x).not.toBe(r2orig.x);
  });
  
  test('r2 should move y from the original posision', () => {
    expect(r2moved.y).not.toBe(r2orig.y);
  });

  test('r2 should not be moved to origo', () => {
    const inOrigo = r2moved.x === 0 && r2moved.y === 0;
    expect(inOrigo).toBeFalsy();
  });

  test('after 2 moves, we should have 2 states in history', () => {
    expect(s2.historyBack.length).toBe(2);
  });
});