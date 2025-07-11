import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarDays, DollarSign, Users, Trophy, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Wager } from "@/types/wager";

interface WagerCardProps {
  wager: Wager;
}

export function WagerCard({ wager }: WagerCardProps) {
  const getStatusIcon = () => {
    switch (wager.status) {
      case "active":
        return <Clock className="w-4 h-4" />;
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
        return "bg-primary/10 text-primary border-primary/20";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-muted text-muted-foreground border-border";
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
    <Card className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground mb-1">{wager.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {wager.description}
            </CardDescription>
          </div>
          <Badge className={`ml-2 ${getStatusColor()}`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span className="capitalize">{wager.status}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Amount and Odds */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="font-semibold text-lg text-foreground">${wager.amount}</span>
              <span className="text-sm text-muted-foreground">• {wager.odds}</span>
            </div>
            {wager.status === "completed" && wager.winner && (
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                isWinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <Trophy className="w-3 h-3" />
                <span>{isWinner ? 'You Won!' : `${wager.winner} Won`}</span>
              </div>
            )}
          </div>

          {/* Participants */}
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {wager.participants.slice(0, 3).map((participant, index) => (
                <Avatar key={index} className="w-6 h-6 border-2 border-card">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {participant.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {wager.participants.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{wager.participants.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {wager.participants.length} participants
            </span>
          </div>

          {/* Due Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span>Due {formatDate(wager.dueDate)}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Created by {wager.creator}
            </span>
          </div>

          {/* Action Buttons */}
          {wager.status === "pending" && wager.creator !== "You" && (
            <div className="flex space-x-2 pt-2">
              <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                Accept
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Decline
              </Button>
            </div>
          )}

          {wager.status === "active" && (
            <Button size="sm" variant="outline" className="w-full">
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
