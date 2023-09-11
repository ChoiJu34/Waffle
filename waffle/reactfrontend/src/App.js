import './App.css';
import { useMediaQuery } from 'react-responsive'

import Header from './components/Commons/Header/Header.jsx'
import Footer from './components/Commons/Footer/Footer.jsx'

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width:768px)'});
  
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;