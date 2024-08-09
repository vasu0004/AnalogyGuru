import React, { useState } from 'react';
import axios from '../api/axios';

function AddAnalogy({ onAdd }) {
  const [concept, setConcept] = useState('');
  const [analogy, setAnalogy] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error,setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/analogies', { concept, analogy,description,image });
      onAdd(response.data);
      setConcept('');
      setAnalogy('');
      setDescription('');
      setImage('');
      setError(''); // Clear error message on successful submission
    } catch (error) {
      console.error('Error adding the analogy:', error);
      setError('Failed to add analogy. Please try again later.');
    }
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Concept"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
      />
      <input
      className='analogy'
        type="text"
        placeholder="Analogy"
        value={analogy}
        onChange={(e) => setAnalogy(e.target.value)}
      />
      <textarea
      className='descript'
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
      className='imageurl'
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="but" onClick={handleSubmit}>Add Analogy</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

    </div>
  );
}

export default AddAnalogy;