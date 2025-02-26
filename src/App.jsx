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
}

//Chiamata del componente quando carico la pagina
useEffect(fetchPosts,[])


  return (
    <>
    <table className="table">
      <thead>
        <tr>
          {posts.map((post)=>(
          <th scope='row' key= {post.id}>{post.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          {posts.map((post)=>(
          <td scope='row' key= {post.id}>{post.content}</td>
          ))}
        </tr>
      </tbody>   
  </table>
    </>
  )
}

export default App
