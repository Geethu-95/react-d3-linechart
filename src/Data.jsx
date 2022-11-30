import React, { useEffect,useState } from "react";
import * as d3 from "d3";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
// import Graph from "./Graph";
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};


const Data =  () => {

  const [data, setData] = useState([]);

   axios.get('http://fetest.pangeatech.net/data')
  .then(response => setData(response.data))
  .catch(error => {
      console.log('There was an error',error);
  })
   
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { items, requestSort, sortConfig } = useSortableData(data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>

    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 600 ,height:650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><Button
              type="button"
              onClick={() => requestSort('S_no')}
              className={getClassNamesFor('S_no')}
            >
              S_no
            </Button>
              </TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('line_of_business')}
              className={getClassNamesFor('line_of_business')}
            >
              line_of_business
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('revenue_type')}
              className={getClassNamesFor('revenue_type')}
            >
              revenue_type
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('product')}
              className={getClassNamesFor('product')}
            >
              product
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('year')}
              className={getClassNamesFor('year')}
            >
              year
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('month')}
              className={getClassNamesFor('month')}
            >
              month
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('acv')}
              className={getClassNamesFor('acv')}
            >
              acv
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('tcv')}
              className={getClassNamesFor('tcv')}
            >
              tcv
            </Button></TableCell>
            <TableCell align="right"><Button
              type="button"
              onClick={() => requestSort('revenue')}
              className={getClassNamesFor('revenue')}
            >
              revenue
            </Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : items
          ).map((row) => (
            <TableRow
              key={row.S_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.S_no}
              </TableCell>
              <TableCell align="right">{row.line_of_business}</TableCell>
              <TableCell align="right">{row.revenue_type}</TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{'$'+row.acv.toLocaleString()}</TableCell>
              <TableCell align="right">{row.tcv}</TableCell>
              <TableCell align="right">{row.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}


export default Data;