import {Router} from 'express'
import { cadastrarVendedor, listarVendedores } from './controladores/vendedores'
import { cadastrarUsuario } from './controladores/usuarios'
import { login } from './controladores/login'
import { validarToken } from './middlewares/validarToken'
import { cadastrarCliente } from './controladores/cliente'

const rotas = Router()

rotas.post('/usuario', cadastrarUsuario)

rotas.post('/login', login)

rotas.use(validarToken)

rotas.post('/cliente', cadastrarCliente)

rotas.post('/pedido')

rotas.get('/vendedor', listarVendedores)
rotas.post('/vendedor', cadastrarVendedor)

export default rotas
