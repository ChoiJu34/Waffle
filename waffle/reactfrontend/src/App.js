import './App.css';
import { useMediaQuery } from 'react-responsive'
import RootNavigationContainer from './routes/RootNavigation';
import AuthProvider from './components/Commons/AuthProvider'

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width:768px)'});

  return (
    <div className="App">
      <AuthProvider>
        <RootNavigationContainer isLoggedIn/>
      </AuthProvider>
    </div>
  );
}

export default App;