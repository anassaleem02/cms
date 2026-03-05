using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class VideoReview : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string YoutubeUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
}
