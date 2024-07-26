import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import css from "./AddWord.module.css";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/word/selectors";
import { createWord } from "../../redux/word/operations";
import Dropdown from "../Dropdown/Dropdown";

const wordSchema = Yup.object().shape({
  en: Yup.string()
    .trim()
    .required("Required")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
  ua: Yup.string()
    .trim()
    .required("Required")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
  category: Yup.string().required("Please select a category"),
});

const AddWord = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const defaultOption = "Categories";

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = () => {
    setModalOpen(true);
  };

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("");

  const [verbType, setVerbType] = useState("false");

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(wordSchema) });

  const onSubmit = (data) => {
    console.log("Submitting data", data);
    const fullData = {
      ...data,

      isIrregular: category === "verb" ? verbType === "false" : undefined,
    };
    console.log("Full data to submit:", fullData);
    dispatch(createWord(fullData));
    closeModal();
  };
  const handleCategoryChange = (option) => {
    setCategory(option);
  };

  const handleVerbTypeChange = (e) => {
    setVerbType(e.target.value);
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Add Word
      </button>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <div>
            <h3>Add word</h3>
            <form
              onSubmit={handleSubmit((data) => {
                console.log("Handle submit triggered");
                onSubmit(data);
              })}
            >
              <Dropdown
                defaultOption={defaultOption}
                onSelect={handleCategoryChange}
                options={categories}
              />

              {category === "verb" && (
                <div>
                  <input
                    type="radio"
                    value="false"
                    name="verbType"
                    checked={verbType === "false"}
                    onChange={handleVerbTypeChange}
                  />
                  Regular
                  <input
                    type="radio"
                    value="true"
                    name="verbType"
                    checked={verbType === "true"}
                    onChange={handleVerbTypeChange}
                  />
                  Irregular
                </div>
              )}

              <div>
                <input {...register("en")} type="text" id="en" />
                {errors.en && <p className={css.error}>{errors.en.message}</p>}
              </div>
              <div>
                <input {...register("ua")} type="text" id="ua" />
                {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
              </div>
              <button type="submit">Add word</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddWord;
