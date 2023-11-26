import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';
describe('Header', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    render(<Header />);
  });
  test('component render', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
