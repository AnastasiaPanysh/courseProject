import { Input, Button, Image } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import style from "./style.module.css";
import React, { useState, useRef } from "react";
import { useCreateReviewMutation } from "../../services/review";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/index";

function CreateOperation() {
  const [createReview] = useCreateReviewMutation();
  const [value, setValue] = useState({
    title: "",
    name: "",
    category: "",
    description: "",
    grade: "",
    genre: "",
    imageLink: "",
  });

  const [img, setImg] = useState<File | null>(null);

  function changeInputValue(event: { target: { name: any; value: any } }) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function sendRequest() {
    createReview(value);
  }
  async function handleClick() {
    if (img !== null) {
      const storageref = ref(storage,'images/' + img.name);
      uploadBytes(storageref, img)
        .then((snapshot: any) => {
          console.log("succesful");
        })
        .catch((error: any) => {
          console.error(error);
        });
    }

  }

  function uploadFile(arg0: FileWithPath, name: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={style.wrapper}>
      <h2>Review title</h2>
      <Input
        name="title"
        onChange={changeInputValue}
        placeholder="review title"
      />

      <h2>Name of film/book/game</h2>
      <Input
        name="name"
        onChange={changeInputValue}
        placeholder="review name"
      />

      <h2>Category</h2>
      <Input
        name="category"
        onChange={changeInputValue}
        placeholder="review category"
      />

      <h2>Description</h2>
      <Input
        name="description"
        onChange={changeInputValue}
        placeholder="review description"
      />

      <h2>Grade</h2>
      <Input
        name="grade"
        onChange={changeInputValue}
        placeholder="review grade"
      />

      <h2>Genre</h2>
      <Input
        name="genre"
        onChange={changeInputValue}
        placeholder="review genre"
      />

      <h2>Image</h2>
      <Dropzone
        // openRef={openRef}
        onDrop={(files) => uploadFile(files[0], files[0].name) }
      >
        Перетащите файл сюда или нажмите для выбора
      </Dropzone> 

      <input type="file" onChange={(e: any) => setImg(e.target.files[0])} />

      <Button onClick={handleClick}>img</Button>
      <Button onClick={sendRequest}>GO</Button>
    </div>
  );
}

export default CreateOperation;
