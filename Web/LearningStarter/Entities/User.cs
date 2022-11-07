using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace LearningStarter.Entities
{
    public class User
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }

        public int PhoneNumber { get; set; }

        public string Address { get; set; }

        public int ZipCode { get; set; }

        public int RewardPoints { get; set; }
    }

    public class UserCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }

        public int PhoneNumber { get; set; }

        public string Address { get; set; }

        public int ZipCode { get; set; }

    }

    public class UserUpdateDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }

        public int PhoneNumber { get; set; }

        public string Address { get; set; }

        public int ZipCode { get; set; }

        public int RewardPoints { get; set; }
    }

    public class UserGetDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        public int Role { get; set; }

        public int PhoneNumber { get; set; }

        public string Address { get; set; }

        public int ZipCode { get; set; }

        public int RewardPoints { get; set; }
    }
}