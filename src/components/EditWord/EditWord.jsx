import { useState } from "react";
import { useDispatch } from "react-redux";
import { editWord } from "../../redux/word/operations";
import css from "./EditWord.module.css";
import Modal from "../Modal/Modal";

const EditWord = ({ word }) => {
  const dispatch = useDispatch();
  const [en, setEn] = useState("");
  const [ua, setUa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleClick = () => {
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editWord({ wordsId: word._id, credentials: { en, ua } }));
    closeModal();
  };

  return (
    <>
      <button type="button" onClick={handleClick}>
        Edit
      </button>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <div>
            <form onSubmit={handleSubmit}>
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

              <button type="submit">Save</button>
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

export default EditWord;
