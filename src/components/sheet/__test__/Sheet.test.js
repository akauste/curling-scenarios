import { render, screen } from '../../../utils/test-utils';
//import { wrapInTestContext } from 'react-dnd-test-utils';
import TestUtils from 'react-dom/test-utils'
//import { DragDropContext } from 'react-dnd'
import Sheet from '../Sheet';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

describe('<Sheet />', () => {
  test('can render sheet', () => {
    render(<DndProvider backend={TouchBackend}><Sheet /></DndProvider>);
    expect(1).toBe(1);
  });
});