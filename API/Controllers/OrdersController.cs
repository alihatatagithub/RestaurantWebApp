using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

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
        public ActionResult ConfirmOrder(int[] a,string name,string email,string phone,string address)
        {
            Customer customer = new Customer
            {
                Email = email,
                Address = address,
                Name = name,
                Phone = phone,
            };
            _Context.Customers.Add(customer);

            Order order = new Order
            {
                CreatedDate = DateTime.UtcNow,
                CreatedBy = customer.Name,
            };
            _Context.Orders.Add(order);
            _Context.SaveChanges();
            for (int i = 0; i < a.Length; i++)
            {
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.ProductId = a[i];
                orderDetail.CreatedDate = DateTime.UtcNow;
                orderDetail.Qty = 1;
                orderDetail.CustomerId = customer.Id;
                orderDetail.OrderId = order.Id;
                _Context.OrderDetails.Add(orderDetail);
            }
            _Context.SaveChanges();
            return Ok(order);
        }
    }
}
