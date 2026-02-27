using SolarCMS.Application.DTOs.Settings;

namespace SolarCMS.Application.Interfaces;

public interface ISiteSettingsService
{
    Task<SiteSettingsDto> GetAsync();
    Task<SiteSettingsDto> UpdateAsync(UpdateSiteSettingsDto dto);
}
