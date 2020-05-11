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
  #app{
    margin: 0;
    padding: 0;
    width:100%;
    height: 100%;
    position: absolute;
    background-image: url('./assets/bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    font-family: sans-serif;
  }
</style>
