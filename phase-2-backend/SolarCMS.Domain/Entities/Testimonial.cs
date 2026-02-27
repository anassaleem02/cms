using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class Testimonial : BaseEntity
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerTitle { get; set; } = string.Empty;
    public string CustomerImageUrl { get; set; } = string.Empty;
    public string Review { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
}
