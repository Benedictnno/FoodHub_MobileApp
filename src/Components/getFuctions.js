import React, { useState } from "react";
import axios from "../axios-config";

async function getMeals(url) {
  try {
    const response = await axios.get(url);
    console.log(response);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
// export async function getCategory(url, setCategory) {
//   try {
//     const response = await axios.get(url);

//     setCategory(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

export default getMeals;
