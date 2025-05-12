import { Request, Response } from "express";
import { knex } from "../database/conexao";
import { Produto } from "../interfaces/produtoInterface";

export const cadastrarProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODBARRAS, DESCRICAO, NCM } = req.body;
  const { CODUSUR } = req.usuario;
  try {
    if (!CODBARRAS || !DESCRICAO || !NCM) {
      return res.status(404).json({ mensagem: "Os campos sao obrigatorios" });
    }

    await knex("TABPRODUTO").insert({
      CODBARRAS,
      DESCRICAO,
      NCM,
      CODFUNCCADASTRO: CODUSUR,
    });

    return res.status(201).json({ mensagem: "Produto criado com sucesso." });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const listarProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODPROD } = req.query;
  try {
    let produto;

    if (!CODPROD) {
      produto = await knex("TABPRODUTO");
    } else {
      produto = await knex("TABPRODUTO").where({ CODPROD }).first();

      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
      }
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const editarProduto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { CODBARRAS, DESCRICAO, NCM } = req.body;
  const { CODPROD } = req.params;
  const { CODUSUR } = req.usuario;
  try {
    if (!CODBARRAS || !DESCRICAO || !NCM) {
      return res.status(404).json({ mensagem: "Os campos sao obrigatorios" });
    }

    await knex("TABPRODUTO")
      .update({
        CODBARRAS,
        DESCRICAO,
        NCM,
        CODFUNCULTALT: CODUSUR,
      })
      .where({ CODPROD });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
