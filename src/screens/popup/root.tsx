import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { X } from 'lucide-react';


export default function PopupRoot() {
  const [count, setCount] = useState(0)

  function closePopup() {
    window.parent.postMessage({
      type: 'myCustomEvent',
    }, '*');
  }

  return (
    <>
      <Button variant="ghost" size="icon" className='fixed top-1 right-1' onClick={closePopup}>
        <X className='w-[24px] h-[24px]' />
      </Button>
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
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
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
