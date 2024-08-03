import { User } from "@/types/user";
import { supabase } from "@/util/supabase";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentProfile = (id: string | undefined) => {
  const { user } = useUser();
  return useQuery<User>({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      try {
        if (id === undefined) throw new Error("Id parameter is required");
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("userId", id);

        if (data) return data[0];
      } catch {
        return undefined;
      }
    },
  });
};
