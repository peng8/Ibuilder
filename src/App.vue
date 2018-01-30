<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
html, body{
  height: 100%;
  width: 100%;
  overflow: hidden !important;
}
body{
  margin: 0;
}
div{
  box-sizing: border-box;
}
</style>
