import {postRequest} from "@/util/http";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";

const useUser = () => {
  const router = useRouter();
  const {toast, ToastComponent} = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (params) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      return await postRequest({
        url: `${apiUrl}auth/login`,
        params: params,
      });

    },
    onSuccess: async (response) => {
      if (!!response.status && response.status === "error") {
        toast({
          description: response.message,
          status: "error",
        });
        return
      }

      await setCookie("jwt", response.access_token);
      await setCookie("id", response.id);

      toast({
        description: "Login realizado com sucesso!",
        status: "success",
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      await queryClient.invalidateQueries('parameters');

      router.push("/employees");
    },
    onError: (error) => {
      toast({
        description: "Erro ao realizar login",
        status: "error",
      });
      return false;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (params) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const data = await postRequest({
        url: `${apiUrl}user`,
        params: params,
      });
      return data;
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
      router.push("/login");
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

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoading: loginMutation.isLoading || registerMutation.isLoading,
    isError: loginMutation.isError || registerMutation.isError,
    ToastComponent,
  };
};

export default useUser;
