# Digital Store

Projeto final de Front-end desenvolvido por **Mariana Vitória Bernardino Nicolau**, utilizando React e Vite, com base na documentação do Digital Store e no design disponibilizado no Figma.

## Tecnologias

- React
- React Router
- JavaScript
- CSS
- Vite
- ESLint

## Funcionalidades

### Catálogo

- Página inicial com carrossel, coleções e produtos em destaque.
- Listagem com busca, filtros e ordenação.
- Página de detalhes com galeria de imagens.
- Seleção de tamanho e cor.
- Nome da cor exibido ao passar o mouse sobre a opção.
- Produtos relacionados.

### Cadastro e perfil

- Cadastro com informações pessoais, endereço e senha.
- Login demonstrativo com validação de credenciais.
- Nome do usuário atualizado no cabeçalho após o login.
- Edição dos dados do perfil.
- Consulta dos pedidos vinculados ao e-mail da sessão.
- Logout.

### Compra demonstrativa

- Carrinho com quantidade, tamanho e cor dos produtos.
- Prévia do carrinho no cabeçalho.
- Remoção de itens e opção de esvaziar o carrinho.
- Cupom `DRIP10`, que aplica 10% de desconto.
- Simulação de frete gratuito mediante preenchimento do CEP.
- Checkout com dados pessoais, entrega e pagamento.
- Simulação de pagamento por cartão ou boleto.
- Confirmação da compra e impressão do comprovante.

### Interface

- Layout adaptado para desktop e dispositivos móveis.
- Menu lateral e busca no cabeçalho mobile.
- Formulários com validação de campos obrigatórios.

## Como executar

É necessário ter Node.js e npm instalados.

Clone o repositório:

```bash
git clone https://github.com/marianab-jpg/digital-store.git
cd digital-store
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço informado no terminal.

No PowerShell, caso a execução de `npm.ps1` esteja bloqueada, utilize `npm.cmd` no lugar de `npm`.

## Verificação

Gerar a versão de produção:

```bash
npm run build
```

Verificar o código com ESLint:

```bash
npm run lint
```

Visualizar a versão de produção localmente:

```bash
npm run preview
```

## Como testar o fluxo de compra

1. Crie uma conta com dados fictícios.
2. Entre com o e-mail e a senha cadastrados.
3. Abra um produto e selecione tamanho e cor.
4. Clique em comprar para adicioná-lo ao carrinho.
5. Confira os itens e avance para o checkout.
6. Preencha os campos com dados fictícios.
7. Selecione boleto para testar sem preencher dados de cartão.
8. Finalize a simulação e consulte o comprovante.
9. Acesse Meus Pedidos para visualizar a compra.

## Limitações da demonstração

Este é um projeto educacional de Front-end.

- Não utiliza backend nem API de autenticação.
- Os dados ficam no navegador e podem ser perdidos ao limpar o armazenamento.
- A sessão de login utiliza o armazenamento da aba.
- A senha é transformada em um hash no navegador com PBKDF2. Isso não substitui uma autenticação segura com servidor.
- Não há cobrança, emissão real de boleto ou consulta real de frete.
- O número completo do cartão e o CVV não são salvos no pedido.
- O catálogo utiliza dados locais e imagens ilustrativas.
- A escolha de cor não altera a fotografia do produto.
- As categorias sem produtos cadastrados podem retornar uma listagem vazia.

Utilize apenas dados fictícios nos formulários.

## Referências e créditos

- [Documentação do projeto](https://github.com/digitalcollegebr/projeto-digital-store)
- [Design de referência no Figma](https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30&p=f)
- [Documentação do React](https://react.dev/)
- [Repositório de referência para imagens dos produtos e banners](https://github.com/ajuteixeira/client-drip-store)

As imagens e marcas são utilizadas como referência visual neste projeto educacional.