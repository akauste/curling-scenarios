//import { render, screen } from '@testing-library/react';
import { render, screen } from './utils/test-utils';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'

describe('<App />', () => {
  test('App is rendering', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const headerElement = screen.getByText(/Curling Scenarios/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('App is rendering board', () => {
    render(<MemoryRouter initialEntries={["/board"]}><DndProvider backend={TouchBackend}><App /></DndProvider></MemoryRouter>);
    const headerElement = screen.getByText(/Curling Scenarios/i);
    expect(headerElement).toBeInTheDocument();
  });

});
// test('not yet implemented', () => {});
