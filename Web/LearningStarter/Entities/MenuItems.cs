﻿using System.Collections.Generic;

namespace LearningStarter.Entities
{
    public class MenuItems
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Description { get; set; }

        public List<Ingredients> Ingredients { get; set; }

        public string PictureUrl { get; set; }

    }

    public class MenuItemsGetDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string Description { get; set; }

        public List<Ingredients> Ingredients { get; set; }

        public string PictureUrl { get; set; }

    }

    public class MenuItemsCreateDto
    {
        public string Name { get; set; }

        public float Price { get; set; }

        public string Description { get; set; }

        public string PictureUrl { get; set; }
    }

    public class MenuItemsUpdateDto
    {
        public string Name { get; set; }

        public float Price { get; set; }

        public string Description { get; set; }

        public string PictureUrl { get; set; }
    }
}
