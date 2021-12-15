import React from 'react'

const Button = (props) => {
  const {name,class,object} = props
  return(
    <>
      <button onClick={() => object()} className={class}>{name}</button>
    </>
  )
}

export default Button
