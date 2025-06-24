
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusColor, getButtonVariant, getButtonText } from "@/utils/statusUtils";

interface IncomingDataTableProps {
  data: any[];
  onStartHearingTest: (record: any) => void;
  isUpdating: boolean;
}

export const IncomingDataTable = ({ data, onStartHearingTest, isUpdating }: IncomingDataTableProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No records found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">
              {record.first_name || 'N/A'}
            </TableCell>
            <TableCell>
              {record.last_name || 'N/A'}
            </TableCell>
            <TableCell>
              {record.source || 'N/A'}
            </TableCell>
            <TableCell>
              <span className={getStatusColor(record.status || 'pending')}>
                {(record.status || 'pending').charAt(0).toUpperCase() + (record.status || 'pending').slice(1)}
              </span>
            </TableCell>
            <TableCell>
              {record.timestamp ? 
                new Date(record.timestamp).toLocaleString() : 'N/A'
              }
            </TableCell>
            <TableCell>
              {new Date(record.created_at).toLocaleString()}
            </TableCell>
            <TableCell>
              <Button 
                onClick={() => onStartHearingTest(record)}
                className={getButtonVariant(record.status || 'pending')}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : getButtonText(record.status || 'pending')}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
