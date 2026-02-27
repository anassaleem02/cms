using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SolarCMS.Application.DTOs.Media;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class MediaService : IMediaService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private readonly string _uploadsRoot;

    public MediaService(AppDbContext db, IMapper mapper, IConfiguration config)
    {
        _db = db;
        _mapper = mapper;
        _uploadsRoot = config["UploadSettings:Path"] ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
    }

    public async Task<IEnumerable<MediaFileDto>> GetAllAsync(string? contentType = null, string? tags = null)
    {
        var query = _db.MediaFiles.AsQueryable();
        if (!string.IsNullOrEmpty(contentType))
            query = query.Where(m => m.ContentType.StartsWith(contentType));
        if (!string.IsNullOrEmpty(tags))
            query = query.Where(m => m.Tags != null && m.Tags.Contains(tags));

        var files = await query.OrderByDescending(m => m.CreatedAt).ToListAsync();
        return _mapper.Map<IEnumerable<MediaFileDto>>(files);
    }

    public async Task<MediaFileDto> UploadAsync(UploadMediaDto dto)
    {
        Directory.CreateDirectory(_uploadsRoot);

        var extension = Path.GetExtension(dto.FileName);
        var uniqueFileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(_uploadsRoot, uniqueFileName);

        using var fileStream = File.Create(filePath);
        await dto.FileStream.CopyToAsync(fileStream);

        var mediaFile = new MediaFile
        {
            FileName = uniqueFileName,
            OriginalFileName = dto.FileName,
            Url = $"/uploads/{uniqueFileName}",
            ContentType = dto.ContentType,
            FileSize = new FileInfo(filePath).Length,
            Tags = dto.Tags,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.MediaFiles.Add(mediaFile);
        await _db.SaveChangesAsync();

        return _mapper.Map<MediaFileDto>(mediaFile);
    }

    public async Task DeleteAsync(int id)
    {
        var mediaFile = await _db.MediaFiles.FindAsync(id)
            ?? throw new NotFoundException(nameof(MediaFile), id);

        var filePath = Path.Combine(_uploadsRoot, mediaFile.FileName);
        if (File.Exists(filePath))
            File.Delete(filePath);

        _db.MediaFiles.Remove(mediaFile);
        await _db.SaveChangesAsync();
    }
}
