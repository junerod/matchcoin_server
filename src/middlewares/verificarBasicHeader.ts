import { Request, Response, NextFunction } from "express";

export function verificarBasicHeader(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(400).json({ message: "Header Authorization não encontrado" });
    }

    // O formato esperado é: Authorization: Basic <base64_string>
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Basic") {
        return res.status(400).json({ message: "Formato do header inválido" });
    }

    try {
        // Decodificar Base64
        const decoded = Buffer.from(parts[1], "base64").toString("utf-8");

        // Esperamos que os dados venham no formato "chave1:chave2"
        const [chave1, chave2] = decoded.split(":");

        if (!chave1 || !chave2) {
            return res.status(400).json({ message: "As chaves não foram fornecidas corretamente" });
        }

        // 🔥 Verificação das chaves (simulação)
        const chaveValida1 = process.env.CLIENTID || "minhaChave1";
        const chaveValida2 = process.env.CLIENTSECRET || "minhaChave2";

        if (chave1 !== chaveValida1 || chave2 !== chaveValida2) {
            return res.status(403).json({ message: "Chaves inválidas" });
        }

        // Adiciona as chaves ao request para uso posterior
        //req.user =  chave1;
        
        next(); // Permite que a requisição continue
    } catch (error) {
        return res.status(400).json({ message: "Erro ao decodificar Base64" });
    }
}