
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trophy, Users, DollarSign, Clock, CheckCircle2, XCircle, Zap, Target, Flame } from "lucide-react";
import { CreateWagerDialog } from "@/components/CreateWagerDialog";
import { WagerCard } from "@/components/WagerCard";
import { Wager } from "@/types/wager";

// Mock data for demonstration
const mockWagers: Wager[] = [
  {
    id: 1,
    title: "Lakers vs Warriors Game",
    description: "Lakers will win by 10+ points",
    amount: 50,
    participants: ["You", "Mike", "Sarah"],
    status: "active" as const,
    creator: "You",
    dueDate: "2024-01-15",
    odds: "2:1"
  },
  {
    id: 2,
    title: "Super Bowl Winner",
    description: "Chiefs will win the Super Bowl",
    amount: 100,
    participants: ["You", "Alex"],
    status: "pending" as const,
    creator: "Alex",
    dueDate: "2024-02-11",
    odds: "3:2"
  },
  {
    id: 3,
    title: "Weather Bet",
    description: "It will rain this weekend",
    amount: 25,
    participants: ["You", "Jenny", "Tom"],
    status: "completed" as const,
    creator: "Jenny",
    dueDate: "2024-01-08",
    odds: "1:1",
    winner: "Jenny"
  }
];

const Index = () => {
  const [wagers, setWagers] = useState<Wager[]>(mockWagers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const activeWagers = wagers.filter(w => w.status === "active");
  const pendingWagers = wagers.filter(w => w.status === "pending");
  const completedWagers = wagers.filter(w => w.status === "completed");

  const totalWagered = wagers.reduce((sum, wager) => sum + wager.amount, 0);
  const totalWon = completedWagers.filter(w => w.winner === "You").reduce((sum, wager) => sum + wager.amount, 0);

  const handleCreateWager = (wagerData: any) => {
    const newWager: Wager = {
      id: wagers.length + 1,
      ...wagerData,
      status: "pending" as const,
      creator: "You"
    };
    setWagers([newWager, ...wagers]);
    setIsCreateDialogOpen(false);
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
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Bet • Win • Dominate</p>
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

        {/* Wager Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-card border border-primary/20">
            <TabsTrigger value="active" className="text-xs font-bold uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Active ({activeWagers.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs font-bold uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Pending ({pendingWagers.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs font-bold uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Completed ({completedWagers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeWagers.length === 0 ? (
              <Card className="edgy-card text-center py-8">
                <CardContent>
                  <div className="flex justify-center mb-3">
                    <Clock className="w-12 h-12 text-muted-foreground" />
                    <Zap className="w-6 h-6 text-primary ml-2" />
                  </div>
                  <p className="text-muted-foreground font-bold uppercase tracking-wide">No Active Wagers</p>
                  <p className="text-sm text-muted-foreground">Time to make some moves!</p>
                </CardContent>
              </Card>
            ) : (
              activeWagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingWagers.length === 0 ? (
              <Card className="edgy-card text-center py-8">
                <CardContent>
                  <div className="flex justify-center mb-3">
                    <Clock className="w-12 h-12 text-muted-foreground" />
                    <Target className="w-6 h-6 text-primary ml-2" />
                  </div>
                  <p className="text-muted-foreground font-bold uppercase tracking-wide">No Pending Wagers</p>
                </CardContent>
              </Card>
            ) : (
              pendingWagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedWagers.length === 0 ? (
              <Card className="edgy-card text-center py-8">
                <CardContent>
                  <div className="flex justify-center mb-3">
                    <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
                    <Flame className="w-6 h-6 text-primary ml-2" />
                  </div>
                  <p className="text-muted-foreground font-bold uppercase tracking-wide">No Completed Wagers</p>
                </CardContent>
              </Card>
            ) : (
              completedWagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} />
              ))
            )}
          </TabsContent>
        </Tabs>
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
