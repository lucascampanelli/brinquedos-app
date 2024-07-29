const fetchData = fetch("./dados.json");

dataJSON = fetchData.then(response => response.json());

dataJSON.then(dados => renderizarConteudo(dados));



function renderizarConteudo(dados) {
    
    // Especificar o container que receberá o conteúdo obtido pela requisição
    let container = document.getElementById("conteudo");



    // Se nenhum brinquedo estiver cadastrado no JSON
    if(dados.length < 1) {

        container.innerHTML = "<div class='alert alert-warning' role='alert'>Desculpe, ainda não temos brinquedos cadastrados!</div>";
    
    }
    else {

        // Inicializando a variável que terá o conteúdo a ser renderizado
        let htmlContent = "";


        // Para cada categoria obtida
        dados.forEach(registro => {
            
            // Concatena ao conteúdo a categoria iterada
            htmlContent += `
            <div class="row">
                <!-- Coluna que preenche as 12 colunas do grid -->
                <div class="col-12">
                    <h2>
                        <span></span>
                        ${registro.categoria}
                    </h2>
                </div>
            </div>`;

            // Se a categoria não tiver brinquedos
            if(registro.brinquedos.length < 1){

                htmlContent += `
                <div class="row">
                    <!-- Coluna que preenche as 12 colunas do grid -->
                    <div class="col-12">
                        <div class="alert alert-warning" role="alert">
                            Desculpe, ainda não temos brinquedos para esta categoria!
                        </div>
                    </div>
                </div>`;
            
            }
            else {

                htmlContent += `<div class="row">`;

                // Para cada brinquedo da categoria
                registro.brinquedos.forEach(brinquedo => {

                    htmlContent += `<!-- 4 colunas do grid no desktop --><div class="col-lg-4">`;

                    htmlContent += obterHtmlComListagemBrinquedos(brinquedo);

                    htmlContent += `</div>`;

                })

                htmlContent += `</div>`;

            }

        });

        // Adiciona o conteúdo gerado ao container de conteúdo
        container.innerHTML = htmlContent;

        cacheDinamico(dados);

    }

}

function obterHtmlComListagemBrinquedos(brinquedo) {

    let htmlBrinquedos = "";

    htmlBrinquedos += `<div class="card">`;

        htmlBrinquedos += `<img src="${brinquedo.imagem}" class="card-img-top" alt="${brinquedo.nome}">`;

        htmlBrinquedos += `<div class="card-body">`;

            htmlBrinquedos += `<h5 class="card-title">${brinquedo.nome}</h5>`;
    
            htmlBrinquedos += `<p class="card-text">Action figure épica do Superman, o clássico super-herói.</p>`;

            htmlBrinquedos += `<p>${brinquedo.valor}</p>`;
    
            htmlBrinquedos += `<div class="d-grid gap-2">`;

                htmlBrinquedos += `<a href="https://api.whatsapp.com/send?phone=${brinquedo.whatsapp}&text=Olá! Gostaria de informações sobre ${brinquedo.nome}" class="btn btn-primary">Comprar</a>`;

            htmlBrinquedos += `</div>`;
    
        htmlBrinquedos += `</div>`;

    htmlBrinquedos += `</div>`;

    return htmlBrinquedos;

}



// Construindo o cache dinâmico

var cacheDinamico = function(dados) {

    if('caches' in window) {

        console.log("Deletando o cache dinâmico antigo.");
        
        // Removendo o cache dinãmico anterior (o cache estático do SW permanece armazenado)
        caches.delete("brinquedo-app-dinamico").then(function (){

            // Se existirem registros
            if(dados.length > 0) {

                let files = ['dados.json'];

                dados.forEach(registro => {

                    registro.brinquedos.forEach(brinquedo => {

                        // Se a imagem do brinquedo ainda não existir no cache
                        if(files.indexOf(brinquedo.imagem) == -1)
                            // Adiciona a imagem do brinquedo ao cache
                            files.push(brinquedo.imagem);

                    });

                });

            }

            caches.open("brinquedo-app-dinamico").then(function (cache) {

                cache.addAll(files).then(function(){

                    console.log("Novo cache dinâmico adicionado.");

                });

            });

        });
        
    }

}