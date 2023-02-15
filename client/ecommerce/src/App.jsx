import './App.css'
import CheckOut from './components/CheckOut'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Perfil from './components/Perfil'
import Home from './pages/Home'


function App() {


  return (
    <div className="App flex flex-col ">
        <Header/>
        <Home />
        <CheckOut/>
        <Footer />
        <Perfil />
    </div>
  )
}

export default App
