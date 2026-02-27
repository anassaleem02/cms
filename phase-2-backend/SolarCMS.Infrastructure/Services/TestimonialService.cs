using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Testimonials;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class TestimonialService : ITestimonialService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public TestimonialService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<TestimonialDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.Testimonials.AsQueryable();
        if (activeOnly) query = query.Where(t => t.IsActive);
        var items = await query.OrderBy(t => t.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<TestimonialDto>>(items);
    }

    public async Task<TestimonialDto?> GetByIdAsync(int id)
    {
        var t = await _db.Testimonials.FindAsync(id);
        return t is null ? null : _mapper.Map<TestimonialDto>(t);
    }

    public async Task<TestimonialDto> CreateAsync(CreateTestimonialDto dto)
    {
        var t = _mapper.Map<Testimonial>(dto);
        t.CreatedAt = DateTime.UtcNow;
        t.UpdatedAt = DateTime.UtcNow;
        _db.Testimonials.Add(t);
        await _db.SaveChangesAsync();
        return _mapper.Map<TestimonialDto>(t);
    }

    public async Task<TestimonialDto> UpdateAsync(int id, UpdateTestimonialDto dto)
    {
        var t = await _db.Testimonials.FindAsync(id)
            ?? throw new NotFoundException(nameof(Testimonial), id);
        _mapper.Map(dto, t);
        t.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return _mapper.Map<TestimonialDto>(t);
    }

    public async Task DeleteAsync(int id)
    {
        var t = await _db.Testimonials.FindAsync(id)
            ?? throw new NotFoundException(nameof(Testimonial), id);
        _db.Testimonials.Remove(t);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var t = await _db.Testimonials.FindAsync(orderedIds[i]);
            if (t != null) { t.DisplayOrder = i; t.UpdatedAt = DateTime.UtcNow; }
        }
        await _db.SaveChangesAsync();
    }
}
