using System;

namespace LearningStarter.Entities
{
    public class EmployeeData
    {
        public int Id { get; set; }
        public int ClockType { get; set; }
        public DateTimeOffset Date { get; set; }
    }

    public class EmployeeDataGetDTO
    {
        public int Id { get; set; }
        public int ClockType { get; set; }
        public DateTimeOffset Date { get; set; }
    }

    public class EmployeeDataCreateDTO
    {
        public int ClockType { get; set; }
        public DateTimeOffset Date { get; set; }
    }

    public class EmployeeDataUpdateDTO
    {
        public int Id { get; set; }
        public int ClockType { get; set; }
        public DateTimeOffset Date { get; set; }
    }
}