import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import {BrowserRouter} from "react-router-dom";
import MainRoutes from './components/MainRoutes';

function App() {


  return (
    <div className="App flex flex-col ">
      
      {/* Aca van los providers */}
      <BrowserRouter>
        <Header/>
          <MainRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
