using API.Data;
using API.DTOS;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _Context;
        public OrdersController(AppDbContext Context)
        {
            _Context = Context;
        }
        [HttpPost]
        public IActionResult ConfirmOrder(OrderDto orderDto)
        {
            Customer customer = new Customer
            {
                Email = orderDto.Email,
                Address = orderDto.Address,
                Name = orderDto.Name,
                Phone = orderDto.Phone,
            };
             _Context.Customers.Add(customer);
            _Context.SaveChanges();
            Order order = new Order
            {
                CreatedDate = DateTime.Now,
                CreatedBy = orderDto.Name,
            };
             _Context.Orders.Add(order);
             _Context.SaveChanges();
            foreach (var item in orderDto.ProductIds)
            {


                OrderDetail orderDetail = new OrderDetail();
                orderDetail.ProductId = item;
                orderDetail.CreatedDate = DateTime.UtcNow;
                orderDetail.Qty = 1;
                orderDetail.CustomerId = customer.Id;
                orderDetail.OrderId = order.Id;
                _Context.OrderDetails.Add(orderDetail);
            }
             _Context.SaveChanges();
            return Ok();
        }
    }
}
