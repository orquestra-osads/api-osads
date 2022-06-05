import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import MenuMusico from './components/MenuMusico';
import MenuSimples from './components/MenuSimples';
import Routers from './Routers';



function App() {

  const role = sessionStorage.getItem('_role')

  const InterativeMenu = () => {
    if( role === 'Musico'){
        return <MenuMusico />
    }
    else if( role === 'Admin'){
        return <Menu />
    }
    return <MenuSimples />
  }

  return (
    <div className="App">
      <>
        <Router>
          {InterativeMenu()}
          <Routers/>
        </Router>
      </>
    </div>
  );
}


export default App;
