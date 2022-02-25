import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import {HiUpload} from "react-icons/hi"

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {  
  function handleUploadImages() {
    const input = document.getElementById("imageInput"); 
    
    if (input instanceof HTMLInputElement) {
      input.click();
    }
  }

  async function handleSubmitImages() {    
    const formData = new FormData();
    const imageInput = document.getElementById("imageInput"); 

    if (imageInput instanceof HTMLInputElement && imageInput.files && imageInput.files.length !== 0) {

      for (let i = 0; i < imageInput.files.length ; i++) {
        formData.append("pictures", imageInput.files[i]);
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data.imagesURL);
    }
  }

  useEffect(() => {
    const imageInput = document.getElementById("imageInput"); 

    imageInput?.addEventListener('change', () => {
      if (imageInput instanceof HTMLInputElement && imageInput.files && imageInput.files.length !== 0) {
        const imgContainer = document.getElementById('imageContainer');

        while (imgContainer && imgContainer.lastChild) {
          imgContainer.removeChild(imgContainer.lastChild);
        }

        for (let i = 0; i < imageInput.files.length; i++) {
          let img = document.createElement('img');

          if (img instanceof HTMLImageElement) {
            img.src = URL.createObjectURL(imageInput.files[i]);
            imgContainer?.appendChild(img);
          }
          
        }

      }
    })
  }, [])

  return (
    <div className={styles.Container}>
      <section></section>

      <Head>
        <title>Image Uploader</title>
        <meta name="description" content="A simple image uploader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.Card}>
          <h1>Image Uploader</h1>

          <div className={styles.fileUpload}>
            <input type="file" id="imageInput" name="imageInput" accept="image/png, image/jpeg, image/jpg" multiple/>
            <button type='button' onClick={handleUploadImages}><HiUpload size={35}/></button>
            <button type='button' onClick={handleSubmitImages} className={styles.submitButton}>Enviar</button>
          </div>


          <div id="imageContainer" className={styles.imageContainer}>

          </div>

        </div>
      </main>
    </div>
  )
}

export default Home