using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Features;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeaturesController : ControllerBase
{
    private readonly IFeatureService _featureService;
    public FeaturesController(IFeatureService featureService) { _featureService = featureService; }

    [HttpGet]
    [ResponseCache(Duration = 60)]
    public async Task<IActionResult> GetAll([FromQuery] bool activeOnly = true)
        => Ok(await _featureService.GetAllAsync(activeOnly));

    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var feature = await _featureService.GetByIdAsync(id);
        return feature is null ? NotFound() : Ok(feature);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateFeatureDto dto)
    {
        var feature = await _featureService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = feature.Id }, feature);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateFeatureDto dto)
        => Ok(await _featureService.UpdateAsync(id, dto));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _featureService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPut("reorder")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Reorder([FromBody] List<int> orderedIds)
    {
        await _featureService.ReorderAsync(orderedIds);
        return NoContent();
    }
}
