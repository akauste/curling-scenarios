import { render, screen } from '../../../utils/test-utils';
import Toast from '../Toast';

describe('<Toast />', () => {
  it('can render toast', () => {
    render(<Toast {...{id: 1, title: 'Test toast 1', message: 'I have a message to you'}} />);
    const titleEl = screen.getByText('Test toast 1');
    const messageEl = screen.getByText('I have a message to you');

    expect(titleEl).toHaveClass('title');
    expect(messageEl).toHaveClass('message');
  });

  it('can render with type success', () => {
    render(<Toast {...{id: 2, title: 'Test success', type: 'success'}} />);
    const el = screen.getByTestId('toast-2');
    expect(el).toHaveClass('success');
  });

  it('can render with type info', () => {
    render(<Toast {...{id: 2, title: 'Test success', message: 'I have a message to you', type: 'info'}} />);
    const el = screen.getByTestId('toast-2');
    expect(el).toHaveClass('info');
  });

  it('can render with type warning', () => {
    render(<Toast {...{id: 2, title: 'Test success', message: 'I have a message to you', type: 'warning'}} />);
    const el = screen.getByTestId('toast-2');
    expect(el).toHaveClass('warning');
  });

  it('can render with type error', () => {
    render(<Toast {...{id: 2, title: 'Test success', message: 'I have a message to you', type: 'error'}} />);
    const el = screen.getByTestId('toast-2');
    expect(el).toHaveClass('error');
  });

  it('can be closed', () => {
    render(<Toast {...{id: 2, title: 'Test toast 1', message: 'I have a message to you', type: 'success'}} />);
    const el = screen.getByTestId('toast-2');
    const messageEl = screen.getByText('I have a message to you');

    expect(el).toHaveClass('toast');
    expect(messageEl).toHaveClass('message');
  });

  it('can render success toast', () => {
    render(<Toast id={1} title='Test toast 1' message='I have a message to you' type='success' />);
    const titleEl = screen.getByText('Test toast 1');
    const messageEl = screen.getByText('I have a message to you');

    expect(titleEl).toHaveClass('title');
    expect(messageEl).toHaveClass('message');
  });
});