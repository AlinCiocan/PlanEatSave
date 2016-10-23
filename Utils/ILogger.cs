using System;

namespace FoodPlan.Utils
{
    public interface IFoodPlanLogger
    {
        void LogException(Exception ex, string message = "");
        void LogError(string message);
        void LogInfo(string message);
        void LogDebug(string message);
    }
}