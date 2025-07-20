
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Calendar, Trophy, Users, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { WagerCard } from "./WagerCard";
import { Game } from "@/types/wager";

interface GameCardProps {
  game: Game;
  onAddComment?: (wagerId: number, content: string) => void;
}

export function GameCard({ game, onAddComment }: GameCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  const totalAmount = game.wagers.reduce((sum, wager) => sum + wager.amount, 0);
  const activeCount = game.wagers.filter(w => w.status === "active").length;
  const pendingCount = game.wagers.filter(w => w.status === "pending").length;
  const completedCount = game.wagers.filter(w => w.status === "completed").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="edgy-card border-l-4 border-l-primary mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-primary" />
                  )}
                  <Gamepad2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold uppercase tracking-wide neon-text">
                    {game.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs font-mono">
                      {game.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(game.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <div className="text-lg font-bold text-primary">${totalAmount}</div>
                <div className="flex space-x-1">
                  {activeCount > 0 && (
                    <Badge className="bg-primary/20 text-primary border-primary/40 text-xs">
                      {activeCount} Active
                    </Badge>
                  )}
                  {pendingCount > 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 text-xs">
                      {pendingCount} Pending
                    </Badge>
                  )}
                  {completedCount > 0 && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                      {completedCount} Done
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {game.wagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} onAddComment={onAddComment} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
