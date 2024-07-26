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

  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  // const [verbType, setVerbType] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(wordSchema) });

  const onSubmit = (data) => {
    // if (data.category === "verb") {
    //   setValue("isIrregular", verbType === "irregular");
    // }

    dispatch(createWord(data));
    closeModal();
  };
  const handleCategoryChange = (option) => {
    setCategory(option);
  };

  // const handleVerbTypeChange = (e) => {
  //   setVerbType(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (selectCategory === "verb" && !verbType) {
  //     alert("Please select a verb type");
  //     return;
  //   }
  //   dispatch(createWord({ en, ua, selectCategory, verbType }));
  //   closeModal();
  // };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Add Word
      </button>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <div>
            <h3>Add word</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dropdown
                defaultOption={defaultOption}
                onSelect={handleCategoryChange}
                options={categories}
              />

              {category === "verb" && (
                <div>
                  <input
                    type="radio"
                    value="regular"
                    // checked={verbType === "regular"}
                    // onChange={handleVerbTypeChange}
                  />
                  Regular
                  <input
                    type="radio"
                    value="irregular"
                    // checked={verbType === "irregular"}
                    // onChange={handleVerbTypeChange}
                  />
                  Irregular
                </div>
              )}

              <input
                {...register("en")}
                type="text"
                id="en"
                // value={en}
                // onChange={(e) => setEn(e.target.value)}
              />
              <input
                {...register("ua")}
                type="text"
                id="ua"
                // value={ua}
                // onChange={(e) => setUa(e.target.value)}
              />
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
