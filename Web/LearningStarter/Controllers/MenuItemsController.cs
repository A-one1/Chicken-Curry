using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/menuitems")]
    public class MenuItemsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public MenuItemsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();

            var menuItems = _dataContext
                .MenuItems
                .Select(MenuItems => new MenuItemsGetDto
                {
                    Id = MenuItems.Id,
                    Name = MenuItems.Name,
                    Price = MenuItems.Price,
                    Description = MenuItems.Description

                })
                .ToList();
            response.Data = menuItems;
            return Ok(response);

        }

        [HttpPost]
        public IActionResult Create([FromBody] MenuItemsCreateDto MenuItemsCreateDto)
        {
            var response = new Response();

            var menuItemsToAdd = new MenuItems
            {
                Name = MenuItemsCreateDto.Name,
                Price = MenuItemsCreateDto.Price,
                Description = MenuItemsCreateDto.Description,
            };

            _dataContext.MenuItems.Add(menuItemsToAdd);
            _dataContext.SaveChanges();

            var menuItemsToReturn = new MenuItemsGetDto
            {
                Id = menuItemsToAdd.Id,
                Name = menuItemsToAdd.Name,
                Price = menuItemsToAdd.Price,
                Description = menuItemsToAdd.Description,
            };

            response.Data = menuItemsToReturn;
            return Created("", response);

        }

        [HttpPut("{id}")]

        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] MenuItemsUpdateDto menuItemsUpdateDto)
        {
            var response = new Response();

            var menuItemsToUpdate = _dataContext
                .MenuItems
                .FirstOrDefault(x => x.Id == id);
            {
                if (menuItemsToUpdate == null)
                {
                    response.AddError("id", "Item not found");
                    return BadRequest(response);
                }

                menuItemsToUpdate.Name = menuItemsUpdateDto.Name;
                menuItemsToUpdate.Price = menuItemsUpdateDto.Price;
                menuItemsToUpdate.Description = menuItemsUpdateDto.Description;
                _dataContext.SaveChanges();

                var menuItemsToReturn = new MenuItemsGetDto
                {
                    Id = menuItemsToUpdate.Id,
                    Name = menuItemsToUpdate.Name,
                    Price = menuItemsToUpdate.Price,
                    Description = menuItemsToUpdate.Description,
                };

                response.Data = menuItemsToReturn;
                return Ok(response);
            }

        }
    }
}
