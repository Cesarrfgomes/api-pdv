import { Request, Response} from 'express'
import {knex} from '../database/conexao'

export const cadastrarCliente = async (req: Request, res: Response): Promise<any> => {
    const {CODVENDEDOR, NOME, EMAIL, CGCENT} = req.body
    try {
        if(!CODVENDEDOR || !NOME || !CGCENT){
            return res.status(400).json({mensagem: "Os campos devem ser preenchidos."})
        }

        const vendedorExiste = await knex('TABVENDEDOR').where({CODVENDEDOR}).first()

        if(!vendedorExiste){
            return res.status(404).json({mensagem: "Vendedor não encontrado."})
        }

        await knex("TABCLIENTE").insert({CODVENDEDOR, NOME, EMAIL, CGCENT})

        return res.status(201).json("Cliente cadastrado com sucesso.")
    } catch (error) {
        console.log(error)
        return res.status(500).json({mesnagem: "Erro interno do servidor."})
    }
}
