import Header from '../components/Header'
import Formulario from '../components/Form'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { message } from 'antd';

export default function Home() {

  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const type = ['text', 'password']
  const label = ['Username', 'Password']
  const value = [username, password]
  const change = [setUsername, setPassword]

  useEffect(() => {
    try {
      fetch(import.meta.env.VITE_API_USUARIOS)
        .then((res) => res.json())
        .then((res) => setUsuarios([...res]))
    } catch (error) {
      console.log(error)
    }
  }, [])

  async function authenticated() {
    fetch(import.meta.env.VITE_API_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          username,
          password
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('jwt', `Bearer ${data.token}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function login(e) {
    e.preventDefault()
    const usuario = {
      username,
      password
    }
    const user = usuarios.filter(user => user.username === usuario.username && user.password === usuario.password)
    if (user.length === 0) { return message.error('Usuário e/ou senha não existem') }
    message.success('Login realizado com sucesso')
    authenticated()
    setTimeout(() => {
      navigate('/vendas')
    }, 2000);
  }

  return (
    <div>
      <Header />
      <Formulario
        titulo='Login'
        colunas={2}
        label={label}
        value={value}
        change={change}
        button='Fazer Login'
        onclick={login}
        type={type}
      />
    </div>
  )
}
