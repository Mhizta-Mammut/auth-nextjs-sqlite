import Head from 'next/head';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const vehicles = ({ list }) => {
    return (
      <>
        <Head>
          <title>
            Vehicles List
          </title>
        </Head>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Owner Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.model}</TableCell>
                <TableCell align="right">{row.ownerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}

vehicles.getInitialProps = async () => {
    const resp = await fetch('http://localhost:3000/api/vehicles');
    const json = await resp.json();

    return {
        list: json
    };

}

export default vehicles
