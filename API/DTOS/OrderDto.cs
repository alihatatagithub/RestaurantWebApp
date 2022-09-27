using System.Collections.Generic;

namespace API.DTOS
{
    public class OrderDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public ICollection<ProductVM> ProductVM { get; set; }

        public OrderDto()
        {
            ProductVM = new HashSet<ProductVM>();
        }
    }

    public class ProductVM
    {
        public int ProductId { get; set; }
        public int ProductQty { get; set; }
    }

}
