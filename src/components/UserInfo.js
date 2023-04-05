import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut, } from "../service/firebase";
import { avatarParams } from "../utils/functions";
import { setName } from "../store/profile/actions";
import { selectUserName, selectShowName } from "../store/selectors";
import { useState } from "react";
import { Logout, PermIdentity } from "@mui/icons-material";
import ForumIcon from '@mui/icons-material/Forum';

export const UserInfo = ({ isProfile }) => {
    const username = useSelector(selectUserName);
    const showName = useSelector(selectShowName);
    const dispatch = useDispatch();

    const userParams = () => {
        let tmp = ((username === '') || username === 'null') ? '??' : username;
        tmp = showName ? tmp : 'Anonymus';
        return avatarParams(tmp)
    };

    const handleSignOut = () => {
        dispatch(setName(''));
        logOut();
    };

    // Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };
    // Menu

    return (<>{(username !== '') &&
        <IconButton sx={{ margin: '-5px' }}
            onClick={handleClickMenu}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
            <Avatar sx={{ bgcolor: userParams().bgcolor }}>{userParams().avname}</Avatar>
        </IconButton>
    }
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            {!isProfile &&
                <MenuItem>
                    <ListItemIcon><PermIdentity fontSize="small" /></ListItemIcon>
                    <ListItemText><NavLink to="/profile" >Profile</NavLink></ListItemText>
                </MenuItem>
            }

            {isProfile &&
                <MenuItem>
                    <ListItemIcon><ForumIcon fontSize="small" /></ListItemIcon>
                    <ListItemText><NavLink to="/chats" >Chats</NavLink></ListItemText>
                </MenuItem>
            }

            <MenuItem onClick={handleSignOut}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                <ListItemText>Sign Out</ListItemText>
            </MenuItem>
        </Menu>

    </>);
};
