import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Pin, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PostCardProps {
  post: {
    id: string;
    user_id: string;
    author_name: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    likes_count: number;
    comments_count: number;
    is_pinned: boolean;
    created_at: string;
  };
  toggleLike: (postId: string) => void;
  createComment: (data: { postId: string; content: string }) => void;
}

const PostCard = ({ post, toggleLike, createComment }: PostCardProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const isExpanded = selectedPost === post.id;

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["community-comments", post.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: isExpanded,
  });

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await createComment({ postId: post.id, content: commentText });
    setCommentText("");
    refetch();
  };

  const getCategoryColor = (category: string): "default" | "destructive" | "outline" | "secondary" => {
    const colors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      general: "secondary",
      questions: "secondary",
      opportunities: "secondary",
      resources: "outline",
      success_stories: "outline",
    };
    return colors[category] || "secondary";
  };

  return (
    <Card className="hover:shadow-custom-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {post.is_pinned && <Pin className="h-4 w-4 text-primary" />}
              <CardTitle className="cursor-pointer hover:text-primary" onClick={() => setSelectedPost(isExpanded ? null : post.id)}>
                {post.title}
              </CardTitle>
            </div>
            <CardDescription>
              Posted by {post.author_name} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </CardDescription>
          </div>
          <Badge variant={getCategoryColor(post.category)}>
            {post.category.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            className="gap-2"
            onClick={() => toggleLike(post.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes_count}</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-2"
            onClick={() => setSelectedPost(isExpanded ? null : post.id)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </Button>
        </div>

        {isExpanded && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comments ({comments.length})
              </h4>
              
              {comments.map((comment) => (
                <div key={comment.id} className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{comment.author_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}

              <div className="flex gap-2">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
