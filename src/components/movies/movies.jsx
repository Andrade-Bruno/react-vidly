import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";

import DefaultFilter from "../commom/defaultFilter";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const allGenres = [{ _id: "", name: "All genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: allGenres });
  }

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <div className="container">
          <h1>Movies</h1>
          <h5>Search some movies, delete or favorite it!</h5>
          <hr></hr>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "50px",
            }}
          >
            <div>
              <DefaultFilter
                items={this.state.genres}
                selectedFilter={this.state.selectedFilter}
                onItemSelect={this.handleFilter}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
              }}
            >
              <MoviesTable
                data={movies}
                sortColumn={sortColumn}
                totalCount={totalCount}
                onFavorite={this.handleFavorite}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCounter={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  getPageData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedFilter,
      sortColumn,
    } = this.state;

    const finalFilter =
      selectedFilter && selectedFilter._id
        ? allMovies.filter((m) => m.genre._id === selectedFilter._id)
        : allMovies;

    // _.orderBy(data, columns to filter (can be multiple), order to filter (can be multiple))
    const finalSort = _.orderBy(
      finalFilter,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(finalSort, currentPage, pageSize);

    return { totalCount: finalFilter.length, data: movies };
  }

  handleDelete = (movie) => {
    const newListMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: newListMovies });
  };

  handleFavorite = (movie) => {
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...movie };
    newMovies[index].favorite = !newMovies[index].favorite;
    this.setState({ movies: newMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleFilter = (itemFilter) => {
    this.setState({ currentPage: 1, selectedFilter: itemFilter });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };
}

export default Movies;
