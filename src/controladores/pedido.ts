import { Request, Response} from 'express'
import {knex} from '../database/conexao'
import { Pedido } from '../interfaces/pedidoInterface'

export const digitarPedido = async (req: Request, res: Response): Promise<any> => {
    const {CODCLI, NUMPED, CODVENDEDOR, VLTOTAL} = req.body
    try {

        return res.status(201).json({mensagem: "Pedido de venda digitado com sucesso"})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarPedidos = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
