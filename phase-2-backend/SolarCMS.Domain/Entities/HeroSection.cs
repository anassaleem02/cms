using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class HeroSection : BaseEntity
{
    public string Headline { get; set; } = string.Empty;
    public string Subheadline { get; set; } = string.Empty;
    public string PrimaryButtonText { get; set; } = string.Empty;
    public string PrimaryButtonUrl { get; set; } = string.Empty;
    public string SecondaryButtonText { get; set; } = string.Empty;
    public string SecondaryButtonUrl { get; set; } = string.Empty;
    public string BackgroundImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<HeroStat> Stats { get; set; } = new List<HeroStat>();
}
