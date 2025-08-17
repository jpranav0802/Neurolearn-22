import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders neurolearn landing page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Empowering Every Child's Unique Potential/i);
  expect(headingElement).toBeInTheDocument();
});
