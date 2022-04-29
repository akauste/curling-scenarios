import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ColorSelector from '../ColorSelector';

describe('<ColorSelector />', () => {
  test('should render', () => {
    const ref = React.createRef();
    render(<ColorSelector label='My favorite color' id="favcolor" value='blue' ref={ref} />);
    expect( screen.getByLabelText('My favorite color').value ).toBe('blue');
  });

  test('should update the ref, when selecting new value', () => {
    const ref = React.createRef();
    render(<ColorSelector label='My favorite color' id="favcolor" value='blue' ref={ref} />);
    fireEvent.change(screen.getByLabelText('My favorite color'), {target: { value: 'red' }});
    expect( screen.getByLabelText('My favorite color').value ).toBe('red');
  });

  test('should update the ref, when selecting new value yellow', () => {
    const ref = React.createRef();
    render(<ColorSelector label='My favorite color' id="favcolor" value='blue' ref={ref} />);
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', {name: 'Yellow'})
    );
    expect( screen.getByRole('option', {name: 'Yellow'}).selected ).toBe(true);
    expect(ref.current.value).toBe('yellow');
  });
});