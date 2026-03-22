import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-56" />
        <SkeletonBlock className="mt-2 h-4 w-72" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-28 rounded-md" />
        ))}
      </div>

      {/* Group cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <SkeletonBlock className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
