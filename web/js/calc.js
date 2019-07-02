var contarDigitos = 0; //aux para definir quantia de digitos no visor
var d = 0; //
var pNumeral = 0; //aux da pontenciação
var contarSub = 0; //aux para subtração


//Adicionar a cada toque um difito no visor, onde o mesmo aceita
//no maximo 12 digitos
function botao(num) {
    if (contarDigitos < 12) {
        document.fDisplay.display.value += num;
        contarDigitos++;
    }
}

//Limpar o visor
function limparVisor() {
    document.fDisplay.display.value = '';
    contarDigitos = 0;
    contarSub = 0;
}

// Remove o ultimo digito inserido no visor
function removerUltimoDigito() {
    var aux = document.fDisplay.display.value;
    document.fDisplay.display.value = aux.substr(0, (aux.length - 1));
}

//Calcular a Quadrado de um numero
function quadrado() {
    document.fDisplay.display.value *= document.fDisplay.display.value;
}

//Potenciação, setTimeout para dar um pause na execução, podendo
//digitar a potencia
function potenciacao() {
    pNumeral = Number(document.fDisplay.display.value);
    limparVisor();
    setTimeout(potencia, 3000);
}
function potencia() {
    var pontecia = Number(document.fDisplay.display.value);
    document.fDisplay.display.value = Math.pow(pNumeral, pontecia);
}

//Calcular a Raiz Quadrada de um numero
function raizQuadrada() {
    document.fDisplay.display.value = Math.sqrt(document.fDisplay.display.value);
}

//Trocar o sinal de um numero
function tocarSinal() {
    if (Math.sign(document.fDisplay.display.value) == 1) {
        document.fDisplay.display.value -= (2 * document.fDisplay.display.value);
    } else {
        document.fDisplay.display.value += (2 * document.fDisplay.display.value);
    }
}

/*Divisao, ira percorrer o valor do visor em busca do operador de divisao
caso encontre, nao permitira adicionar mais um operador de divisao
depois de digitar o divisor, e o usuario precionar a tecla de divisao
exibira o resultado pronto para mais uma divisao*/
function divisao() {
    var percorrer = document.fDisplay.display.value;
    if (percorrer.indexOf('/') == -1) {
        botao("/");
    } else {
        if (percorrer.indexOf('/') != (percorrer.length - 1)) {
            resultado(percorrer);
            botao("/");
        }
    }
}

/*O mesmo que ocorre na divisao, simbolo adicionado, nao repete e ja
adiciona pornto para mais uma adição */
function adicao() {
    var percorrer = document.fDisplay.display.value;
    if (percorrer.indexOf('+') == -1) {
        botao("+");
    } else {
        if (percorrer.indexOf('+') != (percorrer.length - 1)) {
            resultado(percorrer);
            botao("+");
        }
    }
}

/*O mesmo da divisao */
function subtrair() {
    var percorrer = document.fDisplay.display.value;
    if (verificarSinalPrimeiroNumero(percorrer) >= 0) {
        if (percorrer.indexOf('-') == -1) {
            botao("-");
        } else {
            if (percorrer.indexOf('-') != (percorrer.length - 1)) {
                resultado(percorrer);
                botao("-");
            }
        }
    } else {
        contarSub++;
        if (contarSub <= 1) {
            botao("-");
        } else {
            resultado(percorrer);
            contarSub = 1;
            botao("-");
        }
    }
}

/*Seguir o mesmo raciocinio da divisao */
function multiplicar() {
    var percorrer = document.fDisplay.display.value;
    if (percorrer.indexOf('*') == -1) {
        botao("*");
    } else {
        if (percorrer.indexOf('*') != (percorrer.length - 1)) {
            resultado(percorrer);
            botao("*");
        }
    }
}

