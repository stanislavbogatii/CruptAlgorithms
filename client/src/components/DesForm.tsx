import Button from '@mui/material/Button'
import React, { useRef, useState } from 'react'

const DesForm = () => {
  const [cryptedMessage, setCryptedMessage] = useState<string | null>(null);
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const inputMessageRef: any = useRef(null);
  const inputCryptedMessageRef: any = useRef(null);

  const encryptMessage = () => {
    const message: string | null = inputMessageRef?.current?.value || null;
    if (!message) {
      setCryptedMessage(null);
      return;
    };

    fetch('http://localhost:8080/crypt/des', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),  
    })
    .then((data) => data.json())
    .then((data) => setCryptedMessage(data.cryptMessage))
    .catch(() => setCryptedMessage(null));
  }

  const decryptMessage = () => {
    const message: string | null = inputCryptedMessageRef?.current?.value || null;
    if (!message) {
      setDecryptedMessage(null);
      return;
    };

    fetch('http://localhost:8080/decrypt/des', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),  
    })
    .then((data) => data.json())
    .then((data) => setDecryptedMessage(data.decryptMessage))
    .catch(() => setDecryptedMessage(null));
  }


  return (
    <section className='first-section flex-1'>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700 text-xl font-bold mb-2 text-left">
              Message pentru criptarea DES
            </label>
            <input 
            ref={inputMessageRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Message" />
            <Button 
            onClick={encryptMessage}
            variant='contained' className='mt-3 w-1/2'>Submit</Button>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700 text-xl font-bold mb-2 text-left">
              Messag criptat pentru decriptarea DES
            </label>
            <input 
            ref={inputCryptedMessageRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Message" />
            <Button 
            onClick={decryptMessage}
            variant='contained' className='mt-3 w-1/2'>Submit</Button>
          </div>
          <div className='flex flex-col items-start gap-2 text-md font-semibold w-full text-left'>
            <div className='w-full '>Crypted message: 
              <p 
              style={{
                wordWrap: 'break-word'
              }}
              className='text-gray-400'>{cryptedMessage}</p>
            </div>

            <div className='w-full'>Decrypted message: 
              <p 
              style={{
                wordWrap: 'break-word'
              }}
              className='text-gray-400'>{decryptedMessage}</p>
            </div>
          </div>
    </section>
  )
}

export default DesForm