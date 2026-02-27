using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Contact;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class ContactService : IContactService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ContactService(AppDbContext db, IMapper mapper) { _db = db; _mapper = mapper; }

    public async Task<IEnumerable<ContactMessageDto>> GetAllAsync()
    {
        var messages = await _db.ContactMessages.OrderByDescending(m => m.CreatedAt).ToListAsync();
        return _mapper.Map<IEnumerable<ContactMessageDto>>(messages);
    }

    public async Task<IEnumerable<ContactMessageDto>> GetUnreadAsync()
    {
        var messages = await _db.ContactMessages.Where(m => !m.IsRead)
            .OrderByDescending(m => m.CreatedAt).ToListAsync();
        return _mapper.Map<IEnumerable<ContactMessageDto>>(messages);
    }

    public async Task<ContactMessageDto?> GetByIdAsync(int id)
    {
        var m = await _db.ContactMessages.FindAsync(id);
        return m is null ? null : _mapper.Map<ContactMessageDto>(m);
    }

    public async Task SubmitAsync(SubmitContactDto dto)
    {
        var message = _mapper.Map<ContactMessage>(dto);
        message.CreatedAt = DateTime.UtcNow;
        message.UpdatedAt = DateTime.UtcNow;
        _db.ContactMessages.Add(message);
        await _db.SaveChangesAsync();
    }

    public async Task MarkAsReadAsync(int id)
    {
        var m = await _db.ContactMessages.FindAsync(id)
            ?? throw new NotFoundException(nameof(ContactMessage), id);
        m.IsRead = true;
        m.ReadAt = DateTime.UtcNow;
        m.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var m = await _db.ContactMessages.FindAsync(id)
            ?? throw new NotFoundException(nameof(ContactMessage), id);
        _db.ContactMessages.Remove(m);
        await _db.SaveChangesAsync();
    }

    public async Task<int> GetUnreadCountAsync()
        => await _db.ContactMessages.CountAsync(m => !m.IsRead);
}
