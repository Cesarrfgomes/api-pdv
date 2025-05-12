import { Request, Response, NextFunction } from "express";
import { knex } from "../database/conexao";

export const produtoPorCodProd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { CODPROD } = req.params || req.query;
  try {
    const produto = await knex("TABPRODUTO").where({ CODPROD }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto nao encontrado." });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
