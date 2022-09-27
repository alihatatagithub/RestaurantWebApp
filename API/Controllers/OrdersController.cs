using API.Data;
using API.DTOS;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
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

        [HttpGet]
        [Route("GetOrderByCustomerName/{CustomerName}")]
        public IActionResult GetOrderByCustomerName(string CustomerName)
        {
            var order = _Context.Orders.OrderByDescending(a => a.CreatedDate)
                .FirstOrDefault(c => c.CreatedBy == CustomerName);

            if (order == null)
            {
                return BadRequest("Yo Have Not Make Any Order");
            }

            var orderDto = new GetOrderByIdDto
            {
                CreatedBy = order.CreatedBy,
                CreatedDate = order.CreatedDate.ToString("MM-dd-yyyy"),
                Id = order.Id,
                Total = order.Total
            };
            return Ok(orderDto);
        }
        [HttpPost]
        public IActionResult ConfirmOrder(OrderDto orderDto)
        {
            float AllTotal = 0;
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
            foreach (var item in orderDto.ProductVM)
            {

                var product = _Context.Products.FirstOrDefault(a => a.Id == item.ProductId);
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.ProductId = item.ProductId;
                orderDetail.CreatedDate = DateTime.UtcNow;
                orderDetail.Qty = item.ProductQty;
                orderDetail.CustomerId = customer.Id;
                orderDetail.SubTotal = product.Price * item.ProductQty;
                AllTotal += orderDetail.SubTotal;
                orderDetail.OrderId = order.Id;
                _Context.OrderDetails.Add(orderDetail);
            }

            order.Total = AllTotal;
             _Context.SaveChanges();
            return Ok();
        }
    }
}
