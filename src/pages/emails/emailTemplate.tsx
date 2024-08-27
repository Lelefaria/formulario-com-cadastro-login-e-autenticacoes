const emailTemplate = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bem-vindo!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #007bff;
          color: #ffffff;
          padding: 20px 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.5;
          color: #333333;
        }
        .button {
          display: block;
          width: 200px;
          margin: 30px auto;
          padding: 10px;
          text-align: center;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Bem-vindo à LNN STORE!</div>
        <div class="content">
          <p>Olá [Nome do Usuário],</p>
          <p>
            Estamos muito felizes em ter você conosco! Agora você faz parte da nossa comunidade e estamos prontos para te enviar as melhores prmomocoes.
          </p>
          <p>
            Caso tenha qualquer dúvida ou precise de suporte, não hesite em nos contatar.
          </p>
          <p>
            Aproveite todas as vantagens e recursos disponíveis para você. Estamos aqui para ajudar!
          </p>
          <a href="[URL_DO_SEU_SITE]" class="button">Acessar Minha Conta</a>
        </div>
        <div class="footer">
          <p>Atenciosamente,</p>
          <p>Equipe LNN STORE</p>
        </div>
      </div>
    </body>
  </html>
`;

export default emailTemplate;
