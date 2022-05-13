import { render, screen, fireEvent } from "@testing-library/react";
import StoneSetup from "../StoneSetup";
import store from "../../../store";
import { Provider } from "react-redux";

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const Providers = ({children}) => {
  return <Provider store={store}>{children}</Provider>;
}

describe('<StoneSetup />', () => {
  describe('data updates', () => {
    test('should call stonesActions with defaults, when save is clicked', () => {
      const onClose = jest.fn(e => e.preventDefault());

      render(<StoneSetup onClose={onClose} />, {wrapper: Providers});
      fireEvent.click(screen.getByText('Submit'));
      expect(store.getState()['stones'].direction).toBe(1);
      expect(store.getState()['stones'].hammer).toBe('red');
      expect(store.getState()['stones'].gameMode).toBe(4);
      expect(onClose).toBeCalledTimes(1);
      jest.clearAllMocks();
    });

    test('should call stonesActions with clicked values, when save is clicked', async () => {
      const onClose = jest.fn(e => e.preventDefault());
      render(<StoneSetup onClose={onClose} />, {wrapper: Providers});

      fireEvent.click(screen.getByText('Swap'));
      fireEvent.click(screen.getByRole('button', {name: 'yellow'}));
      fireEvent.click(screen.getByText(/doubles/));
      fireEvent.click(screen.getByText('1'));
      const btnLeft = screen.getByText(/ Left/);
      fireEvent.click(btnLeft);
      expect(btnLeft).toHaveClass('activeBtn');
      expect(screen.getByText(/Center/)).not.toHaveClass('activeBtn');
      expect(screen.getByText(/Right /)).not.toHaveClass('activeBtn');

      fireEvent.click(screen.getByText('Submit')); //fireEvent.click(submitEl); 
      expect(store.getState()['stones'].direction).toBe(-1);
      expect(store.getState()['stones'].hammer).toBe('yellow');
      expect(store.getState()['stones'].gameMode).toBe(2);
      expect(store.getState()['stones'].rockPosition).toBe(1);
      expect(store.getState()['stones'].powerPlay).toBe(-1);
      expect(onClose).toBeCalledTimes(1);
      jest.clearAllMocks();
    });
  });

  describe('powerplay buttons', () => {
    let btnLeft;
    let btnCenter;
    let btnRight;

    beforeEach(() => {
      const onClose = jest.fn(e => e.preventDefault());
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<StoneSetup onClose={onClose} />, {wrapper: Providers});
      fireEvent.click(screen.getByText(/doubles/));
      btnLeft = screen.getByText(/ Left/);
      btnCenter = screen.getByText(/Center/);
      btnRight = screen.getByText(/Right /);
    });

    test('left button sets classes', () => {
      fireEvent.click(btnLeft);
      expect(btnLeft).toHaveClass('activeBtn');
      expect(btnCenter).not.toHaveClass('activeBtn');
      expect(btnRight).not.toHaveClass('activeBtn');
    });

    test('center button sets classes', () => {
      fireEvent.click(btnCenter);
      expect(btnLeft).not.toHaveClass('activeBtn');
      expect(btnCenter).toHaveClass('activeBtn');
      expect(btnRight).not.toHaveClass('activeBtn');
    });

    test('right button sets classes', () => {
      fireEvent.click(btnRight);
      expect(btnLeft).not.toHaveClass('activeBtn');
      expect(btnCenter).not.toHaveClass('activeBtn');
      expect(btnRight).toHaveClass('activeBtn');
    });
  });

  describe('rockPosition buttons', () => {
    let buttons = [];

    beforeEach(() => {
      const onClose = jest.fn(e => e.preventDefault());
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<StoneSetup onClose={onClose} />, {wrapper: Providers});
      fireEvent.click(screen.getByText(/doubles/));
      [1,2,3,4,5,6].forEach(num => buttons.push(screen.getByText( num.toString() )));
    });
    
    test(`buttons sets classes`, () => {
      buttons.forEach((btn, idx) => {
        fireEvent.click(btn);
        buttons.forEach(checkBtn => {
          if(checkBtn !== btn) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(checkBtn).not.toHaveClass('activeBtn');
          }
        });
        expect(btn).toHaveClass('activeBtn');
      });
    });
  });
});
