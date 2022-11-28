using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public OrdersController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();

            var orders = _dataContext
                .Orders
                .Select(Orders => new OrdersGetDto
                {
                    Id = Orders.Id,
                    Date = Orders.Date,
                    Customer = Orders.Customer,
                    TipAmount = Orders.TipAmount,
                    Total = Orders.Total,
                    Status = Orders.Status,
                    Type = Orders.Type,
                    CustomerComments = Orders.CustomerComments,
                    AssignedDeliveryDriver = Orders.AssignedDeliveryDriver,

                })
                .ToList();
            response.Data = orders;
            return Ok(response);

        }

        [HttpPost]
        public IActionResult Create([FromBody] OrdersCreateDto ordersCreateDto)
        {
            var response = new Response();

            var ordersToAdd = new Orders
            {
                Date = DateTimeOffset.UtcNow,
                Customer = ordersCreateDto.Customer,
                TipAmount = ordersCreateDto.TipAmount,
                Total = ordersCreateDto.Total,
                Status = ordersCreateDto.Status,
                Type = ordersCreateDto.Type,
                CustomerComments = ordersCreateDto.CustomerComments,

            };

            _dataContext.Orders.Add(ordersToAdd);
            _dataContext.SaveChanges();

            var ordersToReturn = new OrdersGetDto
            {
                Id = ordersToAdd.Id,
                Date = ordersToAdd.Date,
                Customer = ordersToAdd.Customer,
                TipAmount = ordersToAdd.TipAmount,
                Total = ordersToAdd.Total,
                Status = ordersToAdd.Status,
                Type = ordersToAdd.Type,
                CustomerComments = ordersToAdd.CustomerComments,

            };

            response.Data = ordersToReturn;
            return Created("", response);

        }



        [HttpPut("{id}")]

        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] OrdersUpdateDto ordersUpdateDto)
        {
            var response = new Response();

            var ordersToUpdate = _dataContext
                .Orders
                .FirstOrDefault(x => x.Id == id);
            {
                if (ordersToUpdate == null)
                {
                    response.AddError("id", "Order not found");
                    return BadRequest(response);
                }

                ordersToUpdate.Customer = ordersUpdateDto.Customer;
                ordersToUpdate.TipAmount = ordersUpdateDto.TipAmount;
                ordersToUpdate.Status = ordersUpdateDto.Status;
                ordersToUpdate.Type = ordersUpdateDto.Type;
                ordersToUpdate.CustomerComments = ordersUpdateDto.CustomerComments;
                ordersToUpdate.Total = ordersUpdateDto.Total;
                ordersToUpdate.AssignedDeliveryDriver = ordersUpdateDto.AssignedDeliveryDriver;
                _dataContext.SaveChanges();

                var orderToReturn = new OrdersGetDto
                {
                    Id = ordersToUpdate.Id,
                    Customer = ordersToUpdate.Customer,
                    TipAmount = ordersToUpdate.TipAmount,
                    Status = ordersToUpdate.Status,
                    Type = ordersToUpdate.Type,
                    CustomerComments = ordersToUpdate.CustomerComments,
                    Total = ordersToUpdate.Total,
                    AssignedDeliveryDriver = ordersToUpdate.AssignedDeliveryDriver,
                };

                response.Data = orderToReturn;
                return Ok(response);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var response = new Response();

            var order = _dataContext.Orders.FirstOrDefault(x => x.Id == id);

            if (order == null)
            {
                response.AddError("id", "There was a problem deleting the order.");
                return NotFound(response);
            }

            _dataContext.Orders.Remove(order);
            _dataContext.SaveChanges();

            var response2 = new Response();

            var orderItems = _dataContext.OrderItems.Where(x => x.OrderId == id).ToList();

            if (orderItems == null)
            {
                response.AddError("id", "There was a problem deleting the items associated with this order.");
                return NotFound(response);
            }
            int x = 0;
            while (x < orderItems.Count)
            {
                _dataContext.OrderItems.Remove(orderItems[x]);
                _dataContext.SaveChanges();
                x++;
            }

            return Ok(response);
        }

    }
}
