using API.Data;
using API.IRepository;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository
{
    public class ProductRepository : IProduct
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Product> GetProductByIdAsync(int id)
        {            
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> AddProductAsync(Product product)
        {

            var result = await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return result.Entity;

        }

        public async Task<Product> UpdateProduct(Product newProduct)
        {
            var result = await _context.Products.FirstOrDefaultAsync(e => e.Id == newProduct.Id);

            result.Name = newProduct.Name;
            result.Description = newProduct.Description;
            result.Price = newProduct.Price;
            await _context.SaveChangesAsync();
            return result;

        }
        public async Task<Product> DeleteProduct(int productId)
        {
            var result = await _context.Products.FirstOrDefaultAsync(e => e.Id == productId);
            if (result != null)
            {
                _context.Products.Remove(result);
                await _context.SaveChangesAsync();
            }
            return result;

        }

        public async Task<IReadOnlyList<Product>> GetProductByRestIdAsync(int id)
        {
           return await _context.Products.Where(a => a.RestaurantId == id).ToListAsync();
        }
    }
}
