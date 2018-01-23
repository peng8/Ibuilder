import Vue from 'vue'
import page from "@/components/page.vue"
import Element from "@/components/Element.vue"

import Img from "@/components/img.vue"
import Button from "@/components/Button.vue"
import Input from "@/components/Input.vue"
import Text from "@/components/Text.vue"

import ButtonEditor from "@/components/edit/ButtonEditor.vue"
import InputEditor from "@/components/edit/InputEditor.vue"
import ImgEditor from "@/components/edit/ImgEditor.vue"
import TextEditor from "@/components/edit/TextEditor.vue"

const com = {
  "ui-element": Element,
  "ui-page": page,
  "ui-img": Img,
  "ui-button": Button,
  "ui-text": Text,
  "ui-input": Input,
  
  "ui-buttonEditor": ButtonEditor,
  "ui-imgEditor": ImgEditor,
  "ui-inputEditor": InputEditor,
  "ui-textEditor": TextEditor,
}

var install = function(){
  Object.keys(com).forEach((key) => {
    Vue.component(key, com[key])
  })
}

export default install