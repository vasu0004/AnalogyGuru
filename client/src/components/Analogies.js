import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import AddAnalogy from './AddAnalogy';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Analogies() {
  const [analogies, setAnalogies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnalogy, setSelectedAnalogy] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 analogies initially

  useEffect(() => {
    axios.get('/api/analogies')
      .then(response => {
        setAnalogies(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const addAnalogy = (newAnalogy) => {
    setAnalogies([...analogies, newAnalogy]);
  };

  const filteredAnalogies = analogies.filter(analogy =>
    analogy.concept && analogy.concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Load 3 more analogies when clicked
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header className='cardheader'>Analogies</Card.Header>
            <Card.Body>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
              />
              <AddAnalogy onAdd={addAnalogy} />
              <ul className="list-unstyled">
                {filteredAnalogies.slice(0, visibleCount).map((analogy, index) => (
                  <li key={index} className="mb-3" onClick={() => setSelectedAnalogy(analogy)}>
                    <Card>
                      <Card.Body>
                        <strong>{analogy.concept}</strong>: {analogy.analogy}
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
              {visibleCount < filteredAnalogies.length && (
                <Button onClick={loadMore} className="showmore_button">
                  Show More
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          {selectedAnalogy && (
            <Card>
              <Card.Body>
                <h3>{selectedAnalogy.concept}</h3>
                <p><strong>Analogy:</strong> {selectedAnalogy.analogy}</p>
                {selectedAnalogy.description && (
                  <p><strong>Explanation:</strong> {selectedAnalogy.description}</p>
                )}
                {selectedAnalogy.image && (
                  <img
                    src={selectedAnalogy.image}
                    alt={selectedAnalogy.concept}
                    style={{ maxWidth: '100%' }}
                  />
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Analogies;