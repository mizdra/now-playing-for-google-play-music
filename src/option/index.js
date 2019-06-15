window.addEventListener('load', () => {
  const $gpmTemplate = document.getElementById('gpm-template')
  const $ytmTemplate = document.getElementById('ytm-template')
  const $hashtags = document.getElementById('hashtags')
  const $save = document.getElementById('save')
  const $actionMessage = document.getElementById('action-message')
  init()

  function init() {
    restoreOptions()
    $gpmTemplate.setAttribute('placeholder', DEFAULT_TEMPLATE)
    $ytmTemplate.setAttribute('placeholder', DEFAULT_TEMPLATE)
    $hashtags.setAttribute('placeholder', DEFAULT_HASHTAGS)
    $save.addEventListener('click', () => saveOptions())
  }

  async function restoreOptions() {
    const { gpmTemplate, ytmTemplate, hashtags } = await getConfig()
    $gpmTemplate.value = gpmTemplate
    $ytmTemplate.value = ytmTemplate
    $hashtags.value = hashtags
  }

  async function saveOptions() {
    const gpmTemplate = $gpmTemplate.value
    const ytmTemplate = $ytmTemplate.value
    const hashtags = $hashtags.value
    await setConfig({ gpmTemplate, ytmTemplate, hashtags })
    showActionMessage('Saved!')
  }

  function showActionMessage(actionMessage) {
    $actionMessage.textContent = actionMessage
    $actionMessage.classList.add('active')
    setTimeout(() => {
      $actionMessage.textContent = ''
      $actionMessage.classList.remove('active')
    }, 1000)
  }
})
