import { DEFAULT_HASHTAGS, DEFAULT_TEMPLATE } from '../src/common/js/config';
import { renderText, renderURL } from '../src/common/js/util';

/**
 * @file 拡張機能の E2E テスト。mock などは一切使わず、`--load-extension` で拡張機能ごと読み込ませてテストしている。
 */

beforeAll(async () => {
  await context.tracing.start({ screenshots: true, snapshots: true });
});

beforeEach(async () => {
  // 何故か毎回 page を作り直さないと上手く動かないので作り直す
  await jestPlaywright.resetPage();
});

afterAll(async () => {
  await context.tracing.stop({ path: 'e2e-dist/trace.zip' });
  // 何故か手動で close しないと jest が終了しないので close する
  await page.close();
  await context.close();
});
test('共有ボタンが表示される', async () => {
  // 適当な曲の再生ページにアクセス
  await page.goto('https://music.youtube.com/watch?v=v_L248Ibozg');

  // 各種ボタンが DOM に挿入されるまで待機
  const shareButton = await page.waitForSelector('[data-testid="share-button"]', { state: 'attached' });
  const expandShareSutton = await page.waitForSelector('[data-testid="expand-share-button"]', { state: 'attached' });

  // 画面幅に応じて要素の表示・非表示が切り替わることを assert
  await page.setViewportSize({ width: 1150, height: 800 });
  expect(await shareButton.isVisible()).toEqual(true);
  expect(await expandShareSutton.isVisible()).toEqual(false);

  await page.setViewportSize({ width: 1149, height: 800 });
  expect(await shareButton.isVisible()).toEqual(false);
  expect(await expandShareSutton.isVisible()).toEqual(false);

  await page.hover('.expand-button');
  expect(await shareButton.isVisible()).toEqual(false);
  expect(await expandShareSutton.isVisible()).toEqual(true);
});

test('共有ボタンを押すと Twitter intent が開く', async () => {
  // 適当な曲の再生ページにアクセス
  await page.goto('https://music.youtube.com/watch?v=v_L248Ibozg');

  // 各種ボタンが DOM に挿入されるまで待機
  const shareButton = await page.waitForSelector('[data-testid="share-button"]', { state: 'attached' });

  // ボタンを押して、Twitter intent が開くまで待機
  const [newPage] = await Promise.all([context.waitForEvent('page'), shareButton.click()]);

  // 開いたページの URL が期待するものであることを確認
  const text = renderText(DEFAULT_TEMPLATE, {
    title: '青空のつくりかた',
    artist: '情報処理部',
    album: 'きらめきっ!の日/青空のつくりかた',
  });
  const url = renderURL(text, DEFAULT_HASHTAGS);
  expect(newPage.url()).toEqual(url);
  await newPage.close();
});
