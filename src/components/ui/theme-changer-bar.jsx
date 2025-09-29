import React, { useEffect, useState } from 'react'


function ThemeChangerBar() {

  const [theme, setTheme] = useState("")


  const themeChanger = async (themeText) => {
    setTheme(themeText)
    document.querySelector("html").setAttribute("data-theme", themeText)
    localStorage.setItem("theme", themeText)

  }


  return (
    <div className='bg-white px-9 py-4 flex gap-5 rounded-4xl'>
      <button onClick={()=>{themeChanger("night")}} className="btn btn-neutral">Night</button>
      <button onClick={()=>{themeChanger("synthwave")}} className="btn btn-primary">Synthwave</button>
      <button onClick={()=>{themeChanger("lemonade")}} className="btn btn-accent">Lemonade</button>
      <button onClick={()=>{themeChanger("aqua")}} className="btn btn-info">Aqua</button>
      <button onClick={()=>{themeChanger("forest")}} className="btn btn-success">Forest</button>
      <button onClick={()=>{themeChanger("cyberpunk")}} className="btn btn-warning">Cyberpunk</button>
      <button onClick={()=>{themeChanger("dracula")}} className="btn btn-error">Dracula</button>
    </div>
  )
}

export default ThemeChangerBar