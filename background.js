// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveCredentials") {
      // Save email & password in chrome storage
      chrome.storage.local.set({ email: message.email, password: message.password }, () => {
        sendResponse({ status: "Credentials saved in storage!" });
      });
    }
  
    if (message.action === "getCredentials") {
      // Retrieve stored credentials
      chrome.storage.local.get(["email", "password"], (result) => {
        sendResponse(result);
      });
    }
  
    return true; // Required to use async sendResponse
  });
  
  // Optional: Monitor outgoing requests
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log("Intercepted Request:", details);
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  