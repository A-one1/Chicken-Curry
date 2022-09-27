using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LearningStarter.Controllers
{

    [ApiController]
    [Route("api/ingredients")]
    public class IngredientsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public IngredientsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();

            var ingredients = _dataContext
                .Ingredients
                .Select(Ingredient => new IngredientsGetDto
                {
                    Id = Ingredient.Id,
                    Stock = Ingredient.Stock,
                    Name = Ingredient.Name,
                })
                .ToList();

            response.Data = ingredients;
            return Ok(response);

        }

        [HttpPost]
        public IActionResult Create([FromBody] IngredientsCreateDto ingredientsCreateDto)
        {
            var response = new Response();

            var ingredientsToAdd = new Ingredients
            {
                Name = ingredientsCreateDto.Name,
                Stock = ingredientsCreateDto.Stock,
            };

            _dataContext.Ingredients.Add(ingredientsToAdd);
            _dataContext.SaveChanges();

            var ingredientsToReturn = new IngredientsGetDto
            {
                Id = ingredientsToAdd.Id,
                Name = ingredientsToAdd.Name,
                Stock = ingredientsToAdd.Stock,
            };

            response.Data = ingredientsToReturn;
            return Created("", response);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] IngredientsUpdateDto ingredientsUpdateDto)
        {
            var response = new Response();

            var ingredientToUpdate = _dataContext
                .Ingredients
                .FirstOrDefault(x => x.Id == id);
            {
                if (ingredientToUpdate == null)
                {
                    response.AddError("id", "Ingredient not found");
                    return BadRequest(response);
                }

                ingredientToUpdate.Name = ingredientsUpdateDto.Name;
                ingredientToUpdate.Stock = ingredientsUpdateDto.Stock;
                _dataContext.SaveChanges();

                var ingredientToReturn = new IngredientsGetDto
                {
                    Id = ingredientToUpdate.Id,
                    Name = ingredientToUpdate.Name,
                    Stock = ingredientToUpdate.Stock
                };

                response.Data = ingredientToReturn;
                return Ok(response);
            }
        }
    }
}