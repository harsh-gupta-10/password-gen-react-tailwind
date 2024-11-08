import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  const passwordRef = useRef(null)

  //logic
  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAllowed) {str += '0123456789'}
    if (charAllowed) {str += '!@#$%^&*()_+'}

    for (let i = 1; i < length; i++) {
     const char =(Math.floor(Math.random() * str.length + 1))
     pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

const copyPasswordtToClipboard = () => {
  window.navigator.clipboard.writeText(Password)
  passwordRef.current.select()
}

useEffect(()=> {
  generatePassword()
}, [length, numberAllowed, charAllowed])

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-full max-w-md mx-auto shadow-xl rounded-lg px-4 py-3 my-8 bg-slate-800 text-yellow-600'>
        
       <h1 className='text-2xl font-bold text-center mb-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input type="text" name="" id="" value={Password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
          className='outline-none w-full py-1 px-3' />

          <button className='outline-none bg-blue-800 py-1 shrink-0 pl-2 pr-2 hover:bg-indigo-400 focus:bg-indigo-700'
          onClick={copyPasswordtToClipboard}
          >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
              <input type="range" name="" id="" min={8} max={30}
              className='cursor-pointer'
              value={length}
              onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1 ml-10'> 
              <input type="checkbox" name="" id=""
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="">Number</label>
          </div>
          <div className='flex items-center gap-x-1'> 
              <input type="checkbox" name="" id=""
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="">Character</label>
          </div>
          
      </div>
    </div>
    </div>
  )
}

export default App
