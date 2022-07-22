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
    public class AccountController : ControllerBase
    {
        private ICustomer _CustomerRepo;

        public AccountController(ICustomer CustomerRepo)
        {
            _CustomerRepo = CustomerRepo;
        }
     
        // GET: api/<CustomersController>
        [HttpGet]
        public async Task<IReadOnlyList<Customer>> GetCustomers()
        {
            return await _CustomerRepo.GetCustomersAsync();
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            Customer Customer = await _CustomerRepo.GetCustomerByIdAsync(id);
            if (Customer == null)
            {
                return NotFound();
            }
            return Customer;
        }

        //[HttpGet("{email:string}")]
        //public async Task<ActionResult<Customer>> GetCustomerByEmail(string email)
        //{
        //    Customer Customer = await _CustomerRepo.GetCustomerByEmailAsync(email);
        //    if (Customer == null)
        //    {
        //        return NotFound();
        //    }
        //    return Customer;
        //}

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<Customer>> CreateCustomer(Customer Customer)
        {
            try
            {
                if (Customer == null)
                {
                    return BadRequest();

                }


                var Created = await _CustomerRepo.AddCustomerAsync(Customer);


                //return Created;
                return CreatedAtAction(nameof(GetCustomer), new { id = Created.Id }, Created);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error From DB");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Customer>> UpdateCustomer(int id, Customer Customer)
        {
            try
            {
                if (id != Customer.Id)
                {
                    return BadRequest("Customer Id Mismatch");

                }
                var CustomerToUpdate = await _CustomerRepo.GetCustomerByIdAsync(id);
                if (CustomerToUpdate == null)
                {
                    return NotFound($"Not Found Customer with id={id}");

                }
                return await _CustomerRepo.UpdateCustomer(Customer);
            }
            catch (Exception)
            {

                throw;
            }


        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            try
            {
                var CustomerToDelete = await _CustomerRepo.GetCustomerByIdAsync(id);
                if (CustomerToDelete == null)
                {
                    return NotFound($"Not Found Customer with id={id}");

                }
                return await _CustomerRepo.DeleteCustomer(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }

}
