import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/live';

export async function getProfile() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });
  return profile;
}
const PROFILE_QUERY = defineQuery(`
// Get profile information
*[_type == "profile"][0]{
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    yearsOfExperience,
    socialLinks,
    profileImage
  }`);

// Get all work experience (sorted by most recent)
const _EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(startDate desc){
    _id,
    company,
    position,
    startDate,
    endDate,
    description,
    responsibilities,
    achievements,
    technologies,
    current
  }
  
  // Get featured projects
  *[_type == "project" && featured == true] | order(_createdAt desc){
    _id,
    title,
    description,
    technologies,
    liveUrl,
    githubUrl,
    featured,
    images,
    category
  }
  
  // Get all projects
  *[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    description,
    technologies,
    liveUrl,
    githubUrl,
    category
  }
  
  // Get skills (grouped by category)
  *[_type == "skill"] | order(proficiency desc){
    _id,
    name,
    category,
    proficiency,
    yearsOfExperience
  }
  
  // Get education
  *[_type == "education"] | order(endDate desc){
    _id,
    institution,
    degree,
    field,
    startDate,
    endDate,
    description,
    gpa
  }
  
  // Get certifications
  *[_type == "certification"] | order(issueDate desc){
    _id,
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialUrl,
    description
  }
  
  // Get recent blog posts
  *[_type == "blog"] | order(publishedAt desc)[0...5]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    categories,
    featured
  }
  
  // Get testimonials
  *[_type == "testimonial"]{
    _id,
    name,
    role,
    company,
    content,
    rating,
    date
  }
  
  // Get services offered
  *[_type == "service"]{
    _id,
    title,
    description,
    icon,
    featured
  }
  
  // Get achievements
  *[_type == "achievement"] | order(date desc){
    _id,
    title,
    description,
    date,
    category
  }
  
  // Search by technology (example)
  *[_type == "project" && "React" in technologies[]]{
    title,
    description,
    technologies
  }`);
