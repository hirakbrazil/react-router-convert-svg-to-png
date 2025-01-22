import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Share2 } from "lucide-react";

const HomepageContent = () => {
  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            How to Use This Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Enter Your Investment Details</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start by entering your total investment amount and select your preferred currency. This is the initial amount you plan to invest.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Set Your Withdrawal Plan</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose how much you want to withdraw periodically. You can set this either as a fixed amount or as a percentage of your total investment. The minimum withdrawal is 0.001% of your total investment.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">3. Adjust Return Rate & Time Period</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set your expected annual return rate and the time period for your investment. These factors will help determine how long your investment can sustain your withdrawal plan.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">4. Select Withdrawal Frequency</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose how often you want to make withdrawals: Monthly, Quarterly, Half-yearly, or Yearly. The calculator will adjust the calculations based on your selected frequency.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">5. Review Results</h3>
            <p className="text-gray-600 dark:text-gray-400">
              The calculator will show you the final investment value after your planned withdrawals, helping you understand if your withdrawal strategy is sustainable over your chosen time period.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Your Calculations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You can easily share your calculations with others using our sharing options:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-600 dark:text-gray-400 space-y-2">
              <li>Click the "Share" button to open sharing options</li>
              <li>Use the direct sharing feature if your device supports it</li>
              <li>Copy a link to the calculator</li>
              <li>Share your specific calculation settings with others</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageContent;
