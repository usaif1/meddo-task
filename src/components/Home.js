//dependencies
import React, { useState } from "react"
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
				<button type="submit" className="form-submit" data-testid="loginButton">
					Login
				</button>
			</form>
		</div>
	)
}

export default Home
