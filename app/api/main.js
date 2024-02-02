const produtos = [
  { 
    descricao: 'Nintendo Wii', 
    codigo_barras: '123456789', 
    quantidade_estoque: 10, 
    tipo_preco: 'Varejo', 
    imagem: '',
    preco: 399.99,
  },
  { 
    descricao: 'Bolsa', 
    codigo_barras: '987654321', 
    quantidade_estoque: 15, 
    tipo_preco: 'Atacado', 
    imagem: '',
    preco: 29.99, 
  },
  { 
    descricao: 'Mouse Logitech', 
    codigo_barras: '987654221', 
    quantidade_estoque: 20, 
    tipo_preco: 'Atacado', 
    imagem: '',
    preco: 49.99, 
  },
  { 
    descricao: 'Headset', 
    codigo_barras: '987654244', 
    quantidade_estoque: 20, 
    tipo_preco: 'Atacado', 
    imagem: '',
    preco: 89.99, 
  },
];

// Exibir os produtos
function displayProducts(products) {
  console.log(products);
  const productListElement = $('#productList');
  productListElement.empty();

  products.forEach(product => {
    const productCard = `
      <div class="col-md-3 product-card" data-codigo="${product.codigo_barras}">
        <div class="card text-center mb-3" style="width: 18rem;">
          <img src="${product.imagem}" class="card-img-top" alt="${product.descricao}">
          <div class="card-body">
            <h5 class="card-title">${product.descricao}</h5>
            <p class="card-text">Código de Barras: ${product.codigo_barras}</p>
            <p class="card-text">Quantidade em Estoque: ${product.quantidade_estoque}</p>
            <p class="card-text">Preço: ${product.tipo_preco}</p>

            <label for="quantidadeSelect${product.codigo_barras}">Quantidade:</label>
            <select id="quantidadeSelect${product.codigo_barras}" class="form-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>

            </select>
            <button type="button" class="btn btn-primary mt-2" id="adicionarAoCheckoutBtn${product.codigo_barras}">
              Adicionar ao Checkout
            </button>
          </div>
        </div>
      </div>
    `;

    productListElement.append(productCard);
  });
}

/////////////////////////////////////////////////////

// Array carrinho
const checkoutItens = [];

function adicionarAoCheckout(codigoBarras, quantidadeSelecionada) {
  
  const produtoSelecionado = produtos.find(product => product.codigo_barras === codigoBarras);

  if (!produtoSelecionado) {
    console.error(`Produto com código de barras ${codigoBarras} não encontrado.`);
    return;
  }

  // Verificar item
  const itemExistente = checkoutItens.find(item => item.codigo_barras === codigoBarras);

  if (itemExistente) {
    itemExistente.quantidade += quantidadeSelecionada;
  } else {
    // if (quantidadeSelecionada > produtoSelecionado.quantidade_estoque) {
      
    // }
    checkoutItens.push({
      codigo_barras: codigoBarras,
      descricao: produtoSelecionado.descricao,
      quantidade: quantidadeSelecionada,
      preco: produtoSelecionado.preco, 
    });
  }

  console.log(`Produto ${codigoBarras} adicionado ao checkout com quantidade ${quantidadeSelecionada}`);
}
function exibirCheckout() {
  const checkoutItemsElement = $('#checkoutItems');
  const totalValueElement = $('#totalValue');
  let totalValue = 0;

  checkoutItemsElement.empty();

  checkoutItens.forEach(item => {
    const itemHTML = `
      <tr>
        <td>${item.descricao}</td>
        <td>${item.quantidade}</td>
        <td>${item.preco.toFixed(2)}</td>
        <td>${item.codigo_barras}</td>
      </tr>
    `;

    checkoutItemsElement.append(itemHTML);

    totalValue += item.quantidade * item.preco;
  });

  totalValueElement.text(`Valor Total: R$ ${totalValue.toFixed(2)}`);
}

document.addEventListener('DOMContentLoaded', function () {
  produtos.forEach(product => {
    const addButton = document.getElementById(`adicionarAoCheckoutBtn${product.codigo_barras}`);
    addButton.addEventListener('click', function () {
      const quantidadeSelect = document.getElementById(`quantidadeSelect${product.codigo_barras}`);
      const quantidadeSelecionada = parseInt(quantidadeSelect.value);
      adicionarAoCheckout(product.codigo_barras, quantidadeSelecionada);
      exibirCheckout();
    });
  });
});

/////////////////////////////////////////////

// Exibir os produtos
displayProducts(produtos);

// Botão de pesquisa
$('#searchButton').on('click', function() {
  const searchTerm = $('#searchInput').val();
  searchProducts(searchTerm, produtos);
});
