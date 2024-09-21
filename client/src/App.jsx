import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home,SignIn,SignUp,About,Profile} from './pages/Pages'
import Header from './components/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}
