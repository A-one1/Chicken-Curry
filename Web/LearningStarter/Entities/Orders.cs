using System;
using System.Collections.Generic;

namespace LearningStarter.Entities
{
    public class Orders
    {
        public int Id { get; set; }

        public DateTimeOffset Date { get; set; }

        public User User { get; set; }

        public int Customer { get; set; }

        public int TipAmount { get; set; }

        public int Status { get; set; } // being made, ready, out for delivery, completed, etc

        public int Type { get; set; } // delivery or pick up

        public string CustomerComments { get; set; }

        public int AssignedDeliveryDriver { get; set; }

        public List<OrderItems> OrderItems { get; set; } = new List<OrderItems>();  
    }

    public class OrdersGetDto
    {
        public int Id { get; set; }

        public DateTimeOffset Date { get; set; }

        public int Customer { get; set; }

        public int TipAmount { get; set; }

        public int Status { get; set; } // being made, ready, out for delivery, completed, etc

        public int Type { get; set; } // delivery or pick up

        public string CustomerComments { get; set; }

        public int AssignedDeliveryDriver { get; set; }

    }

    public class OrdersCreateDto
    { 

        public int Customer { get; set; }

        public int TipAmount { get; set; }

        public int Status { get; set; } // being made, ready, out for delivery, completed, etc

        public int Type { get; set; } // delivery or pick up

        public string CustomerComments { get; set; }

        public int AssignedDeliveryDriver { get; set; }
    }

    public class OrdersUpdateDto
    {
        public int Id { get; set; }


        public int Customer { get; set; }

        public int TipAmount { get; set; }

        public int Status { get; set; } // being made, ready, out for delivery, completed, etc

        public int Type { get; set; } // delivery or pick up

        public string CustomerComments { get; set; }

        public int AssignedDeliveryDriver { get; set; }
    }
}
