const DEFAULT_TEMPLATE = '${title} / ${artist}'
const DEFAULT_HASHTAGS = 'NowPlaying'

window.addEventListener('load', () => {
  const $template = document.getElementById('template')
  const $hashtags = document.getElementById('hashtags')
  const $save = document.getElementById('save')
  const $actionMessage = document.getElementById('action-message')
  init()

  function init() {
    restoreOptions()
    $template.setAttribute('placeholder', DEFAULT_TEMPLATE)
    $hashtags.setAttribute('placeholder', DEFAULT_HASHTAGS)
    $save.addEventListener('click', () => saveOptions())
  }

  function restoreOptions() {
    chrome.storage.sync.get({
      template: DEFAULT_TEMPLATE,
      hashtags: DEFAULT_HASHTAGS,
    }, ({ template, hashtags }) => {
      $template.value = template
      $hashtags.value = hashtags
    })
  }

  function saveOptions() {
    const template = $template.value;
    const hashtags = $hashtags.value;
    chrome.storage.sync.set({ template, hashtags }, () => showActionMessage('Saved!'))
  }
  
  function showActionMessage(actionMessage) {
    $actionMessage.textContent = actionMessage
    $actionMessage.classList.add('active')
    setTimeout(() => {
      $actionMessage.textContent = '';
      $actionMessage.classList.remove('active')
    }, 1000)
  }
  
})
