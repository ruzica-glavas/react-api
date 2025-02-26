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

//Chiamata del componente

useEffect(fetchPosts,[])


  return (
    <>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
