'use client'
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

const EmployeeTable = ({allEmployees, allEmployeesLoading}) => {
  if (allEmployees?.status === 'success' && !allEmployeesLoading) {
    const employees = allEmployees.employees;

    const employeesMap = () => employees.map((employee, index) => (
      <TableRow key={index}>
        <TableCell>
          <Typography>{employee.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{employee.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{employee.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{employee.roleDetails.label}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{employee.departmentDetails.label}</Typography>
        </TableCell>
        <TableCell>
          <Typography>Ação</Typography>
        </TableCell>
      </TableRow>
    ))

    return (
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>ID</Typography>
            </TableCell>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>E-mail</Typography>
            </TableCell>
            <TableCell>
              <Typography>Role</Typography>
            </TableCell>
            <TableCell>
              <Typography>Department</Typography>
            </TableCell>
            <TableCell>
              <Typography>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesMap()}
        </TableBody>
      </Table>
    )
  }
  // else if(!allEmployeesLoading) {
  //   router.push('/login')
  // }
}

export default EmployeeTable;