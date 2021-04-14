<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    created: function () {
      window.localStorage.setItem('loginUserId', '')
    }
  }
}
</script>
