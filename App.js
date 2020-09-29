import React from 'react'
import { Provider } from 'react-redux'


import configureStore from './components/store/ConfigureStore'
import AppEntry from './AppEntry';

const store = configureStore();


export default function App() {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  )
}
