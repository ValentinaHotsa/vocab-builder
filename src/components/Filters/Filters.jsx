import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import { selectCategories } from "../../redux/word/selectors";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { fetchCategories } from "../../redux/word/operations";
import Dropdown from "../Dropdown/Dropdown";

const Filters = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [verbType, setVerbType] = useState("false");
  // const defaultOption = "Categories";

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

  // const handleCategoryChange = (option) => {
  //   setCategory(option);
  //   setVerbType("");
  //   onFilterChange({ search, category: option, verbType: "" });
  // };
  useEffect(() => {
    if (category === "verb") {
      onFilterChange({ search, category, verbType });
    }
  }, [verbType]);

  const handleCategoryChange = (option) => {
    setCategory(option);
    if (option === "verb") {
      const defaultVerbType = "false"; // Встановити дефолтне значення для verbType
      setVerbType(defaultVerbType);
      onFilterChange({ search, category: option, verbType: defaultVerbType });
    } else {
      setVerbType(""); // Очистити verbType, якщо ми не в категорії verb
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
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Find the word"
      />
      <Dropdown
        defaultOption="Categories"
        onSelect={handleCategoryChange}
        options={categories}
      />

      {category === "verb" && (
        <div>
          <input
            type="radio"
            value="false"
            checked={verbType === "false"}
            onChange={handleVerbTypeChange}
          />
          Regular
          <input
            type="radio"
            value="true"
            checked={verbType === "true"}
            onChange={handleVerbTypeChange}
          />
          Irregular
        </div>
      )}
    </div>
  );
};

export default Filters;
