using SolarCMS.Domain.Enums;

namespace SolarCMS.Application.DTOs.Products;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductCategory Category { get; set; }
    public string CategoryName => Category.ToString();
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public string? PdfBrochureUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public List<ProductImageDto> Images { get; set; } = new();
    public List<ProductSpecificationDto> Specifications { get; set; } = new();
    public ProductImageDto? PrimaryImage => Images.FirstOrDefault(i => i.IsPrimary) ?? Images.FirstOrDefault();
}

public class ProductImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }
}

public class ProductSpecificationDto
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
