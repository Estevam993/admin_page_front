'use client'
import {useRouter} from "next/navigation";

const useEmployeeService = () => {
  const router = useRouter()

  const buttons = (loading, handleSubmit) => {
    return [
      {
        label: "Cancel",
        variant: "outlined",
        color: "secondary",
        onClick: () => router.push("/employees"),
      },
      {
        label: "Create",
        variant: "contained",
        color: "success",
        loading: loading,
        onClick: (formValues) => handleSubmit(formValues),
      },
    ]
  }

  const inputs = (roles, departments) => {
    return [
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
    ]
  }


  return {
    buttons, inputs
  }
}

export default useEmployeeService;