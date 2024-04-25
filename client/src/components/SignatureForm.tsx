import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'

const SignatureForm = () => {
    const [signature, setSignature] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const inputMessageForSignatureRef: any = useRef(null);
    const inputMessageForVerifiedRef: any = useRef(null);
    const inputSignatureForVerifiedRef: any = useRef(null);

    const generateSignature = () => {
        const message: string | null = inputMessageForSignatureRef?.current?.value || null;
        if (!message) {
            setSignature(null);
            return;
        };

        fetch('http://localhost:8080/generate/signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),  
        })
        .then((data) => data.json())
        .then((data) => setSignature(data.signature))
        .catch(() => setSignature(null));
    }

    const verfiySignature = () => {
        const message: string | null = inputMessageForVerifiedRef?.current?.value || null;
        const signature: string | null = inputSignatureForVerifiedRef?.current?.value || null;
        if (!message) {
            setStatus(null);
            return;
        };

        fetch('http://localhost:8080/verify/signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),  
        })
        .then((data) => data.json())
        .then((data) => setStatus(data.isVerify))
        .catch(() => setStatus(null));
    }



  return (
    <section className='first-section flex-1'>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700 text-xl font-bold mb-2 text-left">
              Mesaj pentru generarea semnaturii
            </label>
            <input 
            ref={inputMessageForSignatureRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Message" />
            <Button 
            onClick={generateSignature}
            variant='contained' className='mt-3 w-1/2'>Submit</Button>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700 text-xl font-bold mb-2 text-left">
              Mesaj pentru verificare
            </label>
            <input 
            ref={inputMessageForVerifiedRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Message" />
            <label className="mt-4 block text-gray-700 text-xl font-bold mb-2 text-left">
              Semnatura pentru verificare
            </label>
            <input 
            ref={inputSignatureForVerifiedRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Signature" />
            <Button 
            onClick={verfiySignature}
            variant='contained' className='mt-3 w-1/2'>Submit</Button>
          </div>
          <div className='flex flex-col items-start gap-2 text-md font-semibold w-full text-left'>
            <div className='w-full'>Status: 
              <p 
              style={{
                wordWrap: 'break-word'
              }}
              className='text-gray-400'>{status !== null && (status ? "Success" : "Error")}</p>
            </div>
            <div className='w-full '>Signature: 
              <p 
              style={{
                wordWrap: 'break-word'
              }}
              className='text-gray-400'>{signature}</p>
            </div>
          </div>
    </section>
  )
}

export default SignatureForm