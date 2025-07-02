const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    simbolos: '!@%*?',
    espaco: ' '
};

// Event Listeners
botoes[0].addEventListener('click', diminuiTamanho);
botoes[1].addEventListener('click', aumentaTamanho);

checkbox.forEach(box => {
    box.addEventListener('change', geraSenha);
});

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
        geraSenha();
    }
}

function geraSenha() {
    let alfabeto = '';
    
    if (checkbox[0].checked) alfabeto += caracteres.maiusculas;
    if (checkbox[1].checked) alfabeto += caracteres.minusculas;
    if (checkbox[2].checked) alfabeto += caracteres.numeros;
    if (checkbox[3].checked) alfabeto += caracteres.simbolos;
    if (checkbox[4]?.checked) alfabeto += caracteres.espaco;

    if (alfabeto.length === 0) {
        campoSenha.value = 'Selecione ao menos uma opção';
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    forcaSenha.classList.remove('muitofraca', 'fraca', 'media', 'forte', 'muitoforte');
    
    if (entropia > 70) {
        forcaSenha.classList.add('muitoforte');
    } else if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else if (entropia > 15) {
        forcaSenha.classList.add('fraca');
    } else {
        forcaSenha.classList.add('muitofraca');
    }
    
    // entropia é uma medida do grau de desordem ou aleatoriedade de um sistema
    const valorEntropia = document.querySelector('.entropia');
    if (valorEntropia) {
        valorEntropia.textContent = `Um computador pode levar até ${Math.floor(2**entropia/(100e6*60*60*24))} dias para descobrir essa senha.`;
    }
}

// Inicialização
geraSenha();