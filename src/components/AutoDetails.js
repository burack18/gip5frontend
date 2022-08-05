import React from 'react'
import { useParams } from 'react-router-dom'

export const AutoDetails = () => {
    const {autoId}=useParams();
    
  return (
    <div>AutoDetails</div>
  )
}
