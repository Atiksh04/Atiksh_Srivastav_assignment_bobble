import React from 'react'
import Logo from './logo.svg'


export default function BrandLogo(){
	return(
		<div className="brand-logo text-center">
			<img src={Logo}  alt="brand-logo" className="logo"/>
		</div>
		)
}