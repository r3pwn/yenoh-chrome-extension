'use strict';

// temporary, until I determine how I should display the popup
const MATCH_PATHS = [
  /./,
]
const HREF_PATHS = [
]

if (MATCH_PATHS.some(matcher => matcher.test(window.location.pathname)) || HREF_PATHS.some(matcher => matcher.test(window.location.href))) {
  initPopup()
}

function initPopup() {
  const IFRAME_ACTIVE_STYLES = [
    'position: fixed;',
    'top: 8px;',
    'right: 8px;',
    'background: white;',
    'z-index: 100000;',
    'width: 350px;',
    'height: 400px;',
    'border-radius: 8px;',
    'border: none;',
    'box-shadow: 0px 0px 8px currentColor;'
  ].join(' ');
  const IFRAME_INACTIVE_STYLES = 'display: none;';

  const iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL('screens/popup.html');
  iframe.setAttribute('style', IFRAME_ACTIVE_STYLES)
  document.body.appendChild(iframe);

  window.addEventListener('message', (event) => {
    // Verify the origin of the message
    if (!event.origin.startsWith('chrome-extension://')) { return; }

    switch (event.data.type) {
      case 'open-url-yenoh':
        openOffscreenTab(event.data.url);
        break;
      case 'close-yenoh':
      default:
        iframe.setAttribute('style', IFRAME_INACTIVE_STYLES);
        break;
    }
  });
}

async function openOffscreenTab(url) {
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