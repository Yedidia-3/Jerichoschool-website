import { Calendar, Clock, MapPin, Youtube, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState, useEffect } from "react";

interface YouTubeItem {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  link: string;
  description: string;
}

export function NewsEvents() {
  const [newsItems, setNewsItems] = useState<YouTubeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYouTubeFeed() {
      try {
        const channelId = "UCQhwMKHOFNsKuuBI1xb5qRw";
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
        );
        const data = await response.json();

        if (data.status === "ok") {
          const items = data.items.map((item: any) => ({
            id: item.guid,
            title: item.title,
            date: new Date(item.pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            thumbnail: item.thumbnail,
            link: item.link,
            description: item.description || "Watch our latest update on YouTube.",
          }));
          setNewsItems(items);
        } else {
          throw new Error("Failed to fetch YouTube feed");
        }
      } catch (err) {
        console.error("Error fetching YouTube feed:", err);
        setError("Could not load latest news from YouTube.");
      } finally {
        setLoading(false);
      }
    }

    fetchYouTubeFeed();
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Jericho School Graduation Ceremony 2026",
      date: "August 20, 2026",
      time: "9:00 AM - 1:00 PM",
      location: "School Campus",
      description:
        "Celebrating the achievements of our graduating class and marking their transition to the next stage of their education.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-950 dark:to-slate-900 text-white py-12 sm:py-16 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 drop-shadow-lg">News & Events</h1>
          <p className="text-lg sm:text-xl text-blue-100">
            Stay connected with the latest happenings at Jericho School
          </p>
        </div>
      </section>

      {/* Latest News (YouTube Feed) */}
      <section className="py-12 sm:py-16 dark:bg-slate-950 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl dark:text-white">Latest Updates</h2>
            <a
              href="https://www.youtube.com/@Jericho_school"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-all duration-300 hover:gap-3"
            >
              <Youtube className="h-5 w-5" />
              Subscribe on YouTube
            </a>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p>Fetching latest videos...</p>
            </div>
          ) : error ? (
            <div className="glass-card bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg text-center">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {newsItems.map((item) => (
                <Card key={item.id} className="glass-card overflow-hidden flex flex-col">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-48 block group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <Youtube className="h-6 w-6" />
                      </div>
                    </div>
                  </a>
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800 uppercase text-[10px]">
                        YouTube Video
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 transition-colors duration-300 hover:text-blue-900 dark:text-white dark:hover:text-blue-400">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-400 hover:underline transition-all duration-300 hover:gap-3"
                    >
                      Watch Video
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900 section-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 dark:text-white">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="glass-card hover-glow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl mb-2 sm:mb-3 dark:text-white">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{event.description}</p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2 group">
                          <Calendar className="h-4 w-4 text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 group">
                          <Clock className="h-4 w-4 text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 group">
                          <MapPin className="h-4 w-4 text-blue-900 dark:text-blue-400 transition-transform duration-200 group-hover:scale-110" />
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

      {/* Subscription Section */}
      <section className="py-12 sm:py-16 bg-blue-900 dark:bg-gradient-to-r dark:from-blue-950 dark:to-slate-900 text-white section-transition">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl mb-6 text-blue-100">
            Follow our YouTube channel for the latest videos and school highlights
          </p>
          <a
            href="https://www.youtube.com/@Jericho_school"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-600/30"
          >
            <Youtube className="h-6 w-6" />
            Visit Our YouTube Channel
          </a>
        </div>
      </section>
    </div>
  );
}