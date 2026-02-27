using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Settings;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ISiteSettingsService _settingsService;
    public SettingsController(ISiteSettingsService settingsService) { _settingsService = settingsService; }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _settingsService.GetAsync());

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update([FromBody] UpdateSiteSettingsDto dto)
        => Ok(await _settingsService.UpdateAsync(dto));
}
