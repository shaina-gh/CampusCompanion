import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  achievement_type: 'certification' | 'project' | 'award' | 'publication' | 'skill_milestone' | 'interview_success' | 'job_offer' | 'other';
  date_achieved: string;
  organization?: string;
  verification_url?: string;
  skills_used?: string[];
  impact_description?: string;
  is_featured: boolean;
  attachment_url?: string;
  created_at: string;
  updated_at: string;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAchievements = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date_achieved', { ascending: false });

      if (error) throw error;
      setAchievements((data || []) as Achievement[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch achievements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (achievementData: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert([{ ...achievementData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setAchievements(prev => [data as Achievement, ...prev]);
      toast({
        title: "Success",
        description: "Achievement added successfully",
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to add achievement",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateAchievement = async (id: string, updates: Partial<Achievement>) => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAchievements(prev => prev.map(achievement => 
        achievement.id === id ? data as Achievement : achievement
      ));
      
      toast({
        title: "Success",
        description: "Achievement updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update achievement",
        variant: "destructive",
      });
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAchievements(prev => prev.filter(achievement => achievement.id !== id));
      toast({
        title: "Success",
        description: "Achievement deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete achievement",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [user]);

  return {
    achievements,
    loading,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    refetch: fetchAchievements
  };
};