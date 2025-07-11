
export interface Wager {
  id: number;
  title: string;
  description: string;
  amount: number;
  participants: string[];
  status: "active" | "pending" | "completed";
  creator: string;
  dueDate: string;
  odds: string;
  winner?: string;
}
