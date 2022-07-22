using API.Data;
using API.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API
{
    public class RestaurantContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Cities.Any())
                {
                    //We Want to Seralize what inside Brands.json into=> ProductBrandObj
                    var citiesData = File.ReadAllText("./SeedData/cities.json");
                    var cities = JsonSerializer.Deserialize<List<City>>(citiesData);
                    foreach (var item in cities)
                    {
                        context.Cities.Add(item);

                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Restaurants.Any())
                {
                    //We Want to Seralize what inside Brands.json into=> ProductBrandObj
                    var restaurantsData = File.ReadAllText("./SeedData/restaurants.json");
                    var restaurants = JsonSerializer.Deserialize<List<Restaurant>>(restaurantsData);
                    foreach (var item in restaurants)
                    {
                        context.Restaurants.Add(item);

                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    //We Want to Seralize what inside Brands.json into=> ProductBrandObj
                    var productsData = File.ReadAllText("./SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        context.Products.Add(item);

                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<AppDbContext>();
                logger.LogError(ex.Message);
            }
        }
    }
}
