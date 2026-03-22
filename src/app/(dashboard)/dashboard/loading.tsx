import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Greeting + date */}
      <div>
        <SkeletonBlock className="h-8 w-72" />
        <SkeletonBlock className="mt-2 h-4 w-48" />
      </div>

      {/* Profile completion bar */}
      <Card>
        <CardContent className="flex items-center gap-4 p-4">
          <SkeletonBlock className="h-5 w-5 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-48" />
            <SkeletonBlock className="h-2 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* 4 stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <SkeletonBlock className="h-4 w-20 mb-2" />
              <SkeletonBlock className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Family overview */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonBlock className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="h-3 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alerts + Quick actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-24" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-12 w-full rounded-md" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget / Fiscal / Appointments */}
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <SkeletonBlock className="h-5 w-28" />
            </CardHeader>
            <CardContent className="space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activities + Milestones */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <SkeletonBlock className="h-5 w-36" />
            </CardHeader>
            <CardContent className="space-y-3">
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
