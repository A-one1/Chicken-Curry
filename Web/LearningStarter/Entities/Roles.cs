namespace LearningStarter.Entities
{
    public class Roles
    {
        int Id { get; set; }

        string RoleName { get; set; }

    }

    public class RolesGetDto
    {
        int Id { get; set; }

        string RoleName { set; get; }
    }

    public class RolesUpdateDto
    {
        string RoleName { get; set; }
    }
}
