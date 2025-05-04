"use client";
import {useState} from "react";

import {Card, Content, DynamicForm} from "@/components";

import {useEmployee, useGetParameters} from '@/hooks'
import {useEmployeeService} from "@/services";

export default function Page() {
  const {parameters} = useGetParameters()
  const [loading, setLoading] = useState(false)
  const {create, ToastComponent} = useEmployee()
  const {buttons, inputs} = useEmployeeService()

  const roles = parameters ? parameters?.roles : {}
  const departments = parameters ? parameters?.departments : {}

  const handleSubmit = async formValues => {
    setLoading(true)
    try {
      await create(formValues)
    } finally {
      setLoading(false)
    }
  }

  const myInputs = inputs(roles, departments)
  const myButtons = buttons( loading, handleSubmit)

  return (
    <Content>
      <Card title={"Insert Employee"} sx={{width: "100%", maxWidth: 700}}>
        <DynamicForm
          inputs={myInputs}
          buttons={myButtons}
        />
      </Card>
      <ToastComponent/>
    </Content>
  );
}
