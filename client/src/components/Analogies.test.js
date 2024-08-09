// src/components/Analogies.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analogies from './Analogies';
import axios from 'axios';

jest.mock('axios');

test('fetches and displays analogies', async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, concept: 'Concept 1', analogy: 'Analogy 1' },
      { id: 2, concept: 'Concept 2', analogy: 'Analogy 2' }
    ]
  });

  render(<Analogies />);

  
  expect(await screen.findByText(/Concept 1: Analogy 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/Concept 2: Analogy 2/i)).toBeInTheDocument();
});