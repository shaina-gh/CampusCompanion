import { useMemo } from "react";
import { TrendingUp, TrendingDown, Calendar, Building2, Target, Award, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie } from "recharts";
import { useCompanies } from "@/hooks/useCompanies";
import { useInterviews } from "@/hooks/useInterviews";
import { useSkills } from "@/hooks/useSkills";
import { format, subDays, eachDayOfInterval } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Analytics = () => {
  const { companies } = useCompanies();
  const { interviews } = useInterviews();
  const { skills } = useSkills();

  const analyticsData = useMemo(() => {
    // Application funnel metrics
    const totalApplications = companies.length;
    const interviewsScheduled = companies.filter(c => c.status === 'interviewing').length;
    const offersReceived = companies.filter(c => c.status === 'offered' || c.status === 'accepted').length;
    const rejections = companies.filter(c => c.status === 'rejected').length;
    
    const successRate = totalApplications > 0 ? (offersReceived / totalApplications) * 100 : 0;
    const interviewRate = totalApplications > 0 ? (interviewsScheduled / totalApplications) * 100 : 0;
    const offerRate = interviewsScheduled > 0 ? (offersReceived / interviewsScheduled) * 100 : 0;

    // Timeline data for the last 30 days
    const last30Days = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date()
    });

    const timelineData = last30Days.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const applicationsOnDate = companies.filter(c => 
        format(new Date(c.application_date), 'yyyy-MM-dd') === dateStr
      ).length;
      
      return {
        date: format(date, 'MMM dd'),
        applications: applicationsOnDate,
        cumulative: companies.filter(c => 
          new Date(c.application_date) <= date
        ).length
      };
    });

    // Status distribution
    const statusData = [
      { name: 'Applied', value: companies.filter(c => c.status === 'applied').length, color: '#3B82F6' },
      { name: 'Interviewing', value: interviewsScheduled, color: '#F59E0B' },
      { name: 'Offers', value: offersReceived, color: '#10B981' },
      { name: 'Rejected', value: rejections, color: '#EF4444' }
    ].filter(item => item.value > 0);

    // Interview performance
    const completedInterviews = interviews.filter(i => i.status === 'completed');
    const avgRating = completedInterviews.length > 0 
      ? completedInterviews.reduce((sum, i) => sum + (i.rating || 0), 0) / completedInterviews.length 
      : 0;

    // Skills analysis
    const avgSkillLevel = skills.length > 0 
      ? skills.reduce((sum, s) => sum + s.proficiency_level, 0) / skills.length 
      : 0;
    
    const skillsNeedingWork = skills.filter(s => 
      s.target_level && s.proficiency_level < s.target_level
    ).length;

    return {
      totalApplications,
      interviewsScheduled,
      offersReceived,
      rejections,
      successRate,
      interviewRate,
      offerRate,
      timelineData,
      statusData,
      avgRating,
      avgSkillLevel,
      skillsNeedingWork,
      completedInterviews: completedInterviews.length
    };
  }, [companies, interviews, skills]);

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Career Analytics</h1>
            <p className="text-muted-foreground">
              Track your progress and identify improvement opportunities
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analyticsData.successRate.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  {analyticsData.successRate > 10 ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
              <Progress value={analyticsData.successRate} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interview Rate</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analyticsData.interviewRate.toFixed(1)}%
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Progress value={analyticsData.interviewRate} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Interview Rating</p>
                  <p className="text-2xl font-bold text-foreground">
                    {analyticsData.avgRating.toFixed(1)}/5
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <div 
                    key={star}
                    className={`h-4 w-4 ${star <= analyticsData.avgRating ? 'bg-yellow-400' : 'bg-gray-200'} rounded-sm`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skills Development</p>
                  <p className="text-2xl font-bold text-foreground">
                    {skills.length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {analyticsData.skillsNeedingWork} need improvement
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Application Timeline (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analyticsData.timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="applications" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Application Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={analyticsData.statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track your progress through the application process
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Applications Sent</h3>
                    <p className="text-sm text-muted-foreground">Total applications submitted</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{analyticsData.totalApplications}</p>
                  <Badge variant="outline">100%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Interviews Scheduled</h3>
                    <p className="text-sm text-muted-foreground">Companies that responded positively</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{analyticsData.interviewsScheduled}</p>
                  <Badge variant="outline">{analyticsData.interviewRate.toFixed(1)}%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Offers Received</h3>
                    <p className="text-sm text-muted-foreground">Job offers from interviews</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{analyticsData.offersReceived}</p>
                  <Badge variant="outline">{analyticsData.offerRate.toFixed(1)}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Development Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{skills.length}</p>
                <p className="text-sm text-muted-foreground">Total Skills</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{analyticsData.avgSkillLevel.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Average Level</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{analyticsData.skillsNeedingWork}</p>
                <p className="text-sm text-muted-foreground">Need Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;