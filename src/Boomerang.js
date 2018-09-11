/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Config} from 'metal-state';
import Component from 'metal-jsx';

let Boomerang = {};

/**
 * A Provider receives the `events` that he wishes to
 * hear from his children`s.
 * @extends Component
 */
class Provider extends Component {
	static PROPS = {
		/**
		 * The events you want to hear from children
		 * components.
		 * @default undefined
		 * @instance
		 * @memberof Provider
		 * @type {!object}
		 */
		events: Config.object().required(),
	};

	/**
	 * @inheritDoc
	 */
	getChildContext() {
		return {
			boomerang: {
				events: this.props.events,
			},
		};
	}

	/**
	 * @inheritDoc
	 */
	render() {
		const {children} = this.props;

		return children;
	}
}

Boomerang.Provider = Provider;

export {Provider};

export default Boomerang;
