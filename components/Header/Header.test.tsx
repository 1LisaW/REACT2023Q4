import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';
import React from 'react';
describe('Header', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    render(<Header />);
  });
  test('component render', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
