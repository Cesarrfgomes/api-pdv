import { Request, Response } from "express";
import { knex } from "../database/conexao";
import { Cliente } from "../interfaces/clienteInterface";

export const cadastrarCliente = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODVENDEDOR, NOME, EMAIL, CGCENT } = req.body;
  try {
    if (!CODVENDEDOR || !NOME || !CGCENT) {
      return res
        .status(400)
        .json({ mensagem: "Os campos devem ser preenchidos." });
    }

    const vendedorExiste = await knex("TABVENDEDOR")
      .where({ CODVENDEDOR })
      .first();

    if (!vendedorExiste) {
      return res.status(404).json({ mensagem: "Vendedor não encontrado." });
    }

    await knex("TABCLIENTE").insert({ CODVENDEDOR, NOME, EMAIL, CGCENT });

    return res.status(201).json("Cliente cadastrado com sucesso.");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mesnagem: "Erro interno do servidor." });
  }
};

export const listarClientes = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODCLI } = req.query;
  try {
    if (CODCLI) {
      const clienteExiste = await knex("TABCLIENTE").where({ CODCLI }).first();

      if (!clienteExiste) {
        return res.status(404).json({ mesnagem: "Cliente nao encontrado." });
      }

      return res.status(200).json(clienteExiste);
    } else {
      const clientes = await knex("TABCLIENTE");

      return res.status(200).json(clientes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const clientePorCgcent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { cgcent } = req.params;
  try {
    const cliente = await knex("TABCLIENTE").where({ CGCENT: cgcent }).first();

    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente nao encontrado" });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const editarCliente = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODVENDEDOR, NOME, EMAIL, CGCENT } = req.body;
  const { CODCLI } = req.params;
  const { CODUSUR } = req.usuario;
  try {
    await knex("TABCLIENTE")
      .update({ CODVENDEDOR, NOME, EMAIL, CGCENT, CODFUNCULTALT: CODUSUR })
      .where({ CODCLI });

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const bloquearCliente = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { codcli } = req.params;
  try {
    const cliente: Cliente = await knex("TABCLIENTE")
      .where({ CODCLI: codcli })
      .first();

    if (cliente.BLOQUEIO === "S") {
      await knex("TABCLIENTE")
        .update({ BLOQUEIO: "N" })
        .where({ CODCLI: codcli });

      return res.status(204).json();
    } else if (cliente) {
      await knex("TABCLIENTE")
        .update({ BLOQUEIO: "S" })
        .where({ CODCLI: codcli });

      return res.status(204).json();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
