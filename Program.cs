var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();


app.UseRouting();

//app.MapGet("/", () => Results.File("wwwroot/index.html","text/html"));

app.Run();
