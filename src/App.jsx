import { useState } from 'react'
import { useSelector } from 'react-redux'

import FormDisplaySection from './features/FormDisplaySection'
import FormNavigationSection from './features/FormNavigationSection'
import FormProgressSection from './features/FormProgressSection'
import ErrorMessage from './components/ErrorMessage'

import './App.css'


function App() {  
  
  const status = useSelector(state => state.status);  

  return (
    <div id="main">
      <header><h3>Resume Builder</h3></header>
      <FormProgressSection />
      <FormDisplaySection/>
      <FormNavigationSection/>
      
    </div>
  )
}

export default App
