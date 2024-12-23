'use strict';

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

// TODO - add logic to determine whether we should render the popup or not;

const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('screens/popup.html');
iframe.setAttribute('style', IFRAME_ACTIVE_STYLES)
document.body.appendChild(iframe);

window.addEventListener('message', (event) => {
  // Verify the origin of the message
  if (!event.origin.startsWith('chrome-extension://')) { return; }

  switch (event.data.type) {
    case 'close-yenoh':
    default:
      iframe.setAttribute('style', IFRAME_INACTIVE_STYLES);
      break;
  }
});