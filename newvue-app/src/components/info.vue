<template>
<div id="app">

<div class="formB" v-if="this.kdot == 'null' || this.kdot == 'undefined'">
    <form @submit.prevent="createSubmit()">
      <div class="title">Welcome</div>
      <div class="subtitle">This is the Add Info Page</div>
      <div class="input-container ic2">
        <input class="input" v-model="dob" type="text" placeholder="yyyy-MM-dd"/>
        <div class="cut">DOB</div><br>
      </div>
      <div class="input-container ic2">
        <input v-model="dependency" class="input" placeholder="true/false">
        <div class="cut">Dependencies</div><br>
      </div>
      <div class="input-container ic2">
        <input v-model="gender" class="input" placeholder="">
        <div class="cut">Gender</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="income" type="text" placeholder=""/>
        <div class="cut">Income</div><br>
      </div>
    <br>
    <button type="text" class="submit">Add User Info</button>
   </form>
</div>

<div class="formA" v-if="this.kdot != 'undefined' && this.kdot != 'null'">
    <form  @submit.prevent="updateSubmit()">
      <div class="title">Welcome</div>
      <div class="subtitle">This is the Update Info Page</div>
      <div class="input-container ic2">
        <input class="input" v-model="date" value="this.date" type="text" placeholder=""/>
        <div class="cut">DOB</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="dependency" value="this.dependency" type="text" placeholder=""/>
        <div class="cut">Dependencies</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="gender" value="this.gender" type="text" placeholder=""/>
        <div class="cut">Gender</div><br>
      </div>
      <div class="input-container ic2">
        <input class="input" v-model="income" value="this.income" type="text" placeholder=""/>
        <div class="cut">Income</div><br>
      </div>
    <br>
    <button type="text" class="submit">Update User Info</button>
   </form>
</div>

</div>

</template>

<script>
import axios from 'axios'

export default{
    name: 'PlanPage',
    data(){
        return{
            id: '',
            kdot: localStorage.getItem('dob'),
            dob: '',
            dependency: '',
            gender: '',
            income: '',
            date: '',
            dep: '',
            gen: '',
            inc: '',
            arr: null
        }
    },
    methods: {
        async updateSubmit(){
            console.log("Hey: " + this.income !== localStorage.getItem('income'))
            console.log("Hey: " + this.date !== localStorage.getItem('dob'))

            if(isNaN(this.income)){
              alert('Please type in a proper value for Gross Income')
              return;
            }
            
            let update = await axios.put(`http://localhost:8081/GreenHouseLife/rest/show/updatePlan/${localStorage.getItem('planID')}/${this.dependency}`, {
                dOB: this.date,
                gender: this.gender,
                income: this.income
            });
            console.log(update)
            alert(update.data)
            if(update.data === 'Updated Info Successfully'){
              this.$router.push('/view')
            }
        },
        async createSubmit(){
            // if(!Number.isInteger(this.income)){
            //   alert('Please type in a proper value for Gross Income')
            //   return;
            // }
            
            let response = await axios.post(`http://localhost:8081/GreenHouseLife/rest/show/addPlan/${localStorage.getItem('userID')}/${this.dependency}`, {
                dOB: this.dob,
                gender: this.gender,
                income: this.income
            })
            alert(response.data);
            if(response.data === 'Added The New Info Under User Successfully'){
              this.$router.push('/view')
            }            
        },
        async getValues(){
            if(this.kdot != undefined){
                let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/myPlan/${localStorage.getItem('planID')}`, {

            })
            console.log('Successsful for getPlan values')
            console.log(response)

            this.arr = response.data;

            this.id = response.data.iD;
            this.date = response.data.dOB;
            this.dep = response.data.iD;
            this.gen = response.data.gender;
            this.income = response.data.income;
            }
        },
        function() {
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }

            console.log("Do you arrive here")
            console.log(this.radio)
            console.log(this.radio2)

            
        }
    },
    beforeMount(){
      // console.log("Hey you: " + this.kdot)  
      localStorage.setItem('url', window.location.href)
        if(localStorage.getItem('user') !== 'null'){
            this.getValues()
            this.function()

            if(this.kdot !== 'undefined'){
              this.dependency = localStorage.getItem('dependency')
              this.gender = localStorage.getItem('gender')
            }
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

.formB {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 650px;
  padding: 20px;
  width: 400px;
}

.formA {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 650px;
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
  width: 100px;
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