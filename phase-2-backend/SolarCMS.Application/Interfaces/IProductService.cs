using SolarCMS.Application.DTOs.Products;
using SolarCMS.Domain.Enums;

namespace SolarCMS.Application.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllAsync(ProductCategory? category = null, bool activeOnly = true);
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<IEnumerable<ProductDto>> GetFeaturedAsync();
    Task<IEnumerable<ProductDto>> GetRelatedAsync(int productId, int count = 3);
    Task<ProductDto> CreateAsync(CreateProductDto dto);
    Task<ProductDto> UpdateAsync(int id, UpdateProductDto dto);
    Task DeleteAsync(int id);
    Task<ProductImageDto> AddImageAsync(int productId, AddProductImageDto dto);
    Task DeleteImageAsync(int imageId);
    Task SetPrimaryImageAsync(int productId, int imageId);
    Task<ProductSpecificationDto> AddSpecificationAsync(int productId, AddSpecificationDto dto);
    Task DeleteSpecificationAsync(int specId);
    Task ReorderAsync(List<int> orderedIds);
}
