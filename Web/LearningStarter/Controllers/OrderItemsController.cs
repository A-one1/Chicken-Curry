using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/orderitems")]
    public class OrderItemsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public OrderItemsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();

            var orderItems = _dataContext
                .OrderItems
                .Select(OrderItems => new OrderItemsGetDto
                {
                    Id = OrderItems.Id,
                    OrderId = OrderItems.OrderId,
                    Item = OrderItems.Item,
                    ItemAmount = OrderItems.ItemAmount,

                })
                .ToList();
            response.Data = orderItems;
            return Ok(response);

        }

        [HttpGet("{orderid}")]

        public IActionResult GetByOrderId(
            [FromRoute] int orderid)
        {
            var response = new Response();

            var orderItems = _dataContext
                .OrderItems
                .Select(OrderItems => new OrderItemsGetDto
                {
                    Id = OrderItems.Id,
                    OrderId = OrderItems.OrderId,
                    Item = OrderItems.Id,
                    ItemAmount = OrderItems.ItemAmount,

                })
                .ToList();

            if (orderItems == null)
            {
                response.AddError("orderItems", "There was a problem");
            }
            int[] removeitems = new int[orderItems.Count]; 
            for (int i = 0; i < orderItems.Count; i++ )
            {
                var item = orderItems[i];
                if (item.OrderId != orderid) { removeitems[i] = i; }
            }
            int count = 0;
            foreach (int x in removeitems)
            {
                if (x != 0) { orderItems.RemoveAt(x - count); count++;  }
            }
            /*
            foreach (var item in orderItems)
            {
                if (item.OrderId != orderid)
                {
                    
                }
            }
            */
            response.Data = orderItems;
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] OrderItemsCreateDto orderItemsCreateDto)
        {
            var response = new Response();

            var orderItemsToAdd = new OrderItems
            {
                OrderId = orderItemsCreateDto.OrderId,
                Item = orderItemsCreateDto.Item,
                ItemAmount = orderItemsCreateDto.ItemAmount,
            };

            _dataContext.OrderItems.Add(orderItemsToAdd);
            _dataContext.SaveChanges();

            var orderItemsToReturn = new OrderItemsGetDto
            {
                Id = orderItemsToAdd.Id,
                OrderId = orderItemsToAdd.OrderId,
                Item = orderItemsToAdd.Item,
                ItemAmount = orderItemsToAdd.ItemAmount,

            };

            response.Data = orderItemsToReturn;
            return Created("", response);

        }

        [HttpPut("{id}")]

        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] OrderItemsUpdateDto orderItemsUpdateDto)
        {
            var response = new Response();

            var orderItemsToUpdate = _dataContext
                .OrderItems
                .FirstOrDefault(x => x.Id == id);
            {
                if (orderItemsToUpdate == null)
                {
                    response.AddError("id", "Order not found");
                    return BadRequest(response);
                }

                orderItemsToUpdate.Item = orderItemsUpdateDto.Item;
                orderItemsToUpdate.ItemAmount = orderItemsUpdateDto.ItemAmount;
                _dataContext.SaveChanges();

                var orderItemsToReturn = new OrderItemsGetDto
                {
                    Id = orderItemsToUpdate.Id,
                    OrderId = orderItemsToUpdate.OrderId,
                    Item = orderItemsUpdateDto.Item,
                    ItemAmount = orderItemsUpdateDto.ItemAmount,
                };

                response.Data = orderItemsToReturn;
                return Ok(response);
            }

        }
    }
}
