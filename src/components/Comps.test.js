import React from "react"
import { shallow } from "enzyme"
import Home from "./Home"

const setUp = (props = {}) => {
	const component = shallow(<Home {...props} />)
	return component
}

const findByDataTest = (component, attr) => {
	const wrapper = component.find(`[data-test='${attr}']`) //no space between equal to signs.. vvip
	return wrapper
}

describe("home page", () => {
	let component

	beforeEach(() => {
		component = setUp()
	})

	it("should render 2 input fields", () => {
		const wrapper = findByDataTest(component, "inputField")
		expect(wrapper.length).toBe(2)
	})

	it("should render one submit button", () => {
		const button = findByDataTest(component, "loginButton")
		expect(button.length).toBe(1)
	})
})
