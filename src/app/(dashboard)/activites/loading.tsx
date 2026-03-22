import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-44" />
        <SkeletonBlock className="mt-2 h-4 w-64" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-28 rounded-md" />
        ))}
      </div>

      {/* Activity cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="h-8 w-8 rounded" />
                <SkeletonBlock className="h-5 w-32" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <SkeletonBlock className="h-3 w-40" />
              <SkeletonBlock className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
