import { Request, Response} from 'express'
import {knex} from '../database/conexao'
import { Produto } from '../interfaces/produtoInterface'

export const cadastrarProduto = async (req: Request, res: Response): Promise<any> => {
    const {CODPROD, CODBARRAS, DESCRICAO} = req.body
    try {

        return res.status(201).json({mensagem: "Produto criado com sucesso."})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const listarProduto = async(req: Request, res: Response): Promise<any> =>{
    try {
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
