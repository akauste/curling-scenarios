import { render, screen } from '../../../utils/test-utils';
import DisplayStone from '../DisplayStone';

describe('<DisplayStone />', () => {
  test('can render stone', () => {
    render(<svg>
        <DisplayStone stone={{ x: 9, y: 18, id:'test', type: 'stone', visible: 'true', num: 9, team: 1 }} />
      </svg>);
    const stoneEl = screen.getByTestId('displaystone-test');
    const circles = stoneEl.getElementsByTagName('circle');
    expect(circles.length).toBe(2);
    for(const c of circles) {
      expect(+c.getAttribute('cx')).toBe(9);
      expect(+c.getAttribute('cy')).toBe(18);
    }
  });
});