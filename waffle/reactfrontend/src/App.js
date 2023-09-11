import './App.css';
import { useMediaQuery } from 'react-responsive'
<<<<<<< HEAD
import RootNavigationContainer from './routes/RootNavigation';
=======

import Header from './components/Commons/Header/Header.jsx'
import Footer from './components/Commons/Footer/Footer.jsx'
>>>>>>> cf3aae0fca7ff63595122d5e099f77624518012d

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width:768px)'});
  
  return (
    <div className="App">
<<<<<<< HEAD
      <RootNavigationContainer />
=======
      <Header />
      <Footer />
>>>>>>> cf3aae0fca7ff63595122d5e099f77624518012d
    </div>
  );
}

export default App;