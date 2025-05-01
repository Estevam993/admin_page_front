import {postRequest, getRequest} from "@/util/http";
import {useMutation, useQuery} from "@tanstack/react-query";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useEmployee = () => {
  const router = useRouter();
  const {toast, ToastComponent} = useToast();

  const {data: allEmployees, isLoading: allEmployeesLoading} = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await getRequest({
        url: `${apiUrl}employee`,
      })

      return response
    }
  })

  return {
    allEmployees,
    allEmployeesLoading,
    ToastComponent
  };
};

export default useEmployee;
