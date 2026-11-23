// === ELEMENTOS DA TELA ===
const telas = {
    capa: document.getElementById('tela-capa'),
    jogo: document.getElementById('tela-jogo'),
    go: document.getElementById('tela-gameover'),
    v1: document.getElementById('tela-v1'),
    v2: document.getElementById('tela-v2'),
    v3: document.getElementById('tela-v3'),
    creditos: document.getElementById('tela-creditos')
};

const el = {
    cardsPers: document.querySelectorAll('.card-personagem'),
    persEscolhido: document.getElementById('pers-escolhido'),
    btnIniciar: document.getElementById('btn-iniciar'),
    meuPers: document.getElementById('meu-pers'),
    cenaEmoji: document.getElementById('cena-emoji'),
    cenaTitulo: document.getElementById('cena-titulo'),
    cenaTexto: document.getElementById('cena-texto'),
    caixaBotoes: document.getElementById('caixa-botoes'),
    btnVoltar: document.getElementById('btn-voltar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnNovamente1: document.getElementById('btn-novamente1'),
    btnNovamente2: document.getElementById('btn-novamente2'),
    btnNovamente3: document.getElementById('btn-novamente3'),
    btnCreditos: document.querySelectorAll('.btn-creditos'),
    btnVoltarCapa: document.getElementById('btn-voltar-capa'),
    msgGameover: document.getElementById('msg-gameover'),
    vida: document.getElementById('vida')
};

// === VARIÁVEIS GLOBAIS ===
let personagem = null;
let cenaAtual = 'inicio';
let historico = [];
const nomesCreditos = [
    'Eduarda Santurion Hendges',
    'Tainara da Silva Reynaude'
];
let indiceCredito = 0;
const nomeCreditos = document.getElementById('nome-creditos');

setInterval(() => {
    if (!nomeCreditos) return;
    indiceCredito = (indiceCredito + 1) % nomesCreditos.length;
    nomeCreditos.classList.add('alternando');
    setTimeout(() => {
        nomeCreditos.textContent = nomesCreditos[indiceCredito];
        nomeCreditos.classList.remove('alternando');
    }, 250);
}, 2500);

// === BASE DE CENAS ===
const cenas = {
    inicio: {
        emoji: '📱🌐🏠',
        titulo: '🚨 ALERTA NO SISTEMA!',
        texto: 'Você é o Guardião Digital. O hacker ❌CORRUPT❌ está atacando agora! Cada escolha muda tudo. Boa sorte!',
        escolhas: [
            { texto: '🛡️ Ativar Firewall imediatamente', prox: 'firewall' },
            { texto: '🔍 Analisar de onde vem o ataque', prox: 'analisar' },
            { texto: '🔓 Desativar todas as proteções', prox: 'go_desprotegido' }
        ]
    },

    // Caminho Firewall
    firewall: {
        emoji: '🔥🛡️',
        titulo: 'Firewall Ativado!',
        texto: 'Portas externas bloqueadas! Mas chega um e-mail urgente: "Sistema em risco! Clique aqui para corrigir agora."',
        escolhas: [
            { texto: '🤔 Deixa clicarem, parece oficial', prox: 'go_phishing' },
            { texto: '🔍 Você verifica o link primeiro', prox: 'verifica_link' },
            { texto: '⬇️ Instala um antivírus desconhecido', prox: 'go_software' }
        ]
    },
    seguro1: {
        emoji: '✅🛡️💪',
        titulo: 'Boa decisão!',
        texto: 'Era um e-mail falso! Você salvou a rede. Agora aparece um programa desconhecido consumindo muita memória.',
        escolhas: [
            { texto: '🔄 Encerra o programa suspeito', prox: 'vitoria1' },
            { texto: '👀 Observa sem tocar ainda', prox: 'vitoria3' },
            { texto: '🖱️ Permite o programa continuar', prox: 'go_programa' }
        ]
    },
    verifica_link: {
        emoji: '🔗🔍✅',
        titulo: 'Link verificado!',
        texto: 'Era um site falso com endereço quase igual! Você bloqueou o domínio.',
        escolhas: [
            { texto: '🔑 Troca todas as senhas + ativa 2FA', prox: 'vitoria2' },
            { texto: '📧 Avisa todos os usuários', prox: 'vitoria2' },
            { texto: '🔗 Compartilha o link falso por engano', prox: 'go_dados' }
        ]
    },

    // Caminho Analisar
    analisar: {
        emoji: '🔎📡',
        titulo: 'Analisando o ataque...',
        texto: 'Descobriu! É um ataque DDoS — milhares de requisições sobrecarregando o servidor. Precisa agir RÁPIDO!',
        escolhas: [
            { texto: '⚡ Ativa proteção DDoS', prox: 'protegido' },
            { texto: '🚫 Bloqueia IP por IP manualmente', prox: 'go_lento' },
            { texto: '📤 Compartilha os logs publicamente', prox: 'go_logs' }
        ]
    },
    protegido: {
        emoji: '🌊🛑✨',
        titulo: 'Proteção ativada!',
        texto: 'O ataque foi filtrado! Agora o hacker tenta adivinhar senhas. O que fazer?',
        escolhas: [
            { texto: '🔒 Bloqueia tentativas de login', prox: 'vitoria1' },
            { texto: '📧 Avisa todos para trocarem senha', prox: 'vitoria2' },
            { texto: '🔑 Usa a mesma senha para todas as contas', prox: 'go_senha' }
        ]
    },
    reinicia: {
        emoji: '🔄🖥️',
        titulo: 'Servidores reiniciados',
        texto: 'O ataque foi interrompido, mas alguns serviços ficaram indisponíveis. Você precisa escolher o próximo passo.',
        escolhas: [
            { texto: '🧰 Restaurar os serviços com segurança', prox: 'vitoria1' },
            { texto: '🔍 Investigar o ataque antes de restaurar', prox: 'vitoria2' },
            { texto: '⏭️ Ignora os alertas do servidor', prox: 'go_desprotegido' }
        ]
    },
    avisar: {
        emoji: '📢🛡️',
        titulo: 'Usuários avisados!',
        texto: 'Todos receberam orientações para não clicar em links suspeitos. Agora é hora de proteger o sistema.',
        escolhas: [
            { texto: '🔒 Ativar autenticação em dois fatores', prox: 'vitoria2' },
            { texto: '🧱 Reforçar o firewall', prox: 'vitoria1' },
            { texto: '🔗 Publicar os dados dos usuários', prox: 'go_dados' }
        ]
    },
    go_desprotegido: {
        emoji: '🔓💀',
        titulo: 'Sistema desprotegido!',
        texto: 'Sem firewall e sem monitoramento, o hacker entrou no sistema em poucos minutos.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_software: {
        emoji: '📦⚠️',
        titulo: 'Programa falso instalado!',
        texto: 'O antivírus desconhecido era outro malware e abriu uma porta secreta para o invasor.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_programa: {
        emoji: '💻☠️',
        titulo: 'Programa suspeito autorizado!',
        texto: 'Você permitiu que o malware roubasse arquivos e acessos internos.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_logs: {
        emoji: '📤🕵️',
        titulo: 'Informações vazadas!',
        texto: 'Ao publicar os logs, você revelou dados sensíveis que ajudaram o hacker a atacar novamente.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_senha: {
        emoji: '🔑💥',
        titulo: 'Senhas comprometidas!',
        texto: 'A senha descoberta pelo hacker deu acesso a várias contas importantes.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_dados: {
        emoji: '👥📢',
        titulo: 'Dados expostos!',
        texto: 'Informações privadas dos usuários foram divulgadas e o invasor tomou controle das contas.',
        escolhas: [{ texto: '🔄 Tentar novamente', prox: 'inicio' }],
        gameover: true
    },
    go_phishing: {
        emoji: '🎣⚠️',
        titulo: 'Era phishing!',
        texto: 'O link instalou um programa malicioso e o sistema foi comprometido.',
        escolhas: [
            { texto: '🔄 Tentar novamente', prox: 'inicio' }
        ],
        gameover: true
    },
    go_lento: {
        emoji: '🐌💥',
        titulo: 'Ataque não contido',
        texto: 'O ataque cresceu mais rápido do que você conseguiu bloquear os IPs manualmente.',
        escolhas: [
            { texto: '🔄 Tentar novamente', prox: 'inicio' }
        ],
        gameover: true
    },
    vitoria1: {
        emoji: '🏆🛡️',
        titulo: 'Vitória!',
        texto: 'Você protegeu o sistema e impediu o ataque. Excelente trabalho, Guardião Digital!',
        escolhas: []
    },
    vitoria2: {
        emoji: '🏆🔐',
        titulo: 'Vitória com segurança!',
        texto: 'As contas foram protegidas e o ataque não conseguiu avançar. A segurança venceu!',
        escolhas: []
    },
    vitoria3: {
        emoji: '⚠️🕵️',
        titulo: 'Ameaça identificada!',
        texto: 'Você observou o programa e descobriu que ele era malicioso antes que causasse danos.',
        escolhas: [
            { texto: '🧹 Remover o programa', prox: 'vitoria1' },
            { texto: '🔄 Tentar novamente', prox: 'inicio' },
            { texto: '📂 Abre todos os arquivos suspeitos', prox: 'go_programa' }
        ]
    }
};

function mostrarTela(tela) {
    Object.values(telas).forEach(item => item && item.classList.remove('ativa'));
    if (tela) tela.classList.add('ativa');
}

function renderizarCena() {
    const cenaAtualEhGameOver = cenas[cenaAtual]?.gameover;
    if (cenaAtualEhGameOver) {
        if (el.msgGameover) el.msgGameover.textContent = cenas[cenaAtual].texto;
        mostrarTela(telas.go);
        return;
    }

    if (cenaAtual === 'vitoria1') {
        mostrarTela(telas.v1);
        return;
    }
    if (cenaAtual === 'vitoria2') {
        mostrarTela(telas.v2);
        return;
    }
    if (cenaAtual === 'vitoria3') {
        mostrarTela(telas.v3);
        return;
    }

    const cena = cenas[cenaAtual];
    if (!cena) return;

    el.cenaEmoji.textContent = cena.emoji;
    el.cenaTitulo.textContent = cena.titulo;
    el.cenaTexto.textContent = cena.texto;
    el.caixaBotoes.innerHTML = '';

    cena.escolhas.forEach(escolha => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'botao botao-escolha';
        botao.textContent = escolha.texto;
        botao.addEventListener('click', () => {
            historico.push(cenaAtual);
            cenaAtual = escolha.prox;
            renderizarCena();
        });
        el.caixaBotoes.appendChild(botao);
    });
}

