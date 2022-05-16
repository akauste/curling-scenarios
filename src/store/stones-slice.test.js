import { stonesSlice, stonesActions } from "./stones-slice";

const reducer = stonesSlice.reducer;

describe('stones-slice', () => {
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

  describe('test doubles setup', () => {
    const initState = reducer(undefined, {});
    const nextState = reducer(initState, stonesActions.initialize({
      direction: -1,
      hammer: 'yellow',
      gameMode: 2,
      rockPosition: 4,
      powerPlay: 0,
    }));
    
    it('should have direction -1', () => {
      expect(nextState.direction).toBe(-1);
    })
    it('should have only doubles rocks', () => {
      expect(nextState.stones.length).toBe(12);
    });
    it('should have 6 + 6 rocks', () => {
      expect(nextState.stones.filter(stone => stone.team === 1).length).toBe(6);
      expect(nextState.stones.filter(stone => stone.team === 2).length).toBe(6);
    });
  })

  describe('add stone prev-position', () => {
    const initState = reducer(undefined, {});
    const nextState = reducer(initState, stonesActions.initialize({
      direction: 1,
      hammer: 'yellow',
      gameMode: 2,
      rockPosition: 4,
      powerPlay: 0,
    }));

    it('should initially have no prevPosition', () => {
      const r1 = nextState.stones.find(s => s.id === 'r1');
      expect(r1).toBeTruthy();
      expect(r1.prevPosition).not.toBeTruthy();
    })

    it('should get prevPosition by addPrevPosition action', () => {
      const addedState = reducer(nextState, stonesActions.addStonePrevPosition({id: 'r1'}));
      const r1 = addedState.stones.find(s => s.id==='r1');
      expect(r1.prevPosition).toBeTruthy();
      expect(r1.prevPosition.x).toBe(r1.x);
      expect(r1.prevPosition.y).toBe(r1.y);
    });

    it('adding prevPosition should push history', () => {
      const addedState = reducer(nextState, stonesActions.addStonePrevPosition({id: 'r1'}));
      
      expect(addedState.historyBack.length).toBe(nextState.historyBack.length + 1);
    });
    
  });
});