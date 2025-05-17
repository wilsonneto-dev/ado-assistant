let heartbeat = false;

chrome.tabs.onUpdated.addListener((tabId: any, tab: any) => {
  try {
    if(!heartbeat) {
      setInterval(() => {
        chrome.tabs.sendMessage(tabId, {
          type: "heartbeat",
          page: tab.url,
        });
      }, 5000);
      heartbeat = true;
    }

    if (tab.url) {
          chrome.tabs.sendMessage(tabId, {
              type: "NAVIGATION",
              page: tab.url,
          });

          console.log("NAVIGATION", tab.url);
      }
  } catch (error) {
    console.error(error);
  }
});