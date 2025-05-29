"use client";
import {useState} from "react";

import {Card, Content, DynamicForm} from "@/components";

import {useEmployee, useGetParameters} from '@/hooks'
import {useEmployeeService} from "@/services";
import useToast from "@/services/useToast";

export default function Page() {
  const {parameters} = useGetParameters()
  const {create} = useEmployee()
  const {buttons, inputs} = useEmployeeService()
  const {ToastComponent} = useToast();

  const roles = parameters ? parameters?.roles : {}
  const departments = parameters ? parameters?.departments : {}

  const myInputs = inputs(roles, departments)
  const myButtons = buttons(false, create)

  return (<Content>
      <Card title={"Insert Employee"} sx={{width: "100%", maxWidth: 700}}>
        <DynamicForm
          inputs={myInputs}
          buttons={myButtons}
        />
      </Card>
      <ToastComponent/>
    </Content>);
}
