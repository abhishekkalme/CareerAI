import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Plus, Users, MapPin, Calendar, Star } from 'lucide-react';

interface GuestLecturer {
  id: string;
  name: string;
  photo: string;
  designation: string;
  company: string;
  expertise: string[];
  bio: string;
  rating: number;
  experience: string;
  location: string;
  availableSlots: string[];
}

const mockLecturers: GuestLecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    designation: 'Senior Data Scientist',
    company: 'Google',
    expertise: ['Machine Learning', 'AI Ethics', 'Deep Learning', 'Python'],
    bio: 'Dr. Sarah Chen is a distinguished data scientist with over 10 years of experience in artificial intelligence and machine learning. She has led groundbreaking research in ethical AI and has published over 50 papers in top-tier conferences.',
    rating: 4.9,
    experience: '10+ years',
    location: 'San Francisco, CA',
    availableSlots: ['Monday 2-4 PM', 'Wednesday 10-12 PM', 'Friday 3-5 PM']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    designation: 'VP of Engineering',
    company: 'Netflix',
    expertise: ['Software Architecture', 'Team Leadership', 'Cloud Computing', 'DevOps'],
    bio: 'Michael has scaled engineering teams from 10 to 500+ engineers. He specializes in building resilient distributed systems and fostering engineering culture in high-growth companies.',
    rating: 4.8,
    experience: '15+ years',
    location: 'Los Angeles, CA',
    availableSlots: ['Tuesday 1-3 PM', 'Thursday 4-6 PM']
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    designation: 'Principal UX Designer',
    company: 'Apple',
    expertise: ['User Experience', 'Design Thinking', 'Product Strategy', 'Research'],
    bio: 'Dr. Priya Sharma has shaped the user experience of products used by millions. She leads design innovation at Apple and is passionate about creating inclusive and accessible digital experiences.',
    rating: 4.9,
    experience: '12+ years',
    location: 'Cupertino, CA',
    availableSlots: ['Monday 10-12 PM', 'Wednesday 2-4 PM', 'Friday 1-3 PM']
  },
  {
    id: '4',
    name: 'James Thompson',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    designation: 'Cybersecurity Director',
    company: 'Microsoft',
    expertise: ['Cybersecurity', 'Risk Management', 'Compliance', 'Network Security'],
    bio: 'James leads cybersecurity initiatives protecting millions of users. He has extensive experience in threat detection, incident response, and building security-first cultures in organizations.',
    rating: 4.7,
    experience: '14+ years',
    location: 'Seattle, WA',
    availableSlots: ['Tuesday 9-11 AM', 'Thursday 2-4 PM', 'Friday 10-12 PM']
  }
];

export function GuestLecturers() {
  const { t } = useTranslation();
  const [lecturers, setLecturers] = useState<GuestLecturer[]>(mockLecturers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<GuestLecturer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('');

  const filteredLecturers = lecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExpertise = filterExpertise === '' || 
                            lecturer.expertise.some(skill => 
                              skill.toLowerCase().includes(filterExpertise.toLowerCase())
                            );
    return matchesSearch && matchesExpertise;
  });

  const allExpertise = Array.from(new Set(lecturers.flatMap(l => l.expertise)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('lecturers.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('lecturers.description')}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('lecturers.add_lecturer')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Guest Lecturer</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new guest lecturer to the platform.
              </DialogDescription>
            </DialogHeader>
            <AddLecturerForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder={t('lecturers.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="sm:w-64">
          <Input
            placeholder={t('lecturers.filter_placeholder')}
            value={filterExpertise}
            onChange={(e) => setFilterExpertise(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{lecturers.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('lecturers.total_lecturers')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('lecturers.avg_rating')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('lecturers.available_slots')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lecturers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLecturers.map((lecturer) => (
          <Card key={lecturer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={lecturer.photo} alt={lecturer.name} />
                  <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{lecturer.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {lecturer.designation}
                  </p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                    {lecturer.company}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{lecturer.location}</span>
                <span className="ml-auto flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {lecturer.rating}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">{t('lecturers.expertise')}:</p>
                <div className="flex flex-wrap gap-1">
                  {lecturer.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {lecturer.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{lecturer.expertise.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {lecturer.bio}
              </p>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      {t('common.view_profile')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <LecturerProfile lecturer={lecturer} />
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1">
                  {t('common.book_session')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLecturers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('lecturers.no_lecturers.title')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('lecturers.no_lecturers.description')}
          </p>
        </div>
      )}
    </div>
  );
}

function LecturerProfile({ lecturer }: { lecturer: GuestLecturer }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={lecturer.photo} alt={lecturer.name} />
            <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <DialogTitle className="text-2xl">{lecturer.name}</DialogTitle>
            <DialogDescription className="text-lg mt-1">
              {lecturer.designation} at {lecturer.company}
            </DialogDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {lecturer.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {lecturer.rating} ({lecturer.experience} experience)
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{t('lecturers.bio')}</h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {lecturer.bio}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t('lecturers.areas_of_expertise')}</h4>
          <div className="flex flex-wrap gap-2">
            {lecturer.expertise.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t('lecturers.available_time_slots')}</h4>
          <div className="grid grid-cols-1 gap-2">
            {lecturer.availableSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  {slot}
                </span>
                <Button size="sm" variant="outline">
                  {t('lecturers.book')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLecturerForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    location: '',
    bio: '',
    expertise: '',
    photo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the form data
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            placeholder="Dr. John Smith"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={(e) => setFormData(prev => ({...prev, designation: e.target.value}))}
            placeholder="Senior Software Engineer"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
            placeholder="Google"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
            placeholder="San Francisco, CA"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo URL</Label>
        <Input
          id="photo"
          value={formData.photo}
          onChange={(e) => setFormData(prev => ({...prev, photo: e.target.value}))}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">Expertise (comma-separated)</Label>
        <Input
          id="expertise"
          value={formData.expertise}
          onChange={(e) => setFormData(prev => ({...prev, expertise: e.target.value}))}
          placeholder="Machine Learning, Python, Data Science"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
          placeholder="Brief description of experience and background..."
          rows={4}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Add Lecturer
        </Button>
      </div>
    </form>
  );
}