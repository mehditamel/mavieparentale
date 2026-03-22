import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function BudgetLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="mt-2 h-4 w-72" />
      </div>

      {/* Forecast card */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-6 w-24" />
        </CardContent>
      </Card>

      {/* Month navigator */}
      <div className="flex items-center justify-center gap-4">
        <SkeletonBlock className="h-9 w-9 rounded-md" />
        <SkeletonBlock className="h-6 w-36" />
        <SkeletonBlock className="h-9 w-9 rounded-md" />
      </div>

      {/* 4 stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <SkeletonBlock className="h-4 w-20 mb-2" />
              <SkeletonBlock className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-28 rounded-md" />
        ))}
      </div>

      {/* Entries list */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-8 w-8 rounded" />
                <div className="space-y-1">
                  <SkeletonBlock className="h-4 w-32" />
                  <SkeletonBlock className="h-3 w-20" />
                </div>
              </div>
              <SkeletonBlock className="h-5 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bank connections + AI Coach */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-40" />
          </CardHeader>
          <CardContent className="space-y-3">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-9 w-36 rounded-md" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <SkeletonBlock className="h-5 w-28" />
          </CardHeader>
          <CardContent className="space-y-3">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
