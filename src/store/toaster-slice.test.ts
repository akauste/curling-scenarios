import { toasterActions, toasterSlice } from "./toaster-slice";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    toaster: toasterSlice.reducer,
  }
});

//const reducer = toasterSlice.reducer;

describe('toaster-slice', () => {
  describe('one message', () => {
    //const initState = reducer(undefined);
    let state = store.getState().toaster;

    it('should be able to add toast', () => {
      store.dispatch(toasterActions.add({title: 'T1', message: 'M1'}));
      state = store.getState().toaster;
      expect(state.messages.length).toBe(1);
      expect(state.messages[0].title).toBe('T1');
      expect(state.messages[0].message).toBe('M1');
      expect(state.messages[0].autoRemove).toBe(true);
      expect(state.messages[0].displayTime).toBeGreaterThan(1000);
      expect(state.messages[0].type).toBe('success');
      expect(state.messages[0].id).toBeGreaterThan(0);
    });

    it('should be able to remove message', () => {
      const toastId = state.messages[0].id;

      store.dispatch(toasterActions.remove(toastId));
      state = store.getState().toaster;
      expect(state.messages.length).toBe(0);
    });
  });

  describe('success toast', () => {
    let state = store.getState().toaster;

    it('should be able to add success with autoremove', () => {
      store.dispatch(toasterActions.add({title: 'S1'}));
      state = store.getState().toaster;
      const toast = state.messages.find(m => m.title === 'S1');
      expect(toast?.autoRemove).toBe(true);
      expect(toast?.displayTime).toBeGreaterThan(1000);
    });
  });

  describe('info toast', () => {
    let state = store.getState().toaster;

    it('should be able to add info with autoremove', () => {
      store.dispatch(toasterActions.add({title: 'I1', type: 'info'}));
      state = store.getState().toaster;
      const toast = state.messages.find(m => m.title === 'I1');
      expect(toast?.autoRemove).toBe(true);
      expect(toast?.displayTime).toBeGreaterThan(1000);
    });
  });

  describe('warning toast', () => {
    let state = store.getState().toaster;

    it('should be able to add warning with autoremove', () => {
      store.dispatch(toasterActions.add({title: 'W1', type: 'warning'}));
      state = store.getState().toaster;
      const toast = state.messages.find(m => m.title === 'W1');
      expect(toast?.autoRemove).toBe(true);
      expect(toast?.displayTime).toBeGreaterThan(1000);
    });
  });

  describe('error toast', () => {
    let state = store.getState().toaster;

    it('should be able to add error without autoremove', () => {
      store.dispatch(toasterActions.add({title: 'E1', type: 'error'}));
      state = store.getState().toaster;
      const toast = state.messages.find(m => m.title === 'E1');
      expect(toast?.autoRemove).toBe(false);
      expect(toast?.displayTime).toBeGreaterThan(1000);
    });
  });
});