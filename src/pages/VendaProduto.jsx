import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Form';
import { message } from 'antd';

export default function VendaProduto() {

  const [id, setId] = useState(NaN)
  const [valorDaVenda, setValorDaVenda] = useState(NaN)
  const [quantidade, setQuantidade] = useState(NaN)
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    try {
      fetch(import.meta.env.VITE_API_PRODUTOS)
        .then((res) => res.json())
        .then((data) => setProdutos([...data]))
    } catch (error) {
      console.log(error)
    }
  }, [])

  const label = ['ID', 'Valor da Venda', 'Quantidade']
  const value = [id, valorDaVenda, quantidade]
  const change = [setId, setValorDaVenda, setQuantidade]

  const navigate = useNavigate()

  const produto = produtos.filter(product => product.id == +id)





  function alteraProduto() {
    if (produto[0] === undefined) return message.error('É necessário inserir um ID válido')

    const produtoAlterado = { id, valorDaVenda: +valorDaVenda, quantidade: produto[0].quantidade - quantidade }
    if (produtoAlterado.valorDaVenda <= +produto[0].valorDeCompra) return message.error('Valor da venda deve ser superior ao de compra.')
    if (quantidade > +produto[0].quantidade) return message.error('Quantidade da venda maior que a disponívem em estoque')
    console.log(typeof(produtoAlterado.valorDaVenda))


    fetch(import.meta.env.VITE_API_CLIENTES + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('jwt')
      },
      body: JSON.stringify(produtoAlterado)
    })
      .then(response => response.json())
      .then(data => { console.log(data) })
      .catch((error) => {
        console.error('Error:', error);
      });
    registraVenda()
  }

  function registraVenda() {
    const produtoVendido = {
      codigoDoProduto: produto[0].codigoDoProduto,
      descricao: produto[0].descricao,
      unidadeDeMedida: produto[0].unidadeDeMedida,
      valorDeCompra: produto[0].valorDeCompra,
      valorDeVenda: valorDaVenda,
      quantidade,
      status: 'Finalizado',
      token: localStorage.getItem('jwt')
    }
    fetch(import.meta.env.VITE_API_CLIENTES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": produtoVendido.token
      },
      body: JSON.stringify(produtoVendido)
    })
      .then(response => response.json())
      .then(data => {
        data.Message == 'Erro na validação do usuário. O usuário precisa estar logado.' ? message.error(data.Message) : message.success('Produto cadastrado com sucesso')
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }

  function registrar(e) {
    e.preventDefault()
    alteraProduto()

  }

  return (
    <div style={{ position: 'absolute', top: '30%', width:'100%'}}>


      <Formulario
        to='/vendas'
        close
        bgColor='white'
        colunas={3}
        titulo='Registrar Venda'
        label={label}
        value={value}
        change={change}
        button='Registrar'
        onclick={registrar}/>
          

    </div>
  )
}
