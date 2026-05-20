import { Link } from "react-router";
import { BookOpen, Users, Award, Rocket } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import heroImg from "figma:asset/57a7f8730ba4767b17ed3e0ac0bcf6c63f88e1b8.png";
import classroomImg from "figma:asset/8e7856a8c0bced5f3d8f6b2a6e8d8ad8f87a54c7.png";
import danceImg from "figma:asset/2b1dbd46a0ee6a8d2f36fcf45c2f4bb8e7c97f01.png";
import performanceImg from "figma:asset/be23749228d123638bb02afbbd37fb54c3877efd.png";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Jericho School Graduation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">Welcome to Jericho School</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Building tomorrow's leaders with competence and dignity
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Link to="/apply">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                Apply Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white hover:bg-white/20 text-sm sm:text-base"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Why Choose Jericho School?</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              We provide a comprehensive education that nurtures young minds and
              prepares students for future success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2">Academic Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Quality education with a focus on competence and character
                  development
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2">Dedicated Teachers</h3>
                <p className="text-gray-600 text-sm">
                  Passionate educators committed to nurturing every child's
                  potential
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="mb-2">Holistic Development</h3>
                <p className="text-gray-600 text-sm">
                  Academic, cultural, and personal growth opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2">Future Ready</h3>
                <p className="text-gray-600 text-sm">
                  Preparing students with skills for tomorrow's world
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 mb-2">800+</div>
              <div className="text-gray-600 text-sm sm:text-base">Students</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm sm:text-base">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 text-sm sm:text-base">Expert Teachers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl text-blue-600 mb-2">20+</div>
              <div className="text-gray-600 text-sm sm:text-base">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Life at Jericho School
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
              <img
                src={classroomImg}
                alt="Students in classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
              <img
                src={danceImg}
                alt="Cultural dance performance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
              <img
                src={performanceImg}
                alt="Student performances"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">
            Take the first step towards an exceptional education
          </p>
          <Link to="/apply">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}