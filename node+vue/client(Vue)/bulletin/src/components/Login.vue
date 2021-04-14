<template>
<div class="Login">
  <app-nav></app-nav>
  <vue-form :state="formstate" @submit.prevent="onSubmit" class="form-horizontal">
    <div class="form-group">
      <validate tag="label">
        <label class="control-label col-sm-3" for="email">&nbsp;&nbsp;&nbsp;Email:</label>
        <div class="col-sm-6">
          <input type="email" required v-model="email" name="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="col-sm-3">
          <field-messages name="email" class="messages">
            <div slot="required">Email is a required field</div>
            <div slot="email">Email is not valid</div>
          </field-messages>
        </div>
      </validate>
    </div>
    <div class="form-group">
      <validate tag="label">
        <label class="control-label col-sm-3" for="pwd">Password:</label>
        <div class="col-sm-6">
          <input type="password" required :maxlength="15" :minlength="3" v-model="password" name="password" class="form-control" id="pwd" placeholder="Enter password">
        </div>
        <div class="col-sm-3">
          <field-messages name="password" class="messages">
            <div slot="required">Password is a required field</div>
            <div slot="minlength">Password length must be between 3 and 15 </div>
            <div slot="maxlength">Password length must be between 3 and 15 </div>
          </field-messages>
        </div>
      </validate>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-1 col-sm-12">
        <button type="submit" class="btn btn-default">Submit</button>
      </div>
    </div>
  </vue-form>

</div>
</template>

<script>
import axios from 'axios'
import AppNav from '../common/AppNav'
export default {
  name: 'Login',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'Login Page',
      formstate: {},
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.formstate.$invalid) {
        return
      }
      axios.post('/api/user/login', {
        emailAddress: this.email,
        password: this.password})
        .then(response => {
          if (response.data.length > 0) {
            window.localStorage.setItem('loginUserId', response.data[0].user_id)
            window.location.href = '/posts'
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
