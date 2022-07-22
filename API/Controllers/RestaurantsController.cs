using API.IRepository;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        private IRestaurant _RestaurantRepo;

        public RestaurantsController(IRestaurant RestaurantRepo)
        {
            _RestaurantRepo = RestaurantRepo;
        }
        // GET: api/<RestaurantsController>
        [Route("city/{cityId}")]
        [HttpGet]
        public async Task<IReadOnlyList<Restaurant>> GetRestaurantsByCityId(int cityId,string searchName)
        {
            if (cityId == 0 && string.IsNullOrEmpty(searchName))
            {
                return await _RestaurantRepo.GetRestaurantsAsync();
            }
            return await _RestaurantRepo.GetRestaurantByCityIdAsync(cityId,searchName);
        }
        [HttpGet]
        public async Task<IReadOnlyList<Restaurant>> GetRestaurants()
        {
            return await _RestaurantRepo.GetRestaurantsAsync();
        }

        // GET api/<RestaurantsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurant(int id)
        {
            Restaurant Restaurant = await _RestaurantRepo.GetRestaurantByIdAsync(id);
            if (Restaurant == null)
            {
                return NotFound();
            }
            return Restaurant;
        }

        [HttpPost]
        public async Task<ActionResult<Restaurant>> CreateRestaurant(Restaurant Restaurant)
        {
            try
            {
                if (Restaurant == null)
                {
                    return BadRequest();

                }


                var Created = await _RestaurantRepo.AddRestaurantAsync(Restaurant);


                return CreatedAtAction(nameof(GetRestaurant), new { id = Created.Id }, Created);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error From DB");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Restaurant>> UpdateRestaurant(int id, Restaurant Restaurant)
        {
            try
            {
                if (id != Restaurant.Id)
                {
                    return BadRequest("Restaurant Id Mismatch");

                }
                var RestaurantToUpdate = await _RestaurantRepo.GetRestaurantByIdAsync(id);
                if (RestaurantToUpdate == null)
                {
                    return NotFound($"Not Found Restaurant with id={id}");

                }
                return await _RestaurantRepo.UpdateRestaurant(Restaurant);
            }
            catch (Exception)
            {

                throw;
            }


        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Restaurant>> DeleteRestaurant(int id)
        {
            try
            {
                var RestaurantToDelete = await _RestaurantRepo.GetRestaurantByIdAsync(id);
                if (RestaurantToDelete == null)
                {
                    return NotFound($"Not Found REstaurant with id={id}");

                }
                return await _RestaurantRepo.DeleteRestaurant(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
