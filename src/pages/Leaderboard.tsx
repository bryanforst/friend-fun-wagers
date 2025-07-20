import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Target, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LeaderboardUser {
  id: string;
  name: string;
  winRate: number;
  totalWagers: number;
  totalWinnings: number;
  currentStreak: number;
  rank: number;
}

// Mock leaderboard data
const mockLeaderboardData: LeaderboardUser[] = [
  { id: "1", name: "Alex Chen", winRate: 87, totalWagers: 45, totalWinnings: 2340, currentStreak: 8, rank: 1 },
  { id: "2", name: "Jordan Smith", winRate: 83, totalWagers: 52, totalWinnings: 2180, currentStreak: 5, rank: 2 },
  { id: "3", name: "Casey Williams", winRate: 81, totalWagers: 38, totalWinnings: 1950, currentStreak: 12, rank: 3 },
  { id: "4", name: "Riley Johnson", winRate: 79, totalWagers: 41, totalWinnings: 1820, currentStreak: 3, rank: 4 },
  { id: "5", name: "Morgan Davis", winRate: 77, totalWagers: 33, totalWinnings: 1680, currentStreak: 6, rank: 5 },
  { id: "6", name: "Taylor Brown", winRate: 75, totalWagers: 48, totalWinnings: 1540, currentStreak: 2, rank: 6 },
  { id: "7", name: "Parker Wilson", winRate: 74, totalWagers: 29, totalWinnings: 1420, currentStreak: 4, rank: 7 },
  { id: "8", name: "Avery Miller", winRate: 72, totalWagers: 36, totalWinnings: 1290, currentStreak: 1, rank: 8 },
  { id: "9", name: "Blake Anderson", winRate: 71, totalWagers: 42, totalWinnings: 1180, currentStreak: 7, rank: 9 },
  { id: "10", name: "Cameron Lee", winRate: 69, totalWagers: 31, totalWinnings: 1060, currentStreak: 2, rank: 10 },
  { id: "11", name: "Drew Martinez", winRate: 68, totalWagers: 25, totalWinnings: 940, currentStreak: 3, rank: 11 },
  { id: "12", name: "Sage Thompson", winRate: 66, totalWagers: 28, totalWinnings: 820, currentStreak: 1, rank: 12 },
  { id: "13", name: "Quinn Garcia", winRate: 65, totalWagers: 35, totalWinnings: 750, currentStreak: 4, rank: 13 },
  { id: "14", name: "Reese Rodriguez", winRate: 63, totalWagers: 22, totalWinnings: 680, currentStreak: 2, rank: 14 },
  { id: "15", name: "Emery White", winRate: 62, totalWagers: 30, totalWinnings: 610, currentStreak: 1, rank: 15 },
  { id: "16", name: "Finley Clark", winRate: 60, totalWagers: 26, totalWinnings: 540, currentStreak: 3, rank: 16 },
  { id: "17", name: "Harper Lewis", winRate: 58, totalWagers: 19, totalWinnings: 470, currentStreak: 1, rank: 17 },
  { id: "18", name: "Peyton Walker", winRate: 57, totalWagers: 21, totalWinnings: 410, currentStreak: 2, rank: 18 },
  { id: "19", name: "River Hall", winRate: 55, totalWagers: 24, totalWinnings: 350, currentStreak: 1, rank: 19 },
  { id: "20", name: "Skyler Young", winRate: 53, totalWagers: 18, totalWinnings: 290, currentStreak: 2, rank: 20 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <span className="text-muted-foreground font-bold">#{rank}</span>;
  }
};

const getRankBadgeColor = (rank: number) => {
  if (rank <= 3) return "bg-primary text-primary-foreground";
  if (rank <= 10) return "bg-secondary text-secondary-foreground";
  return "bg-muted text-muted-foreground";
};

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Leaderboard</h1>
            <p className="text-muted-foreground mt-2">Top 20 wagering champions</p>
          </div>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            className="edgy-button"
          >
            Back to Wagers
          </Button>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mockLeaderboardData.slice(0, 3).map((user, index) => (
            <Card key={user.id} className={`edgy-card ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="mx-auto mb-2 h-16 w-16">
                  <AvatarFallback className="text-lg font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <Badge variant="secondary" className="font-bold">{user.winRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Winnings</span>
                  <span className="font-bold text-primary">${user.totalWinnings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Streak</span>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-bold">{user.currentStreak}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of Leaderboard */}
        <Card className="edgy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockLeaderboardData.slice(3).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.totalWagers} total wagers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <Badge className={getRankBadgeColor(user.rank)}>
                        {user.winRate}%
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Winnings</div>
                      <div className="font-bold text-primary">${user.totalWinnings}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Streak</div>
                      <div className="flex items-center gap-1 justify-center">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="font-bold">{user.currentStreak}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="edgy-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Average Win Rate</div>
                  <div className="font-bold">
                    {Math.round(mockLeaderboardData.reduce((acc, user) => acc + user.winRate, 0) / mockLeaderboardData.length)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="edgy-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Wagers</div>
                  <div className="font-bold">
                    {mockLeaderboardData.reduce((acc, user) => acc + user.totalWagers, 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="edgy-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Winnings</div>
                  <div className="font-bold text-primary">
                    ${mockLeaderboardData.reduce((acc, user) => acc + user.totalWinnings, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}