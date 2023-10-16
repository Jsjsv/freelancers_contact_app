using Microsoft.AspNetCore.Authentication;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices;

namespace FreelancerContact_BackendAPI.Models
{
    public class Freelancer
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Mail { get; set; }
        public int Phone { get; set; }
        [AllowNull]
        public string Skillset { get; set; }
        [AllowNull]
        public string Hobby { get; set; }   

    }
}
