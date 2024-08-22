import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../queries/Queries";
import { Alert, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface EpisodeData {
  name: string;
  episode: string;
}

const CharacterPage = () => {
    //useParams is going to look for a parameter called "id" and grabs info
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert>
        <h1>ERROR! {error.message} </h1>
      </Alert>
    );
  }

  // data.character
  const { name, image, episode } = data.character;

  return (
    <Card style={{ width: "18rem" }} key={id}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <h2>Episodes: </h2>
        {episode.map(({ name, episode }: EpisodeData) => (
          <p>
            {episode} - {name}
          </p>
        ))}
      </Card.Body>
    </Card>
  );
};

export default CharacterPage;
