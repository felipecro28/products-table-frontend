import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import NovoCliente from "./pages/NovoCliente";
import Vendas from "./pages/Vendas";
import VendaProduto from "./pages/VendaProduto";
import CadastroProdutos from "./pages/Cadastro-Produtos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cadastro-usuario" element={<Cadastro />} />
          <Route exact path="/cadastro-cliente" element={<NovoCliente />} />
          <Route exact path="/cadastro-produtos" element={<CadastroProdutos />} />
          <Route exact children={<VendaProduto />} path="/vendas" element={<Vendas />}>
            <Route exact path="venda-produto" element={<VendaProduto />} />
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
