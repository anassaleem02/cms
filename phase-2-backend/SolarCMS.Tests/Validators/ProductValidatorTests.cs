using FluentAssertions;
using SolarCMS.Application.DTOs.Products;
using SolarCMS.Application.Validators.Products;
using SolarCMS.Domain.Enums;
using Xunit;

namespace SolarCMS.Tests.Validators;

public class ProductValidatorTests
{
    private readonly CreateProductValidator _validator = new();

    [Fact]
    public void Validate_ValidProduct_PassesValidation()
    {
        var dto = new CreateProductDto
        {
            Name = "Test Panel",
            ShortDescription = "A great solar panel",
            Description = "Full description here",
            Category = ProductCategory.SolarPanel,
            IsActive = true
        };
        var result = _validator.Validate(dto);
        result.IsValid.Should().BeTrue();
    }

    [Fact]
    public void Validate_EmptyName_FailsValidation()
    {
        var dto = new CreateProductDto { Name = "", ShortDescription = "desc", Description = "desc", Category = ProductCategory.Inverter };
        var result = _validator.Validate(dto);
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "Name");
    }

    [Fact]
    public void Validate_NameTooLong_FailsValidation()
    {
        var dto = new CreateProductDto { Name = new string('A', 201), ShortDescription = "desc", Description = "desc", Category = ProductCategory.Inverter };
        var result = _validator.Validate(dto);
        result.IsValid.Should().BeFalse();
    }
}
