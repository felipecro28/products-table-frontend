import Formulario from "../components/Form"
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { message } from 'antd';
import "antd/dist/antd.css";


export default function NovoCliente() {


  const [clientes, setClientes] = useState([])
  const [razaoSocial, setRazaoSocial] = useState('')
  const [CNPJ, setCNPJ] = useState('')
  const [endereco, setEndereco] = useState('')


  const label = ['Razao Social', 'CNPJ', 'Endereço']
  const value = [razaoSocial, CNPJ, endereco]
  const change = [setRazaoSocial, setCNPJ, setEndereco]

  useEffect(() => {
    try {
      fetch(import.meta.env.VITE_API_CLIENTES)
        .then((res) => res.json())
        .then((data) => setClientes([...data]))
    } catch (error) {
      console.log(error)
    }
  }, [])

  function postCliente() {
    const cliente = { razaoSocial, CNPJ, endereco, token: localStorage.getItem('jwt') }
    fetch(import.meta.env.VITE_API_CLIENTES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": cliente.token
      },
      body: JSON.stringify(cliente)
    })
      .then(response => response.json())
      .then(data => {
        data.Message == 'Erro na validação do usuário. O usuário precisa estar logado.' ? message.error(data.Message) : message.success('Cliente criado com sucesso')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function cadastrarCliente(e) {
    e.preventDefault()
    const clienteCadastrado = { razaoSocial, CNPJ, endereco }
    const clienteExistente = clientes.filter(cliente => cliente.CNPJ === clienteCadastrado.CNPJ)
    console.log(clienteExistente)
    if (clienteExistente.length != 0) {
      message.error('CNPJ já cadastrado')
      return
    } else {
      postCliente()
    }
  }

  return (
    <div>
      <Header />
      <Formulario
        titulo='Cadastro de Clientes'
        colunas={3}
        label={label}
        value={value}
        change={change}
        button='Cadastrar'
        onclick={cadastrarCliente}
      />
    </div>
  )
}
