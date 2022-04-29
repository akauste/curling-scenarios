// import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import MainHeader from '../MainHeader';

describe('<MainHeader />', () => {
  test('renders main header', () => {
    render(<MemoryRouter><MainHeader /></MemoryRouter>);
    expect( screen.getByText(/Curling Scenarios/i) ).toBeInTheDocument();
  });

  test('nav link home is active', () => {
    render(<MemoryRouter><MainHeader /></MemoryRouter>);

    expect( screen.getByRole("link", {name: "Home"}) ).toHaveClass('active');
    expect( screen.getByRole('link', {name: /board/i}) ).not.toHaveClass('active');
  });

  test('nav link board is active', () => {
    render(<MemoryRouter initialEntries={["/board"]}><MainHeader /></MemoryRouter>);
    
    expect( screen.getByRole("link", {name: /home/i}) ).not.toHaveClass('active');
    expect( screen.getByRole("link", {name: /board/i}) ).toHaveClass('active');
  });
});