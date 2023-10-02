import React, { createContext, useContext, useState, useEffect } from "react";
import getMeals from "../Components/getFuctions";

const SearchContext = createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const setSearch = (query) => {
    setSearchQuery(query);
  };

  const fetchData = async () => {
    if (!searchQuery) {
      try {
        const mealsData = await getMeals("search.php?f=b");

        setData(mealsData);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const mealsData = await getMeals(`search.php?s=${searchQuery}`);
        setData(mealsData);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, fetchData, setSearch, data, loggedIn, setLoggedIn }}
    >
      {children}
    </SearchContext.Provider>
  );
}
