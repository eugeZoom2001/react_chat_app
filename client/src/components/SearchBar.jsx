import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
const SearchBar = ({ setFilter }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setFilter(e.target.value);
      }}
      label="Buscar Usuario"
      variant="outlined"
      placeholder="Entrar Usuario..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

export default SearchBar;
