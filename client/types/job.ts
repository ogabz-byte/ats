export type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  status: "open" | "closed";
  createdAt: string;
};
