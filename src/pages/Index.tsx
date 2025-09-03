import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trophy, Users, DollarSign, Clock, CheckCircle2, XCircle, Zap, Target, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { WagerCard } from "@/components/WagerCard";
import { GameCard } from "@/components/GameCard";
import { Wager, Game } from "@/types/wager";

// Mock data for house propositions - organized by games
const mockGames: Game[] = [
  {
    id: "lakers-vs-warriors",
    name: "Lakers vs Warriors",
    category: "NBA",
    date: "2024-01-15T20:00:00Z",
    wagers: [
      {
        id: 1,
        title: "Lakers Win by 10+",
        description: "The house is offering 2:1 odds that Lakers will win by 10 or more points",
        amount: 50,
        participants: ["Mike", "Sarah"],
        status: "active" as const,
        creator: "House",
        dueDate: "2024-01-15",
        odds: "2:1",
        gameId: "lakers-vs-warriors",
        gameName: "Lakers vs Warriors",
        comments: [
          {
            id: 1,
            author: "Mike",
            content: "Lakers looking strong this season! I'm in.",
            timestamp: "2024-01-10T14:30:00Z",
            wagerId: 1
          },
          {
            id: 2,
            author: "Sarah",
            content: "Warriors defense could keep it close though",
            timestamp: "2024-01-10T15:45:00Z",
            wagerId: 1
          }
        ]
      },
      {
        id: 4,
        title: "Total Points Over 220",
        description: "House proposition: Total game points will exceed 220. Accept this wager?",
        amount: 75,
        participants: [],
        status: "pending" as const,
        creator: "House",
        dueDate: "2024-01-15",
        odds: "1.8:1",
        gameId: "lakers-vs-warriors",
        gameName: "Lakers vs Warriors",
        comments: []
      },
      {
        id: 5,
        title: "Curry 30+ Points",
        description: "House offers 3:1 odds that Stephen Curry will score 30 or more points",
        amount: 40,
        participants: [],
        status: "pending" as const,
        creator: "House",
        dueDate: "2024-01-15",
        odds: "3:1",
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
        title: "Chiefs to Win",
        description: "House proposition: Kansas City Chiefs will win Super Bowl LVIII",
        amount: 100,
        participants: ["Alex"],
        status: "active" as const,
        creator: "House",
        dueDate: "2024-02-11",
        odds: "1.5:1",
        gameId: "super-bowl",
        gameName: "Super Bowl LVIII",
        comments: [
          {
            id: 3,
            author: "Alex",
            content: "Chiefs have been dominating! Easy money.",
            timestamp: "2024-01-20T10:15:00Z",
            wagerId: 2
          }
        ]
      },
      {
        id: 6,
        title: "First Half Over 28.5",
        description: "House wager: First half total points will be over 28.5",
        amount: 60,
        participants: [],
        status: "pending" as const,
        creator: "House",
        dueDate: "2024-02-11",
        odds: "1.9:1",
        gameId: "super-bowl",
        gameName: "Super Bowl LVIII",
        comments: []
      }
    ]
  },
  {
    id: "crypto-predictions",
    name: "Bitcoin Weekly",
    category: "Crypto",
    date: "2024-01-12T23:59:00Z",
    wagers: [
      {
        id: 3,
        title: "Bitcoin Above $45K",
        description: "House proposition: Bitcoin will close above $45,000 this Friday",
        amount: 80,
        participants: ["Jenny", "Tom"],
        status: "completed" as const,
        creator: "House",
        dueDate: "2024-01-12",
        odds: "2.2:1",
        winner: "House",
        gameId: "crypto-predictions",
        gameName: "Bitcoin Weekly",
        comments: [
          {
            id: 4,
            author: "Tom",
            content: "Crypto markets are so unpredictable!",
            timestamp: "2024-01-12T16:00:00Z",
            wagerId: 3
          }
        ]
      },
      {
        id: 7,
        title: "ETH Outperforms BTC",
        description: "House wager: Ethereum will outperform Bitcoin this week (% gains)",
        amount: 45,
        participants: [],
        status: "pending" as const,
        creator: "House",
        dueDate: "2024-01-19",
        odds: "1.7:1",
        gameId: "crypto-predictions",
        gameName: "Bitcoin Weekly",
        comments: []
      }
    ]
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>(mockGames);
  

  // Flatten all wagers for stats calculation
  const allWagers = games.flatMap(game => game.wagers);
  const activeWagers = allWagers.filter(w => w.status === "active");
  const pendingWagers = allWagers.filter(w => w.status === "pending");
  const completedWagers = allWagers.filter(w => w.status === "completed");

  // Calculate player stats vs house
  const totalAvailable = pendingWagers.reduce((sum, wager) => sum + wager.amount, 0);
  const totalWon = completedWagers.filter(w => w.winner !== "House").reduce((sum, wager) => sum + wager.amount, 0);


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
            <div className="flex items-center space-x-1 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wide">House Odds</span>
            </div>
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
              <div className="text-lg font-bold text-foreground">${totalAvailable}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Available</div>
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
              <div className="text-lg font-bold text-foreground">{pendingWagers.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Open Bets</div>
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
                <p className="text-muted-foreground font-bold uppercase tracking-wide">No Propositions</p>
                <p className="text-sm text-muted-foreground">Check back for new house wagers!</p>
              </CardContent>
            </Card>
          ) : (
            games.map((game) => (
              <GameCard key={game.id} game={game} onAddComment={handleAddComment} />
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Index;
