import { supabase } from "@/util/supabase";

export const handleProposalCreate = async (value: any) => {
  const { data, error } = await supabase
    .from("projects")
    .insert([value])
    .select();

  return { data, error };
};
