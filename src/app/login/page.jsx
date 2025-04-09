"use client";

import { Card, Content, DynamicForm } from "@/components";
import { useUser } from "@/hooks";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const redirectRegister = () => router.push("/register");

  const { login, ToastComponent } = useUser();

  const handleClick = async (formValues) => {
    try {
      await login(formValues);
    } catch (e) {
      toast({
        description: "Something went wrong",
        status: "error",
        variant: "filled",
      });
    }
  };

  return (
    <Content>
      <Card title={"Login"} sx={{ width: "100%", maxWidth: 700 }}>
        <Typography textAlign={"center"} variant="subtitle2">
          Name: Admin <br />
          Password: Admin1234
        </Typography>
        <DynamicForm
          inputs={[
            {
              type: "text",
              name: "email",
              label: "Name or Email",
              required: true,
            },
            {
              type: "password",
              name: "password",
              label: "Password",
              required: true,
            },
          ]}
          buttons={[
            {
              label: "I don't have an account",
              variant: "text",
              color: "primary",
              onClick: (formValues) => redirectRegister(),
            },
            {
              label: "Login",
              variant: "contained",
              color: "success",
              onClick: (formValues) => handleClick(formValues),
            },
          ]}
        />
      </Card>
      <ToastComponent />
    </Content>
  );
}
