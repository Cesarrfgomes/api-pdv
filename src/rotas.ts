import { Router } from "express";
import {
  cadastrarVendedor,
  listarVendedores,
} from "./controladores/vendedores";
import { cadastrarUsuario, listarUsuarios } from "./controladores/usuarios";
import { login } from "./controladores/login";
import { validarToken } from "./middlewares/validarToken";
import {
  bloquearCliente,
  cadastrarCliente,
  editarCliente,
  listarClientes,
} from "./controladores/cliente";
import { digitarPedido, listarPedidos } from "./controladores/pedido";
import {
  cadastrarProduto,
  editarProduto,
  listarProduto,
} from "./controladores/produto";
import { clientePorCodCLi } from "./middlewares/validacoesCliente";
import { produtoPorCodProd } from "./middlewares/validacoesProdutos";

const rotas = Router();

rotas.post("/login", login);

rotas.use(validarToken);

rotas.post("/usuario", cadastrarUsuario);
rotas.get("/usuario", listarUsuarios);

rotas.post("/cliente", cadastrarCliente);
rotas.get("/cliente", listarClientes);
rotas.put("/cliente/:codcli", clientePorCodCLi, editarCliente);
rotas.patch("/cliente/:codcli", clientePorCodCLi, bloquearCliente);

rotas.post("/pedido", digitarPedido);
rotas.get("/pedido", listarPedidos);

rotas.get("/vendedor", listarVendedores);
rotas.post("/vendedor", cadastrarVendedor);

rotas.post("/produto", cadastrarProduto);
rotas.get("/produto", listarProduto);
rotas.put("/produto/:CODPROD", produtoPorCodProd, editarProduto);

export default rotas;
