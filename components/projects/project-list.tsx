import { ProjectCard } from "@/components/projects/project-card"

const projects = [
  {
    id: "1",
    name: "Repwrap",
    description: "Employee management system",
    status: "active",
  },
  {
    id: "2",
    name: "TimeFlow",
    description: "Time tracking application",
    status: "in-progress",
  },
  {
    id: "3",
    name: "Progressive Style",
    description: "Design system documentation",
    status: "completed",
  },
]

export function ProjectList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

