## Youtube Express API

Projeto com finalidade de estudos sobre a api do google / youtube.
Objetivo dele é que o usuário consiga realizar upload de video apenas
realizando o upload pela aplicação, após ele selecionar o arquivo, o
código em backend vai realizar o envio para youtube e todas as configurações
necessárias, possibilitando até mesmo um agendamento de envio ou envio automático
sem precisar de nenhum interação com a interface do youtube.

### Tecnologias Utilizadas

- Express
- TypeScript
- EJS

### Instalação

1. Clone o repositório.
2. Instale as dependências com o comando `npm install`.

### Configuração

1. Crie um projeto no [Console de Desenvolvedores do Google](https://console.developers.google.com/).
2. Ative a API do YouTube e obtenha as credenciais de acesso.
3. Copie as credenciais para o arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`.

### Como Usar

1. Execute o comando `npm start` para iniciar o servidor.
2. Acesse `http://localhost:3000` em seu navegador.
3. Siga as instruções para fazer o upload de um vídeo para o YouTube.

### Screenshots

Aqui estão algumas capturas de tela do projeto em funcionamento:

![Imagem 1](https://i.ibb.co/XDvgbzd/image.png)

1- Faça a autenticação

![Imagem 2](https://i.ibb.co/pb95fmm/image.png)

2- Escolha o video

![Imagem 3](https://i.ibb.co/KrygFZq/image.png)

3- Suba o video
