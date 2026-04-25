import { useState } from "react";
import { CheckCircle, FileText, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function ApplyNow() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const applicationSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Submit Application",
      description: "Complete and submit the online application form",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "School Visit",
      description: "Visit the school and meet with our admissions team",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Receive Decision",
      description: "Get your admissions decision within one week",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Enroll",
      description: "Complete enrollment and join the Jericho family",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-[600px] flex items-center justify-center px-4 dark:bg-slate-950">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl mb-4 dark:text-white">Application Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your interest in Jericho School. We've received
            your application and will contact you within 2-3 business days to
            schedule a school visit.
          </p>
          <Button onClick={() => setSubmitted(false)} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-950 dark:to-slate-900 text-white py-12 sm:py-16 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 drop-shadow-lg">Apply Now</h1>
          <p className="text-lg sm:text-xl text-blue-100">
            Join the Jericho School family - Building Competence & Dignity
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Application Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center group hover-lift p-4 rounded-xl cursor-default">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 group-hover:rounded-xl group-hover:rotate-3">
                  {step.icon}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">Step {index + 1}</div>
                <h3 className="mb-2 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="glass-card dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl dark:text-white">Application Form</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Please fill out all required fields to begin the application
                process
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-xl mb-4 dark:text-white">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="dark:text-gray-300">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Keza"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="dark:text-gray-300">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Arlene"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob" className="dark:text-gray-300">Date of Birth *</Label>
                      <Input id="dob" name="dob" type="date" required className="dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-all duration-300 focus:ring-2 focus:ring-blue-500/30" />
                    </div>
                    <div>
                      <Label htmlFor="grade" className="dark:text-gray-300">Class/Grade Applying For *</Label>
                      <Select name="grade" required>
                        <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-white">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="1">Primary 1</SelectItem>
                          <SelectItem value="2">Primary 2</SelectItem>
                          <SelectItem value="3">Primary 3</SelectItem>
                          <SelectItem value="4">Primary 4</SelectItem>
                          <SelectItem value="5">Primary 5</SelectItem>
                          <SelectItem value="6">Primary 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h3 className="text-xl mb-4 dark:text-white">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parentFirstName" className="dark:text-gray-300">First Name *</Label>
                      <Input
                        id="parentFirstName"
                        name="parentFirstName"
                        required
                        placeholder="KAGABO"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentLastName" className="dark:text-gray-300">Last Name *</Label>
                      <Input
                        id="parentLastName"
                        name="parentLastName"
                        required
                        placeholder="Aime"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="dark:text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="aimekagabo@example.com"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="dark:text-gray-300">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+250 788789124"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl mb-4 dark:text-white">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="dark:text-gray-300">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        placeholder="Kk2Ave - 32"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="dark:text-gray-300">District *</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          placeholder="Akarere"
                          className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="dark:text-gray-300">Sector *</Label>
                        <Input
                          id="state"
                          name="state"
                          required
                          placeholder="Umurenge"
                          className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cell" className="dark:text-gray-300">Cell</Label>
                        <Input
                          id="cell"
                          name="cell"
                          placeholder="Akagali"
                          className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="message" className="dark:text-gray-300">
                    Why do you want your child to attend Jericho School?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your expectations and why you believe Jericho School is right for your child..."
                    className="dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-500 transition-all duration-300 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 justify-end">
                  <Button type="button" variant="outline" className="dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                    Save Draft
                  </Button>
                  <Button type="submit" size="lg" className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-900/20">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 dark:text-white">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="glass-card group cursor-default hover-glow">
              <CardHeader>
                <CardTitle className="dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Completed application form
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Birth certificate copy
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Recent passport photos
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Previous school report (if applicable)
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="glass-card group cursor-default hover-glow">
              <CardHeader>
                <CardTitle className="dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">School Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Contact our admissions office for detailed fee structure and
                  payment plans.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Phone: (+250) 788 490 200
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card group cursor-default hover-glow">
              <CardHeader>
                <CardTitle className="dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400">School Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Monday - Friday
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    8:00 AM - 2:30 PM
                  </li>
                  <li className="flex items-center gap-2 group/item">
                    <span className="text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover/item:scale-125">•</span>
                    Extended care available
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}