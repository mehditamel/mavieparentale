import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkeletonBlock } from "@/components/shared/skeleton-page";

export default function FiscalLoading() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <SkeletonBlock className="h-8 w-40" />
        <SkeletonBlock className="mt-2 h-4 w-72" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-32 rounded-md" />
        ))}
      </div>

      {/* Simulation form */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-36" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
          <SkeletonBlock className="mt-4 h-10 w-32 rounded-md" />
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-5 w-28" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-5 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
