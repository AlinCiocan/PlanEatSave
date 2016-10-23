using System;
using System.IO;

namespace FoodPlan.Utils
{
    public class FoodPlanLogger : IFoodPlanLogger
    {
        public static readonly string LogFilePath;
        static  FoodPlanLogger() 
        {
            LogFilePath = Path.Combine("Log", "log.txt");
        }

        public void LogDebug(string message)
        {
            throw new NotImplementedException();
        }

        public void LogError(string message)
        {
            throw new NotImplementedException();
        }

        public void LogException(Exception ex, string message = "")
        {
            // TODO: to be implemented with something more serios
            Log($"{GetTimeStamp()} - Message: {message}; exception: {ex.GetType()}; exception message: {ex.Message}; stacktrace: {Environment.NewLine} {ex.StackTrace}{Environment.NewLine}");
        }

        public void LogInfo(string message)
        {
            throw new NotImplementedException();
        }

        private void Log(string content)
        {
            File.AppendAllText(LogFilePath, content);
        }

        private string GetTimeStamp()
        {
            return $"{DateTime.UtcNow.ToString("s")}Z";
        }
    }
}