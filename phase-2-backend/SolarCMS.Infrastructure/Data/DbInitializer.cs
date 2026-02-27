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
            Headline = "Power Your Future with Solar Energy",
            Subheadline = "Premium solar inverters, lithium batteries & panels with 5-year warranty. Save energy, reduce bills, and embrace sustainable living.",
            PrimaryButtonText = "Explore Products",
            PrimaryButtonUrl = "/products",
            SecondaryButtonText = "Get Quote",
            SecondaryButtonUrl = "/contact",
            BackgroundImageUrl = "/images/hero/solar_img.jpg",
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Stats = new List<HeroStat>
            {
                new() { Value = "500+", Label = "Happy Customers", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "10MW+", Label = "Power Generated", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "5 Years", Label = "Warranty", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                new() { Value = "98.5%", Label = "Efficiency", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
            }
        };
        context.HeroSections.Add(hero);

        // ─── Features ─────────────────────────────────────────────
        var features = new[]
        {
            new Feature { Title = "High Efficiency", Description = "98.5% power conversion efficiency ensures maximum energy utilization from your solar system.", Icon = "zap", DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Smart Monitoring", Description = "Real-time monitoring via mobile app. Track your energy production and consumption anytime, anywhere.", Icon = "smartphone", DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Advanced Protection", Description = "Multi-layered protection against lightning, overload, short circuit, and temperature extremes.", Icon = "shield", DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "MPPT Technology", Description = "Advanced Maximum Power Point Tracking technology optimizes energy harvest throughout the day.", Icon = "trending-up", DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Remote Management", Description = "Control and configure your solar system remotely via smartphone. Adjust settings from anywhere.", Icon = "wifi", DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Feature { Title = "Modular Design", Description = "Expandable system design allows you to scale your solar installation as your energy needs grow.", Icon = "layers", DisplayOrder = 5, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
        context.Features.AddRange(features);

        // ─── Services ─────────────────────────────────────────────
        var services = new[]
        {
            new Service { Title = "Professional Installation", Description = "Expert installation team ensures your solar system is set up correctly and safely for maximum performance.", Icon = "tool", DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Maintenance & Support", Description = "Regular maintenance services and 24/7 technical support to keep your system running at peak efficiency.", Icon = "settings", DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Consultation & Planning", Description = "Free consultation to design the perfect solar system tailored to your energy needs and budget.", Icon = "clipboard", DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "5-Year Warranty", Description = "Comprehensive 5-year warranty on all products with guaranteed performance and peace of mind.", Icon = "award", DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "System Monitoring", Description = "Continuous monitoring and optimization of your solar system to ensure maximum energy savings.", Icon = "activity", DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Service { Title = "Custom Solutions", Description = "Tailor-made solar solutions for homes, businesses, and industrial applications of any size.", Icon = "package", DisplayOrder = 5, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };
        context.Services.AddRange(services);

        // ─── Testimonials ─────────────────────────────────────────
        var testimonials = new[]
        {
            new Testimonial
            {
                CustomerName = "Ahmed Khan", CustomerTitle = "Homeowner, DHA Karachi",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/32.jpg",
                Review = "Switching to solar was the best decision for our home. The system handles all our appliances including AC effortlessly. FM's Power team was professional from consultation to installation. We've seen significant reduction in electricity bills, and the 5-year warranty gives us complete peace of mind.",
                Rating = 5, DisplayOrder = 0, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Muhammad Farooq", CustomerTitle = "Factory Owner, SITE Area",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/45.jpg",
                Review = "Our manufacturing unit needed reliable power, and FM's Power delivered beyond expectations. The 6.2KW inverter system handles our heavy machinery effortlessly. The installation team was professional, and the after-sales support has been exceptional. Highly recommended for industrial applications!",
                Rating = 5, DisplayOrder = 1, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Farhan Rizvi", CustomerTitle = "Homeowner, Gulshan-e-Iqbal",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/67.jpg",
                Review = "Living in Karachi with frequent load shedding, the FM's Power system has been a game-changer. The lithium battery backup keeps our home running smoothly during outages. The team explained everything clearly and completed installation in just one day. Excellent service!",
                Rating = 5, DisplayOrder = 2, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Dr. Hassan Ali", CustomerTitle = "Medical Clinic Owner, Clifton",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/22.jpg",
                Review = "A medical clinic cannot afford power interruptions. FM's Power understood our requirements perfectly and installed a system that handles our medical equipment and air conditioning seamlessly. The pure sine wave output keeps sensitive equipment safe. Outstanding investment!",
                Rating = 5, DisplayOrder = 3, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            },
            new Testimonial
            {
                CustomerName = "Imran Sheikh", CustomerTitle = "Shop Owner, Saddar",
                CustomerImageUrl = "https://randomuser.me/api/portraits/men/75.jpg",
                Review = "I run an electronics shop and needed reliable power backup. FM's Power provided the perfect solution with their hybrid inverter system. The 5-year warranty gives peace of mind, and their team is always just a phone call away for any queries. Very satisfied with the purchase!",
                Rating = 5, DisplayOrder = 4, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow
            }
        };
        context.Testimonials.AddRange(testimonials);

        // ─── Products ─────────────────────────────────────────────
        var products = new[]
        {
            new Product
            {
                Name = "S.O Series 1.6 KW Inverter",
                Slug = "so-series-1-6kw-inverter",
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
                    new() { ImageUrl = "/images/products/inverter-1.6kw.png", AltText = "S.O Series 1.6 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "1600W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Power Input", Value = "2000W", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Battery Voltage", Value = "12V", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Wave Form", Value = "Pure Sine Wave", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Series 4 KW Inverter",
                Slug = "so-series-4kw-inverter",
                ShortDescription = "High-power 4KW hybrid solar inverter with 48V battery support for medium to large homes.",
                Description = "<p>The S.O Series 4 KW Inverter is the ideal choice for medium to large homes and small businesses. With 48V battery configuration, it delivers stable, clean power for all your appliances.</p><p>Advanced MPPT technology ensures maximum solar energy utilization, while intelligent battery management extends battery life significantly.</p>",
                Category = ProductCategory.Inverter,
                IsFeatured = false,
                IsActive = true,
                DisplayOrder = 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/inverter-4kw.png", AltText = "S.O Series 4 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power Output", Value = "4000W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Battery Voltage", Value = "48V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Wave Form", Value = "Pure Sine Wave", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Series 6.2 KW Inverter",
                Slug = "so-series-6-2kw-inverter",
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
                    new() { ImageUrl = "/images/products/inverter-6.2kw.png", AltText = "S.O Series 6.2 KW Inverter", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
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
                Name = "S.O Lithium Battery 51.2V 105Ah",
                Slug = "so-lithium-battery-51v-105ah",
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
                    new() { ImageUrl = "/images/products/battery-105ah.png", AltText = "S.O Lithium Battery 105Ah", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Capacity", Value = "105Ah", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Voltage", Value = "51.2V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Chemistry", Value = "LiFePO4", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Energy", Value = "5.37 kWh", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Lithium Battery 51.2V 280Ah",
                Slug = "so-lithium-battery-51v-280ah",
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
                    new() { ImageUrl = "/images/products/battery-280ah.png", AltText = "S.O Lithium Battery 280Ah", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Capacity", Value = "280Ah", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Voltage", Value = "51.2V", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Chemistry", Value = "LiFePO4", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Energy", Value = "14.33 kWh", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Warranty", Value = "5 Years", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            },
            new Product
            {
                Name = "S.O Mono Solar Panel 585W",
                Slug = "so-mono-solar-panel-585w",
                ShortDescription = "High-efficiency 585W Mono PERC solar panel with 21.5% efficiency and 25-year performance warranty.",
                Description = "<p>The S.O 585W Monocrystalline PERC Solar Panel delivers exceptional performance with industry-leading 21.5% efficiency. Each panel produces more power per square meter than conventional panels, making it ideal for space-constrained installations.</p><p>The anti-reflective, self-cleaning glass coating ensures consistent performance even in dusty conditions common in Pakistan.</p>",
                Category = ProductCategory.SolarPanel,
                IsFeatured = false,
                IsActive = true,
                DisplayOrder = 5,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Images = new List<ProductImage>
                {
                    new() { ImageUrl = "/images/products/solar-panel.png", AltText = "S.O Mono Solar Panel 585W", IsPrimary = true, DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                },
                Specifications = new List<ProductSpecification>
                {
                    new() { Key = "Power", Value = "585W", DisplayOrder = 0, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Type", Value = "Mono PERC", DisplayOrder = 1, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Efficiency", Value = "21.5%", DisplayOrder = 2, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Product Warranty", Value = "10 Years", DisplayOrder = 3, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                    new() { Key = "Performance Warranty", Value = "25 Years", DisplayOrder = 4, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                }
            }
        };
        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }
}
