import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import {HiUpload} from "react-icons/hi"

import {Card, Container} from "../styles/HomeStyle";

const Home: NextPage = () => {  
  function handleUploadImage() {
    const input = document.getElementById("imageInput"); 
    
    if (input instanceof HTMLInputElement) {
      input.click();
    }
  }

  useEffect(() => {
    const input = document.getElementById("imageInput"); 

    input?.addEventListener('change', () => {
      if (input instanceof HTMLInputElement && input.files && input.files?.length !== 0) {
        const imgContainer = document.getElementById('imageContainer');

        while (imgContainer && imgContainer.lastChild) {
          imgContainer.removeChild(imgContainer.lastChild);
        }

        for (let i = 0; i < input.files.length; i++) {
          let img = document.createElement('img');

          if (img instanceof HTMLImageElement) {
            img.src = URL.createObjectURL(input.files[i]);
            imgContainer?.appendChild(img);
          }
          
        }

      }
    })
  }, [])

  return (
    <Container>
      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="A simple image uploader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <h1>Image Uploader</h1>
          <div className='file-upload'>
            <input type="file" id="imageInput" name="imageInput" accept="image/png, image/jpeg, image/jpg" multiple/>
            <button type='button' onClick={handleUploadImage}><HiUpload size={35}/></button>
            <button type='button' className='submitButton'>Enviar</button>
          </div>


          <div id='imageContainer'>

          </div>

        </Card>
      </main>
    </Container>
  )
}

export default Home
