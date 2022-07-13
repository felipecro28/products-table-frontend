import React, { useState } from 'react'
import { Table, Tabs, Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { columnsClientes, columnsProdutos } from '../helpers/tableColumns';

export default function Tabela() {
  const { TabPane } = Tabs;
  const [clientes, setClientes] = useState([])
  const [produtos, setProdutos] = useState([])
  const navigate = useNavigate()


  function getClientes() {
    try {
      fetch(import.meta.env.VITE_API_CLIENTES)
        .then((res) => res.json())
        .then((data) => setClientes([...data]))
    } catch (error) {
      console.log(error)
    }
  }

  function getProdutos() {
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
    <div style={{ width: '100%' }}>
      <Tabs defaultActiveKey="1" centered style={{ marginTop: '30px' }}>

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
            dataSource={produtos.filter(produto => produto.status == 'Em processo')}
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
            dataSource={produtos.filter(produto => produto.status == 'Finalizado')}
            pagination={{
              pageSize: 15,
            }}
            scroll={{
              y: 240,
            }}
          />
        </TabPane>

      </Tabs>
      <div style={{ display: 'flex', justifyContent: 'center', marginBotton: '15px' }}>
        <Button size='large' onClick={(e) => navigate('venda-produto')}> Registrar venda </Button>
      </div>
      <Outlet />
    </div>
  )
}






