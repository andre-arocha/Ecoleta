function populacaoUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (resp) => { return resp.json()} )
    .then( estados => {
        
        for( const estado of estados ) {
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
    } )
}


populacaoUFs()


function getCidades(event) {
    const citySelect = document.querySelector("[name=cidade]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (resp) => { return resp.json()} )
    .then( cidades => {
        for( const cidade of cidades ) {
            citySelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }

        citySelect.disabled = false
    } )


}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCidades )


// ITENS DE COLETA
// pegar todos os li

const itensColetados = document.querySelectorAll(".items-grid li")

for(const item of itensColetados){
    item.addEventListener("click", handleSelectedItem)
}

const coletarItems = document.querySelector("input[name=items]")


let itemsSelecionados = []

function handleSelectedItem(event) {

    const itemLi = event.target
    
    // addd ou remover uma classe com JavaScript
    itemLi.classList.toggle("selecionado")

    const itemId = itemLi.dataset.id


    

    // verificar se existe itens selecionados, se sim
    // pegar os itens selecionados 

    const alredySelected = itemsSelecionados.findIndex( function(item) {
        const itemFound  = item == itemId /* mostrar verdadeiro ou falso */
        return itemFound
    })

    // se já estive selecionado
    if(alredySelected >= 0) {
        //  tirar da seleção
        const filtereditems = itemsSelecionados.filter( item => {
            const itemDiferente = item != itemId // retorna falso
            return itemDiferente
        })

        itemsSelecionados = filtereditems

    } else { // se não estiver selecionado, add a seleçao
        itemsSelecionados.push(itemId)

    }
    
    // atualiazar o campo escondido com oitens selecionados 
    coletarItems.value = itemsSelecionados
}
