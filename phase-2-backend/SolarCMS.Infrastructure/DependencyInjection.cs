using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SolarCMS.Application.Interfaces;
using SolarCMS.Infrastructure.Data.Context;
using SolarCMS.Infrastructure.Services;

namespace SolarCMS.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IHeroService, HeroService>();
        services.AddScoped<IFeatureService, FeatureService>();
        services.AddScoped<ITestimonialService, TestimonialService>();
        services.AddScoped<IServiceItemService, ServiceItemService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<INavigationService, NavigationService>();
        services.AddScoped<ISiteSettingsService, SiteSettingsService>();
        services.AddScoped<IMediaService, MediaService>();

        return services;
    }
}
