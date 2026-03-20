let lista = [];
let contadorID = 0;

atualizarTabela();

function cadastrarVenda() {
  let vendedor = document.getElementById("nome");
  let nome = vendedor.value;
  let valor_input = document.getElementById("valor");
  let valor = valor_input.value;

  if (nome === "" || valor === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  lista.push({ id: contadorID++, nome: nome, valor_venda: valor });

  vendedor.value = "";
  valor_input.value = "";

  console.log(lista);

  atualizarTabela();
}

function deletarVenda(id) {
  let deletando = lista.findIndex((item) => item.id === id);

  if (deletando !== -1) {
    lista.splice(deletando, 1);
    atualizarTabela();
  }
}

function atualizarTabela() {
  let btnLimpar = document.getElementById("btn-limpar");
  let btnRemoverUltimo = document.getElementById("btn-remover-ultimo");
  btnLimpar.style.display = lista.length > 0 ? "block" : "none";
  btnRemoverUltimo.style.display = lista.length > 0 ? "block" : "none";

  if (lista.length === 0) {
    let dados = document.getElementById("dados");
    dados.innerHTML = "<tr><td style=\"text-align:center\" colspan='7'>Nenhuma venda cadastrada</td></tr>";
    return;
  }

  let dados = document.getElementById("dados");
  dados.innerHTML = "";

  lista.forEach((item) => {
    let linha = document.createElement("tr");
    // o botao abaixo peguei e adaptei do site de css muito massa chamado Universe.IO
    linha.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nome}</td>
      <td>R$ ${parseFloat(item.valor_venda).toFixed(2)}</td>
      <td>R$ ${parseFloat(item.valor_venda * 0.1).toFixed(2)}</td>
      <td>R$ ${(item.valor_venda - item.valor_venda * 0.1).toFixed(2)}</td>
      <td>${new Date().toLocaleDateString()}</td>
      <td style="display:flex; justify-content:center;">
        <button class="btn-deletar" onclick="deletarVenda(${item.id})"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
      </td>
    `;
    dados.appendChild(linha);
  });
}

function limparVendas() {
  if (confirm("Tem certeza que deseja limpar a tabela?")) {
    lista = [];
    contadorID = 0;
    atualizarTabela();
  }
}

function removerUltimaVenda() {
  if (lista.length > 0) {
    lista.pop();
    contadorID--;
    atualizarTabela();
  } else {
    alert("Não há vendas para remover.");
  }
}