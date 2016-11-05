using System;

namespace PlanEatSave.Utils
{
    public interface IPlanEatSaveLogger
    {
        void LogException(Exception ex, string message = "");
        void LogError(string message);
        void LogInfo(string message);
        void LogDebug(string message);
    }
}