import React, { useState } from 'react'
import { Table, Tabs, Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";

export default function Tabela() {
  const { TabPane } = Tabs;
  const [clientes, setClientes] = useState([])
  const [produtos, setProdutos] = useState([])
  const navigate = useNavigate()
  const columnsClientes = [
    {
      title: 'ID',
      dataIndex: 'id',

    },
    {
      title: 'Razão Social',
      dataIndex: 'razaoSocial',

    },
    {
      title: 'CNPJ',
      dataIndex: 'CNPJ',
    },
    {
      title: 'Endereço',
      dataIndex: 'endereco',
    },
  ];

  const columnsProdutos = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 160
    },
    {
      title: 'Código',
      dataIndex: 'codigoDoProduto',
      width: 160
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      width: 160
    },
    {
      title: 'Unidade de Medida',
      dataIndex: 'unidadeDeMedida',
      width: 160
    },
    {
      title: 'Valor de Compra',
      dataIndex: 'valorDeCompra',
      width: 160
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      width: 160
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 160
    },
  ];




  function getClientes(){
    try {
      fetch(import.meta.env.VITE_API_CLIENTES)
      .then((res) => res.json())
      .then((data) => setClientes([...data]))
    } catch (error) {
      console.log(error)
    }
  }

  function getProdutos(){
    try {
      fetch(import.meta.env.VITE_API_PRODUTOS)
      .then((res) => res.json())
      .then((data) => setProdutos([...data]))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClientes();
    getProdutos()
  }, [])

  return (
    <div style={{width:'100%'}}>
    <Tabs defaultActiveKey="1" centered style={{marginTop: '30px'}}>

      <TabPane tab="Clientes" key="1">
        <Table key={columnsProdutos.dataIndex}
          columns={columnsClientes}
          dataSource={clientes}
          pagination={{
            pageSize: 15,
          }}
          scroll={{
            y: 240,
          }}
        />
      </TabPane>

      <TabPane tab="Produtos em Processo" key="2">
      <Table key={columnsProdutos.dataIndex}
          columns={columnsProdutos}
          dataSource={produtos.filter(produto => produto.status =='Em processo')}
          pagination={{
            pageSize: 15,
          }}
          scroll={{
            y: 240,
          }}
        />
      </TabPane>

      <TabPane tab='Vendas Aprovadas' key='3'>
      <Table key={columnsProdutos.dataIndex}
          columns={columnsProdutos}
          dataSource={produtos.filter(produto => produto.status =='Finalizado')}
          pagination={{
            pageSize: 15,
          }}
          scroll={{
            y: 240,
          }}
        />
      </TabPane>
      
    </Tabs>
    <div style={{display:'flex', justifyContent:'center', marginBotton: '15px'}}>
    <Button size='large' onClick={(e) => navigate('venda-produto')}> Registrar venda </Button>
    </div>
    <Outlet />
    </div>
  )
}






