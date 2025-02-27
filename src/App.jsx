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
          </tr>
          ))}
        
      </tbody>   
  </table>
    </>
  )
}

export default App
