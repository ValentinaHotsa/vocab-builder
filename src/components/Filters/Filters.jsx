import { useDispatch, useSelector } from "react-redux";
import css from "./Filters.module.css";
import { selectCategories } from "../../redux/word/selectors";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/word/operations";

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [verbType, setVerbType] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setVerbType("");
  };

  const handleVerbTypeChange = (e) => {
    setVerbType(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Find the word"
      />
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
    </div>
  );
};

export default Filters;
