<template>
  <Header />
  <router-view/>
  <footer>
    <p>Coded with &#10084;&#65039; by SexyCoders &copy; {{ new Date().getFullYear() }}</p>
  </footer>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Exo+2');

#app {
  background-color: #F8F8F8 !important;
  font-family: 'Exo 2', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

footer {
  position: relative;
  z-index: 1;
  color: #2c3539;
  background-color: #F8F8F8;
  margin-bottom: 0;

  p {
    text-align: center;
  }
}
</style>