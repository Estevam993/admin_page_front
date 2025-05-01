"use client";
import {Card,} from "@/components";
import {
  Button,
  Fab,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip, Typography
} from "@mui/material";
import {IconUserPlus} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useEmployee} from "@/hooks";

export default function Page() {
  const {allEmployees, allEmployeesLoading} = useEmployee()
  const router = useRouter();
  const addUser = () => router.push("/employees/add");

  const EmployeeTable = () => {
    if (allEmployees.status === 'success') {
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

  }

  return (
    <Grid container padding={2} spacing={2} size={{xs: 12, sm: 6}}>
      <Grid size={4}>
        <Card>
          <Button
            variant="contained"
            startIcon={<IconUserPlus/>}
            onClick={addUser}
          >
            Add User
          </Button>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card title={"Employees"}>
          {
            !allEmployeesLoading
              ? <EmployeeTable/>
              : <Typography>Loading...</Typography>
          }
        </Card>
      </Grid>
    </Grid>
  );
}
