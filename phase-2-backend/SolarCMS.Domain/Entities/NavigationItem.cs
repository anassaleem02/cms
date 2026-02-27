using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class NavigationItem : BaseEntity
{
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
    public bool OpenInNewTab { get; set; } = false;
}
