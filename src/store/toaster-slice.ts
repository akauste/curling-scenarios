import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AddToastMessage {
  title: string;
  message?: string;
  //id?: number;
  autoRemove?: boolean;
  displayTime?: number;
  type?: 'success' | 'error' | 'info' | 'warning'
};

type ToastMessage = {
  title: string;
  message?: string;
  id: number;
  autoRemove: boolean;
  displayTime: number;
  type: 'success' | 'error' | 'info' | 'warning'
};


const initialState: { 
  maxId: number;
  defaultDisplayTime: number;
  messages: ToastMessage[];
} = {
  maxId: 1,
  defaultDisplayTime: 5000,
  messages: []
}

export const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddToastMessage>) => {
      const message = action.payload;
      const id = state.maxId++;
      const type = message.type || 'success';
      let autoRemove = message.type !== 'error' ? true : false;
      if(message.autoRemove !== undefined) {
        autoRemove = message.autoRemove;
      } 
      const displayTime = message.displayTime || state.defaultDisplayTime;
      const newToast = {
        title: message.title,
        message: message.message,
        id,
        type,
        autoRemove,
        displayTime
      };
      console.warn('newToast:', newToast);
      state.messages.push(newToast);
    },
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.messages = state.messages.filter(m => m.id !== id);
    },
  }
});

export const toasterActions = toasterSlice.actions;