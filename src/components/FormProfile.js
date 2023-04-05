import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";

export const FormProfile = ({ focusOnChange, onSubmit }) => {
    const [valueName, setValueName] = useState("");
    const [valueEmail, setValueEmail] = useState("");
    const [valueInfo, setValueInfo] = useState("");

    const inputRef = useRef();

    const handleChangeValueName = (e) => {
        setValueName(e.target.value);
    };
    const handleChangeValueInfo = (e) => {
        setValueInfo(e.target.value);
    };
    const handleChangeValueEmail = (e) => {
        setValueEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e?.preventDefault && e.preventDefault();
        setValueName("");
        setValueInfo("");
        setValueEmail("");
        onSubmit(valueName, valueInfo, valueEmail);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [focusOnChange]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField value={valueName} onChange={handleChangeValueName} inputRef={inputRef} placeholder='New User Name' sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} fullWidth label='New User Name' />
            <TextField value={valueEmail} onChange={handleChangeValueEmail} placeholder='New Email' sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} fullWidth label='New Email' />
            <TextField value={valueInfo} onChange={handleChangeValueInfo} placeholder='New User Info' sx={{ margin: '10px 0 10px 0', backgroundColor: 'background.paper' }} multiline fullWidth label='New User Info' />
            <Button sx={{ margin: '10px 0 10px 0' }} variant="contained" size="large" type='submit'>CHANGE</Button>
        </form>
    );
};
