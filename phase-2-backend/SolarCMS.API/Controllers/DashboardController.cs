using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SolarCMS.Application.Interfaces;

namespace SolarCMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IContactService _contactService;
    private readonly ITestimonialService _testimonialService;

    public DashboardController(
        IProductService productService,
        IContactService contactService,
        ITestimonialService testimonialService)
    {
        _productService = productService;
        _contactService = contactService;
        _testimonialService = testimonialService;
    }

    /// <summary>Get dashboard analytics</summary>
    [HttpGet("analytics")]
    public async Task<IActionResult> GetAnalytics()
    {
        var products = await _productService.GetAllAsync(activeOnly: false);
        var messages = await _contactService.GetAllAsync();
        var testimonials = await _testimonialService.GetAllAsync(activeOnly: false);
        var unreadCount = await _contactService.GetUnreadCountAsync();

        return Ok(new
        {
            TotalProducts = products.Count(),
            TotalMessages = messages.Count(),
            UnreadMessages = unreadCount,
            TotalTestimonials = testimonials.Count(),
            RecentMessages = messages.Take(5)
        });
    }
}
