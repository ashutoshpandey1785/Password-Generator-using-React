import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [capitalAllowed, setCapitalAllowed] = useState(true); // new state for capital letters
  const [smallAllowed, setSmallAllowed] = useState(true); // new state for small letters
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    
    if (capitalAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (smallAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    // Ensure at least one category is selected
    if (str === "") {
      alert("Please select at least one character type!");
      return;
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, capitalAllowed, smallAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, capitalAllowed, smallAllowed, passwordGenerator]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-8 py-8 bg-gray-900 text-orange-500">
        <h1 className='text-white text-center mb-6 text-3xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-4 py-1.5 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-4 flex-wrap'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
            <label className='text-lg'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className='h-6 w-6'
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className='h-6 w-6'
            />
            <label htmlFor="characterInput"> Special Characters</label>
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <input
              type="checkbox"
              defaultChecked={capitalAllowed}
              id="capitalInput"
              onChange={() => {
                setCapitalAllowed((prev) => !prev);
              }}
              className='h-6 w-6'
            />
            <label htmlFor="capitalInput">Capital Letters</label>
          </div>
          <div className="flex items-center gap-x-2 text-lg">
            <input
              type="checkbox"
              defaultChecked={smallAllowed}
              id="smallInput"
              onChange={() => {
                setSmallAllowed((prev) => !prev);
              }}
              className='h-6 w-6'
            />
            <label htmlFor="smallInput">Small Letters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
