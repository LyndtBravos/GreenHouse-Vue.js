<template>
<div id="app">
        <br><br><br><br><br><div>
      <div class="form">
      <div class="title">Welcome</div>
      <div class="subtitle">Calculate Your Plan Cover & Monthly Premium</div>
      <div class="input-container ic1">
        <input id="firstname" class="input" v-model="timeframe" value="this.timeframe" type="text" placeholder="" required/>
        <div class="cut">TimeFrame</div>
      </div>
      <div class="input-container ic2">
        <input id="lastname" class="input" v-model="income" value="this.income" type="text" placeholder="" required/>
        <div class="cut">Income</div>
      </div>
      <div class="input-container ic2">
        <input id="email" class="input" v-model="debt" type="text" placeholder="" required/>
        <div class="cut cut-short">Debt</div>
      </div>
      <div class="input-container ic2">
        <input class="input" type="text" v-model="assets" placeholder="" required/>
        <div class="cut cut-short">Assets</div>
      </div>
      <div class="input-container ic2">
        <input class="input" type="text" v-model="dependency" placeholder="" required/>
        <div class="cut cut-short">Dependencies</div>
      </div>
      <button type="text" @click="calculatePremium()" class="submit">Calculate Premium</button>
      
      <br><div v-show="this.click == true" class="input-container ic2">
        <input class="input" @input="autoUpdatePremium()" v-model="cover" value="this.cover" name="cover" type="text" required/>
        <div class="cut">Plan Cover</div>
      </div><br>
      <div class="input-container ic2" v-show="this.click == true">
        <input class="input" v-model="premium" id="premium" name="premium" type="text" readonly/>
        <div class="cut">Premiums</div>
      </div>
      <button class="submit" @click="saveClient()" v-show="this.click == true && this.compare === null">Buy Plan</button>
      </div>

    <br>
    </div>
    <br>
</div>  
</template>

<script>

import _ from 'lodash'
import axios from 'axios'
import Vue from 'vue'

export default{
    name: 'CalculatorPage',
    data(){
        return{
            compare: localStorage.getItem('premium'),
            SZA:'',
            cover: '',
            premium: '',
            content: '',
            lcover: '',
            lucid: '',
            timeframe: '',
            bought: '',
            debt: '',
            dependency: '',
            assets: '',
            click: false

        }
    },
    methods:{
        calculatePremium(){
            
            this.SZA = this.timeframe * 12 * this.income;
            this.SZA = this.SZA + (this.assets - this.debt);

            if(this.dependency == 1){
                this.SZA = this.SZA + (this.SZA * 0.05)
            }else if(this.dependency == 2){
                this.SZA = this.SZA + (this.SZA * 0.1)
            }else if(this.dependency == 3){
                this.SZA = this.SZA + (this.SZA * 0.15)
            }else if(this.dependency >= 4){
                this.SZA = this.SZA + (this.SZA * 0.2)
            }

            localStorage.setItem('cover', this.SZA)
            localStorage.setItem('timeframe', this.timeframe)
            localStorage.setItem('dependency', this.dependency)

            this.cover = localStorage.getItem('cover')
            this.premium = Math.floor(this.cover / (this.cover / (localStorage.getItem('timeframe') * 12) + 150) * 5)
            this.click = true

        },
        async function() {
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }

            this.cover = localStorage.getItem('cover')
            this.lcover = localStorage.getItem('cover')
            console.log("Premium: " + Math.floor((this.cover / (localStorage.getItem('timeframe') * 12)) + 150))
            console.log(localStorage.getItem('timeframe'))
            this.premium = Math.floor(this.cover / (this.cover / (localStorage.getItem('timeframe') * 12) + 150) * 5)

            let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/age/${localStorage.getItem('dob')}`, {

            })
            this.timeframe = 65 - response.data

        },
        confirmAction(){
            let confirmAct = confirm('Are you sure you\'d like to get this plan?');
            if(confirmAct){
                console.log("Hello: " + this.$plan);
            }
            location.reload();
        },
        async saveClient(){
            this.premium = Math.floor(this.cover / (this.cover / (localStorage.getItem('timeframe') * 12) + 150) * 5);
            let confirmAct = confirm('Are you sure you\'d like to carry on with this action?')
            if(confirmAct){
                if(localStorage.getItem('user') !== 'null'){
                  if(localStorage.getItem('premium') !== null && localStorage.getItem('premium') > 0){
                    alert('You\'ve already purchased a plan')
                    return;
                  }
                  if(isNaN(this.cover)){
                    alert('Please enter a proper number for Plan Cover')
                    return;
                  }
                  if(localStorage.getItem('dob') === 'null' || localStorage.getItem('dob') === 'undefined'){
                    alert('Please add basic info about yourself first')
                    this.$router.push('/info')
                  }
                  let response = await axios.post(`http://localhost:8081/GreenHouseLife/rest/show/buyPlan/`, {
                      cover: this.cover,
                      planID: localStorage.getItem('planID'),
                      premium: Math.floor(this.premium),
                      userID: localStorage.getItem('userID')

                  });
                  
                  if(response.data === 'Added The New Plan Under User Successfully'){
                    localStorage.setItem('bought', true)
                    localStorage.setItem('plan', this.cover)
                    Vue.prototype.$money = localStorage.getItem('plan')

                    localStorage.setItem('premium', this.premium)
                    Vue.prototype.$premium = localStorage.getItem('premium')
                    this.$router.push('/view')
                  }
                  alert(response.data)

                  
                }else{
                  this.$router.push('/authentication')
                }
            }
        },
        autoUpdatePremium: _.debounce(function(){
            this.premium = Math.floor(this.cover / (this.cover / (localStorage.getItem('timeframe') * 12) + 150) * 5)
            document.getElementById('premium').value = this.premium
            console.log("New premium: " + this.premium)
        }, 1000)
    },
    beforeMount(){
        localStorage.setItem('url', window.location.href)
        if(localStorage.getItem('income') !== 'undefined'){
          this.income = localStorage.getItem('income')
        }
        // this.income = localStorage.getItem('income')
        this.lucid = localStorage.getItem('premium')
        this.function()
        this.content = localStorage.getItem('cover')
        console.log(localStorage.getItem('cover'))
        
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

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  /* height: 1000px; */
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