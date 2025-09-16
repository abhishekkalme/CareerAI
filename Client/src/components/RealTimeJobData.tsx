import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { jobMarketService } from '../services/jobMarketService';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Users, 
  Clock,
  Building,
  Zap,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface RealTimeJobDataProps {
  role: string;
  location: string;
  onDataUpdate?: (data: any) => void;
}

export function RealTimeJobData({ role, location, onDataUpdate }: RealTimeJobDataProps) {
  const [jobData, setJobData] = useState<any>(null);
  const [salaryData, setSalaryData] = useState<any>(null);
  const [locationComparison, setLocationComparison] = useState<any[]>([]);
  const [industryOutlook, setIndustryOutlook] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchJobMarketData();
    
    // Set up auto-refresh every 5 minutes for demo
    if (autoRefresh) {
      const interval = setInterval(fetchJobMarketData, 300000);
      return () => clearInterval(interval);
    }
  }, [role, location, autoRefresh]);

  const fetchJobMarketData = async () => {
    setLoading(true);
    try {
      const [marketData, salaryInfo, locationData, outlook] = await Promise.all([
        jobMarketService.getJobMarketData(role, location),
        jobMarketService.getRealTimeSalaryData(role, 'entry'),
        jobMarketService.getLocationComparison(role, [location, 'San Francisco, CA', 'New York, NY', 'Austin, TX']),
        jobMarketService.getIndustryOutlook('Technology')
      ]);

      setJobData(marketData);
      setSalaryData(salaryInfo);
      setLocationComparison(locationData);
      setIndustryOutlook(outlook);
      setLastUpdated(new Date());
      
      if (onDataUpdate) {
        onDataUpdate({ marketData, salaryInfo, locationData, outlook });
      }
    } catch (error) {
      console.error('Failed to fetch job market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4" />;
    if (change < 0) return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  if (loading && !jobData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
            <div>
              <h3 className="font-semibold">Fetching Real-Time Job Market Data</h3>
              <p className="text-sm text-gray-600">
                Aggregating data from multiple job platforms...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Live Job Market Intelligence</span>
              </CardTitle>
              <CardDescription>
                Real-time data for {role} positions in {location}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchJobMarketData}
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>
          {lastUpdated && (
            <div className="text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="salary">Salary Data</TabsTrigger>
          <TabsTrigger value="demand">Demand Metrics</TabsTrigger>
          <TabsTrigger value="locations">Location Compare</TabsTrigger>
          <TabsTrigger value="outlook">Industry Outlook</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Building className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{jobData?.demandMetrics?.jobOpenings || 0}</p>
                    <p className="text-sm text-gray-600">Open Positions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(jobData?.salaryData?.total?.median || 0)}
                    </p>
                    <p className="text-sm text-gray-600">Median Salary</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {jobData?.demandMetrics?.timeToFill || 0}
                    </p>
                    <p className="text-sm text-gray-600">Days to Fill</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {jobData?.demandMetrics?.competitionLevel || 'Medium'}
                    </p>
                    <p className="text-sm text-gray-600">Competition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>
                Key metrics and their recent changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobData?.marketTrends?.map((trend: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${getChangeColor(trend.change)}`}>
                        {getChangeIcon(trend.change)}
                        <span className="font-medium">{trend.metric}</span>
                      </div>
                      <span className="text-gray-600">{trend.interpretation}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{trend.value.toLocaleString()}</p>
                      <p className={`text-sm ${getChangeColor(trend.change)}`}>
                        {trend.change > 0 ? '+' : ''}{trend.change}% {trend.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills in Demand */}
          <Card>
            <CardHeader>
              <CardTitle>Most Demanded Skills</CardTitle>
              <CardDescription>
                Skills appearing in job postings with salary premiums
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobData?.skillRequirements?.slice(0, 6).map((skill: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant={skill.criticality === 'Essential' ? 'default' : 'secondary'}>
                          {skill.criticality}
                        </Badge>
                      </div>
                      <div className="text-right text-sm">
                        <span className="font-medium text-green-600">
                          +{skill.salaryPremium}% premium
                        </span>
                        <div className="text-gray-600">
                          {skill.demandPercentage}% of jobs
                        </div>
                      </div>
                    </div>
                    <Progress value={skill.demandPercentage} className="h-2" />
                    <div className="text-xs text-gray-600">
                      Growing {skill.growthRate}% year over year
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          {/* Salary Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Salary Data</CardTitle>
              <CardDescription>
                Aggregated from {salaryData?.sources?.length || 5} salary platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border">
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Entry Level</h3>
                    <p className="text-2xl font-bold">
                      {formatCurrency(jobData?.salaryData?.entry?.median || 0)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(jobData?.salaryData?.entry?.min || 0)} - {formatCurrency(jobData?.salaryData?.entry?.max || 0)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Mid-Level</h3>
                    <p className="text-2xl font-bold">
                      {formatCurrency(jobData?.salaryData?.mid?.median || 0)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(jobData?.salaryData?.mid?.min || 0)} - {formatCurrency(jobData?.salaryData?.mid?.max || 0)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Senior Level</h3>
                    <p className="text-2xl font-bold">
                      {formatCurrency(jobData?.salaryData?.senior?.median || 0)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(jobData?.salaryData?.senior?.min || 0)} - {formatCurrency(jobData?.salaryData?.senior?.max || 0)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-medium mb-4">Common Benefits</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {jobData?.salaryData?.benefits?.healthInsurance || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Health Insurance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {jobData?.salaryData?.benefits?.stockOptions || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Stock Options</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {jobData?.salaryData?.benefits?.remoteWork || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Remote Work</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {jobData?.salaryData?.benefits?.averageBonusPercentage || 0}%
                    </p>
                    <p className="text-sm text-gray-600">Average Bonus</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    +{jobData?.salaryData?.growth?.yearOverYear || 0}%
                  </p>
                  <p className="text-sm text-gray-600">Year over Year</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    +{jobData?.salaryData?.growth?.fiveYearProjection || 0}%
                  </p>
                  <p className="text-sm text-gray-600">5-Year Projection</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    +{jobData?.salaryData?.growth?.inflationAdjusted || 0}%
                  </p>
                  <p className="text-sm text-gray-600">Inflation Adjusted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Demand Analysis</CardTitle>
              <CardDescription>
                Real-time hiring metrics and competition levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Hiring Rate</h3>
                    <div className="flex items-center space-x-2">
                      <Progress value={jobData?.demandMetrics?.hiringRate || 0} className="flex-1" />
                      <span className="font-medium">{jobData?.demandMetrics?.hiringRate || 0}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Demand Trend</h3>
                    <Badge variant={jobData?.demandMetrics?.demandTrend === 'Increasing' ? 'default' : 'secondary'}>
                      {jobData?.demandMetrics?.demandTrend || 'Stable'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Competition Level</h3>
                    <Badge variant={
                      jobData?.demandMetrics?.competitionLevel === 'High' ? 'destructive' :
                      jobData?.demandMetrics?.competitionLevel === 'Medium' ? 'default' : 'secondary'
                    }>
                      {jobData?.demandMetrics?.competitionLevel || 'Medium'}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Average Time to Fill</h3>
                    <p className="text-lg font-semibold">
                      {jobData?.demandMetrics?.timeToFill || 0} days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Seasonality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Peak Hiring Months</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData?.demandMetrics?.seasonality?.peakMonths?.map((month: string, index: number) => (
                      <Badge key={index} variant="default">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Slow Hiring Months</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData?.demandMetrics?.seasonality?.lowMonths?.map((month: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Comparison</CardTitle>
              <CardDescription>
                Compare opportunities across different cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationComparison.map((loc: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{loc.city}, {loc.state}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          Tech Hub: {loc.techHubRating}/100
                        </Badge>
                        <Badge variant="secondary">
                          COL: {loc.costOfLiving}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Remote Work</p>
                        <p className="font-medium">{loc.remoteWorkPrevalence}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Top Companies</p>
                        <p className="font-medium">{loc.companies?.length || 0} major employers</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Rating</p>
                        <p className="font-medium">{loc.companies?.[0]?.rating?.toFixed(1) || 'N/A'}/5</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outlook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Outlook</CardTitle>
              <CardDescription>
                Future projections and market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    +{industryOutlook?.growthProjection?.nextYear || 0}%
                  </p>
                  <p className="text-sm text-gray-600">Next Year Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    +{industryOutlook?.growthProjection?.fiveYear || 0}%
                  </p>
                  <p className="text-sm text-gray-600">5-Year Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {industryOutlook?.disruption?.aiImpact || 0}%
                  </p>
                  <p className="text-sm text-gray-600">AI Impact Score</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Emerging Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {industryOutlook?.disruption?.emergingTechnologies?.map((tech: string, index: number) => (
                      <Badge key={index} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Market Forces</h3>
                  <ul className="space-y-2">
                    {industryOutlook?.marketForces?.map((force: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{force}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}