using API.Models;
using System.Collections.Generic;
using System;

namespace API.DTOS
{
    public class GetOrderByIdDto
    {
        public int Id { get; set; }
        public float Total { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
