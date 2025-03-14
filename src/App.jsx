import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  
//Creazione di un array per la crezione dei posts
const [posts, setPosts] = useState([])

//Dove aggiungere gli elementi nuovi che andremo ad aggiungere negli input (é un oggetto perché nel backend la lista ha questa forma)
const initialFormData = {
  title: ``,
  content: ``,
}

//Creazione di un useState dove si aggiungeranno i dati
const [formData, setFormData] = useState (initialFormData);


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

//Funzione per l'handlePost, quindi per l'aggiunta di un posts
const handlePost = (event) =>{
  const {name, value} = event.target; //si occupa di recuperare in modo dinamico ciò che si inserisce nell'input
  setFormData({
    ...formData,
    [name]: value,
    
  })
}


//Funzione per l'handleSubmit, quindi per la modifica del form
const handleSubmit = (event) =>{
  event.preventDefault();  //per  non far ricaricare la pagina

  axios
  .post (`http://localhost:3000/posts`, formData)
  .then (() =>fetchPosts()) //callback function
  .catch (err => console.error(err));

  setFormData(initialFormData);
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

  {/* Form per l'aggiunta di elementi */}
  <form onSubmit={handleSubmit}>
    <input type='text' name='title' onChange={handlePost} value={formData.title} placeholder='Nome Posts'></input>
    <input type='text' name='content' onChange={handlePost} value={formData.content} placeholder='Content Posts'></input>
    <button className="btn btn-primary" type='submit'>Aggiungi</button>
  </form>

  
    </>
  )
}

export default App
