using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderDetail
    {
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        //[ForeignKey("Supplier")]
        //public string SupplierId { get; set; }
        public DateTime CreatedDate { get; set; }
        [ForeignKey("Customer")]

        public int CustomerId { get; set; }

        public float SubTotal { get; set; }
        public int Qty { get; set; } = 1;
        public Product Product { get; set; }
        public Order Order { get; set; }
        //public Supplier Supplier { get; set; }
        public Customer Customer { get; set; }

    }
}
