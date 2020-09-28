//dependencies
import React, { useEffect, useState } from "react"
import auth0 from "auth0-js"

//imports
import params from "../auth0-params.json"

const Dashboard = () => {
	var auth0Client = new auth0.WebAuth({
		domain: params.domain,
		clientID: params.clientId,
		audience: params.apiAudience,
		redirectUri: params.callbackUrl,
		scope: params.scope,
		responseType: "token id_token",
	})

	const [state, setState] = useState({
		user: null,
	})

	useEffect(() => {
		auth0Client.client.userInfo(
			window.localStorage.getItem("token"),
			(err, user) => {
				if (err) return alert("Error at dashboard")
				setUser(user.name)
			}
		)
		//eslint-disable-next-line
	}, [])

	const setUser = (user) => {
		setState({ ...state, user: user })
	}

	const logoutHandler = (e) => {
		auth0Client.logout({
			returnTo: "http://localhost:3000/",
		})

		window.localStorage.removeItem("token")
	}

	return (
		<div>
			<h1 data-test="userName">Welcome {state.user}</h1>
			<button onClick={logoutHandler} data-test="logoutButton">
				Logout
			</button>
		</div>
	)
}

export default Dashboard
