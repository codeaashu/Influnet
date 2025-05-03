import React from "react";

function InputFieldError({ errMessage }) {
  return <p className="text-xs text-red-500">{errMessage}</p>;
}

export default InputFieldError;
