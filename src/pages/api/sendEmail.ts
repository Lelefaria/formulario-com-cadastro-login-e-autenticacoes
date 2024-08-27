import type { NextApiRequest, NextApiResponse } from "next";
import emailTemplate from "../emails/emailTemplate";
import nodemailer from "nodemailer";


export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name } = req.body;

    // Configurar o transportador (transporter) com as credenciais do serviço de e-mail
    const transporter = nodemailer.createTransport({
      service: "hotmail", // ou outro serviço de e-mail como 'Outlook', 'Yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar as opções do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Bem-vindo ao nosso site!",
      text: `Obrigado por se cadastrar no nosso site.`,
      html: emailTemplate
        //.replace("[Nome do Usuário]", "Nome do Cliente")
        //.replace("[URL_DO_SEU_SITE]", "https://seusite.com"),
    };

    try {
      // Enviar o e-mail
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar o e-mail." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
