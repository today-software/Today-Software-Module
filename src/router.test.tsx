import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

describe('Router', () => {
  it('should render the Home component for the root route', () => {
    window.history.pushState({}, '', '/');
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
    const homeComponent = screen.getByTestId('home-container');
    expect(homeComponent).toBeInTheDocument();
  });

  it('should render the 404 component for an unknown route', () => {
    window.history.pushState({}, '', '/unknown-route');
    render(
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
    const notFoundComponent = screen.getByTestId('404-container');
    expect(notFoundComponent).toBeInTheDocument();
  });
});
