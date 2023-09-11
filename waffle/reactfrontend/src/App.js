import './App.css';
import { useMediaQuery } from 'react-responsive'

import Header from './components/Header/Header.jsx'

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width:768px)'});
  
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;