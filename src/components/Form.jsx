import { Button, Form, Input } from 'antd';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import styles from '../css/Form.module.css'

export default function Formulario(props) {

  return (
    <Form
      layout={props.layout}
      style={{ margin: '30px auto', display: 'flex', flexDirection: 'column', position: 'relative', height: props.height, width: props.width, justifyContent: 'space-evenly', backgroundColor: props.bgColor }}>

      <h3 style={{ letterSpacing: '2px' }}>{props.titulo}</h3>
      <Link to={props.to ? props.to : '/'} style={{ display: props.close ? 'flex' : 'none', position: 'absolute', top: '2px', right: '7px' }}>X</Link>
      {Array.apply(0, Array(props.colunas)).map(function (item, key) {
        return <Form.Item key={key}
          style={{ width: props.width ? props.width : '80%', display: 'block' }}
          label={props.label[key]}
          name={props.label[key]}
          rules={[{ required: true, message: `Favor inserir  ${props.label[key]}` }]}>
          <Input style={{ width: '80%' }} value={props.value[key]} onChange={(e) => props.change[key](e.target.value)} />
        </Form.Item>
      })}
      <Button type='primary' onClick={props.onclick}> {props.button} </Button>
    </Form>
  )
}

