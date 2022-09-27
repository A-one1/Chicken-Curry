namespace LearningStarter.Entities
{
    public class OrderItems
    {
        public int Id { get; set; }

        public Orders Orders { get; set; }

        public int OrderID { get; set; }
        
        public MenuItems MenuItems { get; set; }

        public int Item { get; set; }

        public int ItemAmount { get; set; }

    }

    public class OrderItemsGetDto
    {
        public int Id { get; set; }

        public int OrderID { get; set; }

        public int Item { get; set; }

        public int ItemAmount { get; set; }
    }

    public class OrderItemsCreateDto
    { 

        public int OrderID { get; set; }

        public int Item { get; set; }

        public int ItemAmount { get; set; }
    }

    public class OrderItemsUpdateDto
    {
        public int Id { get; set; }
        public int OrderID { get; set; }

        public int Item { get; set; }

        public int ItemAmount { get; set; }
    }
}
