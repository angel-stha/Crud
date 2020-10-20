import React,{useState,useEffect} from 'react';
import "./App.css";
import Axios from 'axios' 

function App() {

  const [movieName,setMovieName]=useState ('');
  const [movieReview,setReview]=useState('');
  const [movieReviewList, setMovieList]=useState([])

  const[newReview,setNewReview] =useState("")


  useEffect(()=> {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const  submitReview =() =>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName:movieName,
      movieReview:movieReview
    });
    
      setMovieList([...movieReviewList, 
        {movieName:movieName,movieReview:movieReview},]);
    };
 const deleteReview =(movie) => {
      console.log(movie)

    Axios.post('http://localhost:3001/api/delete/',{
        movieName:movie,
    });

  }
  
  
  const updateReview =(movie) => {
    Axios.put('http://localhost:3001/api/update',{
      movieName:movie,
      movieReview:newReview, 

    });

    setNewReview("")
  };
  return (
    <div className="App">
      <h1> CRUD Application</h1>
  
      <div className="form">
      <label>Movie Name:</label>
      <input type= "text" placeholder ="Movie" name="moviename " 
       onChange={(e) => {
        setMovieName(e.target.value);}}/>
      <br>
      </br>
      <label>Review:</label>
       <input type="text" 
        placeholder="Reviews"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);}}/>
       <button onClick ={submitReview}> Submit </button>


       {movieReviewList.map((val)=> {
         return (
           <div className='card'>
         <h1>movieName:{val.movieName}| Movie Review:{val.movieReview} </h1>


         <button onClick={() =>{deleteReview(val.movieName)}}> DELETE</button>
         <input type='text' id="updateInput" onChange={(e)=> {
           setNewReview(e.target.value) }}
           />
         <button onClick={() =>{updateReview(val.movieName)}}> UPDATE</button>
          </div>
         );
       })}
      </div>

    </div>
  );
}

export default App;
