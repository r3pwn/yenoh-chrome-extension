'use strict';

function getResourceContent(fileName) {
  return fetch(chrome.runtime.getURL(fileName))
    .then(resp => resp.json());
}

/**
 * Returns true if the current URL matches the given pattern. Otherwise, returns false
 * @param {string} currentUrl
 * @param {string} urlToTest 
 */
function matchesUrl(currentUrl, urlToTest) {
  const matcher = new RegExp(`^${urlToTest.replace('*', '(.*)')}$`);
  return matcher.test(currentUrl)
}

(async () => {
  const content = await getResourceContent("affiliateLinks.json");
  const currentUrl = window.location.href;

  if (content.some(entry => entry.urls?.some(url => matchesUrl(currentUrl, url)))) {
    initPopup();
  }
})();

function initPopup() {
  const popupFrame = openPopupFrame();

  window.addEventListener('message', (event) => {
    // Verify the origin of the message
    if (!event.origin.startsWith('chrome-extension://')) { return; }

    switch (event.data.type) {
      case 'open-url-yenoh':
        openOffscreenFrame(event.data.url);
        break;
      case 'close-yenoh':
      default:
        popupFrame.setAttribute('style', 'display: none;');
        break;
    }
  });
}

function openPopupFrame() {
  const IFRAME_ACTIVE_STYLES = [
    'position: fixed;',
    'top: 8px;',
    'right: 8px;',
    'background: white;',
    'z-index: 100000;',
    'width: 300px;',
    'height: 200px;',
    'border-radius: 8px;',
    'border: none;',
    'box-shadow: 0px 0px 8px currentColor;'
  ].join(' ');

  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL(`screens/popup.html?currentUrl=${encodeURI(window.location.href)}`);
  iframe.setAttribute('style', IFRAME_ACTIVE_STYLES)
  document.body.appendChild(iframe);

  return iframe;
}

async function openOffscreenFrame(url) {
  if (!url) {
    throw new Error('silentOpen called without a URL');
  }

  const IFRAME_OFFSCREEN_STYLES = [
    'position: fixed;',
    'top: -200%;',
    'right: -200%;',
    'width: 1px;',
    'height: 1px;'
  ].join(' ');
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style = IFRAME_OFFSCREEN_STYLES;
  document.body.appendChild(iframe);
}