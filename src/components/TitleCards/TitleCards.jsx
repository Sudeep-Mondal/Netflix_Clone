import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title, category}) => {
   
  const [apiData, setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWM2Y2VjYzUxNjgyYWIxYWQ3ZGI1Njk2NzlhMDI1NSIsIm5iZiI6MTcyNjY3NjQ1Mi4xMTgyODEsInN1YiI6IjY2ZTg3Njg5ZTgyMTFlY2QyMmIxMzFlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6nZsmcHBSGZGb5ROMSz2ldl8Rjr7RTRJ6GquMFThL-8'
    }
  };
  

  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaX;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='title-card'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index)=>{
              return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
              </Link>
          })}
        </div>
    </div>
  )
}

export default TitleCards
