using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.IRepository
{
    public interface IProduct
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductByRestIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();
        Task<Product> AddProductAsync(Product product);
        Task<Product> UpdateProduct(Product product);
        Task<Product> DeleteProduct(int productId);

    }
}
