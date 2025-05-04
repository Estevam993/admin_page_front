import {postRequest, getRequest} from "@/util/http";
import {useMutation, useQuery} from "@tanstack/react-query";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";
import {useGetParameters} from "@/hooks/index";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useEmployee = () => {
  const {parameters} = useGetParameters();
  const router = useRouter();
  const {toast, ToastComponent} = useToast();

  const user = parameters?.user || false;

  const {data: allEmployees, isLoading: allEmployeesLoading, is} = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await getRequest({
        url: `${apiUrl}employee`,
      })

      return response
    },
    enabled: !!user,
  })

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
      router.push("/employees");
      return response;
    },
  });

  return {
    allEmployees,
    allEmployeesLoading,
    ToastComponent,
    create: createEmployee.mutate
  };
};

export default useEmployee;
