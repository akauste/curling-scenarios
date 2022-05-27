import { render, screen, fireEvent, act } from "../../../utils/test-utils";
import Toaster from "../Toaster";

import { toasterActions, toasterSlice } from "../../../store/toaster-slice";
import { configureStore } from '@reduxjs/toolkit';

// To make tests work, we globally disable transitions:
import { config } from 'react-transition-group';
config.disabled = true;

let store;
let container;

beforeEach(() => {
  store = configureStore({
    reducer: {
      toaster: toasterSlice.reducer,
    }
  });

  container = document.createElement('div');
  container.id = 'toaster';
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('<Toaster />', () => {
  it('can create toaster', () => {
    render(<Toaster />, {store});
    expect(screen.getByRole('listbox')).toHaveClass('toaster');
  });

  it('shows the added toast and removes it automatically', async () => {
    store.dispatch(toasterActions.add({title: 'Toast one'}));
    const toastId = store.getState().toaster.messages[0].id;
    jest.useFakeTimers();

    render(<Toaster />, {store});
    
    expect(screen.getByText('Toast one')).toBeTruthy();
    expect(screen.getByTestId('toast-'+ toastId)).toBeInTheDocument();
    expect(store.getState().toaster.messages.length).toBe(1);
    
    // After seeing the element, test, that it's automatically removed as that is the default
    act(() => { jest.runAllTimers(); });
    expect(store.getState().toaster.messages.length).toBe(0);
    
    expect(screen.queryByTestId('toast-'+ toastId)).toBeNull();
  });

  it('shows the added toast and does not remove it automatically', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    store.dispatch(toasterActions.add({title: 'Toast two', autoRemove: false}));

    const t = store.getState().toaster;
    const toastId = t.messages[ t.messages.length-1 ].id;

    render(<Toaster />, {store});

    // Opposite of the previous test, now runnning timers should not have effect, when autoRemove is false
    act(() => { jest.runAllTimers(); });
    expect(screen.getByText('Toast two')).toBeTruthy();
    expect(screen.getByTestId('toast-'+ toastId)).toBeInTheDocument();
  });

  it('shows the added toast and can remove it by clicking it', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');

    store.dispatch(toasterActions.add({title: 'Toast three', autoRemove: false}));

    const t = store.getState().toaster;
    const toastId = t.messages[ t.messages.length-1 ].id;
    expect(store.getState().toaster.messages.length).toBe(1);

    render(<Toaster />, {store});
    expect(screen.getByText('Toast three')).toBeTruthy();
    const toastEl = screen.queryByTestId('toast-'+ toastId);
    fireEvent.click(toastEl);

    expect(store.getState().toaster.messages.length).toBe(0);
    expect(screen.queryByTestId('toast-'+ toastId)).toBeNull();
  });
});