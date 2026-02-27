using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Navigation;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NavigationController : ControllerBase
{
    private readonly INavigationService _navService;
    public NavigationController(INavigationService navService) { _navService = navService; }

    [HttpGet]
    [ResponseCache(Duration = 60)]
    public async Task<IActionResult> GetAll([FromQuery] bool activeOnly = true)
        => Ok(await _navService.GetAllAsync(activeOnly));

    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var n = await _navService.GetByIdAsync(id);
        return n is null ? NotFound() : Ok(n);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateNavigationItemDto dto)
    {
        var n = await _navService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = n.Id }, n);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateNavigationItemDto dto)
        => Ok(await _navService.UpdateAsync(id, dto));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _navService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPut("reorder")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Reorder([FromBody] List<int> orderedIds)
    {
        await _navService.ReorderAsync(orderedIds);
        return NoContent();
    }
}
