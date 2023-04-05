import { Box, Button, Card, CardContent, CardHeader, Checkbox, Divider, FormControlLabel, Typography } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch, } from "react-redux";
import { NavLink } from "react-router-dom";
import { initUserData, setName, setNameInDB, setEmailInDB, setInfoInDB, setShowNameInDB, toggleName, setInfo, setEmail } from "../store/profile/actions";
import { FormProfile } from "./FormProfile";
import { UserInfo } from "./UserInfo";

const ProfileForConnect = ({
  showName,
  userName,
  userEmail,
  userInfo,
  setNameInDB,
  setEmailInDB,
  setInfoInDB,
  setShowNameInDB,
  initUserData,
}) => {

  useEffect(() => {
    initUserData();
  }, []);

  const handleChange = (e) => {
    setShowNameInDB(e.target.checked);
    dispatch(toggleName(e.target.checked));
  };

  const handleSubmit = (newName, newInfo, newEmail) => {
    if (newName) {
      setNameInDB(newName);
      dispatch(setName(newName));
    }
    if (newInfo) {
      setInfoInDB(newInfo);
      dispatch(setInfo(newInfo))
    }
    if (newEmail) {
      setEmailInDB(newEmail);
      dispatch(setEmail(newEmail))
    }
  };
  const dispatch = useDispatch();


  return (<>
    <div className="content_r">
      <Box component="div" className='messagetext' autoComplete="off" >
        <div className="buttoncontainer">
          <UserInfo isProfile />
          <Button color="inherit" to="/chats"><NavLink to="/chats">go to chats</NavLink>
          </Button>
        </div>
        <Card sx={{ margin: '20px 0 20px 0', backgroundColor: 'background.paper' }}>
          <CardHeader
            title={
              <Typography variant="body1" sx={{ color: 'primary.main' }}><span className="datatext">Name: </span> {showName ? userName : 'Anonymus'}</Typography>
            }
            subheader={<Typography variant="body1" sx={{ color: 'primary.main' }}><span className="datatext">E-mail: </span>{showName ? <a href={`mailto:${userEmail}`}>{userEmail}</a> : 'hidden email'}</Typography>}
          />
          <CardContent sx={{ paddingTop: '0' }}>
            <p className="bodytext">{userInfo ?
              <><span className="datatext">About: </span>{userInfo}</> :
              <span className="datatext">This is the place for the text about you</span>}
            </p>
          </CardContent>
        </Card>
      </Box>
    </div>
    <div className="content_l">
      <Box component="div" className='messagetext' >
        <Typography variant="h5" color="primary">Change user info</Typography>
        <FormProfile placeholder="New User Name" buttontext="Change" onSubmit={handleSubmit} />
        <br /><Divider /><br />
        <FormControlLabel control={<Checkbox checked={showName} onChange={handleChange} />} label="Show your name in chats" />
      </Box>
    </div>
  </>);
};

const mapStateToProps = (state) => ({
  showName: state.profile.showName,
  userName: state.profile.name,
  userEmail: state.profile.email,
  userInfo: state.profile.info,
});

const mapDispatchToProps = {
  setNameInDB,
  setShowNameInDB,
  setInfoInDB,
  setEmailInDB,
  initUserData,
};

const ConnectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForConnect);

export default ConnectedProfile;