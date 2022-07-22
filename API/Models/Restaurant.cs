using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Description { get; set; }
        [ForeignKey("City")]
        public int CityId { get; set; }
        public City City { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
