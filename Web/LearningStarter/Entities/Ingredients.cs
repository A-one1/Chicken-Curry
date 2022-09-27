using System.Diagnostics.Contracts;

namespace LearningStarter.Entities
{
    public class Ingredients
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Stock { get; set; }
    }

    public class IngredientsGetDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Stock { get; set; }
    }

    public class IngredientsCreateDto
    {
        public string Name { get; set; }

        public int Stock { get; set; }
    }

    public class IngredientsUpdateDto
    {
        public string Name { get; set; }

        public int Stock { get; set; }
    }
}