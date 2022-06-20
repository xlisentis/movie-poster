import React from "react"
import { MovieList } from "../components/MovieList"
import { Preloader } from "../components/Preloader"

class Main extends React.Component {

    state = {
        movies: [],
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=39f9675a&s=matrix&page=2')
            .then(res => res.json())
            .then(data => this.setState({movies: data.Search}))
    }
    
    render() {
        const{movies} = this.state;

         return <main className="content container">
            {
                movies.length ? (
                <MovieList movies={this.state.movies} />
                ) : <Preloader />
            }
        </main>
    } 
}

export {Main}