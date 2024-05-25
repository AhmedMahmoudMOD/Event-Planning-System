﻿using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO
{
    public class LoginDto
    {


        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
