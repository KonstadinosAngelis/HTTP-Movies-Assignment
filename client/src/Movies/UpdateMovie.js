import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

const initalState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: '',
}

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initalState)
  const { id } = useParams();

  useEffect(()=> {
    const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);
    
    if(movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id])

  const onChange = ev => {
    ev.persist();
    let value = ev.target.value
    if (ev.target.name === "stars"){
      console.log(value)
      value = value.split(",")
    }
    setMovie({
      ...movie, [ev.target.name]: value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => {console.log(res.data)
    props.history.push(`/`)})
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          onChange={onChange}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={onChange}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={onChange}
          placeholder="metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={onChange}
          placeholder="stars"
          // value={movie.stars}
        />
        <button>Edit Movie</button>
      </form>
    </div>
  )
}

export default UpdateMovie