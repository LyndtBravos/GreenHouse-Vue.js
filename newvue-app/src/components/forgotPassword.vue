<template>
<div id="app">
    Hello
<div class="formF">
    <form>
      <div class="subtitle"><h3 style="color: whitesmoke">Forgot Password Page</h3></div>
      <div class="input-container ic2">
        <input class="input" v-model="email" value="this.otp" type="text" placeholder="" readonly/>
        <div class="cut">Email</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="password" type="password" placeholder=""/>
        <div class="cut">Password</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="password2" type="password" placeholder=""/>
        <div class="cut">Password</div><br>
      </div>
      
      <button type="text" @click="forget()" class="submit">Update Password</button>
	  
    <br>
    </form>
    </div>
</div>

</template>

<script>
import axios from 'axios'
export default{
    name: 'forgotPassword',
    email: localStorage.getItem('otp-email'),
    methods: {
        async forget(){
            if(this.password == this.password2){
                await axios.put(`http://localhost:8081/GreenHouseLife/rest/show/forgotPassword/${this.email}`,{
                    password: this.password
                });
                alert('Password updated successfully')
                this.$router.push('/authentication')
                localStorage.clear()
                localStorage.setItem('user', null)
            }else{
                alert('Passwords entered do not match')
            }
        },
        function() {
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }
            this.email = localStorage.getItem('otp-email');
        }
    },
    beforeMount(){
        localStorage.setItem('url', window.location.href)
        if(localStorage.getItem('otp-email') === null){
            this.$router.push('/')
        }else{
            this.function()
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

.formF {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
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
  color: white;
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

.submit1 {
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

.submit1:active {
  background-color: tomato;
}

</style>