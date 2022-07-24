import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { AuthContext } from '../context/AuthContext';
import { toastWarnNotify } from '../helpers/ToastNotify';
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Hearts } from  'react-loader-spinner'




const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(()=> {
       getMovies(FEATURED_API)
    },1500)
     
   
  }, []);

  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
    } else if (!currentUser) {
      toastWarnNotify('Please log in to search a movie');
      // alert("Please log in to search a movie");
    } else {
      toastWarnNotify('Please enter a text');
      // alert("Please enter a text");
    }
  };
  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="d-flex justify-content-center flex-wrap">
        {loading ? (
          <div className="spinner-border text-primary m-5" role="status">
            <span className="sr-only"><Hearts color="#0f6c8b" height={80} width={80} /></span>
          </div>
        ) : (
          movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </>
  );
};

export default Main;
