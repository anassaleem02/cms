using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SolarCMS.Application.DTOs.Products;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Enums;
using SolarCMS.Domain.Exceptions;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _db;
    private readonly IMapper _mapper;

    public ProductService(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync(ProductCategory? category = null, bool activeOnly = true)
    {
        var query = _db.Products
            .Include(p => p.Images)
            .Include(p => p.Specifications)
            .AsQueryable();

        if (activeOnly) query = query.Where(p => p.IsActive);
        if (category.HasValue) query = query.Where(p => p.Category == category.Value);

        var products = await query.OrderBy(p => p.DisplayOrder).ThenBy(p => p.Name).ToListAsync();
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _db.Products
            .Include(p => p.Images)
            .Include(p => p.Specifications)
            .FirstOrDefaultAsync(p => p.Id == id);

        return product is null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        var product = await _db.Products
            .Include(p => p.Images)
            .Include(p => p.Specifications)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        return product is null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<IEnumerable<ProductDto>> GetFeaturedAsync()
    {
        var products = await _db.Products
            .Include(p => p.Images)
            .Include(p => p.Specifications)
            .Where(p => p.IsFeatured && p.IsActive)
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }

    public async Task<IEnumerable<ProductDto>> GetRelatedAsync(int productId, int count = 3)
    {
        var product = await _db.Products.FindAsync(productId)
            ?? throw new NotFoundException(nameof(Product), productId);

        var related = await _db.Products
            .Include(p => p.Images)
            .Where(p => p.Category == product.Category && p.Id != productId && p.IsActive)
            .OrderBy(p => p.DisplayOrder)
            .Take(count)
            .ToListAsync();

        return _mapper.Map<IEnumerable<ProductDto>>(related);
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto dto)
    {
        var product = _mapper.Map<Product>(dto);
        product.Slug = GenerateSlug(dto.Name);
        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        return _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto> UpdateAsync(int id, UpdateProductDto dto)
    {
        var product = await _db.Products
            .Include(p => p.Images)
            .Include(p => p.Specifications)
            .FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new NotFoundException(nameof(Product), id);

        _mapper.Map(dto, product);
        product.Slug = GenerateSlug(dto.Name);
        product.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return _mapper.Map<ProductDto>(product);
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _db.Products.FindAsync(id)
            ?? throw new NotFoundException(nameof(Product), id);

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
    }

    public async Task<ProductImageDto> AddImageAsync(int productId, AddProductImageDto dto)
    {
        var product = await _db.Products.FindAsync(productId)
            ?? throw new NotFoundException(nameof(Product), productId);

        if (dto.IsPrimary)
        {
            var existing = await _db.ProductImages.Where(i => i.ProductId == productId && i.IsPrimary).ToListAsync();
            existing.ForEach(i => i.IsPrimary = false);
        }

        var image = _mapper.Map<ProductImage>(dto);
        image.ProductId = productId;
        image.CreatedAt = DateTime.UtcNow;
        image.UpdatedAt = DateTime.UtcNow;

        _db.ProductImages.Add(image);
        await _db.SaveChangesAsync();

        return _mapper.Map<ProductImageDto>(image);
    }

    public async Task DeleteImageAsync(int imageId)
    {
        var image = await _db.ProductImages.FindAsync(imageId)
            ?? throw new NotFoundException(nameof(ProductImage), imageId);

        _db.ProductImages.Remove(image);
        await _db.SaveChangesAsync();
    }

    public async Task SetPrimaryImageAsync(int productId, int imageId)
    {
        var images = await _db.ProductImages.Where(i => i.ProductId == productId).ToListAsync();
        images.ForEach(i => i.IsPrimary = i.Id == imageId);
        await _db.SaveChangesAsync();
    }

    public async Task<ProductSpecificationDto> AddSpecificationAsync(int productId, AddSpecificationDto dto)
    {
        _ = await _db.Products.FindAsync(productId)
            ?? throw new NotFoundException(nameof(Product), productId);

        var spec = _mapper.Map<ProductSpecification>(dto);
        spec.ProductId = productId;
        spec.CreatedAt = DateTime.UtcNow;
        spec.UpdatedAt = DateTime.UtcNow;

        _db.ProductSpecifications.Add(spec);
        await _db.SaveChangesAsync();

        return _mapper.Map<ProductSpecificationDto>(spec);
    }

    public async Task DeleteSpecificationAsync(int specId)
    {
        var spec = await _db.ProductSpecifications.FindAsync(specId)
            ?? throw new NotFoundException(nameof(ProductSpecification), specId);

        _db.ProductSpecifications.Remove(spec);
        await _db.SaveChangesAsync();
    }

    public async Task ReorderAsync(List<int> orderedIds)
    {
        for (int i = 0; i < orderedIds.Count; i++)
        {
            var product = await _db.Products.FindAsync(orderedIds[i]);
            if (product != null)
            {
                product.DisplayOrder = i;
                product.UpdatedAt = DateTime.UtcNow;
            }
        }
        await _db.SaveChangesAsync();
    }

    private static string GenerateSlug(string name)
    {
        var slug = name.ToLower()
            .Replace(" ", "-")
            .Replace(".", "")
            .Replace(",", "")
            .Replace("(", "")
            .Replace(")", "")
            .Replace("/", "-")
            .Replace("\\", "-");

        return slug;
    }
}
