"use client";
import { Content } from "@/components";
import { Button, Fab, IconButton, Stack, Tooltip } from "@mui/material";
import { IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const addUser = () => router.push("/employees/add");

  return (
    <Content
      padding={2}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <Stack>
        <Tooltip title="Add User" arrow>
          <Fab onClick={addUser} size={"small"} color={"primary"}>
            <IconUserPlus />
          </Fab>
        </Tooltip>
      </Stack>
      <h1>Employees</h1>
      <p>List of employees will be displayed here.</p>
    </Content>
  );
}
