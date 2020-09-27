//dependencies
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//imports
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
	)
}

export default App
