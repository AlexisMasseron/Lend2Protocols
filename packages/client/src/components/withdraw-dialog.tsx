import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { WithdrawStepper } from "./withdraw-stepper";
import background from "assets/backgroundl2p.png";
import { l2pDarkBlue } from "contexts/theme";

const useStyles = makeStyles((theme) => {
  return {
    dialogPaper: {
      width: 800,
      maxWidth: 800,
      minHeight: 300,
    },
    content: {
      backgroundImage: `url(${background})`,
    },
    stepComponentContainer: {
      height: "80px",
      backgroundcolor: "transparent",
    },
    title: {
      color: l2pDarkBlue,
      backgroundColor: "transparent",
    },
  };
});

export function WithdrawDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Withdraw
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle className={classes.title}>
          {<strong>Withdraw your Assets?</strong>}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <WithdrawStepper closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
