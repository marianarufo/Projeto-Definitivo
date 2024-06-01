# Projeto Definitivo

Bem vindo(a)! Este é meu projeto para o __Processo Seletivo da Comp Júnior__.


> #### Este projeto foi criado buscando solucionar um certo objetivo fictício: um maior alcance dos pequenos empreendedores da arte manual. Sendo assim, o projeto comporta um sistema de cadastro de usuário no qual é possível realizar publicações de trabalhos artesarnais para que outras pessoas possam acessá-lo e conhecer o trabalho umas das outras ou até mesmo apenas para procurar serviços.




 + ### O projeto consta com duas entidades que se relacionam:
    __`Usuário`__ que possui várias __`publicações`__.

+ ### Banco de dados relacional: __`MySQL`__
Pelo fato de que eu não possuia conhecimento algum no setor de _back-end_, o uso do __MySQL__ acabou sendo mais vantajoso, pois o curso de _back-end_ que foi disponibilizado me proporcionou uma base muito boa dos conhecimentos de `Node.js` e `JavaScript` em torno deste banco de dados e tornou possivel que meu proceso de entendimento fosse mais tranquilo. Caso eu escolhesse uma outra opção de banco de dados, eu acredito que meu processo de aprendizagem seria mais complexo e demorado.O __MySQL__ é um dos bancos de dados mais populares e seguros, além de que é possivel manipular dados altamente estruturados. Agora que tenho a base do __MySQL__, estou pronta para navegar por outros bancos de dados e acredito que será muito mais simples aprender mais sobre as outras possibilidades de armazenamento de dados disponíveis.

+ ### CRUD:
> ##### Foi utilizado o relacionamento do tipo __One-to-Many__, na qual um usuário pode ter vários posts.

   + #### Usuário: 
 - [x] create user 
 - [x] update user 
 - [x] delete user 
 - [x] list user

 + #### Posts:
 - [x] create post 
 - [x] update post 
 - [x] delete post 
 - [x] list posts

## :hammer_and_wrench: How to run the project

To run this application you need to have **Git**.

### 1 - Clone the repository
```sh
git clone git@github.com:marianarufo/projeto-final.git
```

### 2 - Enter the project folder
```sh
cd projetofinal
```

### 3 - Run the libraries installations by running the commands below in the application root folder.
```sh
npm install
```
```sh
npm install express
```
```sh
npm install sequelize
```
```sh
npm install jest
```
```sh
npm install dotenv
```
```sh
npm install jsonwebtoken
```
```sh
npm install bcryptjs
```
```sh
npm install jsonschema
```
```sh
npm install multer
```
```sh
npm install nodemailer
nodemailer-express-hendlebars
```
```sh
npm install mysql2
```
```sh
npm install uuid
```

### 4- Running the application:
```sh
npm start
```
<br />
</details>


+ ### Para testar as rotas, foi utilizada a feramenta __`Postman`__ e __`Jest`__.


+ ### Libraries:
  - __`express`__: gerenciar e adicionar processos de requisições;
  - __`sequelize`__: permite criar classes que representam as tabelas do seu banco de dados, permitindo que os dados sejam manipulados a partir de objetos e métodos;
  - __`sequelize-cli`__: inclui funcionalidades relacionadas às migrations.
  - __`jest`__: framework de teste que permite garantir que a correção de códigos;
  - __`nodemon`__: monitora as modificações nos arquivos e reinicia automaticamente o servidor Node.js;
  - __`dotenv`__: configuração de variáveis;
  - __`jsonwebtoken`__: transmitir ou armazenar objetos JSON entre diferentes aplicações;
  - __`bcryptjs`__: criptografia de senhas;
  - __`jsonschema`__: possibilita uma estruturação clara e precisa sobre os formatos esperados e retornados pela API;
  - __`multer`__: upload de arquivos;
  - __`node mailer`__/nodemailer-express-handlebars envio de emails;
  - __`mysql2`__:conectar e mandar comandos SQL para o banco de dados;
  - __`uuid`__: gerar token;



