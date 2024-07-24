import { useState } from "react";
import css from "./AddWord.module.css";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../redux/word/selectors";
import { createWord } from "../../redux/word/operations";

const AddWord = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = () => {
    setModalOpen(true);
  };

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("all");
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [verbType, setVerbType] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleVerbTypeChange = (e) => {
    setVerbType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "verb" && !verbType) {
      alert("Please select a verb type");
      return;
    }
    dispatch(createWord({ en, ua, category, verbType }));
    closeModal();
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
            <form onSubmit={handleSubmit}>
              <select value={category} onChange={handleCategoryChange}>
                {categories.map((categ) => (
                  <option key={categ} value={categ}>
                    {categ}
                  </option>
                ))}
              </select>

              {category === "verb" && (
                <div>
                  <input
                    type="radio"
                    value="regular"
                    checked={verbType === "regular"}
                    onChange={handleVerbTypeChange}
                  />
                  Regular
                  <input
                    type="radio"
                    value="irregular"
                    checked={verbType === "irregular"}
                    onChange={handleVerbTypeChange}
                  />
                  Irregular
                </div>
              )}

              <input
                type="text"
                value={en}
                onChange={(e) => setEn(e.target.value)}
              />
              <input
                type="text"
                value={ua}
                onChange={(e) => setUa(e.target.value)}
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
