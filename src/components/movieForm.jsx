import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres, getGenre } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      liked: false,
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.number(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),

    liked: Joi.boolean(),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      liked: movie.liked,
    };
  }

  doSubmit = async () => {
    const movieWithGenreId = { ...this.state.data };
    let movieWithGenre = {};
    movieWithGenre._id = movieWithGenreId._id;
    movieWithGenre.title = movieWithGenreId.title;
    movieWithGenre.genre = (await getGenre(movieWithGenreId.genreId)).data;
    movieWithGenre.numberInStock = movieWithGenreId.numberInStock;
    movieWithGenre.dailyRentalRate = movieWithGenreId.dailyRentalRate;
    movieWithGenre.liked = movieWithGenreId.liked;
    await saveMovie(movieWithGenre);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
