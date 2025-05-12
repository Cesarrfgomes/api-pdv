import { Request, Response } from "express";
import { knex } from "../database/conexao";
import { Pedido, PedidoItens } from "../interfaces/pedidoInterface";
import { juntarPedidos } from "../utilidades/juntarPedidos";

export const digitarPedido = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { codcli, numped, codvendedor, vltotal, produtos, codcob, codplpag } =
    req.body;
  const { CODUSUR } = req.usuario;
  try {
    const proxnumped = await knex("TABVENDEDOR")
      .where({ CODVENDEDOR: codvendedor })
      .select("PROXIMONUMPED")
      .first();

    const pedidosJuntos: any = juntarPedidos(produtos);
    let valorTotal: number = 0;

    const novoPedido: Pedido = {
      NUMPED: numped,
      CODCLI: codcli,
      CODCOB: codcob,
      CODVENDEDOR: codvendedor,
      CODPLPAG: codplpag,
      CODEMITENTE: CODUSUR,
      NUMITENS: 0,
      VLTOTAL: valorTotal,
      PRODUTOS: [],
    };

    for (let produto of pedidosJuntos) {
      const produtoExiste = await knex("TABPRODUTO")
        .where({
          CODPROD: produto.CODPROD,
        })
        .first();

      const estoqueProduto = await knex("TABEST")
        .where({ CODPROD: produto.CODPROD })
        .first();

      if (!produtoExiste) {
        return res.status(404).json({ mensagem: "Produto nao encontrado" });
      }

      if (estoqueProduto.QT < produto.QT_ITENS) {
        return res.status(400).json({ mesangem: "Estoque indisponivel" });
      }

      valorTotal += produtoExiste.PUNITARIO * produto.QT_ITEM;
    }

    return res.status(201).json();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

export const listarPedidos = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
