const form = document.querySelector('.form-cotacao')
const moedaA = document.getElementById('moeda-a')
const selectMoedaA = document.getElementById('moeda-a-types')
const selectMoedaB = document.getElementById('moeda-b-types')
const types = {
    'BRL' : 'R$',
    'USD' : '$',
    'EUR' : '€'
}

form.addEventListener('submit', e => {
    const moedaASelected = selectMoedaA.options[selectMoedaA.selectedIndex].value
    const moedaBSelected = selectMoedaB.options[selectMoedaB.selectedIndex].value
    if(moedaASelected == moedaBSelected) {
        alert('Use duas moedas diferentes.')
        return
    }
    if(isNaN(+moedaA.value)) {
        alert('Digite apenas numeros')
        return
    }
    fetch(`https://economia.awesomeapi.com.br/last/${moedaASelected}-${moedaBSelected}`, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json"
        }
    }).then(data => data.json()).then(data => {
        const bid = data[`${moedaASelected}${moedaBSelected}`].bid
        const cotacao = +moedaA.value * bid
        document.getElementById('moeda-resposta').innerText =`${types[`${moedaBSelected}`]}${+cotacao.toFixed(2)}`
        document.getElementById('moeda-resposta').classList.add('resposta-colocada')
    })




    e.preventDefault()
})