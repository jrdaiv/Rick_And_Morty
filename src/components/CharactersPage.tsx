import React from 'react'
import { GET_CHARACTERS } from '../queries/Queries';
import { useQuery } from '@apollo/client';
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';



interface CharacterData {
    id: string,
    name: string,
    image: string,
}

const CharactersPage = () => {

    const { data, error, loading } = useQuery(GET_CHARACTERS);

    if(loading) {
       return <Spinner animation='border'/>
    }

    if (error) {
        return (<Alert>
            <h1>Error!</h1>
        </Alert>
    )
    }
    return (
        <>
          <Container>
            <h1>CHARACTERS</h1>
            <Row>
              {data.characters.results.map(({ id, name, image }: CharacterData) => (
                <Col>
                  <Card style={{ width: "18rem" }} key={id}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                      {/* to={`/${id}`} will make character button route to character details */}
                      <Link to={`/${id}`}>
                      <Button variant="primary">Go!</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      );
    };
    
    export default CharactersPage;