# **Extensão Chrome: Atualização Google Meu Negócio**

## **Visão Geral**

Esta extensão foi projetada para simplificar a atualização de conteúdos no Google Meu Negócio. Ela permite capturar dados e imagens da aba ativa e enviá-los para processamento ou armazenamento, facilitando a gestão de perfis comerciais.

---

## **Funcionalidades**

1. **Captura de Contexto:** Obtém informações da aba atual do navegador com um clique.
2. **Download de Imagens:** Possui lógica para buscar e salvar imagens via URL para posts no perfil comercial.
3. **Comunicação em Segundo Plano:** Utiliza `service workers` (background.js) para processar downloads e armazenamento de dados sem interromper a navegação.

---

## **Funcionamento Técnico**

### **1. Captura de Aba e Envio de Mensagem**
Ao interagir com o popup, a extensão identifica a aba ativa e envia uma mensagem para o background script:

```javascript
document.querySelector("button").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({ action: "buscarArquivo", content: imageUrl });
});
```

### **2. Processamento no Background**
O script de background gerencia tarefas assíncronas, como o download de mídias:

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "buscarArquivo") {
        // Lógica de captura e armazenamento
    }
});
```

---

## **Estrutura do Projeto**

- `manifest.json`: Configurações de permissões para `storage`, `tabs` e `scripting`.
- `popup.html/js`: Interface do usuário para disparar atualizações.
- `background.js`: Motor de processamento da extensão.

---

## **Conclusão**

A extensão **Atualização Google Meu Negócio** é uma ferramenta poderosa para agências e donos de negócios que buscam agilidade na manutenção de sua presença digital, automatizando a coleta e upload de informações relevantes.
