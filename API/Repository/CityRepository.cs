using API.Data;
using API.IRepository;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repository
{
    public class CityRepository : ICity
    {
        private readonly AppDbContext _context;
        public CityRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<City> AddCityAsync(City city)
        {
            var result = await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<City> DeleteCity(int cityId)
        {
            var result = await _context.Cities.FirstOrDefaultAsync(e => e.Id == cityId);
            if (result != null)
            {
                _context.Cities.Remove(result);
                await _context.SaveChangesAsync();
            }
            return result;
        }

        public async Task<City> GetCityByIdAsync(int id)
        {
            return await _context.Cities.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<City>> GetCitiesAsync()
        {
            return await _context.Cities.ToListAsync();
        }

        public async Task<City> UpdateCity(City newCity)
        {
            var result = await _context.Cities.FirstOrDefaultAsync(e => e.Id == newCity.Id);

            result.Name = newCity.Name;
            await _context.SaveChangesAsync();
            return result;
        }

      
    }
}
