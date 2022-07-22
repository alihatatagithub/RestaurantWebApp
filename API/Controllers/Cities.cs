using API.IRepository;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Cities : ControllerBase
    {
        private readonly ICity _CityRepo;
        public Cities(ICity CityRepo)
        {
            _CityRepo = CityRepo;

        }
        // GET: api/<Cities>
        [HttpGet]
        public async Task<IReadOnlyList<City>> GetCities()
        {
            return await _CityRepo.GetCitiesAsync();
        }

        // GET api/<CitiesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            City City = await _CityRepo.GetCityByIdAsync(id);
            if (City == null)
            {
                return NotFound();
            }
            return City;
        }

        [HttpPost]
        public async Task<ActionResult<City>> CreateCity(City City)
        {
            try
            {
                if (City == null)
                {
                    return BadRequest();

                }


                var Created = await _CityRepo.AddCityAsync(City);


                return CreatedAtAction(nameof(GetCity), new { id = Created.Id }, Created);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error From DB");
            }
        }
    }
}
