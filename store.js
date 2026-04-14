import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './reducers/user';
import tweets from './reducers/tweets';
import likeTweets from './reducers/likeTweets';

const reducers = combineReducers({ user, tweets, likeTweets });

const persistConfig = { key: 'hackathon2', storage };

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);