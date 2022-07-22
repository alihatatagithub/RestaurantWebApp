using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.IRepository
{
    public interface IRestaurant
    {
        Task<Restaurant> GetRestaurantByIdAsync(int id);
        Task<IReadOnlyList<Restaurant>> GetRestaurantsAsync();
        Task<IReadOnlyList<Restaurant>> GetRestaurantByCityIdAsync(int cityId,string searchName);
        Task<Restaurant> AddRestaurantAsync(Restaurant restaurant);
        Task<Restaurant> UpdateRestaurant(Restaurant restaurant);
        Task<Restaurant> DeleteRestaurant(int restaurantId);
    }
}
