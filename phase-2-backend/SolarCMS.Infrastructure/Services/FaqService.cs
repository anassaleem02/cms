using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Faqs;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class FaqService : IFaqService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public FaqService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<FaqDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.Faqs.AsQueryable();
        if (activeOnly) query = query.Where(f => f.IsActive);
        var items = await query.OrderBy(f => f.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<FaqDto>>(items);
    }

    public async Task<FaqDto?> GetByIdAsync(int id)
    {
        var item = await _db.Faqs.FindAsync(id);
        return item is null ? null : _mapper.Map<FaqDto>(item);
    }

    public async Task<FaqDto> CreateAsync(CreateFaqDto dto)
    {
        var item = _mapper.Map<Faq>(dto);
        _db.Faqs.Add(item);
        await _db.SaveChangesAsync();
        return _mapper.Map<FaqDto>(item);
    }

    public async Task<FaqDto> UpdateAsync(int id, UpdateFaqDto dto)
    {
        var item = await _db.Faqs.FindAsync(id)
            ?? throw new NotFoundException(nameof(Faq), id);
        _mapper.Map(dto, item);
        await _db.SaveChangesAsync();
        return _mapper.Map<FaqDto>(item);
    }

    public async Task DeleteAsync(int id)
    {
        var item = await _db.Faqs.FindAsync(id)
            ?? throw new NotFoundException(nameof(Faq), id);
        _db.Faqs.Remove(item);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var item = await _db.Faqs.FindAsync(orderedIds[i]);
            if (item != null) item.DisplayOrder = i;
        }
        await _db.SaveChangesAsync();
    }
}
