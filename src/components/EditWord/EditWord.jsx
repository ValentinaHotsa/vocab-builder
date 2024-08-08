import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editWord } from "../../redux/word/operations";
import Modal from "../Modal/Modal";
import css from "../AddWord/AddWord.module.css";
import svg from "../../assets/icon.svg";

const editWordSchema = Yup.object().shape({
  en: Yup.string()
    .trim()
    .required("English word is required")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
  ua: Yup.string()
    .trim()
    .required("Ukrainian word is required")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
});

const EditWord = ({ word, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      <div className={css.containerFormEdit}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue={word.ua}
              className={css.input}
            />
            {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
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
              defaultValue={word.en}
              className={css.input}
            />
            {errors.en && <p className={css.error}>{errors.en.message}</p>}
          </div>
          <div className={css.btnWrapper}>
            <button className={css.btnAdd} type="submit">
              Save
            </button>
            <button className={css.btnCancel} type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditWord;
