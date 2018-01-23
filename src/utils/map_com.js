import Vue from 'vue'
import page from "@/components/page.vue"
import img from "@/components/img.vue"
import Button from "@/components/Button.vue"
import Element from "@/components/Element.vue"
const com = {
  "ui-page": page,
  "ui-img": img,
  "ui-button": Button,
  "ui-element": Element,
}

var install = function(){
  Object.keys(com).forEach((key) => {
    Vue.component(key, com[key])
  })
}

export default install