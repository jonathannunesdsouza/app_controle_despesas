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

    console.log(despesas)
}

