import { loadConfig } from '../../js/repository';
import { renderText, renderURL, sleep } from '../../../common/js/util';
import './content.css';

// 再生中の曲を SNS で共有する
async function share() {
  const title = document.querySelector('ytmusic-player-bar .title')!.textContent;
  const [artist = '', album = ''] = Array.from(document.querySelectorAll('ytmusic-player-bar .subtitle a')).map(
    (a) => a.textContent,
  );
  const { ytmTemplate, hashtags } = await loadConfig();

  const text = renderText(ytmTemplate, { title, artist, album });
  const url = renderURL(text, hashtags);

  window.open(url);
}

// DOM の構築完了を待ってから共有ボタンをプレイヤー (画面下部の操作バー) に挿入
function insertShareButton() {
  const rightControlsButtons = document.querySelector('ytmusic-player-bar .right-controls-buttons')!; // 右下のツールボックス

  // 共有ボタンを作成
  const shareButton = document.createElement('tp-yt-paper-icon-button');
  shareButton.setAttribute('class', 'share style-scope ytmusic-player-bar');
  shareButton.setAttribute('icon', 'yt-icons:share');
  shareButton.setAttribute('title', 'Share music to SNS');
  shareButton.setAttribute('aria-label', 'Share music to SNS');
  shareButton.setAttribute('role', 'button');
  shareButton.setAttribute('tabindex', '0');
  shareButton.setAttribute('aria-disabled', 'false');
  shareButton.addEventListener('click', () => share());

  // 音量調整ボタンとキューボタンの間に挿入
  rightControlsButtons.appendChild(shareButton);

  const expandingMenu = document.querySelector('#expanding-menu')!; // 画面幅が小さい時に表示されるメニュー

  const expandShareButton = document.createElement('tp-yt-paper-icon-button');
  expandShareButton.setAttribute('id', 'expand-share');
  expandShareButton.setAttribute('class', 'expand-share style-scope ytmusic-player-bar');
  expandShareButton.setAttribute('slot', 'elements');
  expandShareButton.setAttribute('icon', 'yt-icons:share');
  expandShareButton.setAttribute('title', 'Share music to SNS');
  expandShareButton.setAttribute('aria-label', 'Share music to SNS');
  expandShareButton.setAttribute('role', 'button');
  expandShareButton.setAttribute('tabindex', '0');
  expandShareButton.setAttribute('aria-disabled', 'false');
  expandShareButton.addEventListener('click', () => share());

  // expanding-menu の最後に挿入
  expandingMenu.appendChild(expandShareButton);
}

// プレイヤーが読み込まれるまで待機する
async function waitPlayerLoaded() {
  let count = 0;
  while (count < 30) {
    console.log(count);
    // #right-controls-buttons が読み込まれたら, プレイヤーが読み込まれたものとして扱う
    if (document.querySelector('ytmusic-player-bar .right-controls-buttons')) {
      return;
    }
    await sleep(1000);
    count++;
  }
  throw new Error('`ytmusic-player-bar .right-controls-buttons` is not found.');
}

// DOMContentLoaded の後もDOMが動的に挿入されていくので,
// プレイヤー が読み込まれるまでポーリングして, 挿入された
// タイミングで insertShareButton を呼び出す.
waitPlayerLoaded().then(insertShareButton).catch(console.error);
