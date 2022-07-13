import Formulario from "../components/Form.jsx"
import Header from "../components/Header"
import { useState } from 'react'
import "antd/dist/antd.css";
import { message } from 'antd';

export default function Cadastro() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const label = ['Name', 'Username', 'Password']
  const value = [name, username, password]
  const change = [setName, setUsername, setPassword]

  function cadastrarUsuario(e) {
    e.preventDefault()
    const usuario = { name, username, password, token: localStorage.getItem('jwt') }
    fetch(import.meta.env.VITE_API_USUARIOS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": usuario.token
      },
      body: JSON.stringify(usuario)
    })
      .then(response => response.json())
      .then(data => {
        data == 'Usuário criado com sucesso' ? message.success('Usuário criado com sucesso') : message.error(data.Message)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div>
      <Header />
      <Formulario
        titulo='Cadastro de Usuário'
        colunas={3}
        label={label}
        value={value}
        change={change}
        button='Cadastrar'
        onclick={cadastrarUsuario}
      />
    </div>
  )
}
