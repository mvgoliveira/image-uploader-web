import styled from "styled-components";

export const Container = styled.div`
  padding: 0 2rem;
  color: #fff;
  background: #212121;
  
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1c1c1c;
  width: 400px;
  height: 100%;
  border-radius: 8px;
  gap: 15px;

  h1 {
    font-size: 1.5rem;
  }

  .file-upload {
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    gap: 30px;

    input {
      display: none;
    }

    button {
      border: 1px solid #2ad194;
      color: #fff;
      background: #000;
      border-radius: 4px;
      width: 100px;
      height: 100px;
      cursor: pointer;
    }

    .submitButton {
      width: 100px;
      height: 40px;
      font-size: 1rem;
    }
  }

  #imageContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    max-width: 90%;

    img {
      width: 100px;
      height: 100px;
      background: #000;
      padding: 5px;
    }
  }
`