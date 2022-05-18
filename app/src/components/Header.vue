
<template>
  <div class="container-flex">
    <nav class="navbar navbar-light">
      <div class="dropdown d-xl-none d-lg-none mr-auto">
        <!-- <img src="https://png.icons8.com/windows/32/000000/menu.png" data-toggle="dropdown" data-target="#navd" aria-haspopup="true" aria-expanded="false"> -->
        <div class="dropdown-menu hb" aria-labelledby="navd">
          <router-link class="dropdown-item" to="/">Home</router-link>
          <router-link class="dropdown-item" to="/containers">Containers</router-link>
        </div>
      </div>
      <!--Logo-->
      <a class="navbar-brand py-0 pl-5">
        <h1>Revelations</h1>
      </a>
      <!--Header navigation-->
      <span class="navbar-item bc d-none d-xl-block d-lg-block py-0">
        <router-link class="pl-5" to="/">Home</router-link>
        <router-link class="px-5" to="/containers">Containers</router-link>
      </span>

      <div class="navbar-item ml-auto" style="margin-right: 1.5rem;">
        <b-button variant="outline-secondary" v-on:click="goToMongoExpress">Database</b-button>
        <b-button style="margin-left: .5rem" variant="outline-danger" v-on:click="logout">Logout</b-button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    goToMongoExpress() {
      window.location.href = 'http://localhost:8081/';
    },
    logout() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
nav {
  z-index: 100;
}
.navbar {
  border-bottom: 1px solid #DCDCDC;
  background-color: #F8F8F8;
}
.close {
  position: relative;
  bottom: 20px;
  left: 10px;
  font-size: 31px;
  color: #000;
}
$active_color: #FFD700;
.navbar-item.bc {
  a {
    font-size: 17px;
    text-decoration: none;
    color: black;
    &:hover {
      color: $active_color;
    }
    &:active {
      color: $active_color;
    }
  }
}
.navbar-brand {
  margin-left: 1.5rem;
  user-select: none;
}
</style>