import { supabase } from "@/util/supabase";

export const getCurrentUserId = async (id: string) => {
  try {
    const data = await supabase
      .from("users")
      .select("id,userId")
      .eq("userId", id);
    return data.data;
  } catch {
    return null;
  }
};
