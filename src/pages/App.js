import React, { useState, useEffect } from 'react'
import { config } from '../constants'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Roster from './Roster'
import Awards from './Awards'
import Ranks from './Ranks'

function App() {
  const [searchParams] = useSearchParams()
  const [apiKey, setApiKey] = useState()
  const [perscomId, setPerscomId] = useState()
  const [page, setPage] = useState()

  useEffect(() => {
    setApiKey(searchParams.get('apikey') ?? config.app.API_KEY ?? null)
    setPerscomId(searchParams.get('perscomid') ?? config.app.PERSCOM_ID ?? null)
    setPage(searchParams.get('page') ?? null)
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<Roster apiKey={apiKey} perscomId={perscomId} />}></Route>
        <Route path='/roster' element={<Roster apiKey={apiKey} perscomId={perscomId} />}></Route>
        <Route path='/awards' element={<Awards apiKey={apiKey} perscomId={perscomId} page={page} />}></Route>
        <Route path='/ranks' element={<Ranks apiKey={apiKey} perscomId={perscomId} page={page} />}></Route>
      </Routes>
    </>
  )
}

export default App
