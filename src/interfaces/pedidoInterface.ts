export interface Pedido {
  NUMPED: number;
  CODCLI: number;
  VLTOTAL: number;
  POSICAO?: string;
  CODVENDEDOR: number;
  CODCOB: number;
  CODPLPAG: number;
  CODEMITENTE: number;
  NUMITENS: number;
  PRODUTOS?: [];
}

export interface PedidoItens {
  NUMPED: number;
  CODPROD: number;
  CODCLI: number;
  PVENDA: number;
  TIPOENTREGA: string;
  QT_ITEM: number;
  NUMCAR: number;
}
