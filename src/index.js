import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import Roster from './pages/Roster'
import reportWebVitals from './reportWebVitals'

const rosterDivs = document.querySelectorAll('#perscom_roster')
rosterDivs.forEach((domElement) => {
  const roster = ReactDOM.createRoot(domElement)
  roster.render(
    <React.StrictMode>
      <Roster domElement={domElement} />
    </React.StrictMode>
  )
})

reportWebVitals()
