using System.Collections.Generic;

namespace API.DTOS
{
    public class OrderDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public List<int> ProductIds { get; set; }

        public OrderDto()
        {
            ProductIds = new List<int>();
        }
    }
}
