using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class ProductImage : BaseEntity
{
    public int ProductId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }

    public Product Product { get; set; } = null!;
}
