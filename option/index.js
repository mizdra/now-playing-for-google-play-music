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

  async function restoreOptions() {
    const { template, hashtags } = await getConfig()
    $template.value = template
    $hashtags.value = hashtags
  }

  async function saveOptions() {
    const template = $template.value;
    const hashtags = $hashtags.value;
    await setConfig({ template, hashtags })
    showActionMessage('Saved!')
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
