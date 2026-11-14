# Digital Store

Projeto educacional de front-end de uma loja virtual, desenvolvido com React para o curso da Digital College.

## Autoria

MARIANA VITÓRIA BERNARDINO NICOLAU

## Tecnologias

- React
- JavaScript
- Vite
- React Router
- CSS
- ESLint

## Como executar

É necessário ter Node.js e npm instalados.

Após baixar ou clonar este repositório, abra um terminal na pasta do projeto e execute:

```bash
npm install
npm run dev
```

Abra o endereço informado pelo terminal.

No PowerShell do Windows, se a execução de `npm` for bloqueada, use `npm.cmd` no lugar de `npm`.

## Verificações

```bash
npm run lint
npm run build
```

O comando de build gera a versão de produção na pasta `dist`.

Para visualizar essa versão localmente:

```bash
npm run preview
```

## Funcionalidades

- Página inicial com carrossel, coleções e oito produtos em alta.
- Listagem de produtos.
- Busca por nome, com suporte a termos sem acentos.
- Ordenação por menor e maior preço.
- Filtro por faixa de preço.
- Página de detalhes com galeria e miniaturas.
- Seleção visual de tamanho e cor.
- Exibição de preços, descontos e avaliações demonstrativas.
- Produtos relacionados.
- Layout adaptado para diferentes larguras de tela.
- Tratamento de produtos e páginas não encontrados.

## Rotas principais

- `/`: página inicial.
- `/products`: listagem de produtos.
- `/produtos`: endereço alternativo da listagem.
- `/products?filter=corrida`: exemplo de busca.
- `/product/1`: exemplo de detalhes de um produto.

## Organização

- `src/assets`: logomarcas e ícones.
- `src/components`: componentes reutilizáveis.
- `src/data`: dados locais dos produtos.
- `src/pages`: páginas e layout compartilhado.
- `public`: imagens públicas.

## Limitações

Os dados são locais e demonstrativos, sem integração com API.

Login, cadastro, categorias e pedidos possuem telas informativas.
Não há autenticação, carrinho funcional, pagamento ou registro de compras.
O botão Comprar é apenas visual.

As avaliações são fictícias. As imagens da galeria de detalhes são compartilhadas entre os produtos.

## Referências

- Documentação e materiais: https://github.com/digitalcollegebr/projeto-digital-store
- Figma: https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30