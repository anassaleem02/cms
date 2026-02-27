using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Services;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceItemService _serviceItemService;
    public ServicesController(IServiceItemService serviceItemService) { _serviceItemService = serviceItemService; }

    [HttpGet]
    [ResponseCache(Duration = 60)]
    public async Task<IActionResult> GetAll([FromQuery] bool activeOnly = true)
        => Ok(await _serviceItemService.GetAllAsync(activeOnly));

    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var s = await _serviceItemService.GetByIdAsync(id);
        return s is null ? NotFound() : Ok(s);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateServiceDto dto)
    {
        var s = await _serviceItemService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = s.Id }, s);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateServiceDto dto)
        => Ok(await _serviceItemService.UpdateAsync(id, dto));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _serviceItemService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPut("reorder")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Reorder([FromBody] List<int> orderedIds)
    {
        await _serviceItemService.ReorderAsync(orderedIds);
        return NoContent();
    }
}
