import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";

export const Form = ({ placeholder, buttontext, focusOnChange, onSubmit, multiline }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault && e.preventDefault();
    setValue("");
    onSubmit(value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [focusOnChange]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField value={value} onChange={handleChange} inputRef={inputRef} placeholder={placeholder} sx={{ margin: '0 0 10px 0', backgroundColor: 'background.paper' }} required multiline={multiline} fullWidth label={placeholder} />
      {buttontext && <Button sx={{ margin: '10px 0 10px 0' }} variant="contained" size="large" type='submit'>{buttontext}</Button>}
    </form>
  );
};
