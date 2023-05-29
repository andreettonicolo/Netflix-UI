import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);



  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex flex-row items-center group'>
        
        <div
          id={'slider' + rowID}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Row;