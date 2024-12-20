import React from 'react'
import MapPages from './components/pages/MapPages'

// React.FC는 Functional Component의 타입 정의
export default function App () { 
  
  return (
    <div>
      <h1>kakao maps clone</h1>
      <MapPages />
   </div>
  )
}