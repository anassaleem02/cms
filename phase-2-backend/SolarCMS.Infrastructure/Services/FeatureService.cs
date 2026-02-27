using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Features;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class FeatureService : IFeatureService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public FeatureService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<FeatureDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.Features.AsQueryable();
        if (activeOnly) query = query.Where(f => f.IsActive);
        var features = await query.OrderBy(f => f.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<FeatureDto>>(features);
    }

    public async Task<FeatureDto?> GetByIdAsync(int id)
    {
        var feature = await _db.Features.FindAsync(id);
        return feature is null ? null : _mapper.Map<FeatureDto>(feature);
    }

    public async Task<FeatureDto> CreateAsync(CreateFeatureDto dto)
    {
        var feature = _mapper.Map<Feature>(dto);
        feature.CreatedAt = DateTime.UtcNow;
        feature.UpdatedAt = DateTime.UtcNow;
        _db.Features.Add(feature);
        await _db.SaveChangesAsync();
        return _mapper.Map<FeatureDto>(feature);
    }

    public async Task<FeatureDto> UpdateAsync(int id, UpdateFeatureDto dto)
    {
        var feature = await _db.Features.FindAsync(id)
            ?? throw new NotFoundException(nameof(Feature), id);
        _mapper.Map(dto, feature);
        feature.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return _mapper.Map<FeatureDto>(feature);
    }

    public async Task DeleteAsync(int id)
    {
        var feature = await _db.Features.FindAsync(id)
            ?? throw new NotFoundException(nameof(Feature), id);
        _db.Features.Remove(feature);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var f = await _db.Features.FindAsync(orderedIds[i]);
            if (f != null) { f.DisplayOrder = i; f.UpdatedAt = DateTime.UtcNow; }
        }
        await _db.SaveChangesAsync();
    }
}
