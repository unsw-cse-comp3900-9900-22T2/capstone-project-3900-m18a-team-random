import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function orgnizeData(name, role, status) {
    return { name, role, status};
}

const rows = [
    orgnizeData('Barry', 'Developer', 'Online'),
    orgnizeData('Justin', 'Scrum Master', 'Offline'),
    orgnizeData('Isaac', 'Developer', 'Away'),
    orgnizeData('Kai', 'Developer', 'Away')
];

const TeamMemberTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TeamMemberTable;