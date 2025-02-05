import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator,
  IndianRupee,
  Clock,
  Calendar,
  PieChart,
  Share2,
  TrendingUp,
  DollarSign,
  Info,
  RefreshCw,
  MousePointerClick,
  Euro,
  JapaneseYen,
  PoundSterling,
  BadgeSwissFranc,
  Settings
} from 'lucide-react';
import { CurrencyType } from './CurrencySelector';
import { formatNumberByCurrency, getCurrencySymbol } from './slider/utils';

interface HomepageContentProps {
  currency: CurrencyType;
  totalInvestment: number;
  timePeriod: number;
  totalValue: number;
  totalProfit: number;
}

const HomepageContent = ({ 
  currency, 
  totalInvestment,
  timePeriod,
  totalValue,
  totalProfit
}: HomepageContentProps) => {
  const currencySymbol = getCurrencySymbol(currency);
  
  const getCurrencyIcon = (currency: CurrencyType) => {
    switch(currency) {
      case 'INR':
        return <IndianRupee className="h-5 w-5" />;
      case 'EUR':
        return <Euro className="h-5 w-5" />;
      case 'CHF':
        return <BadgeSwissFranc className="h-5 w-5" />;
      case 'JPY':
      case 'CNY':
        return <JapaneseYen className="h-5 w-5" />;
      case 'GBP':
        return <PoundSterling className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const formatInvestmentRange = (currency: CurrencyType) => {
    if (currency === 'INR') {
      return `${currencySymbol}1,000 to ${currencySymbol}50 Crore`;
    }
    return `${currencySymbol}1,000 to ${currencySymbol}500 Million`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Lumpsum Calculator Uses Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              {getCurrencyIcon(currency)}
              Investment Details
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your one-time investment amount ({formatInvestmentRange(currency)}) and select from 11 supported currencies including INR, USD, EUR, JPY, GBP, CNY, AUD, CAD, CHF, HKD, and SGD.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5" />
              Return Rate Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set your expected annual return rate (1% to 50%) to calculate potential earnings. The calculator factors this into your investment growth analysis.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5" />
              Investment Timeline
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Define your investment horizon from 1 to 50 years. The calculator shows the end date of your investment period and helps plan long-term investment strategies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5" />
              Advanced Features
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>The calculator includes advanced options for detailed investment planning:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Inflation Adjustment: Account for the impact of inflation on your returns</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <PieChart className="h-5 w-5" />
              Results Breakdown
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>The calculator provides comprehensive results including:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Total Investment: Your initial investment amount</li>
                <li>Total Profit: Returns generated over the investment period</li>
                <li>Total Value: Final amount (Investment plus returns)</li>
              </ul>
            </div>
            <div className="space-y-2 text-gray-600 dark:text-gray-400 mt-6">
              <p>The interactive Donut Chart provides a visual comparison between:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Total Profit (displayed in high contrast green)</li>
                <li>Total Investment (displayed in low contrast green)</li>
              </ul>
          
              <div className="mt-4">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <MousePointerClick className="h-4 w-4" />
                  Interactive Features:
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Click on different sections of the chart to highlight specific values</li>
                  <li>Hover over chart segments to see detailed amounts</li>
                  <li>Compare total profit amount ({currencySymbol}{formatNumberByCurrency(totalProfit, currency)}) against total investment ({currencySymbol}{formatNumberByCurrency(totalInvestment, currency)})</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <RefreshCw className="h-5 w-5" />
              Reset Functionality
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use the Reset button to quickly restore all values to their defaults:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-400 space-y-1">
              <li>Total Investment: {currencySymbol}{formatNumberByCurrency(500000, currency)}</li>
              <li>Expected Return Rate: 13%</li>
              <li>Time Period: 10 Years</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Share2 className="h-5 w-5" />
              Sharing Options
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your calculations easily with the built-in sharing features:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-400 space-y-1">
              <li>Direct share via platform sharing</li>
              <li>Copy calculator link with all settings</li>
              <li>Share current calculation details</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Info className="h-5 w-5" />
              Important Notes
            </h3>
            <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400 space-y-1">
              <li>All calculations are indicative and based on your inputs</li>
              <li>Returns are calculated using compound interest formula</li>
              <li>The calculator assumes consistent returns over the investment period</li>
              <li>Regular monitoring of your investment is recommended</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageContent;
