import Awards from './Awards'
import Calendar from './Calendar'
import Form from './Form'
import Forms from './Forms'
import Qualifications from './Qualifications'
import Ranks from './Ranks'
import React from 'react'
import Roster from './Roster'
import User from './User'
import { Alert } from '../components/Alert'
import { Footer } from '../components/Footer'
import { Navigate, Route, Routes, useSearchParams, useLocation } from 'react-router-dom'
import { config } from '../constants'

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
          <Route path='/calendar' element={<Calendar />}></Route>
          <Route path='/forms' element={<Forms />}></Route>
          <Route path='/forms/:id' element={<Form />}></Route>
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
