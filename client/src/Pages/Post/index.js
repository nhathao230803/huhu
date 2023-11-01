import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import styles from "./Post.module.scss";
import ProgressBar from "~/components/ProgressBar/ProgressBar";
import { useState } from "react";
import ChoseCategory from "../../components/Upload/ChooseCategory";
import FormUpload from "../../components/Upload/FormUpload";
import ConfirmForm from "../../components/Upload/ConfirmForm";
import {
  validateDogForm,
  validateFormUpload,
  validateStuffForm,
} from "../../components/Layout/Author/Validation/post";

import axios from "axios";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const PURPOSE = [
  {
    value: "Profit",
    title: "Profit",
  },
  {
    value: "Gift",
    title: "Gift",
  },
];

const SPECIES = [
  {
    value: "Cat",
    title: "CAT",
  },
  {
    value: "Dog",
    title: "DOG",
  },
];

const SIZE = [
  {
    value: "XXS",
    title: "XXS",
  },
  {
    value: "XS",
    title: "XS",
  },
  {
    value: "S",
    title: "S",
  },
  {
    value: "M",
    title: "M",
  },
  {
    value: "L",
    title: "L",
  },
  {
    value: "XL",
    title: "XL",
  },
];

const TYPE_PRODUCT = [
  {
    value: "toy",
    title: "Toy",
  },
  {
    value: "food",
    title: "Food",
  },
  {
    value: "others",
    title: "Others",
  },
];

function Post() {
  const [steps, setSteps] = useState(1);
  const [id, setId] = useState(null); //Id category
  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [purpose, setPurpose] = useState(PURPOSE[0].value);
  const [species, setSpecies] = useState(SPECIES[0].value);
  const [breed, setBreed] = useState();
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState(SIZE[0].value);
  const [typeProduct, setTypeProduct] = useState(TYPE_PRODUCT[0].value);
  const [qty, setQty] = useState("");

  const [error, setError] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [steps]);

  useEffect(() => {
    setFileList([]);
    setTitle("");
    setDesc("");
    setPurpose(PURPOSE[0].value);
    setSpecies(SPECIES[0].value);
    setBreed();
    setAge("");
    setPrice("");
    setSize(SIZE[0].value);
    setQty("");
    setTypeProduct(TYPE_PRODUCT[0].value);
    setError({});
  }, [id]);

  const handlePreviousClick = () => {
    updateSteps("prev");
  };

  const handleNextClick = () => {
    if (id) {
      if (id === "Cat" || id === "Dog") {
        setSpecies(id);
      }
      if (steps === 1) {
        updateSteps("next");
      } else if (steps === 2) {
        const form = { file: fileList, title: title, description: desc };
        let err = validateFormUpload(form);
        setError(err);
        if (err.file === "" && err.description === "" && err.title === "") {
          updateSteps("next");
        }
        console.log(fileList);
        // console.log(title, desc, purpose);
      }
    }
  };

  const updateSteps = (value) => {
    if (value === "prev") {
      if (steps === 2) {
        setSteps((prev) => prev - 1);
      }
      if (steps === 3) {
        setSteps((prev) => prev - 1);
      }
    } else {
      if (steps === 1) {
        setSteps((prev) => prev + 1);
      }
      if (steps === 2) {
        setSteps((prev) => prev + 1);
      }
    }
  };

  const fetchApi = async () => {
    let image = fileList[0];
    const formData = new FormData();
    formData.append("image", image);
    if (breed) {
      formData.append("petName", title);
      formData.append("species", species);
      formData.append("breed", breed);
      formData.append("petPrice", price);
      formData.append("content", desc);
      const res = await axios.post("http://localhost:3000/pets", formData);
      alert("Post successfully");
      if (res.data.code === 200) {
        console.log("Post successfully");
        window.location.href = "/shop";
      }
    } else {
      formData.append("productName", title);
      formData.append("quantity", qty);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("description", desc);
      formData.append("typeOfPet", species);
      formData.append("typeOfProduct", typeProduct);
      const res = await axios.post("http://localhost:3000/products", formData);
      alert("Post successfully");
      if (res.data.code === 200) {
        console.log("Post successfully");
        window.location.href = "/shop";
      }
    }
  };

  const handleUploadClick = () => {
    if (steps === 3) {
      if (species === "Gift") {
        setPrice("0");
      }
      if (id === "Stuff") {
        const form = { qty: qty, price: price };
        let err = validateStuffForm(form);
        setError(err);
        if (err.qty === "" && err.price === "") {
          fetchApi();
        }
      } else {
        const form = { breed: breed, age: age, price: price };
        let err = validateDogForm(form);
        setError(err);
        if (err.breed === "" && err.age && err.price === "") {
          fetchApi();
        }
      }
    }
  };

  return (
    <div className={cx("post-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("post-hero")}>
        <h2 className={cx("heading")}>UPLOADING PRODUCT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>UploadProduct</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Progress bar */}
        <header className={cx("progress-bar")}>
          <ProgressBar steps={steps} />
        </header>
        {/* Form */}
        <div className={cx("form")}>
          {/* Chose category */}
          {steps === 1 && (
            <ChoseCategory
              id={id}
              setId={setId}
              handleNextClick={handleNextClick}
            />
          )}
          {steps === 2 && (
            <FormUpload
              title={title}
              setTitle={setTitle}
              desc={desc}
              setDesc={setDesc}
              handlePrevClick={handlePreviousClick}
              handleNextClick={handleNextClick}
              PURPOSE={id !== "Stuff" ? PURPOSE : [PURPOSE[0]]}
              purpose={purpose}
              setPurpose={setPurpose}
              fileList={fileList}
              setFileList={setFileList}
              error={error}
            />
          )}

          {steps === 3 && (
            <ConfirmForm
              id={id}
              SIZE={SIZE}
              size={size}
              setSize={setSize}
              qty={qty}
              setQty={setQty}
              purpose={purpose}
              handlePrevClick={handlePreviousClick}
              handleUploadClick={handleUploadClick}
              SPECIES={SPECIES}
              species={species}
              setSpecies={setSpecies}
              breed={breed}
              setBreed={setBreed}
              age={age}
              setAge={setAge}
              price={price}
              TYPEPRODUCT={TYPE_PRODUCT}
              typeProduct={typeProduct}
              setTypeProduct={setTypeProduct}
              setPrice={setPrice}
              error={error}
            />
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Post;
