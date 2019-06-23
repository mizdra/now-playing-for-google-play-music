import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'

function useInstalled() {
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    window.addEventListener(
      'beforeinstallprompt',
      async () => {
        if (!('getInstalledRelatedApps' in navigator)) return
        const relatedApps = await (navigator as any).getInstalledRelatedApps()
        if (relatedApps.length > 0) setInstalled(true)
      },
      { once: true },
    )
  }, [])

  return installed
}

export function Top() {
  const installed = useInstalled()

  return (
    <div>
      <div class="welcome">
        <img src="/img/logo.svg" alt="アプリのロゴ" />
        <h1>#NowListening for Google Play Music</h1>
        {installed && (
          <a class="button" href="/config">
            設定を変更
          </a>
        )}
      </div>
      <div class="container">
        <main>
          <section>
            <h2>What's this?</h2>
            <p>
              It's tools to share music playing on Google Play Music / Youtube
              Music to SNS.
            </p>

            <h2>What platform supported?</h2>
            <ul>
              <li>
                <a href="https://chrome.google.com/webstore/detail/nowplaying-for-google-pla/nhpanomgefidcljmcmkbanhoomaglmlk">
                  Chrome for Desktop
                </a>
              </li>
              <li>
                <a href="https://addons.mozilla.org/ja/firefox/addon/nowplaying-for-google-pla/">
                  Firefox for Desktop
                </a>
              </li>
              <li>
                <a href="/#how-to-install">Chrome for Android</a>
              </li>
            </ul>

            <h2 name="how-to-install">
              How do you install the version of Chrome for Android?
            </h2>
            <ol>
              <li>Open this page with Chrome for Android</li>
              <ol>
                <li>
                  Tap menu (
                  <img src="/img/more_vert.svg" alt="Menu Icon" class="icon" />)
                </li>
                <li>
                  Tap <code>Add to Home screen</code> ( Japanese:{' '}
                  <code>ホーム画面に追加</code> )
                </li>
              </ol>
              <li>Open Google Play Music App for Android</li>
              <ol>
                <li>Play your favorite music</li>
                <li>
                  Tap menu (
                  <img src="/img/more_vert.svg" alt="Menu Icon" class="icon" />)
                  in Google Play Music
                </li>
                <li>
                  Select #NowPlaying (
                  <img
                    src="/img/logo.svg"
                    alt="#NowPlaying Icon"
                    class="icon"
                  />
                  )
                </li>
                <li>Let's Tweet!</li>
              </ol>
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
