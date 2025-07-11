import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trophy, Users, DollarSign, Clock, CheckCircle2, XCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">WagerPal</h1>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Bet
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center">
            <CardContent className="p-3">
              <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">${totalWagered}</div>
              <div className="text-xs text-muted-foreground">Total Wagered</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">${totalWon}</div>
              <div className="text-xs text-muted-foreground">Total Won</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-bold text-foreground">{activeWagers.length}</div>
              <div className="text-xs text-muted-foreground">Active Bets</div>
            </CardContent>
          </Card>
        </div>

        {/* Wager Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active" className="text-xs">
              Active ({activeWagers.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">
              Pending ({pendingWagers.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Completed ({completedWagers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {activeWagers.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No active wagers</p>
                  <p className="text-sm text-muted-foreground">Create a new bet to get started!</p>
                </CardContent>
              </Card>
            ) : (
              activeWagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3">
            {pendingWagers.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No pending wagers</p>
                </CardContent>
              </Card>
            ) : (
              pendingWagers.map((wager) => (
                <WagerCard key={wager.id} wager={wager} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {completedWagers.length === 0 ? (
              <Card className="text-center py-8">
                <CardContent>
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No completed wagers</p>
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
