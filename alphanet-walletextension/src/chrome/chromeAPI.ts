const makeChromeAPI = () => {
  const storage = {
    getAllItems: async (): Promise<Record<string, unknown>> =>
      new Promise((resolve) => {
        if (chrome?.storage) {
          chrome?.storage?.local.get(null, (data) => {
            resolve(data);
          });
        } else {
          resolve({});
        }
      }),

    removeItem: async (key: string | string[]) => {
      if (chrome?.storage) {
        await chrome.storage.local.remove(key);
      }
    },

    addListener: (
      listener: (changes: Record<string, chrome.storage.StorageChange>) => void
    ) => {
      chrome?.storage?.onChanged.addListener(listener);
    },

    removeListener: (
      listener: (changes: Record<string, chrome.storage.StorageChange>) => void
    ) => {
      chrome?.storage?.onChanged.removeListener(listener);
    },
  };

  const sendMessage = (message: any) => {
    if (chrome.tabs) {
      chrome.tabs.sendMessage(message.tabId, message);
    }
  };

  const tabs = {
    getExtensionTabsByUrl: (url: string): Promise<chrome.tabs.Tab[]> =>
      new Promise((resolve) => {
        chrome.tabs.query({}, (tabs) => {
          resolve(tabs.filter((tab) => tab.url.includes(url)));
        });
      }),
  };

  return { storage, sendMessage, tabs };
};

export const chromeAPI = makeChromeAPI();
