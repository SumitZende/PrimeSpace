import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home,SignIn,SignUp,About,Profile} from './pages/Pages'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Creat_Listing from './pages/Create_Listing'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create_Listing' element={<Creat_Listing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
