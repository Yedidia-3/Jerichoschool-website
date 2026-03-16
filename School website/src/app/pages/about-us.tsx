import { Heart, Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import graduationImg from "@/assets/images/patriotism.jpg";

export function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={graduationImg}
            alt="Jericho School students"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">About Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            Building a community of learners with competence and dignity
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              Jericho School has been a beacon of excellence in education,
              committed to nurturing young minds and developing future leaders.
              Our institution stands on the foundation of two core values:
              Competence and Dignity.
            </p>
            <p className="text-gray-700 mb-4 text-sm sm:text-base">
              We believe that every child deserves quality education that not only
              builds academic competence but also instills dignity, respect, and
              strong moral values. Our holistic approach to education ensures that
              students grow intellectually, socially, culturally, and morally.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Through dedicated teachers, modern facilities, and a vibrant learning
              environment, we prepare our students to face the challenges of
              tomorrow with confidence and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-2xl mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide quality education that develops competent, dignified,
                  and morally upright individuals who will contribute positively
                  to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be a leading educational institution recognized for academic
                  excellence, character development, and producing students who
                  exemplify competence and dignity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl mb-4">Our Values</h3>
                <p className="text-gray-700">
                  Competence, Dignity, Integrity, Excellence, Respect, and
                  Community. These values guide our teaching and shape the
                  character of every Jericho student.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mb-1">School Director</h3>
              <p className="text-gray-600 mb-2">Head of School</p>
              <p className="text-sm text-gray-500">
                Leading Jericho School with vision and dedication
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mb-1">Academic Coordinator</h3>
              <p className="text-gray-600 mb-2">Director of Studies</p>
              <p className="text-sm text-gray-500">
                Overseeing academic excellence and curriculum development
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mb-1">Student Affairs Coordinator</h3>
              <p className="text-gray-600 mb-2">Head of Student Welfare</p>
              <p className="text-sm text-gray-500">
                Ensuring student wellbeing and character development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Our Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="mb-2">Competence</h3>
              <p className="text-gray-600 text-sm">
                We strive to build skilled, knowledgeable, and capable students
                who excel academically and practically.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="mb-2">Dignity</h3>
              <p className="text-gray-600 text-sm">
                We nurture self-respect, honor, and pride in our students,
                teaching them to carry themselves with grace.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="mb-2">Character Building</h3>
              <p className="text-gray-600 text-sm">
                We emphasize moral values, discipline, and integrity in all
                aspects of school life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="mb-2">Holistic Education</h3>
              <p className="text-gray-600 text-sm">
                We develop the whole child - academically, socially, culturally,
                physically, and spiritually.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}