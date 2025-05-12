import { Request, Response, NextFunction } from "express";
import { knex } from "../database/conexao";
import { Cliente } from "../interfaces/clienteInterface";

export const clientePorCodCLi = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { codcli } = req.params;
  try {
    const clienteExiste = await knex("TABCLIENTE")
      .where({ CODCLI: codcli })
      .first();

    if (!clienteExiste) {
      return res.status(404).json({ mensagem: "Cliente não encontado" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const validarClienteBloqueado = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { codcli } = req.body;
  try {
    const clienteBloqueado: Cliente = await knex("TABCLIENTE")
      .where({ CODCLI: codcli, BLOQUEIO: "S" })
      .first();

    if (clienteBloqueado) {
      return res.status(400).json({ mensagem: "Cliente bloqueado" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
