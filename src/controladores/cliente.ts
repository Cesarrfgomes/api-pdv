import { Request, Response} from 'express'
import {knex} from '../database/conexao'
import { Cliente } from '../interfaces/clienteInterface'

export const arrayClientes: Cliente[] = []

export const cadastrarCliente = async (req: Request, res: Response): Promise<any> => {
    const { CODCLI,CODVENDEDOR, NOME, EMAIL, CGCENT} = req.body
    try {
        if(!CODVENDEDOR || !NOME || !CGCENT){
            return res.status(400).json({mensagem: "Os campos devem ser preenchidos."})
        }

        const cliente: Cliente = {
            CODCLI,
            NOME,
            CODVENDEDOR,
            EMAIL,
            CGCENT,
            BLOQUEIO: 'N'
        }


        arrayClientes.push(cliente)
        // const vendedorExiste = await knex('TABVENDEDOR').where({CODVENDEDOR}).first()

        // if(!vendedorExiste){
        //     return res.status(404).json({mensagem: "Vendedor não encontrado."})
        // }

        // await knex("TABCLIENTE").insert({CODVENDEDOR, NOME, EMAIL, CGCENT})

        return res.status(201).json("Cliente cadastrado com sucesso.")
    } catch (error) {
        console.log(error)
        return res.status(500).json({mesnagem: "Erro interno do servidor."})
    }
}

export const listarClientes = async (req: Request, res: Response): Promise<any> => {
    try {
        return res.status(200).json(arrayClientes)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}

export const bloquearCliente = async (req: Request, res: Response): Promise<any> => {
    const {CODCLI} = req.params
    try {

        console.log(CODCLI)

        const clienteExiste = arrayClientes.find(cliente => cliente.CODCLI === 1);

        console.log(clienteExiste)

        if (!clienteExiste){
            return res.status(404).json({mensagem: "Cliente nao encontrado."})
        }

        clienteExiste.BLOQUEIO = 'S'

        return res.status(200).json(clienteExiste)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
