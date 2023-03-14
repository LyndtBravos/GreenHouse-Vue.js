<template>
<div id="app">
<head>
<title>Slide Navbar</title>
	<!-- <link rel="stylesheet" type="text/css" href="slide navbar style.css"> -->
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
</head>
	<div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" v-model="emailL" required>
					<input type="password" name="pswd" placeholder="Password" v-model="passwordL" required>
					<button type="button" @click="login()">Login</button>
					<p style="text-align: right"><a style="cursor: pointer; color: #573b8a; text-decoration: underline;" @click="showPrompt()">Forgot Password?</a></p>&nbsp;
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="First Name" v-model="first_name" required="">
					<input type="text" name="txt" placeholder="Last Name" v-model="last_name" required="">
					<input type="email" name="email" placeholder="Email Address" v-model="email" required="">
					<input type="password" name="pswd" placeholder="Password" v-model="password" required="">
					<input type="password" name="pswd1" placeholder=" Confirm Password" v-model="password2" required="">
					<button type="button" @click="register()">Sign up</button>
				</form>
			</div>
	</div>
</div>

</template>

<script>

import axios from 'axios'

export default{
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
			first_name: '',
			last_name: '',
			password2: '',
			emailL: '',
			passwordL: ''
        }
    },
    methods: {
        async register(){
			if(this.password === this.password2 && this.password !== 'null' && this.password2 !== 'null'){
				const response = await axios.post(`http://localhost:8081/GreenHouseLife/rest/show/addUser/${this.first_name}/${this.last_name}`, {
                email: this.email,
                password: this.password,
                });
				console.log(response)
				if(response.data === 'New User Added Successfully'){
                    console.log('Submiited successfully');
					localStorage.setItem('username', response.data.name)
					localStorage.setItem('surname', response.data.surname)
					localStorage.setItem('useremail', response.data.email)
					localStorage.setItem('id', response.data.iD)
					alert('New User Added Successfully')
					window.location.reload()
                	this.$router.push('/authentication')
				}else{
                	alert(response.data);
            	}
            }else{
                alert('Please check your password fields. Either or both are empty or not identical');
            }
        },
		async showPrompt(){
            
            if(this.emailL !== ''){
                let response = await axios.post(`http://localhost:8081/GreenHouseLife/rest/show/sendOTP/${this.emailL}`, {

                });
                localStorage.setItem('otp-email', this.emailL);
                console.log(response);
                if(response.data == 'Email didn\'t send. An error occured'){
                    alert('Email typed in is in wrong format.')
                    localStorage.removeItem('otp-email')
                    this.$router.push('/authentication')
                }else{
                    this.$router.push('/otp')
                }
            }else{
                alert('Please type in your email address first to reset password');
            }
        },
        async login(){
            console.log('Are you here')
            let response = await axios.post(`http://localhost:8081/GreenHouseLife/rest/show/myInfo/`, {
				email: this.emailL,
				password: this.passwordL
            });
            if(response.data.iD !== 0){
                console.log('Submitted Successfully')
                let user = response.data;
				
                localStorage.setItem('user', user);
                localStorage.setItem('username', user.name);
                localStorage.setItem('userlast', user.surname);
                localStorage.setItem('useremail', user.email);
                localStorage.setItem('userID', user.iD);
                localStorage.setItem('password', user.password);

				if(localStorage.getItem('url') !== null){
					let calcLink = localStorage.getItem('url').split('8081/')

					if(calcLink[1] == 'calculator#loaded'){
						if(localStorage.getItem('dob') !== 'null'){
							this.$router.push('/info')
							alert('Please add basic info about yourself first')
						}else{
							this.$router.push('/calculator')
						}						
					}
				}else{
					this.goToHome()
				}		

            }else if(response.data.email == '' || response.data.password == ''){
                console.log('Submitted Successfully')
                alert('Please fill the whole form to proceed')
            }else{
                console.log('Submitted Successfully')
                alert('No user with such credentials exists')
            }
            console.log(response)
        },
		goToHome(){
			this.$router.push('/')
		},
        function() {
            if(!window.location.hash){
                window.location = window.location + '#loaded'
                window.location.reload()
            }
        }
    }
    // beforeMount(){
    //     if(localStorage.getItem('user') == 'null'){
    //         this.function()
    //     }else{
	// 		this.$router.push('/')

    //     }
    // }
}

</script>

<style>

body{
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;
    /* background-image: url('@/assets/12.jpg'); */
	/* background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e); */
}
.main{
	width: 450px;
	height: 550px;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:95%;
	height: 97%;
}
label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 70%;
	height: 40px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 70%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #6d44b8;
}
.login{
	height: 660px;
	background: #eee;
	border-radius: 30% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #573b8a;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-600px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}

</style>