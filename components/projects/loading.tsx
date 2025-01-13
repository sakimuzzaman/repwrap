import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export function ProjectsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Projects" text="Manage your projects and teams.">
                <Skeleton className="h-10 w-[120px]" />
            </DashboardHeader>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-[120px]" />
                ))}
            </div>
        </DashboardShell>
    )
}

