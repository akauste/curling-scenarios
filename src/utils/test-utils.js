// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import { authSlice } from '../store/auth-slice';
import { sheetSlice } from '../store/sheet-slice';
import { stonesSlice } from '../store/stones-slice';
import { toasterSlice } from '../store/toaster-slice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authSlice.reducer, sheet: sheetSlice.reducer, stones: stonesSlice.reducer, toaster: toasterSlice.reducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }