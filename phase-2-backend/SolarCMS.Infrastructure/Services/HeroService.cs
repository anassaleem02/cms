using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Hero;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class HeroService : IHeroService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public HeroService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<HeroDto?> GetActiveAsync()
    {
        var hero = await _db.HeroSections
            .Include(h => h.Stats)
            .FirstOrDefaultAsync(h => h.IsActive);
        return hero is null ? null : _mapper.Map<HeroDto>(hero);
    }

    public async Task<HeroDto?> GetByIdAsync(int id)
    {
        var hero = await _db.HeroSections.Include(h => h.Stats).FirstOrDefaultAsync(h => h.Id == id);
        return hero is null ? null : _mapper.Map<HeroDto>(hero);
    }

    public async Task<HeroDto> CreateAsync(CreateHeroDto dto)
    {
        var hero = _mapper.Map<HeroSection>(dto);
        hero.CreatedAt = DateTime.UtcNow;
        hero.UpdatedAt = DateTime.UtcNow;

        foreach (var statDto in dto.Stats)
        {
            hero.Stats.Add(new HeroStat
            {
                Value = statDto.Value,
                Label = statDto.Label,
                DisplayOrder = statDto.DisplayOrder,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });
        }

        _db.HeroSections.Add(hero);
        await _db.SaveChangesAsync();
        return _mapper.Map<HeroDto>(hero);
    }

    public async Task<HeroDto> UpdateAsync(int id, UpdateHeroDto dto)
    {
        var hero = await _db.HeroSections.Include(h => h.Stats).FirstOrDefaultAsync(h => h.Id == id)
            ?? throw new NotFoundException(nameof(HeroSection), id);

        _mapper.Map(dto, hero);
        hero.UpdatedAt = DateTime.UtcNow;

        // Replace stats
        hero.Stats.Clear();
        foreach (var statDto in dto.Stats)
        {
            hero.Stats.Add(new HeroStat
            {
                Value = statDto.Value,
                Label = statDto.Label,
                DisplayOrder = statDto.DisplayOrder,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });
        }

        await _db.SaveChangesAsync();
        return _mapper.Map<HeroDto>(hero);
    }

    public async Task DeleteAsync(int id)
    {
        var hero = await _db.HeroSections.FindAsync(id)
            ?? throw new NotFoundException(nameof(HeroSection), id);
        _db.HeroSections.Remove(hero);
        await _db.SaveChangesAsync();
    }
}
