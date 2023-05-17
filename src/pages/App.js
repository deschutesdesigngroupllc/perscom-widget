import React from 'react'
import { Navigate, Route, Routes, useSearchParams, useLocation } from 'react-router-dom'
import Roster from './Roster'
import Awards from './Awards'
import Ranks from './Ranks'
import Qualifications from './Qualifications'
import { Footer } from '../components/Footer'
import { config } from '../constants'
import User from './User'
import Forms from './Forms'
import Form from './Form'
import Calendar from './Calendar'
import { Alert } from '../components/Alert'

function App() {
  const [searchParams] = useSearchParams()

  const apiKey = searchParams.get('apikey') ?? config.app.API_KEY ?? null
  const perscomId = searchParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null

  return (
    <div className='p-0.5'>
      {apiKey && perscomId ? (
        <Routes>
          <Route path='/' element={<Roster />}></Route>
          <Route path='/awards' element={<Awards />}></Route>
          <Route path='/forms' element={<Forms />}></Route>
          <Route path='/forms/:id' element={<Form />}></Route>
          <Route path='/calendar' element={<Calendar />}></Route>
          <Route path='/qualifications' element={<Qualifications />}></Route>
          <Route path='/ranks' element={<Ranks />}></Route>
          <Route path='/roster' element={<Roster />}></Route>
          <Route path='/users/:id' element={<User />}></Route>
          <Route path='*' element={<Navigate to={`/${useLocation().search}`} />}></Route>
        </Routes>
      ) : (
        <Alert message='Please make sure all required widget parameters have been included.' type='danger' />
      )}
      <Footer />
    </div>
  )
}

export default App
