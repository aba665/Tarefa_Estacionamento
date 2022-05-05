interface IAutomovel{
    nome: string,
    placa: string,
    data: Date,
}

type valorDeletado = {
    nome?: string,
    placa?: string,
    data?: Date
}
//Função para salvar os dados no localStorage
function saveRegister(veiculo: IAutomovel){

    localStorage.setItem("Patio", JSON.stringify([...readData(),{nome: veiculo.nome, placa: veiculo.placa, data: veiculo.data}]));

}
//Função para retornar os dados do localStorage
function readData(){
    return localStorage.Patio ? JSON.parse(localStorage.Patio) : [];
}
//Função para adição de um veículo no estacionamento 
function newRegister(){
    let nomeCarro: string = (<HTMLSelectElement>document.getElementById('nomeCarro')).value;
    let placaCarro: string = (<HTMLSelectElement>document.getElementById('placaCarro')).value;

    if(!nomeCarro || !placaCarro){
        alert("Os campos nome e placa necessitam serem passados!");
    }else if(placaCarro.length > 6){
        alert("O número da placa não pode passar de 6 dígitos!");
    }else{
        let caixaConteudo = (<HTMLSelectElement>document.getElementById('boxContent'));
        let time: Date = new Date();
        caixaConteudo.innerHTML += `
            <tr id=${placaCarro}>
                <td>${nomeCarro}</td>
                <td>${placaCarro}</td>
                <td>${time}</td>
                <td><button class="btnDelete" onclick="deleteItem(${placaCarro})">X</button></td>
            </tr>
            `

        saveRegister({ nome: nomeCarro, placa: placaCarro, data: time});
        (<HTMLSelectElement>document.getElementById('nomeCarro')).value = '';
        (<HTMLSelectElement>document.getElementById('placaCarro')).value = '';
    }
}
//Função de carregamento e criação de dados no localStorage toda vez que a página for aberta ou recarregada
function reloadData(){
    
    let allItems: IAutomovel[] = readData();
    let caixaConteudo = (<HTMLSelectElement>document.getElementById('boxContent'));
    
    allItems.forEach((item) => {
        caixaConteudo.innerHTML += `
            <tr id=${item.placa}>
                <td>${item.nome}</td>
                <td>${item.placa}</td>
                <td>${item.data}</td>
                <td><button id=${item.placa} class="btnDelete" onclick="deleteItem(${item.placa})">X</button></td>
            </tr>
        `
    });
}
//Exclusão do item selecionado na página e adiciona o item apagado a tabela de saída 
function deleteItem(id: string){
    let allItems: IAutomovel[] = readData();
    let caixaSaida = (<HTMLSelectElement>document.getElementById('boxContentExit'));
    let valorBool: boolean = false;
    let itemDeleted: valorDeletado = {}; 

    allItems.forEach((item) => {
        if(item.placa == id){
            itemDeleted = { nome: item.nome, placa: item.placa, data: item.data };
            valorBool = true;

            (<HTMLSelectElement>document.getElementById(`${item.placa}`)).remove();

        } 
    })
   
    if(valorBool){
        let newAllItems = allItems.filter((item)=>{
            return item.placa != id;
        }) 

        localStorage.clear();
        localStorage.setItem("Patio", JSON.stringify(newAllItems)); 
        
         if(itemDeleted != []){
             caixaSaida.innerHTML += `
                     <tr>
                        <td>${itemDeleted.nome}</td>
                        <td>${itemDeleted.placa}</td>
                        <td>${itemDeleted.data}</td>
                        <td>${new Date}</td>    
                     </tr>
             `
         }      
    }
}

reloadData();