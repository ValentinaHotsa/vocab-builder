import Popover from "@mui/material/Popover";
import { useState } from "react";

const WordMenu = ({ word, handleActions }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(word._id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleActions(word, "edit");
    handleClose();
  };

  const handleDelete = () => {
    handleActions(word, "delete");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "word-menu-popover" : undefined;

  return (
    <>
      <button aria-describedby={id} onClick={handleClick}>
        ...
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
      >
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </Popover>
    </>
  );
};

export default WordMenu;
