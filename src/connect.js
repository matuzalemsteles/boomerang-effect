/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import JSXComponent from 'metal-jsx';

function connect(Component) {
	class WithConnect extends JSXComponent {
		render() {
			const {events: Events} = this.context.boomerang;
			const events = Object.assign({}, this.props.events, Events);
			const Props = Object.assign({}, this.props, {events});

			return (
				<Component ref="connect" {...Props}>
					{Props.children}
				</Component>
			);
		}
	}

	return WithConnect;
}

export default connect;
