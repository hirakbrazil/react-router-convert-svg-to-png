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
  Percent,
  Info,
  RefreshCw,
  MousePointerClick,
  Euro,
  JapaneseYen,
  PoundSterling,
  BadgeSwissFranc
} from 'lucide-react';
import { CurrencyType } from './CurrencySelector';
import { formatNumberByCurrency, getCurrencySymbol } from './slider/utils';
import { SIPFrequency } from '@/types/calculator';

interface HomepageContentProps {
  currency: CurrencyType;
  totalInvestment: number;
  monthlyInvestment: number;
  timePeriod: number;
  sipFrequency: SIPFrequency;
  totalValue: number;
  totalProfit: number;
}

const HomepageContent = ({ 
  currency, 
  totalInvestment,
  monthlyInvestment,
  timePeriod,
  sipFrequency,
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
      return `${currencySymbol}50 to ${currencySymbol}5 Crore`;
    }
    return `${currencySymbol}50 to ${currencySymbol}50 Million`;
  };

  const getTotalInvestment = () => {
    let investmentsPerYear;
    switch (sipFrequency) {
      case "Daily":
        investmentsPerYear = 365;
        break;
      case "Weekly":
        investmentsPerYear = 52;
        break;
      case "Quarterly":
        investmentsPerYear = 4;
        break;
      case "Half-yearly":
        investmentsPerYear = 2;
        break;
      case "Yearly":
        investmentsPerYear = 1;
        break;
      default:
        investmentsPerYear = 12;
    }
    return monthlyInvestment * investmentsPerYear * timePeriod;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            SIP Calculator Uses Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5" />
              Investment Frequency
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your SIP investment frequency (Daily, Weekly, Monthly, Quarterly, Half-yearly, or Yearly/Annually) and set the investment amount. The calculator supports flexible investment schedules to match your financial planning.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              {getCurrencyIcon(currency)}
              Investment Details
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your investment amount ({formatInvestmentRange(currency)}) and select from 11 supported currencies including INR, USD, EUR, JPY, GBP, CNY, AUD, CAD, CHF, HKD, and SGD.
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
              <PieChart className="h-5 w-5" />
              Advanced Features
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>The calculator includes advanced options for detailed investment planning:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Step-up SIP: Automatically increase investment amount periodically</li>
                <li>Initial Investment: Add lump sum amount at the start</li>
                <li>Inflation Adjustment: Account for the impact of inflation</li>
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
                <li>First SIP Date and Amount</li>
                <li>Last SIP Date and Amount</li>
                <li>Total Investment</li>
                <li>Total Profit (Amount and Percentage)</li>
                <li>Total Value (Invested amount plus return)</li>
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
                  <li>Compare total profit amount ({currencySymbol}{formatNumberByCurrency(totalProfit, currency)}) against total investment ({currencySymbol}{formatNumberByCurrency(getTotalInvestment(), currency)})</li>
                  <li>XIRR percentage: XIRR stands for Extended Internal Rate of Return, which represents the annualized return on your investment while accounting for the timing and size of cash flows.</li>
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
              <li>SIP Frequency: Monthly</li>
              <li>Monthly investment: {currencySymbol}{formatNumberByCurrency(5000, currency)}</li>
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
              <li>Returns are calculated using compound interest</li>
              <li>The calculator assumes consistent returns over the investment period</li>
              <li>Regular monitoring and rebalancing of your investment is recommended</li>
              <li>XIRR calculations provide annualized returns for better comparison</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageContent;
