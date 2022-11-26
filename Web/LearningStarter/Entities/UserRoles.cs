namespace LearningStarter.Entities
{
    public class UserRoles
    {
       public int Id { get; set; }

       public int RoleId { get; set; }

       public Roles Roles { get; set; }

       public int UserId { get; set; }
    }

    public class UserRolesCreateDto
    {
        public int UserId { get; set; }

        public int RoleId { get; set; }
    }

    public class UserRolesGetDto
    {
       public int Id { get; set; }
    
       public int RoleId { get; set; }

       public int UserId { get; set; }
    }

    public class UserRolesUpdateDto
    {
       public int RoleId { get; set; }
    }
}
