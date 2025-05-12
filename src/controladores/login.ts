import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { knex } from "../database/conexao";
import bcrypt from "bcrypt";

const senhaJwt = process.env.SENHA_JWT as string;

export const login = async (req: Request, res: Response): Promise<any> => {
  const { USUARIO, SENHA } = req.body;
  try {
    const usuarioExist = await knex("TABUSUARIO").where({ USUARIO }).first();

    const senhaCorreta = await bcrypt.compare(SENHA, usuarioExist.SENHA);

    if (!usuarioExist || !senhaCorreta) {
      res.status(400).json({ mensagem: "As credenciais não coincidem." });
    }

    const token = jwt.sign({ id: usuarioExist.CODUSUR }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuario } = usuarioExist;

    return res.status(200).json({ token, usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
