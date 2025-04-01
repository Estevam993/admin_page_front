"use client";
import { Button, Stack, Typography } from "@mui/material";
import { Card, Content } from "@/components";
import { IconLogin2, IconUserPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleRegister = () => router.push("/register");

  const handleLogin = () => router.push("/login");

  return (
    <Content>
      <Card>
        <Stack spacing={2} alignItems={"center"}>
          <Typography variant="h5">
            Welcome to my personal admin dashboard.
          </Typography>
          <Typography variant="subtitle1">
            This is a work in progress and will be updated frequently.
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="contained"
              startIcon={<IconUserPlus />}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<IconLogin2 />}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Content>
  );
}
