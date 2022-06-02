"use strict";
exports.__esModule = true;
var inquirer = require('inquirer'); // módulo externo
var fs = require('fs'); // módulo interno
var startAPi = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'escolha',
            message: 'Bem vindo(a) ao Banco Nokito, o que deseja fazer?',
            choices: [
                'Criar uma Nova Conta Nokia',
                'Depositar',
                'Sacar',
                'Consultar Saldo',
                'Transferir Dinheiro',
                'Definir Parcelas para serem sacadas do banco',
                'Sair do Banco'
            ]
        }
    ]).then(function (answer) {
        var escolha = answer['escolha'];
        if (escolha === 'Criar uma Nova Conta Nokia') {
            criarConta();
        }
        if (escolha === 'Depositar') {
        }
        if (escolha === 'Sacar') {
        }
        if (escolha === 'Consultar Saldo') {
        }
        if (escolha === 'Transferir Dinheiro') {
        }
        if (escolha === 'Definir Parcelas para serem sacadas do banco') {
        }
        if (escolha === 'Sair do Banco') {
        }
    })["catch"](function (err) { console.log(err); });
};
// create account function
var criarConta = function () {
    inquirer.prompt([
        {
            name: 'nomeconta',
            message: 'Qual o nome da sua conta?'
        }
    ]).then(function (answer) {
        var nomeconta = answer['nomeconta']; // 'nomeconta' tem um type : any, arrumar depois!
        // vamos verificar se a conta já existe
        if (!fs.existsSync('lista_de_contas')) {
            fs.mkdirSync('lista_de_contas'); // esse if verifica se existe uma pasta chamda listadecontas, se não houve, cria-se
        }
        if (fs.existsSync("lista_de_contas/".concat(nomeconta, ".json"))) {
            console.log("Essa conta já existe, tenta novamente");
            criarConta();
            return;
        }
        fs.writeSync("lista_de_contas/".concat(nomeconta, ".json"), '{saldodisponivel : 0 }');
        console.log('STATUS 200 - > PARABÉNS! CONTA CRIADA1');
        startAPi();
    })["catch"](function (err) { console.log(err); });
};
//------------------------------------------------------------------------------------------//
startAPi();
