import React from 'react';
import { render, screen } from '@testing-library/react';
import Toolbar from './components/toolbar';

describe('Toolbar component', () => {
  it('renders without crashing', () => {
    render(<Toolbar />);
  });
});
