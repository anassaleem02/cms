using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Contact;
using SolarCMS.Application.Mappings;
using SolarCMS.Infrastructure.Data.Context;
using SolarCMS.Infrastructure.Services;
using Xunit;

namespace SolarCMS.Tests.Services;

public class ContactServiceTests : IDisposable
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private readonly ContactService _service;

    public ContactServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new AppDbContext(options);
        var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
        _mapper = config.CreateMapper();
        _service = new ContactService(_db, _mapper);
    }

    [Fact]
    public async Task SubmitAsync_CreatesMessage()
    {
        var dto = new SubmitContactDto
        {
            Name = "Test User",
            Email = "test@example.com",
            Phone = "03001234567",
            Message = "Test message content"
        };

        await _service.SubmitAsync(dto);

        var messages = await _service.GetAllAsync();
        messages.Should().HaveCount(1);
        messages.First().Name.Should().Be("Test User");
        messages.First().IsRead.Should().BeFalse();
    }

    [Fact]
    public async Task GetUnreadCountAsync_ReturnsCorrectCount()
    {
        _db.ContactMessages.AddRange(
            new SolarCMS.Domain.Entities.ContactMessage { Name = "A", Email = "a@a.com", Message = "m", IsRead = false, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new SolarCMS.Domain.Entities.ContactMessage { Name = "B", Email = "b@b.com", Message = "m", IsRead = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );
        await _db.SaveChangesAsync();

        var count = await _service.GetUnreadCountAsync();

        count.Should().Be(1);
    }

    public void Dispose() => _db.Dispose();
}
