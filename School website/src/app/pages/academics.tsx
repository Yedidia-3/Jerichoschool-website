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
import classroomImg from "figma:asset/8e7856a8c0bced5f3d8f6b2a6e8d8ad8f87a54c7.png";
import uniformImg from "figma:asset/45d74e7dd2b7c0c6f5ee0b5e9d51c0cd6a729849.png";

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">Academics</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            Quality education building competence and dignity
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Our Academic Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {program.icon}
                  </div>
                  <h3 className="mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Programs by Level
          </h2>
          <Tabs defaultValue="nursery" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="nursery">Nursery</TabsTrigger>
              <TabsTrigger value="primary">Primary</TabsTrigger>
              <TabsTrigger value="upper">Upper Primary</TabsTrigger>
            </TabsList>
            <TabsContent value="nursery" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Nursery & Pre-Primary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Our early childhood program provides a nurturing environment
                    where young learners develop foundational skills through play,
                    exploration, and structured activities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Basic literacy and numeracy skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Social and emotional development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Creative play and art activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Motor skills development</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="primary" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Level (1-3)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Our primary program builds strong academic foundations while
                    developing character, confidence, and essential life skills.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Core subjects: Mathematics, Science, Social Studies, Kinyarwanda, English, and French</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Reading and writing proficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Music, arts, and physical education</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Character education and moral instruction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upper" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Upper Primary (4-6)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Advanced curriculum preparing students for secondary education
                    with emphasis on critical thinking, leadership, and academic excellence.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Advanced courses in all core subjects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Research and project-based learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Leadership development and public speaking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Exam preparation and study skills</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Learning Environment */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
                Our Learning Environment
              </h2>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                At Jericho School, we provide a conducive learning environment
                with bright classrooms, qualified teachers, and a curriculum that
                balances academic excellence with character development.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Modern, well-lit classrooms</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Qualified and dedicated teachers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Interactive learning materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base">Regular assessments and feedback</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
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
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Special Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialPrograms.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}