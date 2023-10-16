using Microsoft.EntityFrameworkCore;

namespace FreelancerContact_BackendAPI.Models
{
    public class FreelancersContext : DbContext
    {
        public FreelancersContext(DbContextOptions<FreelancersContext> options) : base(options)
        {
            
        }

        public DbSet<Freelancer> Freelancers { get; set; } //this is the table name that stores freelancer contact details
    }
}
