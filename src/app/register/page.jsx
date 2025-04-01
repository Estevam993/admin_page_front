"use client";

import { Card, Content, DynamicForm } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const redirectLogin = () => router.push("/login");

  return (
    <Content>
      <Card title={"Register"} sx={{ width: "100%", maxWidth: 700 }}>
        <DynamicForm
          inputs={[
            {
              type: "text",
              name: "firstName",
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
              variant: "contained",
              variant: "text",
              onClick: (formValues) => redirectLogin(),
            },
            {
              label: "Register",
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
