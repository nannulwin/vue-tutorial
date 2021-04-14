<template>
<div>
  <app-nav></app-nav>
  <div>
    <h1>{{ msg }}</h1>
    <vue-form :state="formstate" @submit.prevent="onSubmit" class="form-inline">
      <div class="form-group">
        <label for="post_name">Post Name:</label>
        <input type="text" v-model="search_name" class="form-control input-sm" id="post_name">
      </div>
      <button type="submit" class="btn btn-default">Search</button>
      <button type="button" class="btn btn-primary" v-on:click="show"><span class="glyphicon glyphicon-plus"></span>Add</button>
    </vue-form>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Post Name</th>
            <th>Post Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="posts && posts.length">
          <tr v-for="post of posts" class="active">
            <td>{{post.bulletin_board_id}}</td>
            <td>{{post.post_name}}</td>
            <td>{{post.post_description}}</td>
            <td>{{post.start_date}}</td>
            <td>{{post.end_date}}</td>
            <td><button type="button" v-on:click="editPost(post.bulletin_board_id)" class="btn btn-info"><span class="glyphicon glyphicon-edit"></span>Edit</button>
              <button type="button" v-on:click="deletePost(post.bulletin_board_id)" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--<v-client-table :data="tableData" :columns="columns"></v-client-table>-->
  </div>
  <modal name="addnewpost" height="auto" :scrollable="true" :pivotY="0">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" v-on:click="hide">&times;</button>
        <span v-if="edit_state== 'edit'">
        <h4 class="modal-title">Update Post</h4>
        </span>
        <span v-else>
        <h4 class="modal-title">Add New Post</h4>
        </span>
      </div>
      <div class="modal-body">
        <vue-form :state="addNewPostForm" @submit.prevent="onSubmit">
          <validate tag="label">
            <div class="form-group">
              <div class="col-md-8">
                <label for="post_name">Post Name:</label>
              </div>
              <div class="col-md-8">
                <input type="text" v-model="new_post_name" required class="form-control input-sm" id="post_name" name="post_name">
              </div>
              <div class="col-md-4">
                <field-messages name="post_name" class="messages">
                  <div slot="required">Post name is a required field</div>
                </field-messages>
              </div>
            </div>
          </validate>
          <validate tag="label">
            <div class="form-group">
              <div class="col-md-8">
                <label for="post_description">Post Description:</label>
              </div>
              <div class="col-md-8">
                <input type="text" v-model="new_post_description" required class="form-control input-sm" id="post_description" name="post_description">
              </div>
              <div class="col-md-4">
                <field-messages name="post_description" class="messages">
                  <div slot="required">Post description is a required field</div>
                </field-messages>
              </div>
            </div>
          </validate>
          <div class="form-group row">
            <div class="col-xs-4">
              <label for="start_date">Start Date:</label>
              <input type="date" v-model="new_start_date" class="form-control input-sm" id="start_date">
            </div>
            <div class="col-xs-4">
              <label for="end_date">End Date:</label>
              <input type="date" v-model="new_end_date" class="form-control input-sm" id="end_date">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" v-on:click="hide">Close</button>
            <span v-if="edit_state== 'edit'">
            <button type="submit" class="btn btn-primary" v-on:click="updatePost(new_post_id)">Save Changes</button>
            </span>
            <span v-else>
            <button type="submit" class="btn btn-primary" v-on:click="saveNewPost">Save</button>
            </span>
          </div>
        </vue-form>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import axios from 'axios'
import AppNav from '../common/AppNav'

var loginUserId = window.localStorage.getItem('loginUserId')
var moment = require('moment')

export default {
  name: 'posts',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'Posts',
      formstate: {},
      addNewPostForm: {},
      search_name: '',
      new_post_id: '',
      new_post_name: '',
      new_post_description: '',
      new_start_date: moment(new Date()).format('YYYY-MM-DD'),
      new_end_date: moment(new Date()).format('YYYY-MM-DD'),
      edit_state: '',
      date: new Date(),
      posts: [],
      columns: ['user_id', 'post_name', 'post_description', 'start_date', 'end_date']
    }
  },
  options: {

  },
  created () {
    axios.post('/api/bulletin_board/showPost', {
      loginUserId: loginUserId
    })
      .then(response => {
        this.posts = response.data
      })
      .catch(function (error) {
        console.log(error)
        window.location.replace('/login')
      })
  },
  methods: {
    onSubmit () {
      axios.post('/api/bulletin_board/searchPost', {
        postName: this.search_name,
        loginUserId: loginUserId
      })
        .then(response => {
          this.posts = response.data
        })
    },
    show: function () {
      this.$modal.show('addnewpost')
    },
    hide: function () {
      console.log('edit state' + this.edit_state)
      this.new_post_name = ''
      this.new_post_description = ''
      this.new_start_date = moment(new Date()).format('YYYY-MM-DD')
      this.new_end_date = moment(new Date()).format('YYYY-MM-DD')
      this.edit_state = ''
      this.$modal.hide('addnewpost')
    },
    saveNewPost: function () {
      this.edit_state = ''
      if (this.addNewPostForm.$invalid) {
        // alert user and exit early
        return
      }
      axios.post('/api/bulletin_board/addPost', {
        loginUserId: loginUserId,
        postName: this.new_post_name,
        postDescription: this.new_post_description,
        startDate: moment(this.new_start_date).format('YYYY-MM-DD'),
        endDate: moment(this.new_end_date).format('YYYY-MM-DD')
      }).then(response => {
        this.posts = response.data
      })
      .catch(function (error) {
        console.log('Error' + error)
      })
      this.hide()
    },
    editPost: function (data) {
      this.edit_state = 'edit'
      axios.post('/api/bulletin_board/selectPostById', {
        loginUserId: loginUserId,
        id: data
      }).then(response => {
        this.new_post_id = response.data.bulletin_board_id
        this.new_post_name = response.data.post_name
        this.new_post_description = response.data.post_description
        this.new_start_date = moment(response.data.start_date).format('YYYY-MM-DD')
        this.new_end_date = moment(response.data.end_date).format('YYYY-MM-DD')
      })
      this.$modal.show('addnewpost')
    },
    updatePost: function (data) {
      if (confirm('are you sure to update') === true) {
        axios.post('/api/bulletin_board/updatePost', {
          id: data,
          loginUserId: loginUserId,
          postName: this.new_post_name,
          postDescription: this.new_post_description,
          startDate: moment(this.new_start_date).format('YYYY-MM-DD'),
          endDate: moment(this.new_end_date).format('YYYY-MM-DD')
        }).then(response => {
          this.posts = response.data
        })
      } else {
        axios.post('/api/bulletin_board/showPost', {
          loginUserId: loginUserId
        })
          .then(response => {
            this.posts = response.data
          })
        return
      }
      this.hide()
    },
    deletePost: function (data) {
      this.posts.splice(data, 1)
      axios.post('/api/bulletin_board/deletePost', {
        id: data,
        loginUserId: loginUserId
      }).then(response => {
        this.posts = response.data
      })
    }
  }
}
</script>
