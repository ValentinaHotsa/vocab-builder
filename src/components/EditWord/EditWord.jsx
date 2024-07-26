import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editWord } from "../../redux/word/operations";
import css from "./EditWord.module.css";
import Modal from "../Modal/Modal";

const editWordSchema = Yup.object().shape({
  en: Yup.string()
    .trim()
    .required("Required")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
  ua: Yup.string()
    .trim()
    .required("Required")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
});

const EditWord = ({ word, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(editWordSchema) });

  const onSubmit = (data) => {
    const editedWord = {
      ...data,
      category: word.category,
    };
    if (word.isIrregular !== undefined) {
      editedWord.isIrregular = word.isIrregular;
    }
    console.log(editedWord);
    dispatch(editWord({ wordsId: word._id, data: editedWord }));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("en")}
              type="text"
              id="en"
              defaultValue={word.en}
            />
            {errors.en && <p className={css.error}>{errors.en.message}</p>}
          </div>
          <div>
            <input
              {...register("ua")}
              type="text"
              id="ua"
              defaultValue={word.ua}
            />
            {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditWord;
