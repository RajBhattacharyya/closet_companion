import { useState } from 'react'
import './App.css'
const user = {
  name: "Heddy Lammar",
  imageUrl: "https://i.imgur.com/yXovdoSs.jpg",
  imageSize:90,
};
export default function Profile(){
  return(
    <>
      <h1>{user.name}</h1>
      <img 
      className='avatar'
      src={user.src}
      alt={'photo of '+ user.name}
      style={{
        width: user.imageSize,
        height: user.imageSize,
      }}
      />
    </>
  )
}