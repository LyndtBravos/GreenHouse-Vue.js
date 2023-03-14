<template>
<div id="app">
<div class="form2">
    <form @submit.prevent="updateClient()">
      <div class="title">Welcome</div>
      <div class="subtitle">This is the Update Plan Page</div>
      <div class="input-container ic2">
        <input class="input" @input="autoUpdatePremium" v-model="cover" value="this.cover" type="text" placeholder=""/>
        <div class="cut">Plan Cover</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="premium" value="this.premium" type="text" placeholder="" readonly/>
        <div class="cut">Premiums</div><br>
      </div>
      
      <button type="text" class="submit">Update Plan</button>
	  </form>
    <button type="text" @click="deleteClient()" class="submit1">Delete Plan</button>
    <br>
    </div>
</div>

</template>

<script>

import axios from 'axios'
import _ from 'lodash'

export default{
    name: 'PlanPage',
    data(){
        return{
            premium: '',
            cover: ''
        }
    },
    methods: {
        async updateClient(){
            if(localStorage.getItem('premium') === null || localStorage.getItem('premium') === undefined){
              alert('You do not have a plan to update yet')
              this.$router.push('/view')
              return;
            }

            if(isNaN(this.cover)){
              alert('Please type in a proper value for Plan Cover')
              return;
            }
            
            let response = await axios.put(`http://localhost:8081/GreenHouseLife/rest/show/updateClient/${localStorage.getItem('userID')}/${localStorage.getItem('planID')}`, {
                premium: this.premium,
                cover: this.cover
            });

            console.log(response)
            if(response.data == 'Updated User\'s Plan Sucessfully'){
              alert(response.data);
              this.$router.push('/view')
            }else{
              alert('Please type in a valid number for Plan Cover to proceed')
            }
        },
        async deleteClient(){
            console.log('you here dawg')
            if(localStorage.getItem('premium') === null || localStorage.getItem('premium') === undefined){
              alert('You do not have a plan to delete yet')
              this.$router.push('/view')
              return;
            }
            
            let confirmAct = confirm("Are you sure you'd like to delete your plan?");
            if(confirmAct){
                let response = await axios.delete(`http://localhost:8081/GreenHouseLife/rest/show/deleteClient/${localStorage.getItem('userID')}/${localStorage.getItem('planID')}`, {

                });

                localStorage.removeItem("premium")
                localStorage.removeItem("plan")
                localStorage.removeItem("cover")
                localStorage.removeItem("bought")

                alert(response.data)
                this.$router.push('/view')
            }
        },
        async ex(){
            let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/getClient/${localStorage.getItem('planID')}/${localStorage.getItem('userID')}`, {

            });

            this.cover = response.data.cover
            this.premium = response.data.premium
            console.log(response)
            console.log('You running dawg?')
        },
        autoUpdatePremium: _.debounce(function(){
            this.premium = Math.floor(this.cover / (this.cover / (localStorage.getItem('timeframe') * 12) + 150) * 5)
            document.getElementById('value').value = this.premium
            console.log("New premium: " + this.premium)
        }, 1000)
    },
    beforeMount(){
        localStorage.setItem('url', window.location.href)
        this.bought = localStorage.getItem('bought')
        if(localStorage.getItem('user') !== 'null'){
            this.ex()
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

.form2 {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 525px;
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