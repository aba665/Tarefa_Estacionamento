var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//Função para salvar os dados no localStorage
function saveRegister(veiculo) {
    localStorage.setItem("Patio", JSON.stringify(__spreadArray(__spreadArray([], readData(), true), [{ nome: veiculo.nome, placa: veiculo.placa, data: veiculo.data }], false)));
}
//Função para retornar os dados do localStorage
function readData() {
    return localStorage.Patio ? JSON.parse(localStorage.Patio) : [];
}
//Função para adição de um veículo no estacionamento 
function newRegister() {
    var nomeCarro = document.getElementById('nomeCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    if (!nomeCarro || !placaCarro) {
        alert("Os campos nome e placa necessitam serem passados!");
    }
    else if (placaCarro.length > 6) {
        alert("O número da placa não pode passar de 6 dígitos!");
    }
    else {
        var caixaConteudo = document.getElementById('boxContent');
        var time = new Date();
        caixaConteudo.innerHTML += "\n            <tr id=".concat(placaCarro, ">\n                <td>").concat(nomeCarro, "</td>\n                <td>").concat(placaCarro, "</td>\n                <td>").concat(time, "</td>\n                <td><button class=\"btnDelete\" onclick=\"deleteItem(").concat(placaCarro, ")\">X</button></td>\n            </tr>\n            ");
        saveRegister({ nome: nomeCarro, placa: placaCarro, data: time });
        document.getElementById('nomeCarro').value = '';
        document.getElementById('placaCarro').value = '';
    }
}
//Função de carregamento e criação de dados no localStorage toda vez que a página for aberta ou recarregada
function reloadData() {
    var allItems = readData();
    var caixaConteudo = document.getElementById('boxContent');
    allItems.forEach(function (item) {
        caixaConteudo.innerHTML += "\n            <tr id=".concat(item.placa, ">\n                <td>").concat(item.nome, "</td>\n                <td>").concat(item.placa, "</td>\n                <td>").concat(item.data, "</td>\n                <td><button id=").concat(item.placa, " class=\"btnDelete\" onclick=\"deleteItem(").concat(item.placa, ")\">X</button></td>\n            </tr>\n        ");
    });
}
//Exclusão do item selecionado na página e adiciona o item apagado a tabela de saída 
function deleteItem(id) {
    var allItems = readData();
    var caixaSaida = document.getElementById('boxContentExit');
    var valorBool = false;
    var itemDeleted = {};
    allItems.forEach(function (item) {
        if (item.placa == id) {
            itemDeleted = { nome: item.nome, placa: item.placa, data: item.data };
            valorBool = true;
            document.getElementById("".concat(item.placa)).remove();
        }
    });
    if (valorBool) {
        var newAllItems = allItems.filter(function (item) {
            return item.placa != id;
        });
        localStorage.clear();
        localStorage.setItem("Patio", JSON.stringify(newAllItems));
        if (itemDeleted != []) {
            caixaSaida.innerHTML += "\n                     <tr>\n                        <td>".concat(itemDeleted.nome, "</td>\n                        <td>").concat(itemDeleted.placa, "</td>\n                        <td>").concat(itemDeleted.data, "</td>\n                        <td>").concat(new Date, "</td>    \n                     </tr>\n             ");
        }
    }
}
reloadData();