function iniciarJogo() {
    personagem = el.persEscolhido.dataset.personagem || null;
    if (!personagem) return;
    if (el.meuPers) el.meuPers.textContent = personagem;
    cenaAtual = 'inicio';
    historico = [];
    mostrarTela(telas.jogo);
    renderizarCena();
}

el.cardsPers.forEach(card => {
    card.addEventListener('click', () => {
        el.cardsPers.forEach(item => item.classList.remove('selecionado'));
        card.classList.add('selecionado');
        const valor = card.dataset.personagem || card.dataset.pers || card.id;
        if (el.persEscolhido) {
            el.persEscolhido.dataset.personagem = valor;
            el.persEscolhido.textContent = `Guardião escolhido: ${valor}`;
        }
        if (el.btnIniciar) el.btnIniciar.disabled = false;
    });
});

if (el.btnIniciar) el.btnIniciar.addEventListener('click', iniciarJogo);
if (el.btnVoltar) el.btnVoltar.addEventListener('click', () => mostrarTela(telas.capa));
if (el.btnReiniciar) el.btnReiniciar.addEventListener('click', iniciarJogo);
if (el.btnNovamente1) el.btnNovamente1.addEventListener('click', iniciarJogo);
if (el.btnNovamente2) el.btnNovamente2.addEventListener('click', iniciarJogo);
if (el.btnNovamente3) el.btnNovamente3.addEventListener('click', iniciarJogo);
el.btnCreditos.forEach(botao => {
    botao.addEventListener('click', () => mostrarTela(telas.creditos));
});
if (el.btnVoltarCapa) {
    el.btnVoltarCapa.addEventListener('click', () => mostrarTela(telas.capa));
}