
/* ========================================
   REDAÇÃO CORINGA
   Funcionalidades e interações
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. SELETORES */
    const $ = (seletor, elemento = document) =>
        elemento.querySelector(seletor);

    const criarElemento = (tag, classe = "", conteudo = "") => {
        const elemento = document.createElement(tag);

        if (classe) elemento.className = classe;
        if (conteudo) elemento.innerHTML = conteudo;

        return elemento;
    };


    /* 2. ALTERNÂNCIA DE TEMA */
    const root = document.documentElement;
    const botaoTema = $("#themeBtn");

    try {
        const temaSalvo = localStorage.getItem("rc-theme");

        if (temaSalvo) {
            root.setAttribute("data-theme", temaSalvo);
        }
    } catch (erro) {
        // O site continua funcionando mesmo sem armazenamento local.
    }

    botaoTema.addEventListener("click", () => {

        const temaEscuro =
            root.getAttribute("data-theme") === "dark" ||
            (
                !root.getAttribute("data-theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );

        const novoTema = temaEscuro ? "light" : "dark";

        root.setAttribute("data-theme", novoTema);

        try {
            localStorage.setItem("rc-theme", novoTema);
        } catch (erro) {
            // Não impede a troca de tema.
        }

    });


    /* 3. AVISOS E BOTÃO DE COPIAR */
    let temporizadorAviso;

    function mostrarAviso(mensagem) {

        const aviso = $("#toast");

        aviso.textContent = mensagem;
        aviso.classList.add("show");

        clearTimeout(temporizadorAviso);

        temporizadorAviso = setTimeout(() => {
            aviso.classList.remove("show");
        }, 1600);

    }

    function copiarTexto(texto, mensagem = "Copiado com sucesso!") {

        const fallback = () => {

            const campo = document.createElement("textarea");

            campo.value = texto;
            campo.style.position = "fixed";
            campo.style.opacity = "0";

            document.body.appendChild(campo);

            campo.select();

            try {
                document.execCommand("copy");
            } catch (erro) {
                mostrarAviso("Não foi possível copiar.");
            }

            document.body.removeChild(campo);

        };

        if (navigator.clipboard && navigator.clipboard.writeText) {

            navigator.clipboard.writeText(texto)
                .then(() => mostrarAviso(mensagem))
                .catch(() => {
                    fallback();
                    mostrarAviso(mensagem);
                });

        } else {

            fallback();
            mostrarAviso(mensagem);

        }

    }


    /* 4. ABAS REUTILIZÁVEIS */
    function criarAbas(container, itens, aoSelecionar) {

        itens.forEach((item, indice) => {

            const botao = criarElemento("button", "pill", item.label);

            botao.type = "button";
            botao.setAttribute(
                "aria-pressed",
                indice === 0 ? "true" : "false"
            );

            botao.addEventListener("click", () => {

                container.querySelectorAll("button").forEach(botaoAtual => {
                    botaoAtual.setAttribute("aria-pressed", "false");
                });

                botao.setAttribute("aria-pressed", "true");

                aoSelecionar(item);

            });

            container.appendChild(botao);

        });

        if (itens.length) {
            aoSelecionar(itens[0]);
        }

    }


    /* 5. MODELOS DE REDAÇÃO POR CARREIRA */
    const carreiras = [

        {
            label: "Geral (qualquer concurso)",

            tip: "<b>Coringa puro.</b> Use a Constituição e um pensador de apoio. Funciona quando o edital não define a área.",

            intro: "a Constituição Federal de 1988 consagra a dignidade da pessoa humana como fundamento da República (art. 1º, III)",

            d1: "Segundo Norberto Bobbio, em A Era dos Direitos, o desafio atual não é fundamentar os direitos, e sim garanti-los na prática.",

            d2: "A Agenda 2030 da ONU, por meio dos Objetivos de Desenvolvimento Sustentável, reforça a necessidade de metas verificáveis.",

            c: "Assim, a norma sairá do papel e a dignidade será efetiva."

        },

        {
            label: "Carreira policial",

            tip: "<b>Mais artigos e leis.</b> Cite o art. 144 e o art. 5º da Constituição e leis penais. Mostra domínio do texto legal.",

            intro: "o artigo 144 da Constituição Federal define a segurança pública como dever do Estado e responsabilidade de todos",

            d1: "O artigo 5º da Constituição assegura direitos e garantias fundamentais, o que exige atuação policial dentro da legalidade.",

            d2: "A Lei nº 13.869/2019, conhecida como Lei de Abuso de Autoridade, delimita o poder estatal e protege o cidadão.",

            c: "Dessa maneira, segurança e respeito à lei caminharão juntas."

        },

        {
            label: "Administrativo e fiscal",

            tip: "<b>Princípios da administração.</b> O art. 37 e as leis de transparência combinam com quase todo tema de gestão pública.",

            intro: "o artigo 37 da Constituição Federal submete a administração pública aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência",

            d1: "A Lei de Acesso à Informação (Lei nº 12.527/2011) torna a transparência a regra e o sigilo, a exceção.",

            d2: "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) exige que o Estado trate os dados do cidadão com finalidade e segurança.",

            c: "Dessa forma, a gestão será mais eficiente e confiável."

        },

        {
            label: "Saúde",

            tip: "<b>Direito à saúde.</b> Art. 196 da Constituição e Lei do SUS dão base sólida para qualquer tema da área.",

            intro: "o artigo 196 da Constituição Federal estabelece a saúde como direito de todos e dever do Estado",

            d1: "A Lei nº 8.080/1990, que organiza o Sistema Único de Saúde, prevê a integralidade e a universalidade do atendimento.",

            d2: "A Organização Mundial da Saúde define saúde como estado de completo bem-estar físico, mental e social, e não só ausência de doença.",

            c: "Com isso, o direito previsto em lei chegará a quem precisa."

        },

        {
            label: "Educação",

            tip: "<b>Educação como direito.</b> Art. 205 da Constituição, a LDB e um pensador da pedagogia.",

            intro: "o artigo 205 da Constituição Federal reconhece a educação como direito de todos e dever do Estado e da família",

            d1: "A Lei de Diretrizes e Bases da Educação (Lei nº 9.394/1996) organiza os níveis e as responsabilidades do ensino no país.",

            d2: "Paulo Freire, em Pedagogia do Oprimido, critica a educação bancária e defende o diálogo entre quem ensina e quem aprende.",

            c: "Dessa forma, a escola cumprirá seu papel de transformar vidas."

        },

        {
            label: "Tribunais e jurídico",

            tip: "<b>Acesso à justiça.</b> Art. 5º, XXXV e LXXVIII, e o CPC de 2015 servem a temas de morosidade e conciliação.",

            intro: "o artigo 5º da Constituição Federal garante o acesso à justiça (inciso XXXV) e a duração razoável do processo (inciso LXXVIII)",

            d1: "O Código de Processo Civil de 2015 (Lei nº 13.105) incentiva a solução consensual dos conflitos.",

            d2: "Segundo Bobbio, o problema dos direitos é protegê-los, e a lentidão processual enfraquece essa proteção.",

            c: "Assim, a justiça será mais célere e acessível."

        }

    ];


    let carreiraAtual = carreiras[0];

    function destacarLacunas(texto) {

        return texto.replace(
            /\[([^\]]+)\]/g,
            '<mark class="slot">[$1]</mark>'
        );

    }


    function renderizarModelo() {

        const folha = $("#sheet");

        const blocos = [

            [
                "Introdução · contexto e tese",

                destacarLacunas("Em [contexto do tema], ") +
                '<span class="rep">' + carreiraAtual.intro + "</span>" +
                destacarLacunas(". Nesse cenário, [tema] permanece como desafio no Brasil, tanto por [causa 1] quanto por [causa 2].")

            ],

            [
                "Desenvolvimento 1 · primeiro argumento",

                destacarLacunas("Em primeiro lugar, [causa 1] agrava o problema. ") +
                '<span class="rep">' + carreiraAtual.d1 + "</span>" +
                destacarLacunas(" Dessa forma, [consequência 1].")

            ],

            [
                "Desenvolvimento 2 · segundo argumento",

                destacarLacunas("Além disso, [causa 2] compromete a solução. ") +
                '<span class="rep">' + carreiraAtual.d2 + "</span>" +
                destacarLacunas(" Assim, [consequência 2].")

            ],

            [
                "Conclusão · tese e proposta",

                destacarLacunas("Portanto, é imperativo enfrentar [tema]. Para isso, [agente] deve [ação], por meio de [meio], a fim de [finalidade]. ") +
                '<span class="rep">' + carreiraAtual.c + "</span>"

            ]

        ];


        folha.innerHTML = "";

        blocos.forEach(bloco => {

            const divisao = criarElemento("div", "bk");

            const titulo = criarElemento("div", "bk-h", bloco[0]);

            const paragrafo = criarElemento("p");

            paragrafo.innerHTML = bloco[1];

            divisao.appendChild(titulo);
            divisao.appendChild(paragrafo);

            folha.appendChild(divisao);

        });


        $("#tip").innerHTML =
            '<span class="pen">Dica para esta carreira</span>' +
            "<span>" + carreiraAtual.tip + "</span>";

    }


    criarAbas($("#careers"), carreiras, carreira => {

        carreiraAtual = carreira;

        renderizarModelo();

    });


    $("#copyModel").addEventListener("click", () => {

        const paragrafos = $("#sheet").querySelectorAll("p");

        const texto = Array.from(paragrafos)
            .map(paragrafo => paragrafo.textContent)
            .join("\n\n");

        copiarTexto(texto, "Modelo copiado!");

    });



    /* 6. CONECTIVOS */
    const conectivos = [

        {
            label: "Adição",
            use: ["Desenvolvimento"],
            list: [
                "além disso",
                "ademais",
                "outrossim",
                "bem como",
                "ainda",
                "não só… mas também"
            ]
        },

        {
            label: "Oposição",
            use: ["Desenvolvimento"],
            list: [
                "porém",
                "contudo",
                "todavia",
                "entretanto",
                "no entanto",
                "por outro lado"
            ]
        },

        {
            label: "Concessão",
            use: ["Introdução", "Desenvolvimento"],
            list: [
                "embora",
                "ainda que",
                "mesmo que",
                "apesar de",
                "conquanto",
                "posto que"
            ]
        },

        {
            label: "Causa",
            use: ["Desenvolvimento"],
            list: [
                "porque",
                "visto que",
                "uma vez que",
                "já que",
                "haja vista",
                "devido a"
            ]
        },

        {
            label: "Consequência",
            use: ["Desenvolvimento"],
            list: [
                "portanto",
                "logo",
                "por conseguinte",
                "de modo que",
                "assim",
                "em virtude disso"
            ]
        },

        {
            label: "Exemplo",
            use: ["Desenvolvimento"],
            list: [
                "por exemplo",
                "a saber",
                "tal como",
                "como evidencia",
                "a exemplo de",
                "como mostra"
            ]
        },

        {
            label: "Conclusão",
            use: ["Conclusão"],
            list: [
                "dessa forma",
                "diante do exposto",
                "em suma",
                "por fim",
                "portanto",
                "em síntese"
            ]
        }

    ];


    criarAbas($("#conTabs"), conectivos, categoria => {

        const area = $("#conChips");

        area.innerHTML = "";

        categoria.list.forEach(palavra => {

            const botao = criarElemento("button", "chip", palavra);

            botao.type = "button";

            botao.addEventListener("click", () => {
                copiarTexto(palavra, `"${palavra}" copiado!`);
            });

            area.appendChild(botao);

        });


        const uso = $("#conUse");

        uso.innerHTML = "Funciona bem em: ";

        categoria.use.forEach(local => {

            uso.appendChild(
                criarElemento("span", "tag", local)
            );

        });

    });



    /* 7. REPERTÓRIOS */
    const repertorios = [

        {
            tipo: "Lei",
            titulo: "Constituição, art. 1º, III",
            texto: "A dignidade da pessoa humana como fundamento da República. Serve a direitos, saúde, educação e segurança.",
            uso: "Tema aberto, qualquer área"
        },

        {
            tipo: "Lei",
            titulo: "Constituição, art. 5º",
            texto: "Direitos e garantias fundamentais, incluindo acesso à justiça e duração razoável do processo.",
            uso: "Segurança, justiça, cidadania"
        },

        {
            tipo: "Lei",
            titulo: "Constituição, art. 37",
            texto: "Princípios da administração pública: legalidade, impessoalidade, moralidade, publicidade e eficiência.",
            uso: "Gestão pública, corrupção, transparência"
        },

        {
            tipo: "Lei",
            titulo: "Constituição, art. 144",
            texto: "Segurança pública como dever do Estado e responsabilidade de todos.",
            uso: "Carreira policial"
        },

        {
            tipo: "Lei",
            titulo: "Constituição, art. 196",
            texto: "Saúde como direito de todos e dever do Estado.",
            uso: "Saúde, SUS, políticas públicas"
        },

        {
            tipo: "Lei",
            titulo: "Lei nº 12.527/2011",
            texto: "Lei de Acesso à Informação: a transparência é a regra.",
            uso: "Administração, controle social"
        },

        {
            tipo: "Pensador",
            titulo: "Norberto Bobbio",
            texto: "Em A Era dos Direitos, defende que o problema atual é garantir direitos já reconhecidos.",
            uso: "Direitos humanos, justiça"
        },

        {
            tipo: "Pensador",
            titulo: "Hannah Arendt",
            texto: "Cunhou a expressão banalidade do mal ao analisar o julgamento de Eichmann.",
            uso: "Ética, violência, omissão"
        },

        {
            tipo: "Pensador",
            titulo: "Zygmunt Bauman",
            texto: "Em Modernidade Líquida, descreve relações e instituições cada vez mais instáveis.",
            uso: "Tecnologia, consumo, vínculos"
        },

        {
            tipo: "Pensador",
            titulo: "Paulo Freire",
            texto: "Em Pedagogia do Oprimido, critica a educação bancária.",
            uso: "Educação, desigualdade"
        },

        {
            tipo: "Organismo",
            titulo: "Agenda 2030 da ONU",
            texto: "Objetivos de Desenvolvimento Sustentável com metas para 2030.",
            uso: "Meio ambiente, pobreza, saúde"
        },

        {
            tipo: "Organismo",
            titulo: "Organização Mundial da Saúde",
            texto: "Define saúde como estado de completo bem-estar físico, mental e social.",
            uso: "Saúde, saúde mental"
        }

    ];


    const filtrosRepertorio = [

        { label: "Todos", tipo: "" },
        { label: "Leis", tipo: "Lei" },
        { label: "Pensadores", tipo: "Pensador" },
        { label: "Organismos", tipo: "Organismo" }

    ];


    const gradeRepertorios = $("#repGrid");


    repertorios.forEach(repertorio => {

        const card = criarElemento("article", "rcard");

        card.dataset.tipo = repertorio.tipo;

        card.innerHTML = `
            <span class="kind">${repertorio.tipo}</span>

            <h3>${repertorio.titulo}</h3>

            <p>${repertorio.texto}</p>

            <span class="use">
                Use em: ${repertorio.uso}
            </span>
        `;

        gradeRepertorios.appendChild(card);

    });


    criarAbas($("#repTabs"), filtrosRepertorio, filtro => {

        gradeRepertorios.querySelectorAll(".rcard").forEach(card => {

            card.hidden =
                Boolean(filtro.tipo) &&
                card.dataset.tipo !== filtro.tipo;

        });

    });



    /* 8. MONTADOR DE PROPOSTA */
    const camposProposta = [
        "f-ag",
        "f-ac",
        "f-me",
        "f-fi",
        "f-de"
    ];


    function limparTexto(texto) {

        return texto.trim().replace(/[.\s]+$/, "");

    }


    function atualizarProposta() {

        const valores = camposProposta.map(id =>
            limparTexto($("#" + id).value)
        );

        const preenchidos = valores.filter(Boolean).length;

        const partes = [];


        if (valores[0] || valores[1]) {

            partes.push(
                [valores[0], valores[1]]
                    .filter(Boolean)
                    .join(" ")
            );

        }

        if (valores[2]) {
            partes.push(valores[2]);
        }

        if (valores[3]) {
            partes.push(valores[3]);
        }


        let texto = partes.join(", ");

        if (valores[4]) {

            texto +=
                (texto ? ", " : "") +
                valores[4];

        }


        $("#propOut").textContent = texto
            ? texto.charAt(0).toUpperCase() + texto.slice(1) + "."
            : "Preencha os campos para ver a proposta.";


        document.querySelectorAll("#meter i").forEach((barra, indice) => {

            barra.classList.toggle(
                "on",
                indice < preenchidos
            );

        });


        $("#meterTxt").textContent =
            preenchidos === 5
                ? "Proposta completa: os cinco elementos estão presentes."
                : `${preenchidos} de 5 elementos preenchidos.`;

    }


    camposProposta.forEach(id => {

        $("#" + id).addEventListener("input", atualizarProposta);

    });

    atualizarProposta();



    /* 9. CHECKLIST DE REVISÃO */
    const itensChecklist = [

        "Li o mínimo e o máximo de linhas do edital",

        "Vi se o título é obrigatório",

        "Vi se a proposta de solução é exigida",

        "A tese está clara na introdução",

        "Cada parágrafo tem argumento e exemplo",

        "A conclusão retoma a tese"

    ];


    const checklist = $("#checks");


    itensChecklist.forEach((texto, indice) => {

        const label = criarElemento("label");

        label.innerHTML = `
            <input type="checkbox" id="ck${indice}">
            <span>${texto}</span>
        `;

        checklist.appendChild(label);

    });



    /* 10. FOTO DE PERFIL OPCIONAL */
    const avatar = $("#avatar");

    if (avatar) {

        const foto = new Image();

        foto.onload = () => {

            avatar.classList.add("has-photo");

            avatar.style.backgroundImage =
                'url("img/foto.jpg")';

            avatar.setAttribute(
                "aria-label",
                "Foto de perfil"
            );

        };

        foto.src = "img/foto.jpg";

    }



    /* 11. INFORMAÇÕES SOBRE BANCAS */
    const bancas = [

        {
            label: "Cebraspe",

            html: `
                <span class="eyebrow">Critérios gerais citados</span>

                <h3>Cebraspe</h3>

                <div class="crit">

                    <div>
                        <b>Compreensão do tema</b>
                        Seguir as instruções e entender o que se pede.
                    </div>

                    <div>
                        <b>Desenvolvimento</b>
                        Qualidade e relevância dos argumentos.
                    </div>

                    <div>
                        <b>Coesão e coerência</b>
                        Organização e fluidez das ideias.
                    </div>

                    <div>
                        <b>Correção gramatical</b>
                        Gramática, ortografia e pontuação.
                    </div>

                </div>

                <p class="legend">
                    A pontuação e o limite de linhas variam por concurso.
                    Consulte o edital.
                </p>
            `

        },

        { label: "FGV", emConstrucao: true },

        { label: "Vunesp", emConstrucao: true },

        { label: "FCC", emConstrucao: true },

        { label: "Cesgranrio", emConstrucao: true }

    ];


    criarAbas($("#bancaTabs"), bancas, banca => {

        $("#bancaPanel").innerHTML = banca.emConstrucao

            ? `
                <div class="soon">

                    <span class="pen">Em construção</span>

                    <h3>${banca.label}</h3>

                    <p>
                        A ficha desta banca será desenvolvida
                        com critérios, estilo de tema e dicas.
                    </p>

                </div>
            `

            : banca.html;

    });

});
