import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import { selectCategories } from "../../redux/word/selectors";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { fetchCategories } from "../../redux/word/operations";
import Dropdown from "../Dropdown/Dropdown";
import style from "../Dropdown/Dropdown.module.css";
import svg from "../../assets/icon.svg";

const Filters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [verbType, setVerbType] = useState("false");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const debounceSearch = useRef(
    debounce((value) => {
      console.log("Debounced search with value:", value);
      onFilterChange({ search: value, category, verbType });
    }, 300)
  ).current;

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearch(value);
    debounceSearch(value);
  };

  useEffect(() => {
    if (category === "verb") {
      onFilterChange({ search, category, verbType });
    }
  }, [verbType]);

  const handleCategoryChange = (option) => {
    setCategory(option);
    if (option === "verb") {
      const defaultVerbType = "false";
      setVerbType(defaultVerbType);
      onFilterChange({ search, category: option, verbType: defaultVerbType });
    } else {
      setVerbType("");
      onFilterChange({ search, category: option, verbType: "" });
    }
  };

  const handleVerbTypeChange = (e) => {
    const value = e.target.value;
    setVerbType(value);

    onFilterChange({ search, category, verbType: value });

    setTimeout(() => onFilterChange({ search, category, verbType: value }), 0);
  };

  return (
    <div className={css.filterContainer}>
      <div className={css.inputContainer}>
        <input
          className={css.input}
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Find the word"
        />
        <svg className={css.icon}>
          <use href={`${svg}#icon-search`} />
        </svg>
      </div>
      <Dropdown
        defaultOption="Categories"
        onSelect={handleCategoryChange}
        options={["all", ...categories]}
        className={style.dropdownFilter}
        dropHeader={style.headerFilter}
        dropList={style.listFilter}
      />

      <div
        className={css.btnWrap + (category === "verb" ? " " + css.visible : "")}
      >
        <label className={css.radioContainer}>
          Regular
          <input
            type="radio"
            value="false"
            name="verbType"
            checked={verbType === "false"}
            onChange={handleVerbTypeChange}
          />
          <span className={css.checkmark}></span>
        </label>

        <label className={css.radioContainer}>
          Irregular
          <input
            type="radio"
            value="true"
            name="verbType"
            checked={verbType === "true"}
            onChange={handleVerbTypeChange}
          />
          <span className={css.checkmark}></span>
        </label>
      </div>
    </div>
  );
};

export default Filters;
