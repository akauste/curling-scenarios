import { render, screen } from '../../../utils/test-utils';
import DisplaySheet from '../DisplaySheet';

describe('<DisplaySheet />', () => {
  const sheet = {
    width: 450,
    buttonRadius: 15,
    backgap: 50,
    frontgap: 40,
    team1color: 'pink',
    team2color: 'lime',
    ring12color: 'silver',
    ring4color: 'gray'
  };

  test('can render display sheet without stones', () => {
    render(<DisplaySheet sheet={sheet} direction={1} stones={[]} />);
    expect(screen.getByTestId('displaysheet') ).toBeVisible();
  });

  test("can render display sheet without stones prop", () => {
    render(<DisplaySheet sheet={sheet} direction={1} />);
    expect(screen.getByTestId('displaysheet') ).toBeVisible();
  });
});