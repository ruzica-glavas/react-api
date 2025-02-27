import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  
//Creazione di un array per la crezione dei posts
const [posts, setPosts] = useState([])


//Creazione funzione per api di posts
function fetchPosts() {
  axios
  .get (`http://localhost:3000/posts`)
  .then ((res) => setPosts (res.data) )
  .catch (err => console.error(err));
}

//Funzione per l'handleDelete

const handleDelete = (idSingoloPost) =>{
  axios
  .delete (`http://localhost:3000/posts/${idSingoloPost}`)
  //Riscrittura dell'array. Se l'id é diverso, il post viene aggiunto al nuovo array altrimenti no
  .then (setPosts(posts.filter ((post => post.id !== idSingoloPost)))) 
  .catch (err => console.error(err));
}

//Chiamata del componente quando carico la pagina
useEffect(fetchPosts,[])


  return (
    <>
    <table className="table">
      <thead>
        <tr>
          
          <th scope='row'>ID</th>
          <th scope='row'>Title</th>
          <th scope='row'>Content</th>
          
        </tr>
      </thead>

      <tbody>
        
          
          {posts.map((post)=>(
          <tr key={post.id}>
            <td scope='row' >{post.id}</td>
            <td scope='row' >{post.title}</td>
            <td scope='row' >{post.content}</td>
            <button className="btn btn-danger" onClick={() => handleDelete (post.id)}>Delete</button>
          </tr>
          ))}
        
      </tbody>   
  </table>
    </>
  )
}

export default App
