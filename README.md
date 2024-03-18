# Store Manager :briefcase:

![image](https://github.com/henriqueAvner/store_manager/assets/133919307/707dfd14-f59d-439c-a388-ee17cc97bd0e)
![image](https://github.com/henriqueAvner/store_manager/assets/133919307/849c67b3-7cb7-4535-a01f-e37ddd4d58a9)





## Sobre o projeto:
 
<details>
<summary>🧑‍💻 O que foi desenvolvido </summary>

- O objetivo do projeto foi criar uma API RESTful utilizando a arquitetura em camadas para melhor organização.

- A API construída se trata de um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas, utilizando o banco de dados MySQL para a gestão de dados.

- Também foram desenvolvidos testes para garantir as funcionalidade das implementações.

</details>
  
<details>
  <summary>📝 Habilidades desenvolvidas </summary>

Neste projeto, foram tratadas habilidades como:

- Interação com um banco de dados relacional MySQL;
- Implementação de uma API utilizando arquitetura em camadas;
- Criação de validações para os dados recebidos pela API;
- Escrita de testes para APIs para garantir a implementação dos endpoints;

</details>


## Orientações

> ⚠️ Aviso: Não é necessário entrar no container para rodar os testes e nem para iniciar a aplicação.
>
> - O container `backend` inicia a aplicação automaticamente.
>
> - Os testes do avaliador são executados fora do container. Caso não sejam definidas variáveis de ambiente, os testes irão assumir valores como os em [`env.example`](./env.example).
>
> - ⚠️ É necessário ter a versão Node 16.14 ou superior instalada localmente.
>
> ⚠️ Aviso 2: Todos os testes do avaliador dependem que a aplicação esteja sempre rodando na porta 3001. Se por algum motivo a aplicação falhar, alguns testes podem ser impactados.

<details>
<summary>🐳 Iniciando a aplicação no Docker Compose</summary>

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```

</details>

<details>
<summary>🖥️ Iniciando a aplicação localmente</summary>

> ⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# Instale as dependências
npm install

# Inicie apenas o serviço `db` no compose
docker-compose up -d db

# Inicie a aplicação em modo de desenvolvimento
npm run dev:local
```

</details>

<details>
<summary>🛠 Rodando testes</summary>

- Antes de rodar os testes do avaliador, garanta que a aplicação esteja executando;

Segue um resumo dos comandos relacionados aos testes:

> ⚠️ Atenção ⚠️
>
> - Os testes do avaliador são executados fora do container na raiz do projeto.
```bash
#### Comandos dos testes do avaliador
npm run lint     # roda a verificação do linter
npm test         # roda todos os testes no terminal ou
REQ=01 npm test  # rodando apenas o teste do requisito 01 pelo terminal ou
npm run cy:open  # abre a interface gráfica do Cypress para rodar os testes

#### Comandos dos testes com mocha
npm run test:mocha     # roda os testes do mocha
npm run test:coverage  # roda os testes e mostra a cobertura geral
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```

</details>

## Rotas:

| Rota                                        | Tipo de Requisição  | Descrição da Requisição                          |
|---------------------------------------------|---------------------|--------------------------------------------------|
| /products                                   | GET                 | Listar todos os produtos                         |
| /products/:id                               | GET                 | Listar produto por id                            |
| /sales                                      | GET                 | Listar todas as vendas                           |
| /sales/:id                                  | GET                 | Listar venda por id                              |
| /products                                   | POST                | Cadastrar produtos                               |
| /sales                                      | POST                | Cadastrar vendas                                 |
| /products/:id                               | PUT                 | Atualizar um produto                             |
| /products/:id                               | DELETE              | Deletar um produto                               |
| /sales/:id                                  | DELETE              | Deletar uma venda                                |
| /sales/:saleId/products/:productId/quantity | PUT                 | Atualizar a quantidade de um produto em uma venda|
| /products/search?q=productName              | GET                 | Pesquisar produto pelo nome                      |
