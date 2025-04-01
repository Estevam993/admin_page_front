"use client";

import { Card, Content, DynamicForm } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const redirectRegister = () => router.push("/register");

  return (
    <Content>
      <Card title={"Login"} sx={{ width: "100%", maxWidth: 700 }}>
        <DynamicForm
          inputs={[
            {
              type: "text",
              name: "nameOrEmail",
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
              onClick: (formValues) => alert(JSON.stringify(formValues)),
            },
          ]}
        />
      </Card>
    </Content>
  );
}
