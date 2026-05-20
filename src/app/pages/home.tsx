import { Link } from "react-router";
import { BookOpen, Users, Award, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import heroImg from "@/assets/images/hero.jpg";
import classroomImg from "@/assets/images/primary.jpg";
import danceImg from "@/assets/images/culture.jpg";
import performanceImg from "@/assets/images/entertainment.jpg";

import { HeroSlideshow } from "../components/hero-slideshow";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center">
        <HeroSlideshow />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 drop-shadow-lg">Welcome to Jericho School</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-md">
            Building tomorrow's leaders with competence and dignity
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Link to="/apply">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-950 text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/30 hover:scale-105">
                Apply Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20 text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 dark:text-white">Why Choose Jericho School?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              We provide a comprehensive education that nurtures young minds and
              prepares students for future success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                  <BookOpen className="h-7 w-7 text-blue-900 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 dark:text-white">Academic Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Quality education with a focus on competence and character
                  development
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-800/50">
                  <Users className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-2 dark:text-white">Dedicated Teachers</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Passionate educators committed to nurturing every child's
                  potential
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50">
                  <Award className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="mb-2 dark:text-white">Holistic Development</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Academic, cultural, and personal growth opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50">
                  <Rocket className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mb-2 dark:text-white">Future Ready</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Preparing students with skills for tomorrow's world
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="group hover-lift p-4 rounded-xl">
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-900 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">800+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Enrolled Students</div>
            </div>
            <div className="group hover-lift p-4 rounded-xl">
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-900 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">95%</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Success Rate</div>
            </div>
            <div className="group hover-lift p-4 rounded-xl">
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-900 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">20+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Expert Teachers</div>
            </div>
            <div className="group hover-lift p-4 rounded-xl">
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-900 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">5+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Life at Jericho School
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden img-hover-zoom group shadow-lg dark:shadow-slate-900/50">
              <img
                src={classroomImg}
                alt="Students in classroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">Learning Together</span>
              </div>
            </div>
            <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden img-hover-zoom group shadow-lg dark:shadow-slate-900/50">
              <img
                src={danceImg}
                alt="Cultural dance performance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">Cultural Heritage</span>
              </div>
            </div>
            <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden img-hover-zoom group shadow-lg dark:shadow-slate-900/50">
              <img
                src={performanceImg}
                alt="Student performances"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">Student Talent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest from YouTube */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center sm:text-left dark:text-white">Latest from Our Channel</h2>
            <Link to="/news-events" className="text-blue-900 dark:text-blue-400 font-medium hover:underline flex items-center gap-2 transition-colors duration-300">
              View all updates
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl dark:shadow-slate-900/50 bg-black ring-1 ring-black/5 dark:ring-white/10">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed?listType=playlist&list=UUQhwMKHOFNsKuuBI1xb5qRw"
                title="Jericho School YouTube Feed"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400">Experience Jericho School in Motion</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Stay connected with our vibrant community through our YouTube channel. We share highlights from cultural performances, graduation ceremonies, academic awards, and everyday life at Jericho.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.youtube.com/@Jericho_school"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-red-600/20 hover:scale-105"
                >
                  <Rocket className="h-5 w-5 rotate-45" />
                  Visit Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-900 dark:bg-gradient-to-r dark:from-blue-950 dark:to-slate-900 text-white section-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100">
            Take the first step towards an exceptional education
          </p>
          <Link to="/apply">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}