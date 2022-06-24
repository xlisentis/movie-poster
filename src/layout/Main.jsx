import React from 'react';
import { MovieList } from '../components/MovieList';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

class Main extends React.Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=39f9675a&s=matrix')
            .then((res) => res.json())
            .then((data) => this.setState({ movies: data.Search }));
    }

    searchMovies = (str, type = 'all') => {
        fetch(
            `http://www.omdbapi.com/?apikey=39f9675a&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((res) => res.json())
            .then((data) => this.setState({ movies: data.Search }));
    };

    render() {
        const { movies } = this.state;

        return (
            <main className='content container'>
                <Search searchMovies={this.searchMovies} />
                {movies.length ? (
                    <MovieList movies={this.state.movies} />
                ) : (
                    <Preloader />
                )}
            </main>
        );
    }
}

export { Main };
