let type = null
let text = ''
let style = {
  iconWrap: '',
  icon: ''
}

function init(param1, param2) {
  type = param1
  text = param2

  getStyle()

  let div;
  if(!document.getElementById('alert-message-wrap')){
    div = document.createElement("div")
    div.setAttribute('id', 'alert-message-wrap')
  }else{
    div = document.getElementById('alert-message-wrap')
  }

  let id = 'msg' + (new Date()).getTime()
  div.innerHTML = div.innerHTML + 
    `<div class="alert-message" id="${id}">
      <span class="icon ${style.iconWrap}">
        <i class="fas ${style.icon}"></i>
      </span>
      <p class="${style.iconWrap}">${text}</p>
    </div>`
  document.getElementsByTagName("body")[0].appendChild(div)

  setTimeout(function(){
    document.getElementById('alert-message-wrap').removeChild(document.getElementById(id))
  },2000)
}

function getStyle() {
  switch (type) {
    case 'success':
      style.iconWrap = 'has-text-success'
      style.icon = 'fa-check-square'
      break
    case 'danger':
      style.iconWrap = 'has-text-danger'
      style.icon = 'fa-ban'
      break
    case 'warning':
      style.iconWrap = 'has-text-warning'
      style.icon = 'fa-exclamation-triangle'
      break
    case 'info':
    default:
      style.iconWrap = 'has-text-info'
      style.icon = 'fa-info-circle'
      break

  }
}

export default {
  success: function (text) {
    init('success', text)
  },
  danger: function (text) {
    init('danger', text)
  },
  warning: function (text) {
    init('warning', text)
  },
  info: function (text) {
    init('info', text)
  }
}
