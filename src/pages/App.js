import React from 'react'
import { Navigate, Route, Routes, useSearchParams, useLocation } from 'react-router-dom'
import Roster from './Roster'
import Awards from './Awards'
import Ranks from './Ranks'
import Qualifications from './Qualifications'
import { Error } from '../components/Error'
import { Footer } from '../components/Footer'
import { config } from '../constants'
import User from './User'

function App() {
  const [searchParams] = useSearchParams()

  const apiKey = searchParams.get('apikey') ?? config.app.API_KEY ?? null
  const perscomId = searchParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null

  return (
    <div className='p-1'>
      {apiKey && perscomId ? (
        <Routes>
          <Route path='/' element={<Roster />}></Route>
          <Route path='/awards' element={<Awards />}></Route>
          <Route path='/qualifications' element={<Qualifications />}></Route>
          <Route path='/ranks' element={<Ranks />}></Route>
          <Route path='/roster' element={<Roster />}></Route>
          <Route path='/users/:id' element={<User />}></Route>
          <Route path='*' element={<Navigate to={`/${useLocation().search}`} />}></Route>
        </Routes>
      ) : (
        <Error error='Please make sure all required parameters have been included.' />
      )}
      <Footer />
    </div>
  )
}

export default App
