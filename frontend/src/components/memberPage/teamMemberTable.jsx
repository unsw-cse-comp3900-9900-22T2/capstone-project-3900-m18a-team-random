import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PopupButton from '../popupButton';
import MemberProfilePanel from '../memberProfile';

const getDescription = (description) => {
    if(description === null)
        return "No description here"
    else
        return description;
}

const TeamMemberTable = ({members}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth:500}}>
            <TableHead>
            <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Profile</TableCell>
            </TableRow>
            </TableHead>
                <TableBody>
                    {members.map((member) => (
                        <TableRow
                        key={member['member_name']}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <PopupButton buttonTitle={member['member_name']} title='Profile'>
                                    <MemberProfilePanel memberEmail={member['member_email']}/>
                                </PopupButton>
                            </TableCell>
                            <TableCell>{member['member_email']}</TableCell>
                            <TableCell>{getDescription(member['description'])}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TeamMemberTable;