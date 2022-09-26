using API.Data;
using API.IRepository;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository
{
    public class RestaurantRepository : IRestaurant
    {
        private readonly AppDbContext _context;
        public RestaurantRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Restaurant> AddRestaurantAsync(Restaurant restaurant)
        {
            var result = await _context.Restaurants.AddAsync(restaurant);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Restaurant> DeleteRestaurant(int restaurantId)
        {
            var result = await _context.Restaurants.FirstOrDefaultAsync(e => e.Id == restaurantId);
            if (result != null)
            {
                _context.Restaurants.Remove(result);
                await _context.SaveChangesAsync();
            }
            return result;
        }

        public async Task<IReadOnlyList<Restaurant>> GetRestaurantByCityIdAsync(int cityId, string searchName)
        {
            if (cityId == 0)
            {
                return await _context.Restaurants.Where(a => a.Name.Contains(searchName)).ToListAsync();

            }

            if (string.IsNullOrEmpty(searchName) || string.IsNullOrEmpty(searchName))
            {
                return await _context.Restaurants.Where(a => a.CityId == cityId ).ToListAsync();

            }

            return await _context.Restaurants.Where(a => a.CityId == cityId && a.Name.Contains(searchName)).ToListAsync();



        }

        public async Task<Restaurant> GetRestaurantByIdAsync(int id)
        {
            return await _context.Restaurants.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Restaurant>> GetRestaurantsAsync()
        {
            return await _context.Restaurants.ToListAsync();
        }

        public async Task<Restaurant> UpdateRestaurant(Restaurant newrestaurant)
        {
            var result = await _context.Restaurants.FirstOrDefaultAsync(e => e.Id == newrestaurant.Id);

            result.Name = newrestaurant.Name;
            result.Description = newrestaurant.Description;
            await _context.SaveChangesAsync();
            return result;
        }
    }
}
