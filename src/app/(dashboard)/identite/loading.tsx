import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function IdentiteLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-56" />
        <SkeletonBlock className="mt-2 h-4 w-80" />
      </div>

      {/* 4 stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <SkeletonBlock className="h-4 w-24 mb-2" />
              <SkeletonBlock className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>

      {/* Document list */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-36" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-8 w-8 rounded" />
                <div className="space-y-1">
                  <SkeletonBlock className="h-4 w-36" />
                  <SkeletonBlock className="h-3 w-24" />
                </div>
              </div>
              <SkeletonBlock className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
