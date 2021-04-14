<template>
  <div class="User">
      <app-nav></app-nav>
        <vue-form :state="formstate" @submit.prevent="onSubmit" class="form-inline">
          <div class="form-group">
            <label for="user_name">User Name:</label>
            <input type="text" v-model="search_name" class="form-control input-sm" id="user_name">
          </div>
          <button type="submit" class="btn btn-default">Search</button>
          <button type="button" class="btn btn-primary" v-on:click="show"><span class="glyphicon glyphicon-plus"></span>Add</button>
        </vue-form>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email Addrss</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Date Of Birth</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="users && users.length">
            <tr v-for="user of users" class="active">
              <td>{{user.user_id}}</td>
              <td>{{user.user_name}}</td>
              <td>{{user.email_address}}</td>
              <td>{{user.phone_number}}</td>
              <td>{{user.address}}</td>
              <td>{{user.date_of_birth}}</td>
              <td><button type="button" class="btn btn-info" v-on:click="editUser(user.user_id)"><span class="glyphicon glyphicon-edit"></span>Edit</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteUser(user.user_id)"><span class="glyphicon glyphicon-trash"></span>Delete</button></td>
            </tr>
          </tbody>
        </table>
        <modal name="addnewuser" height="auto" :scrollable="true" :pivotY="0">
         <!-- Modal content-->
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" v-on:click="hide">&times;</button>
              <span v-if="edit_state== 'edit'">
                <h4 class="modal-title">Update User</h4>
              </span>
              <span v-else>
                <h4 class="modal-title">Add New User</h4>
              </span>
           </div>
           <div class="modal-body">
             <vue-form :state="addNewUserForm" @submit.prevent="onSubmit">
               <validate tag="label">
                 <div class="form-group">
                 <div class="col-md-8">
                 <label for="user_name">User Name:</label>
                 </div>
                 <div class="col-md-8">
                   <input type="text" v-model="new_user_name" required class="form-control input-sm" id="user_name" name="user_name"  :maxlength="15" :minlength="3">
                 </div>
                 <div class="col-md-4">
                   <field-messages name="user_name" class="messages">
                     <div slot="required">User name is a required field</div>
                     <div slot="minlength">User name must be between 3 and 15 </div>
                     <div slot="maxlength">User name must be between 3 and 15 </div>
                   </field-messages>
                 </div>
                 </div>
               </validate>
               <validate tag="label">
                 <div class="form-group">
                 <div class="col-md-8">
                 <label for="user_name">User Email:</label>
                 </div>
                 <div class="col-md-8">
                   <input type="email" v-model="new_user_email" required class="form-control input-sm" id="email_address" name="email_address">
                 </div>
                 <div class="col-md-4">
                   <field-messages name="email_address" class="messages">
                     <div slot="required">User email is a required field</div>
                     <div slot="email">Email is not valid</div>
                   </field-messages>
                 </div>
                 </div>
                 </validate>
                 <validate tag="label">
                   <div class="form-group">
                   <div class="col-md-8">
                   <label for="user_name">User Password:</label>
                   </div>
                   <div class="col-md-8">
                     <input type="password" v-model="new_user_password" required class="form-control input-sm" id="password" name="password" :maxlength="15" :minlength="3">
                   </div>
                   <div class="col-md-4">
                     <field-messages name="password" class="messages">
                       <div slot="required"> User Password is a required field</div>
                       <div slot="minlength">User name must be between 3 and 15 </div>
                       <div slot="maxlength">User name must be between 3 and 15 </div>
                     </field-messages>
                   </div>
                   </div>
                </validate>
                 <validate tag="label">
                   <div class="form-group">
                   <div class="col-md-8">
                   <label for="password">Phone Number:</label>
                   </div>
                   <div class="col-md-8">
                     <input  type="text" v-model="new_user_phone" required class="form-control input-sm" id="phone_number" name="phone_number" pattern=^(0|[0-9][0-9]*)$>
                   </div>
                   <div class="col-md-4">
                     <field-messages name="phone_number" class="messages">
                       <div slot="required">User Phone is a required field</div>
                       <div slot="pattern">User Phone must be number</div>
                     </field-messages>
                   </div>
                   </div>
                </validate>
                <validate tag="label">
                  <div class="form-group">
                  <div class="col-md-8">
                  <label for="user_name">Address:</label>
                  </div>
                  <div class="col-md-8">
                    <input type="text" v-model="new_user_address" required class="form-control input-sm" id="address" name="address">
                  </div>
                  <div class="col-md-4">
                    <field-messages name="address" class="messages">
                      <div slot="required"> Address is a required field</div>
                    </field-messages>
                  </div>
                  </div>
               </validate>
               <validate tag="label">
                 <div class="form-group">
                 <div class="col-md-8">
                 <label for="user_name">Date Of Birth:</label>
                 </div>
                 <div class="col-md-8">
                   <input type="date" v-model="new_user_birth" required class="form-control input-sm" id="date_of_birth" name="date_of_birth">
                 </div>
                 <div class="col-md-4">
                   <field-messages name="date_of_birth" class="messages">
                     <div slot="required"> Date Of Birth is a required field</div>
                   </field-messages>
                 </div>
                 </div>
              </validate>

               <div class="modal-footer">
                 <button type="button" class="btn btn-default" v-on:click="hide">Close</button>
                 <span v-if="edit_state== 'edit'">
                 <button type="submit" class="btn btn-primary" v-on:click="updateUser(new_user_id)">Update</button>
                 </span>
                 <span v-else>
                   <button type="submit" class="btn btn-primary" v-on:click="saveNewUser">Save</button>
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

