import { render, screen } from '@testing-library/react';
import React from 'react';

import Card from '../Card';

describe('<Card />', () => {
  test('can render', () => {
    render(<Card>I am card</Card>);
    expect( screen.getByText(/I am card/i) ).toBeVisible();
  });
});