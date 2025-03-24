import { Request, Response} from 'express'
import {knex} from '../database/conexao'


export const listarVendedores = async (req: Request, res: Response): Promise<any>  =>{
    try {
        const listarVendedores = await knex("TABVENDEDOR").orderBy("CODVENDEDOR")

        return res.status(200).json(listarVendedores)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const cadastrarVendedor = async (req: Request, res: Response): Promise<any> => {
    const {nome, email} = req.body
    try {
        if(!nome){
            return res.status(400).json({mensagem: "O nome é obrigatório!"})
        }

        await knex("TABVENDEDOR").insert({NOME: nome, EMAIL: email})

        return res.status(201).json({mensagem: "Vendedor cadastrado com sucesso."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
