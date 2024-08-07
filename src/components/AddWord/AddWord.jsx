import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectCategories } from "../../redux/word/selectors";
import { createWord } from "../../redux/word/operations";
import Modal from "../Modal/Modal";
import Dropdown from "../Dropdown/Dropdown";
import svg from "../../assets/icon.svg";
import css from "./AddWord.module.css";
import style from "../Dropdown/Dropdown.module.css";

const wordSchema = Yup.object().shape({
  en: Yup.string()
    .trim()
    .required("English word is required")
    .when(["category", "isIrregular"], {
      is: (category, isIrregular) =>
        category === "verb" && isIrregular === "true",
      then: (schema) =>
        schema
          .matches(
            /^\b[A-Za-z'-]+-[A-Za-z'-]+-[A-Za-z'-]+\b$/,
            "Such data must be entered in the format I form-II form-III form"
          )
          .required("English word is required for irregular verbs"),
      otherwise: (schema) =>
        schema.matches(
          /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
          "Invalid English format"
        ),
    })
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
  ua: Yup.string()
    .trim()
    .required("Ukrainian word is required")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
  category: Yup.string().required("Category is required"),
  isIrregular: Yup.string().when("category", {
    is: (value) => value === "verb",
    then: (schema) => schema.required("Irregular status is required for verbs"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const AddWord = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(wordSchema) });

  const isIrregular = watch("isIrregular");

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    const newWord = {
      en: data.en,
      ua: data.ua,
      category: data.category,
    };
    if (data.category === "verb") {
      newWord.isIrregular = data.isIrregular === "true";
    }

    dispatch(createWord(newWord))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={css.button}>
        Add word
        <svg className={css.iconPlus}>
          <use href={`${svg}#icon-plus`} />
        </svg>
      </button>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <div className={css.containerForm}>
            <h3 className={css.title}>Add word</h3>
            <p className={css.subtitle}>
              Adding a new word to the dictionary is an important step in
              enriching the language base and expanding the vocabulary.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={css.categoryWrap}>
                <Dropdown
                  defaultOption="Select a category"
                  onSelect={(option) => {
                    setSelectedCategory(option);
                    setValue("category", option);
                  }}
                  options={categories.filter((cat) => cat !== "all")}
                  className={style.dropdownAddWord}
                  dropHeader={style.headerAddWord}
                  dropList={style.listAddWord}
                />
                {errors.category && (
                  <p className={css.errorCategory}>{errors.category.message}</p>
                )}
              </div>
              <div
                className={
                  css.btnWrap +
                  (selectedCategory === "verb" ? " " + css.visible : "")
                }
              >
                <label className={css.radioContainer}>
                  Regular
                  <input
                    type="radio"
                    value="false"
                    {...register("isIrregular")}
                  />
                  <span className={css.checkmark}></span>
                </label>

                <label className={css.radioContainer}>
                  Irregular
                  <input
                    type="radio"
                    value="true"
                    {...register("isIrregular")}
                  />
                  <span className={css.checkmark}></span>
                </label>
                {errors.isIrregular && (
                  <p className={css.errorRadio}>{errors.isIrregular.message}</p>
                )}
              </div>
              <div
                className={
                  css.notificationRadio +
                  (isIrregular === "true" ? " " + css.visible : "")
                }
              >
                <p>
                  Such data must be entered in the format I form-II form-III
                  form.
                </p>
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="ua" className={css.label}>
                  <svg className={css.countryIcon}>
                    <use href={`${svg}#icon-ukraine`} />
                  </svg>
                  Ukrainian
                </label>
                <input
                  {...register("ua")}
                  type="text"
                  id="ua"
                  className={css.input}
                />
                {errors.ua && (
                  <p className={css.errorInput}>{errors.ua.message}</p>
                )}
              </div>
              <div className={css.inputContainer}>
                <label htmlFor="en" className={css.label}>
                  <svg className={css.countryIcon}>
                    <use href={`${svg}#icon-en`} />
                  </svg>
                  English
                </label>
                <input
                  {...register("en")}
                  type="text"
                  id="en"
                  className={css.input}
                />
                {errors.en && (
                  <p className={css.errorInput}>{errors.en.message}</p>
                )}
              </div>
              <div className={css.btnWrapper}>
                <button className={css.btnAdd} type="submit">
                  Add
                </button>
                <button
                  className={css.btnCancel}
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddWord;
