<template>
<div>
    <h2 style="color: whitesmoke">Check Your Emails, We Sent You An OTP!</h2>
    <hr><h3 style="color: whitesmoke">Please Enter Received OTP</h3><br>
<div class="otpForm">
    <br><v-otp-input style="display: flex; justify-content: center; align-content: center;" inputClasses="otp-input" :numInputs="4" separator="-" :shouldAutoFocus="true" @on-complete="handleOnComplete" @on-change="handleOnChange"/>
    <br><button @click="myFunction()">Submit OTP</button>
</div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import OtpInput from '@bachdgvn/vue-otp-input'

Vue.component('v-otp-input', OtpInput);

export default{
    name: 'OTPPage',
    randomNumber: '',
    OTP: '',
    props: {
        numInputs: {
            default: 4,
        },

        separator: {
            type: String,
            default: '**',
        },

        inputClasses: {
            type: String,
        },

        isInputNum: {
            type: Boolean,
        },

        shouldAutoFocus: {
            type: Boolean,
            default: false,
        }
    },
    
    methods:{
        handleOnComplete(value){
            console.log("OTP: ", value);
            localStorage.setItem('value', value);
        },
        getRandom(){
            this.randomNumber = this.getRandomNumber(1111, 9999)
        },
        handleOnChange(value){
            console.log("OTP: ", value);
        },
        getRandomNumber(min, max){
            return Math.floor(Math.random() * (max - min) + min);
        },
        async myFunction(){

            let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/getOTP/${localStorage.getItem('otp-email')}`, {

            });

            let OTPvue = localStorage.getItem('value');
            
            if(response.data == OTPvue){
                
                await axios.delete(`http://localhost:8081/GreenHouseLife/rest/show/deleteOTP/${localStorage.getItem('otp-email')}`, {

                });

                localStorage.removeItem('value');

                this.$router.push('/forgotPassword');
            }else{
                alert('Wrong OTP. Please try again');
            }
        }
    },
    beforeMount(){
        if(localStorage.getItem('otp-email') === null){
            console.log('You aren\'t authenticated yet')
            this.$router.push('/')
        }else{
            console.log('Can you get here?')
        }
    }
};
</script>

<style>
.otpForm {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  width: 400px;
  justify-content: center; 
  align-content: center;
}

.otp-input{
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.3);
    text-align: center;
}
.error{
    border: 1px solid red !important;
}
</style>