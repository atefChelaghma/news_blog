import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { MainPage } from './pages/main';

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
