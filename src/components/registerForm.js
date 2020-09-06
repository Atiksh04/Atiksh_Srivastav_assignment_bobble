import React from 'react'
import {Eye,EyeSlash} from 'bootstrap-icons-react'
import {css} from "@emotion/core"
import MoonLoader from "react-spinners/MoonLoader"


export default class RegisterForm extends React.Component{
	constructor(props){
		super(props)
		this.state={
			firstName:"",
			lastName:"",
			email:"",
			password:"",
			hidden:true,
			emailError:true,
			loading:false,
			loginError:false,
			loginDone:false
		}
	}
	firstNameChange=(e)=>{
		this.setState({
			firstName:e.target.value
		})
	}
	lastNameChange=(e)=>{
		this.setState({
			lastName:e.target.value
		})
	}
	emailChange=(e)=>{
		let regex=/\S+@\S+\.\S+/
		let res=regex.test(this.state.email)
		this.setState({
			email:e.target.value,
			emailError:res
		})
	}
	passChange=(e)=>{
		this.setState({
			password:e.target.value
		})
	}
	toggleShowHidePass=(v)=>{
		this.setState({
				hidden:v
		})
	}
	handleOnSubmit=(e)=>{
		this.setState({loading:true})
		e.preventDefault()
		let ob={
			email:this.state.email,
			password:this.state.password
		}
		fetch('https://reqres.in/api/register',{
			method:'POST',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
			body:JSON.stringify(ob)
		})
		.then((res)=>{
			if(res.status===200)
				this.setState({
					loginDone:true
				})
			else{
				this.setState({
					loginError:true,
					loginDone:false
				})
			}
		})
	}
	
	render(){
		const override = css`
		  display: block;
		  margin: 0 auto;
		  border-color: white;
		`;
		if(this.state.loginError===false && this.state.loginDone===false)
		return(
			<div className="register-form mt-2 p-4 mb-5">
				<p className="normal-text">SIGN UP</p>
				<p className="big-text mt-2">Create your account</p>
				<p className="normal-text mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
				<div className="mb-1">
					<button onClick={this.fb.bind(this)}>login</button>
						<div class="fb-login-button" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
				</div>
				<p className="top-line"><span>or</span></p>
				<form className="form-group mt-4" onSubmit={this.handleOnSubmit}>
					<input className="form-control mb-4" placeholder="First Name" onChange={this.firstNameChange}/>
					<input className="form-control mb-4" placeholder="Last Name" onChange={this.lastNameChange}/>
					<input className="form-control " placeholder="Email Address" onChange={this.emailChange}/>
					{this.state.emailError ? <p className="mb-4"></p>:<p className="normal-text mt-1 mb-0 text-danger">Enter a valid email</p>}
					<div className="mb-4 input-div ">
						{this.state.hidden ? 
							<input className="input-password" placeholder="Password" type="password" onChange={this.passChange}/>
							:
							<input className="input-password" placeholder="Password" type="text" onChange={this.passChange}/>
						}
						<span className="mt-1 mr-1">
							{this.state.hidden ? <EyeSlash onClick={()=>this.toggleShowHidePass(false)}/> : <Eye onClick={()=>this.toggleShowHidePass(true)}/>}
						</span>
					</div>
					<p className="normal-text">By clicking Sign Up,you agree to our <span className="blue-text">Terms of Use</span> and our <span className="blue-text">Privacy Policy</span>.</p>
					{this.state.loading?<button className="btn signup-button"> <MoonLoader css={override} size={20}/> </button> : <button className="btn signup-button">SIGN UP</button>}
				</form>
			</div>
		)
		else if(this.state.loginError===false && this.state.loginDone===true)
			{
				return (
					<div className="register-form mt-2 p-4 mb-5">
					<p className="big-text">Nice you're logged in successfully. </p>
				</div>
					)
			}
		else{
			return (
				<div className="register-form mt-2 p-4 mb-5">
					<p className="big-text">Seems like there's some Error in login. </p>
				</div>
			)
		}
	}
}

