using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public float Total { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
