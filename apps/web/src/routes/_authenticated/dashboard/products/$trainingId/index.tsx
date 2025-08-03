import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { AlertTriangle } from 'lucide-react';

import { StateDisplay } from '@/components/shared/state-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RowInfo } from '@/features/products/rowInfo';
import { getTrainingDetails } from '@/features/products/service';

export const Route = createFileRoute('/_authenticated/dashboard/products/$trainingId/')({
  component: TrainingDetailsPage,
});

function TrainingDetailsPage() {
  const { trainingId } = useParams({ from: Route.id });
  const {
    data: details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['trainingDetails', trainingId],
    queryFn: () => getTrainingDetails(trainingId),
    enabled: !!trainingId,
  });

  if (isError || !details) {
    return (
      <StateDisplay
        icon={AlertTriangle}
        title="Failed to load details"
        description="An error occurred while fetching the details for this week. Please try again later."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 pl-6">Industrial Assigned Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-6 space-y-8">
          <div className="border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Main Information</h2>
            <RowInfo label="Level" value={details.classLevel} />
            <RowInfo label="Trade" value={details.trade} />
            <RowInfo label="Training Timeline" value={`${details.startDate} - ${details.endDate}`} />
            <RowInfo label="Training Status" value={details.status} isStatus={true} variant={'success'} />
          </div>

          <div className="border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Industrial Training Information</h2>
            <RowInfo label="Industrial Name" value={details.industryName} />
            <RowInfo label="Province & District" value={details.industryLocation} />
            <RowInfo label="Locations" value={details.location} />
            <RowInfo label="Contact" value={details.contact} />
            <RowInfo label="Competences" value={details.competences} />
          </div>

          <div className="border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Accommodation Provider</h2>
            <RowInfo label="Accommodation Name" value={details.accommodationName} />
            <RowInfo label="Province & District" value={details.accommodationProvince} />
            <RowInfo label="Locations" value={details.accommodationLocation} />
            <RowInfo label="Contact" value={details.accommodationContact} />
            <RowInfo label="Services" value={details.accommodationServices} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
