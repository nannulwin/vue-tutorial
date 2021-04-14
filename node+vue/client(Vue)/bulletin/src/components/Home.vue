<template>
<div class="Home">
  <app-nav></app-nav>
  <div class="panel panel-info">
    <div class="panel-heading">{{msg}}</div>
    <div class="panel-body">{{post.post_description}}</div>
    <div class="panel-body">{{post.post_name}}</div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import AppNav from '../common/AppNav'
var loginUserId = window.localStorage.getItem('loginUserId')
export default {
  name: 'Home',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'New Posts',
      post: []
    }
  },
  created () {
    axios.post('/api/bulletin_board/showPost', {
      loginUserId: loginUserId
    })
      .then(response => {
        this.post = response.data[response.data.length - 1]
      })
      .catch(function (error) {
        console.log(error)
        window.location.replace('/login')
      })
  }
}
</script>
