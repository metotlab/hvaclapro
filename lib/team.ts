/**
 * Team configuration. Replace with real team members before launch.
 * Photo paths point to /public/team/<file>.jpg — drop real photos there.
 *
 * If TEAM array is empty, the TeamSection component renders nothing.
 */
export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: string; // path under /public, e.g. /team/john.jpg
  yearsExperience?: number;
  certifications?: string[]; // e.g. ["EPA 608", "NATE Certified"]
};

export const TEAM: TeamMember[] = [
  {
    name: "Carlos M.",
    role: "Lead HVAC Technician",
    bio: "Specializes in residential AC repair, refrigerant leak diagnosis, and Carrier and Goodman systems. Based in the San Fernando Valley.",
    photo: "/team/tech-1.jpg",
    yearsExperience: 14,
    certifications: ["EPA 608 Universal", "NATE Certified", "C-20 Licensed"],
  },
  {
    name: "Mike R.",
    role: "HVAC Service Technician",
    bio: "Experienced in ductless mini split installation, heat pump service, and Mitsubishi and Trane systems. Serves the Westside and South Bay.",
    photo: "/team/tech-2.jpg",
    yearsExperience: 9,
    certifications: ["EPA 608 Universal", "Mitsubishi Diamond Certified"],
  },
];
