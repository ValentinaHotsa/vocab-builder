import Popover from "@mui/material/Popover";
import { useState } from "react";
import EditWord from "../EditWord/EditWord";
import svg from "../../assets/icon.svg";
import css from "./WordMenu.module.css";

const WordMenu = ({ word, handleActions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditModal, setEditModalOpen] = useState(false);

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(word._id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleActions(word, "edit");
    setEditModalOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    handleActions(word, "delete");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "word-menu-popover" : undefined;

  return (
    <div className={css.wrap}>
      <button
        aria-describedby={id}
        onClick={handleClick}
        className={css.button}
      >
        <svg className={css.icon}>
          <use href={`${svg}#icon-dots`} />
        </svg>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          ".MuiPaper-root": {
            borderRadius: "15px",
            boxShadow: "0px 4px 47px 0px rgba(18, 20, 23, 0.08)",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <div className={css.btnWrap}>
          <button onClick={handleEdit} className={css.menuBtn}>
            <svg className={css.menuIcon}>
              <use href={`${svg}#icon-pen`} />
            </svg>
            Edit
          </button>
          <button onClick={handleDelete} className={css.menuBtn}>
            <svg className={css.menuIcon}>
              <use href={`${svg}#icon-trash`} />
            </svg>
            Delete
          </button>
        </div>
      </Popover>
      {openEditModal && <EditWord word={word} onClose={closeEditModal} />}
    </div>
  );
};

export default WordMenu;
