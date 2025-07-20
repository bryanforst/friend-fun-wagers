import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageCircle, Send, ChevronDown, ChevronRight } from "lucide-react";
import { Comment } from "@/types/wager";

interface CommentThreadProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentThread({ comments, onAddComment }: CommentThreadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-xs text-muted-foreground hover:text-primary hover:bg-primary/5"
        >
          {isOpen ? (
            <ChevronDown className="w-3 h-3 mr-1" />
          ) : (
            <ChevronRight className="w-3 h-3 mr-1" />
          )}
          <MessageCircle className="w-3 h-3 mr-1" />
          <span className="font-mono uppercase tracking-wide">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </span>
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-3">
        <div className="space-y-3">
          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-2">
              {comments.map((comment) => (
                <Card key={comment.id} className="bg-muted/30 border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">
                        {comment.author}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Add Comment Form */}
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="p-3">
              <form onSubmit={handleSubmitComment} className="flex space-x-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="text-xs bg-background/50 border-primary/30 focus:border-primary"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  disabled={!newComment.trim()}
                  className="edgy-button px-3"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}