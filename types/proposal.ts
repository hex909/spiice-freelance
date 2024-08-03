import { User } from "./user";

export interface ProposalItemInterface {
  created_at: string;
  description: string;
  id: number;
  price: number;
  shortDescription: string;
  tags?: string[] | null;
  title: string;
  user: User | User[];
}
