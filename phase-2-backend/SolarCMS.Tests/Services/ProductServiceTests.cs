using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Products;
using SolarCMS.Application.Mappings;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Enums;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;
using SolarCMS.Infrastructure.Services;
using Xunit;

namespace SolarCMS.Tests.Services;

public class ProductServiceTests : IDisposable
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        _db = new AppDbContext(options);
        var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
        _mapper = config.CreateMapper();
        _service = new ProductService(_db, _mapper);
    }

    [Fact]
    public async Task GetAllAsync_ReturnsOnlyActiveProducts()
    {
        _db.Products.AddRange(
            new Product { Name = "Active", ShortDescription = "desc", IsActive = true, Slug = "active", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "Inactive", ShortDescription = "desc", IsActive = false, Slug = "inactive", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );
        await _db.SaveChangesAsync();

        var result = await _service.GetAllAsync();

        result.Should().HaveCount(1);
        result.First().Name.Should().Be("Active");
    }

    [Fact]
    public async Task GetByIdAsync_ReturnsNull_WhenNotFound()
    {
        var result = await _service.GetByIdAsync(999);

        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateAsync_SetsSlugFromName()
    {
        var dto = new CreateProductDto
        {
            Name = "Test Solar Panel 400W",
            ShortDescription = "A great panel",
            Description = "<p>Details</p>",
            Category = ProductCategory.SolarPanel,
            IsFeatured = false,
            IsActive = true,
            DisplayOrder = 0
        };

        var result = await _service.CreateAsync(dto);

        result.Slug.Should().NotBeNullOrEmpty();
        result.Slug.Should().Contain("test");
    }

    [Fact]
    public async Task DeleteAsync_ThrowsNotFoundException_WhenNotFound()
    {
        await Assert.ThrowsAsync<NotFoundException>(() => _service.DeleteAsync(999));
    }

    [Fact]
    public async Task GetFeaturedAsync_ReturnsOnlyFeaturedActiveProducts()
    {
        _db.Products.AddRange(
            new Product { Name = "Featured", ShortDescription = "d", IsFeatured = true, IsActive = true, Slug = "f1", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "NotFeatured", ShortDescription = "d", IsFeatured = false, IsActive = true, Slug = "f2", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );
        await _db.SaveChangesAsync();

        var result = await _service.GetFeaturedAsync();

        result.Should().HaveCount(1);
        result.First().Name.Should().Be("Featured");
    }

    public void Dispose() => _db.Dispose();
}
