import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/skeleton';
import { InvestmentAlert } from '@/types/investments'; // Import relevant types
import { CalendarDays, BellRing, PlusCircle } from 'lucide-react'; // Example icons
import { Button } from '@/components/ui/button';

interface InvestmentCalendarProps {
  alerts?: InvestmentAlert[];
  isLoading: boolean;
}

// Mock Data (Replace with actual data fetching)
const mockAlerts: InvestmentAlert[] = [
  { id: 'alert-01', type: 'SIPReminder', target: 'Nifty 50 Index Fund SIP', dueDate: '2025-04-05', isActive: true },
  { id: 'alert-02', type: 'PriceAlert', target: 'Bitcoin (BTC)', condition: 'Reaches $75,000', isActive: true },
  { id: 'alert-03', type: 'TaxDeadline', target: 'ELSS Investment Proof Submission', dueDate: '2025-03-31', isActive: true },
];

const InvestmentCalendar: React.FC<InvestmentCalendarProps> = ({ 
  alerts = mockAlerts, 
  isLoading 
}) => {

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-xl text-deep-charcoal flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" /> Calendar & Alerts
        </h3>
        {/* TODO: Add button/modal to create new alerts */}
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-1" /> New Alert
        </Button>
      </div>
      
      {/* TODO: Implement UpcomingEventsList and AlertsManager sub-components */}
      <div className="space-y-3">
        {alerts && alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className="p-3 border border-subtle-gray/40 rounded-md bg-white/40 text-sm flex items-center justify-between">
              <div className="flex items-center">
                 <BellRing className="h-4 w-4 mr-2 text-soft-gold" />
                 <div>
                   <p className="font-medium">{alert.target}</p>
                   <p className="text-xs text-deep-charcoal/70">
                     {alert.type === 'SIPReminder' && `Next SIP due: ${alert.dueDate}`}
                     {alert.type === 'PriceAlert' && `Alert condition: ${alert.condition}`}
                     {alert.type === 'TaxDeadline' && `Deadline: ${alert.dueDate}`}
                   </p>
                 </div>
              </div>
              {/* TODO: Add actions like edit/delete alert */}
               <span className={`text-xs px-2 py-0.5 rounded ${alert.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                 {alert.isActive ? 'Active' : 'Inactive'}
               </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-deep-charcoal/70 text-center py-4">No upcoming events or active alerts.</p>
        )}
      </div>
    </GlassCard>
  );
};

export default InvestmentCalendar;