var moment = require('moment')

export default {
  name: 'users',
  components: {
    AppNav
  },
  data () {
    return {
      msg: 'User List',
      formstate: {},
      addNewUserForm: {},
      search_name: '',
      new_user_id: '',
      new_user_name: '',
      new_user_email: '',
      new_user_phone: '',
      new_user_address: '',
      new_user_birth: moment(new Date()).format('YYYY-MM-DD'),
      new_user_password: '',
      edit_state: '',
      users: [],
      columns: ['user_id', 'user_name', 'email_address', 'phone_number', 'address', 'date_of_birth']
    }
  },
  options: {

  },
  created () {
    axios.post('/api/user')
    .then(response => {
      this.users = response.data
    })
    .catch(function (error) {
      console.log(error)
      window.location.replace('/login')
    })
  },
  methods: {
    onSubmit () {
      axios.post('/api/searchUser', {
        searchName: this.search_name
      })
      .then(response => {
        this.users = response.data
      })
    },
    show: function () {
      this.$modal.show('addnewuser')
    },
    hide: function () {
      this.new_user_name = ''
      this.new_user_email = ''
      this.new_user_phone = ''
      this.new_user_address = ''
      this.new_user_birth = moment(new Date()).format('YYYY-MM-DD')
      this.new_user_password = ''
      this.edit_state = ''
      this.$modal.hide('addnewuser')
    },
    saveNewUser: function () {
      this.edit_state = ''
      if (this.addNewUserForm.$invalid) {
        // alert user and exit early
        return
      }
      axios.post('/api/addUser', {
        userName: this.new_user_name,
        emailAddress: this.new_user_email,
        password: this.new_user_password,
        phoneNumber: this.new_user_phone,
        address: this.new_user_address,
        dob: moment(this.new_user_birth).format('YYYY-MM-DD')
      })
      .catch(function (error) {
        console.log('Error' + error)
      })
      this.hide()
    },
    editUser: function (data) {
      this.edit_state = 'edit'
      axios.post('/api/selectUserById', {
        id: data
      }).then(response => {
        this.new_user_id = response.data.user_id
        this.new_user_name = response.data.user_name
        this.new_user_email = response.data.email_address
        this.new_user_password = response.data.password
        this.new_user_birth = moment(response.data.date_of_birth).format('YYYY-MM-DD')
        this.new_user_address = response.data.address
        this.new_user_phone = response.data.phone_number
      })
      this.$modal.show('addnewuser')
    },
    updateUser: function (data) {
      if (confirm('are you sure to update') === true) {
        axios.post('/api/updateUser', {
          id: data,
          newUserName: this.new_user_name,
          newEmailAddress: this.new_user_email,
          newPassword: this.new_user_password,
          newPhoneNumber: this.new_user_phone,
          newAddress: this.new_user_address,
          newDob: moment(this.new_user_birth).format('YYYY-MM-DD')
        }).then(response => {
          this.users = response.data
        })
      } else {
        axios.post('/api/user/list')
          .then(response => {
            this.users = response.data
          })
        return
      }
      this.hide()
    },
    deleteUser: function (data) {
      if (confirm('are you sure to delete') === true) {
        this.users.splice(data, 1)
        axios.post('/api/deleteUser', {
          id: data
        }).then(response => {
          this.users = response.data
        })
      } else {
        return
      }
    }
  }
}
</script>
