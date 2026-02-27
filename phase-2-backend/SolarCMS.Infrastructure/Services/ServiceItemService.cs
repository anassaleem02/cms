using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Services;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class ServiceItemService : IServiceItemService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ServiceItemService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<ServiceDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.Services.AsQueryable();
        if (activeOnly) query = query.Where(s => s.IsActive);
        var items = await query.OrderBy(s => s.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<ServiceDto>>(items);
    }

    public async Task<ServiceDto?> GetByIdAsync(int id)
    {
        var s = await _db.Services.FindAsync(id);
        return s is null ? null : _mapper.Map<ServiceDto>(s);
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
    {
        var s = _mapper.Map<Domain.Entities.Service>(dto);
        s.CreatedAt = DateTime.UtcNow;
        s.UpdatedAt = DateTime.UtcNow;
        _db.Services.Add(s);
        await _db.SaveChangesAsync();
        return _mapper.Map<ServiceDto>(s);
    }

    public async Task<ServiceDto> UpdateAsync(int id, UpdateServiceDto dto)
    {
        var s = await _db.Services.FindAsync(id)
            ?? throw new NotFoundException(nameof(Domain.Entities.Service), id);
        _mapper.Map(dto, s);
        s.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return _mapper.Map<ServiceDto>(s);
    }

    public async Task DeleteAsync(int id)
    {
        var s = await _db.Services.FindAsync(id)
            ?? throw new NotFoundException(nameof(Domain.Entities.Service), id);
        _db.Services.Remove(s);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var s = await _db.Services.FindAsync(orderedIds[i]);
            if (s != null) { s.DisplayOrder = i; s.UpdatedAt = DateTime.UtcNow; }
        }
        await _db.SaveChangesAsync();
    }
}
