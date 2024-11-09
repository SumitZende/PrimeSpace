import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home,SignIn,SignUp,About,Profile} from './pages/Pages'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Creat_Listing from './pages/Create_Listing'
import Update_Listing from './pages/Update_Listing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/listing/:listingID' element={<Listing/>}/>
      <Route path='/search' element={<Search />} />
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create_Listing' element={<Creat_Listing/>}/>
        <Route path='/update-listing/:listingID' element={<Update_Listing/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
