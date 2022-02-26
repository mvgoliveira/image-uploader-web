import axios, { AxiosError } from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'
import toast from 'react-hot-toast';
import {HiUpload} from "react-icons/hi"

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {  
  let selectedImages: File[] | null | (File | "")[] = null;

  function handleOpenImagesSelection() {
    const input = document.getElementById("imageInput"); 
    
    if (input instanceof HTMLInputElement) {
      input.click();
    }
  }

  function handleChangeSelectedImages() {
    const imageInput = document.getElementById("imageInput"); 
    const imagesContainer = document.getElementById('imagesContainer');

    
    if (imageInput instanceof HTMLInputElement) {
      const selectedImageArray = [];

      if (imageInput.files && imageInput.files.length > 0) {
        while (imagesContainer && imagesContainer.lastChild) {
          imagesContainer.removeChild(imagesContainer.lastChild);
        }
        
        for (let i = 0; i < imageInput.files.length; i++) {
          let imageContainer = document.createElement('section');
          imageContainer.id = `image-${i}`;

          let deleteImageButton = document.createElement('article');

          let image = document.createElement('img');
          imageContainer.appendChild(image);
          imageContainer.appendChild(deleteImageButton);
          imageContainer.onclick = () => removeImage(i);
  
          if (image instanceof HTMLImageElement && imagesContainer) {
            image.src = URL.createObjectURL(imageInput.files[i]);
            imagesContainer.appendChild(imageContainer);
          }

          selectedImageArray.push(imageInput.files[i]);
        }
      }
      
      selectedImages = selectedImageArray;
      imageInput.value = "";
    }
  }

  async function handleSubmitImages() {    
    const formData = new FormData();
    const imagesContainer = document.getElementById('imagesContainer');

    if (selectedImages) {

      for (let i = 0; i < selectedImages.length ; i++) {
        if (selectedImages[i] !== "") {
          formData.append("pictures", selectedImages[i]);
        }
      }

      const promise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      try {
        const response = await toast.promise(promise, {
          loading: 'Uploading...',
          success: 'Upload successful!',
          error: 'Upload Failed'
        })
        
        console.log(response.data.imagesURL);

        while (imagesContainer && imagesContainer.lastChild) {
          imagesContainer.removeChild(imagesContainer.lastChild);
        }
      } catch (err: AxiosError | any) {}

    }
  }

  async function removeImage(idx: number) {
    const image = document.getElementById(`image-${idx}`); 

    if (image instanceof HTMLElement && image.parentNode) {
      image.parentNode.removeChild(image);
    }

    if (selectedImages !== null && selectedImages.length > 0) {
      
      selectedImages = selectedImages.map((image: File | "", index: number ) => {
        if (index != idx) {
          return image
        } else {
          return "";
        }
      });
      // selectedImages = selectedImages.filter((image: File, index: number ) => index !== idx);
      // console.log(selectedImages);
    }
  } 

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
            <input 
              type="file" 
              id="imageInput" 
              name="imageInput" 
              accept="image/png, image/jpeg, image/jpg" 
              multiple
              onChange={handleChangeSelectedImages}
            />

            <button type='button' onClick={handleOpenImagesSelection}><HiUpload size={35}/></button>
            
            <button 
              type='button' 
              onClick={handleSubmitImages} 
              className={styles.submitButton}
            >
              Enviar 
            </button>
          </div>

          <div id="imagesContainer" className={styles.imageContainer}></div>
        </div>
      </main>
    </div>
  )
}

export default Home
