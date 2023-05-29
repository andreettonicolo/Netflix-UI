import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';


const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, 'user', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'user', `${user?.email}`)
  const deleteShow = async (passedID) => {
      try {
        const result = movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef, {
            savedShows: result
        })
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <>
      
      <div className='relative flex items-center group'>
        
        <div
          id={'slider'}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
          {movies.map((item) => (
            <div
              key={item.id}
              className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
            >
              <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                  {item?.title}
                </p>
                <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default SavedShows;