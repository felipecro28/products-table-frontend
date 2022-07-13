import styles from '../css/Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <Link className={styles.link} className={styles.link} to='/'><h2>Logo</h2></Link>
      <nav>
        <ul>
          <Link className={styles.link} to='/cadastro-usuario'><li>Cadastrar Usuário</li></Link>
          <Link className={styles.link} to='/cadastro-cliente'><li>Novo Cliente</li></Link>
          <Link className={styles.link} to='/cadastro-produtos'><li>Cadastrar Produto</li></Link>
          <Link className={styles.link} to='/vendas'><li>Registrar venda</li></Link>

        </ul>
      </nav>
    </header>
  )
}
