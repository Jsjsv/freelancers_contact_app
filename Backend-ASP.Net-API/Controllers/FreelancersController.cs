using FreelancerContact_BackendAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata;

namespace FreelancerContact_BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreelancersController : ControllerBase
    {
        private readonly FreelancersContext _freelancersContext;
        //private readonly IConfiguration _configuration;
        public FreelancersController(FreelancersContext freelancersContext)
        {
            //_configuration = configuration;
            _freelancersContext = freelancersContext;
        }

        //Get all contacts
        //route /api/Freelancers/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Freelancer>>> GetAllFreelancers()
        {
            //check if data table exist
            if(_freelancersContext.Freelancers == null)
            {
                return NotFound();
            }
            return await _freelancersContext.Freelancers.ToListAsync();
        }

        //Get particular contact
        //route /api/Freelancers/:id/
        [HttpGet("{id}")]
        public async Task<ActionResult<Freelancer>> GetFreelancer(int id)
        {
            //check if data table exist
            if (_freelancersContext.Freelancers == null)
            {
                return NotFound();
            }
            var freelancer = await _freelancersContext.Freelancers.FindAsync(id);
            if (freelancer == null)
            {
                return NotFound();
            }
            return freelancer;
        }

        //Add new contact
        //route /api/Freelancers/
        [HttpPost]
        public async Task<ActionResult<Freelancer>> AddFreelancer(Freelancer freelancer)
        {
            _freelancersContext.Freelancers.Add(freelancer);
            await _freelancersContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFreelancer), new { id=freelancer.Id }, freelancer);
        }

        //Edit contact
        //route /api/Freelancers/:id/
        [HttpPut("{id}")]
        public async Task<IActionResult> EditFreelancer(int id, Freelancer freelancer)
        {
            if(id != freelancer.Id)
            {
                return BadRequest();
            }
            _freelancersContext.Entry(freelancer).State = EntityState.Modified;

            try
            {
                await _freelancersContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }

        //Delete contact
        //route /api/Freelancers/:id/
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            //check if data table exist
            if (_freelancersContext.Freelancers == null)
            {
                return NotFound();
            }

            var freelancer = await _freelancersContext.Freelancers.FindAsync(id);
            if (freelancer == null)
            {
                return NotFound();
            }

            _freelancersContext.Freelancers.Remove(freelancer);
            await _freelancersContext.SaveChangesAsync();
            return Ok();
        }
        private bool BrandAvailable(int id)
        {
            return(_freelancersContext.Freelancers?.Any(x => x.Id == id)).GetValueOrDefault();
        }
    }
}
