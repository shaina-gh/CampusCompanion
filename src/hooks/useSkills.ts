import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'programming' | 'frameworks' | 'tools' | 'soft_skills' | 'languages' | 'certifications';
  proficiency_level: number;
  target_level?: number;
  learning_resources?: string[];
  practice_frequency?: 'daily' | 'weekly' | 'monthly' | 'occasionally';
  last_practiced?: string;
  endorsements: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSkills = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('proficiency_level', { ascending: false });

      if (error) throw error;
      setSkills((data || []) as Skill[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skillData: Omit<Skill, 'id' | 'created_at' | 'updated_at' | 'endorsements'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ ...skillData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => [data as Skill, ...prev]);
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to add skill",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => prev.map(skill => 
        skill.id === id ? data as Skill : skill
      ));
      
      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSkills(prev => prev.filter(skill => skill.id !== id));
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]);

  return {
    skills,
    loading,
    addSkill,
    updateSkill,
    deleteSkill,
    refetch: fetchSkills
  };
};