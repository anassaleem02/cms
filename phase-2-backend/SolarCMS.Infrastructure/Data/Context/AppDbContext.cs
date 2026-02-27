using Microsoft.EntityFrameworkCore;
using SolarCMS.Domain.Entities;

namespace SolarCMS.Infrastructure.Data.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductImage> ProductImages => Set<ProductImage>();
    public DbSet<ProductSpecification> ProductSpecifications => Set<ProductSpecification>();
    public DbSet<HeroSection> HeroSections => Set<HeroSection>();
    public DbSet<HeroStat> HeroStats => Set<HeroStat>();
    public DbSet<Feature> Features => Set<Feature>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<NavigationItem> NavigationItems => Set<NavigationItem>();
    public DbSet<SiteSettings> SiteSettings => Set<SiteSettings>();
    public DbSet<MediaFile> MediaFiles => Set<MediaFile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is SolarCMS.Domain.Common.BaseEntity entity)
                entity.UpdatedAt = DateTime.UtcNow;
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
