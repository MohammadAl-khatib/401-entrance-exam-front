import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export class FavCard extends Component {
  render() {
    return this.props.favs.map((item) => {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={item.favs.image_url} />
          <Card.Body>
            <Card.Title>{item.favs.title}</Card.Title>
            <Card.Text>{item.favs.description}</Card.Text>
            <Card.Text>{item.favs.toUSD}</Card.Text>
            <Button
              variant="primary"
              onClick={() => this.props.handleModalOpen(item)}
            >
              Edit
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }
}

export default FavCard;
