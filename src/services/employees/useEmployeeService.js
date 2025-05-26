'use client'
import {useRouter} from "next/navigation";

const useEmployeeService = () => {
  const router = useRouter()

  const buttons = (label = 'Create', loading, handleSubmit) => {
    return [
      {
        label: "Cancel",
        variant: "outlined",
        color: "secondary",
        onClick: () => router.push("/employees"),
      },
      {
        label: label,
        variant: "contained",
        color: "success",
        loading: loading,
        onClick: (formValues) => handleSubmit(formValues),
      },
    ]
  }

  const inputs = (roles, departments, values = {}) => {
    return [
      {
        type: "text",
        name: "name",
        label: "Name",
        required: true,
        value: values.name || '',
      },
      {
        type: "text",
        name: "email",
        label: "Email",
        required: true,
        value: values.email || '',
      },
      {
        type: "options",
        options: roles,
        name: "role",
        label: "Role",
        required: true,
        value: values.role || null,
      },
      {
        type: "options",
        options: departments,
        name: "department",
        label: "Department",
        required: true,
        value: values.role || null,
      },
    ]
  }


  return {
    buttons, inputs
  }
}

export default useEmployeeService;