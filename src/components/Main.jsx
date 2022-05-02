import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../style/Main.css'

const Main = () => {

  const [post, setPost] = useState([])

  useEffect(()=>{
    let endpoint = `https://jsonplaceholder.typicode.com/posts`
    axios.get(endpoint)
    .then(response => {
        const data = response.data;
        setPost(data)
        console.log(data)
    })
    .catch((error) => {
        Swal.fire({
            icon:'error',
            title:`Error😭`,
            text:'Lo sentimos, esto es un error inesperado'
        })
    })
  },[setPost])
  
  let goLogin = useNavigate()
  
  const closeSesion = () => {
    Swal.fire({
      icon:'warning',
      title:'Cerraras sesion',
      text:'Estas segur@?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesion!',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        localStorage.clear()
        goLogin('/login')
      }
    })
  }

  let token = localStorage.getItem('token')
  
  return (
    <div className='Main'>
      {!token && <Navigate to='/login' />}
      <button className='btn-close' type='submit' onClick={closeSesion}>Cerrar sesion</button>
      <div className="container">
        {
          post.map((publi, index) => {
            return(
                <div className='card' key={index}>
                <h2 className='titulo'>{publi.title}</h2>
                <p className='body'>{publi.body}</p>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Main
