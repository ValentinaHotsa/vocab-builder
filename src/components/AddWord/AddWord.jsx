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
    .when(["category", "isIrregular"], {
      is: (category, isIrregular) =>
        category === "verb" && isIrregular === "true",
      then: (schema) =>
        schema
          .matches(
            /^\b[A-Za-z'-]+-[A-Za-z'-]+-[A-Za-z'-]+\b$/,
            'The en field must have the format "verb I form-verb II form-verb III form"'
          )
          .required("Required"),
      otherwise: (schema) =>
        schema.matches(
          /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/,
          "Invalid English format"
        ),
    })
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
  ua: Yup.string()
    .trim()
    .required("Required")
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
  category: Yup.string().required("Category is required"),
  isIrregular: Yup.string().when("category", {
    is: (value) => value === "verb",
    then: (schema) => schema.required("Irregular status is required for verbs"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const AddWord = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const defaultOption = "Categories";
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange", resolver: yupResolver(wordSchema) });

  const closeModal = () => {
    setModalOpen(false);
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
                onSelect={(option) => {
                  setSelectedCategory(option);
                  setValue("category", option);
                }}
                options={categories}
              />

              {selectedCategory === "verb" && (
                <div>
                  <label>
                    <input
                      type="radio"
                      value="true"
                      {...register("isIrregular")}
                    />
                    Regular
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="false"
                      {...register("isIrregular")}
                    />
                    Irregular
                  </label>
                </div>
              )}
              {errors.verbType && (
                <p className={css.error}>{errors.isIrregular.message}</p>
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

// import { useState } from "react";
// import * as Yup from "yup";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// import css from "./AddWord.module.css";
// import Modal from "../Modal/Modal";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCategories } from "../../redux/word/selectors";
// import { createWord } from "../../redux/word/operations";
// import Dropdown from "../Dropdown/Dropdown";

// const wordSchema = Yup.object().shape({
//   en: Yup.string()
//     .trim()
//     .required("Required")
//     .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid English format"),
//   ua: Yup.string()
//     .trim()
//     .required("Required")
//     .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid Ukrainian format"),
//   category: Yup.string().required("Please select a category"),
//   verbType: Yup.boolean().when("category", {
//     is: "verb",
//     then: Yup.boolean().required("Irregular status is required for verbs"),
//     otherwise: Yup.boolean().notRequired(),
//   }),
// });

// const AddWord = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const defaultOption = "Categories";
//   const dispatch = useDispatch();
//   const categories = useSelector(selectCategories);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     control,
//     formState: { errors, dirtyFields },
//   } = useForm({ mode: "onChange", resolver: yupResolver(wordSchema) });

//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   const handleClick = () => {
//     setModalOpen(true);
//   };

//   // const [verbType, setVerbType] = useState("false");

//   const onSubmit = (data) => {
//     console.log("Submitting data", data);
//     if (data.category === "verb") {
//       data.isIrregular = data.verbType === "irregular";
//     } else {
//       data.isIrregular = false;
//     }
//     delete data.verbType;

//     console.log("Full data to submit:", data);
//     dispatch(createWord(data));
//     closeModal();
//   };
//   const handleCategoryChange = (option) => {
//     setSelectedCategory(option);
//     setValue("category", option ? option : null);
//     setValue("verbType", option === "verb" ? "regular" : null);
//   };

//   const handleVerbTypeChange = (e) => {
//     const value = e.target.value;
//     setValue("verbType", value);
//   };
//   const verbType = watch("verbType", "regular");

//   return (
//     <>
//       <button type="button" onClick={handleClick}>
//         Add Word
//       </button>

//       {modalOpen && (
//         <Modal onClose={closeModal}>
//           <div>
//             <h3>Add word</h3>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Controller
//                 name="category"
//                 control={control}
//                 render={({ field }) => (
//                   <Dropdown
//                     defaultOption={defaultOption}
//                     onSelect={handleCategoryChange}
//                     options={categories}
//                     {...field}
//                   />
//                 )}
//               />
//               {errors.category && (
//                 <p className={css.error}>{errors.category.message}</p>
//               )}

//               {selectedCategory === "verb" && (
//                 <div>
//                   <label>
//                     <input
//                       id="regular"
//                       type="radio"
//                       value="regular"
//                       name="verbType"
//                       checked={verbType === "regular"}
//                       onChange={handleVerbTypeChange}
//                       {...register("verbType")}
//                     />
//                     Regular
//                   </label>
//                   <label>
//                     <input
//                       id="irregular"
//                       type="radio"
//                       value="irregular"
//                       name="verbType"
//                       checked={verbType === "irregular"}
//                       onChange={handleVerbTypeChange}
//                       {...register("verbType")}
//                     />
//                     Irregular
//                   </label>
//                 </div>
//               )}
//               {errors.verbType && (
//                 <p className={css.error}>{errors.verbType.message}</p>
//               )}

//               <div>
//                 <input {...register("en")} type="text" id="en" />
//                 {errors.en && <p className={css.error}>{errors.en.message}</p>}
//               </div>
//               <div>
//                 <input {...register("ua")} type="text" id="ua" />
//                 {errors.ua && <p className={css.error}>{errors.ua.message}</p>}
//               </div>
//               <button type="submit">Add word</button>
//               <button type="button" onClick={closeModal}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default AddWord;
