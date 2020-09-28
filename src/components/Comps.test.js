import React from "react"
import { shallow } from "enzyme"
import Home from "./Home"
import Dashboard from "./Dashboard"

// const setUp = (props = {}) => {
// 	const component = shallow(<Home {...props} />)
// 	return component
// }

const findByDataTest = (component, attr) => {
	const wrapper = component.find(`[data-test='${attr}']`) //no space between equal to signs.. vvip
	return wrapper
}

describe("home page", () => {
	it("should render 2 input fields", () => {
		const component = shallow(<Home />)
		const wrapper = findByDataTest(component, "inputField")
		expect(wrapper.length).toBe(2)
	})

	it("should render one submit button", () => {
		const component = shallow(<Home />)
		const button = findByDataTest(component, "loginButton")
		expect(button.length).toBe(1)
	})

	it("should emit event on click", () => {
		const component = shallow(<Home />)
		const button = findByDataTest(component, "loginButton")
		expect(button.length).toBe(1)
	})
})

describe("dashboard", () => {
	const mockFunc = jest.fn()
	describe("user present", () => {
		it("should render username", () => {
			const component = shallow(<Dashboard />)
			const heading = findByDataTest(component, "userName")
			expect(heading.length).toBe(1)
		})

		describe("button", () => {
			const mockFunc = jest.fn()
			it("should render logout button", () => {
				const component = shallow(<Dashboard />)
				const button = findByDataTest(component, "logoutButton")
				expect(button.length).toBe(1)
			})

			it("should emit event on click", () => {
				const component = shallow(<Dashboard />)
				const button = findByDataTest(component, "logoutButton")
				button.simulate("click")
				console.log(button.simulate("click"))
				const callback = mockFunc.mock.calls.length
				expect(callback).toBe(1)
			})
		})
	})
})
