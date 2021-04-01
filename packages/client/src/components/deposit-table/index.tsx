import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { DataGrid, ColDef } from "@material-ui/data-grid";
import { WithdrawDialog } from "components/withdraw-dialog";
import { useDeposits } from "./use-deposits";
import background from "assets/backgroundl2p.png";
import { l2pLightBlue } from "contexts/theme";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles((theme) => {
  return {
    depositTableContainer: {
      height: "100%",
      flex: 1,
      padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
      display: "flex",
      backgroundImage: `url(${background})`,
    },
    titleContainer: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  };
});

export function DepositTable() {
  const classes = useStyles();

  return (
    <Paper
      className={classes.depositTableContainer}
      variant="elevation"
      elevation={10}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          className={classes.titleContainer}
        >
          <AssessmentIcon fontSize="large" />
          <Typography variant="h5" component="h5" className={classes.title}>
            My Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AssetTable />
        </Grid>
      </Grid>
    </Paper>
  );
}

const columns: ColDef[] = [
  {
    field: "asset",
    headerName: "Asset",
    flex: 0.75,
    type: "string",
    renderHeader: () => <strong>Asset</strong>,
  },
  {
    field: "l2pDep",
    headerName: "l2pDeposit",
    flex: 0.75,
    renderHeader: () => <strong>Deposit</strong>,
  },
  {
    field: "l2pLoan",
    headerName: "l2pLoaned",
    flex: 0.75,
    renderHeader: () => <strong>Loaned</strong>,
  },
  {
    field: "protocolEarnings",
    headerName: "Protocol earnings",
    description: "Earned interests to date via underlying protocol",
    flex: 1,
    renderHeader: () => <strong>Deposit Profit</strong>,
  },
  {
    field: "L2PEarnings",
    headerName: "L2P earnings",
    description: "Earned interests to date via L2P protocol",
    flex: 1,
    renderHeader: () => <strong>L2P Profit</strong>,
  },
  {
    field: "Action",
    headerName: "Action",
    sortable: false,
    width: 120,
    renderCell: () => <WithdrawDialog />,
    renderHeader: () => <strong>Action</strong>,
  },
];

const useAssetTableStyles = makeStyles((theme) => {
  return {
    dataGridContainer: {
      flex: 1,
      minHeight: 200,
    },
    progressContainer: {
      height: "100%",
    },
    root: {
      color: l2pLightBlue,
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-cell": {
        color: "#ffff",
      },
    },
  };
});

function AssetTable() {
  const classes = useAssetTableStyles();
  const { isLoading, data: rows } = useDeposits();

  return (
    <div className={classes.dataGridContainer}>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          className={classes.progressContainer}
        >
          <CircularProgress />
        </Box>
      ) : !rows ? (
        <Typography>Oh no, there is nothing to display</Typography>
      ) : (
        <DataGrid
          className={classes.root}
          rows={rows}
          columns={columns}
          pageSize={3}
          background-color="inherit"
          hideFooterSelectedRowCount={true}
          disableColumnMenu={true}
          hideFooterPagination={true}
          hideFooterRowCount={true}
        />
      )}
    </div>
  );
}
