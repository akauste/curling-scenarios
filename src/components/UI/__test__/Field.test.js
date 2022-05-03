import { render, screen } from "@testing-library/react";
import Field from "../Field";

describe('<Field />', () => {
  test('can render without id', () => {
    render(<Field label="without id">Nada</Field>);
    expect(screen.getByText('without id')).toBeDefined();
    expect(screen.getByText('Nada')).toBeDefined();
  });
  
  test('can render with id', () => {
    render(<Field label="First name" id="fname"><input type="text" id="fname" defaultValue="Edvin" required={true} /></Field>);
    expect(screen.getByLabelText('First name')).toBeDefined();
    expect(screen.getByLabelText('First name').value ).toBe('Edvin');
  });

  test('can have input group', () => {
    render(
      <Field label="Group 1" id="grp">
        <div>
          <input id="grp" type="number" defaultValue={2} />-<input id="grp" type="number" defaultValue={12} />
        </div>
      </Field>
    );
    expect(screen.getByLabelText('Group 1')).toBeDefined();
    expect( +screen.getByLabelText('Group 1').value ).toBe(2);

  });
});