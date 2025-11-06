-- Add sample community posts (visible to everyone)
INSERT INTO public.community_posts (user_id, author_name, title, content, category, tags, likes_count, comments_count, created_at) VALUES
(gen_random_uuid(), 'Priya Sharma', 'Just got my first internship offer! 🎉', 'After 50+ applications and 10 interviews, I finally received an offer from a great startup. The key was persistence and improving after each rejection. Happy to share tips!', 'success-story', ARRAY['internship', 'success', 'motivation'], 45, 12, now() - interval '2 days'),
(gen_random_uuid(), 'Rahul Kumar', 'Best resources for DSA preparation', 'I compiled a list of the best resources that helped me crack my coding interviews: 1) LeetCode (focus on patterns) 2) Striver''s SDE sheet 3) GeeksforGeeks 4) InterviewBit. Started with easy problems and gradually moved to medium/hard.', 'resources', ARRAY['dsa', 'coding', 'interview-prep'], 67, 8, now() - interval '5 days'),
(gen_random_uuid(), 'Ananya Patel', 'System Design Interview Tips', 'Just cleared system design rounds at 3 companies. Key tips: understand fundamentals (scaling, databases, caching), practice with real examples, think out loud during interviews. Resources: Grokking System Design, System Design Primer on GitHub.', 'advice', ARRAY['system-design', 'interview', 'tips'], 89, 15, now() - interval '1 week'),
(gen_random_uuid(), 'Vikram Singh', 'Should I accept this offer?', 'Got two offers - one from a big MNC (higher pay but boring work) and another from a funded startup (lower pay but exciting product). Both in Bangalore. Really confused. What factors should I consider?', 'question', ARRAY['career-advice', 'offers', 'help'], 34, 23, now() - interval '3 days'),
(gen_random_uuid(), 'Sneha Reddy', 'Mock Interview Group - Bangalore', 'Looking to form a mock interview group for students in Bangalore. We can practice coding interviews, behavioral questions, and system design together. Experience level: intermediate. DM if interested!', 'general', ARRAY['mock-interview', 'bangalore', 'group'], 28, 6, now() - interval '1 day');

-- Add sample comments to posts
INSERT INTO public.community_comments (post_id, user_id, author_name, content, likes_count, created_at) VALUES
((SELECT id FROM public.community_posts WHERE title LIKE 'Just got my first%' LIMIT 1), gen_random_uuid(), 'Arjun Mehta', 'Congratulations! This is so inspiring. How did you stay motivated through rejections?', 5, now() - interval '1 day'),
((SELECT id FROM public.community_posts WHERE title LIKE 'Just got my first%' LIMIT 1), gen_random_uuid(), 'Kavya Nair', 'Amazing! Which startup is it? And what role?', 3, now() - interval '1 day'),
((SELECT id FROM public.community_posts WHERE title LIKE 'Best resources%' LIMIT 1), gen_random_uuid(), 'Rohan Gupta', 'Thanks for sharing! How long did you prepare?', 2, now() - interval '4 days'),
((SELECT id FROM public.community_posts WHERE title LIKE 'System Design%' LIMIT 1), gen_random_uuid(), 'Aisha Khan', 'Great tips! Did you use any specific books?', 1, now() - interval '6 days'),
((SELECT id FROM public.community_posts WHERE title LIKE 'Should I accept%' LIMIT 1), gen_random_uuid(), 'Dev Sharma', 'Go with the startup! Learning and growth > money in early career', 8, now() - interval '2 days');

-- Create a function to seed user-specific sample data
CREATE OR REPLACE FUNCTION public.seed_user_sample_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  current_user_id uuid;
  company_id_1 uuid;
  company_id_2 uuid;
  company_id_3 uuid;
