using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Hero;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroController : ControllerBase
{
    private readonly IHeroService _heroService;
    public HeroController(IHeroService heroService) { _heroService = heroService; }

    /// <summary>Get active hero section</summary>
    [HttpGet("active")]
    [ResponseCache(Duration = 60)]
    public async Task<IActionResult> GetActive()
    {
        var hero = await _heroService.GetActiveAsync();
        return hero is null ? NotFound() : Ok(hero);
    }

    /// <summary>Get hero by ID (Admin)</summary>
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetById(int id)
    {
        var hero = await _heroService.GetByIdAsync(id);
        return hero is null ? NotFound() : Ok(hero);
    }

    /// <summary>Create hero section (Admin)</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateHeroDto dto)
    {
        var hero = await _heroService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = hero.Id }, hero);
    }

    /// <summary>Update hero section (Admin)</summary>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateHeroDto dto)
    {
        var hero = await _heroService.UpdateAsync(id, dto);
        return Ok(hero);
    }

    /// <summary>Delete hero section (Admin)</summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _heroService.DeleteAsync(id);
        return NoContent();
    }
}
