using SolarCMS.Application.DTOs.Hero;

namespace SolarCMS.Application.Interfaces;

public interface IHeroService
{
    Task<HeroDto?> GetActiveAsync();
    Task<HeroDto?> GetByIdAsync(int id);
    Task<HeroDto> CreateAsync(CreateHeroDto dto);
    Task<HeroDto> UpdateAsync(int id, UpdateHeroDto dto);
    Task DeleteAsync(int id);
}
