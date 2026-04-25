import {
  BookOpen,
  Microscope,
  Calculator,
  Globe,
  Palette,
  Music,
  Dumbbell,
  Languages,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import classroomImg from "@/assets/images/nursery.jpg";
import uniformImg from "@/assets/images/discipline.jpg";

export function Academics() {
  const programs = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "English & Literature",
      description:
        "Strong foundation in reading, writing, comprehension, and communication skills.",
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Mathematics",
      description:
        "Building numerical literacy and problem-solving skills from basic arithmetic to advanced concepts.",
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Science",
      description:
        "Hands-on learning in basic science, nature studies, and practical experiments.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Social Studies",
      description:
        "Understanding our world, culture, history, and developing global awareness.",
    },
    {
      icon: <Languages className="h-8 w-8" />,
      title: "Languages",
      description:
        "Language proficiency development and communication skills.",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Creative Arts",
      description:
        "Drawing, painting, crafts, and creative expression activities.",
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Music & Cultural Arts",
      description:
        "Music, dance, drama, and cultural performances for holistic development.",
    },
    {
      icon: <Dumbbell className="h-8 w-8" />,
      title: "Physical Education",
      description:
        "Sports, games, and physical activities promoting health and teamwork.",
    },
  ];

  const specialPrograms = [
    {
      title: "Character Education",
      description:
        "Moral instruction and character development focusing on values, discipline, and good citizenship aligned with our motto: Competence & Dignity.",
    },
    {
      title: "Cultural Programs",
      description:
        "Regular cultural activities, performances, and traditional dance programs that celebrate our heritage and build confidence.",
    },
    {
      title: "Public Speaking & Leadership",
      description:
        "Training students in public speaking, presentation skills, and leadership qualities from an early age.",
    },
    {
      title: "Co-curricular Activities",
      description:
        "Clubs, competitions, and enrichment programs including debate, quiz competitions, and talent shows.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={classroomImg}
            alt="Jericho School classroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 drop-shadow-lg">Academics</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto drop-shadow-md">
            Quality education building competence and dignity
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Our Academic Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <Card key={index} className="glass-card group cursor-default">
                <CardContent className="pt-6">
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-900 dark:text-blue-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 group-hover:rotate-3">
                    {program.icon}
                  </div>
                  <h3 className="mb-2 dark:text-white">{program.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Programs by Level
          </h2>
          <Tabs defaultValue="nursery" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 dark:bg-slate-800">
              <TabsTrigger value="nursery" className="dark:data-[state=active]:bg-slate-700">Nursery</TabsTrigger>
              <TabsTrigger value="primary" className="dark:data-[state=active]:bg-slate-700">Primary</TabsTrigger>
              <TabsTrigger value="upper" className="dark:data-[state=active]:bg-slate-700">Upper Primary</TabsTrigger>
            </TabsList>
            <TabsContent value="nursery" className="mt-8">
              <Card className="glass-card dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Nursery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our early childhood program provides a nurturing environment
                    where young learners develop foundational skills through play,
                    exploration, and structured activities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Basic literacy and numeracy skills</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Social and emotional development</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Creative play and art activities</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Motor skills development</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="primary" className="mt-8">
              <Card className="glass-card dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Primary Level (1-3)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our primary program builds strong academic foundations while
                    developing character, confidence, and essential life skills.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Core subjects: Mathematics, Science, Social Studies, Kinyarwanda, English, and French</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Reading and writing proficiency</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Music, arts, and physical education</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Character education and moral instruction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upper" className="mt-8">
              <Card className="glass-card dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Upper Primary (4-6)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Advanced curriculum preparing students for secondary education
                    with emphasis on critical thinking, leadership, and academic excellence.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Advanced courses in all core subjects</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Research and project-based learning</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Leadership development and public speaking</span>
                    </li>
                    <li className="flex items-start gap-2 group/item">
                      <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                      <span className="dark:text-gray-300">Exam preparation and study skills</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Learning Environment */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 dark:text-white">
                Our Learning Environment
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                At Jericho School, we provide a conducive learning environment
                with bright classrooms, qualified teachers, and a curriculum that
                balances academic excellence with character development.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                    <span className="text-blue-900 dark:text-blue-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Modern, well-lit classrooms</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                    <span className="text-blue-900 dark:text-blue-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Qualified and dedicated teachers</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                    <span className="text-blue-900 dark:text-blue-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Interactive learning materials</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
                    <span className="text-blue-900 dark:text-blue-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Regular assessments and feedback</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden img-hover-zoom shadow-xl dark:shadow-slate-900/50 ring-1 ring-black/5 dark:ring-white/10">
              <img
                src={uniformImg}
                alt="Student in uniform"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Special Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialPrograms.map((program, index) => (
              <Card key={index} className="glass-card group cursor-default hover-glow">
                <CardHeader>
                  <CardTitle className="dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}