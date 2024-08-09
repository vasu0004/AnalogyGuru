import React from 'react';
import { Card, Image } from 'react-bootstrap';

function SelectedConcept({ concept }) {
  if (!concept) {
    return <div>Select a concept to see details here.</div>;
  }

  return (
    <Card>
      <Card.Header>{concept.concept}</Card.Header>
      <Card.Body>
        <Card.Text>{concept.analogy}</Card.Text>
        {concept.image && (
          <div className="text-center">
            <Image src={concept.image} fluid />
            <div>
  <h3>{concept.concept}</h3>
  <p>{concept.analogy}</p>
  {concept.image && (
    <img src={concept.image} alt={concept.concept} />
  )}
</div>
          </div>
          
        )}
      </Card.Body>
    </Card>
  );
}

export default SelectedConcept;