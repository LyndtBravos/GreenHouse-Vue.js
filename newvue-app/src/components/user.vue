<template>
<div id="app">
    <br><br><br><br><br>
    <div class="form1">
    <form @submit.prevent="updateUser()">
      <div class="title">Welcome</div>
      <div class="subtitle">This is the Update User Page</div>
      <!-- <div class="input-container ic1">
        <input class="input" type="text" v-model="id" placeholder="" readonly/>
        <div class="cut">User ID</div>
      </div> -->
      <div class="input-container ic2">
        <input class="input" type="text" v-model="name" placeholder="" />
        <div class="cut">First Name</div>
      </div>
      <div class="input-container ic2">
        <input class="input" type="text" v-model="surname" placeholder="" />
        <div class="cut">Last Name</div>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="email" type="text" placeholder="" />
        <div class="cut cut-short">Email</div>
      </div>
      <button type="submit" class="submit">Update User</button>
    <br>
    </form>
    </div>
    <br>
</div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'UserPage',
    data(){
        return{
            name: '',
            surname: '',
            email: '',
            password: '',
            password2: '',
            id: '',
            first: '',
            last: ''

        }
    },
    methods:{
        async updateUser(){
            let response = await axios.put(`http://localhost:8081/GreenHouseLife/rest/show/updateUser/${this.id}`, {
                name: this.name,
                surname: this.surname,
                email: this.email
            });
            localStorage.setItem('username', this.name)
            localStorage.setItem('userlast', this.surname)
            localStorage.setItem('useremail', this.email)
            console.log(response)
            alert(response.data)
            if(response.data === 'Updated User Successfully'){
              this.$router.push('/view')
            }
        },
        getValues(){
            this.id = localStorage.getItem('userID')
            this.name = localStorage.getItem('username')
            this.surname = localStorage.getItem('surname')
            this.email = localStorage.getItem('useremail')

            console.log(this.id)
            console.log(this.name)
            console.log(this.surname)
            console.log(this.email)

        },
        function() {
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }
        }
    },
    beforeMount(){
        localStorage.setItem('url', window.location.href)
        this.getValues();
        this.function();
        if(localStorage.getItem('user') !== 'null'){
            this.getValues()
            this.function()
        }else{
            this.$router.push('/')
        }
    }
}
</script>

<style>
body {
  align-items: center;
  background-color: tomato;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.form1 {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  /* height: 625px; */
  padding: 20px;
  width: 400px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  outline: 0;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

</style>