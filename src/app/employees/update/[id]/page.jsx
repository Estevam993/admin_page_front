"use client";
import {useEffect, useState} from "react";

import {Card, Content, DynamicForm} from "@/components";

import {useEmployee, useGetParameters} from '@/hooks'
import {useEmployeeService} from "@/services";
import {use} from "react";


export default function Page({params}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)

  const {parameters} = useGetParameters()

  const {
    employee, isFetchingEmployee, update,
  } = useEmployee(id)
  const {buttons, inputs} = useEmployeeService()

  useEffect(() => {
    if (!isFetchingEmployee && employee && employee.status === 'success') setValues({
      name: employee.employee.name,
      email: employee.employee.email,
      role: employee.employee.roleDetails.id,
      department: employee.employee.departmentDetails.id,
    })
  }, [employee, setValues, isFetchingEmployee])


  const roles = parameters ? parameters?.roles : {}
  const departments = parameters ? parameters?.departments : {}

  const handleSubmit = async formValues => {
    setLoading(true)
    try {
      formValues = {...formValues, role: formValues.role.id, department: formValues.department.id}
      await update({id, params: formValues})
    } finally {
      setLoading(false)
    }
  }

  if (!isFetchingEmployee && employee && employee.status === 'success') {
    const myInputs = inputs(roles, departments, values)
    const myButtons = buttons('Update', isFetchingEmployee, handleSubmit)

    return (<Content>
      <Card title={"Insert Employee"} sx={{width: "100%", maxWidth: 700}}>
        <DynamicForm
          inputs={myInputs}
          buttons={myButtons}
        />
      </Card>
    </Content>)
  }
}