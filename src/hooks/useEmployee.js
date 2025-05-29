import {postRequest, getRequest} from "@/util/http";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";
import {useGetParameters} from "@/hooks/index";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useEmployee = (id = null) => {
  const {parameters} = useGetParameters();
  const router = useRouter();
  const {toast} = useToast();
  const queryClient = useQueryClient();

  const user = parameters?.user || false;

  const {data: allEmployees, isLoading: allEmployeesLoading} = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getRequest({
        url: `${apiUrl}employee`,
      })
    },
    enabled: !!user,
  })

  const {data: employee, isLoading: isFetchingEmployee} = useQuery({
    queryKey: ['get_employee', id],
    queryFn: async ({queryKey}) => {
      const [, employeeId] = queryKey;
      return await getRequest({
        url: `${apiUrl}employee/${employeeId}`,
      });
    },
    enabled: !!id,
  });

  const createEmployee = useMutation({
    mutationKey: ['createEmployee'],
    mutationFn: async (params) => {
      return await postRequest({
        url: `${apiUrl}employee`,
        params: params,
      });
    },
    onSuccess: (response) => {
      const message = response?.message || "Error"
      if (response.status === "error") {
        toast({
          description: message,
          status: "error",
        });
        return;
      }
      toast({
        description: message,
        status: "success",
      });
      queryClient.invalidateQueries('employees');
      router.push("/employees");
      return response;
    },
  });

  const updateEmployee = useMutation({
    mutationKey: ['updateEmployee', id],
    mutationFn: async ({id, params}) => {
      return await postRequest({
        url: `${apiUrl}employee/update/${id}`,
        params: params,
      });
    },
    onSuccess: (response) => {
      const message = response?.message || "Error"
      if (response.status === "error") {
        toast({
          description: message,
          status: "error",
        });
        return;
      }
      toast({
        description: message,
        status: "success",
      });
      queryClient.invalidateQueries('employees');
      router.push("/employees");
      return response;
    },
  });

  const deleteEmployee = useMutation({
    mutationKey: ['deleteEmployee'],
    mutationFn: async id => {
      return await postRequest({
        url: `${apiUrl}employee/delete/${id}`
      });
    },
    onSuccess: (response) => {
      const message = response?.message || "Error"
      if (response.status === "error") {
        toast({
          description: message,
          status: "error",
        });
        return;
      }
      toast({
        description: message,
        status: "success",
      });
      queryClient.invalidateQueries('employees');
      return response;
    },
    onError: (error) => {
      toast({
        description: "Erro ao realizar cadastro",
        status: "error",
      });
      console.log(error);
    },
  });

  const handleCreate = async formValues => {
    try {
      formValues = {...formValues, role: formValues.role.id, department: formValues.department.id}

      await createEmployee.mutate(formValues)
    } catch (e) {
      toast({
        description: e.message,
        status: "error",
      });
    }
  }

  const handleUpdate = async formValues => {
    try {
      formValues = {...formValues, role: formValues.role.id, department: formValues.department.id}

      await updateEmployee.mutate({id, params: formValues})
    } catch (e) {
      toast({
        description: e.message,
        status: "error",
      });
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteEmployee.mutate(id);

    } catch (e) {
      console.log(e);
      toast({
        description: e.message,
        status: "error",
      });
    }
  }

  return {
    // All
    allEmployees,
    allEmployeesLoading,
    // One
    employee,
    isFetchingEmployee,

    // Actions
    create: handleCreate,
    update: handleUpdate,
    softDelete: handleDelete,
  };
};

export default useEmployee;
