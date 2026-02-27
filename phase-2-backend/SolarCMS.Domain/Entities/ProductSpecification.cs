using SolarCMS.Domain.Common;

namespace SolarCMS.Domain.Entities;

public class ProductSpecification : BaseEntity
{
    public int ProductId { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }

    public Product Product { get; set; } = null!;
}
