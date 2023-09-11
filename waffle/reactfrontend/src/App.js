import './App.css';
import { useMediaQuery } from 'react-responsive'
import RootNavigationContainer from './routes/RootNavigation';

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width:768px)'});
  
  return (
    <div className="App">
      <RootNavigationContainer />
    </div>
  );
}

export default App;