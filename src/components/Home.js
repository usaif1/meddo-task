//dependencies
import React, { useState, useEffect } from "react"
import auth0 from "auth0-js"

//imports
import params from "../auth0-params.json"
import "./Home.css"

const Home = (props) => {
	var auth0Client = new auth0.WebAuth({
		domain: params.domain,
		clientID: params.clientId,
		audience: params.apiAudience,
		redirectUri: params.callbackUrl,
		scope: params.scope,
		responseType: "token id_token",
	})

	useEffect(() => {
		console.log(window.localStorage.getItem("token"))
	}, [])

	const [state, setState] = useState({
		email: "",
		password: "",
	})

	const onChangeHandler = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const login = (username, password) => {
		auth0Client.client.login(
			{
				realm: "meddo-task",
				username,
				password,
			},
			(err, authResult) => {
				if (err) return console.log("Error!", err.description)
				console.log("Success", authResult)
				window.localStorage.setItem("token", authResult.accessToken)
				props.history.push("/dashboard")
			}
		)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		login(state.email, state.password)
	}

	return (
		<div className="form-container">
			<h1 className="form-heading">Login Page</h1>
			<form className="form-form" onSubmit={onSubmitHandler}>
				<label htmlFor="email" className="form-label">
					Email
				</label>
				<input
					type="text"
					name="email"
					className="form-input"
					value={state.email}
					onChange={onChangeHandler}
				/>
				<label htmlFor="password" className="form-label">
					Password
				</label>
				<input
					type="password"
					name="password"
					className="form-input"
					value={state.password}
					onChange={onChangeHandler}
				/>
				<input type="submit" value="Login" className="form-submit" />
			</form>
		</div>
	)
}

export default Home
