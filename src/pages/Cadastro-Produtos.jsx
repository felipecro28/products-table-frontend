import { useState, useEffect } from 'react';
import Formulario from '../components/Form'
import Header from '../components/Header'
import { message } from 'antd';

export default function CadastroProdutos() {
    const [codigoDoProduto, setCodigodoProduto] = useState(NaN)
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState(NaN)
    const [unidadeDeMedida, setunidadeDeMedida] = useState('')
    const [valorDeCompra, setvalorDeCompra] = useState(NaN)


    const label = ['Codigo do Produto', 'Descrição do Produto', 'Quantidade', 'Unidade de Medida', 'Valor de Compra']
    const value = [codigoDoProduto, descricao, quantidade, unidadeDeMedida, valorDeCompra]
    const change = [setCodigodoProduto, setDescricao, setQuantidade, setunidadeDeMedida, setvalorDeCompra]

    function cadastrarProduto(e) {
        e.preventDefault()
        const produto = { codigoDoProduto, descricao, quantidade, unidadeDeMedida, valorDeCompra, token: localStorage.getItem('jwt') }
        fetch(import.meta.env.VITE_API_PRODUTOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": produto.token
            },
            body: JSON.stringify(produto)
        })
            .then(response => response.json())
            .then(data => {
                data.Message == 'Erro na validação do usuário. O usuário precisa estar logado.' ? message.error(data.Message) : message.success('Produto cadastrado com sucesso')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

return (
    <div>
        <Header />
        <Formulario
            layout='inline'
            titulo='Cadastro de Produto'
            height='1000px'
            margin='40px'
            colunas={5}
            label={label}
            value={value}
            change={change}
            button='Cadastrar'
            onclick={cadastrarProduto}
        />
    </div>
)
}
