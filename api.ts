const inquirer = require('inquirer') // módulo externo
import chalk from 'chalk' // módulo externo
const fs = require('fs') // módulo interno

const startAPi = () => {
    inquirer.prompt([
    {
        type: 'list' ,
        name: 'escolha' ,
        message: 'Bem vindo(a) ao Banco Nokito, o que deseja fazer?' ,
        choices : [
            'Criar uma Nova Conta Nokia' ,
            'Depositar' ,
            'Sacar' ,
            'Consultar Saldo' ,
            'Transferir Dinheiro' ,
            'Definir Parcelas para serem sacadas do banco' ,
            'Sair do Banco'

        ]

    }
]).then((answer) => {
    const escolha = answer['escolha']

    if(escolha === 'Criar uma Nova Conta Nokia'){
        criarConta();

    }
    if(escolha === 'Depositar'){
        Depositar();
        
    }
    if(escolha === 'Sacar'){
        
    }
    if(escolha === 'Consultar Saldo'){
        
    }
    if(escolha === 'Transferir Dinheiro'){
        
    }
    if(escolha === 'Definir Parcelas para serem sacadas do banco'){
        
    }
    if(escolha === 'Sair do Banco'){
        
    }


}).catch((err : Error)=>{console.log(err)})

}
//------------------------------------------------------------------------------------------//
const getAcontajson = (nomeconta) => {
    const contaJSON = fs.readFileSync(`account/${nomeconta}.JSON` , {
        encoding: 'utf-8' ,
        flag: 'r'
    })
    return JSON.parse(contaJSON);
}


type NumString = string | number
// create account function
const criarConta = () => {
    inquirer.prompt([
        {
            name: 'nomeconta' ,
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const nomeconta = answer['nomeconta'] // 'nomeconta' tem um type : any, arrumar depois!
        // vamos verificar se a conta já existe

        if(!fs.existsSync('lista_de_contas')) {
            fs.mkdirSync('lista_de_contas')          // esse if verifica se existe uma pasta chamda listadecontas, se não houve, cria-se
        }
        
        if(fs.existsSync(`lista_de_contas/${nomeconta}.json`)){
            console.log("Essa conta já existe, tenta novamente")
            criarConta()
            return
        }
        fs.writeSync(`lista_de_contas/${nomeconta}.json` , '{saldodisponivel : 0 }')
        console.log('STATUS 200 - > PARABÉNS! CONTA CRIADA1')

        startAPi()
    }).catch((err : Error) => { console.log(err)})
}



const Depositar = () => {
    inquirer.prompt([
        {
            name : 'nomeconta' ,
            message: 'Qual nome da sua conta ?'
        }
    ]).then(answer => {
        const nomeconta = answer['nomeconta'];
        if(!fs.existsSync(`lista_de_contas/${nomeconta}.json`)){
            console.log("Essa conta não existe..")
            Depositar();
            return;
        }
        inquirer.prompt([
            {
                name : 'valor' ,
                message: ' Quanto você deseja depositar?'
            }
        ]).then( answer => {
            const valor : number = answer['valor'];
            const contaData = getAcontajson(nomeconta)
            const valor_final : number = contaData.valor + valor

        })

    }).catch((err : Error) => { console.log(err)})
    
}








//------------------------------------------------------------------------------------------//
startAPi()



