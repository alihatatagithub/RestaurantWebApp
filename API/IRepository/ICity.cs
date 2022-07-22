using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.IRepository
{
    public interface ICity
    {
        Task<City> GetCityByIdAsync(int id);
        Task<IReadOnlyList<City>> GetCitiesAsync();
        Task<City> AddCityAsync(City city);
        Task<City> UpdateCity(City city);
        Task<City> DeleteCity(int cityId);
    }
}
