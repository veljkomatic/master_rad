import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import reducers from '../reducers';

const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(
			thunk
		)
	)
);

persistStore(store, { storage: localStorage, whitelist: ['auth'] });

export default store;
