import { getConfig, setConfig } from './config'
import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS } from '../../common/js/util'

window.addEventListener('load', () => {
  const $gpmTemplate = document.querySelector<HTMLTextAreaElement>(
    '#gpm-template',
  )!
  const $ytmTemplate = document.querySelector<HTMLTextAreaElement>(
    '#ytm-template',
  )!
  const $hashtags = document.querySelector<HTMLInputElement>('#hashtags')!
  const $save = document.querySelector<HTMLButtonElement>('#save')!
  const $actionMessage = document.querySelector('#action-message')!
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

  function showActionMessage(actionMessage: string) {
    $actionMessage.textContent = actionMessage
    $actionMessage.classList.add('active')
    setTimeout(() => {
      $actionMessage.textContent = ''
      $actionMessage.classList.remove('active')
    }, 1000)
  }
})
