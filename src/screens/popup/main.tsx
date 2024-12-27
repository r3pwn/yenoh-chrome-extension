import ReactDOM from 'react-dom/client'
import PopupRoot from './root.tsx'
import { matchesUrl } from '@/utils.ts';
import ShadowRender from '@/components/misc/shadow-render.tsx';
import { AffiliateSite } from '@/types/data.ts';

const SESSION_BLOCKER = 'yenoh-prevent-open';

function getResourceContent<T = unknown>(fileName: string) {
  return fetch(chrome.runtime.getURL(fileName))
    .then(resp => resp.json() as T);
}

function matchesEntry(currentUrl: string, entry: AffiliateSite) {
  return matchesUrl(currentUrl, entry.transaction_complete_url) || entry.urls?.some((url) => matchesUrl(currentUrl, url));
}

(async () => {
  const content = await getResourceContent<AffiliateSite[]>("affiliateLinks.json");
  const currentUrl = window.location.href;

  const affiliateSite = content.find((entry: AffiliateSite) => matchesEntry(currentUrl, entry));

  if (matchesUrl(currentUrl, affiliateSite?.transaction_complete_url || '')) {
    sessionStorage.removeItem(SESSION_BLOCKER);
    return;
  } else if (sessionStorage.getItem(SESSION_BLOCKER) === 'true') {
    return;
  }

  if (affiliateSite) {
    initPopup(affiliateSite);
  }
})();

function initPopup(entry: AffiliateSite) {
  const popupFrame = openPopupFrame(entry);

  window.addEventListener('message', (event) => {
    // Verify the origin of the message
    //if (!event.origin.startsWith('chrome-extension://')) { return; }

    switch (event.data.type) {
      case 'open-url-yenoh':
        openOffscreenFrame(event.data.url);
        break;
      case 'close-yenoh':
        popupFrame.setAttribute('style', 'display: none;');
        sessionStorage.setItem(SESSION_BLOCKER, 'true');
        break;
      default:
        break;
    }
  });
}

function openPopupFrame(entry: AffiliateSite) {
  const popupFrame = document.createElement('div');
  popupFrame.setAttribute('style', [
    'position: fixed;',
    'top: 8px;',
    'right: 8px;',
    'background: white;',
    'z-index: 100000;',
    'width: 300px;',
    'height: 150px;',
    'border-radius: 8px;',
    'border: none;',
    'box-shadow: 0px 0px 8px currentColor;',
    'overflow: auto;'
  ].join(' '))
  document.body.appendChild(popupFrame);

  ReactDOM.createRoot(popupFrame).render(
    <ShadowRender stylesheet={chrome.runtime.getURL('index.css')}>
      <PopupRoot site={entry} />
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