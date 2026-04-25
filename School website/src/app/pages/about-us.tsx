import { Heart, Target, Eye } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import graduationImg from "@/assets/images/patriotism.jpg";

export function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[350px] sm:h-[450px] lg:h-[650px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={graduationImg}
            alt="Jericho School students"
            className="w-full h-full object-cover object-[center_15%]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto drop-shadow-md">
            Building a community of learners with competence and dignity
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 dark:text-white">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              Jericho School has been a beacon of excellence in education,
              committed to nurturing young minds and developing future leaders.
              Our institution stands on the foundation of two core values:
              Competence and Dignity.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              We believe that every child deserves quality education that not only
              builds academic competence but also instills dignity, respect, and
              strong moral values. Our holistic approach to education ensures that
              students grow intellectually, socially, culturally, and morally.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Through dedicated teachers, modern facilities, and a vibrant learning
              environment, we prepare our students to face the challenges of
              tomorrow with confidence and integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:rotate-3">
                  <Target className="h-7 w-7 text-blue-900 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl mb-4 dark:text-white">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  To provide quality education that develops competent, dignified,
                  and morally upright individuals who will contribute positively
                  to society.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:rotate-3">
                  <Eye className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl mb-4 dark:text-white">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  To be a leading educational institution recognized for academic
                  excellence, character development, and producing students who
                  exemplify competence and dignity.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group cursor-default">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/40 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rounded-xl group-hover:rotate-3">
                  <Heart className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl mb-4 dark:text-white">Our Values</h3>
                <p className="text-gray-700 dark:text-gray-400">
                  Competence, Dignity, Integrity, Excellence, Respect, and
                  Community. These values guide our teaching and shape the
                  character of every Jericho student.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team (commented out) */}
      {/* <section className="py-12 sm:py-16"> ... </section> */}

      {/* Core Principles */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 dark:text-white">Our Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            <div className="glass-card p-6 rounded-xl group cursor-default">
              <h3 className="mb-2 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">Competence</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We strive to build skilled, knowledgeable, and capable students
                who excel academically and practically.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl group cursor-default">
              <h3 className="mb-2 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">Dignity</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We nurture self-respect, honor, and pride in our students,
                teaching them to carry themselves with grace.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl group cursor-default">
              <h3 className="mb-2 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">Character Building</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We emphasize moral values, discipline, and integrity in all
                aspects of school life.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl group cursor-default">
              <h3 className="mb-2 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">Holistic Education</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
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