import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function InfluencerTableSkeleton() {
  return (
    <div className="space-y-4 border rounded-md shadow-sm p-4 mt-4">
      {/* Search bar skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-64 h-10 rounded-md" /> {/* Search input */}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Profile</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Avg Rating</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(8)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="w-10 h-10 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-40 h-4 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-16 h-4 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-20 h-6 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-8 h-4 rounded-md inline-block" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
