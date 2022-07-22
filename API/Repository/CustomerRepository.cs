using API.Data;
using API.IRepository;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repository
{
    public class CustomerRepository : ICustomer
    {
        private readonly AppDbContext _context;
        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            return await _context.Customers.FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            return await _context.Customers.FirstOrDefaultAsync(p => p.Email == email);
        }

        public async Task<IReadOnlyList<Customer>> GetCustomersAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> AddCustomerAsync(Customer Customer)
        {

            var result = await _context.Customers.AddAsync(Customer);
            await _context.SaveChangesAsync();
            return result.Entity;

        }

        public async Task<Customer> UpdateCustomer(Customer newCustomer)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(e => e.Id == newCustomer.Id);

            result.Name = newCustomer.Name;
            result.Email = newCustomer.Phone;
            result.Address = newCustomer.Address;
            await _context.SaveChangesAsync();
            return result;

        }
        public async Task<Customer> DeleteCustomer(int CustomerId)
        {
            var result = await _context.Customers.FirstOrDefaultAsync(e => e.Id == CustomerId);
            if (result != null)
            {
                _context.Customers.Remove(result);
                await _context.SaveChangesAsync();
            }
            return result;

        }

        
    }

}
