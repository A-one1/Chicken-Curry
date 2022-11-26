namespace LearningStarter.Entities
{
    public class Roles
    {
        public int Id { get; set; }

        public string RoleName { get; set; }

    }

    public class RolesGetDto
    {
        public int Id { get; set; }

        public string RoleName { set; get; }
    }

    public class RolesUpdateDto
    {
        public string RoleName { get; set; }
    }
}
