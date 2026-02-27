using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class HeroStat : BaseEntity
{
    public int HeroSectionId { get; set; }
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }

    public HeroSection HeroSection { get; set; } = null!;
}
