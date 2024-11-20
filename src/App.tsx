import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/components/Home'
import Login from '@/pages/Login'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/logn' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
