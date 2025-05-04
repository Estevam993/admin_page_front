"use client";

import { Card, Content, DynamicForm } from "@/components";
import { useUser } from "@/hooks";
import { useRouter } from "next/navigation";

export default function YourComponent() {
  const router = useRouter();
  const redirectLogin = () => router.push("/login");
  const { register, ToastComponent } = useUser();

  const handleClick = async (formValues) => {
    try {
      await register(formValues);
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
      <Card title={"Register"} sx={{ width: "100%", maxWidth: 700 }}>
        <DynamicForm
          inputs={[
            {
              type: "text",
              name: "name",
              label: "Full Name",
              required: true,
            },
            {
              type: "email",
              name: "email",
              label: "Email",
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
              label: "I have an account",
              variant: "text",
              onClick: (formValues) => redirectLogin(),
            },
            {
              label: "Register",
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
