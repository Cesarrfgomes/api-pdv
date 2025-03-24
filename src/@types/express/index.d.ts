declare namespace Express {
    export interface Request {
        usuario: {
            CODUSUR: number;
            NOME: string;
            EMAIL: string;
            SENHA: string;
            TIPOFUNC: string;
            CPF: string;
            CODVENDEDOR: number;
        }
    }
}
