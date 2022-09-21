const getVersion = () => {
  try {
    return chrome.runtime.getManifest().version_name;
  } catch (error) {
    return "";
  }
};

export const config = {
  version: getVersion(),
  alphanet: { pollTransactionStatusTimeout: 60_000 },
};
