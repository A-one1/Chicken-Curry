using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LearningStarter.Controllers
{

    [ApiController]
    [Route("api/UserRolesController")]
    public class UserRolesController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public UserRolesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();

            var userRoles = _dataContext
                .UserRoles
                .Select(UserRoles => new UserRolesGetDto
                {
                    Id = UserRoles.Id,
                    RoleId = UserRoles.RoleId,
                    UserId = UserRoles.UserId,
                })
                .ToList();

            response.Data = userRoles;
            return Ok(response);

        }

        [HttpPost]
        public IActionResult Create([FromBody] UserRolesCreateDto userRolesCreateDto)
        {
            var response = new Response();

            var userRolesToAdd = new UserRoles
            {
                UserId = userRolesCreateDto.UserId,
                RoleId = userRolesCreateDto.RoleId,
            };

            _dataContext.UserRoles.Add(userRolesToAdd);
            _dataContext.SaveChanges();

            var userRolesToReturn = new UserRolesGetDto
            {
                Id = userRolesToAdd.Id,
                RoleId = userRolesToAdd.RoleId,
                UserId = userRolesCreateDto.UserId,
                
            };

            response.Data = userRolesToReturn;
            return Created("", response);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] UserRolesUpdateDto userRolesUpdateDto)
        {
            var response = new Response();

            var userRolesToUpdate = _dataContext
                .UserRoles
                .FirstOrDefault(x => x.UserId == id);
            {
                if (userRolesToUpdate == null)
                {
                    response.AddError("id", "Ingredient not found");
                    return BadRequest(response);
                }

                userRolesToUpdate.RoleId = userRolesUpdateDto.RoleId;
                _dataContext.SaveChanges();

                var userRolesToReturn = new UserRolesGetDto
                {
                    Id = userRolesToUpdate.Id,
                    UserId = userRolesToUpdate.UserId,
                    RoleId = userRolesUpdateDto.RoleId,
                };

                response.Data = userRolesToReturn;
                return Ok(response);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = new Response();

            var userRole = _dataContext.UserRoles.FirstOrDefault(x => x.Id == id);

            if (userRole == null)
            {
                response.AddError("id", "There was a problem deleting the user.");
                return NotFound(response);
            }

            _dataContext.UserRoles.Remove(userRole);
            _dataContext.SaveChanges();

            return Ok(response);
        }
    }
}
