import { render, screen } from '@testing-library/react';
import DoublesMarkings from './DoublesMarkings';

describe('<DoublesMarkings direction="1" />', () => {
  test('renders doubles markings', () => {
    render(<svg><DoublesMarkings direction={1} /></svg>);
    screen.getByTestId('doubles-markings');
    expect(1).toBe(1);
  });

  test('renders 9 circles', () => {
    render(<svg><DoublesMarkings direction={1} /></svg>);

    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBe(9);
  });
});