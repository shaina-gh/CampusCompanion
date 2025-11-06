import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface Interview {
  id: string;
  company_id: string;
  interview_type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral' | 'final';
  scheduled_date: string;
  duration_minutes: number;
  interviewer_name?: string;
  interviewer_email?: string;
  interview_link?: string;
  location?: string;
  preparation_notes?: string;
  feedback?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  rating?: number;
  outcome?: 'passed' | 'failed' | 'pending';
  follow_up_required: boolean;
  created_at: string;
  updated_at: string;
}

export const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInterviews = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setInterviews((data || []) as Interview[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch interviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addInterview = async (interviewData: Omit<Interview, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('interviews')
        .insert([{ ...interviewData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setInterviews(prev => [...prev, data as Interview]);
      toast({
        title: "Success",
        description: "Interview scheduled successfully",
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error", 
        description: "Failed to schedule interview",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateInterview = async (id: string, updates: Partial<Interview>) => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setInterviews(prev => prev.map(interview => 
        interview.id === id ? data as Interview : interview
      ));
      
      toast({
        title: "Success",
        description: "Interview updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update interview",
        variant: "destructive",
      });
    }
  };

  const deleteInterview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('interviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInterviews(prev => prev.filter(interview => interview.id !== id));
      toast({
        title: "Success",
        description: "Interview deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete interview",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [user]);

  return {
    interviews,
    loading,
    addInterview,
    updateInterview,
    deleteInterview,
    refetch: fetchInterviews
  };
};