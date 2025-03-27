import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ShoppingCart, Utensils } from 'lucide-react'; // Example icons

const OverspendingAlerts = () => {
  // Placeholder alerts
  const alerts = [
    { id: 1, category: 'Dining', message: 'You spent $150 over your Dining budget this month.', icon: Utensils, variant: "destructive" },
    { id: 2, category: 'Shopping', message: 'Spending in Shopping is 25% higher than usual.', icon: ShoppingCart, variant: "default" },
    { id: 3, category: 'Entertainment', message: 'You are approaching your Entertainment budget limit.', icon: AlertCircle, variant: "default" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Overspending Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <Alert key={alert.id} variant={alert.variant as "default" | "destructive" | null | undefined}>
              <alert.icon className="h-4 w-4" />
              <AlertTitle>{alert.category} Alert</AlertTitle>
              <AlertDescription>
                {alert.message}
              </AlertDescription>
            </Alert>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No overspending alerts currently.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default OverspendingAlerts;
