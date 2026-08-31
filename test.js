const fetch = require('node-fetch') || globalThis.fetch;

async function test() {
    const username = "Keshav_31_12";
    
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
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
          globalRanking
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: query,
        variables: { username }
      })
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}

test();
