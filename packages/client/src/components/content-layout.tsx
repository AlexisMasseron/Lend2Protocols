import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    contentContainer: {
      marginTop: theme.spacing(3),
    },
  };
});

export function ContentLayout(props: any) {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      xs={12}
      justify="center"
      className={classes.contentContainer}
    >
      <Grid item container xs={10}>
        {props.children}
      </Grid>
    </Grid>
  );
}
