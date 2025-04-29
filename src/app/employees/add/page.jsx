"use client";

import { Card, Content, DynamicForm } from "@/components";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import departments from "./departments.json";
import roles from "./roles.json";

export default function Page() {
  return (
    <Content>
      <Card title={"Insert Employee"} sx={{ width: "100%", maxWidth: 700 }}>
        <DynamicForm
          inputs={[
            {
              type: "text",
              name: "name",
              label: "Name",
              required: true,
            },
            {
              type: "text",
              name: "email",
              label: "Email",
              required: true,
            },
            {
              type: "options",
              options: roles,
              name: "role",
              label: "Role",
              required: true,
            },
            {
              type: "options",
              options: departments,
              name: "department",
              label: "Department",
              required: true,
            },
          ]}
          buttons={[
            {
              label: "Cancel",
              variant: "outlined",
              color: "secondary",
            },
            {
              label: "Create",
              variant: "contained",
              color: "success",
              onClick: (formValues) => alert(JSON.stringify(formValues)),
            },
          ]}
        />
      </Card>
      {/* <ToastComponent /> */}
    </Content>
  );
}
