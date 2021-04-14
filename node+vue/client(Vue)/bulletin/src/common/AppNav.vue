<template>
  <div class="app-nav">
    <div v-if="visible == ''">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">

        </div>
      </nav>
    </div>
    <div v-else>
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="/">Bulletin Board</a>
          </div>
          <ul class="nav navbar-nav">
            <li v-bind:class="{ active:isHome }"><a href="/">Home</a></li>
            <li v-bind:class="{ active:isUser }"><a href="/user">User List</a></li>
            <li v-bind:class="{ active:isPosts }"><a href="/posts">Post List</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/login" v-on:click="logout"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
var loginUserId = window.localStorage.getItem('loginUserId')
export default {
  name: 'app-nav',
  data () {
    return {
      isHome: false,
      isUser: false,
      isPosts: false
    }
  },
  created () {
    if (window.location.href.endsWith('login')) {
      this.visible = ''
    } else {
      this.visible = loginUserId
    }
    if (window.location.href.endsWith('user')) {
      this.isUser = true
    } else if (window.location.href.endsWith('posts')) {
      this.isPosts = true
    } else {
      this.isHome = true
    }
  },
  methods: {
    logout: function () {
      window.localStorage.setItem('loginUserId', '')
      this.visible = ''
    }
  }
}
</script>
