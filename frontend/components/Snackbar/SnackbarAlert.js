import React, {useState, useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarAlert(props) {
  const { state, msg, severity, vertical, horizontal } = props;
  const ver = (vertical === undefined  ? 'top' : vertical)
  const hor = (horizontal === undefined  ? 'right' : horizontal)

  const [alert,setAlert] = useState({'state':state,'msg':msg, 'severity': severity,'vertical': ver, 'horizontal': hor});

  useEffect(() => {
    setAlert({'state':state,'msg':msg, 'severity': severity,'vertical': ver, 'horizontal': hor});
  },[props])

  //close alert
  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({'state':false,'msg':'', 'severity': severity,'vertical': ver, 'horizontal': hor});
  };

  return (
    <Snackbar open={alert.state} autoHideDuration={6000} onClose={snackClose} anchorOrigin={{ vertical: alert.vertical, horizontal: alert.horizontal }}>
      <Alert onClose={snackClose} severity={alert.severity}>{alert.msg}</Alert>
    </Snackbar>
  )
}

SnackbarAlert.propTypes = {
  state: PropTypes.bool,
  msg: PropTypes.node.isRequired,
  severity: PropTypes.oneOf(["error","info","success","warning"]),
  vertical: PropTypes.string,
  horizontal: PropTypes.string
};