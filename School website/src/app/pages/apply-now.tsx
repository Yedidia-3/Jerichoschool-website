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
      <div className="min-h-[600px] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in Jericho School. We've received
            your application and will contact you within 2-3 business days to
            schedule a school visit.
          </p>
          <Button onClick={() => setSubmitted(false)}>
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">Apply Now</h1>
          <p className="text-lg sm:text-xl">
            Join the Jericho School family - Building Competence & Dignity
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Application Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-sm text-blue-900 mb-2">Step {index + 1}</div>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Application Form</CardTitle>
              <p className="text-gray-600">
                Please fill out all required fields to begin the application
                process
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-xl mb-4">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input id="dob" name="dob" type="date" required />
                    </div>
                    <div>
                      <Label htmlFor="grade">Class/Grade Applying For *</Label>
                      <Select name="grade" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="pre-primary">Pre-Primary</SelectItem>
                          <SelectItem value="1">Class 1</SelectItem>
                          <SelectItem value="2">Class 2</SelectItem>
                          <SelectItem value="3">Class 3</SelectItem>
                          <SelectItem value="4">Class 4</SelectItem>
                          <SelectItem value="5">Class 5</SelectItem>
                          <SelectItem value="6">Class 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div>
                  <h3 className="text-xl mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parentFirstName">First Name *</Label>
                      <Input
                        id="parentFirstName"
                        name="parentFirstName"
                        required
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentLastName">Last Name *</Label>
                      <Input
                        id="parentLastName"
                        name="parentLastName"
                        required
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane.doe@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+234 123 456 7890"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-xl mb-4">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          required
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">Postal Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="message">
                    Why do you want your child to attend Jericho School?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your expectations and why you believe Jericho School is right for your child..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 justify-end">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit" size="lg">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Admission Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Completed application form</li>
                  <li>• Birth certificate copy</li>
                  <li>• Recent passport photos</li>
                  <li>• Previous school report (if applicable)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>School Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  Contact our admissions office for detailed fee structure and
                  payment plans.
                </p>
                <p className="text-sm text-gray-600">
                  Phone: (555) 123-4567
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>School Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Monday - Friday</li>
                  <li>• 8:00 AM - 2:30 PM</li>
                  <li>• Extended care available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}