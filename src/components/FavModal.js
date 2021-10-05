import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class FavModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><form>
            <input defaultValue = {this.props.title} onChange = {this.props.handleTitle}/>
            <input defaultValue = {this.props.description} onChange = {this.props.handleDescription}/>
            <input defaultValue = {this.props.toUSD} onChange = {this.props.handleToUSD}/>
            </form>!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleModalClose}>
            Close
          </Button>
          <Button variant="primary"  onClick = {()=>this.props.updateFav()}>
            Save Changes
          </Button>
          <Button variant="primary"  onClick = {()=>this.props.deleteFav()}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FavModal;
