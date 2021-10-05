import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataCard from "./components/DataCard";
import axios from "axios";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import FavCard from "./components/FavCard";
import FavModal from "./components/FavModal";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      favs: [],
      item: {},
      showModal: false,
      title: "",
      description: "",
      toUSD: 0,
      image_url: "",
      id: 0,
    };
  }

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_PORT}/data`).then((res) => {
      this.setState({
        data: res.data,
      });
    });
    axios.get(`${process.env.REACT_APP_BACKEND_PORT}/get-favs`).then((res) => {
      this.setState({
        favs: res.data,
      });
    });
  };

  addToFavs = (item) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_PORT}/create-fav?email=${this.props.auth0.user.email}`,
        item
      )
      .then((res) => {
        this.setState({
          favs: res.data,
        });
      });
  };

  updateFav = () => {
    let updatedItem = {
      title: this.state.title,
      description: this.state.description,
      toUSD: this.state.toUSD,
      image_url: this.state.image_url,
      id: this.state.id,
    };

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_PORT}/update-fav/${this.state.item._id}`,
        updatedItem
      )
      .then((res) => {
        this.setState({
          favs: res.data,
        });
      });
  };

  handleModalOpen = (item) => {
    console.log(item);
    this.setState({
      showModal: true,
      item: item,
      title: item.favs.title,
      description: item.favs.description,
      toUSD: item.favs.toUSD,
      image_url: item.favs.image_url,
      id: item.favs.id,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleToUSD = (e) => {
    this.setState({
      toUSD: e.target.value,
    });
  };

  deleteFav = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_PORT}/delete-fav/${this.state.item._id}`
      )
      .then((res) => {
        this.setState({
          favs: res.data,
        });
      });
  };

  render() {
    return (
      <div>
        <Router>
          {this.props.auth0.isAuthenticated && <Nav />}
          {!this.props.auth0.isAuthenticated && <LoginButton />}
          {this.props.auth0.isAuthenticated && <LogoutButton />}
          <Switch>
            <Route exact path="/">
              <DataCard data={this.state.data} addToFavs={this.addToFavs} />
            </Route>
            <Route exact path="/favs">
              {this.props.auth0.isAuthenticated && (
                <FavCard
                  favs={this.state.favs}
                  handleModalOpen={this.handleModalOpen}
                />
              )}
              {this.props.auth0.isAuthenticated && (
                <FavModal
                  showModal={this.state.showModal}
                  handleModalClose={this.handleModalClose}
                  title={this.state.title}
                  description={this.state.description}
                  toUSD={this.state.toUSD}
                  handleTitle={this.handleTitle}
                  handleDescription={this.handleDescription}
                  handleToUSD={this.handleToUSD}
                  updateFav={this.updateFav}
                  deleteFav={this.deleteFav}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withAuth0(App);
