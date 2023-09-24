import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton className="h-14 w-full" />
      <div className="h-full w-full flex justify-center">
        <li className="list-none w-1/2">
          <ul className="pt-4 h-24">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((item) => (
              <Skeleton key={item} className="h-8 mb-4" />
            ))}
          </ul>
        </li>
      </div>
    </>
  );
}
