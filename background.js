// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

chrome.runtime.onMessage.addListener((request, sendResponse) => {

    if (request.action === "buscarArquivo") {
        try {
            const file = obterArquivo(request.content);

            chrome.storage.local.set({ savedFile: file }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Erro ao salvar o arquivo no storage:", chrome.runtime.lastError);
                } else {
                    console.log("Arquivo salvo com sucesso no storage.");
                }
            });

            sendResponse(file);
        }
        catch (error) {
            console.error("Erro ao obter o arquivo:", error)
            sendResponse(null);
        }
        return true;
    }

});

async function obterArquivo(url) {
    try {
        console.log("Iniciando fetch para:", url);
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro ao buscar o arquivo: ${response.status} ${response.statusText}`);
        return null;
        }

        const buffer = response.arrayBuffer();
        const blob = new Blob([buffer], { type: response.headers.get('Content-Type') });
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    }
    catch(error) {
        console.error("Erro ao obter o arquivo:", error)
        return null;
    }
}