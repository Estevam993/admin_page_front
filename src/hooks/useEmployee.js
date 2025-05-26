import {postRequest, getRequest} from "@/util/http";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {setCookie} from "cookies-next";
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
      const response = await getRequest({
        url: `${apiUrl}employee`,
      })

      return response
    },
    enabled: !!user,
  })

  const {data: employee, isLoading: isFetchingEmployee} = useQuery({
    queryKey: ['get_employee', id],
    queryFn: async ({queryKey}) => {
      const [, employeeId] = queryKey;
      const response = await getRequest({
        url: `${apiUrl}employee/${employeeId}`,
      });

      return response;
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

  return {
    // All
    allEmployees,
    allEmployeesLoading,
    // One
    employee,
    isFetchingEmployee,

    // Actions
    create: createEmployee.mutate,
    update: updateEmployee.mutate,
  };
};

export default useEmployee;
