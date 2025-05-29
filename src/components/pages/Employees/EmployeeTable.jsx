'use client'
import {useState} from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {IconSettings, IconUserEdit, IconUserX} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useEmployee} from "@/hooks";
import useToast from "@/services/useToast";

const EmployeeTable = ({allEmployees, allEmployeesLoading}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const router = useRouter()
  const open = Boolean(anchorEl);

  const {softDelete} = useEmployee()
  const {ToastComponent} = useToast();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (allEmployees?.status === 'success' && !allEmployeesLoading) {
    const employees = allEmployees.employees.sort((a, b) => b.id - a.id);

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
          <Tooltip title="Settings" placement="top" arrow>
            <IconButton onClick={(e) => {
              setEmployeeId(employee.id)
              handleClick(e)
            }}>
              <IconSettings/>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open && employeeId === employee.id}
            onClose={handleClose}
          >
            <MenuItem onClick={() => router.push(`/employees/update/${employee.id}`)}>
              <ListItemIcon>
                <IconUserEdit/>
              </ListItemIcon>
              <ListItemText>
                Edit
              </ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                softDelete(employee.id)
              }}>
              <ListItemIcon>
                <IconUserX/>
              </ListItemIcon>
              <ListItemText>
                Remove
              </ListItemText>
            </MenuItem>
          </Menu>
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
        <ToastComponent/>
      </Table>
    )
  }
  // else if(!allEmployeesLoading) {
  //   router.push('/login')
  // }
}

export default EmployeeTable;