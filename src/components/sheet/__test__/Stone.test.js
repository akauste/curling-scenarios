import { render, screen } from '../../../utils/test-utils';
import Stone from '../Stone';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

describe('<Stone />', () => {
  test('can render stone', () => {
    render(<DndProvider backend={TouchBackend}>
      <svg>
        <Stone stone={{ x: 10, y: 12, id:'test', type: 'stone', visible: 'true', num: 9, team: 1 }} />
      </svg>
    </DndProvider>);
    const stoneEl = screen.getByTestId('stone-test');
    const circles = stoneEl.getElementsByTagName('circle');
    expect(circles.length).toBe(2);
    for(const c of circles) {
      expect(+c.getAttribute('cx')).toBe(10);
      expect(+c.getAttribute('cy')).toBe(12);
    }
  });
});