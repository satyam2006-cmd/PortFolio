"use client"

import ScrollVelocity from './ScrollVelocity';

const codingProfiles = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/satyambhagat/",
    badge: "https://img.shields.io/badge/LeetCode-000000?style=for-the-badge&logo=LeetCode&logoColor=yellow"
  },
  {
    name: "CodeChef", 
    url: "https://www.codechef.com/users/satyambhagat",
    badge: "https://img.shields.io/badge/CodeChef-%235B4638.svg?style=for-the-badge&logo=CodeChef&logoColor=white"
  },
  {
    name: "GeeksForGeeks",
    url: "https://www.geeksforgeeks.org/user/satyambhagwypf/",
    badge: "https://img.shields.io/badge/GeeksforGeeks-298D46.svg?style=for-the-badge&logo=geeksforgeeks&logoColor=white"
  },
  {
    name: "Streamlit",
    url: "https://share.streamlit.io/user/satyam2006-cmd",
    badge: "https://img.shields.io/badge/Streamlit-FF4B4B.svg?style=for-the-badge&logo=Streamlit&logoColor=white"
  }
];

export default function CodingProfiles() {
  const profileTexts = codingProfiles.map(profile => 
    `<a href="${profile.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin: 0 1rem;">
      <img src="${profile.badge}" alt="${profile.name}" style="height: 28px;" />
    </a>`
  ).join(' ');

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif mb-8 text-center">Coding Profiles</h2>
        <div className="relative overflow-hidden">
          <ScrollVelocity
            texts={[profileTexts]}
            velocity={30}
            className="coding-profile-scroll"
          />
        </div>
      </div>
    </section>
  );
}
