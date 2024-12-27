import ReactDOM from 'react-dom/client'
import PopupRoot from './root.tsx'
import { matchesUrl } from '@/utils.ts';
import ShadowRender from '@/components/misc/shadow-render.tsx';

function getResourceContent(fileName: string) {
  return fetch(chrome.runtime.getURL(fileName))
    .then(resp => resp.json());
}

(async () => {
  const content = await getResourceContent("affiliateLinks.json");
  const currentUrl = window.location.href;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (content.some((entry: any) => entry.urls?.some((url: string) => matchesUrl(currentUrl, url)))) {
    initPopup();
  }
})();

function initPopup() {
  const popupFrame = openPopupFrame();

  window.addEventListener('message', (event) => {
    // Verify the origin of the message
    //if (!event.origin.startsWith('chrome-extension://')) { return; }

    switch (event.data.type) {
      case 'open-url-yenoh':
        openOffscreenFrame(event.data.url);
        break;
      case 'close-yenoh':
        popupFrame.setAttribute('style', 'display: none;');
        break;
      default:
        break;
    }
  });
}

function openPopupFrame() {
  const popupFrame = document.createElement('div');
  popupFrame.setAttribute('style', [
    'position: fixed;',
    'top: 8px;',
    'right: 8px;',
    'background: white;',
    'z-index: 100000;',
    'width: 300px;',
    'height: 200px;',
    'border-radius: 8px;',
    'border: none;',
    'box-shadow: 0px 0px 8px currentColor;',
    'overflow: auto;'
  ].join(' '))
  document.body.appendChild(popupFrame);

  ReactDOM.createRoot(popupFrame).render(
    <ShadowRender stylesheet={chrome.runtime.getURL('index.css')}>
      <PopupRoot currentUrl={window.location.href.toString()} />
    </ShadowRender>,
  )

  return popupFrame;
}

async function openOffscreenFrame(url: string) {
  if (!url) {
    throw new Error('silentOpen called without a URL');
  }

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.setAttribute('style', [
    'position: fixed;',
    'top: -200%;',
    'right: -200%;',
    'width: 1px;',
    'height: 1px;'
  ].join(' '))
  document.body.appendChild(iframe);
}