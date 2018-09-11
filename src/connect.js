/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import JSXComponent from 'metal-jsx';

/**
 * connect is a higher-order component (HOC) that connects the
 * component to the providers, it passes the events written in
 * `context.boomerang` which are registered from <Boomerang.Provider />
 * @param {class} Component
 * @public
 * @return {class}
 */
function connect(Component) {
	class WithConnect extends JSXComponent {
		render() {
			const {events: eventsFromProvider} = this.context.boomerang;
			const events = Object.assign(
				{},
				this.props.events,
				eventsFromProvider
			);
			const props = Object.assign({}, this.props, {events});

			return (
				<Component ref="connect" {...props}>
					{props.children}
				</Component>
			);
		}
	}

	return WithConnect;
}

export default connect;
