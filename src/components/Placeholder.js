import { Box } from "@mui/material";

export const Placeholder = ({ text }) => {

    return (<>
        <Box component="div" className='messagetext' >
            <p className="bodytext placeholdertext">{text}</p>
        </Box>
    </>);
};
