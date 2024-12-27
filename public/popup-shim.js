'use strict';

(async () => {
  const src = chrome.runtime.getURL("js/popup.js");
  await import(src);
})();