
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X, Plus, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CreateWagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateWager: (wager: any) => void;
}

export function CreateWagerDialog({ open, onOpenChange, onCreateWager }: CreateWagerDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [friends, setFriends] = useState<string[]>([]);
  const [newFriend, setNewFriend] = useState("");
  const [odds, setOdds] = useState("1:1");

  const handleAddFriend = () => {
    if (newFriend.trim() && !friends.includes(newFriend.trim())) {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend("");
    }
  };

  const handleRemoveFriend = (friendToRemove: string) => {
    setFriends(friends.filter(friend => friend !== friendToRemove));
  };

  const handleCreateWager = () => {
    if (!title || !description || !amount || !dueDate) return;

    const wagerData = {
      title,
      description,
      amount: parseInt(amount),
      participants: ["You", ...friends],
      dueDate: format(dueDate, "yyyy-MM-dd"),
      odds
    };

    onCreateWager(wagerData);
    
    // Reset form
    setTitle("");
    setDescription("");
    setAmount("");
    setDueDate(undefined);
    setFriends([]);
    setNewFriend("");
    setOdds("1:1");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <span>Create New Wager</span>
          </DialogTitle>
          <DialogDescription>
            Challenge your friends to a friendly wager!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Wager Title</Label>
            <Input
              id="title"
              placeholder="e.g., Lakers vs Warriors Game"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What exactly are you betting on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Amount and Odds */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="odds">Odds</Label>
              <Input
                id="odds"
                placeholder="1:1"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Friends */}
          <div className="space-y-2">
            <Label>Invite Friends</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter friend's name"
                value={newFriend}
                onChange={(e) => setNewFriend(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
              />
              <Button type="button" size="sm" onClick={handleAddFriend}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {friends.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {friends.map((friend, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{friend}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-500" 
                      onClick={() => handleRemoveFriend(friend)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Create Button */}
          <Button 
            onClick={handleCreateWager}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            disabled={!title || !description || !amount || !dueDate}
          >
            Create Wager
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
