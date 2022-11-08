using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("{id}")]
        public IActionResult GetById(
           [FromRoute] int id)
        {
            var response = new Response();

            var menuItem = _dataContext.MenuItems.FirstOrDefault(x => x.Id == id);

            if (menuItem == null)
            {
                response.AddError("id", "There was a problem finding the menu item.");
                return NotFound(response);
            }

            var menuItemGetDto = new MenuItemsGetDto
            {
                Id = menuItem.Id,
                Name = menuItem.Name,
                Price = menuItem.Price,
                Description = menuItem.Description
            };

            response.Data = menuItemGetDto;

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
            
            if (menuItemsToAdd.Name == null || menuItemsToAdd.Name == "")
            {
                response.AddError("id", "Name not found");
                 // return BadRequest(response);
            }
            if (menuItemsToAdd.Description == null || menuItemsToAdd.Description == "")
            {
                response.AddError("id", "Description not found");
               // return BadRequest(response);
            }
            if (menuItemsToAdd.Price == 0)
            {
                response.AddError("id", "Price not found");
               // return BadRequest(response);
            }
            if (response.HasErrors){
                    return BadRequest(response);       
            }

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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = new Response();

            var menuItems = _dataContext.MenuItems.FirstOrDefault(x => x.Id == id);

            if (menuItems == null)
            {
                response.AddError("id", "There was a problem deleting the user.");
                return NotFound(response);
            }

            _dataContext.MenuItems.Remove(menuItems);
            _dataContext.SaveChanges();

            return Ok(response);
        }
    }
}
