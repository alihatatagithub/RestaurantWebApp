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
    public class ProductsController : ControllerBase
    {
        private  IProduct _ProductRepo;

        public ProductsController(IProduct ProductRepo)
        {
            _ProductRepo = ProductRepo;
        }
        [Route("restaurant/{id}")]
        [HttpGet]
        
        public async Task<IReadOnlyList<Product>> GetProductsByResId(int id)
        {
           return await _ProductRepo.GetProductByRestIdAsync(id);
        }
        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<IReadOnlyList<Product>> GetProducts()
        {
           return await _ProductRepo.GetProductsAsync();
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Getproduct(int id)
        {
            Product product = await _ProductRepo.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest();

                }


                var Created = await _ProductRepo.AddProductAsync(product);


                return CreatedAtAction(nameof(Getproduct), new { id = Created.Id }, Created);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error From DB");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
        {
            try
            {
                if (id != product.Id)
                {
                    return BadRequest("Product Id Mismatch");

                }
                var ProductToUpdate = await _ProductRepo.GetProductByIdAsync(id);
                if (ProductToUpdate == null)
                {
                    return NotFound($"Not Found Product with id={id}");

                }
                return await _ProductRepo.UpdateProduct(product);
            }
            catch (Exception)
            {

                throw;
            }


        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            try
            {
                var ProductToDelete = await _ProductRepo.GetProductByIdAsync(id);
                if (ProductToDelete == null)
                {
                    return NotFound($"Not Found Product with id={id}");

                }
                return await _ProductRepo.DeleteProduct(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
