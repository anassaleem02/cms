namespace SolarCMS.Application.DTOs.Navigation;

public class NavigationItemDto
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public bool OpenInNewTab { get; set; }
}

public class CreateNavigationItemDto
{
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
    public bool OpenInNewTab { get; set; } = false;
}

public class UpdateNavigationItemDto : CreateNavigationItemDto { }
