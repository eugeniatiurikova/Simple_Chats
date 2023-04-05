import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { avatarParams } from "../utils/functions";
import { auth } from "../service/firebase";
import { getUserByID } from "../store/messages/actions";
import { A_UID } from "../utils/constants";

export const Message = ({ message, onDelete }) => {

  const loclUser = getUserByID(message.userId);

  const handleDelete = () => {
    onDelete(message.id);
  };

  const tooltipHTML = () => {
    let string1 = 'Registered: ' + loclUser.usrDate;
    let string2 = 'Email: ' + ((loclUser.usrEmail !== '') ? loclUser.usrEmail : 'no e-mail');
    let string3 = 'About user: ' + ((loclUser.usrInfo !== '') ? loclUser.usrInfo : 'no information')
    if (message.author === 'Anonymus') {
      string1 = null;
    }
    return { string1, string2, string3 }
  };


  return (<>
    <Card sx={{ margin: '20px 0 20px 0', backgroundColor: 'background.paper' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarParams(message.author).bgcolor }}>{avatarParams(message.author).avname}</Avatar>
        }
        action={
          <IconButton onClick={handleDelete}
            disabled={((auth.currentUser.uid !== message.userId) & (auth.currentUser.uid !== A_UID)) ? true : false}>
            <DeleteOutlined />
          </IconButton>
        }
        title={
          tooltipHTML().string1 ?
            <Tooltip title={<><p>{tooltipHTML().string1}</p><p>{tooltipHTML().string2}</p><p>{tooltipHTML().string3}</p></>}>
              <Typography variant="body1" sx={{ color: 'primary.main' }}>{message.author}</Typography>
            </Tooltip> :
            <Typography variant="body1" sx={{ color: 'primary.main' }}>{message.author}</Typography>
        }
        subheader={<span className="datatext">{message.time}</span>}
      /><CardContent sx={{ paddingTop: '0' }}>
        <p className="bodytext">{message.text}</p>
      </CardContent>
    </Card>
  </>);
};
