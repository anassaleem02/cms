using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class SiteSettings : BaseEntity
{
    public string SiteName { get; set; } = string.Empty;
    public string TagLine { get; set; } = string.Empty;
    public string LogoUrl { get; set; } = string.Empty;
    public string FaviconUrl { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? FacebookUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? YoutubeUrl { get; set; }
    public string? GoogleAnalyticsId { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string BusinessHours { get; set; } = string.Empty;
}