/*Percorre o visor a procura do indice do operador */
function resultado(num) {
    var percorrer = num;

    /*Caso encontre a posição do oerador de divisao */
    if (percorrer.indexOf("/") != -1) {
        var numeral = 0, divisor = 0;
        /*Separando o Dividendo */
        numeral = verificarSinalPrimeiroNumero(percorrer);
        /*Separando o Divisor */
        divisor = verificarSinalSegundoNumero(percorrer);
        limparVisor();
        //Calculando a Divisao
        document.fDisplay.display.value = Number(numeral) / Number(divisor);


        /*Caso encontre o operador de adição */
    } else if (percorrer.indexOf("+") != -1) {
        var adicionando = 0, adicionar = 0;
        //Separando o Adicionando
        adicionando = verificarSinalPrimeiroNumero(percorrer);
        //Separando o Adicionar
        adicionar= verificarSinalSegundoNumero(percorrer)
        limparVisor();
        //Calculando a Adição
        document.fDisplay.display.value = Number(adicionando) + Number(adicionar);

        /*Caso encontre o operador de Subtração */
    } else if (percorrer.indexOf("-") != -1) {
        var subtraindo = '', subtraidor = '';
        //Separando a Subtraindo
        subtraindo = verificarSinalPrimeiroNumero(percorrer);
        //Separando o Subtrair
        var indiceSubtracao = 0;
        subtraidor = verificarSinalSegundoNumero(percorrer);
        limparVisor();
        //Calculado a Subtração
        document.fDisplay.display.value = Number(subtraindo) - Number(subtraidor);

        //Operador Multiplicar
    } else if(percorrer.indexOf("*")){
        var multiplicando = '', multiplicador = '';
        //Separando multiplicando
        multiplicando = verificarSinalPrimeiroNumero(percorrer);
        //separando multiplicador
        multiplicador = verificarSinalSegundoNumero(percorrer);
        limparVisor();
        //Calculando Multiplicação
        document.fDisplay.display.value = (Number(multiplicando)) * (Number(multiplicador));
    }
}

/*Verificar se o primeiro digito é negativo e
retorna o primeiro digito */
function verificarSinalPrimeiroNumero(num) {
    var contarSubtracao = 0;
    for (let index = 0; index < num.length; index++) {
        if ((num[index] == "-") && (index == 0)) {
            contarSubtracao++; //Aux para definir sinal
        }
    }
    //Considerado Negativo
    if (contarSubtracao > 0) {
        var primeiro = num[0];
        for (let index = 1; index < num.length; index++) {
            if ((num[index] == '-')
                || (num[index] == '+')
                || (num[index] == '*')
                || (num[index] == '/')) {
                break;
            }
            primeiro += num[index];
        }
        //Considera positivo
    } else {
        var primeiro = '';
        for (let index = 0; index < num.length; index++) {
            if ((num[index] != '-')
                && (num[index] != '+')
                && (num[index] != '*')
                && (num[index] != '/')) {
                primeiro += num[index];
            } else {
                break;
            }
        }
    }
    return Number(primeiro);
}

function verificarSinalSegundoNumero(num) {
    var contarSubtracao = 0;
    var auxIndice = 0;
    for (let index = 0; index < num.length; index++) {
        if ((num[index] == '-')
            && ((num[index - 1] == '-')
                || (num[index - 1] == '+')
                || (num[index - 1] == '*')
                || (num[index - 1] == '/'))) {
            contarSubtracao++; //Aux para definir sinal
            auxIndice = index;
            break;
        }
    }
    //Considerado Negativo
    if (contarSubtracao > 0) {
        var segundo = '';
        for (let index = auxIndice; index < num.length; index++) {
            segundo += num[index];
        }

        //Considera positivo
    } else {
        var segundo = 0;
        for (let index = 0; index < num.length; index++) {
            if (((num[index] == '-')
                || (num[index] == '+')
                || (num[index] == '*')
                || (num[index] == '/'))
                && ((num[index - 1] != '-')
                    || (num[index - 1] != '+')
                    || (num[index - 1] != '*')
                    || (num[index - 1] != '/'))) {
                auxIndice = index; //Aux para definir sinal
                break;
            }
        }
        for (let index = auxIndice + 1; index < num.length; index++) {
            segundo += num[index];
        }
    }
    return Number(segundo);
}