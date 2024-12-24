import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default function PopupRoot() {
  const [count, setCount] = useState(0)

  function closePopup() {
    window.parent.postMessage({
      type: 'myCustomEvent',
    }, '*');
  }

  return (
    <>
      <div className='flex'>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Typography display="heading-sm" as="h1">
        Vite + React
      </Typography>
      <div className='flex gap-1'>
        <Button onClick={closePopup}>Close</Button>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
