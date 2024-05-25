﻿using System.ComponentModel.DataAnnotations;

namespace Event_Planning_System.DTO
{
    public class LoginDto
    {


        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
