using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Settings;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class SiteSettingsService : ISiteSettingsService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public SiteSettingsService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<SiteSettingsDto> GetAsync()
    {
        var settings = await _db.SiteSettings.FirstOrDefaultAsync()
            ?? new SiteSettings { SiteName = "FM's Power", Email = "", Phone = "", WhatsApp = "", Address = "", BusinessHours = "" };
        return _mapper.Map<SiteSettingsDto>(settings);
    }

    public async Task<SiteSettingsDto> UpdateAsync(UpdateSiteSettingsDto dto)
    {
        var settings = await _db.SiteSettings.FirstOrDefaultAsync();
        if (settings is null)
        {
            settings = _mapper.Map<SiteSettings>(dto);
            settings.CreatedAt = DateTime.UtcNow;
            settings.UpdatedAt = DateTime.UtcNow;
            _db.SiteSettings.Add(settings);
        }
        else
        {
            _mapper.Map(dto, settings);
            settings.UpdatedAt = DateTime.UtcNow;
        }
        await _db.SaveChangesAsync();
        return _mapper.Map<SiteSettingsDto>(settings);
    }
}
