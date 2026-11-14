# Digital Store

Projeto educacional de front-end de uma loja virtual.

## Autoria

Mariana Vitória Bernardino Nicolau

## Tecnologias

- React
- JavaScript
- Vite
- React Router
- CSS
- ESLint

## Como executar

É necessário ter Node.js e npm instalados.

Abra um terminal na pasta do projeto e execute:

```bash
npm install
npm run dev
```

Acesse o endereço informado pelo terminal.

No PowerShell, caso a execução de `npm` seja bloqueada, utilize `npm.cmd`.

## Verificações

```bash
npm run lint
npm run build
```

O build gera a versão de produção na pasta `dist`.

Para visualizar essa versão localmente:

```bash
npm run preview
```

## Funcionalidades

- Home com banner em carrossel, coleções, categorias e oferta especial.
- Oito produtos em alta.
- Listagem com busca por nome, ordenação e filtro por preço.
- Busca com suporte a termos sem acentos.
- Detalhes do produto com galeria e miniaturas.
- Seleção visual de tamanho e cor.
- Preços, descontos e avaliações demonstrativas.
- Produtos relacionados.
- Layout adaptado para diferentes tamanhos de tela.
- Tratamento de produtos e páginas não encontrados.

## Rotas principais

- `/`: Home.
- `/products`: listagem.
- `/produtos`: endereço alternativo da listagem.
- `/products?filter=corrida`: exemplo de busca.
- `/product/1`: exemplo de detalhes.

## Organização

- `src/assets`: logomarcas e ícones.
- `src/components`: componentes reutilizáveis.
- `src/data`: dados locais dos produtos.
- `src/pages`: páginas e layout.
- `public`: imagens públicas.

## Limitações

Os dados são locais e demonstrativos, sem integração com API.

Login, cadastro, categorias e pedidos possuem telas informativas.
Não há autenticação, carrinho funcional, pagamento ou registro de compras.
O botão Comprar é apenas visual.

As avaliações são fictícias. As imagens da galeria de detalhes são compartilhadas entre os produtos.

Os links das categorias realizam buscas. O catálogo atual contém apenas tênis.

## Referências

Documentação e materiais:
https://github.com/digitalcollegebr/projeto-digital-store

Design no Figma:
https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30

Imagens complementares:
https://github.com/ajuteixeira/client-drip-store

Arquivos de origem das imagens complementares:
`hero-product.png`, `product.png` e `shoesBanner.svg`.
A imagem de detalhes foi extraída do PNG incorporado ao arquivo
`tenis_produto.svg`, do repositório de imagens complementares.
Ela é compartilhada entre os produtos para demonstrar o layout.