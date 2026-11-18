// Executar na guia atual do navegador.
document.querySelector("button").addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Obtém os Dados da aba atual do navegador.
    console.log("Dados da aba atual:", tab);

    // Suponha que você tenha uma URL
    const imageUrl = "https://zecapapelito.com.br/wp-content/uploads/2024/09/424758236_7032004673565405_9194800727472159017_n.jpg";

    const response = await chrome.runtime.sendMessage({ action: "buscarArquivo", content: imageUrl }, (response) => {

        console.log("Resposta:", response); // Log da resposta

        return response;
    });


    chrome.storage.local.get("savedFile", (savedFile) => {
        console.log("Arquivo salvo:", savedFile);
    });

});