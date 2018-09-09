/**
 * Copyright (c) 2018, Matuzalém Teles.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {Config} from 'metal-state';
import Component from 'metal-jsx';

let Boomerang = {};

class Provider extends Component {
	static PROPS = {
		events: Config.object(),
	};

	getChildContext() {
		return {
			boomerang: {
				events: this.props.events,
			},
		};
	}

	render() {
		const {children} = this.props;

		return children;
	}
}

Boomerang.Provider = Provider;

export {Provider};

export default Boomerang;
