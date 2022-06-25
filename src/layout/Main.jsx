import React, { useState, useEffect } from 'react';
import { MovieList } from '../components/MovieList';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;
const url = 'https://www.omdbapi.com/';

function Main() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchMovies = (str, type = 'all') => {
        setLoading(true);
        fetch(
            `${url}?apikey=${API_KEY}&s=${str}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.Search);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetch(`${url}?apikey=${API_KEY}&s=avengers`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.Search);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <main className='content container'>
            <Search searchMovies={searchMovies} />
            {loading ? <Preloader /> : <MovieList movies={movies} />}
        </main>
    );
}

export { Main };
