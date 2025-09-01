import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trophy, Users, DollarSign, Clock, CheckCircle2, XCircle, Zap, Target, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateWagerDialog } from "@/components/CreateWagerDialog";
import { WagerCard } from "@/components/WagerCard";
import { GameCard } from "@/components/GameCard";
import { Wager, Game } from "@/types/wager";

// Mock data for demonstration - now organized by games
const mockGames: Game[] = [
  {
    id: "lakers-vs-warriors",
    name: "Lakers vs Warriors",
    category: "NBA",
    date: "2024-01-15T20:00:00Z",
    wagers: [
      {
        id: 1,
        title: "Lakers Win Margin",
        description: "Lakers will win by 10+ points",
        amount: 50,
        participants: ["You", "Mike", "Sarah"],
        status: "active" as const,
        creator: "You",
        dueDate: "2024-01-15",
        odds: "2:1",
        gameId: "lakers-vs-warriors",
        gameName: "Lakers vs Warriors",
        comments: [
          {
            id: 1,
            author: "Mike",
            content: "Lakers looking strong this season!",
            timestamp: "2024-01-10T14:30:00Z",
            wagerId: 1
          },
          {
            id: 2,
            author: "Sarah",
            content: "Warriors still have the experience edge",
            timestamp: "2024-01-10T15:45:00Z",
            wagerId: 1
          }
        ]
      },
      {
        id: 4,
        title: "Total Points Over/Under",
        description: "Total points will be over 220",
        amount: 75,
        participants: ["You", "Chris"],
        status: "pending" as const,
        creator: "Chris",
        dueDate: "2024-01-15",
        odds: "1.5:1",
        gameId: "lakers-vs-warriors",
        gameName: "Lakers vs Warriors",
        comments: []
      }
    ]
  },
  {
    id: "super-bowl",
    name: "Super Bowl LVIII",
    category: "NFL",
    date: "2024-02-11T18:30:00Z",
    wagers: [
      {
        id: 2,
        title: "Super Bowl Winner",
        description: "Chiefs will win the Super Bowl",
        amount: 100,
        participants: ["You", "Alex"],
        status: "pending" as const,
        creator: "Alex",
        dueDate: "2024-02-11",
        odds: "3:2",
        gameId: "super-bowl",
        gameName: "Super Bowl LVIII",
        comments: [
          {
            id: 3,
            author: "Alex",
            content: "Chiefs have been dominating the playoffs!",
            timestamp: "2024-01-20T10:15:00Z",
            wagerId: 2
          }
        ]
      }
    ]
  },
  {
    id: "weekend-weather",
    name: "Weekend Weather",
    category: "Weather",
    date: "2024-01-08T12:00:00Z",
    wagers: [
      {
        id: 3,
        title: "Saturday Rain",
        description: "It will rain this weekend",
        amount: 25,
        participants: ["You", "Jenny", "Tom"],
        status: "completed" as const,
        creator: "Jenny",
        dueDate: "2024-01-08",
        odds: "1:1",
        winner: "Jenny",
        gameId: "weekend-weather",
        gameName: "Weekend Weather",
        comments: [
          {
            id: 4,
            author: "Tom",
            content: "Called it! The forecast was clear",
            timestamp: "2024-01-08T16:00:00Z",
            wagerId: 3
          }
        ]
      }
    ]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>(mockGames);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Flatten all wagers for stats calculation
  const allWagers = games.flatMap(game => game.wagers);
  const activeWagers = allWagers.filter(w => w.status === "active");
  const pendingWagers = allWagers.filter(w => w.status === "pending");
  const completedWagers = allWagers.filter(w => w.status === "completed");

  const totalWagered = allWagers.reduce((sum, wager) => sum + wager.amount, 0);
  const totalWon = completedWagers.filter(w => w.winner === "You").reduce((sum, wager) => sum + wager.amount, 0);

  const handleCreateWager = (wagerData: any) => {
    // For demo purposes, add to the first game
    const newWager: Wager = {
      id: allWagers.length + 1,
      ...wagerData,
      status: "pending" as const,
      creator: "You",
      gameId: games[0]?.id || "new-game",
      gameName: games[0]?.name || "New Game",
      comments: []
    };
    
    const updatedGames = [...games];
    if (updatedGames[0]) {
      updatedGames[0].wagers = [newWager, ...updatedGames[0].wagers];
      setGames(updatedGames);
    }
    setIsCreateDialogOpen(false);
  };

  const handleAddComment = (wagerId: number, content: string) => {
    const newComment = {
      id: Date.now(), // Simple ID generation for demo
      author: "You",
      content,
      timestamp: new Date().toISOString(),
      wagerId
    };

    const updatedGames = games.map(game => ({
      ...game,
      wagers: game.wagers.map(wager => 
        wager.id === wagerId 
          ? { ...wager, comments: [...wager.comments, newComment] }
          : wager
      )
    }));

    setGames(updatedGames);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="edgy-header sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center rotate-3 shadow-lg shadow-primary/25">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold neon-text uppercase tracking-wide">WagerPal</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Bet • Win • Tickle</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="edgy-button px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span className="text-xs">New Bet</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="edgy-card text-center p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <Flame className="w-3 h-3 text-primary ml-1" />
              </div>
              <div className="text-lg font-bold text-foreground">${totalWagered}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Wagered</div>
            </CardContent>
          </Card>
          <Card className="edgy-card text-center p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <Target className="w-3 h-3 text-primary ml-1" />
              </div>
              <div className="text-lg font-bold text-foreground">${totalWon}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Won</div>
            </CardContent>
          </Card>
          <Card className="edgy-card text-center p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-primary" />
                <Zap className="w-3 h-3 text-primary ml-1" />
              </div>
              <div className="text-lg font-bold text-foreground">{activeWagers.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Active Bets</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate("/leaderboard")}
            variant="outline"
            className="w-full edgy-button flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            View Leaderboard
          </Button>
        </div>

        {/* Games List */}
        <div className="space-y-4">
          {games.length === 0 ? (
            <Card className="edgy-card text-center py-8">
              <CardContent>
                <div className="flex justify-center mb-3">
                  <Trophy className="w-12 h-12 text-muted-foreground" />
                  <Zap className="w-6 h-6 text-primary ml-2" />
                </div>
                <p className="text-muted-foreground font-bold uppercase tracking-wide">No Games Yet</p>
                <p className="text-sm text-muted-foreground">Create your first wager to get started!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <GameCard key={game.id} game={game} onAddComment={handleAddComment} />
            ))
          )}
        </div>
      </div>

      <CreateWagerDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onCreateWager={handleCreateWager}
      />
    </div>
  );
};

export default Index;
