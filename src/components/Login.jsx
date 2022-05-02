import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom'
import '../style/Login.css'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub, FaTwitter} from 'react-icons/fa'
import {BsFacebook} from 'react-icons/bs'
import {AiOutlineMail} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'


const Login = () => {

    let acceso = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        if(email === '' || password === ''){
            Swal.fire({
                icon:'error',
                title:'Oops...',
                text:'No puedes dejar espacios en blanco'
            })
            return;
        }
        if(email !== '' && !regexEmail.test(email)){
            Swal.fire({
                icon:'error',
                title:'Correo invalido',
                text:'Escribe un correo valido',
                footer: `<p className='ejemplo'>ejemplo@ejemplo.com</p>`
            })
            return;
        }
        if(email !== 'challenge@alkemy.org' || password !== 'react'){
            Swal.fire({
                icon:'error',
                title:'Credenciales invalidas',
                text:'Ingresa datos validos'
            })
            return;
        }
        axios
            .post('http://challenge-react.alkemy.org',{email, password})
            .then(res => {
                Swal.fire({
                    icon:'success',
                    title:'Bienvenid@',
                    text:'Ingresaste correctamente'
                })
                const tokenRecibido = res.data.token;
                localStorage.setItem('token',tokenRecibido)
                acceso('/')
            })
    }

    let token = localStorage.getItem('token')

  return (
    <div className='Login'>
    {token && <Navigate to='/' />}
      <form onSubmit={submitHandler}>
        <div className="cabecera">
            <p>Iniciar Sesión</p>
        </div>
        <label htmlFor="email">Email</label> <br />
        <AiOutlineMail className='icon-place'/><input id="email" type="text" name="email" placeholder='nombre@ejemplo.com' /> <br />
        <label htmlFor="password">Contraseña</label> <br />
        <RiLockPasswordLine className='icon-place'/><input id="password" type="password" name="password" placeholder='********' /> <br />
        <button type="submit">Ingresar</button><br />
        <div className='crear'>
            <small>No tienes una cuenta? <span>Registrate</span></small>
        </div>
        <div className="icons">
            <FcGoogle className='icon'/>
            <FaGithub className='icon'/>
            <BsFacebook className='icon'/>
            <FaTwitter className='icon'/>
        </div>
      </form>
    </div>
  );
}

export default Login