import { ProposalItemInterface } from "@/types/proposal";
import { supabase } from "@/util/supabase";
import { useQuery } from "@tanstack/react-query";

export const getProposals = () => {
  return useQuery<ProposalItemInterface[] | undefined>({
    queryKey: ["proposals"],
    queryFn: async () => {
      try {
        const { data } = await supabase
          .from("projects")
          .select(
            "id,created_at,title,description,shortDescription,price,tags,user(id,userId,imageUrl,fullName)"
          );

        if (data) return data;
      } catch {
        return undefined;
      }
    },
  });
};

export const getProposal = (id: string) => {
  return useQuery<ProposalItemInterface | undefined>({
    queryKey: ["proposals", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select(
            "id,created_at,title,description,shortDescription,price,tags,user(id,userId,imageUrl,fullName)"
          )
          .eq("id", id);

        if (data) return data[0];
        else throw new Error(error.message);
      } catch {
        return undefined;
      }
    },
  });
};
