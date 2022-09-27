namespace LearningStarter.Entities
{
    public class MenuItemIngredients
    {
        public int Id { get; set; }

        public MenuItems MenuItems { get; set; }

        public int MenuItemId { get; set; }

        public Ingredients Ingredients { get; set; }

        public int IngredientId { get; set; }
    }

    public class MenuItemIngredientsGetDto
    {
        public int Id { get; set; }

        public int MenuItemId { get; set; }

        public int IngredientId { get; set; }
    }

    public class MenuItemIngredientsCreateDto
    {
        public int MenuItemId { get; set; }

        public int IngredientId { get; set; }
    }

    public class MenuItemIngredientsUpdateDto
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }

        public int IngredientId { get; set; }
    }
}