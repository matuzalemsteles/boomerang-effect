/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Config} from 'metal-state';
import Boomerang, {connect} from '../Boomerang';
import Component from 'metal-jsx';

describe('Boomerang', () => {
	let component;

	afterEach(() => {
		if (component) {
			component.dispose();
		}
	});

	it('should call the event from context and update the Provider state', () => {
		jest.useFakeTimers();
		class Child extends Component {
			_handleClickButton() {
				this.emit('buttonClicked');
			}

			render() {
				return (
					<button onClick={this._handleClickButton.bind(this)}>
						Click me!
					</button>
				);
			}
		}

		const ChildWithConnect = connect(Child);

		class Provider extends Component {
			static STATE = {
				clicked: Config.number().value(0),
			};

			_handleClickButton() {
				this.state.clicked++;
			}

			render() {
				const {children} = this.props;
				const events = {
					buttonClicked: this._handleClickButton.bind(this),
				};

				return (
					<Boomerang.Provider events={events}>
						{children}
					</Boomerang.Provider>
				);
			}
		}

		class ChildWithChild extends Component {
			render() {
				return <ChildWithConnect />;
			}
		}

		class App extends Component {
			render() {
				return (
					<Provider ref="provider">
						<ChildWithChild />
					</Provider>
				);
			}
		}

		component = new App({});
		component.element.click();
		jest.runAllTimers();

		const {provider} = component.refs;

		expect(provider.state.clicked).toBe(1);
	});

	it('should pass the context events to the component', () => {
		class Child extends Component {
			render() {
				return <p>Foo</p>;
			}
		}

		const ChildWithConnect = connect(Child);

		class App extends Component {
			render() {
				const events = {
					clicked: () => {},
				};

				return (
					<Boomerang.Provider events={events}>
						<ChildWithConnect ref="child" />
					</Boomerang.Provider>
				);
			}
		}

		component = new App({});

		expect(component.refs.child.refs.connect.props.events).toMatchObject({
			clicked: expect.any(Function),
		});
	});

	it('should pass the context events together with those of the props for the component', () => {
		class Child extends Component {
			render() {
				return <p>Foo</p>;
			}
		}

		const ChildWithConnect = connect(Child);

		class App extends Component {
			render() {
				const events = {
					clicked: () => {},
				};

				const Events = {
					close: () => {},
				};

				return (
					<Boomerang.Provider events={events}>
						<ChildWithConnect events={Events} ref="child" />
					</Boomerang.Provider>
				);
			}
		}

		component = new App({});

		expect(component.refs.child.refs.connect.props.events).toMatchObject({
			clicked: expect.any(Function),
			close: expect.any(Function),
		});
	});

	it('should must pass the props to component', () => {
		class Child extends Component {
			render() {
				return <p>Foo</p>;
			}
		}

		const ChildWithConnect = connect(Child);

		class App extends Component {
			render() {
				const events = {
					clicked: () => {},
				};

				return (
					<Boomerang.Provider events={events}>
						<ChildWithConnect foo="bar" ref="child" />
					</Boomerang.Provider>
				);
			}
		}

		component = new App({});

		expect(component.refs.child.refs.connect.props.foo).toBe('bar');
	});

	it('should must pass the children`s to component', () => {
		class Child extends Component {
			render() {
				return <p>{this.props.children}</p>;
			}
		}

		const ChildWithConnect = connect(Child);

		class App extends Component {
			render() {
				const events = {
					clicked: () => {},
				};

				return (
					<Boomerang.Provider events={events}>
						<ChildWithConnect foo="bar" ref="child">
							<h1>Hello World!</h1>
						</ChildWithConnect>
					</Boomerang.Provider>
				);
			}
		}

		component = new App({});

		expect(component).toMatchSnapshot();
	});
});
