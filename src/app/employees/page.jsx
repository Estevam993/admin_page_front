"use client";
import {Card,} from "@/components";
import {
  Button,
  Grid,
  Stack, Typography
} from "@mui/material";
import {IconUserPlus} from "@tabler/icons-react";
import {useRouter} from "next/navigation";
import {useEmployee} from "@/hooks";
import {EmployeeTable} from "@/components/pages";

export default function Page() {
  const {allEmployees, allEmployeesLoading} = useEmployee()
  const router = useRouter();
  const addUser = () => router.push("/employees/add");

  return (
    <Grid container padding={2} spacing={2} size={{xs: 12, sm: 6}}>
      <Grid size={4}>
        <Card>
          <Stack gap={2} direction="column" alignItems={"stretch"}>
            <Button
              variant="contained"
              color="success"
              startIcon={<IconUserPlus/>}
              onClick={addUser}
            >
              Add Employee
            </Button>
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  color="secondary"*/}
            {/*  startIcon={<IconVectorBezier/>}*/}
            {/*  onClick={addUser}*/}
            {/*>*/}
            {/*  Add Department*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  color="primary"*/}
            {/*  startIcon={<IconTools/>}*/}
            {/*  onClick={addUser}*/}
            {/*>*/}
            {/*  Add Role*/}
            {/*</Button>*/}

          </Stack>
        </Card>
      </Grid>
      <Grid size={8}>
        <Card title={"Employees"}>
          {
            !allEmployeesLoading
              ? <EmployeeTable allEmployees={allEmployees} allEmployeesLoading={allEmployeesLoading}/>
              : <Typography>Loading...</Typography>
          }
        </Card>
      </Grid>
    </Grid>
  );
}
