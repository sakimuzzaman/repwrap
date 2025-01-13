import { Skeleton } from "@/components/ui/skeleton"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Admin Dashboard"
                text={new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-[300px]" />
                <Skeleton className="h-[300px] md:col-span-1 lg:col-span-2" />
                <Skeleton className="h-[300px]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
            </div>
        </DashboardShell>
    )
}

