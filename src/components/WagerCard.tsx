
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, DollarSign, Users, Trophy, Clock, CheckCircle2, AlertCircle, Zap, Target, Flame } from "lucide-react";
import { Wager, Comment } from "@/types/wager";
import { CommentThread } from "./CommentThread";

interface WagerCardProps {
  wager: Wager;
  onAddComment?: (wagerId: number, content: string) => void;
}

export function WagerCard({ wager, onAddComment }: WagerCardProps) {
  const getStatusIcon = () => {
    switch (wager.status) {
      case "active":
        return <Zap className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (wager.status) {
      case "active":
        return "bg-primary/20 text-primary border-primary/40 font-bold uppercase tracking-wide";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 font-bold uppercase tracking-wide";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/40 font-bold uppercase tracking-wide";
      default:
        return "bg-muted text-muted-foreground border-border font-bold uppercase tracking-wide";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isWinner = wager.winner === "You";

  return (
    <Card className="edgy-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <CardTitle className="text-lg text-foreground font-bold uppercase tracking-wide">{wager.title}</CardTitle>
              <Flame className="w-4 h-4 text-primary" />
            </div>
            <CardDescription className="text-sm text-muted-foreground font-mono">
              {wager.description}
            </CardDescription>
          </div>
          <Badge className={`ml-2 ${getStatusColor()}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span className="text-xs">{wager.status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Amount and Odds */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-bold text-lg text-foreground">${wager.amount}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground font-mono">
                <Target className="w-3 h-3" />
                <span>{wager.odds}</span>
              </div>
            </div>
            {wager.status === "completed" && wager.winner && (
              <div className={`flex items-center space-x-1 px-3 py-1 rounded font-bold uppercase tracking-wide text-xs ${
                isWinner ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}>
                <Trophy className="w-3 h-3" />
                <span>{isWinner ? 'Victory!' : `${wager.winner} Won`}</span>
              </div>
            )}
          </div>

          {/* Participants */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <Zap className="w-3 h-3 text-primary" />
            </div>
            <div className="flex -space-x-2">
              {wager.participants.slice(0, 3).map((participant, index) => (
                <Avatar key={index} className="w-6 h-6 border-2 border-primary/30 bg-primary/10">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary font-bold">
                    {participant.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {wager.participants.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-bold">+{wager.participants.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {wager.participants.length} players
            </span>
          </div>

          {/* Due Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground font-mono">
              <CalendarDays className="w-4 h-4" />
              <span>Due {formatDate(wager.dueDate)}</span>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              by {wager.creator}
            </span>
          </div>

          {/* Action Buttons */}
          {wager.status === "pending" && wager.creator === "House" && (
            <div className="space-y-2 pt-3">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">House Proposition</span>
                  <Badge variant="outline" className="text-xs font-bold">
                    {wager.odds} Payout
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Risk ${wager.amount} to win ${Math.round(wager.amount * parseFloat(wager.odds.split(':')[0]))}
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wide shadow-lg shadow-green-500/25">
                    ✓ Accept Bet
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 font-bold uppercase tracking-wide hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400">
                    ✗ Pass
                  </Button>
                </div>
              </div>
            </div>
          )}

          {wager.status === "active" && wager.creator === "House" && (
            <div className="pt-3">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">Active House Bet</span>
                  <span className="text-xs text-muted-foreground">{wager.participants.length} players in</span>
                </div>
                <Button size="sm" variant="outline" className="w-full font-bold uppercase tracking-wide">
                  Track Bet
                </Button>
              </div>
            </div>
          )}

          {wager.status === "completed" && wager.creator === "House" && (
            <div className="pt-3">
              <div className="bg-muted/50 p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Settled</span>
                  <Badge variant={wager.winner === "House" ? "destructive" : "default"} className="text-xs font-bold">
                    {wager.winner === "House" ? "House Won" : "Players Won"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Comment Thread */}
          <div className="pt-2 border-t border-primary/20">
            <CommentThread 
              comments={wager.comments}
              onAddComment={(content) => onAddComment?.(wager.id, content)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
