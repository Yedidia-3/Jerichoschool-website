import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import graduationImg from "figma:asset/f5da14c7a5bb4fce2afcfa5b3ec6950f9df19603.png";
import speakerImg from "figma:asset/039fdab221fee4d95d0d3448ba3e06f901d6c609.png";
import performanceImg from "figma:asset/2b1dbd46a0ee6a8d2f36fcf45c2f4bb8e7c97f01.png";

export function NewsEvents() {
  const newsItems = [
    {
      id: 1,
      title: "Jericho School Graduation Ceremony 2026",
      date: "March 10, 2026",
      category: "Achievement",
      image: graduationImg,
      excerpt:
        "Our students celebrated their achievements in a beautiful graduation ceremony, marking the completion of another successful academic year.",
    },
    {
      id: 2,
      title: "Students Showcase Talent in Public Speaking",
      date: "March 5, 2026",
      category: "Events",
      image: speakerImg,
      excerpt:
        "Our confident young speakers demonstrated exceptional communication skills during the school's public speaking competition.",
    },
    {
      id: 3,
      title: "Cultural Dance Performance Highlights",
      date: "February 28, 2026",
      category: "Cultural",
      image: performanceImg,
      excerpt:
        "Students delivered an outstanding cultural dance performance, showcasing our commitment to holistic education and cultural heritage.",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Open House for Prospective Parents",
      date: "March 25, 2026",
      time: "10:00 AM - 2:00 PM",
      location: "School Campus",
      description:
        "Tour our facilities, meet our teachers, and learn about our programs and admission process.",
    },
    {
      id: 2,
      title: "Cultural Day Celebration",
      date: "April 15, 2026",
      time: "9:00 AM - 1:00 PM",
      location: "School Grounds",
      description:
        "Join us for a day of cultural performances, traditional displays, and community celebration.",
    },
    {
      id: 3,
      title: "Academic Awards Day",
      date: "April 20, 2026",
      time: "10:00 AM - 12:00 PM",
      location: "School Hall",
      description:
        "Recognizing and celebrating academic excellence and student achievements throughout the year.",
    },
    {
      id: 4,
      title: "Parent-Teacher Conferences",
      date: "May 5-6, 2026",
      time: "2:00 PM - 6:00 PM",
      location: "Individual Classrooms",
      description:
        "Meet with teachers to discuss student progress, development, and areas for improvement.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">News & Events</h1>
          <p className="text-lg sm:text-xl">
            Stay connected with the latest happenings at Jericho School
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl mb-2 sm:mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{event.description}</p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Note */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">
            Subscribe to our newsletter for the latest news and event updates
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm sm:text-base"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}