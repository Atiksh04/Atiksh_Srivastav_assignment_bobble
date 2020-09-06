import React from 'react'
import BrandLogo from './brandLogo'
import RegisterForm from './registerForm'

export default class Register extends React.Component{
	callbackLogin=(val)=>{
		console.log(val)
	}
	render(){
	return(
		<div className="register-component mt-3">
			<BrandLogo/>
			<RegisterForm login={()=>this.callbackLogin}/>
		</div>
	)}
}

