import {postRequest, getRequest, getCookie} from "@/util/http";
import {useMutation, useQuery} from "@tanstack/react-query";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import useToast from "@/services/useToast";
import {useEffect, useState} from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useGetParameters = () => {
  const router = useRouter();
  const {toast, ToastComponent} = useToast();
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    setJwt(getCookie("jwt"));
  }, []);

  const {data: parameters, isLoading: isParametersLoading} = useQuery({
    queryKey: ['parameters'],
    queryFn: async () => {
      return await getRequest({
        url: `${apiUrl}parameters`,
      })
    },
    staleTime: Infinity,
    enabled: !!jwt
  })

  return {
    parameters,
    isParametersLoading,
  };
};

export default useGetParameters;
