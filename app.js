class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano 
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor 
    }

    validarDados() {
        for(let i  in this)
        if(this[i] === undefined || this[i] === '' || this[i] === null) {
            return false
        }

        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
    
    recuperarTodosRegistros() {
        //array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')
        //recuperar todas as despesas cadastradas em local storage
        for (let i = 1; i <= id; i++) {
            //recuperar despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //verificação de posssibilidade de haver índices que foram pulados ou removidos
            if (despesa === null) {
                continue
            }
            
            despesas.push(despesa) 
        }

        return despesas
    }
    
    pesquisar(despesa) {

        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesasFiltradas)

        //filtros: 
        //ano
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
    }

}

let bd = new Bd()

//função que recupera os valores da view de cadastro de nova despesa
function cadastrarDespesa() {
   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')

   let despesa = new Despesa(
    ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value
   )

   if(despesa.validarDados()) {
    bd.gravar(despesa)
    $('#modalRegistraDespesa').modal('show')
    document.getElementById('tituloMensagemModal').innerHTML = 'Registros inseridos com sucesso'
    let tituloMensagemModal = document.getElementById('modal')
    tituloMensagemModal.className = 'modal-header text-success'
    document.getElementById('mensagemModal').innerHTML = 'Despesa foi cadastrada com sucesso.'
    let botaoModal = document.getElementById('botaoModal')
    botaoModal.className = 'btn btn-success'
    document.getElementById('mensagemBotaoModal').innerHTML = 'Voltar'
    console.log('Dados válidos.')

    botaoModal.onclick = function(ano, mes, dia, tipo, descricao, valor) {
       document.getElementById('ano').value = ''
       document.getElementById('mes').value = ''
       document.getElementById('dia').value = ''
       document.getElementById('tipo').value = ''
       document.getElementById('descricao').value = ''
       document.getElementById('valor').value = ''

    }

   } else {
    $('#modalRegistraDespesa').modal('show')
    document.getElementById('tituloMensagemModal').innerHTML = 'Erro na Gravação'
    let tituloMensagemModal = document.getElementById('modal')
    tituloMensagemModal.className = 'modal-header text-danger'
    document.getElementById('mensagemModal').innerHTML = 'Alguns campos obrigatórios não foram preenchidos.'
    let botaoModal = document.getElementById('botaoModal')
    botaoModal.className = 'btn btn-danger'
    document.getElementById('mensagemBotaoModal').innerHTML = 'Voltar e corrigir'
   }

}

function carregaListaDespesas() {
    //chamada no onload do body de consulta.html
    let despesas = Array()
    
    despesas = bd.recuperarTodosRegistros()

    //selecinando o tbody da página consulta.html
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d) {

        console.log(d)
        //criando linha/tr
        
        let linha = listaDespesas.insertRow()

        //criando colunas/td

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/ ${d.ano}`

        //ajustar o tipo da despesa

        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        


    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    //selecinando o tbody da página consulta.html
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d) {

        console.log(d)
        //criando linha/tr
        
        let linha = listaDespesas.insertRow()

        //criando colunas/td

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/ ${d.ano}`

        //ajustar o tipo da despesa

        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        


    })
    

    
}

