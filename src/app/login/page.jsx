"use client";

import {Card, Content, DynamicForm} from "@/components";
import {useGetParameters, useUser} from "@/hooks";
import {Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";

export default function Page() {
  const router = useRouter();
  const {toast} = useToast();
  const redirectRegister = () => router.push("/register");

  const {login, ToastComponent} = useUser();

  const handleClick = async (formValues) => {
    try {
      await login(formValues);
      const parameters = useGetParameters()
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
      <Card title={"Login"} sx={{width: "100%", maxWidth: 700}}>
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
      <ToastComponent/>
    </Content>
  );
}
