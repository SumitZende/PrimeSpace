import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home,SignIn,SignUp,About,Profile} from './pages/Pages'

export default function App() {
  return (
    <BrowserRouter>
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
