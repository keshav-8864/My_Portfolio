import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { CodingJourney, LeetCodeStats } from "@/components/CodingJourney";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const username = "Keshav_31_12";
    
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
            reputation
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            submissionCalendar
          }
        }
        userContestRanking(username: $username) {
          rating
        }
      }
    `;

    // Fetch directly from LeetCode GraphQL API
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Update every hour
    });

    if (!res.ok) throw new Error(`LeetCode GraphQL error: ${res.status}`);
    
    const data = await res.json();
    if (data.errors) throw new Error(`GraphQL returned errors: ${JSON.stringify(data.errors)}`);

    const matchedUser = data.data?.matchedUser;
    if (!matchedUser) throw new Error("User not found");

    interface SubmissionItem {
      difficulty: string;
      count: number;
    }
    const submissions: SubmissionItem[] = matchedUser.submitStats?.acSubmissionNum || [];
    const easy = submissions.find((s) => s.difficulty === "Easy")?.count || 0;
    const medium = submissions.find((s) => s.difficulty === "Medium")?.count || 0;
    const hard = submissions.find((s) => s.difficulty === "Hard")?.count || 0;
    const total = submissions.find((s) => s.difficulty === "All")?.count || (easy + medium + hard);

    const contest = data.data?.userContestRanking || {};
    const rating = contest.rating ? Math.round(contest.rating) : null;
    const ranking = matchedUser.profile?.ranking || 0;

    const calendarStr = matchedUser.userCalendar?.submissionCalendar || "{}";
    const calendar = JSON.parse(calendarStr);

    return {
      solvedProblem: total,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      ranking: ranking,
      rating: rating,
      calendar: calendar,
    };
  } catch {
    console.warn("Could not fetch live LeetCode stats. (This is normal if rate limited).");
    
    // In development mode (next dev), Next.js fetches on every single page reload.
    // This instantly triggers LeetCode's "429 Too Many Requests" rate limit.
    // To allow you to keep working on the UI without it crashing, we return mock data here.
    if (process.env.NODE_ENV === 'development') {
      console.log("⚠️ Dev Mode: LeetCode API rate limit hit. Using mock data.");
      
      // Generate a realistic-looking mock calendar for the last 6 months
      const mockCalendar: Record<string, number> = {};
      const now = Math.floor(Date.now() / 1000);
      for (let i = 0; i < 180; i++) {
        // Randomly populate about 60% of the days
        if (Math.random() > 0.4) {
          const timestamp = (now - (i * 86400)).toString();
          // Randomly assign 1 to 5 submissions
          mockCalendar[timestamp] = Math.floor(Math.random() * 5) + 1;
        }
      }

      return {
        solvedProblem: 283,
        easySolved: 120,
        mediumSolved: 130,
        hardSolved: 33,
        ranking: 250000,
        rating: 1650,
        calendar: mockCalendar
      };
    }
    
    // In production, if it fails, return null to hide the section entirely rather than breaking the build
    return null;
  }
}

export default async function Home() {
  const stats = await getLeetCodeStats();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <CodingJourney stats={stats} />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
