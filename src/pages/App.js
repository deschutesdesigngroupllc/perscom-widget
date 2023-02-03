import React, { useState, useEffect } from 'react'
import { config } from '../constants'
import { Route, Routes } from 'react-router-dom'
import Roster from './Roster'
import Awards from './Awards'
import Ranks from './Ranks'

function App() {
  const [apiKey, setApiKey] = useState()
  const [perscomId, setPerscomId] = useState()

  useEffect(() => {
    if (config.app.ENVIRONMENT !== 'local') {
      window.addEventListener('message', (event) => {
        if (event.data.type === config.messages.IFRAME_LOADED) {
          const { apiKey, perscomId } = event.data.value
          setApiKey(apiKey)
          setPerscomId(perscomId)
        }
      })
    } else {
      setApiKey(config.app.API_KEY)
      setPerscomId(config.app.PERSCOM_ID)
    }
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<Roster apiKey={apiKey} perscomId={perscomId} />}></Route>
        <Route path='/roster' element={<Roster apiKey={apiKey} perscomId={perscomId} />}></Route>
        <Route path='/awards' element={<Awards apiKey={apiKey} perscomId={perscomId} />}></Route>
        <Route path='/ranks' element={<Ranks apiKey={apiKey} perscomId={perscomId} />}></Route>
      </Routes>
    </>
  )
}

export default App
