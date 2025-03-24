import { Request, Response} from 'express'
import {knex} from '../database/conexao'
import { Pedido } from '../interfaces/pedidoInterface'

const arrayPedidos: Pedido[] = []

export const digitarPedido = async (req: Request, res: Response): Promise<any> => {
    const {CODCLI, NUMPED, CODVENDEDOR, VLTOTAL} = req.body
    try {

        const novoPedido: Pedido = {
            NUMPED,
            CODCLI,
            VLTOTAL,
            CODVENDEDOR
        }

        arrayPedidos.push(novoPedido)

        return res.status(201).json({mensagem: "Pedido de venda digitado com sucesso"})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarPedidos = async (req: Request, res: Response): Promise<any> => {
    try {
        return res.status(200).json(arrayPedidos)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
