using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.DTOs.Products;
using SolarCMS.Application.Interfaces;
using SolarCMS.Domain.Enums;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>Get all products</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] ProductCategory? category, [FromQuery] bool activeOnly = true)
    {
        var products = await _productService.GetAllAsync(category, activeOnly);
        return Ok(products);
    }

    /// <summary>Get featured products</summary>
    [HttpGet("featured")]
    public async Task<IActionResult> GetFeatured()
    {
        var products = await _productService.GetFeaturedAsync();
        return Ok(products);
    }

    /// <summary>Get product by ID</summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    /// <summary>Get product by slug</summary>
    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await _productService.GetBySlugAsync(slug);
        return product is null ? NotFound() : Ok(product);
    }

    /// <summary>Get related products</summary>
    [HttpGet("{id:int}/related")]
    public async Task<IActionResult> GetRelated(int id, [FromQuery] int count = 3)
    {
        var products = await _productService.GetRelatedAsync(id, count);
        return Ok(products);
    }

    /// <summary>Create a new product (Admin only)</summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        var product = await _productService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    /// <summary>Update a product (Admin only)</summary>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto)
    {
        var product = await _productService.UpdateAsync(id, dto);
        return Ok(product);
    }

    /// <summary>Delete a product (Admin only)</summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.DeleteAsync(id);
        return NoContent();
    }

    /// <summary>Add image to product (Admin only)</summary>
    [HttpPost("{id:int}/images")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddImage(int id, [FromBody] AddProductImageDto dto)
    {
        var image = await _productService.AddImageAsync(id, dto);
        return Ok(image);
    }

    /// <summary>Delete product image (Admin only)</summary>
    [HttpDelete("images/{imageId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteImage(int imageId)
    {
        await _productService.DeleteImageAsync(imageId);
        return NoContent();
    }

    /// <summary>Set primary image (Admin only)</summary>
    [HttpPut("{id:int}/images/{imageId:int}/primary")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> SetPrimaryImage(int id, int imageId)
    {
        await _productService.SetPrimaryImageAsync(id, imageId);
        return NoContent();
    }

    /// <summary>Add specification to product (Admin only)</summary>
    [HttpPost("{id:int}/specifications")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddSpecification(int id, [FromBody] AddSpecificationDto dto)
    {
        var spec = await _productService.AddSpecificationAsync(id, dto);
        return Ok(spec);
    }

    /// <summary>Delete specification (Admin only)</summary>
    [HttpDelete("specifications/{specId:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteSpecification(int specId)
    {
        await _productService.DeleteSpecificationAsync(specId);
        return NoContent();
    }

    /// <summary>Reorder products (Admin only)</summary>
    [HttpPut("reorder")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Reorder([FromBody] List<int> orderedIds)
    {
        await _productService.ReorderAsync(orderedIds);
        return NoContent();
    }
}
