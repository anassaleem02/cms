using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SolarCMS.Domain.Entities;

namespace SolarCMS.Infrastructure.Data.Configurations;

public class HeroSectionConfiguration : IEntityTypeConfiguration<HeroSection>
{
    public void Configure(EntityTypeBuilder<HeroSection> builder)
    {
        builder.HasKey(h => h.Id);
        builder.Property(h => h.Headline).IsRequired().HasMaxLength(300);
        builder.Property(h => h.Subheadline).IsRequired().HasMaxLength(1000);
        builder.Property(h => h.PrimaryButtonText).IsRequired().HasMaxLength(100);
        builder.Property(h => h.PrimaryButtonUrl).IsRequired().HasMaxLength(500);
        builder.Property(h => h.SecondaryButtonText).IsRequired().HasMaxLength(100);
        builder.Property(h => h.SecondaryButtonUrl).IsRequired().HasMaxLength(500);

        builder.HasMany(h => h.Stats)
            .WithOne(s => s.HeroSection)
            .HasForeignKey(s => s.HeroSectionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class HeroStatConfiguration : IEntityTypeConfiguration<HeroStat>
{
    public void Configure(EntityTypeBuilder<HeroStat> builder)
    {
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Value).IsRequired().HasMaxLength(50);
        builder.Property(s => s.Label).IsRequired().HasMaxLength(100);
    }
}
