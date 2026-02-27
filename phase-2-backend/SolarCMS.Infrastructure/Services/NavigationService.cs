using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Navigation;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class NavigationService : INavigationService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public NavigationService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<NavigationItemDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.NavigationItems.AsQueryable();
        if (activeOnly) query = query.Where(n => n.IsActive);
        var items = await query.OrderBy(n => n.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<NavigationItemDto>>(items);
    }

    public async Task<NavigationItemDto?> GetByIdAsync(int id)
    {
        var n = await _db.NavigationItems.FindAsync(id);
        return n is null ? null : _mapper.Map<NavigationItemDto>(n);
    }

    public async Task<NavigationItemDto> CreateAsync(CreateNavigationItemDto dto)
    {
        var n = _mapper.Map<NavigationItem>(dto);
        n.CreatedAt = DateTime.UtcNow;
        n.UpdatedAt = DateTime.UtcNow;
        _db.NavigationItems.Add(n);
        await _db.SaveChangesAsync();
        return _mapper.Map<NavigationItemDto>(n);
    }

    public async Task<NavigationItemDto> UpdateAsync(int id, UpdateNavigationItemDto dto)
    {
        var n = await _db.NavigationItems.FindAsync(id)
            ?? throw new NotFoundException(nameof(NavigationItem), id);
        _mapper.Map(dto, n);
        n.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return _mapper.Map<NavigationItemDto>(n);
    }

    public async Task DeleteAsync(int id)
    {
        var n = await _db.NavigationItems.FindAsync(id)
            ?? throw new NotFoundException(nameof(NavigationItem), id);
        _db.NavigationItems.Remove(n);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var n = await _db.NavigationItems.FindAsync(orderedIds[i]);
            if (n != null) { n.DisplayOrder = i; n.UpdatedAt = DateTime.UtcNow; }
        }
        await _db.SaveChangesAsync();
    }
}
