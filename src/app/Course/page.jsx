
"use client";
import React from 'react';
import Navbar from '../Component/Navbar';
import { useSearchParams } from 'next/navigation';
import CourseTabs from '../Component/CourseTabs';
import ContentSection from '../Component/ContentSection';
import AnnouncementCard from '../Component/AnnouncementCard';
const CoursePage = () => {
    const searchParams = useSearchParams();
    const courseParams = searchParams.get('title') || 'Course Details';
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <CourseTabs />

      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{courseParams}</h1>

        <ContentSection title="General">
          <AnnouncementCard
            title="Announcements"
            description="Check out the latest updates for this course."
            color="border-red-500"
          />
          <AnnouncementCard
            title="Student Feedback - Mid Semester"
            description="Provide your feedback on the course progress."
            color="border-green-500"
          />
          <AnnouncementCard
            title="Zoom Link to Tutorial on 16/10/2024"
            description="Join the session via the provided link."
            color="border-blue-500"
          />
        </ContentSection>
      </div>
    </div>
  );
};

export default CoursePage;
