import { Request, Response} from 'express'
import {knex} from '../database/conexao'
import bcrypt from 'bcrypt'
import { Usuario } from '../interfaces/usuarioInterface'

export  const arrayUsuario: Usuario[] = []

export const cadastrarUsuario = async (req: Request, res: Response): Promise<any> => {
    const {CODUSUR, NOME, EMAIL, USUARIO, SENHA, CPF, TIPOFUNC, CODVENDEDOR} = req.body
    try {

        // const usuarioExist = await knex('TABUSUARIO').where({USUARIO}).first()

        // if(usuarioExist){
        //     return res.status(400).json({mensagem: "Usuario ja cadastrado no sistema"})
        // }

        const senhaCriptografada = await bcrypt.hash(SENHA, 10)

        // await knex("TABUSUARIO").insert({NOME, EMAIL, USUARIO, SENHA: senhaCriptografada, CPF, TIPOFUNC, CODVENDEDOR})
        const usuarios: Usuario = {
            CODUSUR,
            NOME,
            EMAIL,
            USUARIO,
            SENHA: senhaCriptografada,
            CPF,
            TIPOFUNC,
            CODVENDEDOR
        }
        console.log(usuarios)

        arrayUsuario.push(usuarios)

        return res.status(201).json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: "Erro interno do servidor."})
    }
}
