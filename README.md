<style>
.icon {
    width: 1em;
    vertical-align: middle;
}
</style>

<div align="center">

<a href="https://now-playing-for-gpm.mizdra.net" title="#NowPlaying for Google Play Music" target="_blank" rel="noopener">
  <img alt="Logo"src=./src/common/img/logo-128.png?raw=true">
</a>


# #NowPlaying for Google Play Music

It's tools to share music playing on Google Play Music / Youtube Music to SNS.

</div>


## Features
- Share your music to **Twitter**
- Support **Google Play Music** and **Youtube Music**
- Customizable template with variable
  - <code>${title}</code>: The title of music
  - <code>${artist}</code>: The artist name of music
  - <code>${album}</code>: The album name of music
  - <code>${playCount}</code>: The play count of music
- Support mobile platform


## Variables supported by each platform

|            Platform            |                        Google Play Music                        |                Youtube Music                |
| :----------------------------: | :-------------------------------------------------------------: | :-----------------------------------------: |
| Desktop <br> (Chrome, Firefox) | `${title}` <br> `${artist}` <br> `${album}` <br> `${playCount}` | `${title}` <br> `${artist}` <br> `${album}` |
|     Android <sup>[1]</sup>     |                   `${title}` <br> `${artist}`                   |         🚫  <br>  Not yet supported         |
|              iOS               |                   🚫  <br>  Not yet supported                   |         🚫  <br>  Not yet supported         |

<sup>[1]</sup> Currently, only Japanese language environment is supported.


## Installation

### Desktop
- [Chrome](https://chrome.google.com/webstore/detail/nowplaying-for-google-pla/nhpanomgefidcljmcmkbanhoomaglmlk)
- [Firefox](https://addons.mozilla.org/ja/firefox/addon/nowplaying-for-google-pla)

### Android

1. Open [now-playing-for-gpm.mizdra.net](https://now-playing-for-gpm.mizdra.net) with Chrome for Android
   1. Tap menu (<img src="./src/common/img/more_vert.svg" alt="Menu Icon" class="icon" />)
   2. Tap <code>Add to Home screen</code> ( Japanese: <code>ホーム画面に追加</code> )
2. Open Google Play Music App for Android
   1. Play your favorite music
   2. Tap menu (<img src="./src/common/img/more_vert.svg" alt="Menu Icon" class="icon" />) in Google Play Music
   3. Select #NowPlaying (<img src="./src/common/img/logo.svg" alt="#NowPlaying Icon" class="icon" />)
   4. Let's Tweet!


## Screenshots

![Screenshot 1](./src/common/img/screenshot1.png?raw=true 'Screenshot 1')
![Screenshot 2](./src/common/img/screenshot2.png?raw=true 'Screenshot 2')
![Screenshot 3](./src/common/img/screenshot3.png?raw=true 'Screenshot 3')
![Screenshot 4](./src/common/img/screenshot4.png?raw=true 'Screenshot 4')
