using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SolarCMS.Domain.Entities;
using SolarCMS.Domain.Enums;
using SolarCMS.Infrastructure.Data.Context;

namespace SolarCMS.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        using var context = new AppDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

        // Apply any pending migrations
        await context.Database.MigrateAsync();

        // Seed only if DB is empty
        if (await context.Users.AnyAsync()) return;

        // ─── Admin User ───────────────────────────────────────────
        context.Users.Add(new User
        {
            Email = "admin@fmspower.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@1234"),
            FirstName = "Admin",
            LastName = "User",
            Role = "Admin",
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        // ─── Site Settings ────────────────────────────────────────
        context.SiteSettings.Add(new SiteSettings
        {
            SiteName = "FM's Power",
            TagLine = "Premium Solar Energy Solutions",
            LogoUrl = "/images/logo/fms-power-logo.png",
            FaviconUrl = "/images/logo/favicon.ico",
            Phone = "0322-2550299",
            Email = "thefmstrading@gmail.com",
            WhatsApp = "+923222550299",
            Address = "Shop G31-G50, Ground Floor, Al-Najeebi Electronic Bazar, Agha Khan Road 3, Near Star City Mall, Saddar, Karachi",
            BusinessHours = "Mon-Sat: 9:00 AM - 8:00 PM, Sun: Closed",
            MetaTitle = "FM's Power - Premium Solar Inverters, Batteries & Panels in Karachi",
            MetaDescription = "Buy premium solar inverters, lithium batteries and solar panels in Karachi. FM's Power offers S.O Series products with 5-year warranty and expert installation.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });

        // ─── Navigation ───────────────────────────────────────────
        var navItems = new[]
        {
            new NavigationItem { Label = "Home", Url = "/", DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new NavigationItem { Label = "Products", Url = "/products", DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new NavigationItem { Label = "About", Url = "/about", DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new NavigationItem { Label = "Contact", Url = "/contact", DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
        context.NavigationItems.AddRange(navItems);

        // ─── Hero Section ─────────────────────────────────────────
        var hero = new HeroSection
        {
            Headline = "Save Energy to Build a Better Future",
            Subheadline = "High-efficiency solar inverters, lithium batteries, and solar panels with intelligent monitoring and maximum power point tracking technology.",
            PrimaryButtonText = "Explore Products",
            PrimaryButtonUrl = "/products",
            SecondaryButtonText = "Get Free Quote",
            SecondaryButtonUrl = "/contact",
            BackgroundImageUrl = "/images/hero/solar_img.jpg",
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Stats = new List<HeroStat>
            {
                new() { Value = "500+", Label = "Happy Customers", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "98.5%", Label = "Efficiency Rate", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "5+", Label = "Years Warranty", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "10MW+", Label = "Power Generated", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            }
        };
        context.HeroSections.Add(hero);

        // ─── Features ─────────────────────────────────────────────
        var features = new[]
        {
            new Feature { Title = "High Efficiency", Description = "Industry-leading 98.5% conversion efficiency ensures maximum power output from your solar system.", Icon = "zap", DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Smart Monitoring", Description = "Real-time app-based monitoring lets you track performance and energy production from anywhere.", Icon = "smartphone", DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Advanced Protection", Description = "Built-in protection against lightning, overload, short circuit, and over-temperature conditions.", Icon = "shield", DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "MPPT Technology", Description = "Maximum Power Point Tracking ensures optimal energy harvest in all weather conditions.", Icon = "clock", DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Remote Management", Description = "Control and configure your system remotely via smartphone with our intuitive mobile app.", Icon = "tool", DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Modular Design", Description = "Easily expandable system allows you to add more capacity as your energy needs grow.", Icon = "grid", DisplayOrder = 5, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
        context.Features.AddRange(features);

        // ─── Services ─────────────────────────────────────────────
        var services = new[]
        {
            new Service { Title = "Free Consultation", Description = "Expert advice on the best solar solution for your home or business needs. We analyze your energy requirements and provide customized recommendations.", Icon = "help-circle", DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Professional Installation", Description = "Our certified technicians ensure safe and efficient installation of your solar system with minimal disruption to your daily routine.", Icon = "tool", DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "5-Year Warranty", Description = "All our products come with comprehensive warranty coverage. We stand behind our quality with prompt warranty service.", Icon = "shield", DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Performance Monitoring", Description = "Real-time monitoring through our mobile app helps you track system performance and energy savings 24/7.", Icon = "activity", DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Maintenance & Support", Description = "Regular maintenance services and 24/7 customer support to ensure your system operates at peak efficiency.", Icon = "settings", DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "System Expansion", Description = "Easy scalability options allow you to expand your solar system as your energy needs grow over time.", Icon = "grid", DisplayOrder = 5, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
        context.Services.AddRange(services);

        // ─── Testimonials ─────────────────────────────────────────
        var testimonials = new[]
        {
            new Testimonial
            {
                CustomerName = "Ahmed Khan", CustomerTitle = "Homeowner, DHA Karachi",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/32.jpg",
                Review = "After installing the S.O Series 6.2 KW system, my electricity bills dropped by 70%. The installation team was professional, and the after-sales support has been exceptional. The smart monitoring app helps me track every unit of power generated.",
                Rating = 5, DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Muhammad Farooq", CustomerTitle = "Factory Owner, SITE Area",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/45.jpg",
                Review = "We installed FM's Power system at our textile factory. The reliability and efficiency have been outstanding. Zero downtime in over a year, and the energy savings have significantly reduced our operational costs. Highly recommended for industrial use.",
                Rating = 5, DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Farhan Rizvi", CustomerTitle = "Homeowner, Gulshan-e-Iqbal",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/67.jpg",
                Review = "The lithium battery system from FM's Power has completely eliminated our load-shedding problems. The quality is exceptional, and the 5-year warranty gives us complete peace of mind. The team guided us through the entire selection process.",
                Rating = 5, DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Dr. Hassan Ali", CustomerTitle = "Medical Clinic Owner, Clifton",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/22.jpg",
                Review = "Running a clinic requires reliable power. FM's Power delivered a complete solar solution that keeps our medical equipment running smoothly. The installation was quick, and the system has been maintenance-free for over 8 months now.",
                Rating = 5, DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Imran Sheikh", CustomerTitle = "Shop Owner, Saddar",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/75.jpg",
                Review = "Best investment I've made for my shop. The 4KW inverter handles all my equipment effortlessly. Customer service is excellent - they responded within hours when I had questions. Will definitely recommend to other business owners.",
                Rating = 5, DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            }
        };
        context.Testimonials.AddRange(testimonials);

        // ─── Products ─────────────────────────────────────────────
        var products = new[]
        {
            new Product
            {
                Name = "S.O Series 1.6 KW",
                Slug = "so-series-1-6kw",
                ShortDescription = "Pure Sine Wave Hybrid Solar Inverter with 12V battery support and MPPT technology.",
                Description = "<p>The S.O Series 1.6 KW Inverter is designed for small to medium homes. With Pure Sine Wave output, it safely powers all types of appliances including sensitive electronics. The built-in MPPT solar charger maximizes energy harvest from your solar panels.</p><p>Features automatic switching between solar, battery and grid power for uninterrupted operation during load shedding.</p>",
                Category = ProductCategory.Inverter,
                IsFeatured = true,
                IsActive = true,
                DisplayOrder = 0,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/fms1.6.jpeg", AltText = "S.O Series 1.6 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "1600W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Battery Voltage", Value = "12V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Wave Form", Value = "Pure Sine Wave", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Series 4 KW",
                Slug = "so-series-4kw",
                ShortDescription = "High-power 4KW hybrid solar inverter with 24V battery support for medium to large homes.",
                Description = "<p>The S.O Series 4 KW Inverter is the ideal choice for medium to large homes and small businesses. With 24V battery configuration, it delivers stable, clean power for all your appliances.</p><p>Advanced MPPT technology ensures maximum solar energy utilization, while intelligent battery management extends battery life significantly.</p>",
                Category = ProductCategory.Inverter,
                IsFeatured = true,
                IsActive = true,
                DisplayOrder = 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/fms4.jpeg", AltText = "S.O Series 4 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "4000W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Battery Voltage", Value = "24V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Wave Form", Value = "Pure Sine Wave", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Series 6.2 KW",
                Slug = "so-series-6-2kw",
                ShortDescription = "Industrial-grade 6.2KW hybrid inverter for large homes and businesses requiring maximum power.",
                Description = "<p>The S.O Series 6.2 KW Inverter is our flagship product for large residential and commercial applications. It handles heavy loads including industrial AC units, large refrigerators, and power-hungry machinery with ease.</p><p>With dual MPPT controllers, it can work with two separate solar arrays for maximum energy production.</p>",
                Category = ProductCategory.Inverter,
                IsFeatured = true,
                IsActive = true,
                DisplayOrder = 2,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/fms4.jpeg", AltText = "S.O Series 6.2 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "6200W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Battery Voltage", Value = "48V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Wave Form", Value = "Pure Sine Wave", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Lithium 51.2V 105Ah",
                Slug = "so-lithium-51v-105ah",
                ShortDescription = "LiFePO4 lithium battery with 51.2V 105Ah capacity. Long-lasting, safe and efficient energy storage.",
                Description = "<p>The S.O Lithium Battery uses advanced LiFePO4 (Lithium Iron Phosphate) chemistry for superior safety, longevity, and performance. With 105Ah capacity at 51.2V, it provides ample backup power for residential use.</p><p>Compared to traditional lead-acid batteries, LiFePO4 technology offers 3x longer lifespan, 50% more usable capacity, and significantly faster charging.</p>",
                Category = ProductCategory.Battery,
                IsFeatured = false,
                IsActive = true,
                DisplayOrder = 3,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/lithium-battery-105ah.jpeg", AltText = "S.O Lithium Battery 51.2V 105Ah", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Capacity", Value = "5376W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Voltage", Value = "51.2V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Capacity", Value = "105Ah", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Chemistry", Value = "LiFePO4", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Protection Rating", Value = "IP65", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 5, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Lithium 51.2V 280Ah",
                Slug = "so-lithium-51v-280ah",
                ShortDescription = "High-capacity LiFePO4 battery 51.2V 280Ah for whole-home backup power and commercial applications.",
                Description = "<p>The S.O 280Ah Lithium Battery is our highest-capacity residential battery, providing enough stored energy to power an entire home through extended outages. The LiFePO4 chemistry ensures 3000+ charge cycles for long-term value.</p><p>Built-in BMS (Battery Management System) protects against overcharge, over-discharge, short circuit, and temperature extremes.</p>",
                Category = ProductCategory.Battery,
                IsFeatured = true,
                IsActive = true,
                DisplayOrder = 4,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/lithium-280ah.jpeg", AltText = "S.O Lithium Battery 51.2V 280Ah", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Capacity", Value = "14336W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Voltage", Value = "51.2V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Capacity", Value = "280Ah", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Chemistry", Value = "LiFePO4", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Protection Rating", Value = "IP65", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 5, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Solar Panel 585-625W",
                Slug = "so-solar-panel-585-625w",
                ShortDescription = "High-efficiency N-Type Bi-Facial solar panel 585-625W with 15-year product warranty.",
                Description = "<p>The S.O Solar Panel delivers exceptional performance with N-Type Bi-Facial technology that captures light from both sides of the panel for increased energy yield. With output ranging from 585W to 625W, it is ideal for both residential and commercial installations.</p><p>The anti-reflective, self-cleaning glass coating ensures consistent performance even in dusty conditions common in Pakistan.</p>",
                Category = ProductCategory.SolarPanel,
                IsFeatured = false,
                IsActive = true,
                DisplayOrder = 5,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/solar-panel.png", AltText = "S.O Solar Panel 585-625W", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "585-625W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Type", Value = "N-Type", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Design", Value = "Bi-Facial", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Product Warranty", Value = "15 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            }
        };
        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }
}
