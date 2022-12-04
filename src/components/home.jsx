import React, { Component } from "react";
import { getMovies } from "./../services/movieService";

class Home extends Component {
  state = {};
  async componentDidMount() {
    await getMovies();
  }
  render() {
    return <h1>Miroplex</h1>;
  }
}

export default Home;