BEGIN
  -- Get the current user's ID
  current_user_id := auth.uid();
  
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;

  -- Insert sample companies
  INSERT INTO public.companies (user_id, name, role, status, application_date, deadline, website_url, location, salary_range, notes)
  VALUES 
    (current_user_id, 'Google', 'Software Engineer Intern', 'applied', CURRENT_DATE - 30, CURRENT_DATE + 15, 'https://careers.google.com', 'Bangalore', '₹80k-₹100k/month', 'Applied through campus portal. Referral from senior.')
    RETURNING id INTO company_id_1;
    
  INSERT INTO public.companies (user_id, name, role, status, application_date, deadline, location, salary_range, notes)
  VALUES 
    (current_user_id, 'Microsoft', 'SDE Intern', 'interview', CURRENT_DATE - 45, CURRENT_DATE + 30, 'Hyderabad', '₹90k-₹110k/month', 'Cleared coding round. System design next week.')
    RETURNING id INTO company_id_2;
    
  INSERT INTO public.companies (user_id, name, role, status, application_date, location, notes)
  VALUES 
    (current_user_id, 'Amazon', 'Software Development Engineer', 'wishlist', CURRENT_DATE - 10, 'Multiple locations', 'Dream company! Preparing for application.')
    RETURNING id INTO company_id_3;

  -- Insert sample interviews
  INSERT INTO public.interviews (user_id, company_id, interview_type, scheduled_date, interviewer_name, status, preparation_notes, duration_minutes)
  VALUES 
    (current_user_id, company_id_1, 'technical', now() + interval '3 days', 'John Smith', 'scheduled', 'Review: Arrays, LinkedLists, Trees, DP. Practice LeetCode medium problems.', 60),
    (current_user_id, company_id_2, 'coding', now() - interval '5 days', 'Sarah Johnson', 'completed', 'Solved 2/2 problems. Used optimal approaches.', 90),
    (current_user_id, company_id_2, 'system-design', now() + interval '7 days', 'TBD', 'scheduled', 'Study: Load balancing, caching, databases, microservices', 60);

  -- Insert sample skills
  INSERT INTO public.skills (user_id, name, category, proficiency_level, target_level, last_practiced, practice_frequency, learning_resources, endorsements)
  VALUES 
    (current_user_id, 'JavaScript', 'programming', 8, 9, CURRENT_DATE - 2, 'daily', ARRAY['MDN Docs', 'JavaScript.info'], 5),
    (current_user_id, 'React', 'framework', 7, 9, CURRENT_DATE - 1, 'daily', ARRAY['React Docs', 'Epic React'], 3),
    (current_user_id, 'Python', 'programming', 9, 10, CURRENT_DATE - 3, 'weekly', ARRAY['Python.org', 'Real Python'], 7),
    (current_user_id, 'System Design', 'concept', 5, 8, CURRENT_DATE - 7, 'weekly', ARRAY['System Design Primer', 'Grokking SDI'], 2),
    (current_user_id, 'Data Structures', 'concept', 8, 9, CURRENT_DATE - 1, 'daily', ARRAY['CLRS', 'GeeksforGeeks'], 6);

  -- Insert sample goals
  INSERT INTO public.goals (user_id, title, description, category, status, priority, target_date, progress_percentage)
  VALUES 
    (current_user_id, 'Land a FAANG internship', 'Secure an internship at Google, Microsoft, Amazon, Facebook, or Apple for Summer 2025', 'career', 'active', 'high', CURRENT_DATE + 120, 35),
    (current_user_id, 'Solve 500 LeetCode problems', 'Complete 500 coding problems with focus on medium and hard difficulty', 'learning', 'active', 'high', CURRENT_DATE + 90, 68),
    (current_user_id, 'Master System Design', 'Be able to design scalable systems confidently for interviews', 'learning', 'active', 'medium', CURRENT_DATE + 60, 45),
    (current_user_id, 'Build a full-stack project', 'Create and deploy a production-ready application to showcase', 'project', 'active', 'medium', CURRENT_DATE + 45, 80),
    (current_user_id, 'Improve communication skills', 'Practice explaining technical concepts clearly and confidently', 'personal', 'active', 'low', CURRENT_DATE + 180, 25);

  -- Insert sample achievements
  INSERT INTO public.achievements (user_id, title, description, achievement_type, date_achieved, organization, skills_used, impact_description, is_featured)
  VALUES 
    (current_user_id, 'Won University Hackathon', 'First place in 48-hour hackathon with 100+ participants', 'hackathon', CURRENT_DATE - 60, 'IIT Delhi', ARRAY['React', 'Node.js', 'MongoDB'], 'Built a real-time collaboration tool. Prize: ₹50,000', true),
    (current_user_id, 'Google Kickstart Round C - Top 500', 'Ranked in top 500 globally out of 10,000+ participants', 'competition', CURRENT_DATE - 90, 'Google', ARRAY['Algorithms', 'Problem Solving'], 'Solved 3/4 problems correctly under time pressure', true),
    (current_user_id, 'Published Research Paper', 'Co-authored paper on ML optimization techniques', 'research', CURRENT_DATE - 120, 'IEEE Conference', ARRAY['Machine Learning', 'Python', 'Research'], 'Paper accepted at international conference', false),
    (current_user_id, 'Open Source Contribution', 'Contributed to popular React library with 10k+ stars', 'opensource', CURRENT_DATE - 30, 'GitHub', ARRAY['React', 'TypeScript', 'Git'], 'Fixed critical bug affecting 1000+ developers', false);

  -- Insert sample reminders
  INSERT INTO public.reminders (user_id, title, description, reminder_type, due_date, priority, is_completed)
  VALUES 
    (current_user_id, 'Google interview preparation', 'Review trees and graphs. Practice mock interviews.', 'interview', now() + interval '2 days', 'high', false),
    (current_user_id, 'Follow up with Microsoft recruiter', 'Send thank you email and ask about next steps', 'followup', now() + interval '1 day', 'high', false),
    (current_user_id, 'Submit Amazon application', 'Complete online application with resume and cover letter', 'application', now() + interval '10 days', 'medium', false),
    (current_user_id, 'Practice system design', 'Design URL shortener, Twitter feed, and Netflix', 'task', now() + interval '3 days', 'medium', false),
    (current_user_id, 'Update LinkedIn profile', 'Add recent projects and skills. Connect with recruiters.', 'task', now() + interval '5 days', 'low', false);

  -- Insert sample templates
  INSERT INTO public.templates (user_id, name, template_type, subject, content, placeholders, usage_count, is_default)
  VALUES 
    (current_user_id, 'Interview Thank You Email', 'email', 'Thank you for the interview opportunity', 'Dear {{interviewer_name}},\n\nThank you for taking the time to interview me for the {{position}} role at {{company}}. I enjoyed learning about {{specific_topic}} and discussing how I can contribute to your team.\n\nI''m excited about the opportunity and look forward to hearing from you.\n\nBest regards,\n{{your_name}}', ARRAY['interviewer_name', 'position', 'company', 'specific_topic', 'your_name'], 5, true),
    (current_user_id, 'Application Follow-up', 'email', 'Following up on my application', 'Dear Hiring Team,\n\nI submitted my application for {{position}} on {{date}} and wanted to follow up on its status. I remain very interested in this opportunity.\n\nPlease let me know if you need any additional information.\n\nThank you,\n{{your_name}}', ARRAY['position', 'date', 'your_name'], 3, false),
    (current_user_id, 'LinkedIn Connection Request', 'message', NULL, 'Hi {{name}},\n\nI came across your profile and was impressed by your work at {{company}}. I''m a {{your_year}} student at {{your_university}} interested in {{field}}. Would love to connect and learn from your experience!\n\nBest,\n{{your_name}}', ARRAY['name', 'company', 'your_year', 'your_university', 'field', 'your_name'], 8, true);

  -- Insert sample contacts
  INSERT INTO public.contacts (user_id, name, email, company, position, relationship, connection_strength, last_contacted, referral_potential, notes, tags)
  VALUES 
    (current_user_id, 'Amit Verma', 'amit.verma@google.com', 'Google', 'Senior Software Engineer', 'mentor', 'strong', CURRENT_DATE - 15, true, 'College senior. Very helpful with interview prep.', ARRAY['mentor', 'google', 'sde']),
    (current_user_id, 'Neha Kapoor', 'neha.k@microsoft.com', 'Microsoft', 'Technical Recruiter', 'professional', 'medium', CURRENT_DATE - 7, true, 'Met at career fair. Can provide referral.', ARRAY['recruiter', 'microsoft']),
    (current_user_id, 'Karthik Reddy', 'karthik@amazon.com', 'Amazon', 'Engineering Manager', 'professional', 'weak', CURRENT_DATE - 45, true, 'LinkedIn connection. Works in AWS team.', ARRAY['manager', 'amazon', 'aws']);

END;
$$;