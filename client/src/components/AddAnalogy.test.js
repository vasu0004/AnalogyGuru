// src/components/AddAnalogy.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddAnalogy from './AddAnalogy';
import axios from 'axios';

jest.mock('axios');

test('renders AddAnalogy form and handles input', async () => {
  render(<AddAnalogy onAdd={() => {}} />);

  fireEvent.change(screen.getByPlaceholderText(/concept/i), {
    target: { value: 'New Concept' }
  });
  fireEvent.change(screen.getByPlaceholderText(/analogy/i), {
    target: { value: 'New Analogy' }
  });

  fireEvent.click(screen.getByText(/add analogy/i));

  expect(axios.post).toHaveBeenCalledWith('/api/analogies', {
    concept: 'New Concept',
    analogy: 'New Analogy'
  });
});