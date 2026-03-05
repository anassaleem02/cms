using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.VideoReviews;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class VideoReviewService : IVideoReviewService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public VideoReviewService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<VideoReviewDto>> GetAllAsync(bool activeOnly = true)
    {
        var query = _db.VideoReviews.AsQueryable();
        if (activeOnly) query = query.Where(v => v.IsActive);
        var items = await query.OrderBy(v => v.DisplayOrder).ToListAsync();
        return _mapper.Map<IEnumerable<VideoReviewDto>>(items);
    }

    public async Task<VideoReviewDto?> GetByIdAsync(int id)
    {
        var item = await _db.VideoReviews.FindAsync(id);
        return item is null ? null : _mapper.Map<VideoReviewDto>(item);
    }

    public async Task<VideoReviewDto> CreateAsync(CreateVideoReviewDto dto)
    {
        var item = _mapper.Map<VideoReview>(dto);
        _db.VideoReviews.Add(item);
        await _db.SaveChangesAsync();
        return _mapper.Map<VideoReviewDto>(item);
    }

    public async Task<VideoReviewDto> UpdateAsync(int id, UpdateVideoReviewDto dto)
    {
        var item = await _db.VideoReviews.FindAsync(id)
            ?? throw new NotFoundException(nameof(VideoReview), id);
        _mapper.Map(dto, item);
        await _db.SaveChangesAsync();
        return _mapper.Map<VideoReviewDto>(item);
    }

    public async Task DeleteAsync(int id)
    {
        var item = await _db.VideoReviews.FindAsync(id)
            ?? throw new NotFoundException(nameof(VideoReview), id);
        _db.VideoReviews.Remove(item);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var item = await _db.VideoReviews.FindAsync(orderedIds[i]);
            if (item != null) item.DisplayOrder = i;
        }
        await _db.SaveChangesAsync();
    }
}
