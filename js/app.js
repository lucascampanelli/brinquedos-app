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
            htmlContent += `<div class="row"><!-- Coluna que preenche as 12 colunas do grid --><div class="col-12"><h2><span></span>${registro.categoria}</h2></div></div>`;

        });

        // Adiciona o conteúdo gerado ao container de conteúdo
        container.innerHTML = htmlContent;

    }

}