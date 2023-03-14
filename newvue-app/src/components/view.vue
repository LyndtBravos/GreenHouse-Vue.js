<template>
    <div id="app">
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <h2 class="text-center" style="color: whitesmoke">View Page</h2><hr style="border: 1px solid skyblue">
        <h3 class="text-center" style="color: whitesmoke">Here's All The Data We Have On You</h3>

<div class="pricing-box-container">
	<div class="pricing-box pricing-box-bg-image text-center">
        <ul class="features-list">
            <li><strong style="font-size: 150%; display: flex; justify-content: center;">First Name</strong> {{ this.name }}</li>
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Last Name</strong> {{ this.surname }}</li>
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Email Address</strong> {{ this.email }}</li>
			<div v-if="this.dob !== 'undefined'"><hr border="1px solid white">
            <li><strong style="font-size: 150%; display: flex; justify-content: center;">Date of Birth</strong> {{ this.dob }}</li>
            <li><strong style="font-size: 150%; display: flex; justify-content: center;">Dependency</strong> {{ this.dependency }}</li>
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Gender</strong> {{ this.gender }}</li>
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Gross Income</strong> {{ this.income }}</li>
            </div>
            <div v-show="!this.cover == '' && this.cover > 0"><hr border="1px solid white">
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Recommended Basic Life Cover</strong> {{ this.cover }}</li>
            </div>
            <div v-show="this.premium !== undefined && this.premium > 0"><hr border="1px solid white">
			<li><strong style="font-size: 150%; display: flex; justify-content: center;">Plan Cover</strong> {{ this.plan }}</li>
            <li><strong style="font-size: 150%; display: flex; justify-content: center;">Monthly Premiums</strong> {{ this.premium }}</li>
            </div>
            <div v-show="this.premium == null"><hr border="1px solid white">
			<li><strong style="color: salmon; font-size: 150%; display: flex; justify-content: center;">You aren't covered with us yet!</strong></li>
            </div>
		</ul>
	</div>
</div>

<button @click="deleteUser()" v-show="this.dob == 'undefined'">Delete Account</button>
<div v-if="this.dob !== 'undefined' && this.premium === undefined">
    <button @click="delPlan()">Delete Info</button>
</div>
<div v-else>

