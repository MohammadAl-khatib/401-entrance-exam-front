import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class DataCard extends Component {
  render() {
    return this.props.data.map((item) => {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={item.image_url} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{item.toUSD}</Card.Text>
            <Button
              variant="primary"
              onClick={() => this.props.addToFavs(item)}
            >
              Add to Favs
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }
}

export default DataCard;
