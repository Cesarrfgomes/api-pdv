import { PedidoItens } from "../interfaces/pedidoInterface";

export const juntarPedidos = (pedidos: PedidoItens[]) => {
  const novoArray: any = {};

  for (let pedido of pedidos) {
    if (novoArray[pedido.CODPROD]) {
      novoArray[pedido.CODPROD].quantidade_produto += pedido.QT_ITEM;
    } else {
      novoArray[pedido.CODPROD] = pedido;
    }
  }

  return Object.values(novoArray);
};