</div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default{
    name: 'HomePage',
    data() {
        return {
            id: localStorage.getItem('userID'),

            name: '',
            email: '',
            surname: '',
            dob: '',
            dependency: '',
            gender: '',
            income: '',
            cover:'',
            userID:'',
            planID: '',
            premium: '',
            premium2: '',
            password: '',
            button: '',
            plan: ''
        }
    },
    methods: {
        goToPlan(){
            this.$router.push('/plan')
        },
        goToBuyPlan(){
            this.$router.push('/plan')
        },
        goToCreatePlan(){
            this.$router.push('/info')
        },
        async getPlanInfo(){
            let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/myPlan/${this.id}`, {

            });
            console.log('Submitted Successfully for Get Plan Info');
            localStorage.setItem('dob', response.data.dOB);
            localStorage.setItem('dependency', response.data.dependency);
            Vue.prototype.$abc = localStorage.getItem('dob');
            localStorage.setItem('gender', response.data.gender);
            Vue.prototype.$gender = localStorage.getItem('gender');
            localStorage.setItem('income', response.data.income);
            
            Vue.prototype.$money = localStorage.getItem('income');
            
            localStorage.setItem('id', response.data.userID);
            localStorage.setItem('planID', response.data.iD);
            Vue.prototype.$plan = localStorage.getItem('planID');

            this.dob = localStorage.getItem('dob');
            this.dependency = localStorage.getItem('dependency');
            this.gender = localStorage.getItem('gender');
            this.income = localStorage.getItem('income');
            
            Vue.prototype.$dollars = this.income;
            console.log("Blastoff: " + this.$dollars);
            
            this.userID = localStorage.getItem('id');
            this.planID = localStorage.getItem('planID');
            this.password = localStorage.getItem('password');
            console.log(this.$money);
            console.log(":  " + this.$plan);
            console.log(response);
        },
        goToCalculator(){
            this.$router.push('/calculator');
        },
        async deleteUser(){
            let confirmAct = confirm('We\'re sad to see you go. Are you sure about this action?')
            if(confirmAct){
                localStorage.clear();
                
                await axios.delete(`http://localhost:8081/GreenHouseLife/rest/show/deleteUser/${this.id}`, {

                });
                alert('This user has been deleted successfully')
                localStorage.clear()
                localStorage.setItem('user', null)
                this.$router.push('/')
                this.function()
            }else{
                alert('We\'re glad that you changed your mind.')
            }
        },
        async delPlan(){
            let confirmAct = confirm('Are you sure you want to delete this info?')
            if(confirmAct){
                let response = await axios.delete(`http://localhost:8081/GreenHouseLife/rest/show/deletePlan/${localStorage.getItem('planID')}`, {

                });
                alert(response.data)
                window.location.reload()
                this.$router.push('/view')
            }else{
                alert('Delete basic info has been cancelled');
            }
        },
        goToUpdateUser(){
            this.$router.push('/user');
        },
        goToUpdatePlan(){
            this.$router.push('/info');
        },
        async function() {
            this.cover = localStorage.getItem('cover')
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }

            this.cover = localStorage.getItem('cover')
            this.premium = localStorage.getItem('premium')

            if(localStorage.getItem('premium') !== ''){
                let response = await axios.get(`http://localhost:8081/GreenHouseLife/rest/show/getClient/${localStorage.getItem('planID')}/${localStorage.getItem('userID')}`, {

                })
                console.log(response);
                this.plan = response.data.cover;
                this.premium = response.data.premium;
                this.premium2 = localStorage.getItem('premium');
                console.log("Your eyes: " + this.premium)
                console.log(this.premium2)
            }
        }
    },
    beforeMount(){
        localStorage.setItem('url', window.location.href)
        if(localStorage.getItem('user') !== 'null'){
            
            this.name = localStorage.getItem('username')
            this.surname = localStorage.getItem('userlast')
            this.email = localStorage.getItem('useremail')
            this.button = localStorage.getItem('premium')
            console.log("Calboy: " + this.button)
            this.getPlanInfo()
            this.function()
        }else{
            this.$router.push('/')
        }

        if(localStorage.getItem('premium') !== null){
            console.log('Can you get here?')
            this.dob = 'undefined'
        }
    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Open+Sans');

* {
	box-sizing: border-box;
}

body {
	/* background-color: #f6f5f7; */
	font-family: 'Open Sans', sans-serif;
	margin-bottom: 50px;
}

.text-center {
	text-align: center;
}

.pricing-box-container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
}

.pricing-box {
	background-color: #ffffff;
	box-shadow: 0px 2px 15px 0px rgba(0,0,0,0.5);
	border-radius: 4px;
	flex: 1;
	padding: 0 30px 30px;
	margin: 2%;
	min-width: 250px;
	max-width: 900px;
}

.pricing-box h5 {
	text-transform: uppercase;
}

.price {
	margin: 24px 0;
	font-size: 36px;
	font-weight: 900;
}

.price sub, .price sup {
	font-size: 16px;
	font-weight: 100;
}

.features-list {
	padding: 0;
	list-style-type: none;
}

.features-list li {
	font-weight: 100;
	padding: 12px 0;
	font-weight: 100;
}

.features-list li:not(:last-of-type) {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-primary {
	border-radius: 25px;
	border: none;
	background-color: #EC1362;
	color: #ffffff;
	cursor: pointer;
	padding: 10px 15px;
	margin-top: 20px;
	text-transform: uppercase;
	transition: all 0.1s ease-in-out;
}

.btn-primary:hover {
	box-shadow: 0px 2px 15px 0px rgba(0,0,0,0.5);
	transform: translateY(-3px);
}

.pricing-box-bg-image {
	/* background: rgb(218,76,236); */
    /* background: linear-gradient(tomato); */
    background-image: url('@/assets/5.jpg');
	background-size: cover;
	background-position: center center;
	color: #ffffff;
}

.pricing-box-bg-image .features-list li {
	border-bottom-color: rgba(255, 255, 255, 1);
}

.pricing-box-bg-image .btn-primary {
	background-color: #ffffff;
	color: #000;
}

footer {
	background-color: #222;
	color: #fff;
	font-size: 14px;
	bottom: 0;
	position: fixed;
	left: 0;
	right: 0;
	text-align: center;
}

footer p {
	margin: 10px 0;
}

footer i {
	color: red;
}

footer a {
	color: #3C97BF;
	text-decoration: none;
}

</style>